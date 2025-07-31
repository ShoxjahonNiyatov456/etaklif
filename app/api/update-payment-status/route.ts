import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/services/database";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// To'lov statusini tekshirish uchun GET metodi
export async function GET(request: NextRequest) {
  try {
    const headers = {
      ...corsHeaders,
      "Content-Type": "application/json",
    };

    const { searchParams } = new URL(request.url);
    const uniqueId = searchParams.get("uniqueId");

    if (!uniqueId) {
      return NextResponse.json(
        { error: "Taklifnoma ID si ko'rsatilmagan", success: false },
        { status: 400, headers }
      );
    }

    const invitationRef = doc(db, "invitations", uniqueId);
    const invitationSnap = await getDoc(invitationRef);

    if (!invitationSnap.exists()) {
      return NextResponse.json(
        { error: "Taklifnoma topilmadi", success: false },
        { status: 404, headers }
      );
    }

    const invitationData = invitationSnap.data();

    return NextResponse.json(
      {
        success: true,
        paymentStatus: invitationData.paymentStatus || "unpaid",
        paymentAmount: invitationData.paymentAmount || 50000
      },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("To'lov statusini olishda xatolik:", error);
    return NextResponse.json(
      { error: "Serverda xatolik yuz berdi", success: false },
      { status: 500, headers: corsHeaders }
    );
  }
}


export async function PUT(request: NextRequest) {
  try {
    const headers = {
      ...corsHeaders,
      "Content-Type": "application/json",
    };
    const body = await request.json();
    const { uniqueId, paymentStatus, screenshotBase64 } = body;

    if (!uniqueId || !paymentStatus) {
      return NextResponse.json(
        { error: "Kerakli ma'lumotlar to'liq emas", success: false },
        { status: 400, headers }
      );
    }

    // To'lov so'rovi uchun skrinshot talab qilinadi
    if (paymentStatus === 'pending' && !screenshotBase64) {
      return NextResponse.json(
        { error: "To'lov skrinshotini yuklash majburiy", success: false },
        { status: 400, headers }
      );
    }

    // Taklifnomani tekshirish
    const invitationRef = doc(db, "invitations", uniqueId);
    const invitationSnap = await getDoc(invitationRef);

    if (!invitationSnap.exists()) {
      return NextResponse.json(
        { error: "Taklifnoma topilmadi", success: false },
        { status: 404, headers }
      );
    }

    // To'lov ma'lumotlarini saqlash
    const paymentData = {
      paymentStatus: paymentStatus,
      screenshotBase64: screenshotBase64 || null,
      paymentAmount: 50000, // Standart to'lov miqdori (50,000 so'm)
      updatedAt: serverTimestamp(),
    };

    await updateDoc(invitationRef, paymentData);

    // Telegram botga xabar yuborish logikasi
    if (paymentStatus === "pending") {
      try {
        // Admin Telegram botiga xabar yuborish
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        // Telegram chat ID ni to'g'ri olish - muhim!
        const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

        // Agar chat ID mavjud bo'lmasa, xatolik qaytarish
        if (!adminChatId) {
          console.error("TELEGRAM_ADMIN_CHAT_ID muhit o'zgaruvchisi topilmadi");
          // To'lov statusini yangilash davom etadi, lekin Telegram xabari yuborilmaydi
          return;
        }

        if (botToken) {
          // Avval skrinshot yuborish
          let photoMessageId = null;

          if (screenshotBase64) {
            try {
              // Base64 formatdagi rasmni dekodlash
              const base64Data = screenshotBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
              const imageBuffer = Buffer.from(base64Data, 'base64');

              // Rasmni yuborish uchun formData yaratish
              const formData = new FormData();
              formData.append('chat_id', adminChatId);
              formData.append('caption', `📸 To'lov skrinshotini yubordi: Taklifnoma ID: ${uniqueId}`);

              // Rasmni formData ga qo'shish
              const blob = new Blob([imageBuffer], { type: 'image/jpeg' });
              formData.append('photo', blob, 'payment_screenshot.jpg');

              // Rasmni yuborish
              const photoResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
                method: "POST",
                body: formData,
              });

              // Javobni tekshirish va xabar ID sini olish
              try {
                const photoResult = await photoResponse.json();
                if (photoResult.ok) {
                  photoMessageId = photoResult.result.message_id;
                } else {
                  console.error("Skrinshot yuborishda Telegram API xatoligi:", photoResult);
                  if (photoResult.error_code === 400 && photoResult.description.includes("chat not found")) {
                    console.error("Telegram chat ID noto'g'ri. Iltimos, TELEGRAM_ADMIN_CHAT_ID muhit o'zgaruvchisini tekshiring.");
                  }
                }
              } catch (jsonError) {
                console.error("Skrinshot yuborish javobini qayta ishlashda xatolik:", jsonError);
              }
            } catch (error) {
              console.error("Skrinshot yuborishda xatolik:", error);
            }
          }

          // Keyin to'lov so'rovi xabarini yuborish
          const adminMessage = `🔔 <b>Yangi to'lov so'rovi keldi!</b>\n\n` +
            `📝 <b>Taklifnoma ID:</b> ${uniqueId}\n` +
            `💰 <b>To'lov miqdori:</b> 50,000 so'm`;

          // Admin uchun xabar yuborish va tasdiqlash/bekor qilish tugmalarini qo'shish
          const adminResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: adminChatId,
              text: adminMessage,
              parse_mode: "HTML",
              reply_markup: JSON.stringify({
                inline_keyboard: [
                  [
                    { text: "✅ Tasdiqlash", callback_data: `approve_payment:${uniqueId}` },
                    { text: "❌ Bekor qilish", callback_data: `reject_payment:${uniqueId}` }
                  ]
                ]
              }),
              // Agar skrinshot yuborilgan bo'lsa, unga javob sifatida yuborish
              ...(photoMessageId ? { reply_to_message_id: photoMessageId } : {})
            }),
          });



          try {
            const adminResult = await adminResponse.json();
            console.log(adminResult);

            if (adminResult.ok) {
              console.log("Admin Telegram botiga xabar yuborildi");
            } else {
              console.error("Admin Telegram botiga xabar yuborishda xatolik:", adminResult);
              // Xatolik tafsilotlarini qayd qilish
              if (adminResult.error_code === 400 && adminResult.description.includes("chat not found")) {
                console.error("Telegram chat ID noto'g'ri. Iltimos, TELEGRAM_ADMIN_CHAT_ID muhit o'zgaruvchisini tekshiring.");
              }
            }
          } catch (jsonError) {
            console.error("Telegram API javobini qayta ishlashda xatolik:", jsonError);
          }


        } else {
          console.error("TELEGRAM_BOT_TOKEN muhit o'zgaruvchisi topilmadi");
        }
      } catch (error) {
        console.error("Telegram botga xabar yuborishda xatolik:", error);
        // Telegram xatoligi to'lov statusini yangilashga ta'sir qilmasligi kerak
      }
    }

    return NextResponse.json(
      { success: true, message: "To'lov statusi yangilandi" },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("To'lov statusini yangilashda xatolik:", error);
    return NextResponse.json(
      { error: "Serverda xatolik yuz berdi", success: false },
      { status: 500, headers: corsHeaders }
    );
  }
}
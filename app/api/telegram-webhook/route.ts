import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/services/database";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

// Telegram webhook endpointi
export async function POST(request: NextRequest) {
    try {
        const headers = {
            ...corsHeaders,
            "Content-Type": "application/json",
        };

        // Telegram botdan kelgan ma'lumotlarni olish
        const body = await request.json();

        // Callback query ma'lumotlarini tekshirish
        if (body.callback_query) {
            const { callback_query } = body;
            const { data, message } = callback_query;

            // Callback data formatini tekshirish (approve_payment:uniqueId yoki reject_payment:uniqueId)
            if (data && data.includes(':')) {
                const [action, uniqueId] = data.split(':');

                // Taklifnomani tekshirish
                const invitationRef = doc(db, "invitations", uniqueId);
                const invitationSnap = await getDoc(invitationRef);

                if (!invitationSnap.exists()) {
                    console.error(`Taklifnoma topilmadi: ${uniqueId}`);
                    return NextResponse.json(
                        { error: "Taklifnoma topilmadi", success: false },
                        { status: 404, headers }
                    );
                }

                // To'lov ma'lumotlarini yangilash
                if (action === "approve_payment") {
                    // To'lovni tasdiqlash
                    await updateDoc(invitationRef, {
                        paymentStatus: "paid",
                        updatedAt: serverTimestamp(),
                    });

                    // Telegram botga javob yuborish
                    await sendTelegramResponse(callback_query.id, "To'lov tasdiqlandi ✅");
                    await updateTelegramMessage(
                        message.chat.id,
                        message.message_id,
                        `✅ <b>To'lov tasdiqlandi!</b>\n\n📝 <b>Taklifnoma ID:</b> ${uniqueId}\n💰 <b>To'lov miqdori:</b> 50,000 so'm\n🕒 <b>Tasdiqlangan vaqt:</b> ${new Date().toLocaleString()}`
                    );

                    return NextResponse.json(
                        { success: true, message: "To'lov tasdiqlandi" },
                        { status: 200, headers }
                    );
                } else if (action === "reject_payment") {
                    // To'lovni bekor qilish (status o'zgarmaydi)
                    await sendTelegramResponse(callback_query.id, "To'lov bekor qilindi ❌");
                    await updateTelegramMessage(
                        message.chat.id,
                        message.message_id,
                        `❌ <b>To'lov bekor qilindi!</b>\n\n📝 <b>Taklifnoma ID:</b> ${uniqueId}\n💰 <b>To'lov miqdori:</b> 50,000 so'm\n🕒 <b>Bekor qilingan vaqt:</b> ${new Date().toLocaleString()}`
                    );

                    return NextResponse.json(
                        { success: true, message: "To'lov bekor qilindi" },
                        { status: 200, headers }
                    );
                }
            }
        }

        // Boshqa webhook so'rovlari uchun
        return NextResponse.json(
            { success: true, message: "Webhook qabul qilindi" },
            { status: 200, headers }
        );
    } catch (error) {
        console.error("Telegram webhook xatoligi:", error);
        return NextResponse.json(
            { error: "Serverda xatolik yuz berdi", success: false },
            { status: 500, headers: corsHeaders }
        );
    }
}

// Telegram botga callback_query javobini yuborish
async function sendTelegramResponse(callback_query_id: string, text: string) {
    // .env faylidan to'g'ridan-to'g'ri o'qish
    const botToken = "7662414181:AAE7GslvS33B56kiyYG9IFnB8cg3KXkYmZU";
    if (!botToken) {
        console.error("TELEGRAM_BOT_TOKEN muhit o'zgaruvchisi topilmadi");
        return;
    }

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${botToken}/answerCallbackQuery`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    callback_query_id: callback_query_id,
                    text: text,
                    show_alert: true,
                }),
            }
        );

        const result = await response.json();
        if (!result.ok) {
            console.error("Telegram callback javobini yuborishda xatolik:", result);
        }
    } catch (error) {
        console.error("Telegram callback javobini yuborishda xatolik:", error);
    }
}

// Telegram xabarini yangilash
async function updateTelegramMessage(chat_id: string, message_id: number, text: string) {
    // .env faylidan to'g'ridan-to'g'ri o'qish
    const botToken = "7662414181:AAE7GslvS33B56kiyYG9IFnB8cg3KXkYmZU";
    if (!botToken) {
        console.error("TELEGRAM_BOT_TOKEN muhit o'zgaruvchisi topilmadi");
        return;
    }

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${botToken}/editMessageText`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: chat_id,
                    message_id: message_id,
                    text: text,
                    parse_mode: "HTML",
                    reply_markup: JSON.stringify({
                        inline_keyboard: [] // Tugmalarni o'chirish
                    })
                }),
            }
        );

        const result = await response.json();
        if (!result.ok) {
            console.error("Telegram xabarini yangilashda xatolik:", result);
        }
    } catch (error) {
        console.error("Telegram xabarini yangilashda xatolik:", error);
    }
}
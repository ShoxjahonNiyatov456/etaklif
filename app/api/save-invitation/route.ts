import { NextRequest, NextResponse } from "next/server";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/services/database"; // Database importini to'g'rilash

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const headers = {
      ...corsHeaders,
      "Content-Type": "application/json",
    };
    const body = await request.json();
    const { uniqueId, type, templateId, invitationData, userId, createdAt } = body;

    if (!uniqueId || !type || !templateId || !invitationData) {
      return NextResponse.json(
        { error: "Kerakli ma'lumotlar to'liq emas", success: false },
        { status: 400, headers }
      );
    }

    const invitationsCollection = collection(db, "invitations");
    const invitationRef = doc(invitationsCollection, uniqueId);

    await setDoc(invitationRef, {
      uniqueId,
      type,
      templateId,
      invitationData,
      userId: userId || "anonymous", // userId mavjud bo'lmasa 'anonymous' ishlatiladi
      createdAt: createdAt ? new Date(createdAt) : serverTimestamp(), // createdAt ni Date yoki serverTimestamp ga o'tkazish
      updatedAt: serverTimestamp(), // Yangilangan vaqtni qo'shish
    });

    return NextResponse.json(
      { success: true, message: "Ma'lumotlar Firebase'ga saqlandi" },
      { status: 201, headers }
    );
  } catch (error) {
    console.error("Taklifnomani Firebase'ga saqlashda xatolik:", error);
    return NextResponse.json(
      { error: "Serverda xatolik yuz berdi", success: false },
      { status: 500, headers: corsHeaders }
    );
  }
}

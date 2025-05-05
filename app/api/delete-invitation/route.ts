import { NextRequest, NextResponse } from "next/server";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/services/database";

export async function DELETE(request: NextRequest) {
  try {
    // URL parametrlaridan uniqueId ni olish
    const { searchParams } = new URL(request.url);
    const uniqueId = searchParams.get("uniqueId");

    if (!uniqueId) {
      return NextResponse.json(
        { error: "Taklifnoma identifikatori ko'rsatilmagan" },
        { status: 400 }
      );
    }

    // Firestore'dan taklifnomani o'chirish
    const invitationRef = doc(db, "invitations", uniqueId);
    await deleteDoc(invitationRef);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Taklifnomani o'chirishda xatolik:", error);
    return NextResponse.json(
      { error: "Taklifnomani o'chirishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
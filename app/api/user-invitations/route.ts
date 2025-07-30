import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
import { cookies } from "next/headers";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/services/database";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value || "anonymous";

    // Agar foydalanuvchi ro'yxatdan o'tmagan bo'lsa, bo'sh ro'yxat qaytaramiz
    if (!userId || userId === "anonymous") {
      return NextResponse.json({ invitations: [] });
    }

    const invitationsCollection = collection(db, "invitations");
    const invitationsQuery = query(
      invitationsCollection,
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(invitationsQuery);
    const invitations: any[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      invitations.push({
        uniqueId: data.uniqueId,
        type: data.type,
        templateId: data.templateId,
        invitationData: data.invitationData,
        createdAt:
          data.createdAt?.toDate?.() ||
          data.createdAt ||
          new Date().toISOString(),
      });
    });

    return NextResponse.json({ invitations });
  } catch (error) {
    console.error("Taklifnomalarni olishda xatolik:", error);
    return NextResponse.json(
      { error: "Taklifnomalarni olishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

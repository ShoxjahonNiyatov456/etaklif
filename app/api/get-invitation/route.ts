import { NextResponse } from "next/server";

export const revalidate = 60;
import fs from "fs";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "invitations.json");

const getDataFromFile = (): Record<string, any> => {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const data = fs.readFileSync(DATA_FILE_PATH, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Fayldan o'qishda xatolik:", error);
  }
  return {};
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: Request) {
  try {
    const headers = {
      ...corsHeaders,
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300, s-maxage=600",
    };
    const { searchParams } = new URL(request.url);
    const uniqueId = searchParams.get("uniqueId");
    if (!uniqueId) {
      return NextResponse.json(
        { error: "uniqueId parametri ko'rsatilmagan", invitationData: null },
        { status: 400, headers }
      );
    }

    const allData = getDataFromFile();
    const invitationData = allData[uniqueId];

    if (!fs.existsSync(DATA_FILE_PATH)) {
      console.warn("Invitations fayli mavjud emas:", DATA_FILE_PATH);
      return NextResponse.json(
        { message: "Ma'lumotlar fayli topilmadi", invitationData: null },
        { status: 200, headers }
      );
    }
    if (!invitationData) {
      return NextResponse.json(
        { message: "Ko'rsatilgan taklifnoma topilmadi", invitationData: null },
        { status: 200, headers }
      );
    }

    // Cache-Control sarlavhasi allaqachon headers obyektiga qo'shilgan
    return NextResponse.json(invitationData, { headers });
  } catch (error) {
    console.error("Taklifnomani olishda xatolik:", error);
    return NextResponse.json(
      { error: "Serverda xatolik yuz berdi", invitationData: null },
      { status: 500, headers: corsHeaders }
    );
  }
}

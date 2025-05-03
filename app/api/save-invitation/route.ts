import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "invitations.json");

const saveDataToFile = (data: Record<string, any>) => {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Faylga yozishda xatolik:", error);
    return false;
  }
};
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

export async function POST(request: Request) {
  try {
    const headers = {
      ...corsHeaders,
      "Content-Type": "application/json",
    };
    const body = await request.json();
    const { uniqueId, type, templateId, invitationData, createdAt } = body;
    if (!uniqueId || !type || !templateId || !invitationData) {
      return NextResponse.json(
        { error: "Kerakli ma'lumotlar to'liq emas", success: false },
        { status: 400, headers }
      );
    }
    const existingData = getDataFromFile();
    existingData[uniqueId] = {
      type,
      templateId,
      invitationData,
      userId: body.userId || "anonymous",
      createdAt: createdAt || new Date().toISOString(),
    };

    // Yangilangan ma'lumotlarni saqlash
    const saveResult = saveDataToFile(existingData);
    if (!saveResult) {
      return NextResponse.json(
        { error: "Ma'lumotlarni saqlashda xatolik yuz berdi", success: false },
        { status: 500, headers }
      );
    }

    return NextResponse.json(
      { success: true, message: "Ma'lumotlar saqlandi" },
      { status: 201, headers }
    );
  } catch (error) {
    console.error("Taklifnomani saqlashda xatolik:", error);
    return NextResponse.json(
      { error: "Serverda xatolik yuz berdi", success: false },
      { status: 500, headers: corsHeaders }
    );
  }
}

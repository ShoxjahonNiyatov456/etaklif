import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Ma'lumotlar saqlanadigan fayl yo'li
const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'invitations.json');

// Ma'lumotlarni saqlash funksiyasi
const saveDataToFile = (data: Record<string, any>) => {
  try {
    // Papka mavjud emasligini tekshirish, mavjud bo'lmasa yaratish
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Ma'lumotlarni saqlash
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Faylga yozishda xatolik:', error);
    return false;
  }
};

// Ma'lumotlarni fayldan olish
const getDataFromFile = (): Record<string, any> => {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const data = fs.readFileSync(DATA_FILE_PATH, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Fayldan o\'qishda xatolik:', error);
  }
  return {};
};

// CORS headerlarini o'rnatish
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  // CORS preflight so'rovlari uchun
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    // CORS headerlarini qo'shish
    const headers = {
      ...corsHeaders,
      'Content-Type': 'application/json',
    };

    // POST so'rovidan ma'lumotlarni olish
    const body = await request.json();
    const { uniqueId, type, templateId, invitationData, createdAt } = body;

    // Barcha kerakli ma'lumotlar mavjudligini tekshirish
    if (!uniqueId || !type || !templateId || !invitationData) {
      return NextResponse.json(
        { error: 'Kerakli ma'lumotlar to\'liq emas', success: false },
        { status: 400, headers }
      );
    }

    // Mavjud ma'lumotlarni olish
    const existingData = getDataFromFile();

    // Yangi ma'lumotlarni qo'shish
    existingData[uniqueId] = {
      type,
      templateId,
      invitationData,
      createdAt: createdAt || new Date().toISOString(),
    };

    // Yangilangan ma'lumotlarni saqlash
    const saveResult = saveDataToFile(existingData);
    if (!saveResult) {
      return NextResponse.json(
        { error: 'Ma\'lumotlarni saqlashda xatolik yuz berdi', success: false },
        { status: 500, headers }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Ma\'lumotlar saqlandi' },
      { status: 201, headers }
    );
  } catch (error) {
    console.error('Taklifnomani saqlashda xatolik:', error);
    return NextResponse.json(
      { error: 'Serverda xatolik yuz berdi', success: false },
      { status: 500, headers: corsHeaders }
    );
  }
} 
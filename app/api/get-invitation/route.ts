import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Ma'lumotlar saqlanadigan fayl yo'li
const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'invitations.json');

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

// CORS orqali so'rovlarni hal qilish uchun headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  // CORS preflight so'rovlari uchun
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: Request) {
  try {
    // CORS headerlarini qo'shish
    const headers = {
      ...corsHeaders,
      'Content-Type': 'application/json',
    };

    // URL parametrlarini olish
    const { searchParams } = new URL(request.url);
    const uniqueId = searchParams.get('uniqueId');

    // uniqueId mavjudligini tekshirish
    if (!uniqueId) {
      return NextResponse.json(
        { error: 'uniqueId parametri ko\'rsatilmagan', invitationData: null },
        { status: 400, headers }
      );
    }

    // Ma'lumotlarni olish
    const allData = getDataFromFile();
    const invitationData = allData[uniqueId];

    // Papka/fayl mavjud emasligini tekshirish
    if (!fs.existsSync(DATA_FILE_PATH)) {
      console.warn('Invitations fayli mavjud emas:', DATA_FILE_PATH);
      return NextResponse.json(
        { message: 'Ma\'lumotlar fayli topilmadi', invitationData: null },
        { status: 200, headers }
      );
    }

    // Ma'lumotlar topilmagan bo'lsa
    if (!invitationData) {
      console.log(`Taklifnoma topilmadi: ${uniqueId}`);
      return NextResponse.json(
        { message: 'Ko\'rsatilgan taklifnoma topilmadi', invitationData: null },
        { status: 200, headers }
      );
    }

    // Ma'lumotlarni qaytarish
    return NextResponse.json(invitationData, { headers });
  } catch (error) {
    console.error('Taklifnomani olishda xatolik:', error);
    return NextResponse.json(
      { error: 'Serverda xatolik yuz berdi', invitationData: null },
      { status: 500, headers: corsHeaders }
    );
  }
} 
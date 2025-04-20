// Taklifnoma ulashish uchun servis

/**
 * Taklifnoma uchun unikal havola yaratish
 * Bu funksiya to'lov qilingandan so'ng taklifnomani ulashish uchun unikal havola yaratadi
 */
export const generateShareableLink = (type: string, templateId: string, invitationData: any): string => {
  // Unikal identifikator yaratish (amaliy loyihada bu server tomonidan beriladigan ID bo'lishi kerak)
  const uniqueId = generateUniqueId();
  
  // Barcha ma'lumotlarni URL-safe formatga o'tkazish
  const encodedData = encodeURIComponent(JSON.stringify(invitationData));
  
  // Havola yaratish
  const shareableLink = `/invitation/${type}/${templateId}/${uniqueId}?data=${encodedData}`;
  
  // Amaliy loyihada bu ma'lumotlar bazasiga saqlanishi kerak
  // saveInvitationToDatabase(uniqueId, type, templateId, invitationData);
  
  return shareableLink;
};

/**
 * Unikal ID yaratish uchun yordamchi funksiya
 */
const generateUniqueId = (): string => {
  // Oddiy unikal ID yaratish (amaliy loyihada UUID kutubxonasi ishlatilishi kerak)
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Taklifnoma ma'lumotlarini havola orqali olish
 */
export const getInvitationDataFromLink = (queryParams: string): any => {
  try {
    // URL parametrlaridan ma'lumotlarni olish
    const data = new URLSearchParams(queryParams).get('data');
    if (!data) return null;
    
    // Ma'lumotlarni JSON formatga qaytarish
    return JSON.parse(decodeURIComponent(data));
  } catch (error) {
    console.error('Taklifnoma ma\'lumotlarini o\'qishda xatolik:', error);
    return null;
  }
};
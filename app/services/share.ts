// Taklifnoma ulashish uchun servis

/**
 * Taklifnoma uchun unikal havola yaratish
 * Bu funksiya to'lov qilingandan so'ng taklifnomani ulashish uchun unikal havola yaratadi
 */
export const generateShareableLink = (type: string, templateId: string, invitationData: any): string => {
  // Unikal identifikator yaratish
  const uniqueId = generateUniqueId();
  
  // Ma'lumotlarni localStorage-ga saqlash
  saveInvitationToStorage(uniqueId, type, templateId, invitationData);
  
  // Havola yaratish (ma'lumotlarni URLda jo'natish o'rniga faqat uniqueId-ni jo'natamiz)
  const shareableLink = `/invitation/${type}/${templateId}/${uniqueId}`;
  
  return shareableLink;
};

/**
 * Unikal ID yaratish uchun yordamchi funksiya
 */
const generateUniqueId = (): string => {
  // Oddiy unikal ID yaratish
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Taklifnoma ma'lumotlarini localStorage-ga saqlash
 */
const saveInvitationToStorage = (uniqueId: string, type: string, templateId: string, invitationData: any): void => {
  try {
    // Browser muhitida ekanligini tekshirish
    if (typeof window === 'undefined') {
      return;
    }
    
    // Mavjud taklifnomalarni olish
    const storedInvitations = localStorage.getItem('invitations') || '{}';
    const invitations = JSON.parse(storedInvitations);
    
    // Yangi taklifnomani qo'shish
    invitations[uniqueId] = {
      type,
      templateId,
      invitationData,
      createdAt: new Date().toISOString()
    };
    
    // Saqlash
    localStorage.setItem('invitations', JSON.stringify(invitations));
  } catch (error) {
    console.error('Taklifnomani saqlashda xatolik:', error);
  }
};

/**
 * Taklifnoma ma'lumotlarini havola orqali olish
 */
export const getInvitationDataFromLink = (queryParams: string): any => {
  try {
    // Eski usul - URL parametrlaridan ma'lumotlarni olish (agar mavjud bo'lsa)
    const data = new URLSearchParams(queryParams).get('data');
    if (data) {
      return JSON.parse(decodeURIComponent(data));
    }
    
    return null;
  } catch (error) {
    console.error('Taklifnoma ma\'lumotlarini o\'qishda xatolik:', error);
    return null;
  }
};

/**
 * Unique ID bo'yicha taklifnomani olish
 */
export const getInvitationByUniqueId = (uniqueId: string): any => {
  try {
    // Browser muhitida ekanligini tekshirish
    if (typeof window === 'undefined') {
      return null;
    }
    
    // Saqlangan taklifnomalarni localStorage-dan olish
    const storedInvitations = localStorage.getItem('invitations') || '{}';
    const invitations = JSON.parse(storedInvitations);
    
    // Berilgan uniqueId-ga mos taklifnomani qaytarish
    return invitations[uniqueId]?.invitationData || null;
  } catch (error) {
    console.error('Taklifnomani localStorage-dan olishda xatolik:', error);
    return null;
  }
};
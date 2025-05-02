import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./database";

/**
 * Taklifnoma uchun unikal havola yaratish
 * Bu funksiya to'lov qilingandan so'ng taklifnomani ulashish uchun unikal havola yaratadi
 */
export const generateShareableLink = async (
  type: string,
  templateId: string,
  invitationData: any
): Promise<string> => {
  const uniqueId = generateUniqueId();
  saveInvitationToFirebase(uniqueId, type, templateId, invitationData);
  await saveInvitationToServer(uniqueId, type, templateId, invitationData);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://taklifnoma.uz";
  const urlParts = [
    "invitation",
    encodeURIComponent(type),
    encodeURIComponent(templateId),
    encodeURIComponent(uniqueId),
  ];
  const path = urlParts.join("/");
  const fullUrl = new URL(path, baseUrl);
  return fullUrl.toString();
};

/**
 * Unikal ID yaratish uchun yordamchi funksiya
 */
const generateUniqueId = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

/**
 * Taklifnoma ma'lumotlarini Firebase-ga saqlash
 */
const saveInvitationToFirebase = async (
  uniqueId: string,
  type: string,
  templateId: string,
  invitationData: any
): Promise<void> => {
  try {
    const invitationsCollection = collection(db, "invitations");
    const invitationRef = doc(invitationsCollection, uniqueId);

    await setDoc(invitationRef, {
      uniqueId,
      type,
      templateId,
      invitationData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    await saveInvitationToServer(uniqueId, type, templateId, invitationData);
  } catch (error) {
    console.error("Taklifnomani saqlashda xatolik:", error);
    throw error;
  }
};

/**
 * Taklifnoma ma'lumotlarini serverga saqlash
 */
const saveInvitationToServer = async (
  uniqueId: string,
  type: string,
  templateId: string,
  invitationData: any
): Promise<void> => {
  try {
    const response = await fetch("/api/save-invitation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uniqueId,
        type,
        templateId,
        invitationData,
        createdAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error("Serverga ma'lumotlarni saqlashda xatolik");
    }
  } catch (error) {
    console.error("Serverga ma'lumotlarni saqlashda xatolik:", error);
  }
};

/**
 * Taklifnoma ma'lumotlarini havola orqali olish
 */
export const getInvitationDataFromLink = (queryParams: string): any => {
  try {
    const data = new URLSearchParams(queryParams).get("data");
    if (data) {
      return JSON.parse(decodeURIComponent(data));
    }
    return null;
  } catch (error) {
    console.error("Taklifnoma ma'lumotlarini o'qishda xatolik:", error);
    return null;
  }
};

/**
 * Unique ID bo'yicha taklifnomani olish
 */
export const getInvitationByUniqueId = async (
  uniqueId: string
): Promise<any> => {
  try {
    return await fetchInvitationFromServer(uniqueId);
  } catch (error) {
    console.error("Taklifnomani olishda xatolik:", error);
    return null;
  }
};

/**
 * Taklifnomani serverdan olish
 */
const fetchInvitationFromServer = async (uniqueId: string): Promise<any> => {
  try {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "https://taklifnoma.uz";
      const response = await fetch(
        `${baseUrl}/api/get-invitation?uniqueId=${uniqueId}`,
        {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );
      if (!response.ok) {
        console.log(`Server javob kodi: ${response.status}`);
        if (response.status === 404) {
          return null;
        }
      }
      const data = await response.json();
      if (!data || !data.invitationData) {
        console.warn("Server tomonidan ma'lumotlar topilmadi:", data);
        return null;
      }
      return data.invitationData;
    } catch (fetchError) {
      console.error("Fetch so'rovida xatolik yuz berdi:", fetchError);
      return null;
    }
  } catch (error) {
    console.error("Serverdan ma'lumotlarni olishda xatolik:", error);
    return null;
  }
};

/**
 * Foydalanuvchining barcha taklifnomalarini olish
 */
export const getInvitationsByUser = async (userId?: string): Promise<any[]> => {
  try {
    const response = await fetch(
      `/api/user-invitations${userId ? `?userId=${userId}` : ""}`
    );
    if (!response.ok) {
      throw new Error("Serverdan ma'lumotlarni olishda xatolik");
    }
    const data = await response.json();
    if (!data || !Array.isArray(data.invitations)) {
      return [];
    }
    return data.invitations.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  } catch (error) {
    console.error("Taklifnomalarni olishda xatolik:", error);
    return [];
  }
};

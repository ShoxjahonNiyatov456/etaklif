import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
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
  try {
    const uniqueId = generateUniqueId();
    const savePromise = saveInvitationToFirebase(
      uniqueId,
      type,
      templateId,
      invitationData
    );
    let baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      console.error(
        "NEXT_PUBLIC_API_URL is not defined. Please check your environment variables."
      );
      return "#error-base-url-not-set";
    }
    baseUrl = baseUrl.trim();
    if (!baseUrl.startsWith("http://") && !baseUrl.startsWith("https://")) {
      baseUrl = `https://${baseUrl}`;
    }
    while (baseUrl.endsWith("/")) {
      baseUrl = baseUrl.slice(0, -1);
    }
    const path = `/invitation/${encodeURIComponent(type)}/${encodeURIComponent(
      templateId
    )}/${encodeURIComponent(uniqueId)}`;

    const fullUrl = `${baseUrl}${path}`;
    await savePromise;
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return fullUrl;
  } catch (error) {
    console.error("Error generating shareable link:", error);
    throw new Error(
      "Havola yaratishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
    );
  }
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
    let userId = "anonymous";
    try {
      const cookies = document.cookie.split(";");
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === "userId") {
          userId = value;
          break;
        }
      }
    } catch (error) {
      console.error("Cookie'dan userId ni olishda xatolik:", error);
    }

    const invitationsCollection = collection(db, "invitations");
    const invitationRef = doc(invitationsCollection, uniqueId);
    const cleanedInvitationData = cleanInvitationData(invitationData);

    await setDoc(invitationRef, {
      uniqueId,
      type,
      templateId,
      invitationData: cleanedInvitationData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    await saveInvitationToServer(
      uniqueId,
      type,
      templateId,
      cleanedInvitationData
    );
  } catch (error) {
    console.error("Taklifnomani saqlashda xatolik:", error);
  }
};

/**
 * Taklifnoma ma'lumotlarini unikal ID orqali Firebase'dan olish
 */
export const getInvitationByUniqueId = async (
  uniqueId: string
): Promise<any | null> => {
  if (!uniqueId) {
    console.warn("getInvitationByUniqueId: uniqueId mavjud emas");
    return null;
  }

  try {
    const invitationDocRef = doc(db, "invitations", uniqueId);
    const invitationDocSnap = await getDoc(invitationDocRef);

    if (invitationDocSnap.exists()) {
      const data = invitationDocSnap.data();
      return data;
    }

    console.warn("Taklifnoma topilmadi:", uniqueId);
    return null;
  } catch (error) {
    console.error("Taklifnoma olishda xatolik:", uniqueId, error);
    return null;
  }
};

/**
 * Taklifnoma ma'lumotlarini tozalash va Firestore uchun moslashtirish
 * Bu funksiya ichki (nested) obyektlarni tekshirib, ularni Firestore uchun mos formatga o'tkazadi
 */
const cleanInvitationData = (data: any): any => {
  if (!data) return {};
  const sourceData = data.invitationData || data;
  const cleanData: any = {};
  const allowedFields = [
    "firstName",
    "secondName",
    "age",
    "date",
    "time",
    "location",
    "eventName",
    "uploadedImage",
    "description",
    "address",
    "phone",
    "email",
    "name",
    "parents",
    "additionalInfo",
  ];

  for (const field of allowedFields) {
    if (sourceData[field] !== undefined) {
      cleanData[field] = sourceData[field];
    }
  }

  return cleanData;
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
    let userId = "anonymous";
    try {
      const cookies = document.cookie.split(";");
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === "userId") {
          userId = value;
          break;
        }
      }
    } catch (error) {
      console.error("Cookie'dan userId ni olishda xatolik:", error);
    }

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
        userId,
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
    if (!queryParams) return null;

    const params = new URLSearchParams(queryParams);
    const data = params.get("data");

    if (!data) return null;

    const decodedData = JSON.parse(decodeURIComponent(data));
    const processedData = {
      type: decodedData.type,
      templateId: decodedData.templateId,
      invitationData: {
        firstName: decodedData.firstName || decodedData.name,
        secondName: decodedData.secondName,
        age: decodedData.age,
        date: decodedData.date,
        time: decodedData.time,
        location: decodedData.location,
        additionalInfo: decodedData.additionalInfo,
        parents: decodedData.parents,
        eventName: decodedData.eventName,
        description: decodedData.description,
        uploadedImage: decodedData.uploadedImage,
      },
    };

    return processedData;
  } catch (error) {
    console.error("Taklifnoma ma'lumotlarini o'qishda xatolik:", error);
    return null;
  }
};

/**
 * Unique ID bo'yicha taklifnomani Firebase'dan olish
 */
const getInvitationFromFirebase = async (uniqueId: string): Promise<any> => {
  try {
    const invitationsCollection = collection(db, "invitations");
    const invitationRef = doc(invitationsCollection, uniqueId);
    const docSnap = await getDoc(invitationRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Firebase'dan ma'lumot olishda xatolik:", error);
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
    const sortedInvitations = data.invitations.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return sortedInvitations;
  } catch (error) {
    console.error("Taklifnomalarni olishda xatolik:", error);
    return [];
  }
};

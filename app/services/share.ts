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
    throw error;
  }
};

/**
 * Taklifnoma ma'lumotlarini tozalash va Firestore uchun moslashtirish
 * Bu funksiya ichki (nested) obyektlarni tekshirib, ularni Firestore uchun mos formatga o'tkazadi
 */
const cleanInvitationData = (data: any): any => {
  if (!data) return {};
  if (data.invitationData) {
    return cleanInvitationData(data.invitationData);
  }
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
  ];

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      cleanData[field] = data[field];
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
 * Taklifnoma ma'lumotlarini havola orqali olish (keshlashtirish bilan)
 */
export const getInvitationDataFromLink = (queryParams: string): any => {
  try {
    const data = new URLSearchParams(queryParams).get("data");
    if (data) {
      const decodedData = JSON.parse(decodeURIComponent(data));
      try {
        const dataHash = btoa(queryParams).substring(0, 20);
        const cacheKey = `invitation_link_${dataHash}`;
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            data: decodedData,
            timestamp: new Date().toISOString(),
          })
        );
        console.log("Havola ma'lumotlari keshga saqlandi");
      } catch (storageError) {
        console.error("Keshga saqlashda xatolik:", storageError);
      }

      return decodedData;
    }
    return null;
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
 * Unique ID bo'yicha taklifnomani olish (keshlashtirish bilan)
 */
export const getInvitationByUniqueId = async (
  uniqueId: string
): Promise<any> => {
  try {
    const cacheKey = `invitation_${uniqueId}`;
    let cachedData = null;
    try {
      const cachedString = localStorage.getItem(cacheKey);
      if (cachedString) {
        const cached = JSON.parse(cachedString);
        const cacheTime = new Date(cached.timestamp);
        const now = new Date();
        const cacheAgeHours =
          (now.getTime() - cacheTime.getTime()) / (1000 * 60 * 60);
        if (cacheAgeHours < 24) {
          cachedData = cached.data;
          console.log("Taklifnoma keshdan olindi:", uniqueId);
          return cachedData;
        } else {
          localStorage.removeItem(cacheKey);
        }
      }
    } catch (cacheError) {
      console.error("Keshni o'qishda xatolik:", cacheError);
    }
    const firebaseData = await getInvitationFromFirebase(uniqueId);
    if (firebaseData) {
      const { invitationData, type, templateId, ...rest } = firebaseData;
      const result = {
        ...rest,
        type,
        templateId,
        ...invitationData,
      };
      try {
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            data: result,
            timestamp: new Date().toISOString(),
          })
        );
        console.log("Taklifnoma keshga saqlandi:", uniqueId);
      } catch (storageError) {
        console.error("Keshga saqlashda xatolik:", storageError);
      }
      return result;
    }
    return null;
  } catch (error) {
    console.error("Taklifnomani olishda xatolik:", error);
    return null;
  }
};

/**
 * Foydalanuvchining barcha taklifnomalarini olish (keshlashtirish bilan)
 */
export const getInvitationsByUser = async (userId?: string): Promise<any[]> => {
  try {
    const cacheKey = `user_invitations_${userId || "anonymous"}`;
    try {
      const cachedString = localStorage.getItem(cacheKey);
      if (cachedString) {
        const cached = JSON.parse(cachedString);
        const cacheTime = new Date(cached.timestamp);
        const now = new Date();
        const cacheAgeMinutes =
          (now.getTime() - cacheTime.getTime()) / (1000 * 60);
        if (cacheAgeMinutes < 5) {
          console.log("Foydalanuvchi taklifnomalari keshdan olindi");
          return cached.data;
        } else {
          localStorage.removeItem(cacheKey);
        }
      }
    } catch (cacheError) {
      console.error("Keshni o'qishda xatolik:", cacheError);
    }
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
    try {
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          data: sortedInvitations,
          timestamp: new Date().toISOString(),
        })
      );
      console.log("Foydalanuvchi taklifnomalari keshga saqlandi");
    } catch (storageError) {
      console.error("Keshga saqlashda xatolik:", storageError);
    }
    return sortedInvitations;
  } catch (error) {
    console.error("Taklifnomalarni olishda xatolik:", error);
    return [];
  }
};

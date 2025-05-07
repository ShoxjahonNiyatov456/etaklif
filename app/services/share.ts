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
  const uniqueId = generateUniqueId();
  await saveInvitationToFirebase(uniqueId, type, templateId, invitationData);
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
  try {
    const fullUrl = `${baseUrl}${path}`;
    return fullUrl;
  } catch (error) {
    console.error("Error constructing URL:", error);
    return "#error-url-construction-failed";
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

    await setDoc(invitationRef, {
      uniqueId,
      type,
      templateId,
      invitationData,
      userId,
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
 * Unique ID bo'yicha taklifnomani olish
 */
export const getInvitationByUniqueId = async (
  uniqueId: string
): Promise<any> => {
  try {
    const firebaseData = await getInvitationFromFirebase(uniqueId);
    if (firebaseData) {
      return firebaseData;
    }
    return null;
  } catch (error) {
    console.error("Taklifnomani olishda xatolik:", error);
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

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  QueryDocumentSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { EventType, EventTypeFormData } from "../models/eventTypes";
import { Template, TemplateFormData } from "../models/templates";

// Firebase konfiguratsiyasi
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase-ni ishga tushirish
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Event turlari uchun xizmat
export const eventTypesService = {
  // Barcha event turlarini olish
  async getAllEventTypes(): Promise<EventType[]> {
    const eventTypesCollection = collection(db, "eventTypes");
    const q = query(eventTypesCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        icon: data.icon,
        imageSrc: data.imageSrc,
        isActive: data.isActive,
        createdAt: (data.createdAt as Timestamp).toDate(),
        updatedAt: (data.updatedAt as Timestamp).toDate(),
      };
    });
  },

  // Faol event turlarini olish
  async getActiveEventTypes(): Promise<EventType[]> {
    const eventTypesCollection = collection(db, "eventTypes");
    const q = query(
      eventTypesCollection,
      where("isActive", "==", true),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        icon: data.icon,
        imageSrc: data.imageSrc,
        isActive: data.isActive,
        createdAt: (data.createdAt as Timestamp).toDate(),
        updatedAt: (data.updatedAt as Timestamp).toDate(),
      };
    });
  },

  // Yangi event turini qo'shish
  async createEventType(eventTypeData: EventTypeFormData): Promise<EventType> {
    const eventTypesCollection = collection(db, "eventTypes");
    const newEventTypeRef = doc(eventTypesCollection);

    const now = new Date();

    const newEventType = {
      ...eventTypeData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(newEventTypeRef, newEventType);

    return {
      id: newEventTypeRef.id,
      ...eventTypeData,
      createdAt: now,
      updatedAt: now,
    };
  },

  // Event turini tahrirlash
  async updateEventType(
    id: string,
    eventTypeData: Partial<EventTypeFormData>
  ): Promise<boolean> {
    const eventTypeRef = doc(db, "eventTypes", id);

    try {
      await updateDoc(eventTypeRef, {
        ...eventTypeData,
        updatedAt: serverTimestamp(),
      });
      return true;
    } catch (error) {
      console.error("Error updating event type:", error);
      return false;
    }
  },
  async deleteEventType(id: string): Promise<boolean> {
    const eventTypeRef = doc(db, "eventTypes", id);

    try {
      await deleteDoc(eventTypeRef);
      return true;
    } catch (error) {
      console.error("Error deleting event type:", error);
      return false;
    }
  },

  async getEventTypeById(id: string): Promise<EventType | null> {
    const eventTypeRef = doc(db, "eventTypes", id);
    const eventTypeSnap = await getDoc(eventTypeRef);

    if (eventTypeSnap.exists()) {
      const data = eventTypeSnap.data();
      return {
        id: eventTypeSnap.id,
        title: data.title,
        description: data.description,
        icon: data.icon,
        imageSrc: data.imageSrc,
        isActive: data.isActive,
        createdAt: (data.createdAt as Timestamp).toDate(),
        updatedAt: (data.updatedAt as Timestamp).toDate(),
      };
    } else {
      return null;
    }
  },
};

// Shablonlar uchun xizmat
export const templatesService = {
  // Barcha shablonlarni olish
  async getAllTemplates(): Promise<Template[]> {
    const templatesCollection = collection(db, "templates");
    const q = query(templatesCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        eventTypeId: data.eventTypeId,
        previewImage: data.previewImage,
        content: data.content,
        isActive: data.isActive,
        isPremium: data.isPremium,
        createdAt: (data.createdAt as Timestamp).toDate(),
        updatedAt: (data.updatedAt as Timestamp).toDate(),
      };
    });
  },

  // Faol shablonlarni olish
  async getActiveTemplates(): Promise<Template[]> {
    const templatesCollection = collection(db, "templates");
    const q = query(
      templatesCollection,
      where("isActive", "==", true),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        eventTypeId: data.eventTypeId,
        previewImage: data.previewImage,
        content: data.content,
        isActive: data.isActive,
        isPremium: data.isPremium,
        createdAt: (data.createdAt as Timestamp).toDate(),
        updatedAt: (data.updatedAt as Timestamp).toDate(),
      };
    });
  },

  // Ma'lum event turi uchun shablonlarni olish
  async getTemplatesByEventType(eventTypeId: string): Promise<Template[]> {
    const templatesCollection = collection(db, "templates");
    const q = query(
      templatesCollection,
      where("eventTypeId", "==", eventTypeId),
      where("isActive", "==", true),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        eventTypeId: data.eventTypeId,
        previewImage: data.previewImage,
        content: data.content,
        isActive: data.isActive,
        isPremium: data.isPremium,
        createdAt: (data.createdAt as Timestamp).toDate(),
        updatedAt: (data.updatedAt as Timestamp).toDate(),
      };
    });
  },

  // Yangi shablon qo'shish
  async createTemplate(templateData: TemplateFormData): Promise<Template> {
    const templatesCollection = collection(db, "templates");
    const newTemplateRef = doc(templatesCollection);

    const now = new Date();

    const newTemplate = {
      ...templateData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(newTemplateRef, newTemplate);

    return {
      id: newTemplateRef.id,
      ...templateData,
      createdAt: now,
      updatedAt: now,
    };
  },

  // Shablonni tahrirlash
  async updateTemplate(
    id: string,
    templateData: Partial<TemplateFormData>
  ): Promise<boolean> {
    const templateRef = doc(db, "templates", id);

    try {
      await updateDoc(templateRef, {
        ...templateData,
        updatedAt: serverTimestamp(),
      });
      return true;
    } catch (error) {
      console.error("Error updating template:", error);
      return false;
    }
  },

  async deleteTemplate(id: string): Promise<boolean> {
    const templateRef = doc(db, "templates", id);

    try {
      await deleteDoc(templateRef);
      return true;
    } catch (error) {
      console.error("Error deleting template:", error);
      return false;
    }
  },

  async getTemplateById(id: string): Promise<Template | null> {
    const templateRef = doc(db, "templates", id);
    const templateSnap = await getDoc(templateRef);

    if (templateSnap.exists()) {
      const data = templateSnap.data();
      return {
        id: templateSnap.id,
        title: data.title,
        description: data.description,
        eventTypeId: data.eventTypeId,
        previewImage: data.previewImage,
        content: data.content,
        isActive: data.isActive,
        isPremium: data.isPremium,
        createdAt: (data.createdAt as Timestamp).toDate(),
        updatedAt: (data.updatedAt as Timestamp).toDate(),
      };
    } else {
      return null;
    }
  },
};

// Fayl yuklash uchun xizmat
export const storageService = {
  // Rasm yuklash
  async uploadImage(file: File, path: string): Promise<string> {
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  },
};

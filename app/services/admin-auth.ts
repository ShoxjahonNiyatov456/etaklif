import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export interface AdminUser {
  uid: string;
  email: string;
  role: "admin" | "superadmin";
  name?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export const adminAuthService = {
  async loginAdmin(
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const isAdmin = await this.isUserAdmin(user.uid);

      if (!isAdmin) {
        await signOut(auth);
        return {
          success: false,
          error: "Sizning admin huquqingiz yo'q",
        };
      }
      const adminData = await this.getAdminData(user.uid);
      if (!adminData) {
        await signOut(auth);
        return {
          success: false,
          error: "Admin ma'lumotlari topilmadi",
        };
      }
      return {
        success: true,
        user: adminData,
      };
    } catch (error: any) {
      let errorMessage = "Kirishda xatolik yuz berdi";

      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        errorMessage = "Email yoki parol noto'g'ri";
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  async logoutAdmin(): Promise<boolean> {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      console.error("Chiqishda xatolik:", error);
      return false;
    }
  },
  getCurrentAdmin(): Promise<AdminUser | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe();

        if (!user) {
          resolve(null);
          return;
        }
        const isAdmin = await this.isUserAdmin(user.uid);
        if (!isAdmin) {
          resolve(null);
          return;
        }
        const adminData = await this.getAdminData(user.uid);
        resolve(adminData);
      });
    });
  },
  async isUserAdmin(uid: string): Promise<boolean> {
    const adminDocRef = doc(db, "admins", uid);
    const adminDoc = await getDoc(adminDocRef);

    return adminDoc.exists();
  },
  async getAdminData(uid: string): Promise<AdminUser | null> {
    const adminDocRef = doc(db, "admins", uid);
    const adminDoc = await getDoc(adminDocRef);
    if (!adminDoc.exists()) {
      return null;
    }
    const data = adminDoc.data();
    return {
      uid: adminDoc.id,
      email: data.email,
      role: data.role,
      name: data.name,
      createdAt: data.createdAt.toDate(),
      lastLogin: data.lastLogin ? data.lastLogin.toDate() : undefined,
    };
  },
};

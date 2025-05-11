import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

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

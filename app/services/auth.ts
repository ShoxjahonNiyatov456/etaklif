import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../firebase";

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<{
  success: boolean;
  user?: User;
  error?: string;
}> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return {
      success: true,
      user,
    };
  } catch (error: any) {
    let errorMessage = "Ro'yxatdan o'tishda xatolik yuz berdi";
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "Bu email manzili bilan allaqachon ro'yxatdan o'tilgan.";
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{
  success: boolean;
  user?: User;
  error?: string;
}> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return {
      success: true,
      user,
    };
  } catch (error: any) {
    return {
      success: false,
      error: "Noto'g'ri ma'lumotlar kiritildi",
    };
  }
};

export const loginWithGoogle = async (): Promise<{
  success: boolean;
  user?: User;
  error?: string;
}> => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    return {
      success: true,
      user,
    };
  } catch (error: any) {
    console.error("Google Login Error:", error);

    let errorMessage = "Google orqali kirishda noma'lum xatolik.";
    if (error.code) {
      switch (error.code) {
        case "auth/popup-closed-by-user":
          errorMessage = "Kirish oynasi yopildi.";
          break;
        case "auth/cancelled-popup-request":
          errorMessage =
            "Bir nechta kirish oynasi ochilgan. Faqat bittasini qoldiring.";
          break;
        case "auth/popup-blocked":
          errorMessage =
            "Kirish oynasi brauzer tomonidan bloklandi. Popup blokerni o'chirib qo'ying.";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Google orqali kirish Firebase loyihasida yoqilmagan.";
          break;
        default:
          errorMessage = `Google orqali kirishda xatolik: ${
            error.message || error.code
          }`;
      }
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const loginWithFacebook = async (): Promise<{
  success: boolean;
  user?: User;
  error?: string;
}> => {
  try {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    return {
      success: true,
      user,
    };
  } catch (error: any) {
    return {
      success: false,
      error: "Kirishda xatolik yuz berdi",
    };
  }
};

export const logoutUser = async (): Promise<boolean> => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    return false;
  }
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export { auth };

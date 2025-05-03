import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";

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
const auth = getAuth(app);

// Ro'yxatdan o'tish funksiyasi
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

    // Foydalanuvchi ma'lumotlarini qaytarish
    return {
      success: true,
      user,
    };
  } catch (error: any) {
    let errorMessage = "Ro'yxatdan o'tishda xatolik yuz berdi";
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = "Bu email manzili bilan allaqachon ro'yxatdan o'tilgan.";
    }
    // Boshqa xatolik kodlarini ham shu yerda tekshirish mumkin
    
    return {
      success: false,
      error: errorMessage,
    };
  }
};

// Kirish funksiyasi
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
    // Xatolik xabarni qaytarish
    return {
      success: false,
      error: "Noto'g'ri ma'lumotlar kiritildi",
    };
  }
};

// Google orqali kirish
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
    return {
      success: false,
      error: "Kirishda xatolik yuz berdi",
    };
  }
};

// Facebook orqali kirish
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

// Joriy foydalanuvchini olish
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export { auth };

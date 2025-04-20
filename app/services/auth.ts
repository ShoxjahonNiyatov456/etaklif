import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
  User,
  UserCredential
} from 'firebase/auth';

// Firebase konfiguratsiyasi
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Firebase-ni ishga tushirish
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Ro'yxatdan o'tish funksiyasi
export const registerUser = async (name: string, email: string, password: string): Promise<{
  success: boolean;
  user?: User;
  error?: string;
}> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Foydalanuvchi ma'lumotlarini qaytarish
    return {
      success: true,
      user
    };
  } catch (error: any) {
    console.error('Ro\'yxatdan o\'tishda xatolik:', error);
    let errorMessage = "Ro'yxatdan o'tishda xatolik yuz berdi";
    
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = "Bu email allaqachon ro'yxatdan o'tgan";
    } else if (error.code === 'auth/weak-password') {
      errorMessage = "Parol juda oddiy";
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Kirish funksiyasi
export const loginUser = async (email: string, password: string): Promise<{
  success: boolean;
  user?: User;
  error?: string;
}> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    return {
      success: true,
      user
    };
  } catch (error: any) {
    console.error('Kirishda xatolik:', error);
    let errorMessage = "Kirish vaqtida xatolik yuz berdi";
    
    if (error.code === 'auth/user-not-found') {
      errorMessage = "Bu email ro'yxatdan o'tmagan";
    } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
      errorMessage = "Login yoki parol xato";
    }
    
    return {
      success: false,
      error: errorMessage
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
      user
    };
  } catch (error: any) {
    console.error('Google orqali kirishda xatolik:', error);
    return {
      success: false,
      error: "Google orqali kirishda xatolik yuz berdi"
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
      user
    };
  } catch (error: any) {
    console.error('Facebook orqali kirishda xatolik:', error);
    return {
      success: false,
      error: "Facebook orqali kirishda xatolik yuz berdi"
    };
  }
};

// Tizimdan chiqish
export const logoutUser = async (): Promise<boolean> => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error('Tizimdan chiqishda xatolik:', error);
    return false;
  }
};

// Joriy foydalanuvchini olish
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export { auth };
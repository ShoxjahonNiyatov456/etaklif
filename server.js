require('dotenv').config();
const express = require('express');
const cors = require('cors');
const firebase = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } = require('firebase/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Firebase konfiguratsiyasi
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: process.env.FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: process.env.FIREBASE_APP_ID || "YOUR_APP_ID"
};

// Firebase-ni ishga tushirish
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Ro'yxatdan o'tish API
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "Barcha maydonlarni to'ldiring" });
  }

  try {
    // Firebase orqali foydalanuvchini ro'yxatdan o'tkazish
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Foydalanuvchi ma'lumotlarini qaytarish (token va boshqa ma'lumotlar)
    res.status(201).json({
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        name: name
      },
      token: await user.getIdToken()
    });
  } catch (error) {
    console.error('Ro\'yxatdan o\'tishda xatolik:', error);
    let errorMessage = "Ro'yxatdan o'tishda xatolik yuz berdi";

    if (error.code === 'auth/email-already-in-use') {
      errorMessage = "Bu email allaqachon ro'yxatdan o'tgan";
    } else if (error.code === 'auth/weak-password') {
      errorMessage = "Parol juda oddiy";
    }

    res.status(400).json({ error: errorMessage });
  }
});

// Kirish API
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email va parolni kiriting" });
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    res.status(200).json({
      success: true,
      user: {
        uid: user.uid,
        email: user.email
      },
      token: await user.getIdToken()
    });
  } catch (error) {
    console.error('Kirishda xatolik:', error);
    let errorMessage = "Kirish vaqtida xatolik yuz berdi";

    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errorMessage = "Email yoki parol noto'g'ri";
    }

    res.status(400).json({ error: errorMessage });
  }
});

// Google orqali kirish
app.post('/api/login/google', async (req, res) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    res.status(200).json({
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        name: user.displayName
      },
      token: await user.getIdToken()
    });
  } catch (error) {
    console.error('Google orqali kirishda xatolik:', error);
    res.status(400).json({ error: "Google orqali kirishda xatolik yuz berdi" });
  }
});

// Facebook orqali kirish
app.post('/api/login/facebook', async (req, res) => {
  try {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    res.status(200).json({
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        name: user.displayName
      },
      token: await user.getIdToken()
    });
  } catch (error) {
    console.error('Facebook orqali kirishda xatolik:', error);
    res.status(400).json({ error: "Facebook orqali kirishda xatolik yuz berdi" });
  }
});

// Server portini belgilash
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishga tushdi`);
});
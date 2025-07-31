# Telegram Bot Webhook Sozlash

Bu qo'llanma Telegram bot webhook'ini sozlash va to'lov so'rovlarini tasdiqlash/bekor qilish funksionalligini ishga tushirish uchun mo'ljallangan.

## 1. Telegram Bot Yaratish

Agar sizda Telegram bot mavjud bo'lmasa, quyidagi qadamlarni bajaring:

1. Telegram'da [@BotFather](https://t.me/BotFather) bilan suhbat boshlang
2. `/newbot` buyrug'ini yuboring
3. Bot uchun nom bering (masalan, "Taklifnoma Bot")
4. Bot uchun foydalanuvchi nomi bering (masalan, "taklifnoma_bot") - foydalanuvchi nomi "\_bot" bilan tugashi kerak
5. BotFather sizga API token beradi, uni saqlab qo'ying

## 2. Muhit O'zgaruvchilarini Sozlash

`.env` faylingizga quyidagi o'zgaruvchilarni qo'shing:

```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_ADMIN_CHAT_ID=your_chat_id_here
```

`TELEGRAM_ADMIN_CHAT_ID` ni olish uchun:

1. Telegram'da [@userinfobot](https://t.me/userinfobot) bilan suhbat boshlang
2. Bot sizga ID raqamingizni beradi

## 3. Webhook Sozlash

Webhook'ni sozlash uchun quyidagi URL'ga HTTP so'rov yuborish kerak:

```
https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=<YOUR_WEBHOOK_URL>/api/telegram-webhook
```

Bu yerda:

- `<TELEGRAM_BOT_TOKEN>` - BotFather bergan token
- `<YOUR_WEBHOOK_URL>` - sizning saytingiz URL'i (masalan, https://etaklif.vercel.app)

Misol uchun:

```
https://api.telegram.org/bot123456789:ABCDEF/setWebhook?url=https://etaklif.vercel.app/api/telegram-webhook
```

Bu so'rovni brauzerda ochish yoki cURL orqali yuborish mumkin.

## 4. Webhook Statusini Tekshirish

Webhook to'g'ri sozlanganligini tekshirish uchun:

```
https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getWebhookInfo
```

## 5. Webhook Funksionalligi

Webhook to'g'ri sozlangandan so'ng:

1. Foydalanuvchi to'lov skrinshotini yuklaydi
2. Skrinshot avval Telegram botga yuboriladi
3. Keyin to'lov so'rovi xabari yuboriladi (tasdiqlash/bekor qilish tugmalari bilan)
4. Admin "Tasdiqlash" tugmasini bosganda, Firebase'dagi taklifnoma statusi "paid" ga o'zgaradi
5. Admin "Bekor qilish" tugmasini bosganda, status o'zgarmaydi

## Xatoliklarni Bartaraf Etish

- Webhook sozlash uchun saytingiz SSL sertifikatiga ega bo'lishi kerak (https://)
- Webhook URL'i to'g'ri ekanligini tekshiring
- Muhit o'zgaruvchilari to'g'ri sozlanganligini tekshiring
- Telegram bot token va chat ID to'g'ri ekanligini tekshiring

## Qo'shimcha Ma'lumot

Telegram Bot API haqida batafsil ma'lumot uchun [rasmiy hujjatlar](https://core.telegram.org/bots/api)ga murojaat qiling.

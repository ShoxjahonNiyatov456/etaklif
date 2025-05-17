import Image from "next/image"

interface InvitationData {
  firstName?: string;
  age?: string;
  date?: string;
  time?: string;
  location?: string;
  additionalInfo?: string;
  style?: string
}


export default function InvitationCard({ firstName, age, date, time, location, additionalInfo, style }: InvitationData) {
  const formatDateDisplay = (dateString: string | undefined, defaultDate: string = "12 Iyun"): string => {
    if (!dateString) {
      return defaultDate;
    }
    const alreadyFormattedRegex = /^\d{1,2} (Yanvar|Fevral|Mart|Aprel|May|Iyun|Iyul|Avgust|Sentyabr|Oktyabr|Noyabr|Dekabr)$/i;
    if (alreadyFormattedRegex.test(dateString)) {
      return dateString;
    }
    if (!dateString.includes("-")) {
      return dateString;
    }
    try {
      const parts = dateString.split('-');
      if (parts.length !== 3) {
        return dateString;
      }
      const monthIndex = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      if (isNaN(monthIndex) || isNaN(day) || monthIndex < 0 || monthIndex > 11 || day < 1 || day > 31) {
        return dateString;
      }
      const months = [
        "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
        "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
      ];
      if (monthIndex < 0 || monthIndex >= months.length) {
        return dateString;
      }
      return `${day} ${months[monthIndex]}`;
    } catch (error) {
      console.error("Sana formatlashda xatolik:", error);
      return dateString;
    }
  };
  const getCardContent = () => {
    switch (style) {
      case "colorful":
        return (
          <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src="/birthdayimages/b1.jpg"
              alt="Blue confetti invitation background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg max-w-xs w-full">
                <h2 className="font-dancing text-3xl text-blue-600 mb-2">{firstName || "Aziza"}</h2>
                <p className="text-xl font-semibold text-blue-500 mb-4">{age || "7"} yoshga to'ldi!</p>
                <div className="space-y-2 text-gray-700">
                  <p>{formatDateDisplay(date)}</p>
                  <p>Soat: {time || "15:00"}</p>
                  <p>{location || "Bizning xonadonimizga"}</p>
                  {additionalInfo && <p className="text-sm italic mt-2">{additionalInfo}</p>}
                </div>
              </div>
            </div>
          </div>
        )

      case "kids":
        return (
          <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden">
            <Image
              src="/birthdayimages/b2.jpg"
              alt="Gold and black invitation background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-full max-w-xs space-y-4">
                <h2 className="font-dancing text-4xl text-amber-400 drop-shadow-lg">{firstName || "Aziza"}</h2>
                <p className="text-2xl font-semibold text-amber-300">{age || "7"} yoshga to'ldi!</p>
                <p className="text-2xl font-semibold text-amber-500">Yana bir yil, yana bir unutilmas kun. Sizni tug‘ilgan kunimizda kutib qolamiz!</p>
                <div className="space-y-2 text-amber-900 mt-8">
                  <p>{formatDateDisplay(date)}</p>
                  <p>Soat: {time || "15:00"}</p>
                  <p>{location || "Toshkent, Yunusobod tumani"}</p>
                  {additionalInfo && <p className="text-sm mt-4 text-amber-900">{additionalInfo}</p>}
                </div>
              </div>
            </div>
          </div>
        )

      case "floral-frame":
        return (
          <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src="/birthdayimages/b3.jpg"
              alt="White and gold invitation background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="bg-white/40 backdrop-blur-sm rounded-lg p-6 shadow-lg max-w-xs w-full">
                <h2 className="font-dancing text-3xl text-gray-800 mb-2">{firstName || "Aziza"}</h2>
                <p className="text-xl font-semibold text-gray-700 mb-4">{age || "7"} yoshga to'ldi!</p>
                <p className="font-cursive pb-6 pt-2 text-2xl">Yana bir yilga ulg‘aydi! Bu baxtli kunimda siz aziz insonni yonimda ko‘rishni juda istayman</p>
                <div className="space-y-2 text-gray-700">
                  <p>{formatDateDisplay(date)}</p>
                  <p>Soat: {time || "15:00"}</p>
                  <p>{location || "Toshkent, Yunusobod tumani"}</p>
                  {additionalInfo && <p className="text-sm italic mt-2">{additionalInfo}</p>}
                </div>
              </div>
            </div>
          </div>
        )

      case "butterfly":
        return (
          <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src="/birthdayimages/b4.jpg"
              alt="Yellow festive invitation background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg max-w-xs w-full">
                <h2 className="font-dancing text-3xl text-amber-600 mb-2">{firstName || "Aziza"}</h2>
                <p className="text-xl font-semibold text-amber-500 mb-4">{age || "7"} yoshga to'ldi!</p>
                <p className="text-xl font-sans pt-2 pb-6 text-rose-600">Kechikmang, tort sovg‘a emas — sizning tabassumingiz menga eng katta tuhfa! Sizni tug‘ilgan kunimga chorlayman!</p>
                <div className="space-y-2 text-gray-700">
                  <p>{formatDateDisplay(date)}</p>
                  <p>Soat: {time || "15:00"}</p>
                  <p>{location || "Toshkent, Yunusobod tumani"}</p>
                  {additionalInfo && <p className="text-sm italic mt-2">{additionalInfo}</p>}
                </div>
              </div>
            </div>
          </div>
        )

      case "kids-photo":
        return (
          <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden">
            <Image
              src="/birthdayimages/b5.jpg"
              alt="Peach and gold invitation background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="p-6 max-w-xs w-full">
                <h2 className="font-dancing text-3xl text-orange-600">{firstName || "Aziza"}</h2>
                <p className="text-xl font-semibold text-orange-500 mb-4">{age || "7"} yoshga to'ldi!</p>
                <p className="text-xl text-pink-700 font-serif">Hayotdagi eng yaxshi lahzalar do‘stlar bilan bo‘lishganda ajoyib bo‘ladi. Tug‘ilgan kunimda sizni mehmon sifatida kutaman.</p>
                <div className="space-y-2 mt-2 text-gray-700">
                  <p>Kun: {formatDateDisplay(date)}</p>
                  <p>Soat: {time || "15:00"}</p>
                  <p className="pb-5">{location || "Toshkent, Yunusobod tumani"}</p>
                  {additionalInfo && <p className="text-sm italic mt-2 mb-5">{additionalInfo}</p>}
                </div>
              </div>
            </div>
          </div>
        )

      case "unicorn":
        return (
          <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden">
            <Image
              src="/birthdayimages/b6.jpg"
              alt="Black and gold invitation background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-full max-w-xs space-y-4">
                <h2 className="font-dancing text-4xl text-amber-400 drop-shadow-lg">{firstName || "Aziza"}</h2>
                <p className="text-2xl font-semibold text-amber-400">{age || "7"} yoshga to'ldi!</p>
                <p className="text-2xl font-semibold text-amber-900">Yaxshi odamlar bilan o‘tkazilgan kun – bu unutilmas bayram. Tug‘ilgan kunimni aynan shunday qilish uchun sizni kutyapman!
                </p>
                <div className="space-y-2 text-amber-500 mt-8">
                  <p>{formatDateDisplay(date)}</p>
                  <p>Soat: {time || "15:00"}</p>
                  <p>Manzil: {location || "Toshkent, Yunusobod tumani"}</p>
                  {additionalInfo && <p className="text-sm mt-4 text-amber-200">{additionalInfo}</p>}
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center" style={{ minHeight: "500px" }}>
            <p className="text-gray-500">Shablon topilmadi</p>
          </div>
        )
    }
  }
  return <div className="flex justify-center">{getCardContent()}</div>
}

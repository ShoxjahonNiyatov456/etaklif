interface JubileeTemplateProps {
  style: string;
  firstName: string;
  age: string;
  date: string;
  time: string;
  location: string;
  additionalInfo?: string;
  uploadedImage?: string;
}

// Matnlarni 30 belgigacha cheklash va ularni to'g'ri uzish
const truncateText = (text: string | undefined, maxLength: number = 30): string => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default function JubileeTemplate({
  style,
  firstName,
  age,
  date,
  time,
  location,
  additionalInfo,
  uploadedImage,
}: JubileeTemplateProps) {
  const formattedDate = date
    ? (() => {
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const months = [
          "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
          "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
        ];
        const month = months[dateObj.getMonth()];
        // Faqat kun va oy qaytarish, yil yo'q
        return `${day} ${month}`;
      })()
    : "15 Iyun";

  switch (style) {
    case "celebration":
      return (
        <div
          className="bg-gradient-to-r from-amber-50 to-amber-100 p-8 rounded-lg shadow-lg border-2 border-amber-300"
          style={{ minHeight: "500px" }}
        >
          <div className="text-center">
            <h2 className="text-2xl font-serif text-amber-800 mb-2">
              Yubiley tantanasi
            </h2>
            <p className="text-lg text-amber-700 mb-4">
              {age || "60"} yillik yubiley
            </p>

            <h3 className="text-3xl font-serif text-amber-900 mb-6">
              {firstName || "Dilshod Karimov"}
            </h3>

            <div className="bg-white bg-opacity-70 p-4 rounded-lg mb-4">
              <p className="text-gray-700 mb-1">{formattedDate}</p>
              <p className="text-gray-700 mb-1">Soat: {time || "18:00"}</p>
              <p className="text-gray-700">
                {location || "Toshkent, Yunusobod tumani"}
              </p>
            </div>

            {additionalInfo && (
              <p className="text-sm text-amber-700 mt-4">{additionalInfo}</p>
            )}

            <div className="mt-4 flex justify-center">
              {[...Array(3)].map((_, i) => (
                <span key={i} className="inline-block mx-1 text-2xl">
                  ✨
                </span>
              ))}
            </div>
          </div>
        </div>
      );

    case "elegant":
      return (
        <div
          className="bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200"
          style={{ minHeight: "500px" }}
        >
          <div className="text-center">
            <div className="mb-4">
              <span className="inline-block bg-gray-800 text-white text-xs px-3 py-1 rounded-full">
                Yubiley
              </span>
            </div>

            <h2 className="text-3xl font-serif text-gray-900 mb-2">
              {firstName || "Dilshod Karimov"}
            </h2>
            <p className="text-xl font-serif text-gray-700 mb-6">
              {age || "60"} yillik yubiley tantanasi
            </p>

            <div className="border-t border-b border-gray-300 py-4 mb-6">
              <p className="text-gray-700 mb-1">{formattedDate}</p>
              <p className="text-gray-700 mb-1">Soat: {time || "18:00"}</p>
              <p className="text-gray-700">
                {location || "Toshkent, Yunusobod tumani"}
              </p>
            </div>

            {additionalInfo && (
              <p className="text-sm text-gray-600 italic mt-4">
                {additionalInfo}
              </p>
            )}

            <p className="text-sm text-gray-500 mt-4">
              Tashrif buyurishingizni so'raymiz
            </p>
          </div>
        </div>
      );

    case "geometric-floral":
      return (
        <div
          className="relative bg-white p-8 rounded-lg shadow-lg"
          style={{ minHeight: "550px" }}
        >
          <div className="relative z-10 text-center py-12">
            <h2 className="text-3xl pt-8 pl-3 font-serif text-gray-900 mb-2">
              {age || "50"} Yosh
            </h2>
            <h3 className="text-2xl pl-6 font-serif uppercase tracking-wide text-gray-900 mb-4">
              Qutlug' Bo'lsin
            </h3>

            <p className="text-xl font-serif text-gray-800 mb-6 first-letter:uppercase tracking-widest">
              {firstName || "Shohjahon"}
            </p>

            <p className="text-gray-700 mb-1">
              {formattedDate || "JUNE 15 | 6 PM"}
            </p>
            <p className="text-gray-700 mb-1">
              {location || "402 CROSS STREET"}
            </p>
            <p className="text-gray-700 mb-4">{location ? "" : "DUBLIN"}</p>

            {additionalInfo && (
              <p className="text-sm text-gray-600 mt-4">{additionalInfo}</p>
            )}
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage:
                  "url('/templates/jubilee-geometric-floral.jpg')",
                opacity: 0.9,
              }}
            ></div>
          </div>
        </div>
      );

    case "blue-floral":
      return (
        <div
          className="relative bg-white p-8 rounded-lg shadow-lg"
          style={{ minHeight: "550px" }}
        >
          <div className="relative z-10 text-center py-12">
            <h2 className="text-4xl font-serif text-gray-900 mb-2 pt-10">
              {age || "50"}Yosh
            </h2>
            <h3 className="text-2xl font-serif tracking-wide text-gray-900 mb-2">
              Yubiley tantanasi
            </h3>
            <p className="text-sm font-cursive text-gray-700 mb-4">
              Baxtli bo'ling
            </p>

            <p className="text-2xl font-serif text-gray-800 mb-6">
              {firstName || "JANE & FRANK"}
            </p>

            <p className="text-sm text-gray-700 mb-1">
              {formattedDate || "Saturday, June 15, 2025"}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              {time || "6 o'clock in the evening"} soat
            </p>
            <p className="text-sm text-gray-700 mb-1">
              {location || "402 Cross Street, Dublin"}
            </p>
            {additionalInfo && (
              <p className="text-sm text-gray-600 mt-4">{additionalInfo}</p>
            )}
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage: "url('/templates/jubilee-blue-floral.jpg')",
                opacity: 0.9,
              }}
            ></div>
          </div>
        </div>
      );

    case "photo-frame":
      return (
        <div
          className="relative bg-white p-8 rounded-lg shadow-lg"
          style={{ minHeight: "550px" }}
        >
          <div className="mb-6 flex justify-center">
            {uploadedImage ? (
              <div className="w-64 h-64 rounded-lg overflow-hidden mb-4 mx-auto border-2 border-amber-200 relative">
                <img
                  src={uploadedImage}
                  alt="Yuklangan rasm"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4 mx-auto border-2 border-amber-200">
                <p className="text-gray-500 text-sm">Rasm yuklang</p>
              </div>
            )}
          </div>

          <div className="relative z-10 text-center border-t border-b border-amber-200 py-4 mb-4">
            <p className="font-cursive text-amber-600 text-2xl mb-2">
              Yubileyga Taklif Etildingiz
            </p>
            <h2 className="text-xl font-serif text-gray-900 mb-2">
              {firstName || "JOHN & EVA"}
            </h2>
            <p className="text-lg uppercase tracking-wide text-gray-800 mb-4">
              {age || "50"}Yosh
            </p>

            <p className="text-sm text-gray-700 mb-1">
              {formattedDate || "25-iyul Shanba"} • {time || "6:00 PM"} Soat
            </p>
            <p className="text-sm text-gray-700 mb-1">
              {location || "Jizzax Sidva"}
            </p>
            {additionalInfo && (
              <p className="text-sm text-gray-600 mt-4">{additionalInfo}</p>
            )}
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage: "url('/templates/jubilee-photo-frame.jpg')",
                opacity: 0.3,
              }}
            ></div>
          </div>
        </div>
      );

    default:
      return (
        <div
          className="bg-white p-6 rounded-lg border border-gray-200 text-center"
          style={{ minHeight: "500px" }}
        >
          <p className="text-gray-500">Shablon topilmadi</p>
        </div>
      );
  }
}

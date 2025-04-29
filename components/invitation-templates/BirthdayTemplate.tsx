interface BirthdayTemplateProps {
  style: string
  firstName: string
  age: string
  date: string
  time: string
  location: string
  additionalInfo?: string
  uploadedImage?: string
}

export default function BirthdayTemplate({
  style,
  firstName,
  age,
  date,
  time,
  location,
  additionalInfo,
  uploadedImage,
}: BirthdayTemplateProps) {
  const formattedDate = date
    ? (() => {
      try {
        // Agar date YYYY-MM-DD formatida kelsa
        if (date.includes("-")) {
          const dateObj = new Date(date);
          if (isNaN(dateObj.getTime())) {
            return "Sana belgilanmagan";
          }
          const day = dateObj.getDate();
          const months = [
            "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
            "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
          ];
          const month = months[dateObj.getMonth()];
          return `${day} ${month}`;
        }
        // Agar date allaqachon DD Month formatida kelsa (formattan o'tgan)
        else {
          return date;
        }
      } catch (error) {
        console.error("Date formatting error:", error);
        return date || "Sana belgilanmagan";
      }
    })()
    : "Sana belgilanmagan";
  const truncateText = (text: string | undefined, maxLength: number = 30): string => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const formattedLocation = truncateText(location);
  const formattedAdditionalInfo = truncateText(additionalInfo);
  switch (style) {
    case "colorful":
      return (
        <div
          className="bg-gradient-to-r from-pink-100 to-purple-100 p-8 rounded-lg shadow-lg text-center"
          style={{ minHeight: "500px" }}
        >
          <div className="mb-4">
            <span className="inline-block bg-pink-500 text-white text-xs px-3 py-1 rounded-full">Tug'ilgan kun</span>
          </div>
          <h2 className="text-3xl font-bold text-purple-800 mb-2">{firstName || "Aziza"}</h2>
          <p className="text-xl font-cursive text-pink-600 mb-4">{age || "7"} yoshga to'ldi!</p>

          <div className="bg-white bg-opacity-70 p-4 rounded-lg mb-4">
            <p className="text-gray-700 mb-1">{formattedDate}</p>
            <p className="text-gray-700 mb-1">Soat: {time || "15:00"}</p>
            <p className="text-gray-700 invitation-text">{formattedLocation || "Toshkent, Yunusobod tumani"}</p>
          </div>

          {formattedAdditionalInfo && <p className="text-sm text-purple-700 italic mt-4 invitation-text">{formattedAdditionalInfo}</p>}

          <div className="mt-4 flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="inline-block w-3 h-3 rounded-full bg-pink-400"></span>
            ))}
          </div>
        </div>
      )

    case "kids":
      return (
        <div
          className="bg-blue-50 p-8 rounded-lg shadow-lg border-4 border-blue-300 border-dashed"
          style={{ minHeight: "500px" }}
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Bayramga marhamat!</h2>
            <p className="text-3xl font-cursive text-blue-800 mb-1">{firstName || "Aziza"}</p>
            <p className="text-xl font-bold text-blue-600 mb-4">{age || "7"} yoshga to'ldi!</p>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <p className="text-gray-700 mb-1">{formattedDate}</p>
              <p className="text-gray-700 mb-1">Soat: {time || "15:00"}</p>
              <p className="text-gray-700 invitation-text">{formattedLocation || "Toshkent, Yunusobod tumani"}</p>
            </div>

            {formattedAdditionalInfo && <p className="text-sm text-blue-600 mt-4 invitation-text">{formattedAdditionalInfo}</p>}

            <div className="mt-4 flex justify-center">
              {[...Array(3)].map((_, i) => (
                <span key={i} className="inline-block mx-1 text-2xl">
                  🎈
                </span>
              ))}
            </div>
          </div>
        </div>
      )

    case "floral-frame":
      return (
        <div className="relative bg-gradient-to-br from-pink-50 via-yellow-50 to-pink-100 p-10 rounded-3xl shadow-2xl overflow-hidden" style={{ minHeight: "600px" }}>
          <div className="absolute top-5 left-5 text-5xl animate-bounce">🎈</div>
          <div className="absolute top-10 right-8 text-5xl animate-bounce">🎈</div>
          <div className="absolute bottom-8 left-12 text-6xl">🎂</div>
          <div className="absolute bottom-5 right-10 text-4xl">✨</div>
          <div className="relative z-10 text-center py-16">
            <h2 className="text-4xl font-extrabold text-pink-700 uppercase mb-4 drop-shadow-lg">Tug'ilgan Kuning Bilan</h2>
            <h3 className="text-5xl font-cursive text-yellow-600 mb-6">{firstName || "Chelsea"}</h3>
            <p className="text-lg italic text-gray-700 mb-8">Bu Yillarni Ko'pini Ko'r!</p>
            {formattedAdditionalInfo && (
              <p className="text-base text-gray-600 mt-6 bg-white/70 p-4 rounded-lg shadow-md invitation-text">{formattedAdditionalInfo}</p>
            )}
          </div>
        </div>
      );


    case "butterfly":
      return (
        <div className="relative bg-gradient-to-b from-white via-purple-50 to-pink-50 p-8 rounded-3xl shadow-2xl overflow-hidden" style={{ minHeight: "600px" }}>
          <div className="absolute top-10 left-8 text-4xl animate-fly">🦋</div>
          <div className="absolute top-20 right-10 text-5xl animate-fly-slow">🦋</div>
          <div className="absolute bottom-20 left-16 text-3xl animate-fly">🦋</div>
          <div className="absolute bottom-8 right-14 text-4xl animate-fly-slow">🦋</div>
          <div className="relative z-10 text-center pt-48 pb-8">
            <h2 className="text-4xl font-cursive text-purple-700 mb-4 drop-shadow-md">Tug'ilgan Kuning Bilan</h2>
            <p className="text-sm uppercase tracking-wide text-gray-600 max-w-xs mx-auto">
              Sizga go'zal kun va yana bir yil farovonlik va quvonch tilayman
            </p>
            <div className="mt-10">
              <p className="text-gray-700 mb-1">{formattedDate}</p>
              <p className="text-gray-700 mb-1">Soat: {time || "15:00"}</p>
              <p className="text-gray-700 invitation-text">{formattedLocation || "Toshkent, Yunusobod tumani"}</p>
              {formattedAdditionalInfo && (
                <p className="text-sm text-gray-600 mt-4 invitation-text">{formattedAdditionalInfo}</p>
              )}
            </div>
          </div>
        </div>
      );


    case "kids-photo":
      return (
        <div className="relative bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 p-6 rounded-3xl shadow-2xl overflow-hidden" style={{ minHeight: "600px" }}>
          <div className="absolute top-6 left-6 text-3xl animate-bounce">🎈</div>
          <div className="absolute top-10 right-8 text-4xl animate-pulse">🎂</div>
          <div className="absolute bottom-10 left-12 text-3xl animate-bounce">🎁</div>
          <div className="absolute bottom-8 right-14 text-4xl animate-pulse">🎉</div>
          <div className="relative z-10 flex justify-center items-center" style={{ height: "200px", marginTop: "80px" }}>
            {uploadedImage ? (
              <div className="w-44 h-44 rounded-full overflow-hidden border-8 border-white shadow-lg relative">
                <img
                  src={uploadedImage}
                  alt="Yuklangan rasm"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-44 h-44 rounded-full bg-gray-200 border-8 border-white flex items-center justify-center shadow-lg">
                <p className="text-gray-500 text-sm text-center">Rasm<br />yuklang</p>
              </div>
            )}
          </div>
          <div className="relative z-10 text-center mt-10">
            <h3 className="text-4xl font-cursive text-pink-700 drop-shadow-md">Tug'ulgan Kuning Bilan!</h3>
            <p className="text-base text-gray-700 mt-3">
              Quvonch, baxt va mehr bilan to'la bo'lsin, {firstName || "Oliver"}!
            </p>
            <div className="mt-6">
              {formattedAdditionalInfo && (
                <p className="text-sm text-gray-600 invitation-text">{formattedAdditionalInfo}</p>
              )}
            </div>
          </div>
        </div>
      );


    case "unicorn":
      return (
        <div className="relative bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 p-8 rounded-3xl shadow-2xl overflow-hidden" style={{ minHeight: "600px" }}>
          <div className="absolute top-4 left-6 text-4xl animate-bounce">🦄</div>
          <div className="absolute top-12 right-8 text-3xl animate-pulse">🌈</div>
          <div className="absolute bottom-12 left-10 text-4xl animate-bounce">⭐</div>
          <div className="absolute bottom-8 right-12 text-3xl animate-pulse">✨</div>
          <div className="relative z-10 text-center pt-40">
            <div className="text-white max-w-md mx-auto px-4">
              <p className="mb-2 text-lg font-light">Oy va yulduzlar orasida,</p>
              <p className="mb-2 text-lg font-light">Sehrli otlar ko'radi,</p>
              <p className="mb-2 text-lg font-light">Dunyo sig'dira olmaydigan,</p>
              <p className="mb-6 text-lg font-light">cheksiz sevgini...</p>
              <p className="font-cursive text-3xl text-yellow-200 drop-shadow-lg">Men seni shunday yaxshi ko'ramiz!</p>
              <div className="mt-10 text-pink-100">
                <p className="text-lg font-semibold">{firstName || "Aziza"}, {age || "7"} yoshga to'ldi! 🎉</p>
                {formattedAdditionalInfo && (
                  <p className="text-sm mt-4 invitation-text">{formattedAdditionalInfo}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 text-center" style={{ minHeight: "500px" }}>
          <p className="text-gray-500">Shablon topilmadi</p>
        </div>
      )
  }
}

interface WeddingTemplateProps {
  style: string
  firstName: string
  secondName: string
  date: string
  time: string
  location: string
  additionalInfo?: string
}

export default function WeddingTemplate({
  style,
  firstName,
  secondName,
  date,
  time,
  location,
  additionalInfo,
}: WeddingTemplateProps) {
  const formattedDate = date
    ? (() => {
      try {
        if (date.includes("-")) {
          const dateObj = new Date(date)
          if (isNaN(dateObj.getTime())) {
            return "Sana belgilanmagan"
          }
          const day = dateObj.getDate()
          const months = [
            "Yanvar",
            "Fevral",
            "Mart",
            "Aprel",
            "May",
            "Iyun",
            "Iyul",
            "Avgust",
            "Sentyabr",
            "Oktyabr",
            "Noyabr",
            "Dekabr",
          ]
          const month = months[dateObj.getMonth()]
          return `${day} ${month}`
        } else {
          return date
        }
      } catch (error) {
        console.error("Date formatting error:", error)
        return date || "Sana belgilanmagan"
      }
    })()
    : "Sana belgilanmagan"

  const truncateText = (text: string | undefined, maxLength = 30): string => {
    if (!text) return ""
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  const formattedLocation = truncateText(location)
  const formattedAdditionalInfo = truncateText(additionalInfo, 100)

  switch (style) {
    case "burgundy-roses":
      return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div
            className="p-0 text-center"
            style={{
              minHeight: "550px",
              backgroundImage: "url('/images/gul1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-white/40"></div>
            <div className="relative z-10 p-8 flex flex-col justify-center items-center h-full">
              <p className="font-serif italic text-rose-800 mb-4 text-sm">
                Alloh ularning qalblarini sevgi ila birlashtirdi...
              </p>

              <h2
                className="font-serif text-4xl tracking-wide mb-1 text-rose-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {firstName || "G'ANISHER"}
              </h2>
              <p className="font-serif italic text-2xl text-rose-800 my-2">va</p>
              <h2
                className="font-serif text-4xl tracking-wide mb-6 text-rose-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {secondName || "FARANGIZ"}
              </h2>

              <div className="w-24 h-px bg-rose-700 my-4"></div>

              <p className="font-medium text-rose-800 mb-6 max-w-xs">
                SIZNI HAYOTIMIZDAGI ENG BAXTLI KUN
                <br />
                NIKOH TO'YIMIZGA TAKLIF ETAMIZ
              </p>

              <div className="bg-white/70 rounded-lg p-4 mb-4 w-full max-w-xs">
                <p className="text-rose-900 font-medium mb-2">{formattedDate}</p>
                <p className="text-rose-900 font-medium mb-2">Soat: {time || "18:00"}</p>
                <p className="text-rose-900 font-medium">{formattedLocation || "JAYRON TO'YXONASI"}</p>
              </div>

              {formattedAdditionalInfo && (
                <p className="text-sm text-rose-800 italic mt-2 max-w-xs">{formattedAdditionalInfo}</p>
              )}
            </div>
          </div>
        </div>
      )

    case "peach-floral":
      return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div
            className="p-0 text-center"
            style={{
              minHeight: "550px",
              backgroundImage: "url('/images/gul8.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="relative z-10 p-8 flex flex-col justify-center items-center h-full">
              <p className="font-serif text-amber-800 mb-2 mt-20 uppercase tracking-widest text-xs">
                Siz To'yga taklif etildingiz
              </p>

              <h2
                className="font-serif text-3xl tracking-wide uppercase mb-1 text-amber-900"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {firstName || "Lola"}
              </h2>
              <p className="font-serif italic text-xl text-amber-800 my-2">va</p>
              <h2
                className="font-serif text-3xl tracking-wide uppercase mb-6 text-amber-900"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {secondName || "Akbar"}
              </h2>
              <p className="font-serif text-amber-800 mb-2 uppercase tracking-widest text-xs">
                Orzularimiz birlashgan kun – bu bizning to‘yimiz! Sizni ushbu quvonchli lahzalarga guvoh bo‘lishga taklif qilamiz.
              </p>
              <div className="w-20 h-px bg-amber-600 my-4"></div>

              <div className="bg-white/70 rounded-lg p-4 mb-4 w-full max-w-xs">
                <p className="text-amber-900 font-medium mb-2">{formattedDate}</p>
                <p className="text-amber-900 font-medium mb-2">Soat: {time || "17:00"}</p>
                <p className="text-amber-900 font-medium">{formattedLocation || "NAVRUZ TO'YXONASI"}</p>
              </div>

              {formattedAdditionalInfo && (
                <p className="text-sm text-amber-800 italic mt-2 max-w-xs">{formattedAdditionalInfo}</p>
              )}
            </div>
          </div>
        </div>
      )

    case "golden-frame":
      return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div
            className="p-0 text-center"
            style={{
              minHeight: "550px",
              backgroundImage: "url('/images/gul6.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="relative z-10 p-8 flex flex-col justify-center items-center h-full">
              <h2
                className="font-serif text-4xl mb-1 text-gray-800"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {firstName || "Madina"}
              </h2>
              <p className="font-serif italic text-2xl text-gray-600 my-2">&</p>
              <h2
                className="font-serif text-4xl mb-6 text-gray-800"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {secondName || "Rustam"}
              </h2>

              <div className="w-24 h-px bg-amber-400 my-6"></div>

              <p className="font-medium text-gray-700 mb-6 max-w-xs">
                Sizni bizning nikoh to'yimizga
                <br />
                taklif etishdan mamnunmiz
              </p>

              <div className="bg-white/70 rounded-lg p-4 mb-4 w-full max-w-xs border border-amber-200">
                <p className="text-gray-800 font-medium mb-2">{formattedDate}</p>
                <p className="text-gray-800 font-medium mb-2">Soat: {time || "16:30"}</p>
                <p className="text-gray-800 font-medium">{formattedLocation || "VINTAGE SAROY TO'YXONASI"}</p>
              </div>

              {formattedAdditionalInfo && (
                <p className="text-sm text-gray-600 italic mt-2 max-w-xs">{formattedAdditionalInfo}</p>
              )}
            </div>
          </div>
        </div>
      )

    case "colorful-garden":
      return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div
            className="p-0 text-center"
            style={{
              minHeight: "550px",
              backgroundImage: "url('/images/gul9.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-white/20"></div>
            <div className="relative z-10 p-8 flex flex-col justify-center items-center h-full">
              <p className="font-serif text-pink-700 mb-2 uppercase tracking-widest text-xs">Nikoh to'yi</p>

              <h2
                className="font-serif text-4xl tracking-wide mb-1 text-pink-900"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                {firstName || "Gulnora"}
              </h2>
              <p className="font-serif text-xl text-pink-700 my-2">va</p>
              <h2
                className="font-serif text-4xl tracking-wide mb-6 text-pink-900"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                {secondName || "Alisher"}
              </h2>

              <div className="w-20 h-px bg-pink-500 my-4"></div>

              <p className="font-medium text-pink-800 mb-6 max-w-xs">
                Sizni bizning nikoh to'yimizga
                <br />
                taklif etishdan baxtiyormiz
              </p>

              <div className="bg-white/70 rounded-lg p-4 mb-4 w-full max-w-xs">
                <p className="text-pink-900 font-medium mb-2">{formattedDate}</p>
                <p className="text-pink-900 font-medium mb-2">Soat: {time || "17:00"}</p>
                <p className="text-pink-900 font-medium">{formattedLocation || "TABIAT QO'YNIDAGI TO'YXONA"}</p>
              </div>

              {formattedAdditionalInfo && (
                <p className="text-sm text-pink-800 italic mt-2 max-w-xs">{formattedAdditionalInfo}</p>
              )}
            </div>
          </div>
        </div>
      )

    case "watercolor-bouquet":
      return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div
            className="p-0 text-center"
            style={{
              minHeight: "550px",
              backgroundImage: "url('/images/gul7.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-white/30"></div>
            <div className="relative z-10 p-8 flex flex-col justify-center items-center h-full">
              <h2
                className="font-serif text-4xl mb-1 text-rose-800"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {firstName || "Kamola"}
              </h2>
              <p className="font-serif italic text-2xl text-rose-700 my-2">+</p>
              <h2
                className="font-serif text-4xl mb-6 text-rose-800"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {secondName || "Davron"}
              </h2>

              <div className="w-16 h-px bg-rose-500 my-6"></div>

              <p className="font-medium text-rose-700 mb-6 max-w-xs">
                Siz aziz do‘stimizni, baxt sari qo‘ygan ilk qadamlarimizda yonimizda bo‘lishingizni xohlaymiz
              </p>

              <div className="bg-white/70 rounded-lg p-4 mb-4 w-full max-w-xs">
                <p className="text-rose-800 font-medium mb-2">{formattedDate}</p>
                <p className="text-rose-800 font-medium mb-2">Soat: {time || "19:00"}</p>
                <p className="text-rose-800 font-medium">{formattedLocation || "MINIMALIST TO'YXONA"}</p>
              </div>

              {formattedAdditionalInfo && (
                <p className="text-sm text-rose-700 italic mt-2 max-w-xs">{formattedAdditionalInfo}</p>
              )}
            </div>
          </div>
        </div>
      )

    case "pink-roses":
      return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div
            className="p-0 text-center"
            style={{
              minHeight: "550px",
              backgroundImage: "url('/images/gul5.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="relative z-10 p-8 flex flex-col justify-center items-center h-full">
              <p className="font-serif text-rose-700 mb-4 uppercase tracking-widest text-xs">Nikoh marosimi</p>

              <h2
                className="font-serif text-5xl italic mb-1 text-rose-800"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {firstName || "Malika"}
              </h2>
              <p className="font-serif italic text-2xl text-rose-600 my-2">va</p>
              <h2
                className="font-serif text-5xl italic mb-6 text-rose-800"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {secondName || "Jamshid"}
              </h2>

              <div className="w-24 h-px bg-rose-300 my-6"></div>

              <p className="font-medium text-rose-700 mb-6 max-w-xs">
                Sizni hayotimizdagi eng quvonchli kunimizga
                <br />
                taklif etishdan mamnunmiz
              </p>

              <div className="bg-white/80 rounded-lg p-4 mb-4 w-full max-w-xs">
                <p className="text-rose-800 font-medium mb-2">{formattedDate}</p>
                <p className="text-rose-800 font-medium mb-2">Soat: {time || "17:30"}</p>
                <p className="text-rose-800 font-medium">{formattedLocation || "TOSHKENT SHAHAR, NAVRUZ TO'YXONASI"}</p>
              </div>

              {formattedAdditionalInfo && (
                <p className="text-sm text-rose-700 italic mt-2 max-w-xs">{formattedAdditionalInfo}</p>
              )}
            </div>
          </div>
        </div>
      )

    case "rose-gold":
      return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div
            className="p-0 text-center"
            style={{
              minHeight: "550px",
              backgroundImage: "url('/images/gul10.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="relative z-10 p-8 flex flex-col justify-center items-center h-full">
              <h2
                className="font-serif text-4xl mb-1 text-rose-800"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                {firstName || "Dilnoza"}
              </h2>
              <p className="font-serif italic text-2xl text-rose-700 my-2">&</p>
              <h2
                className="font-serif text-4xl mb-6 text-rose-800"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                {secondName || "Sardor"}
              </h2>

              <div className="w-16 h-px bg-rose-300 my-6"></div>

              <p className="font-medium text-rose-700 mb-6 max-w-xs">
                Muhabbat yo‘lida birga yurishga qaror qildik. Bu quvonchli kunimizda sizni ham oramizda ko‘rishni istaymiz.
              </p>

              <div className="bg-white/70 rounded-lg p-4 mb-4 w-full max-w-xs border border-rose-200">
                <p className="text-rose-800 font-medium mb-2">{formattedDate}</p>
                <p className="text-rose-800 font-medium mb-2">Soat: {time || "18:00"}</p>
                <p className="text-rose-800 font-medium">{formattedLocation || "SAMARKAND REGISTON TO'YXONASI"}</p>
              </div>

              {formattedAdditionalInfo && (
                <p className="text-sm text-rose-700 italic mt-2 max-w-xs">{formattedAdditionalInfo}</p>
              )}
            </div>
          </div>
        </div>
      )

    case "elegant-corner":
      return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div
            className="p-0 text-center"
            style={{
              minHeight: "550px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "#fff",
            }}
          >
            <div
              className="absolute top-0 left-0 w-1/2 h-1/2"
              style={{
                backgroundImage: "url('/images/gul2.jpg')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
              }}
            ></div>
            <div
              className="absolute bottom-0 right-0 w-1/2 h-1/2"
              style={{
                backgroundImage: "url('/images/gul2.jpg')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom right",
                transform: "rotate(180deg)",
              }}
            ></div>

            <div className="relative z-10 p-8 flex flex-col justify-center items-center h-full">
              <p className="font-serif text-rose-700 mb-2 uppercase tracking-widest text-xs">Nikoh to'yi</p>

              <h2
                className="font-serif text-4xl tracking-wide mb-1 text-rose-800"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {firstName || "ALEXIS"}
              </h2>
              <p className="font-serif italic text-2xl text-rose-700 my-2">va</p>
              <h2
                className="font-serif text-4xl tracking-wide mb-6 text-rose-800"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {secondName || "MARCUS"}
              </h2>

              <div className="w-20 h-px bg-rose-400 my-4"></div>

              <p className="font-medium text-rose-700 mb-6 max-w-xs">Quvonchimizni siz bilan bo‘lishmoqchimiz! Bizning nikoh marosimimizga taklif etishdan mamnunmiz!</p>

              <div className="bg-white border border-rose-200 rounded-lg p-4 mb-4 w-full max-w-xs shadow-sm">
                <p className="text-rose-800 font-medium mb-2">{formattedDate}</p>
                <p className="text-rose-800 font-medium mb-2">Soat: {time || "2 PM"}</p>
                <p className="text-rose-800 font-medium">{formattedLocation || "First Church Sanctuary"}</p>
              </div>

              {formattedAdditionalInfo && (
                <p className="text-sm text-rose-700 italic mt-2 max-w-xs">{formattedAdditionalInfo}</p>
              )}
            </div>
          </div>
        </div>
      )

    case "floral-gold":
      return (
        <div className="relative bg-gradient-to-r from-amber-50 to-yellow-50 p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <div className="text-center" style={{ minHeight: "500px" }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 text-3xl text-amber-300">🌸</div>
              <div className="absolute top-8 right-8 text-3xl text-amber-400">🌺</div>
              <div className="absolute bottom-4 left-8 text-3xl text-amber-300">🌸</div>
              <div className="absolute bottom-8 right-4 text-3xl text-amber-400">🌺</div>
            </div>
            <div className="relative z-10 py-10">
              <h2 className="text-3xl font-serif text-amber-800 mb-2">{firstName || "ZARA"}</h2>
              <p className="text-xl font-cursive text-amber-700 mb-2">va</p>
              <h2 className="text-3xl font-serif text-amber-800 mb-6">{secondName || "KIERAN"}</h2>

              <p className="text-lg text-amber-700 mb-4">Sizni baxtimizga sherik bo‘lish uchun to‘y tantanamizga taklif qilamiz!</p>
              <div className="bg-white bg-opacity-70 p-4 rounded-lg mb-6">
                <p className="text-amber-700 mb-2">{formattedDate}</p>
                <p className="text-amber-700 mb-2">Soat: {time || "2 PM"}</p>
                <p className="text-amber-700">{formattedLocation || "To'yxona"}</p>
              </div>

              {formattedAdditionalInfo && (
                <p className="text-sm text-amber-600 italic mt-4">{formattedAdditionalInfo}</p>
              )}
            </div>
          </div>
        </div>
      )

    case "elegant-frame":
      return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div className="p-8 text-center" style={{ minHeight: "500px" }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-8 border border-amber-300"></div>
              <div className="absolute top-6 right-24 text-2xl text-gray-300 opacity-80">❀</div>
              <div className="absolute top-6 right-16 text-2xl text-gray-300 opacity-80">❀</div>
              <div className="absolute top-10 right-20 text-2xl text-gray-300 opacity-80">❀</div>

              <div className="absolute bottom-6 left-24 text-2xl text-gray-300 opacity-80">❀</div>
              <div className="absolute bottom-6 left-16 text-2xl text-gray-300 opacity-80">❀</div>
              <div className="absolute bottom-10 left-20 text-2xl text-gray-300 opacity-80">❀</div>
            </div>
            <div className="relative z-10 py-10">
              <h2 className="text-2xl font-serif tracking-wide uppercase mb-1 text-olive-800">
                {firstName || "ZARA"} &
              </h2>
              <h2 className="text-2xl font-serif tracking-wide uppercase mb-4 text-olive-800">
                {secondName || "KIERAN"}
              </h2>

              <p className="text-sm text-gray-700 mb-2">Siz Taklif Qilindingiz!</p>
              <p className="text-xl font-serif mb-6">To'y</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <p className="text-sm text-gray-700">{formattedDate}</p>
                <p className="text-sm text-gray-700">{time || "AT 2 PM"}</p>
                <div>
                  <p className="text-sm font-medium text-gray-700">{location || "Chapel"}</p>
                  <p className="text-sm text-gray-700">{location ? "" : "NASHVILLE"}</p>
                </div>
              </div>

              {formattedAdditionalInfo && (
                <p className="text-xs text-gray-600 italic mt-4">{formattedAdditionalInfo}</p>
              )}

              <p className="text-xs text-gray-600 italic mt-4">Albatta Keling!</p>
            </div>
          </div>
        </div>
      )

    case "blue-floral":
      return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div className="p-8 text-center" style={{ minHeight: "500px" }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 text-3xl text-blue-400">🌸</div>
              <div className="absolute top-8 left-8 text-3xl text-blue-300">🌺</div>
              <div className="absolute top-6 left-16 text-2xl text-blue-200">🌿</div>
              <div className="absolute top-4 right-16 text-2xl text-amber-200">🌼</div>
              <div className="absolute top-8 right-8 text-2xl text-blue-300">🌿</div>
              <div className="absolute bottom-8 left-8 text-3xl text-blue-300">🌸</div>
              <div className="absolute bottom-4 left-16 text-2xl text-blue-200">🌿</div>
              <div className="absolute bottom-4 right-4 text-3xl text-blue-400">🌺</div>
              <div className="absolute bottom-8 right-8 text-3xl text-blue-300">🌸</div>
              <div className="absolute bottom-6 right-16 text-2xl text-amber-200">🌼</div>
            </div>

            <div className="relative z-10 py-10">
              <p className="text-sm text-amber-700 mb-1">Ikki yosh</p>
              <h2 className="text-3xl font-serif tracking-wide uppercase mb-1 text-amber-700">
                {firstName || "ALEXIS"}
              </h2>
              <p className="font-cursive text-xl text-amber-700 mb-1">va</p>
              <h2 className="text-3xl font-serif tracking-wide uppercase mb-6 text-amber-700">
                {secondName || "MARCUS"}
              </h2>
              <p className="text-sm text-amber-700 mb-4">ning to'yiga taklif qilindingiz</p>
              <p className="text-lg font-medium text-amber-700 mb-4">{formattedDate}</p>
              <p className="text-lg font-medium text-amber-700 mb-4">Soat: {time || "2 PM"}</p>
              <p className="text-sm text-amber-700">{location || "First Church Sanctuary"}</p>
              <p className="text-sm text-amber-700 mb-4">{location ? "" : "771 Pierce Drive, Mason"}</p>
              {formattedAdditionalInfo && (
                <p className="text-xs text-amber-700 italic mt-2">{formattedAdditionalInfo}</p>
              )}
            </div>
          </div>
        </div>
      )

    case "golden-ornament":
      return (
        <div className="relative bg-gradient-to-r from-yellow-50 to-amber-50 p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <div className="text-center" style={{ minHeight: "500px" }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-8 border-2 border-amber-300 rounded-lg"></div>
              <div className="absolute top-6 right-6 text-2xl text-amber-400">✨</div>
              <div className="absolute top-6 left-6 text-2xl text-amber-400">✨</div>
              <div className="absolute bottom-6 right-6 text-2xl text-amber-400">✨</div>
              <div className="absolute bottom-6 left-6 text-2xl text-amber-400">✨</div>
            </div>
            <div className="relative z-10 py-10">
              <h2 className="text-3xl font-serif text-amber-800 mb-2">{firstName || "ZARA"}</h2>
              <p className="text-xl font-cursive text-amber-700 mb-2">va</p>
              <h2 className="text-3xl font-serif text-amber-800 mb-6">{secondName || "KIERAN"}</h2>
              <p className="text-lg text-amber-700 mb-4">Sizni baxtimizga sherik bo‘lish uchun to‘y tantanamizga taklif qilamiz!</p>
              <div className="bg-white bg-opacity-70 p-4 rounded-lg mb-6">
                <p className="text-amber-700 mb-2">{formattedDate}</p>
                <p className="text-amber-700 mb-2">Soat: {time || "2 PM"}</p>
                <p className="text-amber-700">{formattedLocation || "To'yxona"}</p>
              </div>

              {formattedAdditionalInfo && (
                <p className="text-sm text-amber-600 italic mt-4">{formattedAdditionalInfo}</p>
              )}
            </div>
          </div>
        </div>
      )

    case "vintage-ornament":
      return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div className="p-8 text-center" style={{ minHeight: "550px" }}>
            <div className="absolute inset-x-0 top-0 h-32 pointer-events-none flex justify-center">
              <div className="w-4/5 h-full relative">
                <div className="absolute inset-x-0 top-6 h-10 flex items-center justify-center">
                  <div className="w-16 h-16 border-2 border-amber-600 rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 border-2 border-amber-600 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute left-8 top-10 h-10 w-1/3 flex items-center">
                  <div className="w-full h-6 border-t-2 border-l-2 border-amber-600 rounded-tl-full"></div>
                </div>
                <div className="absolute right-8 top-10 h-10 w-1/3 flex items-center">
                  <div className="w-full h-6 border-t-2 border-r-2 border-amber-600 rounded-tr-full"></div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-4 flex justify-center">
                  <div className="flex space-x-1">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-amber-600 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none flex justify-center">
              <div className="w-4/5 h-full relative transform rotate-180">
                <div className="absolute inset-x-0 top-6 h-10 flex items-center justify-center">
                  <div className="w-16 h-16 border-2 border-amber-600 rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 border-2 border-amber-600 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute left-8 top-10 h-10 w-1/3 flex items-center">
                  <div className="w-full h-6 border-t-2 border-l-2 border-amber-600 rounded-tl-full"></div>
                </div>
                <div className="absolute right-8 top-10 h-10 w-1/3 flex items-center">
                  <div className="w-full h-6 border-t-2 border-r-2 border-amber-600 rounded-tr-full"></div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-4 flex justify-center">
                  <div className="flex space-x-1">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-amber-600 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 py-16">
              <p className="text-gray-700 mb-6 italic">oilangiz bilan birga</p>

              <h2 className="text-2xl font-serif tracking-wide uppercase mb-1 text-gray-900">
                {firstName || "ARIEL JARVIS"} &
              </h2>
              <h2 className="text-2xl font-serif tracking-wide uppercase mb-6 text-gray-900">
                {secondName || "MARCUS WRIGHT"}
              </h2>
              <p className="text-sm text-gray-700 mb-4">Bir umrga birga deyilgan va'damizni siz aziz mehmonlar bilan nishonlashni istaymiz.</p>
              <p className="text-2xl font-cursive mb-6">To'y Seremoniyasi</p>

              <p className="text-lg font-medium text-gray-800 mb-4 tracking-widest">
                {formattedDate ? formattedDate.replace(/\s/g, "-") : "06.23.2025"}
              </p>

              <p className="text-sm text-gray-700 mb-1">Soat: {time || "5:30"}</p>
              <p className="text-sm text-gray-700 uppercase mb-1">{location || "Asr To'yxonasi"}</p>
              {formattedAdditionalInfo && (
                <p className="text-xs text-gray-600 italic mt-4">{formattedAdditionalInfo}</p>
              )}

              <p className="text-xs text-gray-600 italic mt-4">Albatta Keling!</p>
            </div>
          </div>
        </div>
      )

    case "floral-hexagon":
      return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div className="p-8 text-center" style={{ minHeight: "550px" }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-8 flex items-center justify-center">
                <div
                  className="w-full h-full border-2 border-amber-300"
                  style={{
                    clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  }}
                ></div>
              </div>
            </div>

            <div className="absolute top-4 left-4 pointer-events-none">
              <div className="relative w-32 h-32">
                <div className="absolute top-2 left-10 text-3xl text-rose-300">🌹</div>
                <div className="absolute top-8 left-4 text-3xl text-rose-400">🌺</div>
                <div className="absolute top-12 left-12 text-3xl text-rose-500">🌸</div>
                <div className="absolute top-6 left-20 text-2xl text-green-600">🌿</div>
                <div className="absolute top-16 left-6 text-2xl text-green-700">🌿</div>
                <div className="absolute top-20 left-16 text-2xl text-green-500">🍃</div>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 pointer-events-none">
              <div className="relative w-32 h-32">
                <div className="absolute bottom-2 right-10 text-3xl text-rose-300">🌹</div>
                <div className="absolute bottom-8 right-4 text-3xl text-rose-400">🌺</div>
                <div className="absolute bottom-12 right-12 text-3xl text-rose-500">🌸</div>
                <div className="absolute bottom-6 right-20 text-2xl text-green-600">🌿</div>
                <div className="absolute bottom-16 right-6 text-2xl text-green-700">🌿</div>
                <div className="absolute bottom-20 right-16 text-2xl text-green-500">🍃</div>
              </div>
            </div>

            <div className="absolute bottom-16 left-16 text-2xl text-green-600 pointer-events-none">🌿</div>
            <div className="absolute top-16 right-16 text-2xl text-green-600 pointer-events-none">🌿</div>

            <div className="relative z-10 py-16">
              <p className="text-olive-700 mb-6 uppercase tracking-widest text-xs">Siz To'yga taklif etildingiz</p>

              <h2 className="text-2xl font-serif tracking-wide uppercase mb-1 text-olive-800">
                {firstName || "AVA FLORES"}
              </h2>
              <p className="font-cursive text-xl text-olive-700 mb-1">va</p>
              <h2 className="text-2xl font-serif tracking-wide uppercase mb-6 text-olive-800">
                {secondName || "ETHAN HARRIS"}
              </h2>

              <p className="text-lg font-medium text-olive-700 mb-4">
                {formattedDate ? formattedDate : "SEPTEMBER 16TH AT 5PM 2025"}
              </p>
              <p className="">
                Bir umrga birga deyilgan va'damizni siz aziz mehmonlar bilan nishonlashni istaymiz.
              </p>
              <p className="text-sm text-olive-700 mb-1 mt-12">{location || "st. johnathan cathedral"}</p>
              {formattedAdditionalInfo && (
                <p className="text-xs text-olive-600 italic mt-4">{formattedAdditionalInfo}</p>
              )}
            </div>
          </div>
        </div>
      )

    case "blue-roses":
      return (
        <div className="relative bg-gradient-to-b from-blue-50 to-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div className="p-8 text-center" style={{ minHeight: "550px" }}>
            <div className="absolute top-0 left-0 w-full h-32 pointer-events-none">
              <div className="absolute top-2 left-2 text-3xl text-blue-300">🌸</div>
              <div className="absolute top-4 left-10 text-3xl text-blue-400">🌹</div>
              <div className="absolute top-6 left-20 text-3xl text-purple-300">🌷</div>
              <div className="absolute top-8 right-20 text-3xl text-blue-300">🌸</div>
              <div className="absolute top-4 right-10 text-3xl text-purple-400">🌹</div>
              <div className="absolute top-2 right-2 text-3xl text-blue-400">🌷</div>
              <div className="absolute top-12 left-6 text-2xl text-green-500">🌿</div>
              <div className="absolute top-14 left-16 text-2xl text-green-600">🌿</div>
              <div className="absolute top-12 right-6 text-2xl text-green-500">🌿</div>
              <div className="absolute top-14 right-16 text-2xl text-green-600">🌿</div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none">
              <div className="absolute bottom-2 left-2 text-3xl text-blue-300">🌸</div>
              <div className="absolute bottom-4 left-10 text-3xl text-blue-400">🌹</div>
              <div className="absolute bottom-6 left-20 text-3xl text-purple-300">🌷</div>
              <div className="absolute bottom-8 right-20 text-3xl text-blue-300">🌸</div>
              <div className="absolute bottom-4 right-10 text-3xl text-purple-400">🌹</div>
              <div className="absolute bottom-2 right-2 text-3xl text-blue-400">🌷</div>
              <div className="absolute bottom-12 left-6 text-2xl text-green-500">🌿</div>
              <div className="absolute bottom-14 left-16 text-2xl text-green-600">🌿</div>
              <div className="absolute bottom-12 right-6 text-2xl text-green-500">🌿</div>
              <div className="absolute bottom-14 right-16 text-2xl text-green-600">🌿</div>
            </div>

            <div className="relative z-10 py-16">
              <p className="text-blue-700 mb-4 italic text-sm">Alloh ularning qalblarini sevgi ila birlashtirdi...</p>

              <h2 className="text-3xl font-serif tracking-wide uppercase mb-1 text-blue-800">
                {firstName || "G'ANISHER"}
              </h2>
              <p className="font-cursive text-xl text-blue-700 mb-1">va</p>
              <h2 className="text-3xl font-serif tracking-wide uppercase mb-6 text-blue-800">
                {secondName || "FARANGIZ"}
              </h2>

              <p className="text-base font-medium text-blue-700 mb-6">
                SIZNI HAYOTIMIZDAGI ENG BAXTLI KUN
                <br />
                NIKOH TO'YIMIZGA TAKLIF ETAMIZ
              </p>
              <div className="flex justify-center items-center space-x-4 mb-4">
                <div className="text-center">
                  <p className="text-5xl font-bold text-blue-800">
                    {formattedDate ? formattedDate.split(" ")[0] : "21"}
                  </p>
                  <p className="text-sm uppercase text-blue-600">
                    {formattedDate ? formattedDate.split(" ")[1] : "IYUN"}
                  </p>
                  <p className="text-sm text-blue-600">2025</p>
                </div>
                <div className="text-center">
                  <p className="text-sm uppercase text-blue-600">SOAT</p>
                  <p className="text-2xl font-bold text-blue-800">{time || "18:00"}</p>
                </div>
              </div>

              <p className="text-base text-blue-700 mb-1 font-medium">{location || "JAYRON TO'YXONASI"}</p>

              {formattedAdditionalInfo && (
                <p className="text-xs text-blue-600 italic mt-4">{formattedAdditionalInfo}</p>
              )}
            </div>
          </div>
        </div>
      )

    case "elegant-script":
      return (
        <div className="relative bg-gradient-to-b from-gray-50 to-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div className="p-8 text-center" style={{ minHeight: "550px" }}>
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gray-300"></div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gray-300"></div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-2xl text-gray-300">❦</div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-2xl text-gray-300">❦</div>
            <div className="relative z-10 py-16">
              <p className="text-gray-500 mb-6 uppercase tracking-widest text-xs">Nikoh marosimi</p>
              <h2 className="text-5xl font-serif italic mb-1 text-gray-800">{firstName || "Malika"}</h2>
              <p className="font-cursive text-xl text-gray-600 my-2">va</p>
              <h2 className="text-5xl font-serif italic mb-6 text-gray-800">{secondName || "Jamshid"}</h2>
              <p className="text-base text-gray-600 my-8">
                Sizni hayotimizdagi eng quvonchli kunimizga
                <br />
                taklif etishdan mamnunmiz
              </p>
              <p className="text-lg font-medium text-gray-700 mb-4">
                {formattedDate ? formattedDate : "SENTYABR 5 2025"}
              </p>
              <p className="text-lg font-medium text-gray-700 mb-6">Soat {time || "17:30"}</p>
              <p className="text-base text-gray-600 mb-1">{location || "TOSHKENT SHAHAR"}</p>
              <p className="text-base text-gray-600 mb-6">{location ? "" : "NAVRUZ TO'YXONASI"}</p>
              {formattedAdditionalInfo && (
                <p className="text-sm text-gray-500 italic mt-4">{formattedAdditionalInfo}</p>
              )}
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

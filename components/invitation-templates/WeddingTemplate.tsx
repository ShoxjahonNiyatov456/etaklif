interface WeddingTemplateProps {
  style: string;
  firstName: string;
  secondName: string;
  date: string;
  time: string;
  location: string;
  additionalInfo?: string;
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
        else {
          return date;
        }
      } catch (error) {
        console.error("Date formatting error:", error);
        return date || "Sana belgilanmagan";
      }
    })()
    : "Sana belgilanmagan";
  const truncateText = (
    text: string | undefined,
    maxLength: number = 30
  ): string => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const formattedLocation = truncateText(location);
  const formattedAdditionalInfo = truncateText(additionalInfo);

  switch (style) {
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

              <p className="text-lg text-amber-700 mb-4">ning to'yiga taklif etilasiz</p>

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
      );
    case "elegant-frame":
      return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div className="p-8 text-center" style={{ minHeight: "500px" }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-8 border border-amber-300"></div>
              <div className="absolute top-6 right-24 text-2xl text-gray-300 opacity-80">
                ❀
              </div>
              <div className="absolute top-6 right-16 text-2xl text-gray-300 opacity-80">
                ❀
              </div>
              <div className="absolute top-10 right-20 text-2xl text-gray-300 opacity-80">
                ❀
              </div>

              <div className="absolute bottom-6 left-24 text-2xl text-gray-300 opacity-80">
                ❀
              </div>
              <div className="absolute bottom-6 left-16 text-2xl text-gray-300 opacity-80">
                ❀
              </div>
              <div className="absolute bottom-10 left-20 text-2xl text-gray-300 opacity-80">
                ❀
              </div>
            </div>
            <div className="relative z-10 py-10">
              <h2 className="text-2xl font-serif tracking-wide uppercase mb-1 text-olive-800">
                {firstName || "ZARA"} &
              </h2>
              <h2 className="text-2xl font-serif tracking-wide uppercase mb-4 text-olive-800">
                {secondName || "KIERAN"}
              </h2>

              <p className="text-sm text-gray-700 mb-2">
                Siz Taklif Qilindingiz!
              </p>
              <p className="text-xl font-serif mb-6">To'y</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <p className="text-sm text-gray-700">{formattedDate}</p>
                <p className="text-sm text-gray-700">{time || "AT 2 PM"}</p>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {location || "Chapel"}
                  </p>
                  <p className="text-sm text-gray-700">
                    {location ? "" : "NASHVILLE"}
                  </p>
                </div>
              </div>

              {formattedAdditionalInfo && (
                <p className="text-xs text-gray-600 italic mt-4 invitation-text">
                  {formattedAdditionalInfo}
                </p>
              )}

              <p className="text-xs text-gray-600 italic mt-4">
                Albatta Keling!
              </p>
            </div>
          </div>
        </div>
      );
    case "blue-floral":
      return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div className="p-8 text-center" style={{ minHeight: "500px" }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 text-3xl text-blue-400">
                🌸
              </div>
              <div className="absolute top-8 left-8 text-3xl text-blue-300">
                🌺
              </div>
              <div className="absolute top-6 left-16 text-2xl text-blue-200">
                🌿
              </div>
              <div className="absolute top-4 right-16 text-2xl text-amber-200">
                🌼
              </div>
              <div className="absolute top-8 right-8 text-2xl text-blue-300">
                🌿
              </div>
              <div className="absolute bottom-8 left-8 text-3xl text-blue-300">
                🌸
              </div>
              <div className="absolute bottom-4 left-16 text-2xl text-blue-200">
                🌿
              </div>
              <div className="absolute bottom-4 right-4 text-3xl text-blue-400">
                🌺
              </div>
              <div className="absolute bottom-8 right-8 text-3xl text-blue-300">
                🌸
              </div>
              <div className="absolute bottom-6 right-16 text-2xl text-amber-200">
                🌼
              </div>
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
              <p className="text-sm text-amber-700 mb-4">
                ning to'yiga taklif qilindingiz
              </p>
              <p className="text-lg font-medium text-amber-700 mb-4">
                {formattedDate}
              </p>
              <p className="text-lg font-medium text-amber-700 mb-4">
                Soat: {time || "2 PM"}
              </p>
              <p className="text-sm text-amber-700">
                {location || "First Church Sanctuary"}
              </p>
              <p className="text-sm text-amber-700 mb-4">
                {location ? "" : "771 Pierce Drive, Mason"}
              </p>
              {formattedAdditionalInfo && (
                <p className="text-xs text-amber-700 italic mt-2 invitation-text">
                  {formattedAdditionalInfo}
                </p>
              )}
            </div>
          </div>
        </div>
      );
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

              <p className="text-lg text-amber-700 mb-4">ning to'yiga taklif etilasiz</p>

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
      );
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
                      <div
                        key={i}
                        className="w-1 h-1 bg-amber-600 rounded-full"
                      ></div>
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
                      <div
                        key={i}
                        className="w-1 h-1 bg-amber-600 rounded-full"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 py-16">
              <p className="text-gray-700 mb-6 italic">
                oilangiz bilan birga
              </p>

              <h2 className="text-2xl font-serif tracking-wide uppercase mb-1 text-gray-900">
                {firstName || "ARIEL JARVIS"} &
              </h2>
              <h2 className="text-2xl font-serif tracking-wide uppercase mb-6 text-gray-900">
                {secondName || "MARCUS WRIGHT"}
              </h2>
              <p className="text-sm text-gray-700 mb-4">
                sizlarni ishtirok etishiga taklif qilamiz
              </p>
              <p className="text-2xl font-cursive mb-6">To'y Seremoniyasi</p>

              <p className="text-lg font-medium text-gray-800 mb-4 tracking-widest">
                {formattedDate
                  ? formattedDate.replace(/\s/g, "-")
                  : "06.23.2025"}
              </p>

              <p className="text-sm text-gray-700 mb-1">
                Soat: {time || "5:30"}
              </p>
              <p className="text-sm text-gray-700 uppercase mb-1">
                {location || "Asr To'yxonasi"}
              </p>
              {formattedAdditionalInfo && (
                <p className="text-xs text-gray-600 italic mt-4 invitation-text">
                  {formattedAdditionalInfo}
                </p>
              )}

              <p className="text-xs text-gray-600 italic mt-4">
                Albatta Keling!
              </p>
            </div>
          </div>
        </div>
      );
    case "floral-hexagon":
      return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div className="p-8 text-center" style={{ minHeight: "550px" }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-8 flex items-center justify-center">
                <div
                  className="w-full h-full border-2 border-amber-300"
                  style={{
                    clipPath:
                      "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  }}
                ></div>
              </div>
            </div>

            <div className="absolute top-4 left-4 pointer-events-none">
              <div className="relative w-32 h-32">
                <div className="absolute top-2 left-10 text-3xl text-rose-300">
                  🌹
                </div>
                <div className="absolute top-8 left-4 text-3xl text-rose-400">
                  🌺
                </div>
                <div className="absolute top-12 left-12 text-3xl text-rose-500">
                  🌸
                </div>
                <div className="absolute top-6 left-20 text-2xl text-green-600">
                  🌿
                </div>
                <div className="absolute top-16 left-6 text-2xl text-green-700">
                  🌿
                </div>
                <div className="absolute top-20 left-16 text-2xl text-green-500">
                  🍃
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 pointer-events-none">
              <div className="relative w-32 h-32">
                <div className="absolute bottom-2 right-10 text-3xl text-rose-300">
                  🌹
                </div>
                <div className="absolute bottom-8 right-4 text-3xl text-rose-400">
                  🌺
                </div>
                <div className="absolute bottom-12 right-12 text-3xl text-rose-500">
                  🌸
                </div>
                <div className="absolute bottom-6 right-20 text-2xl text-green-600">
                  🌿
                </div>
                <div className="absolute bottom-16 right-6 text-2xl text-green-700">
                  🌿
                </div>
                <div className="absolute bottom-20 right-16 text-2xl text-green-500">
                  🍃
                </div>
              </div>
            </div>

            <div className="absolute bottom-16 left-16 text-2xl text-green-600 pointer-events-none">
              🌿
            </div>
            <div className="absolute top-16 right-16 text-2xl text-green-600 pointer-events-none">
              🌿
            </div>

            <div className="relative z-10 py-16">
              <p className="text-olive-700 mb-6 uppercase tracking-widest text-xs">
                Siz To'yga taklif etildingiz
              </p>

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

              <p className="text-sm text-olive-700 mb-1">
                {location || "st. johnathan cathedral"}
              </p>
              <p className="text-sm text-olive-700 mb-1">
                {location ? "" : "1153 lemonberry road"}
              </p>
              <p className="text-sm text-olive-700 mb-6">
                {location ? "" : "san diego, ca"}
              </p>

              {formattedAdditionalInfo && (
                <p className="text-xs text-olive-600 italic mt-4 invitation-text">
                  {formattedAdditionalInfo}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    case "floral-props":
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
              <h2 className="text-3xl font-serif tracking-wide uppercase mb-1 text-amber-700">{firstName || "ALEXIS"}</h2>
              <p className="font-cursive text-xl text-amber-700 mb-1">va</p>
              <h2 className="text-3xl font-serif tracking-wide uppercase mb-6 text-amber-700">{secondName || "MARCUS"}</h2>
              <p className="text-sm text-amber-700 mb-4">ning to'yiga taklif qilindingiz</p>
              <p className="text-lg font-medium text-amber-700 mb-4">{formattedDate}</p>
              <p className="text-lg font-medium text-amber-700 mb-4">Soat: {time || "2 PM"}</p>
              <p className="text-sm text-amber-700">{location || "First Church Sanctuary"}</p>
              <p className="text-sm text-amber-700 mb-4">{location ? "" : "771 Pierce Drive, Mason"}</p>
              {formattedAdditionalInfo && <p className="text-xs text-amber-700 italic mt-2">{formattedAdditionalInfo}</p>}
            </div>
          </div>
        </div>)
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

              <h2 className="text-3xl font-serif tracking-wide uppercase mb-1 text-blue-800">{firstName || "G'ANISHER"}</h2>
              <p className="font-cursive text-xl text-blue-700 mb-1">va</p>
              <h2 className="text-3xl font-serif tracking-wide uppercase mb-6 text-blue-800">{secondName || "FARANGIZ"}</h2>

              <p className="text-base font-medium text-blue-700 mb-6">
                SIZNI HAYOTIMIZDAGI ENG BAXTLI KUN
                <br />
                NIKOH TO'YIMIZGA TAKLIF ETAMIZ
              </p>

              <div className="flex justify-center items-center space-x-4 mb-4">
                <div className="text-center">
                  <p className="text-sm uppercase text-blue-600">SHANBA</p>
                  <p className="text-5xl font-bold text-blue-800">{formattedDate ? formattedDate.split(" ")[1] : "21"}</p>
                  <p className="text-sm uppercase text-blue-600">{formattedDate ? formattedDate.split(" ")[2] : "IYUN"}</p>
                  <p className="text-sm text-blue-600">{formattedDate ? formattedDate.split(" ")[3] : "2025"}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm uppercase text-blue-600">SOAT</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {formattedDate && formattedDate.includes(" ") && formattedDate.split(" ").length > 4
                      ? formattedDate.split(" ")[4]
                      : "18:00"}
                  </p>
                </div>
              </div>

              <p className="text-base text-blue-700 mb-1 font-medium">{location || "JAYRON TO'YXONASI"}</p>

              {formattedAdditionalInfo && <p className="text-xs text-blue-600 italic mt-4">{formattedAdditionalInfo}</p>}
            </div>
          </div>
        </div>
      )
    case "pink-hexagon":
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
              <h2 className="text-2xl font-serif tracking-wide uppercase mb-1 text-olive-800">{firstName || "ZARA"} &</h2>
              <h2 className="text-2xl font-serif tracking-wide uppercase mb-4 text-olive-800">{secondName || "KIERAN"}</h2>

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

              {formattedAdditionalInfo && <p className="text-xs text-gray-600 italic mt-4">{formattedAdditionalInfo}</p>}

              <p className="text-xs text-gray-600 italic mt-4">Albatta Keling!</p>
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
              <p className="text-lg font-medium text-gray-700 mb-4">{formattedDate ? formattedDate : "SENTYABR 5 2025"}</p>
              <p className="text-lg font-medium text-gray-700 mb-6">
                Soat{" "}
                {formattedDate && formattedDate.includes(" ") && formattedDate.split(" ").length > 4
                  ? formattedDate.split(" ")[4]
                  : "17:30"}
              </p>
              <p className="text-base text-gray-600 mb-1">{location || "TOSHKENT SHAHAR"}</p>
              <p className="text-base text-gray-600 mb-6">{location ? "" : "NAVRUZ TO'YXONASI"}</p>
              {formattedAdditionalInfo && <p className="text-sm text-gray-500 italic mt-4">{formattedAdditionalInfo}</p>}
            </div>
          </div>
        </div>
      )
    case "floral-gold":
      return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div className="p-8 text-center" style={{ minHeight: "500px" }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-10 border-2 border-amber-300 rounded-sm"></div>
              <div className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-amber-300"></div>
              <div className="absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 border-amber-300"></div>
              <div className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-amber-300"></div>
              <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-amber-300"></div>
              <div className="absolute top-6 right-20 text-3xl text-rose-700 opacity-80">🌸</div>
              <div className="absolute top-10 left-16 text-3xl text-blue-700 opacity-80">🌿</div>
              <div className="absolute bottom-10 right-16 text-3xl text-rose-700 opacity-80">🌺</div>
              <div className="absolute bottom-6 left-20 text-3xl text-blue-700 opacity-80">🌿</div>
            </div>
            <div className="relative z-10 py-10">
              <p className="text-gray-700 mb-2 uppercase tracking-wider text-xs">SIZNI TO'YGA TAKLIF ETAMIZ</p>
              <h2 className="text-2xl font-serif tracking-wide uppercase mb-1 text-gray-900">{firstName || "LORALEIGH"}</h2>
              <p className="font-cursive text-xl mb-1">va</p>
              <h2 className="text-2xl font-serif tracking-wide uppercase mb-6 text-gray-900">
                {secondName || "CHRISTOPHER"}
              </h2>
              <div className="space-y-1 mb-4">
                <p className="text-sm text-gray-700">{formattedDate}</p>
                <p className="text-sm text-gray-700">Soat: {time || "7:00 PM"}</p>
                <p className="text-sm text-gray-700 first-letter:uppercase">{location || "Asr To'yxonasi"}</p>
              </div>
              {formattedAdditionalInfo && <p className="text-xs text-gray-600 italic mt-4">{formattedAdditionalInfo}</p>}
              <p className="text-xs text-gray-600 italic mt-4">Albatta keling</p>
            </div>
          </div>
        </div>
      )
    case "golden-ornament-best":
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
              <p className="text-sm text-gray-700 mb-4">sizlarni ishtirok etishiga taklif qilamiz</p>
              <p className="text-2xl font-cursive mb-6">To'y Seremoniyasi</p>

              <p className="text-lg font-medium text-gray-800 mb-4 tracking-widest">
                {formattedDate ? formattedDate.replace(/\s/g, "-") : "06.23.2025"}
              </p>

              <p className="text-sm text-gray-700 mb-1">Soat: {time || "5:30"}</p>
              <p className="text-sm text-gray-700 uppercase mb-1">{location || "Asr To'yxonasi"}</p>
              {formattedAdditionalInfo && <p className="text-xs text-gray-600 italic mt-4">{formattedAdditionalInfo}</p>}

              <p className="text-xs text-gray-600 italic mt-4">Albatta Keling!</p>
            </div>
          </div>
        </div>
      )
    case "traditional-ornament":
      return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div className="p-8 text-center" style={{ minHeight: "550px" }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-16 bg-blue-50 flex items-center justify-center">
                <div className="w-full h-8 flex">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex-1 border-r border-blue-200 last:border-r-0">
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-16 bg-blue-50 flex items-center justify-center">
                <div className="w-full h-8 flex">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex-1 border-r border-blue-200 last:border-r-0">
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute top-16 left-0 w-8 h-[calc(100%-32px)] bg-blue-50 flex flex-col items-center justify-center">
                <div className="h-full w-4 flex flex-col">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="flex-1 border-b border-blue-200 last:border-b-0">
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute top-16 right-0 w-8 h-[calc(100%-32px)] bg-blue-50 flex flex-col items-center justify-center">
                <div className="h-full w-4 flex flex-col">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="flex-1 border-b border-blue-200 last:border-b-0">
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-10 py-16">
              <p className="text-blue-700 mb-4 italic text-sm">Alloh ularning qalblarini sevgi ila birlashtirdi...</p>

              <h2 className="text-3xl font-serif tracking-wide uppercase mb-1 text-blue-800">{firstName || "G'ANISHER"}</h2>
              <p className="font-cursive text-xl text-blue-700 mb-1">va</p>
              <h2 className="text-3xl font-serif tracking-wide uppercase mb-6 text-blue-800">{secondName || "FARANGIZ"}</h2>

              <p className="text-base font-medium text-blue-700 mb-6">
                SIZNI HAYOTIMIZDAGI ENG BAXTLI KUN
                <br />
                NIKOH TO'YIMIZGA TAKLIF ETAMIZ
              </p>

              <div className="flex justify-center items-center space-x-4 mb-4">
                <div className="text-center">
                  <p className="text-sm uppercase text-blue-600">
                    {formattedDate ? formattedDate.split(" ")[0] : "SHANBA"}
                  </p>
                  <p className="text-5xl font-bold text-blue-800">{formattedDate ? formattedDate.split(" ")[1] : "21"}</p>
                  <p className="text-sm uppercase text-blue-600">{formattedDate ? formattedDate.split(" ")[2] : "IYUN"}</p>
                  <p className="text-sm text-blue-600">{formattedDate ? formattedDate.split(" ")[3] : "2025"}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm uppercase text-blue-600">SOAT</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {formattedDate && formattedDate.includes(" ") && formattedDate.split(" ").length > 4
                      ? formattedDate.split(" ")[4]
                      : "18:00"}
                  </p>
                </div>
              </div>

              <p className="text-base text-blue-700 mb-1 font-medium">{location || "JAYRON TO'YXONASI"}</p>

              {formattedAdditionalInfo && <p className="text-xs text-blue-600 italic mt-4">{formattedAdditionalInfo}</p>}
            </div>
          </div>
        </div>
      )
    case "vintage-ornament":
      return (
        <div className="relative bg-stone-50 rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div className="p-8 text-center" style={{ minHeight: "550px" }}>
            <div className="absolute inset-4 border-4 border-stone-300/50 rounded-lg pointer-events-none"></div>
            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-3xl text-stone-400 pointer-events-none">❦</div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-3xl text-stone-400 pointer-events-none">❦</div>
            <div className="absolute top-16 left-8 text-2xl text-stone-400 pointer-events-none">✽</div>
            <div className="absolute top-16 right-8 text-2xl text-stone-400 pointer-events-none">✽</div>
            <div className="absolute bottom-16 left-8 text-2xl text-stone-400 pointer-events-none">✽</div>
            <div className="absolute bottom-16 right-8 text-2xl text-stone-400 pointer-events-none">✽</div>
            <div className="relative z-10 py-16">
              <p className="text-stone-700 mb-4 uppercase tracking-widest text-xs">Nikoh to'yi</p>
              <h2 className="text-4xl font-serif mb-1 text-stone-800">{firstName || "Madina"}</h2>
              <p className="font-cursive text-xl text-stone-600 mb-1">&</p>
              <h2 className="text-4xl font-serif mb-6 text-stone-800">{secondName || "Rustam"}</h2>
              <div className="flex justify-center my-4">
                <div className="w-16 h-px bg-stone-400 mx-2 mt-3"></div>
                <div className="text-xl text-stone-500">✿</div>
                <div className="w-16 h-px bg-stone-400 mx-2 mt-3"></div>
              </div>
              <p className="text-base text-stone-700 mb-6">
                Sizni bizning nikoh to'yimizga
                <br />
                taklif etishdan mamnunmiz
              </p>
              <p className="text-lg font-medium text-stone-800 mb-2">{formattedDate ? formattedDate : "NOYABR 22 2025"}</p>
              <p className="text-base text-stone-700 mb-6">
                Soat{" "}
                {formattedDate && formattedDate.includes(" ") && formattedDate.split(" ").length > 4
                  ? formattedDate.split(" ")[4]
                  : "16:30"}
              </p>
              <p className="text-base text-stone-700 mb-1 font-medium">{location || "VINTAGE SAROY TO'YXONASI"}</p>
              <p className="text-sm text-stone-600 mb-6">{location ? "" : "TOSHKENT SHAHAR"}</p>
              <div className="flex justify-center my-4">
                <div className="w-16 h-px bg-stone-400 mx-2 mt-3"></div>
                <div className="text-xl text-stone-500">✿</div>
                <div className="w-16 h-px bg-stone-400 mx-2 mt-3"></div>
              </div>
              {formattedAdditionalInfo && <p className="text-xs text-stone-600 italic mt-4">{formattedAdditionalInfo}</p>}
            </div>
          </div>
        </div>
      )
    case "classic":
      return (
        <div className="bg-white p-8 rounded-lg shadow-md text-center" style={{ minHeight: "500px" }}>
          <h2 className="text-3xl font-serif text-gray-800 mb-2">{firstName || "Kelin"} & {secondName || "Kuyov"}</h2>
          <p className="text-lg text-gray-600 mb-4">Sizni to'yimizga taklif etamiz!</p>
          <p className="text-md text-gray-700">{formattedDate}</p>
          <p className="text-md text-gray-700">Soat: {time || "18:00"}</p>
          <p className="text-md text-gray-700 first-letter:uppercase invitation-text">{formattedLocation || "To'yxona manzili"}</p>
          {formattedAdditionalInfo && <p className="text-sm text-gray-500 mt-4 invitation-text">{formattedAdditionalInfo}</p>}
          <p className="text-sm text-gray-500 mt-4">Albatta keling!</p>
        </div>
      );
    case "modern":
      return (
        <div className="bg-gray-100 p-8 rounded-lg shadow-md text-center" style={{ minHeight: "500px" }}>
          <h2 className="text-3xl font-sans font-bold text-purple-700 mb-2">{firstName || "Kelin"} + {secondName || "Kuyov"}</h2>
          <p className="text-lg text-gray-700 mb-4">Bizning baxtli kunimizga qo'shiling!</p>
          <p className="text-md text-gray-800">Sana: {formattedDate}</p>
          <p className="text-md text-gray-800">Vaqt: {time || "19:00"}</p>
          <p className="text-md text-gray-800 first-letter:uppercase invitation-text">Manzil: {formattedLocation || "Zamonaviy to'yxona"}</p>
          {formattedAdditionalInfo && <p className="text-sm text-gray-600 mt-4 invitation-text">{formattedAdditionalInfo}</p>}
          <p className="text-sm text-purple-600 mt-4">Kutib qolamiz!</p>
        </div>
      );
    case "photo-focus":
      return (
        <div className="bg-white p-8 rounded-lg shadow-md text-center" style={{ minHeight: "500px" }}>
          <div className="w-40 h-40 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center border border-gray-300">
            <p className="text-gray-500">Surat uchun joy</p>
          </div>
          <h2 className="text-3xl font-serif text-gray-800 mb-2">{firstName || "Kelin"} & {secondName || "Kuyov"}</h2>
          <p className="text-lg text-gray-600 mb-4">Bizning unutilmas kunimiz!</p>
          <p className="text-md text-gray-700">{formattedDate}</p>
          <p className="text-md text-gray-700">Soat: {time || "18:30"}</p>
          <p className="text-md text-gray-700 first-letter:uppercase invitation-text">{formattedLocation || "To'yxona manzili"}</p>
          {formattedAdditionalInfo && <p className="text-sm text-gray-500 mt-4 invitation-text">{formattedAdditionalInfo}</p>}
          <p className="text-sm text-gray-500 mt-4">Intizorlik bilan kutamiz!</p>
        </div>
      );
    case "golden-ornament":
      return (
        <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 p-8 rounded-lg shadow-xl text-center text-white" style={{ minHeight: "500px" }}>
          <div className="border-2 border-yellow-200 rounded p-6">
            <p className="text-sm uppercase tracking-widest mb-2">Taklifnoma</p>
            <h2 className="text-4xl font-serif mb-1">{firstName || "Javohir"}</h2>
            <p className="text-2xl font-light mb-1">va</p>
            <h2 className="text-4xl font-serif mb-6">{secondName || "Gulnora"}</h2>
            <p className="text-lg mb-1">To'y marosimimizga marhamat</p>
            <p className="text-md font-medium">{formattedDate}</p>
            <p className="text-md font-medium">Soat: {time || "18:00"}</p>
            <p className="text-md font-medium first-letter:uppercase invitation-text">{formattedLocation || "Oltin Saroy"}</p>
            {formattedAdditionalInfo && <p className="text-sm italic mt-4 invitation-text">{formattedAdditionalInfo}</p>}
            <p className="text-sm mt-6">Sizni kutib qolamiz!</p>
          </div>
        </div>
      );
    case "floral-hexagon":
      return (
        <div className="relative bg-rose-50 p-8 rounded-lg shadow-lg text-center" style={{ minHeight: "500px" }}>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-rose-200 rounded-full flex items-center justify-center text-3xl text-rose-600">❀</div>
          <p className="text-xs uppercase tracking-wider text-rose-600 mt-12 mb-2">Bizning To'yimiz</p>
          <h2 className="text-3xl font-serif text-rose-800 mb-1">{firstName || "Asadbek"}</h2>
          <p className="text-xl text-rose-700 mb-1">&</p>
          <h2 className="text-3xl font-serif text-rose-800 mb-6">{secondName || "Sevara"}</h2>
          <div className="border-t border-b border-rose-200 py-3 my-3">
            <p className="text-md text-gray-700">{formattedDate}</p>
            <p className="text-md text-gray-700">Soat: {time || "17:30"}</p>
            <p className="text-md text-gray-700 first-letter:uppercase invitation-text">{formattedLocation || "Bahor To'yxonasi"}</p>
          </div>
          {formattedAdditionalInfo && <p className="text-sm text-gray-600 italic mt-3 invitation-text">{formattedAdditionalInfo}</p>}
          <p className="text-sm text-rose-700 mt-6">Eng yaxshi tilaklar bilan!</p>
        </div>
      );
    case "vintage-ornament":
      return (
        <div className="bg-teal-50 p-8 rounded-lg shadow-md text-center border-4 border-teal-200" style={{ minHeight: "500px" }}>
          <p className="font-cursive text-2xl text-teal-700 mb-4">Taklifnoma</p>
          <h2 className="text-3xl font-serif text-teal-900 mb-1">{firstName || "Rustam"}</h2>
          <p className="text-lg text-teal-800 mb-1">va</p>
          <h2 className="text-3xl font-serif text-teal-900 mb-6">{secondName || "Laylo"}</h2>
          <p className="text-md text-gray-700">Sizni baxtli onimizga sherik bo'lishga chaqiramiz</p>
          <p className="text-md text-gray-700 mt-2">{formattedDate}</p>
          <p className="text-md text-gray-700">Soat: {time || "19:00"}</p>
          <p className="text-md text-gray-700 first-letter:uppercase invitation-text">{formattedLocation || "Navro'z Banket Zali"}</p>
          {formattedAdditionalInfo && <p className="text-sm text-gray-600 italic mt-4 invitation-text">{formattedAdditionalInfo}</p>}
          <p className="text-sm text-teal-700 mt-6">Hurmat bilan!</p>
        </div>
      );
    case "modern-minimalist":
      return (
        <div className="bg-gray-100 p-10 rounded-lg shadow-sm text-left" style={{ minHeight: "500px" }}>
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-6">To'y Taklifnomasi</p>
          <h2 className="text-4xl font-sans font-light text-gray-800 mb-1">{firstName || "Alisher"}</h2>
          <p className="text-2xl font-sans font-light text-gray-600 mb-1">+</p>
          <h2 className="text-4xl font-sans font-light text-gray-800 mb-8">{secondName || "Diyora"}</h2>
          <div className="space-y-2 text-gray-700">
            <p><span className="font-medium">Sana:</span> {formattedDate}</p>
            <p><span className="font-medium">Vaqt:</span> {time || "20:00"}</p>
            <p><span className="font-medium">Manzil:</span> <span className="first-letter:uppercase invitation-text">{formattedLocation || "Loft Restorani"}</span></p>
          </div>
          {formattedAdditionalInfo && <p className="text-sm text-gray-500 mt-6 invitation-text">{formattedAdditionalInfo}</p>}
          <p className="text-sm text-gray-600 mt-8 text-right">Keling, birga nishonlaylik.</p>
        </div>
      );
    case "rustic-charm":
      return (
        <div className="bg-orange-50 p-8 rounded-lg shadow-lg text-center border-2 border-orange-200" style={{ minHeight: "500px" }}>
          <p className="text-sm uppercase tracking-wider text-orange-700 mb-3">Biz Uylanmoqdamiz!</p>
          <h2 className="text-3xl font-serif text-orange-900 mb-1">{firstName || "Sardor"}</h2>
          <p className="text-xl text-orange-800 mb-1">va</p>
          <h2 className="text-3xl font-serif text-orange-900 mb-6">{secondName || "Nigora"}</h2>
          <p className="text-md text-gray-700">Bizning quvonchimizga sherik bo'ling</p>
          <p className="text-md text-gray-700 mt-2">{formattedDate}</p>
          <p className="text-md text-gray-700">Soat: {time || "17:00"}</p>
          <p className="text-md text-gray-700 first-letter:uppercase invitation-text">{formattedLocation || "Tabiat Qo'ynida Restoran"}</p>
          {formattedAdditionalInfo && <p className="text-sm text-gray-600 italic mt-4 invitation-text">{formattedAdditionalInfo}</p>}
          <p className="text-sm text-orange-700 mt-6">Sizni intiqlik bilan kutamiz.</p>
        </div>
      );
    case "luxury-classic":
      return (
        <div className="bg-gradient-to-br from-red-700 via-rose-800 to-red-900 p-10 rounded-xl shadow-2xl text-center text-white" style={{ minHeight: "500px" }}>
          <p className="font-cursive text-3xl mb-4">Taklifnoma</p>
          <h2 className="text-4xl font-serif tracking-wider mb-1">{firstName || "Timur"}</h2>
          <p className="text-2xl font-light mb-1">&</p>
          <h2 className="text-4xl font-serif tracking-wider mb-8">{secondName || "Malika"}</h2>
          <p className="text-lg mb-1">Eng baxtli kunimizda biz bilan bo'ling</p>
          <p className="text-md font-medium">{formattedDate}</p>
          <p className="text-md font-medium">Soat: {time || "19:30"}</p>
          <p className="text-md font-medium first-letter:uppercase invitation-text">{formattedLocation || "Grand Hall"}</p>
          {formattedAdditionalInfo && <p className="text-sm italic mt-4 invitation-text">{formattedAdditionalInfo}</p>}
          <p className="text-sm mt-8">Hurmat va ehtirom ila.</p>
        </div>
      );
    case "garden-party":
      return (
        <div className="bg-green-50 p-8 rounded-lg shadow-lg text-center border-2 border-green-200" style={{ minHeight: "500px" }}>
          <p className="text-sm uppercase tracking-wider text-green-700 mb-3">Bog'da To'y Ziyofati</p>
          <h2 className="text-3xl font-serif text-green-900 mb-1">{firstName || "Farhod"}</h2>
          <p className="text-xl text-green-800 mb-1">va</p>
          <h2 className="text-3xl font-serif text-green-900 mb-6">{secondName || "Zarina"}</h2>
          <p className="text-md text-gray-700">Biz bilan birga nishonlang</p>
          <p className="text-md text-gray-700 mt-2">{formattedDate}</p>
          <p className="text-md text-gray-700">Soat: {time || "16:00"}</p>
          <p className="text-md text-gray-700 first-letter:uppercase invitation-text">{formattedLocation || "Yashil Voha Bog'i"}</p>
          {formattedAdditionalInfo && <p className="text-sm text-gray-600 italic mt-4 invitation-text">{formattedAdditionalInfo}</p>}
          <p className="text-sm text-green-700 mt-6">Keling, birga xursandchilik qilaylik!</p>
        </div>
      );
    case "modern-minimalist":
      return (
        <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div className="p-8 text-center" style={{ minHeight: "500px" }}>
            <div className="relative z-10 py-10">
              <h2 className="text-3xl font-sans text-gray-800 mb-2 tracking-wider">{firstName || "ZARA"}</h2>
              <p className="text-xl font-light text-gray-600 mb-2">va</p>
              <h2 className="text-3xl font-sans text-gray-800 mb-6 tracking-wider">{secondName || "KIERAN"}</h2>

              <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-6"></div>

              <p className="text-lg text-gray-600 mb-6">ning to'yiga taklif etilasiz</p>

              <div className="space-y-2 mb-6">
                <p className="text-gray-700">{formattedDate}</p>
                <p className="text-gray-700">Soat: {time || "2 PM"}</p>
                <p className="text-gray-700">{formattedLocation || "To'yxona"}</p>
              </div>

              {formattedAdditionalInfo && (
                <p className="text-sm text-gray-500 italic mt-4">{formattedAdditionalInfo}</p>
              )}
            </div>
          </div>
        </div>
      );
    case "rustic-charm":
      return (
        <div className="relative bg-amber-50 rounded-lg overflow-hidden shadow-lg max-w-md mx-auto border border-amber-200">
          <div className="p-8 text-center" style={{ minHeight: "500px" }}>
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2I0NWYwNiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')]"></div>
            </div>
            <div className="relative z-10 py-10">
              <h2 className="text-3xl font-serif text-amber-800 mb-2">{firstName || "ZARA"}</h2>
              <p className="text-xl font-cursive text-amber-700 mb-2">va</p>
              <h2 className="text-3xl font-serif text-amber-800 mb-6">{secondName || "KIERAN"}</h2>

              <p className="text-lg text-amber-700 mb-6">ning to'yiga taklif etilasiz</p>

              <div className="bg-white bg-opacity-60 p-6 rounded-lg mb-6">
                <p className="text-amber-800 mb-2">{formattedDate}</p>
                <p className="text-amber-800 mb-2">Soat: {time || "2 PM"}</p>
                <p className="text-amber-800">{formattedLocation || "To'yxona"}</p>
              </div>

              {formattedAdditionalInfo && (
                <p className="text-sm text-amber-700 italic mt-4">{formattedAdditionalInfo}</p>
              )}
            </div>
          </div>
        </div>
      );
    case "luxury-classic":
      return (
        <div className="relative bg-gradient-to-b from-rose-50 to-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto border border-rose-200">
          <div className="p-8 text-center" style={{ minHeight: "500px" }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-8 border border-rose-300"></div>
              <div className="absolute inset-10 border border-rose-200"></div>
            </div>
            <div className="relative z-10 py-10">
              <h2 className="text-3xl font-serif text-rose-800 mb-2">{firstName || "ZARA"}</h2>
              <p className="text-xl font-cursive text-rose-700 mb-2">va</p>
              <h2 className="text-3xl font-serif text-rose-800 mb-6">{secondName || "KIERAN"}</h2>

              <p className="text-lg text-rose-700 mb-6">ning to'yiga taklif etilasiz</p>

              <div className="bg-white bg-opacity-70 p-6 rounded-lg mb-6 border border-rose-100">
                <p className="text-rose-800 mb-2">{formattedDate}</p>
                <p className="text-rose-800 mb-2">Soat: {time || "2 PM"}</p>
                <p className="text-rose-800">{formattedLocation || "To'yxona"}</p>
              </div>

              {formattedAdditionalInfo && (
                <p className="text-sm text-rose-700 italic mt-4">{formattedAdditionalInfo}</p>
              )}
            </div>
          </div>
        </div>
      );
    case "garden-party":
      return (
        <div className="relative bg-gradient-to-b from-emerald-50 to-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          <div className="p-8 text-center" style={{ minHeight: "500px" }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 text-3xl text-emerald-400">🌿</div>
              <div className="absolute top-8 right-8 text-3xl text-emerald-300">🌿</div>
              <div className="absolute bottom-4 left-8 text-3xl text-emerald-400">🌿</div>
              <div className="absolute bottom-8 right-4 text-3xl text-emerald-300">🌿</div>
              <div className="absolute top-12 left-12 text-2xl text-pink-300">🌸</div>
              <div className="absolute bottom-12 right-12 text-2xl text-pink-300">🌸</div>
            </div>
            <div className="relative z-10 py-10">
              <h2 className="text-3xl font-serif text-emerald-800 mb-2">{firstName || "ZARA"}</h2>
              <p className="text-xl font-cursive text-emerald-700 mb-2">va</p>
              <h2 className="text-3xl font-serif text-emerald-800 mb-6">{secondName || "KIERAN"}</h2>

              <p className="text-lg text-emerald-700 mb-6">ning to'yiga taklif etilasiz</p>

              <div className="bg-white bg-opacity-70 p-6 rounded-lg mb-6">
                <p className="text-emerald-800 mb-2">{formattedDate}</p>
                <p className="text-emerald-800 mb-2">Soat: {time || "2 PM"}</p>
                <p className="text-emerald-800">{formattedLocation || "To'yxona"}</p>
              </div>

              {formattedAdditionalInfo && (
                <p className="text-sm text-emerald-700 italic mt-4">{formattedAdditionalInfo}</p>
              )}
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 text-center" style={{ minHeight: "500px" }}>
          <p className="text-gray-500">Shablon topilmadi</p>
        </div>
      );
  }
}

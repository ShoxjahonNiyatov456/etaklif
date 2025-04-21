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
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        // Agar oy raqami bir xonali bo'lsa, oldiga 0 qo'shamiz
        const formattedMonth = month < 10 ? `0${month}` : month;
        // Yil 2100 dan katta bo'lmasligi kerak
        let year = dateObj.getFullYear();
        if (year > 2100) year = 2100;
        return `${day}.${formattedMonth}.${year}`;
      })()
    : "15.06.2023";

  switch (style) {
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
              <div className="absolute top-6 right-20 text-3xl text-rose-700 opacity-80">
                🌸
              </div>
              <div className="absolute top-10 left-16 text-3xl text-blue-700 opacity-80">
                🌿
              </div>
              <div className="absolute bottom-10 right-16 text-3xl text-rose-700 opacity-80">
                🌺
              </div>
              <div className="absolute bottom-6 left-20 text-3xl text-blue-700 opacity-80">
                🌿
              </div>
            </div>
            <div className="relative z-10 py-10">
              <p className="text-gray-700 mb-2 uppercase tracking-wider text-xs">
                SIZNI TO'YGA TAKLIF ETAMIZ
              </p>
              <h2 className="text-2xl font-serif tracking-wide uppercase mb-1 text-gray-900">
                {firstName || "LORALEIGH"}
              </h2>
              <p className="font-cursive text-xl mb-1">va</p>
              <h2 className="text-2xl font-serif tracking-wide uppercase mb-6 text-gray-900">
                {secondName || "CHRISTOPHER"}
              </h2>
              <div className="space-y-1 mb-4">
                <p className="text-sm text-gray-700">
                  {formattedDate} • {time || "7 :00 PM"}
                </p>
                <p className="text-sm text-gray-700 uppercase">
                  {location || "Asr To'yxonasi"}
                </p>
              </div>
              {additionalInfo && (
                <p className="text-xs text-gray-600 italic mt-4">
                  {additionalInfo}
                </p>
              )}
              <p className="text-xs text-gray-600 italic mt-4">
                Albatta keling
              </p>
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
                joyfully invite you to their
              </p>
              <p className="text-xl font-serif mb-6">wedding</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {formattedDate || "Sunday"}
                  </p>
                  <p className="text-sm text-gray-700">{time || "AT 2 PM"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {location || "Chapel"}
                  </p>
                  <p className="text-sm text-gray-700">
                    {location ? "" : "NASHVILLE"}
                  </p>
                </div>
              </div>

              {additionalInfo && (
                <p className="text-xs text-gray-600 italic mt-4">
                  {additionalInfo}
                </p>
              )}

              <p className="text-xs text-gray-600 italic mt-4">
                reception to follow
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

            {/* Content */}
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
                {formattedDate || "JUNE | 22 | 2PM"}
              </p>

              <p className="text-sm text-amber-700">
                {location || "First Church Sanctuary"}
              </p>
              <p className="text-sm text-amber-700 mb-4">
                {location ? "" : "771 Pierce Drive, Mason"}
              </p>

              {additionalInfo && (
                <p className="text-xs text-amber-700 italic mt-2">
                  {additionalInfo}
                </p>
              )}
            </div>
          </div>
        </div>
      );

    case "golden-ornament":
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
                together with their families
              </p>

              <h2 className="text-2xl font-serif tracking-wide uppercase mb-1 text-gray-900">
                {firstName || "ARIEL JARVIS"} &
              </h2>
              <h2 className="text-2xl font-serif tracking-wide uppercase mb-6 text-gray-900">
                {secondName || "MARCUS WRIGHT"}
              </h2>

              <p className="text-sm text-gray-700 mb-4">
                joyfully invite you to attend their
              </p>
              <p className="text-2xl font-cursive mb-6">Wedding Ceremony</p>

              <p className="text-lg font-medium text-gray-800 mb-4 tracking-widest">
                {formattedDate
                  ? formattedDate.replace(/\s/g, ".")
                  : "06.23.2025"}
              </p>

              <p className="text-sm text-gray-700 mb-1">
                at {time || "half past five o'clock"} in the evening
              </p>
              <p className="text-sm text-gray-700 uppercase mb-1">
                {location || "SUNRISES PARADISE RESORT"}
              </p>
              <p className="text-sm text-gray-700 mb-6">
                {location ? "" : "cancun, mexico"}
              </p>

              {additionalInfo && (
                <p className="text-xs text-gray-600 italic mt-4">
                  {additionalInfo}
                </p>
              )}

              <p className="text-xs text-gray-600 italic mt-4">
                reception to follow ceremony
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

              {additionalInfo && (
                <p className="text-xs text-olive-600 italic mt-4">
                  {additionalInfo}
                </p>
              )}
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-500">Shablon topilmadi</p>
        </div>
      );
  }
}

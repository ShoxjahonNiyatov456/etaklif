interface EngagementTemplateProps {
  style: string
  firstName: string
  parents: string
  date: string
  time: string
  location: string
  additionalInfo?: string
  uploadedImage?: string
}

export default function EngagementTemplate({
  style,
  firstName,
  parents,
  date,
  time,
  location,
  additionalInfo,
  uploadedImage,
}: EngagementTemplateProps) {
  const formattedDate = date
    ? (() => {
      const dateObj = new Date(date);
      const day = dateObj.getDate();
      const months = [
        "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
        "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
      ];
      const month = months[dateObj.getMonth()];
      return `${day} ${month}`;
    })()
    : "15 Iyun";
  const truncateText = (text: string | undefined, maxLength: number = 30): string => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  switch (style) {
    case "romantic":
      return (
        <div
          className="bg-gradient-to-r from-pink-50 to-rose-50 p-8 rounded-lg shadow-lg border border-pink-200"
          style={{ minHeight: "500px" }}
        >
          <div className="text-center">
            <h2 className="text-2xl font-serif text-rose-700 mb-4">Qiz uzatish marosimi</h2>
            <h3 className="text-3xl font-serif text-rose-800 mb-2">{truncateText(firstName) || "Madina Karimova"}</h3>
            {parents && <p className="text-lg text-rose-600 mb-6">Ota-onasi: {truncateText(parents)}</p>}
            <div className="bg-white bg-opacity-70 p-4 rounded-lg mb-4">
              <p className="text-gray-700 mb-1">{truncateText(formattedDate)}</p>
              <p className="text-gray-700 mb-1">Soat: {truncateText(time) || "17:00"}</p>
              <p className="text-gray-700">{truncateText(location) || "Toshkent, Yunusobod tumani"}</p>
            </div>
            {truncateText(additionalInfo) && <p className="text-sm text-rose-600 mt-4">{truncateText(additionalInfo)}</p>}
            <div className="mt-4 flex justify-center">
              <span className="inline-block text-2xl">💝</span>
            </div>
          </div>
        </div>
      )
    case "national":
      return (
        <div className="bg-red-50 p-8 rounded-lg shadow-lg border-2 border-red-300" style={{ minHeight: "500px" }}>
          <div className="text-center">
            <h2 className="text-2xl font-serif text-red-800 mb-4">Qiz uzatish marosimi</h2>

            <h3 className="text-3xl font-serif text-red-900 mb-2">{truncateText(firstName) || "Madina Karimova"}</h3>
            {parents && <p className="text-lg text-red-700 mb-6">Ota-onasi: {truncateText(parents)}</p>}

            <div className="border-t border-b border-red-200 py-4 mb-6">
              <p className="text-gray-700 mb-1">{truncateText(formattedDate)}</p>
              <p className="text-gray-700 mb-1">Soat: {truncateText(time) || "17:00"}</p>
              <p className="text-gray-700">{truncateText(location) || "Toshkent, Yunusobod tumani"}</p>
            </div>

            {truncateText(additionalInfo) && <p className="text-sm text-red-700 mt-4">{truncateText(additionalInfo)}</p>}

            <p className="text-sm text-red-600 mt-4">Tashrif buyurishingizni so'raymiz</p>
          </div>
        </div>
      )

    case "floral-engagement":
      return (
        <div className="bg-[#fff8f8] p-8 rounded-lg shadow-lg" style={{ minHeight: "550px" }}>
          <div className="text-center">
            <h2 className="text-2xl font-serif text-rose-700 mb-4">Qiz uzatish marosimi</h2>
            <div className="mb-6 flex justify-center">
              {uploadedImage ? (
                <div className="w-40 h-40 rounded-full border-4 border-rose-200 overflow-hidden relative">
                  <img
                    src={uploadedImage}
                    alt="Qizning rasmi"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-40 h-40 rounded-full border-4 border-rose-200 bg-rose-50 flex items-center justify-center">
                  <p className="text-rose-400 text-sm">Rasm yuklang</p>
                </div>
              )}
            </div>

            <h3 className="text-3xl font-serif text-rose-800 mb-2">{truncateText(firstName) || "Madina Karimova"}</h3>
            {parents && <p className="text-lg text-rose-600 mb-4">Ota-onasi: {truncateText(parents)}</p>}

            <div className="w-16 h-1 bg-rose-200 mx-auto mb-6"></div>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-rose-100">
              <p className="text-gray-700 mb-1">{truncateText(formattedDate)}</p>
              <p className="text-gray-700 mb-1">Soat: {truncateText(time) || "17:00"}</p>
              <p className="text-gray-700">{truncateText(location) || "Toshkent, Yunusobod tumani"}</p>
            </div>

            {truncateText(additionalInfo) && <p className="text-sm text-rose-600 mt-4">{truncateText(additionalInfo)}</p>}

            <p className="text-sm text-rose-500 mt-4">Tashrif buyurishingizni so'raymiz</p>
          </div>
        </div>
      )

    case "modern-engagement":
      return (
        <div
          className="bg-gradient-to-b from-purple-50 to-pink-50 p-8 rounded-lg shadow-lg"
          style={{ minHeight: "550px" }}
        >
          <div className="text-center">
            <h2 className="text-xl font-sans text-purple-700 uppercase tracking-wider mb-4">Qiz uzatish marosimi</h2>

            {/* Photo area */}
            <div className="mb-6 flex justify-center">
              {uploadedImage ? (
                <div className="w-40 h-40 rounded-lg overflow-hidden shadow-md relative">
                  <img
                    src={uploadedImage}
                    alt="Qizning rasmi"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-40 h-40 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center shadow-md">
                  <p className="text-purple-400 text-sm">Rasm yuklang</p>
                </div>
              )}
            </div>

            <h3 className="text-3xl font-sans text-purple-800 mb-2">{truncateText(firstName) || "Madina Karimova"}</h3>
            {parents && <p className="text-lg text-purple-600 mb-4">Ota-onasi: {truncateText(parents)}</p>}

            <div className="flex justify-center items-center mb-6">
              <div className="w-12 h-px bg-purple-300"></div>
              <div className="w-2 h-2 rounded-full bg-pink-400 mx-2"></div>
              <div className="w-12 h-px bg-purple-300"></div>
            </div>

            <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-sm mb-4">
              <p className="text-gray-700 mb-1">{truncateText(formattedDate)}</p>
              <p className="text-gray-700 mb-1">Soat: {truncateText(time) || "17:00"}</p>
              <p className="text-gray-700">{truncateText(location) || "Toshkent, Yunusobod tumani"}</p>
            </div>

            {truncateText(additionalInfo) && <p className="text-sm text-purple-600 mt-4">{truncateText(additionalInfo)}</p>}
          </div>
        </div>
      )

    case "traditional-engagement":
      return (
        <div className="bg-[#fff9f0] p-8 rounded-lg shadow-lg border-2 border-amber-200" style={{ minHeight: "550px" }}>
          <div className="text-center">
            <h2 className="text-2xl font-serif text-amber-800 mb-4">Qiz uzatish marosimi</h2>

            {/* Photo area */}
            <div className="mb-6 flex justify-center">
              {uploadedImage ? (
                <div className="relative">
                  <div className="w-36 h-36 rounded-lg overflow-hidden border-2 border-amber-300 relative">
                    <img
                      src={uploadedImage}
                      alt="Qizning rasmi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 text-2xl">🌹</div>
                  <div className="absolute -top-2 -left-2 text-2xl">🌹</div>
                </div>
              ) : (
                <div className="relative">
                  <div className="w-36 h-36 rounded-lg bg-amber-50 border-2 border-amber-300 flex items-center justify-center">
                    <p className="text-amber-600 text-sm">Rasm yuklang</p>
                  </div>
                  <div className="absolute -bottom-2 -right-2 text-2xl">🌹</div>
                  <div className="absolute -top-2 -left-2 text-2xl">🌹</div>
                </div>
              )}
            </div>

            <h3 className="text-3xl font-serif text-amber-900 mb-2">{truncateText(firstName) || "Madina Karimova"}</h3>
            {parents && <p className="text-lg text-amber-700 mb-4">Ota-onasi: {truncateText(parents)}</p>}

            <div className="border-t border-b border-amber-200 py-4 my-4">
              <p className="text-amber-800 mb-1">{truncateText(formattedDate)}</p>
              <p className="text-amber-800 mb-1">Soat: {truncateText(time) || "17:00"}</p>
              <p className="text-amber-800">{truncateText(location) || "Toshkent, Yunusobod tumani"}</p>
            </div>

            {truncateText(additionalInfo) && <p className="text-sm text-amber-700 mt-4">{truncateText(additionalInfo)}</p>}

            <p className="text-sm text-amber-600 mt-4">Tashrif buyurishingizni so'raymiz</p>
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

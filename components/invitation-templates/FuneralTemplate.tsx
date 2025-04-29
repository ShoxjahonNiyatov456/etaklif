interface FuneralTemplateProps {
  style: string
  firstName: string
  date: string
  time: string
  location: string
  additionalInfo?: string
  uploadedImage?: string
}

export default function FuneralTemplate({
  style,
  firstName,
  date,
  time,
  location,
  additionalInfo,
  uploadedImage,
}: FuneralTemplateProps) {
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
  const truncateText = (text: string | undefined, maxLength: number = 30): string => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  switch (style) {
    case "traditional":
      return (
        <div className="relative bg-gradient-to-br from-amber-100 to-white p-10 rounded-xl shadow-xl border border-amber-300" style={{ minHeight: "500px" }}>
          <div className="absolute top-0 left-0 right-0 flex justify-center mt-4">
            <div className="bg-amber-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow">EL OSHI</div>
          </div>
          <div className="text-center relative z-10 mt-10">
            <h2 className="text-2xl font-serif text-gray-800 mb-4">Hurmatli yurtdoshlar!</h2>
            <p className="text-lg text-gray-700 mb-6">Sizni el oshi marosimiga taklif qilamiz</p>
            <h3 className="text-3xl font-cursive text-amber-700 mb-6">{truncateText(firstName) || "Akbar Karimov"}</h3>
            <div className="border-t border-b border-amber-300 py-4 mb-6">
              <p className="text-gray-700 font-medium mb-1">{truncateText(formattedDate)}</p>
              <p className="text-gray-700 font-medium mb-1">Soat: {truncateText(time) || "12:00"}</p>
              <p className="text-gray-700 font-medium">{truncateText(location) || "Toshkent, Yunusobod tumani"}</p>
            </div>
            {truncateText(additionalInfo) && (
              <p className="text-sm text-gray-600 italic mt-4">{truncateText(additionalInfo)}</p>
            )}
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-amber-400 text-xs">Savobga niyat qilindi</div>
        </div>
      )
    case "calm":
      return (
        <div className="relative bg-gradient-to-br from-blue-50 to-white p-10 rounded-xl shadow-xl border border-blue-200" style={{ minHeight: "500px" }}>
          <div className="absolute top-0 left-0 right-0 flex justify-center mt-4">
            <div className="bg-blue-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow">EL OSHI</div>
          </div>
          <div className="text-center relative z-10 mt-10">
            <h2 className="text-2xl font-serif text-blue-800 mb-4">Aziz yurtdoshlar!</h2>
            <p className="text-lg text-blue-700 mb-6">Sizni el oshi marosimiga taklif etamiz</p>
            <h3 className="text-3xl font-cursive text-blue-900 mb-6">{truncateText(firstName) || "Akbar Karimov"}</h3>
            <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow mb-6">
              <p className="text-blue-800 font-medium mb-2">{truncateText(formattedDate)}</p>
              <p className="text-blue-800 font-medium mb-2">Soat: {truncateText(time) || "12:00"}</p>
              <p className="text-blue-800 font-medium">{truncateText(location) || "Toshkent, Yunusobod tumani"}</p>
            </div>
            {truncateText(additionalInfo) && (
              <p className="text-sm text-blue-600 italic mt-4">{truncateText(additionalInfo)}</p>
            )}
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-blue-400 text-xs">Savobga niyat qilindi</div>
        </div>
      )

    case "photo-memorial":
      return (
        <div className="relative bg-gradient-to-b from-gray-100 to-white p-10 rounded-xl shadow-2xl border border-gray-300" style={{ minHeight: "550px" }}>

          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white text-xs font-semibold px-4 py-1 rounded-full shadow">
            EL OSHI
          </div>
          <div className="text-center relative z-10 mt-16">
            <h2 className="text-2xl font-serif text-gray-700 mb-4">Marhum xotirasiga bag'ishlanadi</h2>
            <div className="flex justify-center mb-6">
              {uploadedImage ? (
                <div className="w-36 h-36 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <img
                    src={uploadedImage}
                    alt="Marhum rasmi"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-36 h-36 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center shadow-lg">
                  <p className="text-gray-400 text-sm">Rasm yuklang</p>
                </div>
              )}
            </div>
            <h3 className="text-3xl font-cursive text-gray-900 mb-2">{truncateText(firstName) || "Akbar Karimov"}</h3>
            <div className="w-20 h-1 bg-gray-400 mx-auto mb-6 rounded"></div>
            <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md mb-6">
              <p className="text-gray-700 font-medium mb-2">{truncateText(formattedDate)}</p>
              <p className="text-gray-700 font-medium mb-2">Soat: {truncateText(time) || "12:00"}</p>
              <p className="text-gray-700 font-medium">{truncateText(location) || "Toshkent, Yunusobod tumani"}</p>
            </div>

            {truncateText(additionalInfo) && (
              <p className="text-sm text-gray-600 italic mt-4">{truncateText(additionalInfo)}</p>
            )}
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-xs">
            Albatta Keling!
          </div>
        </div>
      )
    case "elegant-memorial":
      return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 max-w-3xl mx-auto" style={{ minHeight: "550px" }}>
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">El oshi marosimi</h2>
            </div>
            {uploadedImage && (
              <div className="mb-6 flex justify-center">
                <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg">
                  <img
                    src={uploadedImage}
                    alt="Marhum"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            <h3 className="text-3xl font-serif text-gray-900 mb-2">{truncateText(firstName) || "Akbar Karimov"}</h3>
            <div className="text-sm text-gray-600 space-y-1 mb-6 leading-tight">
              <p>{truncateText(formattedDate) || "2025-yil 5-may"}</p>
              <p>Soat: {truncateText(time) || "12:00"}</p>
              <p>{truncateText(location) || "Toshkent, Yunusobod tumani"}</p>
            </div>
            {truncateText(additionalInfo) && (
              <p className="text-gray-500 text-sm leading-relaxed mt-4">
                {truncateText(additionalInfo)}
              </p>
            )}
          </div>
        </div>
      );
    case "islamic-memorial":
      return (
        <div className="bg-[#f8f4e8] p-8 rounded-lg shadow-lg" style={{ minHeight: "550px" }}>
          <div className="text-center">
            <div className="text-green-800 mb-6">
              <div className="text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</div>
              <div className="text-sm">Mehribon va rahmli Alloh nomi bilan</div>
            </div>
            <div className="mb-6 flex justify-center">
              {uploadedImage ? (
                <div className="w-36 h-36 rounded-lg border-2 border-green-700 overflow-hidden relative">
                  <img
                    src={uploadedImage}
                    alt="El oshi egasiningc rasmi"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-36 h-36 rounded-lg border-2 border-green-700 bg-green-50 flex items-center justify-center">
                  <p className="text-green-700 text-sm">Rasm yuklang</p>
                </div>
              )}
            </div>

            <h2 className="text-xl font-serif text-green-900 mb-2">El oshi marosimi</h2>
            <h3 className="text-3xl font-serif text-green-900 mb-4">{truncateText(firstName) || "Akbar Karimov"}</h3>

            <div className="bg-white bg-opacity-70 p-4 rounded-lg mb-4 border border-green-200">
              <p className="text-gray-700 mb-1">{truncateText(formattedDate)}</p>
              <p className="text-gray-700 mb-1">Soat: {truncateText(time) || "12:00"}</p>
              <p className="text-gray-700">{truncateText(location) || "Toshkent, Yunusobod tumani"}</p>
            </div>

            {truncateText(additionalInfo) && <p className="text-sm text-green-800 mt-4">{truncateText(additionalInfo)}</p>}

            <div className="text-green-800 mt-6 text-sm">
              <p>إِنَّا لِلَّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ</p>
              <p className="mt-1">Albatta biz Allohning (bandalarimiz) va albatta biz U zotga qaytguvchilarmiz</p>
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

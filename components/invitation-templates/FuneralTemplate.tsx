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
      const dateObj = new Date(date);
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1;
      const formattedMonth = month < 10 ? `0${month}` : month;
      let year = dateObj.getFullYear();
      if (year > 2100) year = 2100;
      return `${day}.${formattedMonth}.${year}`;
    })()
    : "15.06.2023"
  switch (style) {
    case "traditional":
      return (
        <div className="bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-300" style={{ minHeight: "500px" }}>
          <div className="text-center">
            <h2 className="text-xl font-serif text-gray-800 mb-6">El oshi marosimi</h2>
            <p className="text-2xl font-serif text-gray-900 mb-6">Marhumning xotirasiga</p>
            <h3 className="text-3xl font-serif text-gray-900 mb-8">{firstName || "Akbar Karimov"}</h3>

            <div className="border-t border-b border-gray-300 py-4 mb-6">
              <p className="text-gray-700 mb-1">{formattedDate}</p>
              <p className="text-gray-700 mb-1">Soat: {time || "12:00"}</p>
              <p className="text-gray-700">{location || "Toshkent, Yunusobod tumani"}</p>
            </div>

            {additionalInfo && <p className="text-sm text-gray-600 mt-4">{additionalInfo}</p>}
          </div>
        </div>
      )

    case "calm":
      return (
        <div className="bg-blue-50 p-8 rounded-lg shadow-lg" style={{ minHeight: "500px" }}>
          <div className="text-center">
            <h2 className="text-xl font-serif text-blue-900 mb-4">El oshi marosimi</h2>
            <div className="w-16 h-1 bg-blue-200 mx-auto mb-6"></div>

            <p className="text-lg text-blue-800 mb-2">Marhumning xotirasiga</p>
            <h3 className="text-3xl font-serif text-blue-900 mb-6">{firstName || "Akbar Karimov"}</h3>

            <div className="bg-white bg-opacity-70 p-4 rounded-lg mb-6">
              <p className="text-gray-700 mb-1">{formattedDate}</p>
              <p className="text-gray-700 mb-1">Soat: {time || "12:00"}</p>
              <p className="text-gray-700">{location || "Toshkent, Yunusobod tumani"}</p>
            </div>

            {additionalInfo && <p className="text-sm text-blue-700 mt-4">{additionalInfo}</p>}
          </div>
        </div>
      )

    case "photo-memorial":
      return (
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg" style={{ minHeight: "550px" }}>
          <div className="text-center">
            <h2 className="text-xl font-serif text-gray-800 mb-4">El oshi marosimi</h2>

            {/* Photo area */}
            <div className="mb-6 flex justify-center">
              {uploadedImage ? (
                <div className="w-32 h-32 rounded-full border-4 border-gray-300 overflow-hidden relative">
                  <img
                    src={uploadedImage}
                    alt="Marhumning rasmi"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-gray-300 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Rasm yuklang</p>
                </div>
              )}
            </div>

            <h3 className="text-3xl font-serif text-gray-900 mb-4">{firstName || "Akbar Karimov"}</h3>

            <div className="w-16 h-1 bg-gray-400 mx-auto mb-6"></div>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <p className="text-gray-700 mb-1">{formattedDate}</p>
              <p className="text-gray-700 mb-1">Soat: {time || "12:00"}</p>
              <p className="text-gray-700">{location || "Toshkent, Yunusobod tumani"}</p>
            </div>

            {additionalInfo && <p className="text-sm text-gray-600 mt-4">{additionalInfo}</p>}
          </div>
        </div>
      )

    case "elegant-memorial":
      return (
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200" style={{ minHeight: "550px" }}>
          <div className="text-center">
            <h2 className="text-xl font-serif text-gray-800 mb-4">El oshi marosimi</h2>

            {/* Decorative elements */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-px bg-gray-400"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 mx-2"></div>
              <div className="w-24 h-px bg-gray-400"></div>
            </div>

            {/* Photo area */}
            <div className="mb-6 flex justify-center">
              {uploadedImage ? (
                <div className="w-40 h-40 border-2 border-gray-300 overflow-hidden relative">
                  <img
                    src={uploadedImage}
                    alt="Marhumning rasmi"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-40 h-40 border-2 border-gray-300 bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Rasm yuklang</p>
                </div>
              )}
            </div>

            <h3 className="text-3xl font-serif text-gray-900 mb-2">{firstName || "Akbar Karimov"}</h3>

            <div className="border-t border-b border-gray-200 py-4 my-6">
              <p className="text-gray-700 mb-1">{formattedDate}</p>
              <p className="text-gray-700 mb-1">Soat: {time || "12:00"}</p>
              <p className="text-gray-700">{location || "Toshkent, Yunusobod tumani"}</p>
            </div>

            {additionalInfo && <p className="text-sm text-gray-600 mt-4">{additionalInfo}</p>}

            <p className="text-sm text-gray-500 mt-6">Marhumning xotirasiga bag'ishlangan marosim</p>
          </div>
        </div>
      )

    case "islamic-memorial":
      return (
        <div className="bg-[#f8f4e8] p-8 rounded-lg shadow-lg" style={{ minHeight: "550px" }}>
          <div className="text-center">
            <div className="text-green-800 mb-6">
              <div className="text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</div>
              <div className="text-sm">Mehribon va rahmli Alloh nomi bilan</div>
            </div>

            {/* Photo area */}
            <div className="mb-6 flex justify-center">
              {uploadedImage ? (
                <div className="w-36 h-36 rounded-lg border-2 border-green-700 overflow-hidden relative">
                  <img
                    src={uploadedImage}
                    alt="Marhumning rasmi"
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
            <h3 className="text-3xl font-serif text-green-900 mb-4">{firstName || "Akbar Karimov"}</h3>

            <div className="bg-white bg-opacity-70 p-4 rounded-lg mb-4 border border-green-200">
              <p className="text-gray-700 mb-1">{formattedDate}</p>
              <p className="text-gray-700 mb-1">Soat: {time || "12:00"}</p>
              <p className="text-gray-700">{location || "Toshkent, Yunusobod tumani"}</p>
            </div>

            {additionalInfo && <p className="text-sm text-green-800 mt-4">{additionalInfo}</p>}

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

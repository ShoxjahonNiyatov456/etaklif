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
  // Format date if provided
  const formattedDate = date
    ? new Date(date).toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : "2023-yil 15-iyun"

  // Get template based on style
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
            <p className="text-gray-700">{location || "Toshkent, Yunusobod tumani"}</p>
          </div>

          {additionalInfo && <p className="text-sm text-purple-700 italic mt-4">{additionalInfo}</p>}

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
              <p className="text-gray-700">{location || "Toshkent, Yunusobod tumani"}</p>
            </div>

            {additionalInfo && <p className="text-sm text-blue-600 mt-4">{additionalInfo}</p>}

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
        <div className="relative bg-[#f9f3e9] p-8 rounded-lg shadow-lg" style={{ minHeight: "550px" }}>
          <div className="relative z-10 text-center py-12">
            <h2 className="text-3xl font-bold uppercase mb-2">Tug'ulgan Kuning Bilan</h2>
            <h3 className="text-4xl font-cursive mb-6">{firstName || "Chelsea"}</h3>
            <p className="text-lg italic text-gray-700">cheers to more years!</p>

            <div className="mt-8">
              {additionalInfo && <p className="text-sm text-gray-600 mt-4">{additionalInfo}</p>}
            </div>
          </div>

          {/* Background image with floral frame */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage: "url('/templates/birthday-floral-frame.png')",
                opacity: 0.9,
              }}
            ></div>
          </div>
        </div>
      )

    case "butterfly":
      return (
        <div className="relative bg-white p-8 rounded-lg shadow-lg" style={{ minHeight: "550px" }}>
          <div className="relative z-10 text-center pt-64 pb-8">
            <h2 className="text-3xl font-cursive text-gray-700 mb-4">Tug'ulgan Kuning Bilan</h2>
            <p className="text-sm uppercase tracking-wide text-gray-600 max-w-xs mx-auto">
              Sizga go'zal kun va yana bir yil farovonlik va quvonch tilayman
            </p>

            <div className="mt-8">
              <p className="text-gray-700 mb-1">{formattedDate}</p>
              <p className="text-gray-700 mb-1">Soat: {time || "15:00"}</p>
              <p className="text-gray-700">{location || "Toshkent, Yunusobod tumani"}</p>
              {additionalInfo && <p className="text-sm text-gray-600 mt-4">{additionalInfo}</p>}
            </div>
          </div>

          {/* Background image with butterflies */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 bg-contain bg-no-repeat bg-top"
              style={{
                backgroundImage: "url('/templates/birthday-butterfly.png')",
                backgroundSize: "80%",
                backgroundPosition: "center 20%",
              }}
            ></div>
          </div>
        </div>
      )

    case "kids-photo":
      return (
        <div className="relative bg-white p-4 rounded-lg shadow-lg" style={{ minHeight: "550px" }}>
          <div
            className="absolute inset-0 bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage: "url('/templates/birthday-kids-photo.png')",
              opacity: 0.95,
            }}
          ></div>

          {/* Photo upload area */}
          <div
            className="relative z-10 flex justify-center items-center"
            style={{ height: "180px", marginTop: "100px" }}
          >
            {uploadedImage ? (
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white relative">
                <img 
                  src={uploadedImage} 
                  alt="Yuklangan rasm" 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-40 h-40 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center">
                <p className="text-gray-500 text-sm text-center">
                  Rasm
                  <br />
                  yuklang
                </p>
              </div>
            )}
          </div>

          <div className="relative z-10 text-center mt-32">
            <h3 className="text-2xl font-cursive text-teal-700">Tug'ulgan Kuning Bilan!</h3>
            <p className="text-sm text-gray-700 mt-2">Kuningiz Quvonchga To'lsin {firstName || "Oliver"}</p>
            <div className="mt-4">{additionalInfo && <p className="text-xs text-gray-600">{additionalInfo}</p>}</div>
          </div>
        </div>
      )

    case "unicorn":
      return (
        <div className="relative bg-[#7d3b5a] p-8 rounded-lg shadow-lg" style={{ minHeight: "550px" }}>
          <div
            className="absolute inset-0 bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage: "url('/templates/birthday-unicorn.png')",
              opacity: 0.95,
            }}
          ></div>

          <div className="relative z-10 text-center pt-64">
            <div className="text-white max-w-xs mx-auto mt-16">
              <p className="mb-1">Among</p>
              <p className="mb-1">the moon and stars</p>
              <p className="mb-1">the unicorns may see</p>
              <p className="mb-1">a love too big</p>
              <p className="mb-4">for the world to hold...</p>

              <p className="font-cursive text-xl">the love of you from me</p>

              <div className="mt-8">
                <p className="text-sm">
                  {firstName || "Aziza"}, {age || "7"} yoshga to'ldi!
                </p>
                {additionalInfo && <p className="text-xs mt-2">{additionalInfo}</p>}
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

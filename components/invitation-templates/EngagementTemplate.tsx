interface EngagementTemplateProps {
  style: string
  firstName: string
  parents: string
  date: string
  time: string
  location: string
  additionalInfo?: string
  uploadedImage?: string | null
}

export default function EngagementTemplate({
  style,
  firstName,
  parents,
  date,
  time,
  location,
  additionalInfo,
}: EngagementTemplateProps) {
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
    case "romantic":
      return (
        <div
          className="relative w-full rounded-lg shadow-lg overflow-hidden"
          style={{
            backgroundImage: "url('/qizimages/q1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "550px"
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-md text-center">
              <h2 className="text-2xl font-serif text-rose-700 mb-4 font-dancing">Qiz uzatish marosimi</h2>
              <h3 className="text-3xl font-playfair text-rose-800 mb-2">{truncateText(firstName) || "Madina Karimova"}</h3>
              <p className="text-lg font-cormorant text-rose-600 mb-6">Ota-onasi: {truncateText(parents)}</p>
              <div className="w-16 h-1 bg-rose-300 mx-auto mb-6"></div>
              <div className="space-y-2 mb-4">
                <p className="text-rose-700 font-cormorant text-xl">{truncateText(formattedDate)}</p>
                <p className="text-rose-700 font-cormorant text-xl">Soat: {truncateText(time) || "17:00"}</p>
                <p className="text-rose-700 font-cormorant text-xl">{truncateText(location) || "Toshkent, Yunusobod tumani"}</p>
              </div>

              {truncateText(additionalInfo) && (
                <p className="text-sm font-cormorant text-rose-600 mt-4 italic">{truncateText(additionalInfo)}</p>
              )}

              <p className="font-dancing text-rose-500 mt-4 text-lg">Tashrif buyurishingizni so'raymiz</p>
            </div>
          </div>
        </div>
      )

    case "national":
      return (
        <div
          className="relative w-full rounded-lg shadow-lg overflow-hidden"
          style={{
            backgroundImage: "url('/qizimages/q2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "550px"
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-lg max-w-md text-center">
              <h2 className="text-2xl font-dancing text-pink-600 mb-4">Qiz uzatish marosimi</h2>
              <h3 className="text-3xl font-playfair text-pink-700 mb-2">{truncateText(firstName) || "Madina Karimova"}</h3>
              {parents && <p className="text-lg font-cormorant text-pink-600 mb-6">Ota-onasi: {truncateText(parents)}</p>}

              <div className="w-16 h-0.5 bg-pink-200 mx-auto mb-6"></div>

              <div className="space-y-2 mb-4">
                <p className="text-pink-700 font-cormorant text-xl">{truncateText(formattedDate)}</p>
                <p className="text-pink-700 font-cormorant text-xl">Soat: {truncateText(time) || "17:00"}</p>
                <p className="text-pink-700 font-cormorant text-xl">{truncateText(location) || "Toshkent, Yunusobod tumani"}</p>
              </div>

              {truncateText(additionalInfo) && (
                <p className="text-sm font-cormorant text-pink-600 mt-4 italic">{truncateText(additionalInfo)}</p>
              )}

              <p className=" font-dancing text-pink-500 mt-4 text-lg">Tashrif buyurishingizni so'raymiz</p>
            </div>
          </div>
        </div>
      )

    case "floral-engagement":
      return (
        <div
          className="relative w-full rounded-lg shadow-lg overflow-hidden"
          style={{
            backgroundImage: "url('/qizimages/q3.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "550px"
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-md text-center">
              <h2 className="text-2xl font-dancing text-pink-700 mb-4">Qiz uzatish marosimi</h2>
              <h3 className="text-3xl font-playfair text-pink-800 mb-2">{truncateText(firstName) || "Madina Karimova"}</h3>
              {parents && <p className="text-lg font-cormorant text-pink-600 mb-6">Ota-onasi: {truncateText(parents)}</p>}

              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-12 h-px bg-pink-300"></div>
                <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                <div className="w-12 h-px bg-pink-300"></div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-pink-700 font-cormorant text-xl">{truncateText(formattedDate)}</p>
                <p className="text-pink-700 font-cormorant text-xl">Soat: {truncateText(time) || "17:00"}</p>
                <p className="text-pink-700 font-cormorant text-xl">{truncateText(location) || "Toshkent, Yunusobod tumani"}</p>
              </div>

              {truncateText(additionalInfo) && (
                <p className="text-sm font-cormorant text-pink-600 mt-4 italic">{truncateText(additionalInfo)}</p>
              )}

              <p className=" font-dancing text-pink-500 mt-4 text-lg">Tashrif buyurishingizni so'raymiz</p>
            </div>
          </div>
        </div>
      )

    case "modern-engagement":
      return (
        <div
          className="relative w-full rounded-lg shadow-lg overflow-hidden"
          style={{
            backgroundImage: "url('/qizimages/q4.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "550px"
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-md text-center">
              <h2 className="text-2xl font-dancing text-amber-700 mb-4">Qiz uzatish marosimi</h2>
              <h3 className="text-3xl font-playfair text-amber-800 mb-2">{truncateText(firstName) || "Madina Karimova"}</h3>
              {parents && <p className="text-lg font-cormorant text-amber-600 mb-6">Ota-onasi: {truncateText(parents)}</p>}

              <div className="w-16 h-0.5 bg-amber-200 mx-auto mb-6"></div>

              <div className="space-y-2 mb-4">
                <p className="text-amber-700 font-cormorant text-xl">{truncateText(formattedDate)}</p>
                <p className="text-amber-700 font-cormorant text-xl">Soat: {truncateText(time) || "17:00"}</p>
                <p className="text-amber-700 font-cormorant text-xl">{truncateText(location) || "Toshkent, Yunusobod tumani"}</p>
              </div>

              {truncateText(additionalInfo) && (
                <p className="text-sm font-cormorant text-amber-600 mt-4 italic">{truncateText(additionalInfo)}</p>
              )}

              <p className=" font-dancing text-amber-500 mt-4 text-lg">Tashrif buyurishingizni so'raymiz</p>
            </div>
          </div>
        </div>
      )

    case "traditional-engagement":
      return (
        <div
          className="relative w-full rounded-lg shadow-lg overflow-hidden"
          style={{
            backgroundImage: "url('/qizimages/q5.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "550px"
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-md text-center">
              <h2 className="text-2xl font-dancing text-neutral-700 mb-4">Qiz uzatish marosimi</h2>
              <h3 className="text-3xl font-playfair text-neutral-800 mb-2">{truncateText(firstName) || "Madina Karimova"}</h3>
              {parents && <p className="text-lg font-cormorant text-neutral-600 mb-6">Ota-onasi: {truncateText(parents)}</p>}

              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-12 h-px bg-neutral-300"></div>
                <div className="w-2 h-2 rounded-full bg-neutral-400"></div>
                <div className="w-12 h-px bg-neutral-300"></div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-neutral-700 font-cormorant text-xl">{truncateText(formattedDate)}</p>
                <p className="text-neutral-700 font-cormorant text-xl">Soat: {truncateText(time) || "17:00"}</p>
                <p className="text-neutral-700 font-cormorant text-xl">{truncateText(location) || "Toshkent, Yunusobod tumani"}</p>
              </div>

              {truncateText(additionalInfo) && (
                <p className="text-sm font-cormorant text-neutral-600 mt-4 italic">{truncateText(additionalInfo)}</p>
              )}

              <p className="font-dancing text-neutral-500 mt-4 text-lg">Tashrif buyurishingizni so'raymiz</p>
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

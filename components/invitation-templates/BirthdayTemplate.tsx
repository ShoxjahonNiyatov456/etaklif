import Image from "next/image"

interface InvitationCardProps {
  style: string
  data: {
    name: string
    age: string
    date: string
    time: string
    location: string
    additionalInfo: string
  }
}

export default function InvitationCard({ style, data }: InvitationCardProps) {
  const { name, age, date, time, location, additionalInfo } = data || {};

  const getCardContent = () => {
    switch (style) {
      case "colorful":
        return (
          <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src="/birthdayimages/b1.jpg"
              alt="Blue confetti invitation background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg max-w-xs w-full">
                <h2 className="font-dancing text-3xl text-blue-600 mb-2">{name || "Aziza"}</h2>
                <p className="text-xl font-semibold text-blue-500 mb-4">{age || "7"} yoshga to'ldi!</p>
                <div className="space-y-2 text-gray-700">
                  <p>{date || "12 Iyun"}</p>
                  <p>Soat: {time || "15:00"}</p>
                  <p>{location || "Toshkent, Yunusobod tumani"}</p>
                  {additionalInfo && <p className="text-sm italic mt-2">{additionalInfo}</p>}
                </div>
              </div>
            </div>
          </div>
        )

      case "kids":
        return (
          <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden">
            <Image
              src="/birthdayimages/b2.jpg"
              alt="Gold and black invitation background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-full max-w-xs space-y-4">
                <h2 className="font-dancing text-4xl text-amber-400 drop-shadow-lg">{name || "Aziza"}</h2>
                <p className="text-2xl font-semibold text-amber-300">{age || "7"} yoshga to'ldi!</p>
                <div className="space-y-2 text-amber-100 mt-8">
                  <p>{date || "12 Iyun"}</p>
                  <p>Soat: {time || "15:00"}</p>
                  <p>{location || "Toshkent, Yunusobod tumani"}</p>
                  {additionalInfo && <p className="text-sm mt-4 text-amber-200">{additionalInfo}</p>}
                </div>
              </div>
            </div>
          </div>
        )

      case "floral-frame":
        return (
          <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src="/birthdayimages/b3.jpg"
              alt="White and gold invitation background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="bg-white/40 backdrop-blur-sm rounded-lg p-6 shadow-lg max-w-xs w-full">
                <h2 className="font-dancing text-3xl text-gray-800 mb-2">{name || "Aziza"}</h2>
                <p className="text-xl font-semibold text-gray-700 mb-4">{age || "7"} yoshga to'ldi!</p>
                <div className="space-y-2 text-gray-700">
                  <p>{date || "12 Iyun"}</p>
                  <p>Soat: {time || "15:00"}</p>
                  <p>{location || "Toshkent, Yunusobod tumani"}</p>
                  {additionalInfo && <p className="text-sm italic mt-2">{additionalInfo}</p>}
                </div>
              </div>
            </div>
          </div>
        )

      case "butterfly":
        return (
          <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src="/birthdayimages/b14.jpg"
              alt="Yellow festive invitation background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg max-w-xs w-full">
                <h2 className="font-dancing text-3xl text-amber-600 mb-2">{name || "Aziza"}</h2>
                <p className="text-xl font-semibold text-amber-500 mb-4">{age || "7"} yoshga to'ldi!</p>
                <div className="space-y-2 text-gray-700">
                  <p>{date || "12 Iyun"}</p>
                  <p>Soat: {time || "15:00"}</p>
                  <p>{location || "Toshkent, Yunusobod tumani"}</p>
                  {additionalInfo && <p className="text-sm italic mt-2">{additionalInfo}</p>}
                </div>
              </div>
            </div>
          </div>
        )

      case "kids-photo":
        return (
          <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden">
            <Image
              src="/birthdayimages/b5.jpg"
              alt="Peach and gold invitation background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="bg-white/40 backdrop-blur-sm rounded-lg p-6 shadow-lg max-w-xs w-full">
                <h2 className="font-dancing text-3xl text-orange-600 mb-2">{name || "Aziza"}</h2>
                <p className="text-xl font-semibold text-orange-500 mb-4">{age || "7"} yoshga to'ldi!</p>
                <div className="space-y-2 text-gray-700">
                  <p>{date || "12 Iyun"}</p>
                  <p>Soat: {time || "15:00"}</p>
                  <p>{location || "Toshkent, Yunusobod tumani"}</p>
                  {additionalInfo && <p className="text-sm italic mt-2">{additionalInfo}</p>}
                </div>
              </div>
            </div>
          </div>
        )

      case "unicorn":
        return (
          <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden">
            <Image
              src="/birthdayimages/b6.jpg"
              alt="Black and gold invitation background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-full max-w-xs space-y-4">
                <h2 className="font-dancing text-4xl text-amber-400 drop-shadow-lg">{name || "Aziza"}</h2>
                <p className="text-2xl font-semibold text-amber-300">{age || "7"} yoshga to'ldi!</p>
                <div className="space-y-2 text-amber-100 mt-8">
                  <p>{date || "12 Iyun"}</p>
                  <p>Soat: {time || "15:00"}</p>
                  <p>{location || "Toshkent, Yunusobod tumani"}</p>
                  {additionalInfo && <p className="text-sm mt-4 text-amber-200">{additionalInfo}</p>}
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

  return <div className="flex justify-center">{getCardContent()}</div>
}

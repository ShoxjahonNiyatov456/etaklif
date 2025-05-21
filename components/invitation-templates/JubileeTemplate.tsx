"use client"

import type React from "react"
import { format } from "date-fns"
import { uz } from "date-fns/locale"
import { useMediaQuery } from "../../hooks/use-media-query"

interface JubileeTemplateProps {
  style: string
  firstName: string
  age: string
  date: string
  time: string
  location: string
  additionalInfo?: string
}

const JubileeTemplate: React.FC<JubileeTemplateProps> = ({
  style,
  firstName,
  age,
  date,
  time,
  location,
  additionalInfo,
}) => {
  const isMobile = useMediaQuery("(max-width: 640px)")

  const formattedDate = date ? format(new Date(date), "d MMMM", { locale: uz }) : ""

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return ""
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + "..."
  }

  const locationLength = isMobile ? 30 : 60
  const additionalInfoLength = isMobile ? 50 : 100

  switch (style) {
    case "classic":
      return (
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/j7.jpg-HpHQw7bb6ksydyTn3WagQrTnLEibBH.jpeg)`,
            }}
          >
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 border-[15px] border-[#d4b59e] bg-transparent"></div>
          <div className="absolute top-4 left-4 right-4 bottom-4 border-[1px] border-[#8a6d5c] bg-transparent"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[80%] bg-white/60 backdrop-blur-sm p-4 rounded-lg">
            <div className="text-[#8a6d5c] text-sm mb-2">YUBILEY TAKLIFI</div>
            <div className="text-[#8a6d5c] text-3xl font-bold mb-2">{firstName}</div>
            <div className="text-[#8a6d5c] text-4xl font-bold mb-4">{age} Yosh</div>
            <div className="text-[#8a6d5c] text-sm mb-1">SANA: {formattedDate}</div>
            <div className="text-[#8a6d5c] text-sm mb-1">VAQT: {time}</div>
            <div className="text-[#8a6d5c] text-sm mb-4">MANZIL: {truncateText(location, locationLength)}</div>
            {additionalInfo && (
              <div className="text-[#8a6d5c] text-xs italic mt-2">
                {truncateText(additionalInfo, additionalInfoLength)}
              </div>
            )}
          </div>
          <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-[#8a6d5c]"></div>
          <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-[#8a6d5c]"></div>
          <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-[#8a6d5c]"></div>
          <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-[#8a6d5c]"></div>
        </div>
      )

    case "modern":
      return (
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/j8.jpg-ay0jghLjI1Bef1MhWCgrjAbTtQKgVx.jpeg)`,
            }}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[80%] bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-yellow-400/30">
            <div className="text-white text-sm uppercase tracking-widest mb-2">Yubiley Tadbiri</div>
            <div className="text-white text-3xl font-bold mb-1">{firstName}</div>
            <div className="text-white text-4xl font-bold mb-4">{age} Yosh</div>
            <div className="w-16 h-1 bg-yellow-400 mx-auto my-3"></div>
            <div className="text-white text-sm mb-1">SANA: {formattedDate}</div>
            <div className="text-white text-sm mb-1">VAQT: {time}</div>
            <div className="text-white text-sm mb-2">MANZIL: {truncateText(location, locationLength)}</div>
            {additionalInfo && (
              <div className="text-white/80 text-xs mt-4">{truncateText(additionalInfo, additionalInfoLength)}</div>
            )}
          </div>
        </div>
      )

    case "ornate":
      return (
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/j6.jpg-7SBCA6L08BLk3P4PtnZBjFxUv7a6hT.jpeg)`,
            }}
          >
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 border-[12px] border-[#b39a6a]/50"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[70%] bg-white/70 backdrop-blur-sm p-6 rounded-lg">
            <div className="text-[#7a5c29] text-lg mb-0 font-serif italic">Yubiley Taklifi</div>
            <div className="text-[#7a5c29] text-3xl font-bold font-serif mb-0">{firstName}</div>
            <div className="text-[#7a5c29] text-4xl font-bold font-serif mb-2">{age} Yosh</div>
            <div className="flex items-center justify-center my-2">
              <div className="w-16 h-[1px] bg-[#7a5c29]"></div>
              <div className="mx-2 text-[#7a5c29]">❧</div>
              <div className="w-16 h-[1px] bg-[#7a5c29]"></div>
            </div>
            <div className="text-[#7a5c29] text-sm mb-1 font-serif">SANA: {formattedDate}</div>
            <div className="text-[#7a5c29] text-sm mb-1 font-serif">VAQT: {time}</div>
            <div className="text-[#7a5c29] text-sm mb-2 font-serif">
              MANZIL: {truncateText(location, locationLength)}
            </div>
            {additionalInfo && (
              <div className="text-[#7a5c29] text-xs italic mt-2 font-serif">
                {truncateText(additionalInfo, additionalInfoLength)}
              </div>
            )}
            <div className="flex items-center justify-center mt-3">
              <div className="w-24 h-[1px] bg-[#7a5c29]"></div>
              <div className="mx-2 text-[#7a5c29]">✦</div>
              <div className="w-24 h-[1px] bg-[#7a5c29]"></div>
            </div>
          </div>
        </div>
      )

    case "minimalist":
      return (
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/j5.jpg-ZAFucRB8Q1trHYRgPF04o4NjIFldvZ.jpeg)`,
            }}
          >
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]"></div>
          </div>
          <div className="absolute top-4 left-4 right-4 bottom-4 border-[1px] border-gray-300"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[80%] bg-white/80 backdrop-blur-sm p-6 rounded-lg">
            <div className="text-gray-400 text-xs uppercase tracking-[0.3em] mb-6">YUBILEY</div>
            <div className="text-gray-700 text-2xl font-light mb-1">{firstName}</div>
            <div className="text-gray-900 text-5xl font-light mb-6">{age} Yosh</div>
            <div className="w-10 h-[1px] bg-gray-300 mx-auto my-6"></div>
            <div className="text-gray-600 text-sm mb-1 font-light">{formattedDate}</div>
            <div className="text-gray-600 text-sm mb-1 font-light">{time}</div>
            <div className="text-gray-600 text-sm mb-4 font-light">{truncateText(location, locationLength)}</div>
            {additionalInfo && (
              <div className="text-gray-400 text-xs mt-6 font-light">
                {truncateText(additionalInfo, additionalInfoLength)}
              </div>
            )}
          </div>
        </div>
      )

    case "traditional":
      return (
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/j4.jpg-up13TBHKRZkYe0Hwg5pSAFVCNZNZqe.jpeg)`,
            }}
          >
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
          </div>
          <div
            className="absolute top-0 left-0 right-0 h-12 bg-[#c08552] opacity-80"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(255,255,255,0.1) 15px, rgba(255,255,255,0.1) 30px)",
            }}
          ></div>
          <div
            className="absolute bottom-0 left-0 right-0 h-12 bg-[#c08552] opacity-80"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(255,255,255,0.1) 15px, rgba(255,255,255,0.1) 30px)",
            }}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[85%] bg-white/80 backdrop-blur-sm p-6 rounded-lg">
            <div className="text-[#5d4037] text-sm uppercase mb-1">Hurmatli mehmonlar</div>
            <div className="text-[#5d4037] text-3xl font-bold mb-1">{firstName}</div>
            <div className="text-[#5d4037] text-4xl font-bold mb-3">{age} Yosh</div>
            <div className="text-[#5d4037] text-sm mb-1">tantanasiga taklif etamiz</div>
            <div className="flex items-center justify-center my-3">
              <div className="w-20 h-[1px] bg-[#c08552]"></div>
              <div className="mx-3 text-[#c08552] text-xl">♦</div>
              <div className="w-20 h-[1px] bg-[#c08552]"></div>
            </div>
            <div className="text-[#5d4037] text-sm mb-1">SANA: {formattedDate}</div>
            <div className="text-[#5d4037] text-sm mb-1">VAQT: {time}</div>
            <div className="text-[#5d4037] text-sm mb-2">MANZIL: {truncateText(location, locationLength)}</div>
            {additionalInfo && (
              <div className="text-[#8d6e63] text-xs italic mt-2">
                {truncateText(additionalInfo, additionalInfoLength)}
              </div>
            )}
          </div>
        </div>
      )

    case "luxury":
      return (
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/j2.jpg-74ewpfMFDNWyZONpCZ7UaBHontT2GW.jpeg)`,
            }}
          ></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 border-[10px] border-[#c9a36f]/50"></div>
          <div className="absolute top-6 left-6 right-6 bottom-6 border-[1px] border-[#c9a36f]/50"></div>
          <div className="absolute top-10 left-10 w-12 h-12 border-t-2 border-l-2 border-[#c9a36f]/70"></div>
          <div className="absolute top-10 right-10 w-12 h-12 border-t-2 border-r-2 border-[#c9a36f]/70"></div>
          <div className="absolute bottom-10 left-10 w-12 h-12 border-b-2 border-l-2 border-[#c9a36f]/70"></div>
          <div className="absolute bottom-10 right-10 w-12 h-12 border-b-2 border-r-2 border-[#c9a36f]/70"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[75%] bg-black/40 backdrop-blur-sm p-6 rounded-lg">
            <div className="text-[#c9a36f] text-sm tracking-widest uppercase mb-2">Yubiley Taklifi</div>
            <div className="text-[#c9a36f] text-3xl font-bold mb-1">{firstName}</div>
            <div className="text-[#c9a36f] text-5xl font-bold mb-3">{age} Yosh</div>
            <div className="flex items-center justify-center my-3">
              <div className="w-12 h-[1px] bg-[#c9a36f]"></div>
              <div className="mx-3 text-[#c9a36f]">★</div>
              <div className="w-12 h-[1px] bg-[#c9a36f]"></div>
            </div>
            <div className="text-[#c9a36f] text-sm mb-1">SANA: {formattedDate}</div>
            <div className="text-[#c9a36f] text-sm mb-1">VAQT: {time}</div>
            <div className="text-[#c9a36f] text-sm mb-3">MANZIL: {truncateText(location, locationLength)}</div>
            {additionalInfo && (
              <div className="text-[#c9a36f] text-xs mt-3">{truncateText(additionalInfo, additionalInfoLength)}</div>
            )}
            <div className="mt-4 text-[#c9a36f] text-xs tracking-wider uppercase">
              Tashrif buyurishingizni so'raymiz
            </div>
          </div>
        </div>
      )

    case "festive":
      return (
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/j9.jpg-JakKJVAlF8CeBRbsfXhsw98TP6mCOg.jpeg)`,
            }}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[80%] bg-white/20 backdrop-blur-sm p-6 rounded-lg border border-white/30">
            <div className="text-black text-sm uppercase tracking-wider mb-1">Bayramona Yubiley</div>
            <div className="text-black text-3xl font-bold mb-1">{firstName}</div>
            <div className="text-black text-5xl font-bold mb-3">{age} Yosh</div>
            <div className="flex items-center justify-center my-3">
              <div className="text-white text-2xl">🎉</div>
              <div className="mx-2 w-20 h-[1px] bg-white"></div>
              <div className="text-white text-2xl">🎂</div>
              <div className="mx-2 w-20 h-[1px] bg-white"></div>
              <div className="text-white text-2xl">🎉</div>
            </div>
            <div className="text-black text-sm mb-1">SANA: {formattedDate}</div>
            <div className="text-black text-sm mb-1">VAQT: {time}</div>
            <div className="text-black text-sm mb-2">MANZIL: {truncateText(location, locationLength)}</div>
            {additionalInfo && (
              <div className="text-black text-xs mt-3">{truncateText(additionalInfo, additionalInfoLength)}</div>
            )}
            <div className="mt-2 text-black text-xs">Bayramga xush kelibsiz!</div>
          </div>
        </div>
      )

    case "photo-centric":
      return (
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/j1.jpg-KdX3kjU6GBXA4aeFWTNuYmJp7camXf.jpeg)`,
            }}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[70%] backdrop-blur-sm p-6 border border-white/30 rounded-lg bg-black/30">
            <div className="text-white text-sm uppercase tracking-widest mb-1">Yubiley Tantanasi</div>
            <div className="text-white text-3xl font-bold mb-1">{firstName}</div>
            <div className="text-white text-5xl font-bold mb-3">{age} Yosh</div>
            <div className="w-16 h-[1px] bg-white mx-auto my-3"></div>
            <div className="text-white text-sm mb-1">SANA: {formattedDate}</div>
            <div className="text-white text-sm mb-1">VAQT: {time}</div>
            <div className="text-white text-sm mb-2">MANZIL: {truncateText(location, locationLength)}</div>
            {additionalInfo && (
              <div className="text-white text-xs italic mt-3">{truncateText(additionalInfo, additionalInfoLength)}</div>
            )}
          </div>
        </div>
      )

    case "geometric":
      return (
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/j3.jpg-XYCMDnlY1EvwpIAdCWzcZPLNE4CvEC.jpeg)`,
            }}
          >
            <div className="absolute inset-0 bg-yellow-500/20 backdrop-blur-[1px]"></div>
          </div>
          <div className="absolute top-6 left-6 right-6 bottom-6 border-[1px] border-yellow-600/30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[75%] bg-yellow-50/80 backdrop-blur-sm p-6 rounded-lg">
            <div className="text-yellow-800 text-sm uppercase tracking-widest mb-2">Yubiley Taklifi</div>
            <div className="text-yellow-900 text-3xl font-bold mb-1">{firstName}</div>
            <div className="text-yellow-900 text-5xl font-bold mb-3">{age} Yosh</div>
            <div className="flex items-center justify-center my-3">
              <div className="w-12 h-[1px] bg-yellow-700"></div>
              <div className="mx-3 text-yellow-700">◆</div>
              <div className="w-12 h-[1px] bg-yellow-700"></div>
            </div>

            <div className="text-yellow-800 text-sm mb-1">SANA: {formattedDate}</div>
            <div className="text-yellow-800 text-sm mb-1">VAQT: {time}</div>
            <div className="text-yellow-800 text-sm mb-3">MANZIL: {truncateText(location, locationLength)}</div>

            {additionalInfo && (
              <div className="text-yellow-700 text-xs mt-3">{truncateText(additionalInfo, additionalInfoLength)}</div>
            )}
          </div>
        </div>
      )

    case "nature":
      return (
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/j7.jpg-HpHQw7bb6ksydyTn3WagQrTnLEibBH.jpeg)`,
            }}
          >
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px]"></div>
          </div>
          <div className="absolute top-0 left-0 w-32 h-32">
            <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10,90 Q30,60 50,80 Q70,100 90,70 Q95,40 70,30 Q40,20 30,50 Q20,80 10,90 Z"
                fill="none"
                stroke="#88b06a"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 w-40 h-40">
            <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10,90 Q30,60 50,80 Q70,100 90,70 Q95,40 70,30 Q40,20 30,50 Q20,80 10,90 Z"
                fill="none"
                stroke="#88b06a"
                strokeWidth="1"
              />
            </svg>
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[75%] p-7 bg-white/80 backdrop-blur-sm rounded-lg border border-[#88b06a]">
            <div className="text-[#4a752d] text-sm uppercase tracking-wider mb-1">Tabiatdagi Yubiley</div>
            <div className="text-[#4a752d] text-3xl font-bold mb-1">{firstName}</div>
            <div className="text-[#4a752d] text-5xl font-bold mb-3">{age} Yosh</div>

            <div className="flex items-center justify-center my-3">
              <div className="w-12 h-[1px] bg-[#88b06a]"></div>
              <div className="mx-3 text-[#88b06a]">❧</div>
              <div className="w-12 h-[1px] bg-[#88b06a]"></div>
            </div>

            <div className="text-[#4a752d] text-sm mb-1">SANA: {formattedDate}</div>
            <div className="text-[#4a752d] text-sm mb-1">VAQT: {time}</div>
            <div className="text-[#4a752d] text-sm mb-3">MANZIL: {truncateText(location, locationLength)}</div>

            {additionalInfo && (
              <div className="text-[#5d8a3c] text-xs italic mt-3">
                {truncateText(additionalInfo, additionalInfoLength)}
              </div>
            )}
          </div>
        </div>
      )

    default:
      return (
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <div className="text-gray-500">Shablon tanlanmagan</div>
          </div>
        </div>
      )
  }
}

export default JubileeTemplate

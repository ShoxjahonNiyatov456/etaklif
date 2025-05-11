"use client"

import { motion } from "framer-motion"
import { CheckCircle, Users, Zap, Palette, Gift, Phone, Mail, Send } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-12">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-600 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Biz haqimizda
          </h1>

          <div className="space-y-6 text-gray-300">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl leading-relaxed"
            >
              Taklifnoma - bu zamonaviy va chiroyli taklifnomalarni yaratish platformasi. Biz 2022-yilda tashkil
              topganmiz va o'shandan beri minglab foydalanuvchilarga xizmat ko'rsatib kelmoqdamiz.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="leading-relaxed"
            >
              Bizning maqsadimiz - foydalanuvchilarga turli marosimlar uchun chiroyli va zamonaviy taklifnomalarni
              yaratish imkoniyatini berish. Bizning platformamiz orqali to'y, tug'ilgan kun, el oshi, yubiley va qiz
              uzatish marosimlari uchun taklifnomalarni yaratishingiz mumkin.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="leading-relaxed"
            >
              Biz doimiy ravishda yangi shablonlar va funksiyalarni qo'shib bormoqdamiz. Agar sizda biror taklifingiz
              bo'lsa, biz bilan bog'lanishingiz mumkin.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Bizning afzalliklarimiz</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Users className="h-5 w-5 text-purple-400" />,
                    title: "Foydalanish uchun qulay va sodda interfeys",
                  },
                  {
                    icon: <Palette className="h-5 w-5 text-purple-400" />,
                    title: "Turli marosimlar uchun maxsus shablonlar",
                  },
                  {
                    icon: <Zap className="h-5 w-5 text-purple-400" />,
                    title: "Tezkor va sifatli xizmat",
                  },
                  {
                    icon: <Gift className="h-5 w-5 text-purple-400" />,
                    title: "Doimiy yangilanib turuvchi dizaynlar",
                  },
                  {
                    icon: <CheckCircle className="h-5 w-5 text-purple-400" />,
                    title: "Bepul foydalanish imkoniyati",
                  },
                ].map((advantage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-start space-x-3 bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700"
                  >
                    <div className="mt-0.5">{advantage.icon}</div>
                    <p className="font-medium">{advantage.title}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Bog'lanish</h2>

              <p className="mb-4">Savollaringiz yoki takliflaringiz bo'lsa, biz bilan bog'lanishingiz mumkin:</p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-purple-400" />
                  </div>
                  <span>+998 95 557 13 02</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-purple-400" />
                  </div>
                  <span>info@etaklif.vercel.app</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                    <Send className="h-5 w-5 text-purple-400" />
                  </div>
                  <span>Telegram: @taklifnoma</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

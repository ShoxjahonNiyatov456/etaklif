"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import dynamic from 'next/dynamic'

const AdvantagesSection = dynamic(() => import('@/components/about/AdvantagesSection'), { ssr: false })
const ContactSection = dynamic(() => import('@/components/about/ContactSection'), { ssr: false })

export default function AboutPage() {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-12">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-600 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial="hidden"
          animate={hasMounted ? "visible" : "hidden"}
          variants={fadeIn()}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Biz haqimizda
          </h1>

          <div className="space-y-6 text-gray-300">
            <motion.p
              initial="hidden"
              animate={hasMounted ? "visible" : "hidden"}
              variants={fadeIn(0.1)}
              className="text-xl leading-relaxed"
            >
              Taklifnoma - bu zamonaviy va chiroyli taklifnomalarni yaratish platformasi. Biz 2022-yilda tashkil
              topganmiz va o'shandan beri minglab foydalanuvchilarga xizmat ko'rsatib kelmoqdamiz.
            </motion.p>

            <motion.p
              initial="hidden"
              animate={hasMounted ? "visible" : "hidden"}
              variants={fadeIn(0.2)}
              className="leading-relaxed"
            >
              Bizning maqsadimiz - foydalanuvchilarga turli marosimlar uchun chiroyli va zamonaviy taklifnomalarni
              yaratish imkoniyatini berish. Bizning platformamiz orqali to'y, tug'ilgan kun, el oshi, yubiley va qiz
              uzatish marosimlari uchun taklifnomalarni yaratishingiz mumkin.
            </motion.p>

            <motion.p
              initial="hidden"
              animate={hasMounted ? "visible" : "hidden"}
              variants={fadeIn(0.3)}
              className="leading-relaxed"
            >
              Biz doimiy ravishda yangi shablonlar va funksiyalarni qo'shib bormoqdamiz. Agar sizda biror taklifingiz
              bo'lsa, biz bilan bog'lanishingiz mumkin.
            </motion.p>

            {hasMounted && <AdvantagesSection hasMounted={hasMounted} fadeIn={fadeIn} />}
            {hasMounted && <ContactSection hasMounted={hasMounted} fadeIn={fadeIn} />}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

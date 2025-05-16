"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../app/firebase"
import { useRouter } from "next/navigation"
import { Sparkles, Calendar, Gift, Crown, ChevronRight, User, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Home() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
      setAuthChecked(true)
    })

    return () => unsubscribe()
  }, [])

  const categories = [
    { id: "all", name: "Barchasi" },
    { id: "wedding", name: "To'y" },
    { id: "birthday", name: "Tug'ilgan Kun" },
    { id: "jubilee", name: "Yubiley" },
  ]

  const templates = [
    {
      id: "wedding-1",
      title: "Elegant To'y",
      category: "wedding",
      image: "/tuy.webp",
      color: "from-purple-500 to-pink-500",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      id: "birthday-1",
      title: "Modern Tug'ilgan Kun",
      category: "birthday",
      image: "/tugulgankun.jpg",
      color: "from-blue-500 to-cyan-400",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      id: "jubilee-1",
      title: "Premium Yubiley",
      category: "jubilee",
      image: "/yubiley.avif",
      color: "from-amber-500 to-yellow-400",
      icon: <Crown className="h-5 w-5" />,
    },
    {
      id: "wedding-2",
      title: "Zamonaviy To'y",
      category: "wedding",
      image: "https://daryo.uz/static/c9fe7123a518b8b6df3ae09bb01c6b84.jpg",
      color: "from-rose-500 to-red-500",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      id: "birthday-2",
      title: "Bolalar Tug'ilgan Kuni",
      category: "birthday",
      image: "/t.jpg",
      color: "from-green-500 to-emerald-400",
      icon: <Gift className="h-5 w-5" />,
    },
    {
      id: "jubilee-2",
      title: "Classic Yubiley",
      category: "jubilee",
      image: "/y.jpg",
      color: "from-indigo-500 to-violet-400",
      icon: <Crown className="h-5 w-5" />,
    },
  ]

  const filteredTemplates =
    activeCategory === "all" ? templates : templates.filter((template) => template.category === activeCategory)

  const handleTemplateClick = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      router.push(`/create/${template.category}?template=${templateId}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600 rounded-full filter blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16 mt-8 md:mt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  Taklifnoma
                </span>
                <br />
                <span className="text-white">Yarating</span>
              </h1>

              <p className="text-gray-300 text-lg mb-8 max-w-lg">
                Zamonaviy va ajoyib taklifnomalarni yarating. To'y, tug'ilgan kun, yubiley va boshqa marosimlar uchun
                o'zingizning shaxsiy taklifnomangizni yarating.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full px-8"
                  onClick={() => router.push("/select-type")}
                >
                  Boshlash
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500 text-purple-400 hover:bg-purple-950/30 rounded-full px-8"
                  onClick={() => router.push("/my-proposals")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Mening taklifnomalarim
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 w-full px-4 py-8"
            >
              <div className="relative mx-auto max-w-sm md:max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl backdrop-blur-sm transform rotate-6"></div>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 shadow-xl transform -rotate-3"></div>
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-purple-500/30 shadow-2xl">
                  <Image
                    src="/main.jpg"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt="Taklifnoma namunasi"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-20 relative">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-600 rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-purple-600 rounded-full filter blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Taklifnoma Turlari
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Turli marosimlar uchun mo'ljallangan zamonaviy taklifnoma namunalari bilan tanishing
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`rounded-full px-6 ${activeCategory === category.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 border-0"
                  : "border-gray-700 text-gray-300 hover:bg-gray-800/50"
                  }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <Card
                  className="bg-gray-900/80 text-white border border-gray-800 overflow-hidden rounded-xl hover:border-purple-500/50 transition-all duration-300 group"
                  onClick={() => handleTemplateClick(template.id)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                    ></div>
                    <Image
                      src={template.image || "/placeholder.svg"}
                      alt={template.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                      {template.icon}
                      <span className="ml-2 text-sm font-medium">
                        {categories.find((c) => c.id === template.category)?.name}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex justify-between items-center">
                    <h3 className="font-semibold text-lg">{template.title}</h3>
                    <Button
                      size="sm"
                      className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
                    >
                      Yaratish
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-full px-8"
              onClick={() => router.push("/select-type")}
            >
              Barcha turlarni ko'rish
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-900/50 relative">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-600 rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600 rounded-full filter blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                Nima uchun bizni tanlashadi
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Taklifnoma yaratish jarayonini oson va qiziqarli qiladigan xususiyatlar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Zamonaviy dizayn",
                description: "Eng so'nggi dizayn tendentsiyalariga asoslangan zamonaviy taklifnomalar",
                icon: <Sparkles className="h-10 w-10 text-purple-400" />,
                color: "from-purple-600 to-pink-600",
              },
              {
                title: "Oson foydalanish",
                description: "Hech qanday dizayn ko'nikmalarsiz ham chiroyli taklifnomalar yarating",
                icon: <Gift className="h-10 w-10 text-blue-400" />,
                color: "from-blue-600 to-cyan-600",
              },
              {
                title: "Tezkor yaratish",
                description: "Bir necha daqiqada professional ko'rinishdagi taklifnomalarni yarating",
                icon: <Calendar className="h-10 w-10 text-cyan-400" />,
                color: "from-cyan-600 to-green-600",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-6 flex items-center justify-center`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 z-0 opacity-30">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full filter blur-[100px]"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full filter blur-[100px]"></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Hoziroq o'z taklifnomangizni yarating</h2>
                <p className="text-gray-300 max-w-xl">
                  Bir necha daqiqada professional ko'rinishdagi taklifnomalarni yarating va do'stlaringizni hayratda
                  qoldiring
                </p>
              </div>

              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full px-8 py-6 text-lg"
                onClick={() => router.push("/select-type")}
              >
                Boshlash
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

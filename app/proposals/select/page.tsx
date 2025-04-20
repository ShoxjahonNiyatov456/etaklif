"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Briefcase, PenTool, Building, ShoppingBag, Code } from "lucide-react"
import Link from "next/link"

export default function ProposalSelectPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [
    {
      id: "business",
      title: "Biznes taklifnoma",
      icon: <Briefcase className="h-10 w-10 text-purple-600" />,
      description: "Biznes hamkorlik va investitsiya takliflari uchun",
    },
    {
      id: "marketing",
      title: "Marketing taklifnoma",
      icon: <PenTool className="h-10 w-10 text-purple-600" />,
      description: "Marketing xizmatlari va strategiyalari uchun",
    },
    {
      id: "corporate",
      title: "Korporativ taklifnoma",
      icon: <Building className="h-10 w-10 text-purple-600" />,
      description: "Korporativ hamkorlik va loyihalar uchun",
    },
    {
      id: "sales",
      title: "Savdo taklifnoma",
      icon: <ShoppingBag className="h-10 w-10 text-purple-600" />,
      description: "Mahsulot va xizmatlar savdosi uchun",
    },
    {
      id: "it",
      title: "IT loyiha taklifnoma",
      icon: <Code className="h-10 w-10 text-purple-600" />,
      description: "IT loyihalar va dasturiy ta'minot uchun",
    },
  ]

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="pt-16 min-h-screen">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Taklifnoma turini tanlang</h1>
            <p className="text-lg text-gray-600">
              Yaratmoqchi bo'lgan taklifnoma turini tanlang va keyingi bosqichga o'ting
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {categories.map((category, index) => (
              <motion.div key={category.id} variants={fadeIn} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <div
                  className={`bg-white rounded-lg p-6 shadow-sm border cursor-pointer transition-all ${
                    selectedCategory === category.id
                      ? "border-purple-600 shadow-md"
                      : "border-gray-100 hover:border-gray-300 hover:shadow-sm"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-purple-100 rounded-full">{category.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                    <p className="text-gray-600 mb-6">{category.description}</p>
                    <button
                      className={`w-full px-4 py-2 rounded-md transition-colors ${
                        selectedCategory === category.id
                          ? "bg-purple-600 text-white"
                          : "border border-purple-600 text-purple-600 hover:bg-purple-50"
                      }`}
                    >
                      {selectedCategory === category.id ? "Tanlandi" : "Tanlash"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: selectedCategory ? 1 : 0,
              y: selectedCategory ? 0 : 20,
            }}
            transition={{ duration: 0.5 }}
            className="mt-12 text-center"
          >
            <Link href={selectedCategory ? `/proposals/${selectedCategory}` : "#"}>
              <button
                disabled={!selectedCategory}
                className={`px-6 py-3 bg-purple-600 text-white rounded-md flex items-center mx-auto group ${
                  !selectedCategory ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
                }`}
              >
                Davom etish
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

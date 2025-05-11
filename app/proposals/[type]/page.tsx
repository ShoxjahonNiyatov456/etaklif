"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Eye, FileText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProposalTypePage() {
  const params = useParams()
  const router = useRouter()
  const { type } = params

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("templates")
  const getTemplates = () => {
    switch (type) {
      case "business":
        return [
          { id: "b1", title: "Biznes hamkorlik", image: "/placeholder.svg?height=300&width=200" },
          { id: "b2", title: "Investitsiya taklifi", image: "/placeholder.svg?height=300&width=200" },
          { id: "b3", title: "Biznes rejasi", image: "/placeholder.svg?height=300&width=200" },
        ]
      case "marketing":
        return [
          { id: "m1", title: "Marketing xizmatlari", image: "/placeholder.svg?height=300&width=200" },
          { id: "m2", title: "Reklama kampaniyasi", image: "/placeholder.svg?height=300&width=200" },
          { id: "m3", title: "Brend strategiyasi", image: "/placeholder.svg?height=300&width=200" },
        ]
      case "corporate":
        return [
          { id: "c1", title: "Korporativ hamkorlik", image: "/placeholder.svg?height=300&width=200" },
          { id: "c2", title: "Korporativ tadbir", image: "/placeholder.svg?height=300&width=200" },
          { id: "c3", title: "Korporativ loyiha", image: "/placeholder.svg?height=300&width=200" },
        ]
      case "sales":
        return [
          { id: "s1", title: "Mahsulot taklifi", image: "/placeholder.svg?height=300&width=200" },
          { id: "s2", title: "Xizmat taklifi", image: "/placeholder.svg?height=300&width=200" },
          { id: "s3", title: "Chegirma taklifi", image: "/placeholder.svg?height=300&width=200" },
        ]
      case "it":
        return [
          { id: "i1", title: "Veb-sayt ishlab chiqish", image: "/placeholder.svg?height=300&width=200" },
          { id: "i2", title: "Mobil ilova ishlab chiqish", image: "/placeholder.svg?height=300&width=200" },
          { id: "i3", title: "Dasturiy ta'minot ishlab chiqish", image: "/placeholder.svg?height=300&width=200" },
        ]
      default:
        return []
    }
  }
  const templates = getTemplates()
  const getCategoryTitle = () => {
    switch (type) {
      case "business":
        return "Biznes taklifnoma"
      case "marketing":
        return "Marketing taklifnoma"
      case "corporate":
        return "Korporativ taklifnoma"
      case "sales":
        return "Savdo taklifnoma"
      case "it":
        return "IT loyiha taklifnoma"
      default:
        return "Taklifnoma"
    }
  }

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
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-8">
            <button
              className="mb-4 flex items-center text-gray-600 hover:text-purple-600 transition-colors"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Orqaga
            </button>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{getCategoryTitle()}</h1>
            <p className="text-lg text-gray-600">O'zingizga mos keladigan shablonni tanlang va uni tahrirlang</p>
          </motion.div>

          <div className="mb-8">
            <div className="border-b border-gray-200">
              <div className="flex -mb-px">
                <button
                  className={`mr-4 py-2 px-4 ${activeTab === "templates"
                    ? "border-b-2 border-purple-600 text-purple-600 font-medium"
                    : "text-gray-600 hover:text-purple-600"
                    }`}
                  onClick={() => setActiveTab("templates")}
                >
                  Shablonlar
                </button>
                <button
                  className={`py-2 px-4 ${activeTab === "custom"
                    ? "border-b-2 border-purple-600 text-purple-600 font-medium"
                    : "text-gray-600 hover:text-purple-600"
                    }`}
                  onClick={() => setActiveTab("custom")}
                >
                  Yangi yaratish
                </button>
              </div>
            </div>

            <div className="mt-8">
              {activeTab === "templates" ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {templates.map((template, index) => (
                    <motion.div
                      key={template.id}
                      variants={fadeIn}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div
                        className={`bg-white rounded-lg overflow-hidden shadow-sm border cursor-pointer transition-all ${selectedTemplate === template.id
                          ? "border-purple-600 shadow-md"
                          : "border-gray-100 hover:border-gray-300 hover:shadow-sm"
                          }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div className="relative h-64 w-full">
                          <Image
                            src={template.image || "/placeholder.svg"}
                            alt={template.title}
                            fill
                            className="object-cover"
                          />
                          {selectedTemplate === template.id && (
                            <div className="absolute inset-0 bg-purple-600/20 flex items-center justify-center">
                              <div className="bg-white rounded-full p-2">
                                <FileText className="h-6 w-6 text-purple-600" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold">{template.title}</h3>
                          <div className="flex justify-between items-center mt-4">
                            <button
                              className="px-3 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm flex items-center"
                              onClick={(e) => {
                                e.stopPropagation()
                              }}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Ko'rish
                            </button>
                            <button
                              className={`px-3 py-1 rounded-md text-sm ${selectedTemplate === template.id
                                ? "bg-purple-600 text-white"
                                : "border border-purple-600 text-purple-600 hover:bg-purple-50"
                                }`}
                            >
                              {selectedTemplate === template.id ? "Tanlandi" : "Tanlash"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Yangi taklifnoma yaratish</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Bo'sh shablondan foydalanib, o'zingizning taklifnomangizni yarating
                  </p>
                  <button
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    onClick={() => setSelectedTemplate("custom")}
                  >
                    Yangi yaratish
                  </button>
                </div>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: selectedTemplate ? 1 : 0,
              y: selectedTemplate ? 0 : 20,
            }}
            transition={{ duration: 0.5 }}
            className="mt-12 flex justify-between"
          >
            <button
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Orqaga
            </button>

            <Link href={selectedTemplate ? `/proposals/edit/${type}/${selectedTemplate}` : "#"}>
              <button
                disabled={!selectedTemplate}
                className={`px-4 py-2 bg-purple-600 text-white rounded-md flex items-center group ${!selectedTemplate ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
                  }`}
              >
                Tahrirlashga o'tish
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

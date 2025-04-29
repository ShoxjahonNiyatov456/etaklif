"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Save, Download, Eye, Plus, ImageIcon } from "lucide-react"

export default function ProposalEditPage() {
  const params = useParams()
  const router = useRouter()
  const { type, id } = params

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    recipient: "",
    date: new Date().toISOString().split("T")[0],
    introduction: "",
    scope: "",
    pricing: "",
    timeline: "",
    conclusion: "",
  })

  const [activeTab, setActiveTab] = useState("content")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    alert("Taklifnoma saqlandi!")
  }

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

  const getTemplateName = () => {
    if (id === "custom") return "Yangi taklifnoma"

    switch (type) {
      case "business":
        return id === "b1" ? "Biznes hamkorlik" : id === "b2" ? "Investitsiya taklifi" : "Biznes rejasi"
      case "marketing":
        return id === "m1" ? "Marketing xizmatlari" : id === "m2" ? "Reklama kampaniyasi" : "Brend strategiyasi"
      case "corporate":
        return id === "c1" ? "Korporativ hamkorlik" : id === "c2" ? "Korporativ tadbir" : "Korporativ loyiha"
      case "sales":
        return id === "s1" ? "Mahsulot taklifi" : id === "s2" ? "Xizmat taklifi" : "Chegirma taklifi"
      case "it":
        return id === "i1"
          ? "Veb-sayt ishlab chiqish"
          : id === "i2"
            ? "Mobil ilova ishlab chiqish"
            : "Dasturiy ta'minot ishlab chiqish"
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

  return (
    <div className="pt-16 min-h-screen">
      <section className="py-10">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-8">
            <button
              className="mb-4 flex items-center text-gray-600 hover:text-purple-600 transition-colors"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Orqaga
            </button>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1">{getTemplateName()}</h1>
                <p className="text-gray-600">{getCategoryTitle()} - Tahrirlash</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center"
                  onClick={() => window.open("#", "_blank")}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Ko'rish
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Yuklab olish
                </button>
                <button
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
                  onClick={handleSave}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Saqlash
                </button>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="p-4">
                  <div className="border-b border-gray-200 mb-4">
                    <div className="flex -mb-px">
                      <button
                        className={`mr-4 py-2 px-4 ${activeTab === "content"
                          ? "border-b-2 border-purple-600 text-purple-600 font-medium"
                          : "text-gray-600 hover:text-purple-600"
                          }`}
                        onClick={() => setActiveTab("content")}
                      >
                        Tarkib
                      </button>
                      <button
                        className={`py-2 px-4 ${activeTab === "design"
                          ? "border-b-2 border-purple-600 text-purple-600 font-medium"
                          : "text-gray-600 hover:text-purple-600"
                          }`}
                        onClick={() => setActiveTab("design")}
                      >
                        Dizayn
                      </button>
                    </div>
                  </div>

                  {activeTab === "content" ? (
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100">
                        <h3 className="font-medium">Sarlavha</h3>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100">
                        <h3 className="font-medium">Kirish</h3>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100">
                        <h3 className="font-medium">Loyiha doirasi</h3>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100">
                        <h3 className="font-medium">Narxlar</h3>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100">
                        <h3 className="font-medium">Vaqt jadvali</h3>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100">
                        <h3 className="font-medium">Xulosa</h3>
                      </div>
                      <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center">
                        <Plus className="mr-2 h-4 w-4" />
                        Bo'lim qo'shish
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Rang sxemasi</h3>
                        <div className="flex gap-2">
                          <div className="h-8 w-8 rounded-full bg-purple-500 cursor-pointer border-2 border-white hover:border-gray-300"></div>
                          <div className="h-8 w-8 rounded-full bg-blue-500 cursor-pointer border-2 border-white hover:border-gray-300"></div>
                          <div className="h-8 w-8 rounded-full bg-green-500 cursor-pointer border-2 border-white hover:border-gray-300"></div>
                          <div className="h-8 w-8 rounded-full bg-red-500 cursor-pointer border-2 border-white hover:border-gray-300"></div>
                          <div className="h-8 w-8 rounded-full bg-gray-800 cursor-pointer border-2 border-white hover:border-gray-300"></div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Shrift</h3>
                        <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                          <option>Inter</option>
                          <option>Roboto</option>
                          <option>Open Sans</option>
                          <option>Montserrat</option>
                        </select>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Logotip</h3>
                        <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center">
                          <ImageIcon className="mr-2 h-4 w-4" />
                          Yuklash
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main content editor */}
            <div className="md:col-span-9">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium mb-1">
                        Taklifnoma sarlavhasi
                      </label>
                      <input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Taklifnoma sarlavhasini kiriting"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium mb-1">
                          Kompaniya nomi
                        </label>
                        <input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Kompaniya nomini kiriting"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="recipient" className="block text-sm font-medium mb-1">
                          Qabul qiluvchi
                        </label>
                        <input
                          id="recipient"
                          name="recipient"
                          value={formData.recipient}
                          onChange={handleChange}
                          placeholder="Qabul qiluvchi nomini kiriting"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium mb-1">
                          Sana
                        </label>
                        <input
                          id="date"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Kirish</h2>
                  <textarea
                    id="introduction"
                    name="introduction"
                    value={formData.introduction}
                    onChange={handleChange}
                    placeholder="Taklifnoma kirish qismini kiriting"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Loyiha doirasi</h2>
                  <textarea
                    id="scope"
                    name="scope"
                    value={formData.scope}
                    onChange={handleChange}
                    placeholder="Loyiha doirasini kiriting"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Narxlar</h2>
                  <textarea
                    id="pricing"
                    name="pricing"
                    value={formData.pricing}
                    onChange={handleChange}
                    placeholder="Narxlar haqida ma'lumot kiriting"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Vaqt jadvali</h2>
                  <textarea
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    placeholder="Vaqt jadvalini kiriting"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Xulosa</h2>
                  <textarea
                    id="conclusion"
                    name="conclusion"
                    value={formData.conclusion}
                    onChange={handleChange}
                    placeholder="Taklifnoma xulosasini kiriting"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Orqaga
                </button>

                <button
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
                  onClick={handleSave}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Saqlash
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        message: "",
      })
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-600 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Biz bilan bog'laning
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <h2 className="text-xl font-semibold mb-6 text-white">Xabar yuborish</h2>

                {isSubmitted ? (
                  <div className="bg-green-900/30 border border-green-700/30 text-green-400 rounded-lg p-4">
                    Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Ismingiz
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Ismingizni kiriting"
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Email manzilingizni kiriting"
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                        Xabar
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Xabaringizni kiriting"
                        rows={5}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500 resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className={`w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg flex items-center justify-center transition-all duration-300 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="mr-2">Yuborilmoqda...</span>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </>
                      ) : (
                        <>
                          Yuborish
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 mb-6"
              >
                <h2 className="text-xl font-semibold mb-6 text-white">Bog'lanish ma'lumotlari</h2>

                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center mr-4">
                      <MapPin className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Manzil</h3>
                      <p className="text-gray-400">Jizzax shahri, Sharof Rashidov tumani</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Email</h3>
                      <p className="text-gray-400">info@etaklif.vercel.app</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Telefon</h3>
                      <p className="text-gray-400">+998 95 557 13 02</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
              >
                <h2 className="text-xl font-semibold mb-6 text-white">Ijtimoiy tarmoqlar</h2>

                <div className="flex space-x-4">
                  <a
                    href="https://t.me/taklifnoma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
                  >
                    <Send className="h-5 w-5" />
                  </a>

                  <a
                    href="#"
                    className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-full flex items-center justify-center hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>

                  <a
                    href="#"
                    className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

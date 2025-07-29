"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Facebook, Instagram, Send } from "lucide-react"

export default function ContactInfoSection() {
    return (
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
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 mb-6"
            >
                <h2 className="text-xl font-semibold text-white">Ijtimoiy tarmoqlar</h2>

                <div className="flex space-x-4">
                    <a
                        href="https://t.me/taklifnoma"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
                    >
                        <Send className="h-6 w-6" />
                    </a>
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 text-white rounded-full flex items-center justify-center hover:from-pink-600 hover:to-red-600 transition-all duration-300 shadow-lg"
                    >
                        <Instagram className="h-6 w-6" />
                    </a>
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg"
                    >
                        <Facebook className="h-6 w-6" />
                    </a>
                </div>
            </motion.div>
        </div>
    )
}
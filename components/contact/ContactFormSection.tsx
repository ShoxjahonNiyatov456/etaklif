"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

interface ContactFormSectionProps {
    isSubmitted: boolean;
    isSubmitting: boolean;
    formData: { name: string; email: string; message: string };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

export default function ContactFormSection({
    isSubmitted,
    isSubmitting,
    formData,
    handleChange,
    handleSubmit,
}: ContactFormSectionProps) {
    return (
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
    )
}
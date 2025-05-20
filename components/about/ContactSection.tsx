"use client"

import { motion } from "framer-motion"
import { Phone, Mail, Send } from "lucide-react"

interface ContactSectionProps {
    hasMounted: boolean;
    fadeIn: (delay?: number) => {
        hidden: { opacity: number; y: number };
        visible: { opacity: number; y: number; transition: { duration: number; delay?: number } };
    };
}

export default function ContactSection({ hasMounted, fadeIn }: ContactSectionProps) {
    return (
        <motion.div
            initial="hidden"
            animate={hasMounted ? "visible" : "hidden"}
            variants={fadeIn(0.8)}
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
    )
}
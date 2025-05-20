"use client"

import { motion } from "framer-motion"
import { Users, Palette, Zap, Gift, CheckCircle } from "lucide-react"

interface AdvantagesSectionProps {
    hasMounted: boolean;
    fadeIn: (delay?: number) => {
        hidden: { opacity: number; y: number };
        visible: { opacity: number; y: number; transition: { duration: number; delay?: number } };
    };
}

export default function AdvantagesSection({ hasMounted, fadeIn }: AdvantagesSectionProps) {
    const advantages = [
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
    ]

    return (
        <motion.div
            initial="hidden"
            animate={hasMounted ? "visible" : "hidden"}
            variants={fadeIn(0.4)}
            className="pt-8"
        >
            <h2 className="text-2xl font-bold mb-6 text-white">Bizning afzalliklarimiz</h2>

            <div className="grid md:grid-cols-2 gap-6">
                {advantages.map((advantage, index) => (
                    <motion.div
                        key={index}
                        initial="hidden"
                        animate={hasMounted ? "visible" : "hidden"}
                        variants={fadeIn(0.5 + index * 0.1)}
                        className="flex items-start space-x-3 bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700"
                    >
                        <div className="mt-0.5">{advantage.icon}</div>
                        <p className="font-medium">{advantage.title}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
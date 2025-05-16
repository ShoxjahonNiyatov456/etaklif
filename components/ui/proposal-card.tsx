"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProposalCardProps {
    id: string
    title: string
    description: string
    imageSrc: string
    linkPath: string
    buttonText?: string
    className?: string
    onClick?: () => void
}

export function ProposalCard({
    title,
    imageSrc,
    linkPath,
    buttonText = "Yaratish",
    className = "",
    onClick,
}: ProposalCardProps) {
    const router = useRouter()

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    }

    const handleCardClick = () => {
        if (onClick) {
            onClick()
        } else {
            router.push(linkPath)
        }
    }

    return (
        <motion.div
            variants={fadeIn}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className={`cursor-pointer ${className}`}
        >
            <div className="rounded-xl overflow-hidden transition-all duration-300 group border border-gray-800 hover:border-purple-500/50 bg-gray-900/80 backdrop-blur-sm relative h-[380px]">
                <div className="relative h-full w-full overflow-hidden" onClick={handleCardClick}>
                    <div className="absolute top-3 left-3 z-20 bg-black/70 backdrop-blur-sm px-3 rounded-full py-1.5">
                        <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white-500 ">
                            {title}
                        </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />
                    <Image
                        src={imageSrc || "/placeholder.svg"}
                        alt={title}
                        fill
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <button
                            className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/20"
                            onClick={handleCardClick}
                        >
                            {buttonText}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full filter blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
            </div>
        </motion.div>
    )
}

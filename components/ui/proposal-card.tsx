"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Gift, Award, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProposalCardProps {
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    linkPath: string;
    buttonText?: string;
    className?: string;
    onClick?: () => void;
}

export function ProposalCard({
    id,
    title,
    description,
    imageSrc,
    linkPath,
    buttonText = "Yaratish",
    className = "",
    onClick,
}: ProposalCardProps) {
    const router = useRouter();
    
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };
    
    const handleCardClick = () => {
        if (onClick) {
            onClick();
        } else {
            router.push(linkPath);
        }
    };

    return (
        <motion.div
            variants={fadeIn}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className={`cursor-pointer ${className}`}
        >
            <div className="rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group border relative">
                <div 
                    className="relative h-96 w-full overflow-hidden" 
                    onClick={handleCardClick}
                >
                    <div className="absolute top-2 right-3 z-20 bg-white/90 backdrop-blur-sm px-3 rounded-xl py-1">
                        <span className="font-medium text-primary-600">{title}</span>
                    </div>
                    <div className="absolute w-full h-full inset-0 bg-gradient-to-t to-transparent z-10" />
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="relative">
                    <div className="block absolute bottom-3 w-full px-4">
                        <button 
                            className="w-full px-4 py-3 bg-primary-50 text-primary-600 font-medium rounded-xl hover:bg-primary-100 transition-colors flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white"
                            onClick={handleCardClick}
                        >
                            {buttonText}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
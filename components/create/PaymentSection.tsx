"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Share2, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShareModal } from "@/components/ui/share-modal"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog"
import { generateShareableLink } from "@/app/services/share"


interface Template {
    id: string
    name: string
    style: string
    hasImageUpload: boolean
    color: string
}

const getTemplatesForType = (currentType: string): Template[] => {
    switch (currentType) {
        case "wedding":
            return [
                { id: "floral-gold", name: "Guldor oltin", style: "floral-gold", hasImageUpload: false, color: "from-amber-500 to-yellow-500" },
                { id: "elegant-frame", name: "Elegant ramka", style: "elegant-frame", hasImageUpload: false, color: "from-purple-500 to-pink-500" },
                { id: "blue-floral", name: "Ko'k guldor", style: "blue-floral", hasImageUpload: false, color: "from-blue-500 to-cyan-500" },
                { id: "golden-ornament", name: "Oltin naqsh", style: "golden-ornament", hasImageUpload: false, color: "from-yellow-500 to-amber-500" },
                { id: "floral-hexagon", name: "Guldor olti burchak", style: "floral-hexagon", hasImageUpload: false, color: "from-rose-500 to-pink-500" },
                { id: "vintage-ornament", name: "Vintage naqsh", style: "vintage-ornament", hasImageUpload: false, color: "from-teal-500 to-cyan-500" },
                { id: "modern-minimalist", name: "Zamonaviy minimalist", style: "modern-minimalist", hasImageUpload: false, color: "from-gray-500 to-slate-500" },
                { id: "rustic-charm", name: "Rustik joziba", style: "rustic-charm", hasImageUpload: false, color: "from-orange-500 to-amber-500" },
                { id: "luxury-classic", name: "Hashamatli klassika", style: "luxury-classic", hasImageUpload: false, color: "from-red-500 to-rose-500" },
                { id: "garden-party", name: "Bog' ziyofati", style: "garden-party", hasImageUpload: false, color: "from-green-500 to-emerald-500" },
                { id: "romantic-roses", name: "Romantik atirgullar", style: "romantic-roses", hasImageUpload: false, color: "from-pink-500 to-red-500" },
                { id: "royal-elegance", name: "Qirollik hashamati", style: "royal-elegance", hasImageUpload: false, color: "from-indigo-500 to-purple-500" },
                { id: "bohemian-chic", name: "Boho uslubi", style: "bohemian-chic", hasImageUpload: false, color: "from-orange-500 to-red-500" },
                { id: "crystal-glamour", name: "Kristall jozibasi", style: "crystal-glamour", hasImageUpload: false, color: "from-cyan-500 to-blue-500" },
                { id: "vintage-lace", name: "Vintage to'r", style: "vintage-lace", hasImageUpload: false, color: "from-amber-500 to-orange-500" },
                { id: "modern-geometric", name: "Zamonaviy geometrik", style: "modern-geometric", hasImageUpload: false, color: "from-violet-500 to-purple-500" },
                { id: "enchanted-garden", name: "Sehrli bog'", style: "enchanted-garden", hasImageUpload: false, color: "from-emerald-500 to-green-500" },
                { id: "marble-luxury", name: "Marmar hashamat", style: "marble-luxury", hasImageUpload: false, color: "from-slate-500 to-gray-500" },
                { id: "celestial-dreams", name: "Samoviy orzular", style: "celestial-dreams", hasImageUpload: false, color: "from-blue-500 to-indigo-500" },
                { id: "traditional-charm", name: "An'anaviy joziba", style: "traditional-charm", hasImageUpload: false, color: "from-rose-500 to-red-500" },
            ];
        case "birthday":
            return [
                { id: "colorful", name: "Rang-barang", style: "colorful", hasImageUpload: false, color: "from-pink-500 to-purple-500" },
                { id: "kids", name: "Bolalar uchun", style: "kids", hasImageUpload: false, color: "from-blue-500 to-cyan-500" },
                { id: "floral-frame", name: "Guldor ramka", style: "floral-frame", hasImageUpload: false, color: "from-green-500 to-emerald-500" },
                { id: "butterfly", name: "Kapalaklar", style: "butterfly", hasImageUpload: false, color: "from-purple-500 to-indigo-500" },
                { id: "kids-photo", name: "Bolalar suratli", style: "kids-photo", hasImageUpload: true, color: "from-cyan-500 to-blue-500" },
                { id: "unicorn", name: "Yoltoq", style: "unicorn", hasImageUpload: false, color: "from-pink-500 to-rose-500" },
            ];
        case "funeral":
            return [
                { id: "traditional", name: "An'anaviy", style: "traditional", hasImageUpload: false, color: "from-gray-500 to-slate-500" },
                { id: "calm", name: "Sokin", style: "calm", hasImageUpload: false, color: "from-blue-500 to-slate-500" },
                { id: "photo-memorial", name: "Suratli xotira", style: "photo-memorial", hasImageUpload: true, color: "from-slate-500 to-gray-500" },
                { id: "elegant-memorial", name: "Elegant xotira", style: "elegant-memorial", hasImageUpload: true, color: "from-indigo-500 to-slate-500" },
                { id: "islamic-memorial", name: "Islomiy uslub", style: "islamic-memorial", hasImageUpload: true, color: "from-green-500 to-emerald-500" },
            ];
        case "jubilee":
            return [
                { id: "classic", name: "Klassik", style: "classic", hasImageUpload: false, color: "from-amber-500 to-yellow-500" },
                { id: "modern", name: "Zamonaviy", style: "modern", hasImageUpload: false, color: "from-blue-500 to-cyan-500" },
                { id: "ornate", name: "Bezakli", style: "ornate", hasImageUpload: false, color: "from-purple-500 to-pink-500" },
                { id: "minimalist", name: "Minimalist", style: "minimalist", hasImageUpload: false, color: "from-gray-500 to-slate-500" },
                { id: "traditional", name: "An'anaviy Yubiley", style: "traditional-jubilee", hasImageUpload: true, color: "from-red-500 to-rose-500" }, // Ensure unique style/id if needed
                { id: "luxury", name: "Hashamatli", style: "luxury", hasImageUpload: false, color: "from-yellow-500 to-amber-500" },
                { id: "festive", name: "Bayramona", style: "festive", hasImageUpload: false, color: "from-red-500 to-orange-500" },
                { id: "photo-jubilee", name: "Suratli yubiley", style: "photo-jubilee", hasImageUpload: true, color: "from-cyan-500 to-blue-500" },
            ];
        case "engagement":
            return [
                { id: "romantic", name: "Romantik", style: "romantic", hasImageUpload: false, color: "from-pink-500 to-rose-500" },
                { id: "national", name: "Milliy", style: "national", hasImageUpload: false, color: "from-red-500 to-orange-500" },
                { id: "floral-engagement", name: "Gulli Unashtiruv", style: "floral-engagement", hasImageUpload: true, color: "from-rose-500 to-pink-500" },
                { id: "modern-engagement", name: "Zamonaviy Unashtiruv", style: "modern-engagement", hasImageUpload: true, color: "from-purple-500 to-indigo-500" },
                { id: "traditional-engagement", name: "An'anaviy Unashtiruv", style: "traditional-engagement", hasImageUpload: true, color: "from-amber-500 to-yellow-500" },
            ];
        default:
            return [];
    }
}

interface PaymentSectionProps {
    type: string
    selectedTemplate: string
    formData: {
        firstName: string
        secondName: string
        date: string
        time: string
        location: string
        additionalInfo: string
        age: string
        parents: string
    }
    uploadedImage: string | null
}

export default function PaymentSection({ type, selectedTemplate, formData, uploadedImage }: PaymentSectionProps) {
    const [paymentCompleted, setPaymentCompleted] = useState(false)
    const [shareableLink, setShareableLink] = useState("")
    const [isShareModalOpen, setIsShareModalOpen] = useState(false)
    const [paymentProcessing, setPaymentProcessing] = useState(false)
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
    const [isGeneratingLink, setIsGeneratingLink] = useState(false)
    const currentTemplateDetails = getTemplatesForType(type).find(t => t.id === selectedTemplate);
    const templateRequiresImage = currentTemplateDetails?.hasImageUpload ?? false;
    const handleShareInvitation = async () => {
        try {
            setIsGeneratingLink(true)
            const link = await generateShareableLink(type as string, selectedTemplate, formData)
            setShareableLink(link)
            setIsShareModalOpen(true)
            setIsGeneratingLink(false)
        } catch (error) {
            console.error("Error generating link:", error)
            setIsGeneratingLink(false)
        }
    }
    const handlePaymentProcessing = async () => {
        try {
            setPaymentProcessing(true)
            await new Promise((resolve) => setTimeout(resolve, 2000))
            setIsGeneratingLink(true)
            const link = await generateShareableLink(type as string, selectedTemplate, formData)
            setShareableLink(link)
            setIsConfirmDialogOpen(false)
            setPaymentCompleted(true)
            setPaymentProcessing(false)
            setIsGeneratingLink(false)
        } catch (error) {
            console.error("Error in payment processing:", error)
            setPaymentProcessing(false)
            setIsGeneratingLink(false)
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg mt-6"
        >
            <h3 className="text-xl font-semibold mb-6 text-white">Taklifnomani yakunlash</h3>
            {!paymentCompleted ? (
                <>
                    {!(templateRequiresImage && !uploadedImage) && (
                        <Button
                            onClick={() => setIsConfirmDialogOpen(true)}
                            disabled={paymentProcessing}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {paymentProcessing ? (
                                <div className="flex items-center justify-center">
                                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                    <span>Tayyorlanmoqda...</span>
                                </div>
                            ) : (
                                <>Yakunlash uchun bosing!</>
                            )}
                        </Button>
                    )}
                    <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
                        <AlertDialogContent className="bg-gray-900 border border-gray-800 text-white">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-white">Rostan ham tugallashni xoxlaysizmi?</AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-400">
                                    Bu amal taklifnomangizni yakunlaydi va ulashish uchun havola yaratadi. Davom etishni xohlaysizmi?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700 hover:text-white">
                                    Bekor qilish
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handlePaymentProcessing}
                                    disabled={paymentProcessing}
                                    className={`bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 ${paymentProcessing ? "opacity-70 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {paymentProcessing ? (
                                        <div className="flex items-center">
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            To'lov amalga oshirilmoqda...
                                        </div>
                                    ) : (
                                        "Yakunlash"
                                    )}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center space-y-6 mt-6">
                    <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full border border-green-500/30">
                        <Check className="h-10 w-10 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-500">To'lov muvaffaqiyatli yakunlandi!</h3>
                    <Button
                        onClick={shareableLink ? () => setIsShareModalOpen(true) : handleShareInvitation}
                        disabled={isGeneratingLink}
                        className={`px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center ${isGeneratingLink ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                    >
                        {isGeneratingLink ? (
                            <>
                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                <span>Havola tayyorlanmoqda...</span>
                            </>
                        ) : (
                            <>
                                <Share2 className="h-5 w-5 mr-2" />
                                Taklifnomani ulashish
                            </>
                        )}
                    </Button>
                </div>
            )}
            {shareableLink && (
                <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} url={shareableLink} title="" />
            )}
        </motion.div>
    )
}

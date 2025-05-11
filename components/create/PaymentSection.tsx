"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Share2, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShareModal } from "@/components/ui/share-modal"
import { getCurrentUser } from "@/app/services/auth"
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

    const handlePayment = async () => {
        const currentUser = getCurrentUser()

        if (!currentUser) {
            alert("Avval ro'yxatdan o'ting yoki tizimga kiring.")
            setPaymentProcessing(false)
            return
        }

        try {
            setPaymentProcessing(true)
            await new Promise((resolve) => setTimeout(resolve, 1500))

            setPaymentCompleted(true)

            const invitationData = {
                userId: currentUser.uid,
                firstName: formData.firstName,
                secondName: formData.secondName,
                date: formData.date,
                time: formData.time,
                location: formData.location,
                additionalInfo: formData.additionalInfo,
                age: formData.age,
                parents: formData.parents,
                uploadedImage: uploadedImage,
            }

            const { generateShareableLink } = await import("@/app/services/share")
            const link = await generateShareableLink(type as string, selectedTemplate, invitationData)

            setShareableLink(link)
        } catch (error) {
            console.error("To'lov jarayonida xatolik:", error)
            alert("To'lov jarayonida xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.")
        } finally {
            setPaymentProcessing(false)
        }
    }

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
                    <Button
                        onClick={() => setIsConfirmDialogOpen(true)}
                        disabled={paymentProcessing}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
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

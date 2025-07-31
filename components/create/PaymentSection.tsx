"use client"

import { useState, useEffect, Fragment } from "react"
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
import { auth } from "@/app/firebase"
import { toast } from "../ui/use-toast"
import { PaymentModal, type PaymentFormData } from "@/components/payment/PaymentModal"

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
        {
          id: "burgundy-roses",
          name: "Qizil atirgullar",
          style: "burgundy-roses",
          hasImageUpload: false,
          color: "from-rose-800 to-rose-600",
        },
        {
          id: "peach-floral",
          name: "Shaftoli guldor",
          style: "peach-floral",
          hasImageUpload: false,
          color: "from-amber-800 to-amber-600",
        },
        {
          id: "golden-frame",
          name: "Oltin ramka",
          style: "golden-frame",
          hasImageUpload: false,
          color: "from-amber-400 to-gray-800",
        },
        {
          id: "colorful-garden",
          name: "Rang-barang bog'",
          style: "colorful-garden",
          hasImageUpload: false,
          color: "from-pink-900 to-pink-700",
        },
        {
          id: "watercolor-bouquet",
          name: "Akvarel guldasta",
          style: "watercolor-bouquet",
          hasImageUpload: false,
          color: "from-rose-800 to-rose-700",
        },
        {
          id: "pink-roses",
          name: "Pushti atirgullar",
          style: "pink-roses",
          hasImageUpload: false,
          color: "from-rose-800 to-rose-600",
        },
        {
          id: "rose-gold",
          name: "Pushti oltin",
          style: "rose-gold",
          hasImageUpload: false,
          color: "from-rose-800 to-rose-700",
        },
        {
          id: "elegant-corner",
          name: "Elegant burchak",
          style: "elegant-corner",
          hasImageUpload: false,
          color: "from-rose-800 to-rose-700",
        },
        {
          id: "elegant-script",
          name: "Elegant yozuv",
          style: "elegant-script",
          hasImageUpload: false,
          color: "from-purple-500 to-indigo-500",
        },
      ]
    case "birthday":
      return [
        {
          id: "colorful",
          name: "Rang-barang",
          style: "colorful",
          hasImageUpload: false,
          color: "from-pink-500 to-purple-500",
        },
        {
          id: "kids",
          name: "Bolalar uchun",
          style: "kids",
          hasImageUpload: false,
          color: "from-blue-500 to-cyan-500",
        },
        {
          id: "floral-frame",
          name: "Guldor ramka",
          style: "floral-frame",
          hasImageUpload: false,
          color: "from-green-500 to-emerald-500",
        },
        {
          id: "butterfly",
          name: "Kapalaklar",
          style: "butterfly",
          hasImageUpload: false,
          color: "from-purple-500 to-indigo-500",
        },
        {
          id: "kids-photo",
          name: "Bolalar suratli",
          style: "kids-photo",
          hasImageUpload: false,
          color: "from-cyan-500 to-blue-500",
        },
        {
          id: "unicorn",
          name: "Yoltoq",
          style: "unicorn",
          hasImageUpload: false,
          color: "from-pink-500 to-rose-500",
        },
      ]
    case "funeral":
      return [
        {
          id: "traditional",
          name: "An'anaviy",
          style: "traditional",
          hasImageUpload: false,
          color: "from-gray-500 to-slate-500",
        },
        {
          id: "calm",
          name: "Sokin",
          style: "calm",
          hasImageUpload: false,
          color: "from-blue-500 to-slate-500",
        },
        {
          id: "photo-memorial",
          name: "Suratli xotira",
          style: "photo-memorial",
          hasImageUpload: false,
          color: "from-slate-500 to-gray-500",
        },
        {
          id: "elegant-memorial",
          name: "Elegant xotira",
          style: "elegant-memorial",
          hasImageUpload: false,
          color: "from-indigo-500 to-slate-500",
        },
        {
          id: "islamic-memorial",
          name: "Islomiy uslub",
          style: "islamic-memorial",
          hasImageUpload: false,
          color: "from-green-500 to-emerald-500",
        },
      ]
    case "jubilee":
      return [
        {
          id: "classic",
          name: "Klassik",
          style: "classic",
          hasImageUpload: false,
          color: "from-amber-500 to-yellow-500",
        },
        {
          id: "modern",
          name: "Zamonaviy",
          style: "modern",
          hasImageUpload: false,
          color: "from-blue-500 to-cyan-500",
        },
        {
          id: "ornate",
          name: "Bezakli",
          style: "ornate",
          hasImageUpload: false,
          color: "from-purple-500 to-pink-500",
        },
        {
          id: "minimalist",
          name: "Minimalist",
          style: "minimalist",
          hasImageUpload: false,
          color: "from-gray-500 to-slate-500",
        },
        {
          id: "traditional",
          name: "An'anaviy Yubiley",
          style: "traditional-jubilee",
          hasImageUpload: false,
          color: "from-red-500 to-rose-500",
        },
        {
          id: "luxury",
          name: "Hashamatli",
          style: "luxury",
          hasImageUpload: false,
          color: "from-yellow-500 to-amber-500",
        },
        {
          id: "festive",
          name: "Bayramona",
          style: "festive",
          hasImageUpload: false,
          color: "from-red-500 to-orange-500",
        },
        {
          id: "photo-jubilee",
          name: "Suratli yubiley",
          style: "photo-jubilee",
          hasImageUpload: false,
          color: "from-cyan-500 to-blue-500",
        },
      ]
    case "engagement":
      return [
        {
          id: "romantic",
          name: "Romantik",
          style: "romantic",
          hasImageUpload: false,
          color: "from-pink-500 to-rose-500",
        },
        {
          id: "national",
          name: "Milliy",
          style: "national",
          hasImageUpload: false,
          color: "from-red-500 to-orange-500",
        },
        {
          id: "floral-engagement",
          name: "Gulli Unashtiruv",
          style: "floral-engagement",
          hasImageUpload: false,
          color: "from-rose-500 to-pink-500",
        },
        {
          id: "modern-engagement",
          name: "Zamonaviy Unashtiruv",
          style: "modern-engagement",
          hasImageUpload: false,
          color: "from-purple-500 to-indigo-500",
        },
        {
          id: "traditional-engagement",
          name: "An'anaviy Unashtiruv",
          style: "traditional-engagement",
          hasImageUpload: false,
          color: "from-amber-500 to-yellow-500",
        },
      ]
    default:
      return []
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
  const [hasMounted, setHasMounted] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uniqueId, setUniqueId] = useState("")

  useEffect(() => {
    setHasMounted(true)
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user)
    })
    return () => unsubscribe()
  }, [])

  const currentTemplateDetails = getTemplatesForType(type).find((t) => t.id === selectedTemplate)

  const templateRequiresImage = currentTemplateDetails?.hasImageUpload ?? false

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
      setIsGeneratingLink(true)

      // Generate the shareable link first
      const link = await generateShareableLink(type as string, selectedTemplate, formData)

      // Extract the uniqueId from the link
      const uniqueIdMatch = link.match(/\/[^/]+\/[^/]+\/([^/]+)$/)
      const extractedUniqueId = uniqueIdMatch ? uniqueIdMatch[1] : null

      if (!extractedUniqueId) {
        throw new Error("Could not extract uniqueId from generated link")
      }

      // Save the uniqueId for later use
      setUniqueId(extractedUniqueId)
      setShareableLink(link)
      setIsConfirmDialogOpen(false)

      // Open payment modal
      setIsPaymentModalOpen(true)
      setPaymentProcessing(false)
      setIsGeneratingLink(false)
    } catch (error) {
      console.error("Error in payment processing:", error)
      toast({
        variant: "destructive",
        title: "Xatolik yuz berdi",
        description: "Taklifnomani yaratishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
      })
      setPaymentProcessing(false)
      setIsGeneratingLink(false)
    }
  }

  // Payment submission function
  const submitPaymentRequest = async (paymentData: PaymentFormData) => {
    try {
      setIsSubmitting(true)
      const response = await fetch("/api/update-payment-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uniqueId: uniqueId,
          paymentStatus: "pending",
          screenshotBase64: paymentData.screenshotBase64,
        }),
      })

      const result = await response.json()
      if (result.success) {
        setIsPaymentModalOpen(false)
        setPaymentCompleted(true)
        toast({
          title: "To'lov so'rovi yuborildi",
          description: "To'lov so'rovingiz muvaffaqiyatli yuborildi va tez orada ko'rib chiqiladi.",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Xatolik yuz berdi",
          description: result.error || "To'lov so'rovini yuborishda xatolik yuz berdi",
        })
      }
    } catch (error) {
      console.error("Payment submission error:", error)
      toast({
        variant: "destructive",
        title: "Xatolik yuz berdi",
        description: "To'lov so'rovini yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const paymentSectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
  }

  return (
    <>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSubmit={submitPaymentRequest}
        isSubmitting={isSubmitting}
        cardNumber="4073 4200 2379 1357"
        cardOwner="Niyatov Shohjahon"
        invitationLink={shareableLink}
      />
      <motion.div
        initial="hidden"
        animate={hasMounted ? "visible" : "hidden"}
        variants={paymentSectionVariants}
      >
        {!paymentCompleted ? (
          <>
            {!(templateRequiresImage && !uploadedImage) && (
              <Button
                onClick={() => {
                  if (!isAuthenticated) {
                    toast({
                      variant: "destructive",
                      title: "Avval ro'yxatdan o'ting!!!",
                      description: "Taklifnomani yakunlash uchun iltimos ro'yxatdan o'ting",
                    })
                  } else {
                    setIsConfirmDialogOpen(true)
                  }
                }}
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
          <div></div>
        )}

        {/* ShareModal komponenti PaymentModal komponentiga ko'chirildi */}
      </motion.div>
    </>
  )
}

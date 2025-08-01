"use client"

import { useState, useEffect } from "react"
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
  const [shareCompleted, setShareCompleted] = useState(false)
  const [shareableLink, setShareableLink] = useState("")
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [shareProcessing, setShareProcessing] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isGeneratingLink, setIsGeneratingLink] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
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

  const handleShareProcessing = async () => {
    try {
      setShareProcessing(true)
      setIsGeneratingLink(true)

      // Generate the shareable link
      const link = await generateShareableLink(type as string, selectedTemplate, formData)

      // Extract the uniqueId from the link
      const uniqueIdMatch = link.match(/\/[^/]+\/[^/]+\/([^/]+)$/)
      const extractedUniqueId = uniqueIdMatch ? uniqueIdMatch[1] : null

      if (!extractedUniqueId) {
        throw new Error("Could not extract uniqueId from generated link")
      }

      // Save the uniqueId and link
      setUniqueId(extractedUniqueId)
      setShareableLink(link)
      setIsConfirmDialogOpen(false)

      // Open share modal instead of payment modal
      setIsShareModalOpen(true)
      setShareProcessing(false)
      setIsGeneratingLink(false)
      setShareCompleted(true)
    } catch (error) {
      console.error("Error in share processing:", error)
      toast({
        variant: "destructive",
        title: "Xatolik yuz berdi",
        description: "Taklifnomani yaratishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
      })
      setShareProcessing(false)
      setIsGeneratingLink(false)
    }
  }

  const paymentSectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
  }

  return (
    <>
      <motion.div initial="hidden" animate={hasMounted ? "visible" : "hidden"} variants={paymentSectionVariants}>
        {!shareCompleted ? (
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
                disabled={shareProcessing}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {shareProcessing ? (
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
                    onClick={handleShareProcessing}
                    disabled={shareProcessing}
                    className={`bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 ${shareProcessing ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                  >
                    {shareProcessing ? (
                      <div className="flex items-center">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Havola yaratilmoqda...
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
          <div className="text-center p-4">
            <div className="flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-500 mr-2" />
              <span className="text-lg font-semibold text-green-500">Taklifnoma muvaffaqiyatli yaratildi!</span>
            </div>
            <Button
              onClick={() => setIsShareModalOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Qayta ulashish
            </Button>
          </div>
        )}

        {/* ShareModal komponenti */}
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          url={shareableLink}
          title="Taklifnoma"
        />
      </motion.div>
    </>
  )
}

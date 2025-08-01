"use client"
import type React from "react"
import { useState, useRef } from "react"
import { X, Upload, Check, AlertCircle, CreditCard, Camera, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: PaymentFormData) => void
  isSubmitting?: boolean
  cardNumber?: string
  cardOwner?: string
  invitationLink?: string
}

export interface PaymentFormData {
  screenshot?: File | null
  screenshotBase64?: string
}

export function PaymentModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
  cardNumber = "4073 4200 2379 1357",
  cardOwner = "Niyatov Shohjahon",
  invitationLink,
}: PaymentModalProps) {
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const [error, setError] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setScreenshot(file)
    setError("")

    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Fayl hajmi 5MB dan oshmasligi kerak")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setScreenshotPreview(null)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!screenshot) {
      setError("Iltimos, to'lov skrinshotini yuklang")
      return
    }

    try {
      // Convert screenshot to base64
      let screenshotBase64 = ""
      if (screenshot) {
        const reader = new FileReader()
        screenshotBase64 = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(screenshot)
        })
      }

      await onSubmit({
        screenshot,
        screenshotBase64,
      })

      // Reset form on success
      setScreenshot(null)
      setScreenshotPreview(null)
      setError("")
    } catch (error) {
      console.error("Payment submission error:", error)
      setError("To'lov so'rovini yuborishda xatolik yuz berdi")
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cardNumber)
      setCopied(true)
      toast({
        title: "Nusxalandi!",
        description: "Karta raqami nusxalandi",
      })
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error("Copy failed:", err)
    }
  }

  const handleCopyLink = async () => {
    if (!invitationLink) return
    try {
      await navigator.clipboard.writeText(invitationLink)
      setLinkCopied(true)
      toast({
        title: "Nusxalandi!",
        description: "Havola nusxalandi",
      })
      setTimeout(() => setLinkCopied(false), 1500)
    } catch (err) {
      console.error("Copy link failed:", err)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden relative">
        {/* Header - Fixed */}
        <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-4 sm:p-6 text-white flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/80 hover:text-white transition-colors z-10"
            disabled={isSubmitting}
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <div className="flex items-center space-x-3 pr-8">
            <div className="p-2 bg-white/20 rounded-lg">
              <CreditCard className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">To'lov amalga oshirish</h2>
              <p className="text-white/80 text-xs sm:text-sm">Quyidagi karta raqamiga pul o'tkazing</p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <div className="p-4 sm:p-6 bg-gray-800/50 space-y-4 sm:space-y-6">
            {/* Invitation Link */}
            {invitationLink && (
              <div className="bg-gray-700/50 rounded-xl p-3 sm:p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xs text-white/80">TAKLIFNOMA HAVOLASI</div>
                </div>
                <div className="flex items-center justify-between bg-gray-800/70 rounded-lg p-2 mb-2">
                  <div className="text-xs sm:text-sm text-white/90 truncate mr-2">{invitationLink}</div>
                  <button
                    onClick={handleCopyLink}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors flex-shrink-0"
                  >
                    {linkCopied ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4 text-white/80" />
                    )}
                  </button>
                </div>
                {linkCopied && <div className="text-xs text-green-400 text-center">Havola nusxalandi!</div>}
              </div>
            )}

            {/* Card Info */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white">
              <div className="flex justify-between items-start mb-3">
                <div className="text-xs opacity-80">KARTA RAQAMI</div>
                <div className="text-xs opacity-80">HUMO</div>
              </div>
              <div className="text-base sm:text-lg font-mono tracking-wider mb-3 select-all">{cardNumber}</div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs opacity-80">KARTA EGASI</div>
                  <div className="text-sm font-medium select-all">{cardOwner}</div>
                </div>
                <div className="flex flex-col items-end justify-end">
                  <button
                    onClick={handleCopy}
                    className="w-8 h-8 bg-white/20 rounded flex flex-col items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                  <span className="text-[10px] mt-1">Nusxa Olish</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-300">
                  <p className="font-medium mb-1">To'lov qilish tartibi:</p>
                  <ol className="text-xs space-y-1 text-blue-200">
                    <li>1. Yuqoridagi karta raqamiga pul o'tkazing</li>
                    <li>2. To'lov skrinshotini oling</li>
                    <li>3. Skrinshotni quyida yuklang</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Screenshot Upload */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">To'lov skrinshotini yuklang</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isSubmitting}
                />
                <div
                  onClick={triggerFileInput}
                  className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center cursor-pointer transition-all duration-200 ${error
                    ? "border-red-500/50 bg-red-500/5"
                    : "border-gray-600 hover:border-purple-500/50 hover:bg-purple-500/5"
                    }`}
                >
                  {screenshotPreview ? (
                    <div className="space-y-3">
                      <div className="relative w-full max-h-32 sm:max-h-40 overflow-hidden rounded-lg">
                        <img
                          src={screenshotPreview || "/placeholder.svg"}
                          alt="To'lov skrinshotini"
                          className="max-w-full max-h-32 sm:max-h-40 object-contain mx-auto"
                        />
                      </div>
                      <div className="flex items-center justify-center text-green-400">
                        <Check className="w-4 h-4 mr-2" />
                        <span className="text-sm">Skrinshot yuklandi</span>
                      </div>
                      <button
                        type="button"
                        className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                        onClick={triggerFileInput}
                      >
                        Boshqa rasm yuklash
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-center">
                        <div className="p-3 bg-gray-700 rounded-full">
                          <Camera className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-300 font-medium text-sm sm:text-base">Skrinshot yuklash</p>
                        <p className="text-gray-500 text-xs sm:text-sm mt-1">JPG, PNG (max: 5MB)</p>
                      </div>
                    </div>
                  )}
                </div>
                {error && (
                  <div className="mt-3 flex items-center text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    {error}
                  </div>
                )}
              </div>

              {/* Action Buttons - Sticky at bottom */}
              <div className="flex space-x-3 pt-2">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
                  disabled={isSubmitting}
                >
                  Bekor qilish
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  disabled={isSubmitting || !screenshot}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>
                      Yuborilmoqda...
                    </div>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Yuborish
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  url: string
  title: string
}

export function ShareModal({ isOpen, onClose, url, title }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const [isBrowser, setIsBrowser] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  useEffect(() => {
    let loadingTimerId: NodeJS.Timeout | undefined = undefined;
    let copiedTimerId: NodeJS.Timeout | undefined = undefined;

    if (isBrowser && isOpen) {
      if (url && url.trim() !== "") {
        setIsLoading(true); 
        loadingTimerId = setTimeout(async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            copiedTimerId = setTimeout(() => {
              setCopied(false);
            }, 2000);
          } catch (error) {
            console.error("Failed to copy to clipboard automatically: ", error);
          } finally {
            setIsLoading(false); 
          }
        }, 1500);
      } else {
        setIsLoading(false); 
      }
    } else {
      setIsLoading(false); 
      if (!isOpen) {
        setCopied(false); 
      }
    }

    return () => {
      if (loadingTimerId) clearTimeout(loadingTimerId);
      if (copiedTimerId) clearTimeout(copiedTimerId);
    };
  }, [isOpen, url, isBrowser]);

  const safeWindowOpen = (url: string) => {
    if (isBrowser) {
      window.open(url, "_blank")
    }
  }

  const shareOnWhatsApp = () => {
    safeWindowOpen(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`)
  }

  const shareOnFacebook = () => {
    safeWindowOpen(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
  }

  const shareOnTwitter = () => {
    safeWindowOpen(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`)
  }

  const shareOnTelegram = () => {
    safeWindowOpen(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`)
  }

  const shareOnInstagram = () => {
    safeWindowOpen("https://www.instagram.com/")
  }

  const safeCopyToClipboard = () => {
    if (isBrowser) {
      try {
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error("Failed to copy: ", error)
      }
    }
  }

  if (!isBrowser || !document.body) {
    return null
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" // Full screen overlay, centering, and animation container
        >
          <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-md flex flex-col overflow-hidden">
            {/* Modal Content Below */}
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">Ulashish</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-300 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 animate-spin"></div>
                  </div>
                  <p className="text-lg text-gray-400">Havola tayyorlanmoqda...</p>
                </div>
              ) : (
                <div className="flex flex-col w-full">
                  <div className="flex mb-4 w-full">
                    <Input
                      type="text"
                      value={url}
                      readOnly
                      className="flex-1 bg-gray-800 border-gray-700 text-white focus:ring-purple-500 text-lg py-6"
                    />
                    <Button
                      onClick={safeCopyToClipboard}
                      className="ml-2 bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white h-auto px-4"
                    >
                      {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                    </Button>
                  </div>
                  {copied && <span className="text-sm text-green-500 mb-6">Havola nusxalandi!</span>}

                  <div className="grid grid-cols-5 gap-6 mt-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={shareOnWhatsApp}
                      className="flex flex-col items-center justify-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-3 text-white shadow-lg">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                          <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.18 2.095 3.195 5.076 4.483.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-300">WhatsApp</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={shareOnFacebook}
                      className="flex flex-col items-center justify-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-3 text-white shadow-lg">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-300">Facebook</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={shareOnTwitter}
                      className="flex flex-col items-center justify-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center mb-3 text-white shadow-lg">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 14-7.496 14-13.986 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-300">Twitter</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={shareOnTelegram}
                      className="flex flex-col items-center justify-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3 text-white shadow-lg">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-300">Telegram</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={shareOnInstagram}
                      className="flex flex-col items-center justify-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 flex items-center justify-center mb-3 text-white shadow-lg">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-300">Instagram</span>
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    , document.body)
}

export default ShareModal

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { loginUser, loginWithGoogle, loginWithFacebook } from "../services/auth"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const router = useRouter()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, rememberMe: e.target.checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await loginUser(formData.email, formData.password)

      if (result.success && result.user) {
        router.push("/")
      } else {
        setError(result.error || "Noto'g'ri ma'lumotlar kiritildi")
      }
    } catch (err) {
      setError("Noto'g'ri ma'lumotlar kiritildi")
    } finally {
      setIsLoading(false)
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#151329]">
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <motion.div initial="hidden" animate={hasMounted ? "visible" : "hidden"} variants={fadeIn}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 space-y-2 text-center">
                  <h1 className="text-2xl font-bold text-gray-800">Tizimga kirish</h1>
                  <p className="text-gray-500 text-sm">Taklifnomalar platformasidan foydalanish uchun tizimga kiring</p>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Email manzilingizni kiriting"
                          className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c44b9c] focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                          Parol
                        </label>
                        <Link
                          href="/forgot-password"
                          className="ml-auto inline-block text-sm text-[#c44b9c] hover:underline"
                        >
                          Parolni unutdingizmi?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          required
                          placeholder="Parolingizni kiriting"
                          className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c44b9c] focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-[#c44b9c] focus:ring-[#c44b9c] border-gray-300 rounded"
                      />
                      <label htmlFor="rememberMe" className="text-sm font-medium leading-none text-gray-700">
                        Meni eslab qolish
                      </label>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-sm flex items-center justify-center">
                        <span className="text-red-600">{error}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className={`w-full px-4 py-2 bg-[#c44b9c] text-white rounded-md hover:bg-[#a53a82] transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="mr-2">Kirish...</span>
                          <div className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </>
                      ) : (
                        "Kirish"
                      )}
                    </button>
                  </form>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">Yoki</span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <button
                        onClick={async (e) => {
                          e.preventDefault()
                          setIsLoading(true)
                          setError("")
                          try {
                            const result = await loginWithGoogle()
                            if (result.success && result.user) {
                              router.push("/")
                            } else {
                              setError(result.error || "Kirishda xatolik yuz berdi")
                            }
                          } catch (err) {
                            setError("Kirishda xatolik yuz berdi")
                          } finally {
                            setIsLoading(false)
                          }
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center"
                      >
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                          <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                        Google
                      </button>
                      <button
                        onClick={async (e) => {
                          e.preventDefault()
                          setIsLoading(true)
                          setError("")
                          try {
                            const result = await loginWithFacebook()
                            if (result.success && result.user) {
                              router.push("/")
                            } else {
                              setError(result.error || "Kirishda xatolik yuz berdi")
                            }
                          } catch (err) {
                            setError("Kirishda xatolik yuz berdi")
                          } finally {
                            setIsLoading(false)
                          }
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center"
                      >
                        <svg className="mr-2 h-4 w-4" fill="#1877F2" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                        Facebook
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-200 flex justify-center">
                  <p className="text-sm text-gray-600">
                    Hisobingiz yo'qmi?{" "}
                    <Link href="/register" className="text-[#c44b9c] font-medium hover:underline">
                      Ro'yxatdan o'tish
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

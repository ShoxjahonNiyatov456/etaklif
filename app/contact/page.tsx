"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import dynamic from 'next/dynamic'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])

  const DynamicContactFormSection = dynamic(() => import('@/components/contact/ContactFormSection'), {
    ssr: false,
  });
  const DynamicContactInfoSection = dynamic(() => import('@/components/contact/ContactInfoSection'), {
    ssr: false,
  });

  const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        message: "",
      })
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-600 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial="hidden"
          animate={hasMounted ? "visible" : "hidden"}
          variants={fadeIn()}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Biz bilan bog'laning
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {hasMounted && (
              <DynamicContactFormSection
                isSubmitted={isSubmitted}
                isSubmitting={isSubmitting}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            )}
            {hasMounted && <DynamicContactInfoSection />}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FormSection from "@/components/create/FormSection"
import TemplateSection from "@/components/create/TemplateSection"
import PreviewSection from "@/components/create/PreviewSection"
import PaymentSection from "@/components/create/PaymentSection"

export default function CreatePage() {
  const params = useParams()
  const router = useRouter()
  const { type } = params

  const [activeTab, setActiveTab] = useState("form")
  const [formCompleted, setFormCompleted] = useState(false)
  const [templateSelected, setTemplateSelected] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    date: "",
    time: "",
    location: "",
    additionalInfo: "",
    age: "",
    parents: "",
  })
  const [dateError, setDateError] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [day, setDay] = useState<string>("")
  const [month, setMonth] = useState<string>("")
  const [hours, setHours] = useState<string>("")
  const [minutes, setMinutes] = useState<string>("")

  const getTomorrowDate = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

  const validateDate = (dateStr: string): boolean => {
    if (!dateStr) return false

    const selectedDate = new Date(dateStr)
    const tomorrow = new Date(getTomorrowDate())

    tomorrow.setHours(0, 0, 0, 0)
    selectedDate.setHours(0, 0, 0, 0)

    return selectedDate >= tomorrow
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === "firstName" || name === "secondName" || name === "parents") {
      if (value.length > 20) {
        return
      }
    } else if (name === "age") {
      if (!/^\d{0,3}$/.test(value)) {
        return
      }
    } else if (name === "date") {
      if (value && !validateDate(value)) {
        setDateError("Sana ertangi kundan boshlab bo'lishi kerak")
      } else {
        setDateError(null)
      }
    } else if (name === "location" || name === "additionalInfo") {
      if (value.length > 30) {
        const limitedText = value.substring(0, 30)
        setFormData((prev) => ({ ...prev, [name]: limitedText }))
        return
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
    checkFormCompletion()
  }

  const checkFormCompletion = () => {
    let isComplete = false
    const isDateSelected = !!day && !!month
    const isTimeSelected = !!hours && !!minutes

    if (type === "wedding") {
      isComplete =
        !!formData.firstName && !!formData.secondName && isDateSelected && isTimeSelected && !!formData.location
    } else if (type === "birthday") {
      isComplete = !!formData.firstName && !!formData.age && isDateSelected && isTimeSelected && !!formData.location
    } else if (type === "funeral") {
      isComplete = !!formData.firstName && isDateSelected && isTimeSelected && !!formData.location
    } else if (type === "jubilee") {
      isComplete = !!formData.firstName && !!formData.age && isDateSelected && isTimeSelected && !!formData.location
    } else if (type === "engagement") {
      isComplete = !!formData.firstName && !!formData.parents && isDateSelected && isTimeSelected && !!formData.location
    }

    if (dateError && isComplete) {
      isComplete = false
    }

    if (isComplete !== formCompleted) {
      setFormCompleted(isComplete)
    }
  }

  useEffect(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setDay(tomorrow.getDate().toString())
    setMonth(tomorrow.getMonth().toString())
    setHours("12")
    setMinutes("00")
  }, [])

  useEffect(() => {
    const newFormData = { ...formData }
    let changed = false

    if (day && month) {
      const today = new Date()
      const year = today.getFullYear()
      const newDate = new Date(year, Number.parseInt(month), Number.parseInt(day))
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)

      if (newDate < tomorrow) {
        newDate.setFullYear(year + 1)
      }
      const formattedDate = newDate.toISOString().split("T")[0]
      newFormData.date = formattedDate
      setDateError(null)
      changed = true
    }

    if (hours && minutes) {
      const formattedTime = `${hours}:${minutes}`
      newFormData.time = formattedTime
      changed = true
    }

    if (changed) {
      setFormData(newFormData)
      setTimeout(() => {
        checkFormCompletion()
      }, 0)
    }
  }, [day, month, hours, minutes])

  useEffect(() => {
    if (formData.firstName || formData.location) {
      checkFormCompletion()
    }
  }, [formData, type])

  const getInvitationTypeName = () => {
    switch (type) {
      case "wedding":
        return "To'y"
      case "birthday":
        return "Tug'ilgan kun"
      case "funeral":
        return "El oshi"
      case "jubilee":
        return "Yubiley"
      case "engagement":
        return "Qiz uzatish"
      default:
        return "Taklifnoma"
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-24">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-600 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
            <h1 className="text-3xl font-bold text-center mt-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              {getInvitationTypeName()} taklifnomasi
            </h1>

            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center text-gray-400 hover:text-white hover:bg-gray-800/50"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Orqaga
            </Button>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border border-gray-700 p-1">
                <TabsTrigger
                  value="form"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-white"
                >
                  Ma'lumotlar
                </TabsTrigger>
                <TabsTrigger
                  value="templates"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-white"
                >
                  Shablonlar
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-white"
                >
                  Ko'rinish
                </TabsTrigger>
              </TabsList>

              <TabsContent value="form" className="mt-6">
                <FormSection
                  type={type as string}
                  formData={formData}
                  day={day}
                  month={month}
                  hours={hours}
                  minutes={minutes}
                  dateError={dateError}
                  onInputChange={handleInputChange}
                  onDayChange={setDay}
                  onMonthChange={setMonth}
                  onHoursChange={setHours}
                  onMinutesChange={setMinutes}
                />
                {formCompleted && (
                  <div className="mt-6 flex justify-end mb-8">
                    <Button
                      onClick={() => setActiveTab("templates")}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                    >
                      Keyingisi
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="templates" className="mt-6">
                <TemplateSection
                  type={type as string}
                  selectedTemplate={selectedTemplate}
                  uploadedImage={uploadedImage}
                  onTemplateSelect={(templateId) => {
                    setSelectedTemplate(templateId)
                    setTemplateSelected(true)
                  }}
                  onImageUpload={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = (e) => {
                        if (e.target?.result) {
                          setUploadedImage(e.target.result as string)
                        }
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  onClearUploadedImage={() => {
                    setUploadedImage(null)
                  }}
                />
                {templateSelected && (
                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={() => setActiveTab("preview")}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                    >
                      Keyingisi
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="preview" className="mt-6">
                <div className="space-y-6">
                  <PreviewSection
                    type={type as string}
                    selectedTemplate={selectedTemplate}
                    formData={formData}
                    uploadedImage={uploadedImage}
                  />
                  <PaymentSection
                    type={type as string}
                    selectedTemplate={selectedTemplate}
                    formData={formData}
                    uploadedImage={uploadedImage}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

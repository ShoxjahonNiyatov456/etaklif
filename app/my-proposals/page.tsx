"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, MapPin, Eye, Trash, ChevronRight, AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getInvitationsByUser } from "@/app/services/share"

type Invitation = {
  uniqueId: string
  type: string
  templateId: string
  invitationData: {
    firstName: string
    secondName?: string
    date: string
    time: string
    location: string
    additionalInfo?: string
    age?: string
    parents?: string
    uploadedImage?: string
  }
  createdAt: string
}

export default function MyProposalsPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [invitationToDelete, setInvitationToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const loadInvitations = async () => {
      try {
        setLoading(true)
        const myInvitations = await getInvitationsByUser()
        setInvitations(myInvitations)
      } catch (error) {
        console.error("Taklifnomalarni yuklashda xatolik:", error)
      } finally {
        setLoading(false)
      }
    }

    loadInvitations()
  }, [])

  const openDeleteModal = (uniqueId: string) => {
    setInvitationToDelete(uniqueId)
    setDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setTimeout(() => {
      setInvitationToDelete(null)
    }, 300) // Wait for animation to complete
  }

  const deleteInvitation = async () => {
    if (!invitationToDelete) return

    try {
      setIsDeleting(true)
      const response = await fetch(`/api/delete-invitation?uniqueId=${invitationToDelete}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Taklifnomani o'chirishda xatolik")
      }

      setInvitations((prevInvitations) => prevInvitations.filter((inv) => inv.uniqueId !== invitationToDelete))
      closeDeleteModal()
    } catch (error) {
      console.error("Taklifnomani o'chirishda xatolik:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const getInvitationTypeName = (type: string) => {
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

  const formatDate = (dateString: string) => {
    if (!dateString) return ""

    try {
      const months = [
        "Yanvar",
        "Fevral",
        "Mart",
        "Aprel",
        "May",
        "Iyun",
        "Iyul",
        "Avgust",
        "Sentyabr",
        "Oktyabr",
        "Noyabr",
        "Dekabr",
      ]

      const date = new Date(dateString)
      const day = date.getDate()
      const month = months[date.getMonth()]
      return `${day} ${month}`
    } catch (error) {
      return dateString
    }
  }

  return (
    <div className="pt-16 pb-24">
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Mening taklifnomalarim</h1>
          <p className="text-gray-600">
            Yaratilgan va sotib olingan taklifnomalaringizni shu yerda ko'rishingiz mumkin.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-primary-600 rounded-full border-t-transparent"></div>
          </div>
        ) : invitations.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {invitations.map((invitation) => (
              <motion.div
                key={invitation.uniqueId}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                        {getInvitationTypeName(invitation.type)}
                      </span>
                      <h3 className="text-xl font-semibold mb-1">
                        {invitation.invitationData.firstName}
                        {invitation.invitationData.secondName && ` & ${invitation.invitationData.secondName}`}
                        {invitation.invitationData.age && `, ${invitation.invitationData.age} yosh`}
                      </h3>
                    </div>
                    <button
                      onClick={() => openDeleteModal(invitation.uniqueId)}
                      type="button"
                      className="text-gray-400 hover:text-red-500 p-1 transition-colors duration-200"
                      title="O'chirish"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{formatDate(invitation.invitationData.date)}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{invitation.invitationData.time}</span>
                    </div>

                    <div className="flex items-start text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                      <span className="text-sm line-clamp-1">{invitation.invitationData.location}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Link
                      href={`/invitation/${invitation.type}/${invitation.templateId}/${invitation.uniqueId}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-800"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">Ko'rish</span>
                    </Link>

                    <span className="text-xs text-gray-500">
                      {new Date(invitation.createdAt).toLocaleDateString("uz-UZ")}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <div className="text-5xl mb-4 text-gray-300">📭</div>
            <h3 className="text-xl font-semibold mb-2">Taklifnomalar topilmadi</h3>
            <p className="text-gray-600 mb-6">
              Hozircha hech qanday taklifnoma yaratilmagan. Yangi taklifnoma yaratish uchun quyidagi tugmani bosing.
            </p>
            <Link href="/select-type">
              <Button className="flex items-center gap-2">
                Taklifnoma yaratish
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
      <AnimatePresence>
        {deleteModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={closeDeleteModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed flex items-center justify-center z-50 w-full px-4 sm:px-0 top-72"
              style={{ margin: 0 }}
            >
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="relative p-6">
                  <button
                    onClick={closeDeleteModal}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Taklifnomani o'chirish</h3>
                    <p className="text-gray-600">
                      Ushbu taklifnomani o'chirishni xohlaysizmi? Bu amalni qaytarib bo'lmaydi.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button variant="outline" className="flex-1 py-2.5" onClick={closeDeleteModal}>
                      Bekor qilish
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1 py-2.5 bg-red-500 hover:bg-red-600"
                      onClick={deleteInvitation}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          O'chirilmoqda...
                        </div>
                      ) : (
                        "O'chirish"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

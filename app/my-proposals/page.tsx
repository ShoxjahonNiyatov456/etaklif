"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Eye,
  Trash,
  ChevronRight,
  AlertTriangle,
  X,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getInvitationsByUser } from "@/app/services/share";

type Invitation = {
  uniqueId: string;
  type: string;
  templateId: string;
  invitationData: {
    firstName: string;
    secondName?: string;
    date: string;
    time: string;
    location: string;
    additionalInfo?: string;
    age?: string;
    parents?: string;
    uploadedImage?: string;
  };
  createdAt: string;
};

export default function MyProposalsPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [invitationToDelete, setInvitationToDelete] = useState<string | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    // Agar localStorage yoki sessionStorage'da taklifnomalar saqlangan bo'lsa, ularni o'chirib tashlaymiz
    if (typeof window !== 'undefined') {
      // LocalStorage'dan taklifnomalar bilan bog'liq ma'lumotlarni o'chirish
      const localStorageKeys = Object.keys(localStorage);
      localStorageKeys.forEach(key => {
        if (key.includes('invitation') || key.includes('proposal') || key.includes('template')) {
          localStorage.removeItem(key);
        }
      });

      // SessionStorage'dan taklifnomalar bilan bog'liq ma'lumotlarni o'chirish
      const sessionStorageKeys = Object.keys(sessionStorage);
      sessionStorageKeys.forEach(key => {
        if (key.includes('invitation') || key.includes('proposal') || key.includes('template')) {
          sessionStorage.removeItem(key);
        }
      });
    }
  }, []);

  useEffect(() => {
    const loadInvitations = async () => {
      try {
        setLoading(true);
        const myInvitations = await getInvitationsByUser();
        setInvitations(myInvitations);
      } catch (error) {
        console.error("Taklifnomalarni yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInvitations();
  }, []);

  const openDeleteModal = (uniqueId: string) => {
    setInvitationToDelete(uniqueId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setTimeout(() => {
      setInvitationToDelete(null);
    }, 300);
  };

  const deleteInvitation = async () => {
    if (!invitationToDelete) return;

    try {
      setIsDeleting(true);
      const response = await fetch(
        `/api/delete-invitation?uniqueId=${invitationToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Taklifnomani o'chirishda xatolik");
      }

      setInvitations((prevInvitations) =>
        prevInvitations.filter((inv) => inv.uniqueId !== invitationToDelete)
      );
      closeDeleteModal();
    } catch (error) {
      console.error("Taklifnomani o'chirishda xatolik:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getInvitationTypeName = (type: string) => {
    switch (type) {
      case "wedding":
        return "To'y";
      case "birthday":
        return "Tug'ilgan kun";
      case "funeral":
        return "El oshi";
      case "jubilee":
        return "Yubiley";
      case "engagement":
        return "Qiz uzatish";
      default:
        return "Taklifnoma";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";

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
      ];

      const date = new Date(dateString);
      const day = date.getDate();
      const month = months[date.getMonth()];
      return `${day} ${month}`;
    } catch (error) {
      return dateString;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "wedding":
        return "from-purple-500 to-pink-500";
      case "birthday":
        return "from-blue-500 to-cyan-500";
      case "funeral":
        return "from-gray-500 to-slate-500";
      case "jubilee":
        return "from-amber-500 to-yellow-500";
      case "engagement":
        return "from-rose-500 to-red-500";
      default:
        return "from-purple-500 to-pink-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-24">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-600 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial="hidden"
          animate={hasMounted ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Mening taklifnomalarim
          </h1>
          <p className="text-gray-400">
            Yaratilgan va sotib olingan taklifnomalaringizni shu yerda
            ko'rishingiz mumkin.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 animate-spin"></div>
            </div>
          </div>
        ) : invitations.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {invitations.map((invitation, index) => (
              <motion.div
                key={invitation.uniqueId}
                initial="hidden"
                animate={hasMounted ? "visible" : "hidden"}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.4, delay: index * 0.1 },
                  },
                }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span
                        className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-2 bg-gradient-to-r ${getTypeColor(
                          invitation.type
                        )} text-white`}
                      >
                        {getInvitationTypeName(invitation.type)}
                      </span>
                      <h3 className="text-xl font-semibold mb-1 text-white">
                        {invitation.invitationData.firstName}
                        {invitation.invitationData.secondName &&
                          ` & ${invitation.invitationData.secondName}`}
                        {invitation.invitationData.age &&
                          `, ${invitation.invitationData.age} yosh`}
                      </h3>
                    </div>
                    <button
                      onClick={() => openDeleteModal(invitation.uniqueId)}
                      type="button"
                      className="text-gray-400 hover:text-red-400 p-1 transition-colors duration-200"
                      title="O'chirish"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div className="flex items-center text-gray-400">
                      <div className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center mr-3">
                        <Calendar className="h-4 w-4 text-purple-400" />
                      </div>
                      <span className="text-sm">
                        {formatDate(invitation.invitationData.date)}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-400">
                      <div className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center mr-3">
                        <Clock className="h-4 w-4 text-purple-400" />
                      </div>
                      <span className="text-sm">
                        {invitation.invitationData.time}
                      </span>
                    </div>

                    <div className="flex items-start text-gray-400">
                      <div className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center mr-3 mt-0.5">
                        <MapPin className="h-4 w-4 text-purple-400" />
                      </div>
                      <span className="text-sm line-clamp-1">
                        {invitation.invitationData.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Link
                      href={`/invitation/${invitation.type}/${invitation.templateId}/${invitation.uniqueId}`}
                      className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">Ko'rish</span>
                    </Link>

                    <span className="text-xs text-gray-500">
                      {new Date(invitation.createdAt).toLocaleDateString(
                        "uz-UZ"
                      )}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate={hasMounted ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-10 text-center"
          >
            <div className="w-20 h-20 mx-auto bg-gray-700/50 rounded-full flex items-center justify-center mb-6">
              <Plus className="h-10 w-10 text-purple-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-white">
              Taklifnomalar topilmadi
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Hozircha hech qanday taklifnoma yaratilmagan. Yangi taklifnoma
              yaratish uchun quyidagi tugmani bosing.
            </p>
            <Link href="/select-type">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full px-8 py-6 text-lg">
                Taklifnoma yaratish
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
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
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
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
              <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-800 max-w-md w-full">
                <div className="relative p-6">
                  <button
                    onClick={closeDeleteModal}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                      <AlertTriangle className="h-8 w-8 text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Taklifnomani o'chirish
                    </h3>
                    <p className="text-gray-400">
                      Ushbu taklifnomani o'chirishni xohlaysizmi? Bu amalni
                      qaytarib bo'lmaydi.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button
                      variant="outline"
                      className="flex-1 py-2.5 border-gray-700 text-black hover:bg-gray-800 hover:text-white"
                      onClick={closeDeleteModal}
                    >
                      Bekor qilish
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white border-0"
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
  );
}

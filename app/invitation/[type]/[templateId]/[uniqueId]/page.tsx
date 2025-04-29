"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  Home,
  Phone,
  Mail,
  AlertCircle,
  Instagram,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import WeddingTemplate from "@/components/invitation-templates/WeddingTemplate";
import BirthdayTemplate from "@/components/invitation-templates/BirthdayTemplate";
import FuneralTemplate from "@/components/invitation-templates/FuneralTemplate";
import JubileeTemplate from "@/components/invitation-templates/JubileeTemplate";
import EngagementTemplate from "@/components/invitation-templates/EngagementTemplate";
import {
  getInvitationDataFromLink,
  getInvitationByUniqueId,
} from "@/app/services/share";
import Link from "next/link";
interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupportModal = ({ isOpen, onClose }: SupportModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Texnik yordam</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-primary-600 mr-2" />
            <a
              href="tel:+998955571302"
              className="text-gray-700 hover:text-primary-600"
            >
              +998 95 557 13 02
            </a>
          </div>

          <div className="flex items-center">
            <img src="/telegram.svg" alt="Telegram" className="h-5 w-5 mr-2" />
            <a
              href="https://t.me/taklifnoma"
              className="text-gray-700 hover:text-primary-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              @taklifnoma
            </a>
          </div>

          <div className="flex items-center">
            <Instagram className="h-5 w-5 text-primary-600 mr-2" />
            <a
              href="https://instagram.com/taklifnoma.uz"
              className="text-gray-700 hover:text-primary-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              @taklifnoma.uz
            </a>
          </div>

          <div className="flex items-center">
            <Mail className="h-5 w-5 text-primary-600 mr-2" />
            <a
              href="mailto:info@taklifnoma.uz"
              className="text-gray-700 hover:text-primary-600"
            >
              info@taklifnoma.uz
            </a>
          </div>

          <div className="border-t pt-3 mt-3">
            <div className="flex items-start">
              <ExternalLink className="h-5 w-5 text-primary-600 mr-2 mt-0.5" />
              <p className="text-gray-700">
                Jizzax shahri, Sharof Rashidov tumani
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function InvitationPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { type, templateId, uniqueId } = params;

  const [invitationData, setInvitationData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        try {
          const dataFromUrl = getInvitationDataFromLink(
            searchParams.toString()
          );
          if (dataFromUrl) {
            setInvitationData(dataFromUrl);
            setLoading(false);
            return;
          }
        } catch (urlError) {
          console.error(
            "URL parametrlaridan ma'lumotlarni olishda xatolik:",
            urlError
          );
        }
        if (uniqueId) {
          try {
            const dataFromStorage = await getInvitationByUniqueId(
              uniqueId as string
            );
            if (dataFromStorage) {
              setInvitationData(dataFromStorage);
              setLoading(false);
              return;
            }
          } catch (storageError) {
            console.error(
              "Ma'lumotlar omboridan ma'lumotlarni olishda xatolik:",
              storageError
            );
          }
        }
        setError("Taklifnoma ma'lumotlari topilmadi");
        setLoading(false);
      } catch (error) {
        console.error("Taklifnoma ma'lumotlarini olishda xatolik:", error);
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams, uniqueId]);

  const openSupportModal = () => {
    setIsSupportModalOpen(true);
  };

  const closeSupportModal = () => {
    setIsSupportModalOpen(false);
  };

  const renderTemplate = () => {
    if (!invitationData) return <div>Taklifnoma ma'lumotlari topilmadi</div>;

    switch (type) {
      case "wedding":
        return (
          <WeddingTemplate
            style={templateId as string}
            firstName={invitationData.firstName}
            secondName={invitationData.secondName}
            date={invitationData.date}
            time={invitationData.time}
            location={invitationData.location}
            additionalInfo={invitationData.additionalInfo}
          />
        );
      case "birthday":
        return (
          <BirthdayTemplate
            style={templateId as string}
            firstName={invitationData.firstName}
            age={invitationData.age}
            date={invitationData.date}
            time={invitationData.time}
            location={invitationData.location}
            additionalInfo={invitationData.additionalInfo}
            uploadedImage={invitationData.uploadedImage}
          />
        );
      case "funeral":
        return (
          <FuneralTemplate
            style={templateId as string}
            firstName={invitationData.firstName}
            date={invitationData.date}
            time={invitationData.time}
            location={invitationData.location}
            additionalInfo={invitationData.additionalInfo}
            uploadedImage={invitationData.uploadedImage}
          />
        );
      case "jubilee":
        return (
          <JubileeTemplate
            style={templateId as string}
            firstName={invitationData.firstName}
            celebrationType={invitationData.age}
            date={invitationData.date}
            time={invitationData.time}
            location={invitationData.location}
            additionalInfo={invitationData.additionalInfo}
            uploadedImage={invitationData.uploadedImage}
          />
        );
      case "engagement":
        return (
          <EngagementTemplate
            style={templateId as string}
            firstName={invitationData.firstName}
            parents={invitationData.parents}
            date={invitationData.date}
            time={invitationData.time}
            location={invitationData.location}
            additionalInfo={invitationData.additionalInfo}
            uploadedImage={invitationData.uploadedImage}
          />
        );
      default:
        return <div>Shablon topilmadi</div>;
    }
  };


  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary-600 rounded-full border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">
            Taklifnoma ma'lumotlari yuklanmoqda...
          </p>
        </div>
      </div>
    );
  }

  if (error || !invitationData) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-2">Taklifnoma topilmadi</h2>
          <p className="text-gray-600 mb-6">
            Kechirasiz, so'ralgan taklifnoma ma'lumotlari topilmadi yoki muddati
            tugagan bo'lishi mumkin.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/">
              <Button className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Bosh sahifa
              </Button>
            </Link>
            <Button
              onClick={openSupportModal}
              variant="outline"
              className="flex items-center gap-2"
            >
              <AlertCircle className="h-4 w-4" />
              Texnik yordam
            </Button>
          </div>
        </div>
        <SupportModal isOpen={isSupportModalOpen} onClose={closeSupportModal} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        {renderTemplate()}
      </div>
    </div>
  );
}

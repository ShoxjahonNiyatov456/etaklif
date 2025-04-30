"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Home } from "lucide-react";
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

export default function InvitationPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { type, templateId, uniqueId } = params;

  useEffect(() => {
    document.body.style.backgroundColor = "white";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const [invitationData, setInvitationData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      <div className="min-h-screen flex items-center justify-center">
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
      <div className="min-h-screen flex items-center justify-center">
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
          </div>
        </div>
      </div>
    );
  }
  return renderTemplate();
}

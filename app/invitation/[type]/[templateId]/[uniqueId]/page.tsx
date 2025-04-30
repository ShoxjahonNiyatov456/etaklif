"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import type { Metadata, ResolvingMetadata } from 'next';
import {
  Home,
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

// Generate metadata for the page
export async function generateMetadata(
  { params }: { params: { type: string; templateId: string; uniqueId: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { type, uniqueId } = params;
  let invitationData: any = null;
  try {
    invitationData = await getInvitationByUniqueId(uniqueId as string);
  } catch (error) {
    console.error("Metadata uchun ma'lumot olishda xatolik:", error);
  }

  if (!invitationData) {
    return {
      title: "Taklifnoma",
      description: "Taklifnomani ko'rish uchun havolani oching.",
      openGraph: {
        title: "Taklifnoma",
        description: "Taklifnomani ko'rish uchun havolani oching.",
        images: [
          {
            url: '/placeholder.svg',
            width: 800,
            height: 600,
            alt: 'Taklifnoma',
          },
        ],
        type: 'website',
      },
    };
  }

  let title = "Taklifnoma";
  let description = "";

  const eventType = type === 'wedding' ? "To'y"
    : type === 'birthday' ? "Tug'ilgan kun"
      : type === 'funeral' ? "El oshi"
        : type === 'jubilee' ? "Yubiley"
          : type === 'engagement' ? "Qiz uzatish"
            : "Tadbir";

  title = `${eventType} taklifnomasi`;

  if (type === "wedding") {
    description = `${invitationData.firstName} va ${invitationData.secondName}ning nikoh to'yiga taklifnoma.`;
  } else if (type === "birthday") {
    description = `${invitationData.firstName}ning ${invitationData.age} yoshga to'lish munosabati bilan o'tkaziladigan tug'ilgan kuniga taklifnoma.`;
  } else if (type === "funeral") {
    description = `${invitationData.firstName}ning el oshiga taklifnoma.`;
  } else if (type === "jubilee") {
    description = `${invitationData.firstName}ning ${invitationData.age} yosh yubileyiga taklifnoma.`;
  } else if (type === "engagement") {
    description = `${invitationData.firstName}ning qiz uzatish marosimiga taklifnoma.`;
  } else {
    description = `${invitationData.firstName}ning tadbiriga taklifnoma.`;
  }
  description += ` Vaqt: ${invitationData.date}, ${invitationData.time}. Manzil: ${invitationData.location}.`;
  
  // Rasm URL-i (yuklab olingan rasm yoki placeholder)
  const imageUrl = invitationData.uploadedImage || '/placeholder.svg';
  
  // Full websitesda to'g'ri URL generatsiya qilish
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://taklifnoma.uz';
  const fullUrl = `${baseUrl}/invitation/${type}/${params.templateId}/${uniqueId}`;
  const fullImageUrl = `${baseUrl}/invitation/${type}/${params.templateId}/${uniqueId}/opengraph-image`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
      url: fullUrl,
      siteName: 'taklifnoma.uz',
      locale: 'uz-UZ',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [fullImageUrl],
      creator: '@taklifnoma_uz',
      site: '@taklifnoma_uz',
    },
    other: {
      // Telegram Meta tags
      'telegram:card': 'summary_large_image',
      'telegram:site': '@taklifnoma_uz',
      'telegram:title': title,
      'telegram:description': description,
      'telegram:image': fullImageUrl,
      'telegram:creator': '@taklifnoma_uz',
      // Facebook va boshqa tarmoqlar uchun
      'og:url': fullUrl,
      'og:title': title,
      'og:description': description,
      'og:image': fullImageUrl,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': title,
      'og:site_name': 'taklifnoma.uz',
      'og:locale': 'uz_UZ',
      'og:type': 'website',
    }
  };
}

export default function InvitationPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { type, templateId, uniqueId } = params;

  useEffect(() => {
    document.body.style.backgroundColor = 'white';
    return () => {
      document.body.style.backgroundColor = '';
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

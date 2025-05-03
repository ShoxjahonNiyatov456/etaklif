"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { getInvitationByUniqueId, getInvitationDataFromLink } from "@/app/services/share";
import WeddingTemplate from "@/components/invitation-templates/WeddingTemplate";
import BirthdayTemplate from "@/components/invitation-templates/BirthdayTemplate";
import FuneralTemplate from "@/components/invitation-templates/FuneralTemplate";
import JubileeTemplate from "@/components/invitation-templates/JubileeTemplate";
import EngagementTemplate from "@/components/invitation-templates/EngagementTemplate";
import { Metadata } from 'next';

type Props = {
  params: { type: string; templateId: string; uniqueId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const uniqueId = params.uniqueId;
  const type = params.type;

  try {
    const invitationData = await getInvitationByUniqueId(uniqueId as string);

    if (!invitationData) {
      return {
        title: 'Taklifnoma topilmadi',
        description: 'Ushbu havola orqali taklifnoma mavjud emas.',
        openGraph: {
          title: 'Taklifnoma topilmadi',
          description: 'Ushbu havola orqali taklifnoma mavjud emas.',
          images: [
            {
              url: '/default-og-image.png', // Loyihadagi standart rasmga yo'l
              width: 1200,
              height: 630,
              alt: 'Taklifnoma',
            },
          ],
          type: 'website',
        },
      };
    }
    const firstName = invitationData.firstName || '';
    const secondName = invitationData.secondName || '';
    const age = invitationData.age || '';
    const date = invitationData.date || "noma'lum sana";
    const time = invitationData.time || "noma'lum vaqt";
    const location = invitationData.location || "noma'lum manzil";
    let title = "To'yga taklifnoma"; // Asosiy sarlavha
    let description = '';

    switch (type) {
      case 'wedding':
        description = `${firstName} va ${secondName}ning nikoh to'yiga taklifnoma. To'y ${date} kuni, soat ${time}da ${location} manzilida bo'lib o'tadi.`;
        break;
      case 'birthday':
        title = `${firstName}ning tug'ilgan kuniga taklifnoma`;
        description = `${firstName}ning ${age} yoshga to'lish munosabati bilan ${date} kuni, soat ${time}da ${location} manzilida bo'lib o'tadigan bayramga taklif etamiz.`;
        break;
      case 'funeral':
        title = `El oshi`;
        description = `${firstName} xotirasiga bag'ishlangan el oshi ${date} kuni, soat ${time}da ${location} manzilida bo'lib o'tadi.`;
        break;
      case 'jubilee':
        title = `${firstName}ning yubileyiga taklifnoma`;
        description = `${firstName}ning ${age} yillik yubileyi ${date} kuni, soat ${time}da ${location} manzilida nishonlanadi.`;
        break;
      case 'engagement':
        title = `Fotiha to'yiga taklifnoma`;
        description = `${firstName}ning fotiha to'yi ${date} kuni, soat ${time}da ${location} manzilida bo'lib o'tadi.`;
        break;
      default:
        description = `${firstName}ning tadbiriga taklifnoma. Tadbir ${date} kuni, soat ${time}da ${location} manzilida bo'lib o'tadi.`;
    }

    // Rasm URL manzilini olish (absolyut URL bo'lishi kerak)
    // Agar `invitationData.uploadedImage` nisbiy yo'l bo'lsa, uni to'liq URLga aylantirish kerak.
    // Misol uchun, agar base URL `process.env.NEXT_PUBLIC_BASE_URL` da saqlansa:
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''; // .env faylidan oling
    const imageUrl = invitationData.uploadedImage
      ? invitationData.uploadedImage.startsWith('http')
        ? invitationData.uploadedImage
        : `${baseUrl}${invitationData.uploadedImage}`
      : `${baseUrl}/default-og-image.png`; // Standart rasm

    return {
      title: title,
      description: description,
      openGraph: {
        title: title,
        description: description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        type: 'website',
        url: `${baseUrl}/invitation/${type}/${params.templateId}/${uniqueId}`, // Joriy sahifa URL manzili
        siteName: 'Taklifnoma.uz',
        locale: 'uz_UZ',
      },
      // Twitter uchun ham qo'shish mumkin
      twitter: {
        card: 'summary_large_image',
        title: title,
        description: description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Metadata yaratishda xatolik:', error);
    return {
      title: 'Xatolik', // Xatolik holati uchun sarlavha
      description: "Taklifnoma ma'lumotlarini yuklashda xatolik yuz berdi.",
      openGraph: {
        title: 'Xatolik',
        description: "Taklifnoma ma'lumotlarini yuklashda xatolik yuz berdi.",
        images: [
          {
            url: '/default-og-image.png',
            width: 1200,
            height: 630,
            alt: 'Xatolik',
          },
        ],
        type: 'website',
      },
    };
  }
}

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
        // Try fetching from URL first (if applicable)
        try {
          const dataFromUrl = await getInvitationDataFromLink(
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

        // Fetch from storage if URL fetch fails or is not applicable
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

        // If neither method works, set error
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

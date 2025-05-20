"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import WeddingTemplate from "@/components/invitation-templates/WeddingTemplate";
import BirthdayTemplate from "@/components/invitation-templates/BirthdayTemplate";
import FuneralTemplate from "@/components/invitation-templates/FuneralTemplate";
import JubileeTemplate from "@/components/invitation-templates/JubileeTemplate";
import EngagementTemplate from "@/components/invitation-templates/EngagementTemplate";
import { getCachedInvitation } from "@/app/services/cache";

interface InvitationClientComponentProps {
  type: string;
  templateId: string;
  uniqueId: string;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function InvitationClientComponent({
  type,
  templateId,
  uniqueId,
}: InvitationClientComponentProps) {
  const [invitationData, setInvitationData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [ogTitle, setOgTitle] = useState<string>("");
  const [ogDescription, setOgDescription] = useState<string>("");
  const siteUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://etaklif.vercel.app";
  const updateMetaData = (rawData: any) => {
    const data = rawData.invitationData || rawData;
    const firstName = data.firstName || "";
    const secondName = data.secondName || "";
    const location = data.location || "";
    const date = data.date || "";
    const time = data.time || "";
    let dynamicEventTitle = "";
    switch (type) {
      case "wedding":
        dynamicEventTitle = "Nikoh to'yi";
        break;
      case "birthday":
        dynamicEventTitle = "Tug'ilgan kun";
        break;
      case "funeral":
        dynamicEventTitle = "Ma'raka";
        break;
      case "jubilee":
        dynamicEventTitle = "Yubiley";
        break;
      case "engagement":
        dynamicEventTitle = "Unashtiruv";
        break;
      default:
        dynamicEventTitle = "Marosim";
    }
    setOgTitle(`${dynamicEventTitle} taklifnomasi`);
    let tadbir = "";
    if (firstName && secondName) {
      tadbir = `${firstName} va ${secondName}ning ${dynamicEventTitle.toLowerCase()}`;
    } else if (firstName) {
      tadbir = `${firstName}ning ${dynamicEventTitle.toLowerCase()}`;
    } else {
      tadbir = dynamicEventTitle.toLowerCase();
    }
    let desc = `📌 ${tadbir.toUpperCase()}GA TAKLIFNOMA 📌\n\n`;
    if (location) {
      desc += `📍 MANZIL: ${location}\n`;
    }

    if (date) {
      desc += `📅 SANA: ${date}\n`;
    }

    if (time) {
      desc += `⏰ VAQT: ${time}`;
    }

    setOgDescription(desc);
  };

  const [retryCount, setRetryCount] = useState<number>(0);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 2000;

  useEffect(() => {
    let isMounted = true;
    let retryTimeout: NodeJS.Timeout;
    async function loadInvitationData() {
      if (!uniqueId || !type) {
        setError("Taklifnoma IDsi yoki turi ko'rsatilmagan yoki yaroqsiz.");
        setInvitationData(null);
        setLoading(false);
        return;
      }
      if (!isMounted) return;
      if (invitationData && !isRetrying && Object.keys(invitationData).length > 0) {
        console.log('[InvitationClientComponent] Ma\'lumotlar allaqachon yuklangan, qayta so\'rov yuborilmaydi');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await getCachedInvitation(uniqueId);
        if (!isMounted) return;
        if (!data) {
          if (retryCount < MAX_RETRIES) {
            setRetryCount(prev => prev + 1);
            setIsRetrying(true);
            retryTimeout = setTimeout(() => {
              if (isMounted) {
                setIsRetrying(false);
                loadInvitationData();
              }
            }, RETRY_DELAY);
          } else {
            setError("Taklifnoma ma'lumotlari topilmadi. Iltimos, internet aloqangizni tekshiring.");
            setInvitationData(null);
            setIsRetrying(false);
          }
        } else {
          setRetryCount(0);
          setIsRetrying(false);
          setInvitationData((prevData: any) => {
            if (!prevData || JSON.stringify(prevData) !== JSON.stringify(data)) {
              updateMetaData(data);
              return data;
            }
            return prevData;
          });
        }
      } catch (error: any) {
        if (!isMounted) return;
        console.error("Ma'lumotlarni yuklashda xatolik:", error);
        if (retryCount < MAX_RETRIES) {
          setRetryCount(prev => prev + 1);
          setIsRetrying(true);
          retryTimeout = setTimeout(() => {
            if (isMounted) {
              setIsRetrying(false);
              loadInvitationData();
            }
          }, RETRY_DELAY);
        } else {
          setError("Internet aloqasida muammo. Iltimos, internet aloqangizni tekshiring va sahifani yangilang.");
          setInvitationData(null);
          setIsRetrying(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadInvitationData();
    return () => {
      isMounted = false;
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
    };
  }, [uniqueId, type]);

  const renderTemplate = () => {
    if (loading && !invitationData) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-center text-lg font-medium">
            {isRetrying ? `Taklifnoma ma'lumotlari yuklanmoqda... (${retryCount}/${MAX_RETRIES} urinish)` : "Taklifnoma ma'lumotlari yuklanmoqda..."}
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md max-w-md">
            <p className="font-bold mb-2">Xatolik yuz berdi</p>
            <p>{error}</p>
            {retryCount >= MAX_RETRIES && (
              <button
                onClick={() => {
                  setRetryCount(0);
                  setIsRetrying(false);
                  setError(null);
                  setLoading(true);
                }}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >
                Qayta urinib ko'rish
              </button>
            )}
          </div>
        </div>
      );
    }

    if (!invitationData) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
          <p className="text-lg font-medium">Taklifnoma ma'lumotlari topilmadi</p>
        </div>
      );
    }
    const templateType = invitationData.type || type;
    const currentTemplateId = invitationData.templateId || templateId;
    const actualInvitationData =
      invitationData.invitationData || invitationData;
    if (!templateType || !currentTemplateId || !actualInvitationData) {
      return (
        <p>Taklifnoma turi, shablon ID yoki asosiy ma'lumotlar topilmadi.</p>
      );
    }
    switch (templateType) {
      case "wedding":
        return (
          <WeddingTemplate
            style={currentTemplateId}
            firstName={actualInvitationData.firstName}
            secondName={actualInvitationData.secondName}
            date={actualInvitationData.date}
            time={actualInvitationData.time}
            location={actualInvitationData.location}
            additionalInfo={actualInvitationData.additionalInfo}
          />
        );
      case "birthday":
        return (
          <BirthdayTemplate
            style={currentTemplateId}
            firstName={actualInvitationData.firstName || ''}
            date={actualInvitationData.date || ''}
            age={actualInvitationData.age || ''}
            time={actualInvitationData.time || ''}
            location={actualInvitationData.location || ''}
            additionalInfo={actualInvitationData.additionalInfo || ''}
          />
        );
      case "funeral":
        return (
          <FuneralTemplate
            style={currentTemplateId}
            firstName={actualInvitationData.firstName}
            date={actualInvitationData.date}
            time={actualInvitationData.time}
            location={actualInvitationData.location}
            additionalInfo={actualInvitationData.additionalInfo}
          />
        );
      case "jubilee":
        return (
          <JubileeTemplate
            style={currentTemplateId}
            firstName={actualInvitationData.firstName}
            age={actualInvitationData.age || ""}
            date={actualInvitationData.date}
            time={actualInvitationData.time}
            location={actualInvitationData.location}
            additionalInfo={actualInvitationData.additionalInfo}
          />
        );
      case "engagement":
        return (
          <EngagementTemplate
            style={currentTemplateId}
            firstName={actualInvitationData.firstName}
            parents={actualInvitationData.parents}
            date={actualInvitationData.date}
            time={actualInvitationData.time}
            location={actualInvitationData.location}
            additionalInfo={actualInvitationData.additionalInfo}
          />
        );
      default:
        return <p>Noma'lum taklifnoma turi</p>;
    }
  };
  const imageUrl = `${siteUrl}/invitation/${type}/${templateId}/${uniqueId}/opengraph-image.png`;
  return (
    <>
      <Head>
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta
          property="og:url"
          content={`${siteUrl}/invitation/${type}/${templateId}/${uniqueId}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:image" content={imageUrl} />
        <meta property="telegram:card" content="summary_large_image" />
        <meta property="telegram:title" content={ogTitle} />
        <meta property="telegram:description" content={ogDescription} />
        <meta property="telegram:image" content={imageUrl} />
      </Head>
      <div>{renderTemplate()}</div>
    </>
  );
}

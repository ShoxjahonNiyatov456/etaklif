"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import {
  getInvitationByUniqueId,
  getInvitationDataFromLink,
} from "@/app/services/share";
import WeddingTemplate from "@/components/invitation-templates/WeddingTemplate";
import BirthdayTemplate from "@/components/invitation-templates/BirthdayTemplate";
import FuneralTemplate from "@/components/invitation-templates/FuneralTemplate";
import JubileeTemplate from "@/components/invitation-templates/JubileeTemplate";
import EngagementTemplate from "@/components/invitation-templates/EngagementTemplate";

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
  searchParams,
}: InvitationClientComponentProps) {
  const [invitationData, setInvitationData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [ogTitle, setOgTitle] = useState<string>("");
  const [ogDescription, setOgDescription] = useState<string>("");
  const siteUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://etaklif.vercel.app";

  useEffect(() => {
  }, [uniqueId, searchParams, type]);
  const updateMetaData = (data: any) => {
    const firstName = data.firstName || data.invitationData?.firstName || "";
    const secondName = data.secondName || data.invitationData?.secondName || "";
    const location = data.location || data.invitationData?.location || "";
    const date = data.date || data.invitationData?.date || "";
    const time = data.time || data.invitationData?.time || "";
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

  useEffect(() => {
    async function loadInvitationData() {
      if (!uniqueId && (!searchParams || Object.keys(searchParams).length === 0)) {
        setError("Taklifnoma uchun ID yoki parametrlar mavjud emas.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        let data;
        if (uniqueId) {
          data = await getInvitationByUniqueId(uniqueId);
        } else if (searchParams && Object.keys(searchParams).length > 0) {
          const queryString = Object.entries(searchParams)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");
          data = getInvitationDataFromLink(queryString); 
        }

        if (!data) {
          throw new Error("Taklifnoma ma'lumotlari topilmadi.");
        }

        setInvitationData(data);
        updateMetaData(data);
      } catch (error: any) {
        console.error("Taklifnoma ma'lumotlarini olishda xatolik:", error);
        setError(error.message || "Noma'lum xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    }

    loadInvitationData();
  }, [uniqueId, searchParams, type, invitationData]);
  const renderTemplate = () => {
    if (loading) {
      return <p>Yuklanmoqda...</p>;
    }

    if (error) {
      return <p>Xatolik: {error}</p>;
    }

    if (!invitationData) {
      return <p>Taklifnoma ma'lumotlari topilmadi</p>;
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

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { getInvitationByUniqueId, getInvitationDataFromLink } from "@/app/services/share";
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
    const [ogTitle, setOgTitle] = useState<string>("Taklifnoma");
    const [ogDescription, setOgDescription] = useState<string>("Taklifnoma.uz - Zamonaviy taklifnomalar platformasi");
    const siteUrl = process.env.NEXT_PUBLIC_API_URL || "https://etaklif.vercel.app";

    useEffect(() => {
        async function loadInvitationData() {
            try {
                setLoading(true);
                setError(null);

                // Link orqali ma'lumotlarni tekshirish
                const queryString = searchParams ? Object.entries(searchParams)
                    .map(([key, value]) => `${key}=${value}`)
                    .join('&') : '';
                
                let data = getInvitationDataFromLink(queryString);
                
                // Agar link orqali ma'lumotlar kelmasa, uniqueId orqali bazadan olish
                if (!data && uniqueId) {
                    data = await getInvitationByUniqueId(uniqueId);
                }

                if (!data) {
                    throw new Error("Taklifnoma ma'lumotlari topilmadi.");
                }

                setInvitationData(data);

                // OpenGraph meta taglar uchun ma'lumotlar
                const firstName = data.firstName || data.invitationData?.firstName || '';
                const secondName = data.secondName || data.invitationData?.secondName || '';
                const location = data.location || data.invitationData?.location || '';
                const time = data.time || data.invitationData?.time || '';
                const date = data.date || data.invitationData?.date || '';

                // Tadbir turini aniqlash
                let dynamicEventTitle = '';
                switch (type) {
                  case 'wedding': dynamicEventTitle = "Nikoh to'yi"; break;
                  case 'birthday': dynamicEventTitle = "Tug'ilgan kun"; break;
                  case 'funeral': dynamicEventTitle = "Ma'raka"; break;
                  case 'jubilee': dynamicEventTitle = "Yubiley"; break;
                  case 'engagement': dynamicEventTitle = "Unashtiruv"; break;
                  default: dynamicEventTitle = "Marosim";
                }

                // Sarlavha
                setOgTitle(`${dynamicEventTitle} taklifnomasi`);

                // Tavsif
                let tadbir = '';
                if (firstName && secondName) {
                  tadbir = `${firstName} va ${secondName}ning ${dynamicEventTitle.toLowerCase()}`;
                } else if (firstName) {
                  tadbir = `${firstName}ning ${dynamicEventTitle.toLowerCase()}`;
                } else {
                  tadbir = dynamicEventTitle.toLowerCase();
                }

                let desc = `📌 ${tadbir.toUpperCase()}GA TAKLIFNOMA 📌\n\n`;
                
                // Manzil katta harf bilan, ko'zga ko'rinarli qilib ko'rsatish
                if (location) {
                  desc += `📍 MANZIL: ${location}\n\n`;
                }
                
                if (date) {
                  desc += `📅 Sana: ${date}\n`;
                }
                
                if (time) {
                  desc += `⏰ Vaqt: ${time}\n`;
                }
                
                desc += `\nSizni ushbu tantanali tadbirga taklif qilamiz.\nTaklifnoma.uz - Zamonaviy taklifnomalar platformasi`;
                
                setOgDescription(desc);
            } catch (error: any) {
                console.error("Taklifnoma ma'lumotlarini olishda xatolik:", error);
                setError(error.message || "Noma'lum xatolik yuz berdi");
            } finally {
                setLoading(false);
            }
        }

        loadInvitationData();
    }, [uniqueId, searchParams, type]);

    const renderTemplate = () => {
        if (loading) {
            return <p>Yuklanmoqda...</p>;
        }

        if (error) {
            return <p>Xatolik: {error}</p>;
        }

        if (!invitationData) {
            return <p>Taklifnoma ma'lumotlari topilmadi.</p>;
        }

        const templateType = invitationData.type || type;
        const currentTemplateId = invitationData.templateId || templateId;
        const actualInvitationData = invitationData.invitationData || invitationData;
        
        if (!templateType || !currentTemplateId || !actualInvitationData) {
            return <p>Taklifnoma turi, shablon ID yoki asosiy ma'lumotlar topilmadi.</p>;
        }
        
        const propsToPass = { ...actualInvitationData, style: currentTemplateId as string };
        
        switch (templateType) {
            case "wedding":
                return <WeddingTemplate {...propsToPass} />;
            case "birthday":
                return <BirthdayTemplate {...propsToPass} />;
            case "funeral":
                return <FuneralTemplate {...propsToPass} />;
            case "jubilee":
                return <JubileeTemplate {...propsToPass} />;
            case "engagement":
                return <EngagementTemplate {...propsToPass} />;
            default:
                return <p>Noto'g'ri taklifnoma turi: {templateType}</p>;
        }
    };

    const imageUrl = `${siteUrl}/invitation/${type}/${templateId}/${uniqueId}/opengraph-image.png`;

    return (
        <>
            <Head>
                <meta property="og:title" content={ogTitle} />
                <meta property="og:description" content={ogDescription} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={`${siteUrl}/invitation/${type}/${templateId}/${uniqueId}`} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Taklifnoma.uz" />
                
                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={ogTitle} />
                <meta name="twitter:description" content={ogDescription} />
                <meta name="twitter:image" content={imageUrl} />
                
                {/* Telegram specific meta tags */}
                <meta property="telegram:card" content="summary_large_image" />
                <meta property="telegram:title" content={ogTitle} />
                <meta property="telegram:description" content={ogDescription} />
                <meta property="telegram:image" content={imageUrl} />
            </Head>
            <div>{renderTemplate()}</div>
        </>
    );
}
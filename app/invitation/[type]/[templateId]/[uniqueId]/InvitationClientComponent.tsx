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
    const [ogTitle, setOgTitle] = useState<string>("");
    const [ogDescription, setOgDescription] = useState<string>("");
    const siteUrl = process.env.NEXT_PUBLIC_API_URL || "https://etaklif.vercel.app";

    useEffect(() => {
        if (uniqueId) {
            const cacheKey = `invitation_${uniqueId}`;
            try {
                const cachedString = localStorage.getItem(cacheKey);
                if (cachedString) {
                    const cached = JSON.parse(cachedString);
                    const cacheTime = new Date(cached.timestamp);
                    const now = new Date();
                    const cacheAgeHours = (now.getTime() - cacheTime.getTime()) / (1000 * 60 * 60);

                    if (cacheAgeHours < 24) {
                        setInvitationData(cached.data);
                        setLoading(false);
                        updateMetaData(cached.data);
                        return;
                    }
                }
            } catch (error) {
                console.error("Keshni tekshirishda xatolik:", error);
            }
        }

        if (searchParams && Object.keys(searchParams).length > 0) {
            try {
                const queryString = Object.entries(searchParams)
                    .map(([key, value]) => `${key}=${value}`)
                    .join('&');
                const dataHash = btoa(queryString).substring(0, 20);
                const linkCacheKey = `invitation_link_${dataHash}`;

                const cachedLinkString = localStorage.getItem(linkCacheKey);
                if (cachedLinkString) {
                    const cachedLink = JSON.parse(cachedLinkString);
                    const cacheTime = new Date(cachedLink.timestamp);
                    const now = new Date();
                    const cacheAgeHours = (now.getTime() - cacheTime.getTime()) / (1000 * 60 * 60);

                    if (cacheAgeHours < 24) {
                        setInvitationData(cachedLink.data);
                        setLoading(false);
                        updateMetaData(cachedLink.data);
                    }
                }
            } catch (error) {
                console.error("Link keshini tekshirishda xatolik:", error);
            }
        }
    }, [uniqueId, searchParams, type]);

    const updateMetaData = (data: any) => {
        const firstName = data.firstName || data.invitationData?.firstName || '';
        const secondName = data.secondName || data.invitationData?.secondName || '';
        const location = data.location || data.invitationData?.location || '';
        const date = data.date || data.invitationData?.date || '';
        const time = data.time || data.invitationData?.time || '';
        let dynamicEventTitle = '';
        switch (type) {
            case 'wedding': dynamicEventTitle = "Nikoh to'yi"; break;
            case 'birthday': dynamicEventTitle = "Tug'ilgan kun"; break;
            case 'funeral': dynamicEventTitle = "Ma'raka"; break;
            case 'jubilee': dynamicEventTitle = "Yubiley"; break;
            case 'engagement': dynamicEventTitle = "Unashtiruv"; break;
            default: dynamicEventTitle = "Marosim";
        }

        setOgTitle(`${dynamicEventTitle} taklifnomasi`);
        let tadbir = '';
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
        if (invitationData) return;

        async function loadInvitationData() {
            try {
                setLoading(true);
                setError(null);
                const queryString = searchParams ? Object.entries(searchParams)
                    .map(([key, value]) => `${key}=${value}`)
                    .join('&') : '';
                let data = getInvitationDataFromLink(queryString);
                if (!data && uniqueId) {
                    data = await getInvitationByUniqueId(uniqueId);
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
                <meta property="og:site_name" content="" />

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
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
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
    uniqueId,
}: InvitationClientComponentProps) {
    const searchParams = useSearchParams();
    const [invitationData, setInvitationData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
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
                console.error("Ma'lumotlarni yuklashda xatolik:", error);
                setError("Ma'lumotlarni yuklashda kutilmagan xatolik yuz berdi");
                setLoading(false);
            }
        };
        fetchData();
    }, [uniqueId, searchParams]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader">Yuklanmoqda...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-screen text-center">
                <p className="text-red-500 text-xl mb-4">Xatolik: {error}</p>
                <Link href="/">
                    <Button variant="outline">
                        <Home className="mr-2 h-4 w-4" /> Bosh sahifaga qaytish
                    </Button>
                </Link>
            </div>
        );
    }

    if (!invitationData) {
        return (
            <div className="flex flex-col justify-center items-center h-screen text-center">
                <p className="text-lg mb-4">Taklifnoma ma'lumotlari topilmadi.</p>
                <Link href="/">
                    <Button variant="outline">
                        <Home className="mr-2 h-4 w-4" /> Bosh sahifaga qaytish
                    </Button>
                </Link>
            </div>
        );
    }

    const renderTemplate = () => {
        const templateType = invitationData?.type;
        const currentTemplateId = invitationData?.templateId;
        const actualInvitationData = invitationData?.invitationData;
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

    return <div>{renderTemplate()}</div>;
}
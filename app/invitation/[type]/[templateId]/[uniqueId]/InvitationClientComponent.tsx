"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import WeddingTemplate from "@/components/invitation-templates/WeddingTemplate";
import BirthdayTemplate from "@/components/invitation-templates/BirthdayTemplate";
import FuneralTemplate from "@/components/invitation-templates/FuneralTemplate";
import JubileeTemplate from "@/components/invitation-templates/JubileeTemplate";
import EngagementTemplate from "@/components/invitation-templates/EngagementTemplate";
import { getCachedInvitation } from "@/app/services/cache";
import { PaymentModal } from "@/components/payment/PaymentModal";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface InvitationClientComponentProps {
  type: string;
  templateId: string;
  uniqueId: string;
  searchParams?: { [key: string]: string | string[] | undefined };
  initialData?: any;
  paymentStatus?: 'paid' | 'unpaid' | 'pending';
}

export default function InvitationClientComponent({
  type,
  templateId,
  uniqueId,
  initialData,
  paymentStatus: initialPaymentStatus,
}: InvitationClientComponentProps) {
  const [invitationData, setInvitationData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [ogTitle, setOgTitle] = useState<string>("");
  const [ogDescription, setOgDescription] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<'paid' | 'unpaid' | 'pending'>(initialPaymentStatus || 'unpaid');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
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

  // To'lov statusini tekshirish uchun funksiya
  const checkPaymentStatus = async (id: string) => {
    try {
      const response = await fetch(`/api/update-payment-status?uniqueId=${id}`);
      const data = await response.json();
      if (data.success && data.paymentStatus) {
        setPaymentStatus(data.paymentStatus);
        return data.paymentStatus;
      } else {
        setPaymentStatus('unpaid');
        return 'unpaid';
      }
    } catch (error) {
      console.error("To'lov statusini tekshirishda xatolik:", error);
      setPaymentStatus('unpaid');
      return 'unpaid';
    }
  };

  // To'lov statusini davriy ravishda tekshirish
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    // Agar to'lov statusi 'pending' bo'lsa, har 30 soniyada tekshiramiz
    if (paymentStatus === 'pending' && uniqueId) {
      intervalId = setInterval(async () => {
        const status = await checkPaymentStatus(uniqueId);
        // Agar to'lov statusi o'zgargan bo'lsa, intervalni to'xtatamiz
        if (status !== 'pending') {
          clearInterval(intervalId);
        }
      }, 30000); // 30 soniya
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [paymentStatus, uniqueId]);

  useEffect(() => {
    if (initialData) {
      setInvitationData(initialData);
      updateMetaData(initialData);
      setLoading(false);
      // To'lov statusini tekshirish
      if (uniqueId) {
        checkPaymentStatus(uniqueId);
      }
      return;
    }

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

          // To'lov statusini tekshirish
          checkPaymentStatus(uniqueId);
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
  }, [uniqueId, type, initialData]); // Added initialData to dependencies

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // To'lov so'rovini yuborish funksiyasi
  const submitPaymentRequest = async (paymentData: any) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/update-payment-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uniqueId: uniqueId,
          paymentStatus: 'pending',
          screenshotBase64: paymentData.screenshotBase64,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setPaymentStatus('pending');
        setShowPaymentModal(false);
        setShowSuccessModal(true);
      } else {
        toast.error(result.error || "Xatolik yuz berdi");
      }
    } catch (error) {
      console.error("Payment submission error:", error);
      toast.error("To'lov so'rovini yuborishda xatolik yuz berdi");
    } finally {
      setIsSubmitting(false);
    }
  };

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

    // Taklifnoma shablonini render qilish
    const renderInvitationTemplate = () => {
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

    // To'lov qilinmagan taklifnoma uchun blur va to'lov tugmasi
    if (paymentStatus === 'unpaid') {
      return (
        <div className="relative">
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto text-center mb-4">
              <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-600 mb-2">TO'LANMAGAN</h2>
              <p className="mb-4">Bu taklifnoma hali to'lanmagan. To'lovni amalga oshirish uchun quyidagi tugmani bosing.</p>
              <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                <p className="font-medium text-gray-800">Taklifnoma narxi:</p>
                <p className="text-2xl font-bold text-green-600">50,000 so'm</p>
              </div>
              <Button
                onClick={() => setShowPaymentModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                To'lovni amalga oshirish
              </Button>
              <p className="mt-4 text-sm text-gray-500">To'lov qilganingizdan so'ng taklifnoma to'liq ko'rinadi</p>
              <p className="mt-2 text-xs text-gray-400">To'lov so'rovingiz yuborilgandan so'ng, 24 soat ichida tekshiriladi va faollashtiriladi</p>
            </div>
          </div>
          <div className="filter blur-sm">
            {renderInvitationTemplate()}
          </div>
        </div>
      );
    } else if (paymentStatus === 'pending') {
      return (
        <div className="relative">
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto text-center mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-yellow-600 mb-2">TO'LOV TEKSHIRILMOQDA</h2>
              <p className="mb-4">To'lov so'rovingiz ko'rib chiqilmoqda. Bu jarayon bir necha daqiqa davom etishi mumkin.</p>
            </div>
          </div>
          <div className="filter blur-sm">
            {renderInvitationTemplate()}
          </div>
        </div>
      );
    }

    // To'langan taklifnoma uchun normal ko'rinish
    return renderInvitationTemplate();
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

      {/* To'lov modal oynasi */}
      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onSubmit={submitPaymentRequest}
          cardNumber="4073 4200 2379 1357"
          cardOwner="Niyatov Shohjahon"
          isSubmitting={isSubmitting}
        />
      )}

      {/* Muvaffaqiyatli to'lov so'rovi modali */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 text-center">
            <div className="text-green-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">To'lov so'rovi yuborildi!</h2>
            <p className="mb-4">Sizning to'lov so'rovingiz muvaffaqiyatli yuborildi va tez orada ko'rib chiqiladi.</p>
            <p className="mb-4 text-sm text-gray-600">To'lov tasdiqlangandan so'ng taklifnomangiz to'liq faollashtiriladi va elektron pochtangizga yuboriladi.</p>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full"
              onClick={() => setShowSuccessModal(false)}
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </>
  );
}

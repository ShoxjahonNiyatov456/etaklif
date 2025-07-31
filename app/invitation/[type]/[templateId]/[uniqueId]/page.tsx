import { Metadata } from 'next';
import { Suspense } from 'react';
import InvitationClientComponent from './InvitationClientComponent';
import { getInvitationByUniqueId } from '@/app/services/share';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/services/database';

interface InvitationPageProps {
  params: { type: string; templateId: string; uniqueId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
  { params }: InvitationPageProps
): Promise<Metadata> {
  const { uniqueId, type, templateId } = await params;
  let ogTitle = "Taklifnoma";
  let ogDescription = "";
  const siteUrl = process.env.NEXT_PUBLIC_API_URL || "https://etaklif.vercel.app";
  const imageUrl = `${siteUrl}/invitation/${type}/${templateId}/${uniqueId}/opengraph-image.png`;

  try {
    const rawDbData = await getInvitationByUniqueId(uniqueId);
    if (rawDbData) {
      const actualInvitationData = rawDbData.invitationData || rawDbData;
      const firstName = actualInvitationData.firstName || '';
      const secondName = actualInvitationData.secondName || '';
      const date = actualInvitationData.date || '';
      const time = actualInvitationData.time || '';
      const location = actualInvitationData.location || '';

      let dynamicEventTitle = '';
      if (actualInvitationData.eventName) {
        dynamicEventTitle = actualInvitationData.eventName;
      } else {
        switch (type) {
          case 'wedding': dynamicEventTitle = "Nikoh to'yi"; break;
          case 'birthday': dynamicEventTitle = "Tug'ilgan kun"; break;
          case 'funeral': dynamicEventTitle = "Ma'raka"; break;
          case 'jubilee': dynamicEventTitle = "Yubiley"; break;
          case 'engagement': dynamicEventTitle = "Unashtiruv"; break;
          default: dynamicEventTitle = "Marosim";
        }
      }

      ogTitle = `${dynamicEventTitle} taklifnomasi`;
      let hostNames = '';
      if (firstName && secondName) {
        hostNames = `${firstName} va ${secondName}ning`;
      } else if (firstName) {
        hostNames = `${firstName}ning`;
      }

      let tadbir = '';
      if (hostNames) {
        tadbir = `${hostNames} ${dynamicEventTitle.toLowerCase()}`;
      } else {
        tadbir = dynamicEventTitle.toLowerCase();
      }

      ogDescription = `📌XURMATLI YAQINIM SIZ ${tadbir.toUpperCase()}IGA TAKLIF ETILDINGIZ 📌\n\n`;
      if (location) {
        ogDescription += `📍 MANZIL: ${location}\n`;
      }
      if (date) {
        ogDescription += `📅 SANA: ${date}\n`;
      }
      if (time) {
        ogDescription += `⏰ VAQT: ${time}`;
      }
    }
  } catch (error) {
    console.error("[generateMetadata] Metadata uchun ma'lumot olishda xatolik:", error);
    ogTitle = 'Taklifnoma';
    ogDescription = '';
  }

  const fullUrl = `${siteUrl}/invitation/${type}/${templateId}/${uniqueId}`;

  return {
    metadataBase: new URL(siteUrl),
    title: ogTitle,
    description: ogDescription,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: fullUrl,
      siteName: '',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
      locale: 'uz_UZ',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [imageUrl],
      creator: '',
    },
    alternates: {
      canonical: fullUrl,
    },
    other: {
      'telegram:card': 'summary_large_image',
      'telegram:title': ogTitle,
      'telegram:description': ogDescription,
      'telegram:image': imageUrl,
    },
  };
}


export default async function InvitationPage({ params: paramsProp }: InvitationPageProps) {
  const { type, templateId, uniqueId } = paramsProp;
  let paymentStatus = 'unpaid';
  let initialInvitationData = null;
  let error = null;

  try {
    const rawData = await getInvitationByUniqueId(uniqueId);
    if (rawData) {
      initialInvitationData = rawData.invitationData || rawData;

      // Firebase'dan to'lov statusini tekshirish
      const invitationRef = doc(db, "invitations", uniqueId);
      const invitationSnap = await getDoc(invitationRef);

      if (invitationSnap.exists()) {
        const data = invitationSnap.data();
        paymentStatus = data.paymentStatus || 'unpaid';
      }
    } else {
      console.warn(`[InvitationPage] No data found for uniqueId: ${uniqueId}`);
    }
  } catch (e: any) {
    error = e.message || "Ma'lumotlarni yuklashda xatolik";
    console.error("To'lov statusini tekshirishda xatolik:", e);
  }
  if (error && !initialInvitationData) {
    return <div>Xatolik yuz berdi: {error}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div></div>}>
        <InvitationClientComponent
          type={type}
          templateId={templateId}
          uniqueId={uniqueId}
          initialData={initialInvitationData}
          paymentStatus={paymentStatus as 'paid' | 'unpaid' | 'pending'}
        />
      </Suspense>
    </div>
  );
}

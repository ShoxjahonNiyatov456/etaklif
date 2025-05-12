import { Metadata } from 'next';
import { Suspense } from 'react';
import InvitationClientComponent from './InvitationClientComponent';
import { getInvitationByUniqueId } from '@/app/services/share';

interface InvitationPageProps {
  params: { type: string; templateId: string; uniqueId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
  { params }: InvitationPageProps
): Promise<Metadata> {
  const { uniqueId, type, templateId } = params;
  let ogTitle = "Taklifnoma";
  let ogDescription = "";
  const siteUrl = process.env.NEXT_PUBLIC_API_URL || "https://etaklif.vercel.app";
  const imageUrl = `${siteUrl}/invitation/${type}/${templateId}/${uniqueId}/opengraph-image.png`;

  try {
    const invitationData = await getInvitationByUniqueId(uniqueId);
    if (invitationData) {
      const firstName = invitationData.firstName || '';
      const secondName = invitationData.secondName || '';
      const age = invitationData.age;
      const date = invitationData.date || '';
      const time = invitationData.time || '';
      const location = invitationData.location || '';
      const eventName = invitationData.eventName || '';

      let dynamicEventTitle = '';
      if (eventName) {
        dynamicEventTitle = eventName;
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

export default async function InvitationPage({ params, searchParams }: InvitationPageProps) {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;
  return (
    <Suspense fallback={<div>Yuklanmoqda...</div>}>
      <InvitationClientComponent
        type={awaitedParams.type}
        templateId={awaitedParams.templateId}
        uniqueId={awaitedParams.uniqueId}
        searchParams={awaitedSearchParams}
      />
    </Suspense>
  );
}

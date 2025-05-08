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
  const { uniqueId, type, templateId } = params; // Removed await as params is not a promise
  console.log('[generateMetadata] Params:', params);
  let ogTitle = "Taklifnoma";
  let ogDescription = "Sizni marosimimizga taklif qilamiz.";
  let imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/images/default-invitation.jpg`;
  const siteUrl = process.env.NEXT_PUBLIC_API_URL || "";
  console.log('[generateMetadata] Initial siteUrl:', siteUrl);
  console.log('[generateMetadata] Initial imageUrl:', imageUrl);

  try {
    const invitationData = await getInvitationByUniqueId(uniqueId);
    console.log('[generateMetadata] Invitation Data:', invitationData);
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

      if (hostNames) {
        ogDescription = `${hostNames} ${dynamicEventTitle.toLowerCase()}ga taklifnomasi.`;
      } else {
        ogDescription = `Sizni ${dynamicEventTitle.toLowerCase()} marosimiga taklif etamiz.`;
      }
      if (date) ogDescription += ` Sana: ${date}.`;
      if (time) ogDescription += ` Vaqt: ${time}.`;
      if (location) ogDescription += ` Manzil: ${location}.`;
      console.log('[generateMetadata] OG Description after details:', ogDescription);
      if (invitationData.uploadedImage) {
        if (invitationData.uploadedImage.startsWith('http')) {
          imageUrl = invitationData.uploadedImage;
        } else if (siteUrl) {
          const cleanedSiteUrl = siteUrl.replace(/\/$/, '');
          const cleanedImagePath = invitationData.uploadedImage.replace(/^\//, '');
          imageUrl = `${cleanedSiteUrl}/${cleanedImagePath}`;
        }
      } else if (invitationData.templatePreviewImage) {
        if (invitationData.templatePreviewImage.startsWith('http')) {
          imageUrl = invitationData.templatePreviewImage;
        } else if (siteUrl) {
          const cleanedSiteUrl = siteUrl.replace(/\/$/, '');
          const cleanedImagePath = invitationData.templatePreviewImage.replace(/^\//, '');
          imageUrl = `${cleanedSiteUrl}/${cleanedImagePath}`;
        }
      }
      console.log('[generateMetadata] Image URL after processing:', imageUrl);
    }
  } catch (error) {
    console.error("[generateMetadata] Metadata uchun ma'lumot olishda xatolik:", error);
    ogTitle = 'Taklifnoma';
    ogDescription = 'Taklifnoma.uz - Onlayn taklifnomalar platformasi.';
    imageUrl = `${siteUrl}/images/default-invitation.jpg`;
    console.log('[generateMetadata] Error block imageUrl:', imageUrl);
  }

  const fullUrl = `${siteUrl}/invitation/${type}/${templateId}/${uniqueId}`;
  console.log('[generateMetadata] Full URL:', fullUrl);
  console.log('[generateMetadata] Final OG Title:', ogTitle);
  console.log('[generateMetadata] Final OG Description:', ogDescription);
  console.log('[generateMetadata] Final Image URL:', imageUrl);

  return {
    metadataBase: new URL(siteUrl),
    title: ogTitle,
    description: ogDescription,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: fullUrl,
      siteName: 'Taklifnoma.uz',
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
      creator: '@taklifnomauz',
    },
    alternates: {
      canonical: fullUrl,
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

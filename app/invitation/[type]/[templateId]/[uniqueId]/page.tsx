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
  const { uniqueId, type } = await params;
  let title = "Taklifnoma";
  let description = "Sizni marosimimizga taklif qilamiz.";
  let firstName = '';
  let secondName = '';

  try {
    const invitationData = await getInvitationByUniqueId(uniqueId);
    if (invitationData) {
      firstName = invitationData.firstName || '';
      secondName = invitationData.secondName || '';
      const namePart = secondName ? `${firstName} va ${secondName}ning` : `${firstName}ning`;
      switch (type) {
        case 'wedding':
          title = `To'y taklifnomasi`;
          description = `Visol oqshomiga marhamat!`;
          break;
        case 'birthday':
          title = `Tug'ilgan kuni taklifnomasi`;
          description = `Tug'ulgan kunga xush kelibsiz!`;
          break;
        case 'funeral':
          title = `El oshi marosimiga taklifnoma`;
          description = `El oshi dasturxoniga marhamat.`;
          break;
        case 'jubilee':
          title = `Yubileyga taklifnoma`;
          description = `Yubiley tantanasiga taklif etamiz.`;
          break;
        case 'engagement':
          title = `Qiz uzatish marosimiga taklifnoma`;
          description = `Qiz uzatish to'yiga marhamat.`;
          break;
        default:
          title = `${namePart} marosimiga taklifnoma`;
      }
    }
  } catch (error) {
    console.error("Metadata uchun ma'lumot olishda xatolik:", error);
  }

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
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

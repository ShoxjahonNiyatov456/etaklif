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
          title = `${namePart} to'yiga taklifnoma`;
          description = `${namePart} visol oqshomiga marhamat!`;
          break;
        case 'birthday':
          const agePart = invitationData.age ? ` ${invitationData.age} yosh` : '';
          title = `${firstName}ning${agePart} tug'ilgan kuniga taklifnoma`;
          description = `${firstName}ning tavallud ayyomiga xush kelibsiz!`;
          break;
        case 'funeral':
          title = `El oshi marosimiga taklifnoma`;
          description = `${firstName}ning ehson dasturxoniga marhamat.`;
          break;
        case 'jubilee':
          title = `${firstName}ning yubileyiga taklifnoma`;
          description = `${firstName}ning yubiley tantanasiga taklif etamiz.`;
          break;
        case 'engagement':
          title = `${firstName}ning qiz uzatish marosimiga taklifnoma`;
          description = `${firstName}ning qiz uzatish to'yiga marhamat.`;
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

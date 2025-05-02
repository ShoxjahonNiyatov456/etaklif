import { Metadata } from 'next';
import { getInvitationByUniqueId } from '@/app/services/share';

interface LayoutProps {
  children: React.ReactNode;
  params: {
    type: string;
    templateId: string;
  };
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { type, templateId } = await params;
  const invitationData = await getInvitationByUniqueId(templateId);

  if (!invitationData) {
    return {
      title: 'Taklifnoma topilmadi',
      description: 'Kechirasiz, so\'ralgan taklifnoma mavjud emas.',
    };
  }

  const firstName = invitationData.firstName || 'Muhammadjon';
  const secondName = invitationData.secondName || 'Zulhayoxon';
  const age = invitationData.age || '14';
  const date = invitationData.date || '10.05.2025';
  const time = invitationData.time || '19:30';
  const location = invitationData.location || "Asr To'yxonasi";
  const uploadedImage = invitationData.uploadedImage || null;

  let ogTitle = 'Taklifnoma';
  let ogDescription = 'Sizni ushbu marosimga taklif etamiz.';
  switch (type) {
    case 'wedding':
      ogTitle = `${firstName} va ${secondName}ning nikoh to'yi`;
      ogDescription = `To'y ${date} kuni, soat ${time}da ${location} manzilida bo'lib o'tadi.`;
      break;
    case 'birthday':
      ogTitle = `${firstName}ning ${age} yoshlik tug'ilgan kuni`;
      ogDescription = `Tug'ilgan kun ${date} kuni, soat ${time}da ${location} manzilida nishonlanadi.`;
      break;
    case 'funeral':
      ogTitle = `${firstName}ning ehson dasturxoni`;
      ogDescription = `Marosim ${date} kuni, soat ${time}da ${location} manzilida bo'lib o'tadi.`;
      break;
    case 'jubilee':
      ogTitle = `${firstName}ning ${age} yillik yubileyi`;
      ogDescription = `Yubiley ${date} kuni, soat ${time}da ${location} manzilida nishonlanadi.`;
      break;
    case 'engagement':
      ogTitle = `${firstName}ning unashtiruv marosimi`;
      ogDescription = `Marosim ${date} kuni, soat ${time}da ${location} manzilida bo'lib o'tadi.`;
      break;
  }

  const imageUrl = uploadedImage || `${process.env.NEXT_PUBLIC_API_URL}/images/default-invitation.jpg`;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/invitation/${type}/${templateId}`;

  return {
    title: ogTitle,
    description: ogDescription,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: ogTitle
      }],
      url,
      type: 'website',
      locale: 'uz_UZ',
      siteName: 'Taklifnoma.uz',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [imageUrl],
    },
  };
}

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
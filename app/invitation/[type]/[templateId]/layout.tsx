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
  const { type, templateId } = params;
  const invitationData = await getInvitationByUniqueId(templateId);

  if (!invitationData) {
    return {
      title: 'Taklifnoma topilmadi',
      description: 'Kechirasiz, so\'ralgan taklifnoma mavjud emas.',
    };
  }

  const title = invitationData.title || 'Taklifnoma';
  const description = invitationData.description || 'Rasuljon va Oytovuqlarning nikoh tuyiga taklifnoma. Vaqt va manzil.';
  const imageUrl = invitationData.imageUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/images/default-invitation.jpg`;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/invitation/${type}/${templateId}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: title
      }],
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
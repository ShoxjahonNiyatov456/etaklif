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
  return {
    title: 'Taklifnoma',
    description: 'Taklifnomalarni ko\'rish va yaratish platformasi.',
    openGraph: {
      title: 'Taklifnoma',
      description: 'Taklifnomalarni ko\'rish va yaratish platformasi.',
      images: [{
        url: `${process.env.NEXT_PUBLIC_API_URL}/images/default-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'etaklif.vercel.app'
      }],
      url: `${process.env.NEXT_PUBLIC_API_URL}/invitation/${type}/${templateId}`,
      type: 'website',
      locale: 'uz_UZ',
      siteName: 'etaklif.vercel.app',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Taklifnoma',
      description: 'Taklifnomalarni ko\'rish va yaratish platformasi.',
      images: [`${process.env.NEXT_PUBLIC_API_URL}/images/default-og.jpg`],
    },
  };
}

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
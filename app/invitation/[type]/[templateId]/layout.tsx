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
  const { type, templateId } = params; // Removed await as params is not a promise
  // This metadata is generic for the template type, specific invitation metadata will be in [uniqueId]/page.tsx
  return {
    title: 'Taklifnoma',
    description: 'Taklifnomalarni ko\'rish va yaratish platformasi.',
    openGraph: {
      title: 'Taklifnoma',
      description: 'Taklifnomalarni ko\'rish va yaratish platformasi.',
      images: [{
        url: `${process.env.NEXT_PUBLIC_API_URL}/images/default-og.jpg`, // Generic OG image
        width: 1200,
        height: 630,
        alt: 'Taklifnoma.uz'
      }],
      url: `${process.env.NEXT_PUBLIC_API_URL}/invitation/${type}/${templateId}`,
      type: 'website',
      locale: 'uz_UZ',
      siteName: 'Taklifnoma.uz',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Taklifnoma',
      description: 'Taklifnomalarni ko\'rish va yaratish platformasi.',
      images: [`${process.env.NEXT_PUBLIC_API_URL}/images/default-og.jpg`], // Generic Twitter image
    },
  };
}

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
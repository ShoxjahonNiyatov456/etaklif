import { Metadata } from 'next';
import { getInvitationByUniqueId } from "@/app/services/share";
import InvitationClientComponent from './InvitationClientComponent'; // Yangi klient komponentini import qilish
import { URLSearchParams } from 'url'; // Server tarafida URLSearchParams ishlatish uchun import

type Props = {
  params: { type: string; templateId: string; uniqueId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// generateMetadata funksiyasi serverda ishlagani uchun shu yerda qoladi
export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const uniqueId = params.uniqueId;
  const type = params.type;

  try {
    const invitationData = await getInvitationByUniqueId(uniqueId as string);

    if (!invitationData) {
      return {
        title: 'Taklifnoma topilmadi',
        description: 'Ushbu havola orqali taklifnoma mavjud emas.',
        openGraph: {
          title: 'Taklifnoma topilmadi',
          description: 'Ushbu havola orqali taklifnoma mavjud emas.',
          images: [
            {
              url: '/default-og-image.png', // Loyihadagi standart rasmga yo'l
              width: 1200,
              height: 630,
              alt: 'Taklifnoma',
            },
          ],
          type: 'website',
        },
      };
    }
    const firstName = invitationData.firstName || '';
    const secondName = invitationData.secondName || '';
    const age = invitationData.age || '';
    const date = invitationData.date || "noma'lum sana";
    const time = invitationData.time || "noma'lum vaqt";
    const location = invitationData.location || "noma'lum manzil";
    let title = "To'yga taklifnoma"; // Asosiy sarlavha
    let description = '';

    switch (type) {
      case 'wedding':
        description = `${firstName} va ${secondName}ning nikoh to'yiga taklifnoma. To'y ${date} kuni, soat ${time}da ${location} manzilida bo'lib o'tadi.`;
        break;
      case 'birthday':
        title = `${firstName}ning tug'ilgan kuniga taklifnoma`;
        description = `${firstName}ning ${age} yoshga to'lish munosabati bilan ${date} kuni, soat ${time}da ${location} manzilida bo'lib o'tadigan bayramga taklif etamiz.`;
        break;
      case 'funeral':
        title = `El oshi`;
        description = `${firstName} xotirasiga bag'ishlangan el oshi ${date} kuni, soat ${time}da ${location} manzilida bo'lib o'tadi.`;
        break;
      case 'jubilee':
        title = `${firstName}ning yubileyiga taklifnoma`;
        description = `${firstName}ning ${age} yillik yubileyi ${date} kuni, soat ${time}da ${location} manzilida nishonlanadi.`;
        break;
      case 'engagement':
        title = `Fotiha to'yiga taklifnoma`;
        description = `${firstName}ning fotiha to'yi ${date} kuni, soat ${time}da ${location} manzilida bo'lib o'tadi.`;
        break;
      default:
        description = `${firstName}ning tadbiriga taklifnoma. Tadbir ${date} kuni, soat ${time}da ${location} manzilida bo'lib o'tadi.`;
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    const imageUrl = invitationData.uploadedImage
      ? invitationData.uploadedImage.startsWith('http')
        ? invitationData.uploadedImage
        : `${baseUrl}${invitationData.uploadedImage}`
      : `${baseUrl}/default-og-image.png`;

    return {
      title: title,
      description: description,
      openGraph: {
        title: title,
        description: description,
        images: [
          {            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        type: 'website',
        url: `${baseUrl}/invitation/${type}/${params.templateId}/${uniqueId}`,
        siteName: 'Taklifnoma.uz',
        locale: 'uz_UZ',
      },
      twitter: {
        card: 'summary_large_image',
        title: title,
        description: description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Metadata yaratishda xatolik:', error);
    return {
      title: 'Xatolik',
      description: "Taklifnoma ma'lumotlarini yuklashda xatolik yuz berdi.",
      openGraph: {
        title: 'Xatolik',
        description: "Taklifnoma ma'lumotlarini yuklashda xatolik yuz berdi.",
        images: [
          {
            url: '/default-og-image.png',
            width: 1200,
            height: 630,
            alt: 'Xatolik',
          },
        ],
        type: 'website',
      },
    };
  }
}

// Bu asosiy server komponenti
export default async function InvitationPage({ params, searchParams }: Props) {
  const { type, templateId, uniqueId } = params;

  // searchParams obyektini klient komponentiga o'tkazish uchun stringga aylantirish
  const searchParamsString = new URLSearchParams(searchParams as Record<string, string>).toString();

  // Bu yerda kerak bo'lsa server tarafida ma'lumotlarni olish yoki boshqa logikani qo'shish mumkin

  return (
    <InvitationClientComponent
      type={type as string}
      templateId={templateId as string}
      uniqueId={uniqueId as string}
      searchParamsString={searchParamsString}
    />
  );
}

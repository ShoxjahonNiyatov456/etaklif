// Taklifnoma ulashish uchun servis

/**
 * Taklifnoma uchun unikal havola yaratish
 * Bu funksiya to'lov qilingandan so'ng taklifnomani ulashish uchun unikal havola yaratadi
 */
export const generateShareableLink = async (
  type: string,
  templateId: string,
  invitationData: any
): Promise<string> => {
  const uniqueId = generateUniqueId();

  // Ma'lumotlarni saqlash
  saveInvitationToStorage(uniqueId, type, templateId, invitationData);

  // Ma'lumotlarni serverga saqlash
  await saveInvitationToServer(uniqueId, type, templateId, invitationData);

  // To'liq URL manzilini yaratish
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://taklifnoma.uz';
  
  // URL parametrlarini xavfsiz kodlash
  const urlParts = [
    'invitation',
    encodeURIComponent(type),
    encodeURIComponent(templateId),
    encodeURIComponent(uniqueId)
  ];
  
  // URL manzilini to'g'ri formatda yaratish
  const path = urlParts.join('/');
  const fullUrl = new URL(path, baseUrl);
  
  return fullUrl.toString();
};

/**
 * Unikal ID yaratish uchun yordamchi funksiya
 */
const generateUniqueId = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

/**
 * Taklifnoma ma'lumotlarini sessionStorage-ga saqlash (localStorage o'rniga faqat joriy sessiya uchun)
 */
const saveInvitationToStorage = (
  uniqueId: string,
  type: string,
  templateId: string,
  invitationData: any
): void => {
  try {
    // Browser muhitida ekanligini tekshirish
    if (typeof window === "undefined") {
      return;
    }

    // Taklifnomani joriy sessiya uchun saqlash (boshqa qurilmalarda ko'rinmasligi uchun localStorage emas, sessionStorage ishlatiladi)
    sessionStorage.setItem(
      `invitation_${uniqueId}`,
      JSON.stringify({
        type,
        templateId,
        invitationData,
        createdAt: new Date().toISOString(),
      })
    );

    // Backward compatibility: localStorage-da ham saqlash
    const storedInvitations = localStorage.getItem("invitations") || "{}";
    const invitations = JSON.parse(storedInvitations);

    // Yangi taklifnomani qo'shish
    invitations[uniqueId] = {
      type,
      templateId,
      invitationData,
      createdAt: new Date().toISOString(),
    };

    // Saqlash
    localStorage.setItem("invitations", JSON.stringify(invitations));
  } catch (error) {
    console.error("Taklifnomani saqlashda xatolik:", error);
  }
};

/**
 * Taklifnoma ma'lumotlarini serverga saqlash
 */
const saveInvitationToServer = async (
  uniqueId: string,
  type: string,
  templateId: string,
  invitationData: any
): Promise<void> => {
  try {
    const response = await fetch("/api/save-invitation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uniqueId,
        type,
        templateId,
        invitationData,
        createdAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error("Serverga ma'lumotlarni saqlashda xatolik");
    }
  } catch (error) {
    console.error("Serverga ma'lumotlarni saqlashda xatolik:", error);
    // Xatolik bo'lsa ham davom etamiz, chunki localStorage backup sifatida ishlaydi
  }
};

/**
 * Taklifnoma ma'lumotlarini havola orqali olish
 */
export const getInvitationDataFromLink = (queryParams: string): any => {
  try {
    // Eski usul - URL parametrlaridan ma'lumotlarni olish (agar mavjud bo'lsa)
    const data = new URLSearchParams(queryParams).get("data");
    if (data) {
      return JSON.parse(decodeURIComponent(data));
    }

    return null;
  } catch (error) {
    console.error("Taklifnoma ma'lumotlarini o'qishda xatolik:", error);
    return null;
  }
};

/**
 * Unique ID bo'yicha taklifnomani olish
 */
export const getInvitationByUniqueId = async (
  uniqueId: string
): Promise<any> => {
  try {
    // 1. Avval sessionStorage-dan tekshirish
    if (typeof window !== "undefined") {
      const sessionData = sessionStorage.getItem(`invitation_${uniqueId}`);
      if (sessionData) {
        const parsedData = JSON.parse(sessionData);
        return parsedData.invitationData || null;
      }

      // 2. localStorage-dan tekshirish (eskirgan usul)
      const storedInvitations = localStorage.getItem("invitations") || "{}";
      const invitations = JSON.parse(storedInvitations);
      if (invitations[uniqueId]?.invitationData) {
        return invitations[uniqueId].invitationData;
      }
    }

    // 3. Serverdan ma'lumotlarni olish
    return await fetchInvitationFromServer(uniqueId);
  } catch (error) {
    console.error("Taklifnomani olishda xatolik:", error);
    return null;
  }
};

/**
 * Taklifnomani serverdan olish
 */
const fetchInvitationFromServer = async (uniqueId: string): Promise<any> => {
  try {
    try {
      const response = await fetch(`/api/get-invitation?uniqueId=${uniqueId}`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (!response.ok) {
        console.log(`Server javob kodi: ${response.status}`);
        if (response.status === 404) {
          return null;
        }
        return null;
      }

      const data = await response.json();
      // Serverdan kelgan ma'lumotlarni tekshirish
      if (!data || !data.invitationData) {
        console.warn("Server tomonidan ma'lumotlar topilmadi:", data);
        return null;
      }

      return data.invitationData;
    } catch (fetchError) {
      console.error("Fetch so'rovida xatolik yuz berdi:", fetchError);
      // API ga so'rov qilishda xatolik bo'lgan holda ham null qaytaramiz
      return null;
    }
  } catch (error) {
    console.error("Serverdan ma'lumotlarni olishda xatolik:", error);
    return null;
  }
};

/**
 * Foydalanuvchining barcha taklifnomalarini olish
 */
export const getInvitationsByUser = async (userId?: string): Promise<any[]> => {
  try {
    const invitations: any[] = [];

    // 1. Avval sessionStorage-dan olish
    if (typeof window !== "undefined") {
      // SessionStorage-dagi taklifnomalarni olish
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith("invitation_")) {
          const uniqueId = key.replace("invitation_", "");
          const sessionData = sessionStorage.getItem(key);

          if (sessionData) {
            const invitation = JSON.parse(sessionData);
            invitations.push({
              uniqueId,
              type: invitation.type,
              templateId: invitation.templateId,
              invitationData: invitation.invitationData,
              createdAt: invitation.createdAt,
            });
          }
        }
      }

      // 2. LocalStorage-dan olish
      const storedInvitations = localStorage.getItem("invitations");
      if (storedInvitations) {
        const parsedInvitations = JSON.parse(storedInvitations);

        Object.keys(parsedInvitations).forEach((uniqueId) => {
          // Agar bu taklifnoma allaqachon qo'shilmagan bo'lsa
          if (!invitations.some((inv) => inv.uniqueId === uniqueId)) {
            const invitation = parsedInvitations[uniqueId];
            invitations.push({
              uniqueId,
              type: invitation.type,
              templateId: invitation.templateId,
              invitationData: invitation.invitationData,
              createdAt: invitation.createdAt,
            });
          }
        });
      }
    }

    // 3. Agar foydalanuvchi ID berilgan bo'lsa, serverdan ham olish (kelajakda qo'shiladigan funksional)
    if (userId) {
      try {
        const response = await fetch(`/api/user-invitations?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          if (data && Array.isArray(data.invitations)) {
            // Serverdan kelgan taklifnomalarni qo'shish
            data.invitations.forEach((serverInvitation: any) => {
              // Agar bu taklifnoma allaqachon qo'shilmagan bo'lsa
              if (
                !invitations.some(
                  (inv) => inv.uniqueId === serverInvitation.uniqueId
                )
              ) {
                invitations.push(serverInvitation);
              }
            });
          }
        }
      } catch (serverError) {
        console.error(
          "Serverdan taklifnomalarni olishda xatolik:",
          serverError
        );
      }
    }

    // Tartiblash - eng yangi taklifnomalar yuqorida
    return invitations.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  } catch (error) {
    console.error("Taklifnomalarni olishda xatolik:", error);
    return [];
  }
};

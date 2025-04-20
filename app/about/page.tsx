"use client";

export default function AboutPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const teamMembers = [
    {
      name: "Alisher Karimov",
      role: "Asoschisi & CEO",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Dilnoza Rahimova",
      role: "Dizayner",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Bobur Saidov",
      role: "Dasturchi",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Madina Umarova",
      role: "Marketing Menejeri",
      image: "/placeholder.svg?height=300&width=300",
    },
  ];

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Biz haqimizda</h1>

          <div className="prose max-w-none">
            <p className="text-lg mb-4">
              Taklifnoma - bu zamonaviy va chiroyli taklifnomalarni yaratish
              platformasi. Biz 2022-yilda tashkil topganmiz va o'shandan beri
              minglab foydalanuvchilarga xizmat ko'rsatib kelmoqdamiz.
            </p>

            <p className="mb-4">
              Bizning maqsadimiz - foydalanuvchilarga turli marosimlar uchun
              chiroyli va zamonaviy taklifnomalarni yaratish imkoniyatini
              berish. Bizning platformamiz orqali to'y, tug'ilgan kun, el oshi,
              yubiley va qiz uzatish marosimlari uchun taklifnomalarni
              yaratishingiz mumkin.
            </p>

            <p className="mb-4">
              Biz doimiy ravishda yangi shablonlar va funksiyalarni qo'shib
              bormoqdamiz. Agar sizda biror taklifingiz bo'lsa, biz bilan
              bog'lanishingiz mumkin.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Bizning afzalliklarimiz
            </h2>

            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                Foydalanish uchun qulay va sodda interfeys
              </li>
              <li className="mb-2">Turli marosimlar uchun maxsus shablonlar</li>
              <li className="mb-2">Tezkor va sifatli xizmat</li>
              <li className="mb-2">Doimiy yangilanib turuvchi dizaynlar</li>
              <li className="mb-2">Bepul foydalanish imkoniyati</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Bog'lanish</h2>

            <p>
              Savollaringiz yoki takliflaringiz bo'lsa, biz bilan
              bog'lanishingiz mumkin:
            </p>

            <ul className="list-none pl-0 mb-6">
              <li className="mb-2">Telefon: +998 95 557 13 02</li>
              <li className="mb-2">Email: info@taklifnoma.uz</li>
              <li className="mb-2">Telegram: @taklifnoma</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

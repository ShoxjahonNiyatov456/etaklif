"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../app/firebase";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Calendar,
  Gift,
  Crown,
  ChevronRight,
  User,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const categoriesSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  const categories = [
    { id: "all", name: "Barchasi" },
    { id: "wedding", name: "To'y" },
    { id: "birthday", name: "Tug'ilgan Kun" },
    { id: "jubilee", name: "Yubiley" },
    { id: "engagement", name: "Qiz uzatish" },
    { id: "funeral", name: "El oshi" },
  ];

  const templates = [
    // To'y shablonlari
    {
      id: "wedding-1",
      title: "Burgundy Roses",
      category: "wedding",
      image: "/images/gul1.jpg",
      color: "from-rose-500 to-pink-500",
      icon: <Sparkles className="h-5 w-5" />,
      style: "burgundy-roses",
    },
    {
      id: "wedding-2",
      title: "Peach Floral",
      category: "wedding",
      image: "/images/gul8.jpg",
      color: "from-amber-500 to-orange-400",
      icon: <Sparkles className="h-5 w-5" />,
      style: "peach-floral",
    },
    {
      id: "wedding-3",
      title: "Golden Frame",
      category: "wedding",
      image: "/images/gul6.jpg",
      color: "from-amber-500 to-yellow-400",
      icon: <Sparkles className="h-5 w-5" />,
      style: "golden-frame",
    },

    // Tug'ilgan kun shablonlari
    {
      id: "birthday-1",
      title: "Colorful",
      category: "birthday",
      image: "/birthdayimages/b1.jpg",
      color: "from-blue-500 to-cyan-400",
      icon: <Calendar className="h-5 w-5" />,
      style: "colorful",
    },
    {
      id: "birthday-2",
      title: "Kids",
      category: "birthday",
      image: "/birthdayimages/b2.jpg",
      color: "from-green-500 to-emerald-400",
      icon: <Gift className="h-5 w-5" />,
      style: "kids",
    },
    {
      id: "birthday-3",
      title: "Floral Frame",
      category: "birthday",
      image: "/birthdayimages/b3.jpg",
      color: "from-blue-500 to-cyan-400",
      icon: <Calendar className="h-5 w-5" />,
      style: "floral-frame",
    },
    {
      id: "birthday-4",
      title: "Butterfly",
      category: "birthday",
      image: "/birthdayimages/b4.jpg",
      color: "from-amber-500 to-yellow-400",
      icon: <Gift className="h-5 w-5" />,
      style: "butterfly",
    },
    {
      id: "birthday-5",
      title: "Kids Photo",
      category: "birthday",
      image: "/birthdayimages/b5.jpg",
      color: "from-orange-500 to-pink-400",
      icon: <Calendar className="h-5 w-5" />,
      style: "kids-photo",
    },
    {
      id: "birthday-6",
      title: "Unicorn",
      category: "birthday",
      image: "/birthdayimages/b6.jpg",
      color: "from-amber-500 to-yellow-400",
      icon: <Gift className="h-5 w-5" />,
      style: "unicorn",
    },

    // Yubiley shablonlari
    {
      id: "jubilee-1",
      title: "Classic",
      category: "jubilee",
      image: "/jubilee/j7.jpg",
      color: "from-amber-500 to-yellow-400",
      icon: <Crown className="h-5 w-5" />,
      style: "classic",
    },
    {
      id: "jubilee-2",
      title: "Modern",
      category: "jubilee",
      image: "/jubilee/j8.jpg",
      color: "from-indigo-500 to-violet-400",
      icon: <Crown className="h-5 w-5" />,
      style: "modern",
    },
    {
      id: "jubilee-3",
      title: "Ornate",
      category: "jubilee",
      image: "/jubilee/j6.jpg",
      color: "from-amber-500 to-yellow-400",
      icon: <Crown className="h-5 w-5" />,
      style: "ornate",
    },
    {
      id: "jubilee-4",
      title: "Minimalist",
      category: "jubilee",
      image: "/jubilee/j5.jpg",
      color: "from-gray-500 to-gray-400",
      icon: <Crown className="h-5 w-5" />,
      style: "minimalist",
    },
    {
      id: "jubilee-5",
      title: "Traditional",
      category: "jubilee",
      image: "/jubilee/j4.jpg",
      color: "from-amber-500 to-yellow-400",
      icon: <Crown className="h-5 w-5" />,
      style: "traditional",
    },

    // Qiz uzatish shablonlari
    {
      id: "engagement-1",
      title: "Romantic",
      category: "engagement",
      image: "/qizimages/q1.jpg",
      color: "from-pink-500 to-rose-400",
      icon: <Sparkles className="h-5 w-5" />,
      style: "romantic",
    },
    {
      id: "engagement-2",
      title: "National",
      category: "engagement",
      image: "/qizimages/q2.jpg",
      color: "from-pink-500 to-rose-400",
      icon: <Sparkles className="h-5 w-5" />,
      style: "national",
    },
    {
      id: "engagement-3",
      title: "Floral Engagement",
      category: "engagement",
      image: "/qizimages/q3.jpg",
      color: "from-pink-500 to-rose-400",
      icon: <Sparkles className="h-5 w-5" />,
      style: "floral-engagement",
    },
    {
      id: "engagement-4",
      title: "Modern Engagement",
      category: "engagement",
      image: "/qizimages/q4.jpg",
      color: "from-amber-500 to-orange-400",
      icon: <Sparkles className="h-5 w-5" />,
      style: "modern-engagement",
    },
    {
      id: "engagement-5",
      title: "Traditional Engagement",
      category: "engagement",
      image: "/qizimages/q5.jpg",
      color: "from-pink-500 to-rose-400",
      icon: <Sparkles className="h-5 w-5" />,
      style: "traditional-engagement",
    },

    // El oshi shablonlari
    {
      id: "funeral-1",
      title: "Traditional",
      category: "funeral",
      image: "/placeholder.jpg",
      color: "from-amber-500 to-amber-400",
      icon: <Calendar className="h-5 w-5" />,
      style: "traditional",
    },
    {
      id: "funeral-2",
      title: "Calm",
      category: "funeral",
      image: "/placeholder.jpg",
      color: "from-blue-500 to-blue-400",
      icon: <Calendar className="h-5 w-5" />,
      style: "calm",
    },
    {
      id: "funeral-3",
      title: "Photo Memorial",
      category: "funeral",
      image: "/placeholder.jpg",
      color: "from-gray-500 to-gray-400",
      icon: <Calendar className="h-5 w-5" />,
      style: "photo-memorial",
    },
    {
      id: "funeral-4",
      title: "Elegant Memorial",
      category: "funeral",
      image: "/placeholder.jpg",
      color: "from-gray-500 to-gray-400",
      icon: <Calendar className="h-5 w-5" />,
      style: "elegant-memorial",
    },
    {
      id: "funeral-5",
      title: "Islamic Memorial",
      category: "funeral",
      image: "/placeholder.jpg",
      color: "from-green-500 to-green-400",
      icon: <Calendar className="h-5 w-5" />,
      style: "islamic-memorial",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const templatesPerPage = 6;

  const filteredTemplates =
    activeCategory === "all"
      ? templates
      : templates.filter((template) => template.category === activeCategory);

  // Pagination logic
  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = filteredTemplates.slice(
    indexOfFirstTemplate,
    indexOfLastTemplate
  );
  const totalPages = Math.ceil(filteredTemplates.length / templatesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleTemplateClick = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      router.push(
        `/create/${template.category}?template=${templateId}&style=${template.style}`
      );
    }
  };

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);
  const scrollCategoriesLeft = () => {
    if (categoriesSliderRef.current) {
      categoriesSliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollCategoriesRight = () => {
    if (categoriesSliderRef.current) {
      categoriesSliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <section className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600 rounded-full filter blur-[120px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16 mt-8 md:mt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-12">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  Elektron <br /> Taklifnomalarni
                </span>
                <br />
                <span className="text-white">Oson Yarating</span>
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-lg hidden sm:flex">
                Zamonaviy va ajoyib taklifnomalarni yarating. To'y, tug'ilgan
                kun, yubiley va boshqa marosimlar uchun o'zingizning shaxsiy
                taklifnomangizni yarating.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full px-8"
                  onClick={() => {
                    router.push("/select-type");
                  }}
                >
                  Boshlash
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                {/* <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500 text-purple-400 hover:bg-purple-950/30 rounded-full px-8 bg-transparent"
                  onClick={() => router.push("/my-proposals")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Mening taklifnomalarim
                </Button> */}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 w-full px-4 py-8"
            >
              <div className="relative mx-auto max-w-sm md:max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r hidden sm:flex from-purple-600/20 to-pink-600/20 rounded-2xl backdrop-blur-sm transform rotate-6"></div>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm hidden sm:flex rounded-2xl border border-purple-500/30 shadow-xl transform -rotate-3"></div>
                <div className="relative aspect-[3/4] hidden sm:flex rounded-xl overflow-hidden border-2 border-purple-500/30 shadow-2xl">
                  <Image
                    src="/main.jpg"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt="Taklifnoma namunasi"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-600 rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-purple-600 rounded-full filter blur-[120px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Taklifnoma Shablonlari
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Turli marosimlar uchun mo'ljallangan zamonaviy taklifnoma
              shablonlari bilan tanishing
            </p>
          </motion.div>

          {/* Categories Slider */}
          {/* Desktop Categories - Flex Wrap */}
          <div className="hidden lg:flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`rounded-full px-6 ${activeCategory === category.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 border-0 text-white"
                  : "border-gray-700 text-white hover:bg-purple-600 hover:text-white bg-transparent"
                  }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Mobile & Tablet Categories Slider */}
          <div className="relative mb-12 lg:hidden">
            {/* Navigation Buttons for Categories */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900/80 border-gray-700 hover:bg-purple-600 hover:border-purple-500 rounded-full w-10 h-10"
              onClick={scrollCategoriesLeft}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900/80 border-gray-700 hover:bg-purple-600 hover:border-purple-500 rounded-full w-10 h-10"
              onClick={scrollCategoriesRight}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Categories Slider Container */}
            <div
              ref={categoriesSliderRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide px-12 py-2"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    activeCategory === category.id ? "default" : "outline"
                  }
                  className={`rounded-full px-6 py-2 whitespace-nowrap flex-shrink-0 ${activeCategory === category.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 border-0 text-white"
                    : "border-gray-700 text-white hover:bg-purple-600 hover:text-white bg-transparent"
                    }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {currentTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <Card
                  className="bg-gray-900/80 text-white border border-gray-800 overflow-hidden rounded-xl hover:border-purple-500/50 transition-all duration-300 group cursor-pointer"
                  onClick={() => handleTemplateClick(template.id)}
                >
                  <div className="relative h-48 md:h-64 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                    ></div>
                    <Image
                      src={template.image || "/placeholder.svg"}
                      alt={template.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-black/70 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1 rounded-full flex items-center">
                      {template.icon}
                      <span className="ml-1 md:ml-2 text-xs md:text-sm font-medium">
                        {
                          categories.find((c) => c.id === template.category)
                            ?.name
                        }
                      </span>
                    </div>
                  </div>
                  <div className="p-3 md:p-5 flex justify-between items-center">
                    <h3 className="font-semibold text-sm md:text-lg">
                      {template.title}
                    </h3>
                    <Button
                      size="sm"
                      className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 text-xs md:text-sm px-2 md:px-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTemplateClick(template.id);
                      }}
                    >
                      Yaratish
                      <ChevronRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-2">
              <Button
                variant="outline"
                size="icon"
                className="w-10 h-10 rounded-full border-gray-700 text-white hover:bg-purple-600 hover:text-white bg-transparent disabled:opacity-50 disabled:pointer-events-none"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    className={`w-10 h-10 rounded-full ${currentPage === page
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 border-0 text-white"
                      : "border-gray-700 text-white hover:bg-purple-600 hover:text-white bg-transparent"
                      }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                )
              )}

              <Button
                variant="outline"
                size="icon"
                className="w-10 h-10 rounded-full border-gray-700 text-white hover:bg-purple-600 hover:text-white bg-transparent disabled:opacity-50 disabled:pointer-events-none"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>
      <section className="py-20 bg-gray-900/50 relative">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-600 rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600 rounded-full filter blur-[120px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                Nima uchun bizni tanlashadi
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Taklifnoma yaratish jarayonini oson va qiziqarli qiladigan
              xususiyatlar
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Zamonaviy dizayn",
                description:
                  "Eng so'nggi dizayn tendentsiyalariga asoslangan zamonaviy taklifnomalar",
                icon: <Sparkles className="h-10 w-10 text-purple-400" />,
                color: "from-purple-600 to-pink-600",
              },
              {
                title: "Oson foydalanish",
                description:
                  "Hech qanday dizayn ko'nikmalarsiz ham chiroyli taklifnomalar yarating",
                icon: <Gift className="h-10 w-10 text-blue-400" />,
                color: "from-blue-600 to-cyan-600",
              },
              {
                title: "Tezkor yaratish",
                description:
                  "Bir necha daqiqada professional ko'rinishdagi taklifnomalarni yarating",
                icon: <Calendar className="h-10 w-10 text-cyan-400" />,
                color: "from-cyan-600 to-green-600",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-6 flex items-center justify-center`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 z-0 opacity-30">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full filter blur-[100px]"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full filter blur-[100px]"></div>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Hoziroq o'z taklifnomangizni yarating
                </h2>
                <p className="text-gray-300 max-w-xl">
                  Bir necha daqiqada professional ko'rinishdagi taklifnomalarni
                  yarating va do'stlaringizni hayratda qoldiring
                </p>
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full px-8 py-6 text-lg"
                onClick={() => router.push("/select-type")}
              >
                Boshlash
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

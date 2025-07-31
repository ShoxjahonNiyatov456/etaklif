"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FormSection = dynamic(() => import("@/components/create/FormSection"), {
  ssr: false,
});

const PreviewSection = dynamic(
  () => import("@/components/create/PreviewSection"),
  { ssr: false }
);

const PaymentSection = dynamic(
  () => import("@/components/create/PaymentSection"),
  { ssr: false }
);

export default function CreatePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { type } = params;

  const [activeTab, setActiveTab] = useState("form");
  const [formCompleted, setFormCompleted] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);

  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    date: "",
    time: "",
    location: "",
    additionalInfo: "",
    age: "",
    parents: "",
  });

  const [dateError, setDateError] = useState<string | null>(null);
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");

  // Get available templates with correct names
  const getAvailableTemplates = () => {
    switch (type) {
      case "wedding":
        return [
          {
            id: "burgundy-roses",
            name: "Qizil atirgullar",
            color: "from-rose-800 to-rose-600",
          },
          {
            id: "peach-floral",
            name: "Shaftoli guldor",
            color: "from-amber-800 to-amber-600",
          },
          {
            id: "golden-frame",
            name: "Oltin ramka",
            color: "from-amber-400 to-gray-800",
          },
          {
            id: "colorful-garden",
            name: "Rang-barang bog'",
            color: "from-pink-900 to-pink-700",
          },
          {
            id: "watercolor-bouquet",
            name: "Akvarel guldasta",
            color: "from-rose-800 to-rose-700",
          },
          {
            id: "pink-roses",
            name: "Pushti atirgullar",
            color: "from-rose-800 to-rose-600",
          },
          {
            id: "rose-gold",
            name: "Pushti oltin",
            color: "from-rose-800 to-rose-700",
          },
          {
            id: "elegant-corner",
            name: "Elegant burchak",
            color: "from-rose-800 to-rose-700",
          },
          {
            id: "elegant-frame",
            name: "Elegant ramka",
            color: "from-purple-500 to-pink-500",
          },
          {
            id: "blue-floral",
            name: "Ko'k guldor",
            color: "from-blue-500 to-cyan-500",
          },
          {
            id: "golden-ornament",
            name: "Oltin naqsh",
            color: "from-yellow-500 to-amber-500",
          },
          {
            id: "vintage-ornament",
            name: "Vintage naqsh",
            color: "from-teal-500 to-cyan-500",
          },
          {
            id: "floral-hexagon",
            name: "Guldor olti burchak",
            color: "from-rose-500 to-pink-500",
          },
          {
            id: "blue-roses",
            name: "Ko'k atirgullar",
            color: "from-blue-500 to-cyan-500",
          },
          {
            id: "elegant-script",
            name: "Elegant yozuv",
            color: "from-purple-500 to-indigo-500",
          },
        ];
      case "birthday":
        return [
          {
            id: "colorful",
            name: "Rang-barang",
            color: "from-pink-500 to-purple-500",
          },
          {
            id: "kids",
            name: "Bolalar uchun",
            color: "from-blue-500 to-cyan-500",
          },
          {
            id: "floral-frame",
            name: "Guldor ramka",
            color: "from-green-500 to-emerald-500",
          },
          {
            id: "butterfly",
            name: "Kapalaklar",
            color: "from-purple-500 to-indigo-500",
          },
          {
            id: "kids-photo",
            name: "Bolalar suratli",
            color: "from-cyan-500 to-blue-500",
          },
          { id: "unicorn", name: "Yoltoq", color: "from-pink-500 to-rose-500" },
        ];
      case "funeral":
        return [
          {
            id: "traditional",
            name: "An'anaviy",
            color: "from-gray-500 to-slate-500",
          },
          { id: "calm", name: "Sokin", color: "from-blue-500 to-slate-500" },
          {
            id: "photo-memorial",
            name: "Go'zal xotira",
            color: "from-slate-500 to-gray-500",
          },
          {
            id: "islamic-memorial",
            name: "Islomiy uslub",
            color: "from-green-500 to-emerald-500",
          },
        ];
      case "jubilee":
        return [
          {
            id: "classic",
            name: "Klassik",
            color: "from-amber-500 to-yellow-500",
          },
          {
            id: "modern",
            name: "Zamonaviy",
            color: "from-blue-500 to-cyan-500",
          },
          {
            id: "ornate",
            name: "Bezakli",
            color: "from-purple-500 to-pink-500",
          },
          {
            id: "minimalist",
            name: "Minimalist",
            color: "from-gray-500 to-slate-500",
          },
          {
            id: "traditional",
            name: "An'anaviy",
            color: "from-red-500 to-rose-500",
          },
          {
            id: "luxury",
            name: "Hashamatli",
            color: "from-yellow-500 to-amber-500",
          },
          {
            id: "festive",
            name: "Bayramona",
            color: "from-pink-500 to-rose-500",
          },
          {
            id: "photo-centric",
            name: "Suratli",
            color: "from-indigo-500 to-blue-500",
          },
          {
            id: "geometric",
            name: "Geometrik",
            color: "from-cyan-500 to-teal-500",
          },
          {
            id: "nature",
            name: "Tabiat",
            color: "from-green-500 to-emerald-500",
          },
        ];
      case "engagement":
        return [
          {
            id: "romantic",
            name: "Romantik",
            color: "from-pink-500 to-rose-500",
          },
          { id: "national", name: "Milliy", color: "from-red-500 to-rose-500" },
          {
            id: "floral-engagement",
            name: "Guldor",
            color: "from-purple-500 to-pink-500",
          },
          {
            id: "modern-engagement",
            name: "Zamonaviy",
            color: "from-blue-500 to-indigo-500",
          },
          {
            id: "traditional-engagement",
            name: "An'anaviy",
            color: "from-amber-500 to-yellow-500",
          },
        ];
      default:
        return [];
    }
  };

  const availableTemplates = getAvailableTemplates();

  // URL parametrlarni tekshirish
  useEffect(() => {
    const templateParam = searchParams.get("template");
    const styleParam = searchParams.get("style");
    if (templateParam && styleParam) {
      setSelectedTemplate(styleParam);
      const templateIndex = availableTemplates.findIndex(
        (t) => t.id === styleParam
      );
      if (templateIndex !== -1) {
        setCurrentTemplateIndex(templateIndex);
      }
    } else if (availableTemplates.length > 0) {
      // Set default template
      setSelectedTemplate(availableTemplates[0].id);
      setCurrentTemplateIndex(0);
    }
  }, [searchParams, availableTemplates]);

  // Agar form to'ldirilgan bo'lsa, preview qismiga o'tish
  useEffect(() => {
    if (formCompleted) {
      setActiveTab("preview");
    }
  }, [formCompleted]);

  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const validateDate = (dateStr: string): boolean => {
    if (!dateStr) return false;
    const selectedDate = new Date(dateStr);
    const tomorrow = new Date(getTomorrowDate());
    tomorrow.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate >= tomorrow;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "firstName" || name === "secondName" || name === "parents") {
      if (value.length > 20) {
        return;
      }
    } else if (name === "age") {
      if (!/^\d{0,3}$/.test(value)) {
        return;
      }
    } else if (name === "date") {
      if (value && !validateDate(value)) {
        setDateError("Sana ertangi kundan boshlab bo'lishi kerak");
      } else {
        setDateError(null);
      }
    } else if (name === "location" || name === "additionalInfo") {
      if (value.length > 30) {
        const limitedText = value.substring(0, 30);
        setFormData((prev) => ({ ...prev, [name]: limitedText }));
        return;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    checkFormCompletion();
  };

  const checkFormCompletion = () => {
    let isComplete = false;
    const isDateSelected = !!day && !!month;
    const isTimeSelected = !!hours && !!minutes;

    if (type === "wedding") {
      isComplete =
        !!formData.firstName &&
        !!formData.secondName &&
        isDateSelected &&
        isTimeSelected &&
        !!formData.location;
    } else if (type === "birthday") {
      isComplete =
        !!formData.firstName &&
        !!formData.age &&
        isDateSelected &&
        isTimeSelected &&
        !!formData.location;
    } else if (type === "funeral") {
      isComplete =
        !!formData.firstName &&
        isDateSelected &&
        isTimeSelected &&
        !!formData.location;
    } else if (type === "jubilee") {
      isComplete =
        !!formData.firstName &&
        !!formData.age &&
        isDateSelected &&
        isTimeSelected &&
        !!formData.location;
    } else if (type === "engagement") {
      isComplete =
        !!formData.firstName &&
        !!formData.parents &&
        isDateSelected &&
        isTimeSelected &&
        !!formData.location;
    }

    if (dateError && isComplete) {
      isComplete = false;
    }

    if (isComplete !== formCompleted) {
      setFormCompleted(isComplete);
    }
  };

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDay(tomorrow.getDate().toString());
    setMonth(tomorrow.getMonth().toString());
    setHours("12");
    setMinutes("00");
  }, []);

  useEffect(() => {
    const newFormData = { ...formData };
    let changed = false;

    if (day && month) {
      const today = new Date();
      const year = today.getFullYear();
      const newDate = new Date(
        year,
        Number.parseInt(month),
        Number.parseInt(day)
      );

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      if (newDate < tomorrow) {
        newDate.setFullYear(year + 1);
      }

      const formattedDate = newDate.toISOString().split("T")[0];
      newFormData.date = formattedDate;
      setDateError(null);
      changed = true;
    }

    if (hours && minutes) {
      const formattedTime = `${hours}:${minutes}`;
      newFormData.time = formattedTime;
      changed = true;
    }

    if (changed) {
      setFormData(newFormData);
      setTimeout(() => {
        checkFormCompletion();
      }, 0);
    }
  }, [day, month, hours, minutes]);

  useEffect(() => {
    if (formData.firstName || formData.location) {
      checkFormCompletion();
    }
  }, [formData, type]);

  const getInvitationTypeName = () => {
    switch (type) {
      case "wedding":
        return "To'y";
      case "birthday":
        return "Tug'ilgan kun";
      case "funeral":
        return "El oshi";
      case "jubilee":
        return "Yubiley";
      case "engagement":
        return "Qiz uzatish";
      default:
        return "Taklifnoma";
    }
  };

  const handlePreviousTemplate = () => {
    const newIndex =
      currentTemplateIndex > 0
        ? currentTemplateIndex - 1
        : availableTemplates.length - 1;
    setCurrentTemplateIndex(newIndex);
    setSelectedTemplate(availableTemplates[newIndex].id);
  };

  const handleNextTemplate = () => {
    const newIndex =
      currentTemplateIndex < availableTemplates.length - 1
        ? currentTemplateIndex + 1
        : 0;
    setCurrentTemplateIndex(newIndex);
    setSelectedTemplate(availableTemplates[newIndex].id);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-16 pb-24">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-600 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="space-y-6"
          >
            <h1 className="text-3xl font-bold text-center mt-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              {getInvitationTypeName()} taklifnomasi
            </h1>

            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center text-gray-400 hover:text-white hover:bg-gray-800/50"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Orqaga
            </Button>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-6"
            >
              <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 border border-gray-700 p-1">
                <TabsTrigger
                  value="form"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-white"
                >
                  Ma'lumotlar
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  disabled={!formCompleted}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Ko'rinish
                </TabsTrigger>
              </TabsList>

              <TabsContent value="form" className="mt-6">
                <FormSection
                  type={type as string}
                  formData={formData}
                  day={day}
                  month={month}
                  hours={hours}
                  minutes={minutes}
                  dateError={dateError}
                  onInputChange={handleInputChange}
                  onDayChange={setDay}
                  onMonthChange={setMonth}
                  onHoursChange={setHours}
                  onMinutesChange={setMinutes}
                />

                <div className="mt-6 flex justify-end mb-8">
                  <Button
                    onClick={() => setActiveTab("preview")}
                    disabled={!formCompleted}
                    className={`bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 ${
                      !formCompleted
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:from-purple-700 hover:to-pink-700"
                    }`}
                  >
                    Keyingisi
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="mt-6">
                {!formCompleted ? (
                  <div className="text-center py-8 text-gray-400">
                    <p>
                      Davom etish uchun avval barcha ma'lumotlarni to'ldiring
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Preview Container with Black Frame */}
                    <div className="bg-black rounded-lg p-4 md:p-6">
                      {/* Header with Navigation */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 text-white space-y-2 sm:space-y-0">
                        <h3 className="text-lg font-medium">
                          Taklifnoma ko'rinishi
                        </h3>
                        <h4 className="text-lg font-medium text-center sm:text-right">
                          {availableTemplates[currentTemplateIndex]?.name}
                        </h4>
                      </div>

                      {/* Preview Area with Side Navigation */}
                      <div className="relative">
                        {/* Left Arrow */}
                        <button
                          onClick={handlePreviousTemplate}
                          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
                        >
                          <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
                        </button>

                        {/* Right Arrow */}
                        <button
                          onClick={handleNextTemplate}
                          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
                        >
                          <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
                        </button>

                        {/* Preview Content - Full Width and Responsive */}
                        <div className="rounded-lg min-h-[400px] md:min-h-[600px] mx-8 md:mx-12 overflow-hidden">
                          <div className="w-full h-full">
                            <PreviewSection
                              type={type as string}
                              selectedTemplate={selectedTemplate}
                              formData={formData}
                              uploadedImage={null}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Template indicators */}
                      <div className="flex justify-center space-x-2 mt-6 overflow-x-auto pb-2">
                        {availableTemplates.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setCurrentTemplateIndex(index);
                              setSelectedTemplate(availableTemplates[index].id);
                            }}
                            className={`w-3 h-3 rounded-full transition-colors flex-shrink-0 ${
                              index === currentTemplateIndex
                                ? "bg-purple-500"
                                : "bg-gray-600 hover:bg-gray-500"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Payment Section */}
                    <PaymentSection
                      type={type as string}
                      selectedTemplate={selectedTemplate}
                      formData={formData}
                      uploadedImage={null}
                    />
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

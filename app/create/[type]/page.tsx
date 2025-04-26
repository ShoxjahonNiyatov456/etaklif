"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  X,
  ArrowLeft,
  Check,
  Share2,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import WeddingTemplate from "@/components/invitation-templates/WeddingTemplate";
import BirthdayTemplate from "@/components/invitation-templates/BirthdayTemplate";
import FuneralTemplate from "@/components/invitation-templates/FuneralTemplate";
import JubileeTemplate from "@/components/invitation-templates/JubileeTemplate";
import EngagementTemplate from "@/components/invitation-templates/EngagementTemplate";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShareModal } from "@/components/ui/share-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreatePage() {
  const params = useParams();
  const router = useRouter();
  const { type } = params;

  const [activeTab, setActiveTab] = useState("form");
  const [formCompleted, setFormCompleted] = useState(false);
  const [templateSelected, setTemplateSelected] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
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
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Kun va oy uchun alohida state'lar
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");

  // O'zbek tilidagi oylar ro'yxati
  const months = [
    { value: "0", label: "Yanvar" },
    { value: "1", label: "Fevral" },
    { value: "2", label: "Mart" },
    { value: "3", label: "Aprel" },
    { value: "4", label: "May" },
    { value: "5", label: "Iyun" },
    { value: "6", label: "Iyul" },
    { value: "7", label: "Avgust" },
    { value: "8", label: "Sentyabr" },
    { value: "9", label: "Oktyabr" },
    { value: "10", label: "Noyabr" },
    { value: "11", label: "Dekabr" },
  ];

  // Kunlarni generatsiya qilish (1-31)
  const days = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
  }));

  // Soatlarni generatsiya qilish (0-23)
  const hoursOptions = Array.from({ length: 24 }, (_, i) => ({
    value: String(i).padStart(2, "0"),
    label: String(i).padStart(2, "0"),
  }));

  const minutesOptions = [
    { value: "00", label: "00" },
    { value: "15", label: "15" },
    { value: "30", label: "30" },
    { value: "45", label: "45" },
  ];

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
    const requiredFields = ["firstName", "date", "time", "location"];
    if (type === "wedding") requiredFields.push("secondName");
    if (type === "birthday" || type === "jubilee") requiredFields.push("age");
    if (type === "engagement") requiredFields.push("parents");

    const isComplete =
      requiredFields.every(
        (field) => formData[field as keyof typeof formData]?.trim() !== ""
      ) && !dateError;

    setFormCompleted(isComplete);
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setTemplateSelected(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearUploadedImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getTemplates = () => {
    switch (type) {
      case "wedding":
        return [
          {
            id: "floral-gold",
            name: "Guldor oltin",
            style: "floral-gold",
            hasImageUpload: false,
          },
          {
            id: "elegant-frame",
            name: "Elegant ramka",
            style: "elegant-frame",
            hasImageUpload: false,
          },
          {
            id: "blue-floral",
            name: "Ko'k guldor",
            style: "blue-floral",
            hasImageUpload: false,
          },
          {
            id: "golden-ornament",
            name: "Oltin naqsh",
            style: "golden-ornament",
            hasImageUpload: false,
          },
          {
            id: "floral-hexagon",
            name: "Guldor olti burchak",
            style: "floral-hexagon",
            hasImageUpload: false,
          },
        ];
      case "birthday":
        return [
          {
            id: "colorful",
            name: "Rang-barang",
            style: "colorful",
            hasImageUpload: false,
          },
          {
            id: "kids",
            name: "Bolalar uchun",
            style: "kids",
            hasImageUpload: false,
          },
          {
            id: "floral-frame",
            name: "Guldor ramka",
            style: "floral-frame",
            hasImageUpload: false,
          },
          {
            id: "butterfly",
            name: "Kapalaklar",
            style: "butterfly",
            hasImageUpload: false,
          },
          {
            id: "kids-photo",
            name: "Bolalar suratli",
            style: "kids-photo",
            hasImageUpload: true,
          },
          {
            id: "unicorn",
            name: "Yoltoq",
            style: "unicorn",
            hasImageUpload: false,
          },
        ];
      case "funeral":
        return [
          {
            id: "traditional",
            name: "An'anaviy",
            style: "traditional",
            hasImageUpload: false,
          },
          { id: "calm", name: "Sokin", style: "calm", hasImageUpload: false },
          {
            id: "photo-memorial",
            name: "Suratli xotira",
            style: "photo-memorial",
            hasImageUpload: true,
          },
          {
            id: "elegant-memorial",
            name: "Elegant xotira",
            style: "elegant-memorial",
            hasImageUpload: true,
          },
          {
            id: "islamic-memorial",
            name: "Islomiy uslub",
            style: "islamic-memorial",
            hasImageUpload: true,
          },
        ];
      case "jubilee":
        return [
          {
            id: "celebration",
            name: "Tantanali",
            style: "celebration",
            hasImageUpload: false,
          },
          {
            id: "elegant",
            name: "Elegant",
            style: "elegant",
            hasImageUpload: false,
          },
          {
            id: "geometric-floral",
            name: "Geometrik guldor",
            style: "geometric-floral",
            hasImageUpload: false,
          },
          {
            id: "blue-floral",
            name: "Ko'k guldor",
            style: "blue-floral",
            hasImageUpload: false,
          },
          {
            id: "photo-frame",
            name: "Suratli ramka",
            style: "photo-frame",
            hasImageUpload: true,
          },
        ];
      case "engagement":
        return [
          {
            id: "romantic",
            name: "Romantik",
            style: "romantic",
            hasImageUpload: false,
          },
          {
            id: "national",
            name: "Milliy",
            style: "national",
            hasImageUpload: false,
          },
          {
            id: "floral-engagement",
            name: "Guldor",
            style: "floral-engagement",
            hasImageUpload: true,
          },
          {
            id: "modern-engagement",
            name: "Zamonaviy",
            style: "modern-engagement",
            hasImageUpload: true,
          },
          {
            id: "traditional-engagement",
            name: "An'anaviy",
            style: "traditional-engagement",
            hasImageUpload: true,
          },
        ];
      default:
        return [];
    }
  };

  const templates = getTemplates();
  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate);
  const hasImageUpload = selectedTemplateData?.hasImageUpload || false;
  useEffect(() => {
    if (templates.length > 0 && !selectedTemplate) {
      setSelectedTemplate(templates[0].id);
    }
  }, [templates, selectedTemplate]);
  useEffect(() => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [selectedTemplate]);
  useEffect(() => {
    checkFormCompletion();
  }, [formData, type]);

  // Sana va vaqt o'zgarishlarini kuzatish
  useEffect(() => {
    if (day && month) {
      const currentYear = new Date().getFullYear();
      const dateObj = new Date(currentYear, parseInt(month), parseInt(day));
      setFormData((prev) => ({
        ...prev,
        date: dateObj.toISOString().split("T")[0],
      }));
      setDateError(null);
    }
  }, [day, month]);

  useEffect(() => {
    if (hours && minutes) {
      setFormData((prev) => ({
        ...prev,
        time: `${hours}:${minutes}`,
      }));
    }
  }, [hours, minutes]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

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

  const handleProceedToTemplates = () => {
    setActiveTab("templates");
  };

  const handleProceedToPreview = () => {
    setActiveTab("preview");
  };

  const formatDateForDisplay = (dateString: string) => {
    const months = [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avgust",
      "Sentyabr",
      "Oktyabr",
      "Noyabr",
      "Dekabr",
    ];

    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = months[date.getMonth()];
      return `${day} ${month}`;
    } catch (error) {
      return dateString;
    }
  };

  const renderTemplatePreview = () => {
    const templateStyle =
      templates.find((t) => t.id === selectedTemplate)?.style || "";

    const wrappedLocationText = formData.location
      ? formData.location.substring(0, 30)
      : "";

    const wrappedAdditionalInfo = formData.additionalInfo
      ? formData.additionalInfo.substring(0, 30)
      : "";

    const formattedDate = formatDateForDisplay(formData.date);

    switch (type) {
      case "wedding":
        return (
          <WeddingTemplate
            style={templateStyle}
            firstName={formData.firstName}
            secondName={formData.secondName}
            date={formattedDate}
            time={formData.time}
            location={wrappedLocationText}
            additionalInfo={wrappedAdditionalInfo}
          />
        );
      case "birthday":
        return (
          <BirthdayTemplate
            style={templateStyle}
            firstName={formData.firstName}
            age={formData.age}
            date={formattedDate}
            time={formData.time}
            location={wrappedLocationText}
            additionalInfo={wrappedAdditionalInfo}
            uploadedImage={uploadedImage || undefined}
          />
        );
      case "funeral":
        return (
          <FuneralTemplate
            style={templateStyle}
            firstName={formData.firstName}
            date={formattedDate}
            time={formData.time}
            location={wrappedLocationText}
            additionalInfo={wrappedAdditionalInfo}
            uploadedImage={uploadedImage || undefined}
          />
        );
      case "jubilee":
        return (
          <JubileeTemplate
            style={templateStyle}
            firstName={formData.firstName}
            age={formData.age}
            date={formattedDate}
            time={formData.time}
            location={wrappedLocationText}
            additionalInfo={wrappedAdditionalInfo}
            uploadedImage={uploadedImage || undefined}
          />
        );
      case "engagement":
        return (
          <EngagementTemplate
            style={templateStyle}
            firstName={formData.firstName}
            parents={formData.parents}
            date={formattedDate}
            time={formData.time}
            location={wrappedLocationText}
            additionalInfo={wrappedAdditionalInfo}
            uploadedImage={uploadedImage || undefined}
          />
        );
      default:
        return <div>Shablon topilmadi</div>;
    }
  };

  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [shareableLink, setShareableLink] = useState("");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handlePayment = async () => {
    try {
      setPaymentProcessing(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setPaymentCompleted(true);

      const invitationData = {
        firstName: formData.firstName,
        secondName: formData.secondName,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        additionalInfo: formData.additionalInfo,
        age: formData.age,
        parents: formData.parents,
        uploadedImage: uploadedImage,
      };

      const { generateShareableLink } = await import("@/app/services/share");
      const link = await generateShareableLink(
        type as string,
        selectedTemplate,
        invitationData
      );

      setShareableLink(link);
    } catch (error) {
      console.error("To'lov jarayonida xatolik:", error);
      alert(
        "To'lov jarayonida xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring."
      );
    } finally {
      setPaymentProcessing(false);
    }
  };

  const handleShareInvitation = () => {
    if (typeof window !== "undefined") {
      setIsShareModalOpen(true);
    }
  };

  const countChars = (text: string): number => {
    return text.length;
  };

  // Render sana qismi
  const renderDateSection = () => {
    return (
      <div>
        <label className="form-label">Sana</label>
        <div className="grid grid-cols-2 gap-2">
          <Select value={day} onValueChange={(value) => setDay(value)}>
            <SelectTrigger className="w-full border border-slate-300 ">
              <SelectValue
                placeholder="Kun"
                className="text-slate-300 bg-white"
              />
            </SelectTrigger>
            <SelectContent>
              {days.map((d) => (
                <SelectItem key={d.value} value={d.value}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={month} onValueChange={(value) => setMonth(value)}>
            <SelectTrigger className="w-full border border-slate-300">
              <SelectValue placeholder="Oy" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {dateError && (
          <div className="text-red-500 text-xs mt-1">{dateError}</div>
        )}
      </div>
    );
  };

  // Render vaqt qismi
  const renderTimeSection = () => {
    return (
      <div>
        <label className="form-label">Vaqt</label>
        <div className="grid grid-cols-2 gap-2">
          <Select value={hours} onValueChange={(value) => setHours(value)}>
            <SelectTrigger className="w-full border border-slate-300">
              <SelectValue placeholder="Soat" />
            </SelectTrigger>
            <SelectContent>
              {hoursOptions.map((h) => (
                <SelectItem key={h.value} value={h.value}>
                  {h.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={minutes} onValueChange={(value) => setMinutes(value)}>
            <SelectTrigger className="w-full border border-slate-300">
              <SelectValue placeholder="Daqiqa" />
            </SelectTrigger>
            <SelectContent>
              {minutesOptions.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-16 pb-24">
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-4"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-primar
            y-600 mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Orqaga
          </button>
          <h1 className="text-2xl font-bold mb-1">
            {getInvitationTypeName()} taklifnomasi
          </h1>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger
              value="form"
              disabled={activeTab !== "form" && !formCompleted}
            >
              Ma'lumotlar
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              disabled={
                activeTab !== "templates" &&
                (!formCompleted || activeTab === "form")
              }
            >
              Shablonlar
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              disabled={
                activeTab !== "preview" && (!templateSelected || !formCompleted)
              }
            >
              Ko'rinish
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="mt-0">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <form className="space-y-4">
                {type === "wedding" && (
                  <>
                    <div>
                      <label htmlFor="firstName" className="form-label">
                        Kelin ismi
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Mubina Bonu"
                        className="form-input"
                        maxLength={20}
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {`${formData.firstName.length}/20 ta belgi`}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="secondName" className="form-label">
                        Kuyov ismi
                      </label>
                      <input
                        type="text"
                        id="secondName"
                        name="secondName"
                        value={formData.secondName}
                        onChange={handleInputChange}
                        placeholder="Sardorjon"
                        className="form-input"
                        maxLength={20}
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {`${formData.secondName.length}/20 ta belgi`}
                      </div>
                    </div>
                  </>
                )}

                {type === "birthday" && (
                  <div>
                    <label htmlFor="firstName" className="form-label">
                      Tug'ilgan kun egasi
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="To'liq ismni kiriting"
                      className="form-input"
                      maxLength={20}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {`${formData.firstName.length}/20 ta belgi`}
                    </div>
                    <div className="mt-4">
                      <label htmlFor="age" className="form-label">
                        Yoshi
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Necha yoshga to'layotganini kiriting"
                        className="form-input"
                        max={999}
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        Maksimal 3 xonali son
                      </div>
                    </div>
                  </div>
                )}

                {type === "funeral" && (
                  <div>
                    <label htmlFor="firstName" className="form-label">
                      Marhumning ismi
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Marhumning to'liq ismini kiriting"
                      className="form-input"
                      maxLength={20}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {`${formData.firstName.length}/20 ta belgi`}
                    </div>
                  </div>
                )}

                {type === "jubilee" && (
                  <>
                    <div>
                      <label htmlFor="firstName" className="form-label">
                        Yubilyar ismi
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Yubilyarning to'liq ismini kiriting"
                        className="form-input"
                        maxLength={20}
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {`${formData.firstName.length}/20 ta belgi`}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="age" className="form-label">
                        Yoshi
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Yoshi"
                        className="form-input"
                        max={999}
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        Maksimal 3 xonali son
                      </div>
                    </div>
                  </>
                )}

                {type === "engagement" && (
                  <>
                    <div>
                      <label htmlFor="firstName" className="form-label">
                        Qiz ismi
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Qizning to'liq ismini kiriting"
                        className="form-input"
                        maxLength={20}
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {`${formData.firstName.length}/20 ta belgi`}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="parents" className="form-label">
                        Qizning ota-onasi
                      </label>
                      <input
                        type="text"
                        id="parents"
                        name="parents"
                        value={formData.parents}
                        onChange={handleInputChange}
                        placeholder="Ota-onasining ismlarini kiriting"
                        className="form-input"
                        maxLength={20}
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {`${formData.parents.length}/20 ta belgi`}
                      </div>
                    </div>
                  </>
                )}

                {/* Sana navbar ko'rinishida */}
                {renderDateSection()}

                {/* Vaqt navbar ko'rinishida */}
                {renderTimeSection()}

                <div>
                  <label htmlFor="location" className="form-label">
                    Manzil
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Asr To'yxonasi"
                    className={`form-input ${countChars(formData.location) >= 30
                      ? "border-red-500"
                      : ""
                      }`}
                    maxLength={30}
                  />
                  <div className="text-xs flex justify-between mt-1">
                    <span
                      className={`${countChars(formData.location) >= 30
                        ? "text-red-500 font-medium"
                        : "text-gray-500"
                        }`}
                    >
                      {`${countChars(formData.location)}/30 belgi`}
                    </span>
                    {countChars(formData.location) >= 30 && (
                      <span className="text-red-500 font-medium">
                        Maksimal limit!
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="additionalInfo" className="form-label">
                    Qo'shimcha ma'lumot
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Yoshlarizmi Baxtli Bo'lishsin"
                    className={`form-input ${countChars(formData.additionalInfo) >= 30
                      ? "border-red-500"
                      : ""
                      }`}
                    maxLength={30}
                  ></textarea>
                  <div className="text-xs flex justify-between mt-1">
                    <span
                      className={`${countChars(formData.additionalInfo) >= 30
                        ? "text-red-500 font-medium"
                        : "text-gray-500"
                        }`}
                    >
                      {`${countChars(formData.additionalInfo)}/30 belgi`}
                    </span>
                    {countChars(formData.additionalInfo) >= 30 && (
                      <span className="text-red-500 font-medium">
                        Maksimal limit!
                      </span>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {formCompleted && (
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-10">
                <Button onClick={handleProceedToTemplates} className="w-full">
                  Davom etish
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="templates" className="mt-0">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <div className={`${uploadedImage ? "flex gap-3" : ""}`}>
                <div className={`${uploadedImage ? "w-[350px]" : ""}`}>
                  <div className="grid grid-cols-1 gap-2 mb-3 sm:grid-cols-2">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`border rounded-lg p-1 cursor-pointer transition-colors relative ${selectedTemplate === template.id
                          ? "border-primary-500 shadow-md"
                          : "border-gray-200 hover:border-primary-300"
                          }`}
                        onClick={() => handleTemplateSelect(template.id)}
                      >
                        <div className="h-14 w-full flex items-center justify-center">
                          <p className="text-xs font-medium">{template.name}</p>
                        </div>
                        {template.hasImageUpload && (
                          <div className="absolute top-1 left-1">
                            <div className="bg-blue-100 text-blue-600 p-0.5 rounded-full">
                              <Upload className="h-3 w-3" />
                            </div>
                          </div>
                        )}
                        {selectedTemplate === template.id && (
                          <div className="absolute top-1 right-1">
                            <div className="bg-primary-100 text-primary-600 p-0.5 rounded-full">
                              <Check className="h-3 w-3" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {hasImageUpload && !uploadedImage && (
                    <div className="mt-3">
                      <label className="form-label">Rasm yuklash</label>
                      <div className="mt-2">
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            ref={fileInputRef}
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center mx-auto"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Rasm tanlash
                          </button>
                          <p className="text-xs text-gray-500 mt-2">
                            JPG, PNG formatidagi rasmlar
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {uploadedImage && (
                  <div className="flex-1">
                    <div className="flex justify-end mb-2">
                      <button
                        type="button"
                        onClick={clearUploadedImage}
                        className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="relative w-full">
                      <img
                        src={uploadedImage}
                        alt="Yuklangan rasm"
                        className="max-w-[300px] h-auto max-h-[300px] object-contain mx-auto border border-gray-200 rounded-lg shadow-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {templateSelected && (
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-10">
                <Button onClick={handleProceedToPreview} className="w-full">
                  Davom etish
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="preview" className="mt-0">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">
                  Taklifnoma ko'rinishi
                </h2>
                <div className="max-w-md mx-auto">
                  {renderTemplatePreview()}
                </div>
              </div>

              <div className="mt-8 border-t pt-6">
                {!paymentCompleted ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                      <h3 className="text-lg font-semibold mb-2 text-amber-800">
                        To'lov qilinmagan
                      </h3>
                      <p className="text-amber-700 text-sm mb-2">
                        Taklifnomani to'liq ko'rish va yuklab olish uchun
                        to'lovni amalga oshiring.
                      </p>
                      <Button
                        className="w-full"
                        onClick={handlePayment}
                        disabled={paymentCompleted || paymentProcessing}
                      >
                        {paymentProcessing ? (
                          <span className="flex items-center">
                            <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent mr-2"></div>
                            To'lov jarayoni...
                          </span>
                        ) : paymentCompleted ? (
                          <span className="flex items-center">
                            <Check className="h-4 w-4 mr-2" /> To'lov qilindi
                          </span>
                        ) : (
                          "To'lovni amalga oshirish"
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                      <h3 className="text-lg font-semibold mb-2 text-green-800">
                        To'lov muvaffaqiyatli amalga oshirildi
                      </h3>
                      <p className="text-green-700 text-sm mb-4">
                        Endi taklifnomangizni do'stlaringiz va yaqinlaringiz
                        bilan ulashishingiz mumkin.
                      </p>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Taklifnoma havolasi
                        </label>
                        <Button
                          onClick={handleShareInvitation}
                          className="w-full"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Ulashish
                        </Button>
                      </div>

                      <p className="text-xs text-gray-500">
                        Ulashish tugmasini bosganingizda havola nusxalanadi va
                        ulashish uchun oyna ochiladi
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={
          typeof window !== "undefined"
            ? window.location.origin + shareableLink
            : shareableLink
        }
        title={`${getInvitationTypeName()} taklifnomasi`}
      />
    </div>
  );
}

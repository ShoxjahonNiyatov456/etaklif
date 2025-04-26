"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, ExternalLink, Download, Check } from "lucide-react";

export default function CreatePage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
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

  useEffect(() => {
    setSelectedTemplate(null);
  }, [selectedType]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Validation rules for different fields
    if (name === "firstName" || name === "secondName" || name === "parents") {
      if (value.length > 20) {
        return;
      }
    } else if (name === "age") {
      if (!/^\d{0,3}$/.test(value)) {
        return;
      }
    } else if (name === "date") {
      const yearPart = value.split("-")[0];
      if (yearPart && yearPart.length > 4) {
        return;
      }
    } else if (name === "location" || name === "additionalInfo") {
      const words = value
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
      if (words.length > 20) {
        const currentWords = formData[name as keyof typeof formData]
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0);
        if (currentWords.length >= 20) {
          return;
        }
        const limitedText = words.slice(0, 20).join(" ");
        setFormData((prev) => ({ ...prev, [name]: limitedText }));
        return;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const countWords = (text: string): number => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const invitationTypes = [
    { id: "wedding", name: "To'y" },
    { id: "birthday", name: "Tug'ilgan kun" },
    { id: "funeral", name: "El oshi" },
    { id: "jubilee", name: "Yubiley" },
    { id: "engagement", name: "Qiz uzatish" },
  ];

  const getTemplates = () => {
    switch (selectedType) {
      case "wedding":
        return [
          { id: 1, name: "Klassik guldor", style: "floral", color: "pink" },
          { id: 3, name: "Oltin bezakli", style: "gold", color: "gold" },
          { id: 5, name: "Geometrik", style: "geometric", color: "purple" },
        ];
      case "birthday":
        return [
          { id: 1, name: "Bayramona", style: "festive", color: "colorful" },
          { id: 2, name: "Bolalar uchun", style: "kids", color: "bright" },
          { id: 3, name: "Elegant", style: "elegant", color: "black" },
          { id: 4, name: "Tabiat uslubida", style: "nature", color: "green" },
          { id: 5, name: "Retro", style: "retro", color: "orange" },
        ];
      case "funeral":
        return [
          { id: 1, name: "An'anaviy", style: "traditional", color: "white" },
          { id: 2, name: "Sokin", style: "calm", color: "lightblue" },
          { id: 3, name: "Klassik", style: "classic", color: "gray" },
          { id: 4, name: "Diniy", style: "religious", color: "white" },
        ];
      case "jubilee":
        return [
          { id: 1, name: "Tantanali", style: "celebration", color: "gold" },
          { id: 2, name: "Elegant", style: "elegant", color: "silver" },
          { id: 3, name: "Zamonaviy", style: "modern", color: "blue" },
          { id: 4, name: "Vintage", style: "vintage", color: "sepia" },
          { id: 5, name: "Milliy", style: "national", color: "multicolor" },
        ];
      case "engagement":
        return [
          { id: 1, name: "Romantik", style: "romantic", color: "pink" },
          { id: 2, name: "Milliy", style: "national", color: "red" },
          { id: 3, name: "Zamonaviy", style: "modern", color: "purple" },
          { id: 4, name: "Klassik", style: "classic", color: "white" },
          { id: 5, name: "Guldor", style: "floral", color: "pastel" },
        ];
      default:
        return [];
    }
  };

  const templates = getTemplates();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const getTemplateStyleClass = () => {
    if (!selectedTemplate) return "floral-border paper-bg";

    const template = templates.find((t) => t.id === selectedTemplate);
    if (!template) return "floral-border paper-bg";

    switch (template.style) {
      case "minimal":
        return "minimal-template bg-white";
      case "gold":
        return "gold-template paper-bg";
      case "vintage":
        return "vintage-template vintage-bg";
      case "geometric":
        return "geometric-template paper-bg";
      case "festive":
        return "festive-template paper-bg";
      case "elegant":
        return "elegant-template paper-bg";
      case "nature":
        return "nature-template paper-bg";
      case "traditional":
        return "traditional-template paper-bg";
      case "celebration":
        return "celebration-template paper-bg";
      case "romantic":
        return "romantic-template paper-bg";
      case "national":
        return "national-template paper-bg";
      case "modern":
        return "modern-template paper-bg";
      default:
        return "floral-border paper-bg";
    }
  };
  const getTemplateColorClass = () => {
    if (!selectedTemplate) return "text-gray-800";

    const template = templates.find((t) => t.id === selectedTemplate);
    if (!template) return "text-gray-800";

    switch (template.color) {
      case "blue":
        return "text-blue-800";
      case "gold":
        return "text-amber-700";
      case "beige":
        return "text-amber-800";
      case "purple":
        return "text-purple-800";
      case "colorful":
        return "text-pink-600";
      case "bright":
        return "text-blue-600";
      case "black":
        return "text-gray-900";
      case "green":
        return "text-green-700";
      case "orange":
        return "text-orange-600";
      case "white":
        return "text-gray-700";
      case "lightblue":
        return "text-blue-600";
      case "gray":
        return "text-gray-600";
      case "silver":
        return "text-gray-500";
      case "sepia":
        return "text-amber-800";
      case "multicolor":
        return "text-purple-700";
      case "red":
        return "text-red-600";
      case "pastel":
        return "text-pink-500";
      default:
        return "text-gray-800";
    }
  };

  const getFontFamilyClass = () => {
    if (!selectedTemplate) return "font-serif";

    const template = templates.find((t) => t.id === selectedTemplate);
    if (!template) return "font-serif";

    switch (template.style) {
      case "minimal":
        return "font-sans";
      case "gold":
        return "font-serif";
      case "vintage":
        return "font-serif";
      case "geometric":
        return "font-sans";
      case "festive":
        return "font-cursive";
      case "elegant":
        return "font-serif";
      case "modern":
        return "font-sans";
      default:
        return "font-serif";
    }
  };

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Taklifnoma yaratish</h1>
          <p className="text-gray-600">
            Taklifnoma turini tanlang va ma'lumotlarni kiriting
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h2 className="font-semibold text-lg mb-4">Taklifnoma turlari</h2>
              <div className="space-y-2">
                {invitationTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`w-full text-left px-4 py-3 rounded-md transition-colors ${selectedType === type.id
                      ? "bg-primary-100 text-primary-700 font-medium"
                      : "hover:bg-gray-100"
                      }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <a
                  href="https://t.me/taklifnoma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Yangi tur so'rash
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </div>

          {selectedType ? (
            <>
              <div className="md:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="font-semibold text-lg mb-4">
                    Ma'lumotlarni kiriting
                  </h2>
                  <form className="space-y-4">
                    {selectedType === "wedding" && (
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

                    {selectedType === "birthday" && (
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

                    {selectedType === "funeral" && (
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

                    {selectedType === "jubilee" && (
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
                          />
                        </div>
                      </>
                    )}

                    {selectedType === "engagement" && (
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
                          />
                        </div>
                      </>
                    )}

                    {/* Common fields for all invitation types */}
                    <div>
                      <label htmlFor="date" className="form-label">
                        Sana
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label htmlFor="time" className="form-label">
                        Vaqt
                      </label>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>

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
                        className={`form-input ${countWords(formData.location) >= 30
                          ? "border-red-500"
                          : ""
                          }`}
                      />
                      <div className="text-xs flex justify-between mt-1">
                        <span
                          className={`${countWords(formData.location) >= 30
                            ? "text-red-500 font-medium"
                            : "text-gray-500"
                            }`}
                        >
                          {`${countWords(formData.location)}/30 so'z`}
                        </span>
                        {countWords(formData.location) >= 30 && (
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
                        className={`form-input ${countWords(formData.additionalInfo) >= 30
                          ? "border-red-500"
                          : ""
                          }`}
                      ></textarea>
                      <div className="text-xs flex justify-between mt-1">
                        <span
                          className={`${countWords(formData.additionalInfo) >= 30
                            ? "text-red-500 font-medium"
                            : "text-gray-500"
                            }`}
                        >
                          {`${countWords(formData.additionalInfo)}/30 so'z`}
                        </span>
                        {countWords(formData.additionalInfo) >= 30 && (
                          <span className="text-red-500 font-medium">
                            Maksimal limit!
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        className="btn-primary w-full flex items-center justify-center"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Taklifnomani yuklab olish
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Templates section */}
              <div className="md:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-full">
                  <h2 className="font-semibold text-lg mb-4">
                    Taklifnoma shabloni
                  </h2>

                  <div className="h-[500px] overflow-y-auto pr-2 mb-6">
                    <div className="grid grid-cols-1 gap-4">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          className={`border rounded-lg p-2 cursor-pointer transition-colors ${selectedTemplate === template.id
                            ? "border-primary-500 shadow-md"
                            : "border-gray-200 hover:border-primary-300"
                            }`}
                          onClick={() => setSelectedTemplate(template.id)}
                        >
                          <div className="flex items-center">
                            <div className="relative h-24 w-24 flex-shrink-0">
                              <div
                                className={`absolute inset-0 rounded-md ${template.style}-thumbnail`}
                              ></div>
                            </div>
                            <div className="ml-4 flex-grow">
                              <p className="font-medium">{template.name}</p>
                              <p className="text-sm text-gray-500">
                                {selectedType === "wedding" && "To'y uchun"}
                                {selectedType === "birthday" &&
                                  "Tug'ilgan kun uchun"}
                                {selectedType === "funeral" && "El oshi uchun"}
                                {selectedType === "jubilee" && "Yubiley uchun"}
                                {selectedType === "engagement" &&
                                  "Qiz uzatish uchun"}
                              </p>
                            </div>
                            {selectedTemplate === template.id && (
                              <div className="ml-auto">
                                <div className="bg-primary-100 text-primary-600 p-1 rounded-full">
                                  <Check className="h-5 w-5" />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="md:col-span-4 flex items-center justify-center bg-white p-10 rounded-lg shadow-sm border border-gray-200">
              <div className="text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mx-auto"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">
                  Taklifnoma turini tanlang
                </h3>
                <p className="text-gray-500 max-w-md">
                  Yaratmoqchi bo'lgan taklifnoma turini chap tomondagi
                  ro'yxatdan tanlang
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {selectedType && (
        <div className="bg-gray-50 py-10 mt-10 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Taklifnoma namunasi
            </h2>

            <div className="max-w-md mx-auto">
              <div
                className={`rounded-lg p-8 invitation-card ${getTemplateStyleClass()}`}
              >
                <div
                  className={`text-center space-y-6 relative z-10 ${getTemplateColorClass()}`}
                >
                  <div className={`${getFontFamilyClass()} text-lg`}>
                    Hurmat bilan,
                  </div>

                  <div className="space-y-1">
                    <div className="uppercase tracking-wide text-sm">
                      {selectedType === "wedding" && "TO'Y MAROSIMIGA"}
                      {selectedType === "birthday" && "TUG'ILGAN KUN BAZMI"}
                      {selectedType === "funeral" && "EL OSHI MAROSIMI"}
                      {selectedType === "jubilee" && "YUBILEY TANTANASI"}
                      {selectedType === "engagement" && "QIZ UZATISH MAROSIMI"}
                    </div>
                    <h2
                      className={`${getFontFamilyClass()} text-3xl font-medium`}
                    >
                      {formData.firstName || "Aziza Karimova"}
                    </h2>
                    {(selectedType === "wedding" ||
                      selectedType === "engagement") && (
                        <>
                          <div className="font-cursive text-xl my-2">va</div>
                          <h2
                            className={`${getFontFamilyClass()} text-3xl font-medium`}
                          >
                            {formData.secondName || "Jasur Aliyev"}
                          </h2>
                        </>
                      )}
                    {selectedType === "birthday" && formData.age && (
                      <div className="font-cursive text-xl my-2">
                        {formData.age} yosh
                      </div>
                    )}
                    {selectedType === "jubilee" && formData.age && (
                      <div className="font-cursive text-xl my-2">
                        {formData.age} yillik yubiley
                      </div>
                    )}
                  </div>

                  <div className="pt-4">
                    <div>
                      <p className="mb-1">
                        {formData.date
                          ? new Date(formData.date).toLocaleDateString(
                            "uz-UZ",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                          : "2023-yil 15-iyun"}{" "}
                        | {formData.time || "18:00"}
                      </p>
                      <p>{formData.location || '"Shodlik" to\'yxonasi,'}</p>
                      <p>
                        {formData.location
                          ? ""
                          : "Toshkent sh., Yunusobod tumani"}
                      </p>
                    </div>
                  </div>

                  {formData.additionalInfo && (
                    <div className="pt-2 text-sm">
                      <p>{formData.additionalInfo}</p>
                    </div>
                  )}

                  <div className={`${getFontFamilyClass()} text-sm pt-4`}>
                    Tashrif buyurishingizni so'raymiz
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

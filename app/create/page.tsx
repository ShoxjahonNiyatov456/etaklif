"use client";

import type React from "react";
import { useState, useEffect } from "react";

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
  useEffect(() => {
    const loadFormData = async () => {
      try {
        const response = await fetch('/api/form-data');
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setFormData(data);
          }
        }
      } catch (error) {
        console.error('Form ma\'lumotlarini yuklashda xatolik:', error);
      }
    };
    loadFormData();
  }, []);

  useEffect(() => {
    const saveFormData = async () => {
      try {
        await fetch('/api/form-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } catch (error) {
        console.error('Form ma\'lumotlarini saqlashda xatolik:', error);
      }
    };
    saveFormData();
  }, [formData]);

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
    <div className="pt-16 ">
      {selectedType && (
        <div className="bg-gray-50 py-10 mt-10 border-t border-gray-200 ">
          <div className="container mx-auto px-4 ">
            <h2 className="text-2xl font-bold mb-6 text-center ">
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
                      className={`${getFontFamilyClass()} text-3xl font-medium text-black`}
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

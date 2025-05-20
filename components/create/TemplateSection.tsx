"use client";

import type React from "react";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import { X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface TemplateSectionProps {
  type: string;
  selectedTemplate: string;
  uploadedImage: string | null;
  onTemplateSelect: (templateId: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearUploadedImage: () => void;
}

export default function TemplateSection({
  type,
  selectedTemplate,
  uploadedImage,
  onTemplateSelect,
  onImageUpload,
  onClearUploadedImage,
}: TemplateSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getTemplates = () => {
    switch (type) {
      case "wedding":
        return [
          {
            id: "burgundy-roses",
            name: "Qizil atirgullar",
            style: "burgundy-roses",
            hasImageUpload: false,
            color: "from-rose-800 to-rose-600",
          },
          {
            id: "peach-floral",
            name: "Shaftoli guldor",
            style: "peach-floral",
            hasImageUpload: false,
            color: "from-amber-800 to-amber-600",
          },
          {
            id: "golden-frame",
            name: "Oltin ramka",
            style: "golden-frame",
            hasImageUpload: false,
            color: "from-amber-400 to-gray-800",
          },
          {
            id: "colorful-garden",
            name: "Rang-barang bog'",
            style: "colorful-garden",
            hasImageUpload: false,
            color: "from-pink-900 to-pink-700",
          },
          {
            id: "watercolor-bouquet",
            name: "Akvarel guldasta",
            style: "watercolor-bouquet",
            hasImageUpload: false,
            color: "from-rose-800 to-rose-700",
          },
          {
            id: "pink-roses",
            name: "Pushti atirgullar",
            style: "pink-roses",
            hasImageUpload: false,
            color: "from-rose-800 to-rose-600",
          },
          {
            id: "rose-gold",
            name: "Pushti oltin",
            style: "rose-gold",
            hasImageUpload: false,
            color: "from-rose-800 to-rose-700",
          },
          {
            id: "elegant-corner",
            name: "Elegant burchak",
            style: "elegant-corner",
            hasImageUpload: false,
            color: "from-rose-800 to-rose-700",
          },
          {
            id: "elegant-frame",
            name: "Elegant ramka",
            style: "elegant-frame",
            hasImageUpload: false,
            color: "from-purple-500 to-pink-500",
          },
          {
            id: "blue-floral",
            name: "Ko'k guldor",
            style: "blue-floral",
            hasImageUpload: false,
            color: "from-blue-500 to-cyan-500",
          },
          {
            id: "golden-ornament",
            name: "Oltin naqsh",
            style: "golden-ornament",
            hasImageUpload: false,
            color: "from-yellow-500 to-amber-500",
          },
          {
            id: "vintage-ornament",
            name: "Vintage naqsh",
            style: "vintage-ornament",
            hasImageUpload: false,
            color: "from-teal-500 to-cyan-500",
          },
          {
            id: "floral-hexagon",
            name: "Guldor olti burchak",
            style: "floral-hexagon",
            hasImageUpload: false,
            color: "from-rose-500 to-pink-500",
          },
          {
            id: "blue-roses",
            name: "Ko'k atirgullar",
            style: "blue-roses",
            hasImageUpload: false,
            color: "from-blue-500 to-cyan-500",
          },
          {
            id: "elegant-script",
            name: "Elegant yozuv",
            style: "elegant-script",
            hasImageUpload: false,
            color: "from-purple-500 to-indigo-500",
          },
        ];
      case "birthday":
        return [
          {
            id: "colorful",
            name: "Rang-barang",
            style: "colorful",
            hasImageUpload: false,
            color: "from-pink-500 to-purple-500",
          },
          {
            id: "kids",
            name: "Bolalar uchun",
            style: "kids",
            hasImageUpload: false,
            color: "from-blue-500 to-cyan-500",
          },
          {
            id: "floral-frame",
            name: "Guldor ramka",
            style: "floral-frame",
            hasImageUpload: false,
            color: "from-green-500 to-emerald-500",
          },
          {
            id: "butterfly",
            name: "Kapalaklar",
            style: "butterfly",
            hasImageUpload: false,
            color: "from-purple-500 to-indigo-500",
          },
          {
            id: "kids-photo",
            name: "Bolalar suratli",
            style: "kids-photo",
            hasImageUpload: false,
            color: "from-cyan-500 to-blue-500",
          },
          {
            id: "unicorn",
            name: "Yoltoq",
            style: "unicorn",
            hasImageUpload: false,
            color: "from-pink-500 to-rose-500",
          },
        ];
      case "funeral":
        return [
          {
            id: "traditional",
            name: "An'anaviy",
            style: "traditional",
            hasImageUpload: false,
            color: "from-gray-500 to-slate-500",
          },
          {
            id: "calm",
            name: "Sokin",
            style: "calm",
            hasImageUpload: false,
            color: "from-blue-500 to-slate-500",
          },
          {
            id: "photo-memorial",
            name: "Go'zal xotira",
            style: "photo-memorial",
            hasImageUpload: false,
            color: "from-slate-500 to-gray-500",
          },

          {
            id: "islamic-memorial",
            name: "Islomiy uslub",
            style: "islamic-memorial",
            hasImageUpload: false,
            color: "from-green-500 to-emerald-500",
          },
        ];
      case "jubilee":
        return [
          {
            id: "classic",
            name: "Klassik",
            style: "classic",
            hasImageUpload: false,
            color: "from-amber-500 to-yellow-500",
          },
          {
            id: "modern",
            name: "Zamonaviy",
            style: "modern",
            hasImageUpload: false,
            color: "from-blue-500 to-cyan-500",
          },
          {
            id: "ornate",
            name: "Bezakli",
            style: "ornate",
            hasImageUpload: false,
            color: "from-purple-500 to-pink-500",
          },
          {
            id: "minimalist",
            name: "Minimalist",
            style: "minimalist",
            hasImageUpload: false,
            color: "from-gray-500 to-slate-500",
          },
          {
            id: "traditional",
            name: "An'anaviy",
            style: "traditional",
            hasImageUpload: false,
            color: "from-red-500 to-rose-500",
          },
          {
            id: "luxury",
            name: "Hashamatli",
            style: "luxury",
            hasImageUpload: false,
            color: "from-yellow-500 to-amber-500",
          },
          {
            id: "festive",
            name: "Bayramona",
            style: "festive",
            hasImageUpload: false,
            color: "from-pink-500 to-rose-500",
          },
          {
            id: "photo-centric",
            name: "Suratli",
            style: "photo-centric",
            hasImageUpload: false,
            color: "from-indigo-500 to-blue-500",
          },
          {
            id: "geometric",
            name: "Geometrik",
            style: "geometric",
            hasImageUpload: false,
            color: "from-cyan-500 to-teal-500",
          },
          {
            id: "nature",
            name: "Tabiat",
            style: "nature",
            hasImageUpload: false,
            color: "from-green-500 to-emerald-500",
          },
        ];
      case "engagement":
        return [
          {
            id: "romantic",
            name: "Romantik",
            style: "romantic",
            hasImageUpload: false,
            color: "from-pink-500 to-rose-500",
          },
          {
            id: "national",
            name: "Milliy",
            style: "national",
            hasImageUpload: false,
            color: "from-red-500 to-rose-500",
          },
          {
            id: "floral-engagement",
            name: "Guldor",
            style: "floral-engagement",
            hasImageUpload: false,
            color: "from-purple-500 to-pink-500",
          },
          {
            id: "modern-engagement",
            name: "Zamonaviy",
            style: "modern-engagement",
            hasImageUpload: false,
            color: "from-blue-500 to-indigo-500",
          },
          {
            id: "traditional-engagement",
            name: "An'anaviy",
            style: "traditional-engagement",
            hasImageUpload: false,
            color: "from-amber-500 to-yellow-500",
          },
        ];
      default:
        return [];
    }
  };

  const templates = getTemplates();
  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate);
  const hasImageUpload = selectedTemplateData?.hasImageUpload || false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg space-y-6"
    >
      <h3 className="text-xl font-semibold mb-4 text-white">
        Shablonni tanlang
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {templates.map((template, index) => (
          <motion.button
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => onTemplateSelect(template.id)}
            className={`p-4 rounded-xl transition-all duration-300 ${selectedTemplate === template.id
              ? "bg-gradient-to-br " +
              template.color +
              " text-white shadow-lg"
              : "bg-gray-900/50 border border-gray-700 text-gray-300 hover:border-gray-600"
              }`}
          >
            <div className="text-center">{template.name}</div>
          </motion.button>
        ))}
      </div>

      {hasImageUpload && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <Label className="text-gray-300">Rasm yuklash</Label>
            {uploadedImage && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearUploadedImage}
                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
              >
                <X className="h-4 w-4 mr-1" />
                O'chirish
              </Button>
            )}
          </div>
          {!uploadedImage ? (
            <div className="mt-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={onImageUpload}
                accept="image/*"
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="w-full h-32 border-2 border-dashed border-gray-700 bg-gray-900/30 rounded-lg flex flex-col items-center justify-center hover:border-purple-500/50 hover:bg-gray-900/50 transition-colors"
              >
                <ImageIcon className="h-8 w-8 mb-2 text-gray-500" />
                <span className="text-sm text-gray-400">Rasmni tanlang</span>
              </Button>
            </div>
          ) : (
            <div className="mt-3 relative rounded-lg overflow-hidden">
              <Image
                src={uploadedImage || "/placeholder.svg"}
                alt="Uploaded"
                width={1600} // Asl rasm kengligini taxminiy kiriting yoki dinamik o'rnating
                height={900} // Asl rasm balandligini taxminiy kiriting yoki dinamik o'rnating
                quality={75}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-40 object-contain bg-gray-900/50 rounded-lg border border-gray-700"
                style={{ aspectRatio: "16/9" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

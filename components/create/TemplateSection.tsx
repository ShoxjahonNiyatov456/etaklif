"use client";

import { useRef } from "react";
import { Upload, X } from "lucide-react";

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
                        id: "classic",
                        name: "Klassik",
                        style: "classic",
                        hasImageUpload: false,
                    },
                    {
                        id: "modern",
                        name: "Zamonaviy",
                        style: "modern",
                        hasImageUpload: false,
                    },
                    {
                        id: "ornate",
                        name: "Bezakli",
                        style: "ornate",
                        hasImageUpload: false,
                    },
                    {
                        id: "minimalist",
                        name: "Minimalist",
                        style: "minimalist",
                        hasImageUpload: false,
                    },
                    {
                        id: "traditional",
                        name: "An'anaviy",
                        style: "traditional",
                        hasImageUpload: true,
                    },
                    {
                        id: "luxury",
                        name: "Hashamatli",
                        style: "luxury",
                        hasImageUpload: false,
                    },
                    {
                        id: "festive",
                        name: "Bayramona",
                        style: "festive",
                        hasImageUpload: false,
                    },
                    {
                        id: "photo-centric",
                        name: "Suratli",
                        style: "photo-centric",
                        hasImageUpload: true,
                    },
                    {
                        id: "geometric",
                        name: "Geometrik",
                        style: "geometric",
                        hasImageUpload: false,
                    },
                    {
                        id: "nature",
                        name: "Tabiat",
                        style: "nature",
                        hasImageUpload: false,
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

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                {templates.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => onTemplateSelect(template.id)}
                        className={`p-4 border rounded-lg ${selectedTemplate === template.id ? 'border-blue-500' : 'border-gray-200'}`}
                    >
                        <div className="text-center">{template.name}</div>
                    </button>
                ))}
            </div>

            {hasImageUpload && (
                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        <label className="form-label">Rasm yuklash</label>
                        {uploadedImage && (
                            <button
                                onClick={onClearUploadedImage}
                                className="text-red-500 hover:text-red-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                    {!uploadedImage ? (
                        <div className="mt-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={onImageUpload}
                                accept="image/*"
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors"
                            >
                                <div className="text-center">
                                    <Upload className="h-8 w-8 mx-auto text-gray-400" />
                                    <span className="mt-2 block text-sm text-gray-600">
                                        Rasmni tanlang
                                    </span>
                                </div>
                            </button>
                        </div>
                    ) : (
                        <div className="mt-2 relative">
                            <img
                                src={uploadedImage}
                                alt="Uploaded"
                                className="w-full h-32 object-cover rounded-lg"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
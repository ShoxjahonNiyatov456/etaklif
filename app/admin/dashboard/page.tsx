"use client";

import { useState, useEffect } from "react";
import { eventTypesService } from "@/app/services/database";
import { templatesService } from "@/app/services/database";
import { EventType } from "@/app/models/eventTypes";
import { Template } from "@/app/models/templates";
import {
  Calendar,
  FileText,
  Grid,
  Clock,
  AlertCircle,
  Palette,
  X
} from "lucide-react";
import Link from "next/link";
import { localTemplatesService } from "@/app/services/local-templates";
import WeddingTemplate from "@/components/invitation-templates/WeddingTemplate";

export default function AdminDashboard() {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  // Wedding styles for direct display
  const weddingStyles = ['floral-gold', 'elegant-frame', 'blue-floral', 'golden-ornament', 'floral-hexagon'];

  // Translation map for style names
  const styleNameMap: Record<string, string> = {
    'floral-gold': 'Guldor oltin',
    'elegant-frame': 'Elegant ramka',
    'blue-floral': 'Ko\'k guldor',
    'golden-ornament': 'Oltin naqsh',
    'floral-hexagon': 'Guldor olti burchak'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use local template data instead of Firebase
        const [fetchedEventTypes, fetchedTemplates] = await Promise.all([
          localTemplatesService.getAllEventTypes(),
          localTemplatesService.getAllTemplates()
        ]);

        setEventTypes(fetchedEventTypes);
        setTemplates(fetchedTemplates);
      } catch (err) {
        console.error("Dashiboard ma'lumotlarini olishda xatolik:", err);
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Statistika hisoblanishi
  const activeEventTypes = eventTypes.filter(et => et.isActive).length;
  const activeTemplates = templates.filter(t => t.isActive).length;
  const premiumTemplates = templates.filter(t => t.isPremium).length;

  const latestEventTypes = [...eventTypes]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  // So'nggi shablonlar
  const latestTemplates = [...templates]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Sample data for templates
  const sampleData = {
    firstName: 'Alisher',
    secondName: 'Gulnora',
    date: new Date().toISOString(),
    time: '17:00',
    location: 'Toshkent shahri, Yunusobod tumani',
    additionalInfo: 'Marhamat tashrif buyuring'
  };

  const openModal = (style: string) => {
    setSelectedStyle(style);
    setModalOpen(true);
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedStyle(null);
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
  };

  // Card o'lchami
  const cardWidth = 240;
  const cardGap = 24; // gap-6 = 1.5rem = 24px

  // Styles ni 5 tadan guruhlash
  const chunkStyles = (styles: string[], size: number) => {
    return styles.reduce((result: string[][], item, index) => {
      const chunkIndex = Math.floor(index / size);

      if (!result[chunkIndex]) {
        result[chunkIndex] = []; // Yangi chunk yaratish
      }

      result[chunkIndex].push(item);
      return result;
    }, []);
  };

  const groupedStyles = chunkStyles(weddingStyles, 5);

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Jami bayram turlari</p>
                <p className="text-2xl font-semibold">{eventTypes.length}</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <span className="text-green-500 font-medium">{activeEventTypes}</span> faol
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Jami shablonlar</p>
                <p className="text-2xl font-semibold">{templates.length}</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <span className="text-green-500 font-medium">{activeTemplates}</span> faol,{" "}
              <span className="text-indigo-500 font-medium">{premiumTemplates}</span> premium
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <Grid size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Shablonlar / Tur</p>
                <p className="text-2xl font-semibold">
                  {eventTypes.length > 0
                    ? (templates.length / eventTypes.length).toFixed(1)
                    : "0"}
                </p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              O'rtacha har bir bayram turi uchun
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">To'y Taklifnoma Shablonlari</h2>
            <Link
              href="/admin/invitation-previews"
              className="text-indigo-600 hover:text-indigo-900 flex items-center"
            >
              <Palette size={18} className="mr-1" />
              Barcha shablonlarni ko'rish
            </Link>
          </div>
          <div className="p-6 overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {groupedStyles.map((styleGroup, groupIndex) => (
              <div key={groupIndex} className="grid grid-cols-5 gap-6 mb-6">
                {styleGroup.map((style, index) => (
                  <div
                    key={index}
                    className="border rounded-lg overflow-hidden shadow-sm cursor-pointer transition-transform hover:shadow-md hover:scale-105"
                    onClick={() => openModal(style)}
                  >
                    <div className="p-2 bg-gray-50 border-b">
                      <h4 className="font-medium text-sm text-gray-700">{styleNameMap[style] || style}</h4>
                    </div>
                    <div
                      className="relative bg-white flex justify-center items-center"
                      style={{ height: '300px', overflow: 'hidden' }}
                    >
                      <div style={{ transform: 'scale(0.45)', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                        <WeddingTemplate
                          style={style}
                          firstName={sampleData.firstName}
                          secondName={sampleData.secondName}
                          date={sampleData.date}
                          time={sampleData.time}
                          location={sampleData.location}
                          additionalInfo={sampleData.additionalInfo}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Barcha Taklifnoma Turlari</h2>
            <Link
              href="/admin/invitation-previews"
              className="text-indigo-600 hover:text-indigo-900 flex items-center"
            >
              <Palette size={18} className="mr-1" />
              Barcha shablonlarni ko'rish
            </Link>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {eventTypes.map((eventType) => (
                <div key={eventType.id} className="border rounded-lg overflow-hidden">
                  <div className="p-3 bg-gray-50 border-b">
                    <h3 className="font-medium text-gray-700">{eventType.title}</h3>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-3">{eventType.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {templates.filter(t => t.eventTypeId === eventType.id).length} shablon
                      </span>
                      <Link
                        href={`/admin/invitation-previews`}
                        className="text-xs text-indigo-600 hover:text-indigo-800"
                      >
                        Ko'rish
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for fullscreen preview */}
      {modalOpen && selectedStyle && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-auto relative">
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center z-10">
              <h3 className="text-lg font-medium">{styleNameMap[selectedStyle] || selectedStyle}</h3>
              <button
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 flex justify-center">
              <div className="relative">
                <WeddingTemplate
                  style={selectedStyle}
                  firstName={sampleData.firstName}
                  secondName={sampleData.secondName}
                  date={sampleData.date}
                  time={sampleData.time}
                  location={sampleData.location}
                  additionalInfo={sampleData.additionalInfo}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 
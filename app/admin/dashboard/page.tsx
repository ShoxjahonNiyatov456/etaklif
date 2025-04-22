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
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Bayram turlari va shablonlarni olish
        const [fetchedEventTypes, fetchedTemplates] = await Promise.all([
          eventTypesService.getAllEventTypes(),
          templatesService.getAllTemplates()
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
  
  // So'nggi bayram turlari
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      {/* Asosiy statistika */}
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
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Oxirgi yangilanish</p>
              <p className="text-2xl font-semibold">
                {eventTypes.length > 0 || templates.length > 0
                  ? new Date(
                      Math.max(
                        ...[
                          ...eventTypes.map(et => et.updatedAt.getTime()),
                          ...templates.map(t => t.updatedAt.getTime())
                        ]
                      )
                    ).toLocaleDateString("uz-UZ")
                  : "Yo'q"}
              </p>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Oxirgi tahrirlangan ma'lumot sanasi
          </div>
        </div>
      </div>
      
      {/* So'nggi qo'shilgan bayram turlari */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">So'nggi qo'shilgan bayram turlari</h2>
        </div>
        <div className="p-6">
          {latestEventTypes.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nomi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Yaratilgan sana
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Holati
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amallar
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {latestEventTypes.map((eventType) => (
                    <tr key={eventType.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{eventType.title}</div>
                        <div className="text-sm text-gray-500">{eventType.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {eventType.createdAt.toLocaleDateString("uz-UZ")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {eventType.isActive ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Faol
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Nofaol
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link 
                          href={`/admin/event-types/edit/${eventType.id}`}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Tahrirlash
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              Bayram turlari mavjud emas
            </div>
          )}
          <div className="mt-4 text-right">
            <Link 
              href="/admin/event-types"
              className="text-indigo-600 hover:text-indigo-900"
            >
              Barchasini ko'rish
            </Link>
          </div>
        </div>
      </div>
      
      {/* So'nggi qo'shilgan shablonlar */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">So'nggi qo'shilgan shablonlar</h2>
        </div>
        <div className="p-6">
          {latestTemplates.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nomi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bayram turi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Yaratilgan sana
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Holati
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amallar
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {latestTemplates.map((template) => {
                    const eventType = eventTypes.find(et => et.id === template.eventTypeId);
                    
                    return (
                      <tr key={template.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{template.title}</div>
                          <div className="text-sm text-gray-500">{template.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {eventType?.title || "Noma'lum"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {template.createdAt.toLocaleDateString("uz-UZ")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-1">
                            {template.isActive ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Faol
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Nofaol
                              </span>
                            )}
                            
                            {template.isPremium && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                                Premium
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Link 
                            href={`/admin/templates/edit/${template.id}`}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            Tahrirlash
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              Shablonlar mavjud emas
            </div>
          )}
          <div className="mt-4 text-right">
            <Link 
              href="/admin/templates"
              className="text-indigo-600 hover:text-indigo-900"
            >
              Barchasini ko'rish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
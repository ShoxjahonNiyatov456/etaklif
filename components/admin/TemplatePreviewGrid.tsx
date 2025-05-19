import React, { useState, useEffect } from 'react';
import WeddingTemplate from '@/components/invitation-templates/WeddingTemplate';
import BirthdayTemplate from '@/components/invitation-templates/BirthdayTemplate';
import EngagementTemplate from '@/components/invitation-templates/EngagementTemplate';
import FuneralTemplate from '@/components/invitation-templates/FuneralTemplate';
import JubileeTemplate from '@/components/invitation-templates/JubileeTemplate';
import { X } from 'lucide-react';

interface TemplatePreviewGridProps {
  templateType: 'wedding' | 'birthday' | 'engagement' | 'funeral' | 'jubilee';
  styles: string[];
  styleNameMap: Record<string, string>;
  title: string;
}

export default function TemplatePreviewGrid({
  templateType,
  styles,
  styleNameMap,
  title
}: TemplatePreviewGridProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  useEffect(() => {
    if (styles.length > 0 && !selectedStyle) {
      setSelectedStyle(styles[0]);
    }
  }, [styles, selectedStyle]);
  const sampleData = {
    firstName: 'Alisher',
    secondName: 'Gulnora',
    age: '7',
    parents: 'Karimovlar oilasi',
    celebrationType: '60',
    date: new Date().toISOString(),
    time: '17:00',
    location: 'Toshkent shahri',
    additionalInfo: 'Marhamat tashrif buyuring'
  };

  const renderTemplate = (style: string) => {
    switch (templateType) {
      case 'wedding':
        return (
          <WeddingTemplate
            style={style}
            firstName={sampleData.firstName}
            secondName={sampleData.secondName}
            date={sampleData.date}
            time={sampleData.time}
            location={sampleData.location}
            additionalInfo={sampleData.additionalInfo}
          />
        );
      case 'birthday':
        return (
          <BirthdayTemplate
            style={style}
            firstName={sampleData.firstName}
            age={sampleData.age}
            date={sampleData.date}
            time={sampleData.time}
            location={sampleData.location}
            additionalInfo={sampleData.additionalInfo}
          />
        );
      case 'engagement':
        return (
          <EngagementTemplate
            style={style}
            firstName={sampleData.firstName}
            parents={sampleData.parents}
            date={sampleData.date}
            time={sampleData.time}
            location={sampleData.location}
            additionalInfo={sampleData.additionalInfo}
          />
        );
      case 'funeral':
        return (
          <FuneralTemplate
            style={style}
            firstName={sampleData.firstName}
            date={sampleData.date}
            time={sampleData.time}
            location={sampleData.location}
            additionalInfo={sampleData.additionalInfo}
          />
        );
      case 'jubilee':
        return (
          <JubileeTemplate
            style={style}
            firstName={sampleData.firstName}
            date={sampleData.date}
            age={sampleData.age}
            time={sampleData.time}
            location={sampleData.location}
            additionalInfo={sampleData.additionalInfo}
          />
        );
      default:
        return null;
    }
  };

  const openModal = (style: string) => {
    setSelectedStyle(style);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const chunkStyles = (styles: string[], size: number) => {
    return styles.reduce((result: string[][], item, index) => {
      const chunkIndex = Math.floor(index / size);
      if (!result[chunkIndex]) {
        result[chunkIndex] = [];
      }

      result[chunkIndex].push(item);
      return result;
    }, []);
  };

  const groupedStyles = chunkStyles(styles, 5);
  const hasTemplates = styles.length > 0;
  return (
    <>
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>

        {hasTemplates ? (
          <div className="p-6 overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {groupedStyles.map((styleGroup, groupIndex) => (
              <div key={groupIndex} className="grid grid-cols-5 gap-6 mb-6">
                {styleGroup.map((style, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg overflow-hidden shadow-sm cursor-pointer transition-transform hover:shadow-md hover:scale-105 ${selectedStyle === style ? 'ring-2 ring-primary-500' : ''}`}
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
                        {renderTemplate(style)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 flex justify-center items-center h-[300px]">
            <div className="text-center">
              <p className="text-gray-500 text-lg">Shablon topilmadi</p>
              <p className="text-sm text-gray-400 mt-2">Ushbu turdagi shablonlar hozircha mavjud emas</p>
            </div>
          </div>
        )}
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
                {renderTemplate(selectedStyle)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 
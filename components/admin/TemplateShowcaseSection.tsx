import React from 'react';
import BirthdayTemplate from '@/components/invitation-templates/BirthdayTemplate';
import WeddingTemplate from '@/components/invitation-templates/WeddingTemplate';
import EngagementTemplate from '@/components/invitation-templates/EngagementTemplate';
import FuneralTemplate from '@/components/invitation-templates/FuneralTemplate';
import JubileeTemplate from '@/components/invitation-templates/JubileeTemplate';

interface TemplateShowcaseSectionProps {
  eventType: string;
  styles: string[];
}

export default function TemplateShowcaseSection({ eventType, styles }: TemplateShowcaseSectionProps) {
  const sampleData = {
    firstName: 'Alisher',
    secondName: 'Gulnora',
    age: '7',
    parents: 'Karimovlar oilasi',
    date: new Date().toISOString(),
    time: '14:00',
    location: 'Toshkent shahri',
    additionalInfo: 'Iltimos, o\'z vaqtida tashrif buyuring'
  };

  // Map event type to title
  const eventTitleMap: Record<string, string> = {
    'birthday': 'Tug\'ilgan kun',
    'wedding': 'To\'y',
    'engagement': 'Qiz uzatish',
    'funeral': 'El oshi',
    'jubilee': 'Yubiley'
  };

  const renderTemplate = (style: string) => {
    switch (eventType) {
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
            celebrationType={sampleData.age}
            date={sampleData.date}
            time={sampleData.time}
            location={sampleData.location}
            additionalInfo={sampleData.additionalInfo}
          />
        );
      default:
        return <div>Template not found</div>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{eventTitleMap[eventType] || eventType} Shablonlari</h2>
      
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Mavjud shablonlar turlari:</h3>
        <div className="flex flex-wrap gap-2">
          {styles.map((style, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {style}
            </span>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {styles.map((style, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
            <div className="p-2 bg-gray-50 border-b">
              <h4 className="font-medium text-sm text-gray-700">{style}</h4>
            </div>
            <div className="p-2 flex justify-center" style={{ transform: 'scale(0.5)', transformOrigin: 'top center', height: '300px', overflow: 'hidden' }}>
              <div style={{ width: '200%', height: '200%' }}>
                {renderTemplate(style)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
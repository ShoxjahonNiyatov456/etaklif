import React from 'react';
import { styleNameMap } from './styleNameMap';
import BirthdayTemplate from '@/components/invitation-templates/BirthdayTemplate';
import WeddingTemplate from '@/components/invitation-templates/WeddingTemplate';
import EngagementTemplate from '@/components/invitation-templates/EngagementTemplate';
import FuneralTemplate from '@/components/invitation-templates/FuneralTemplate';

interface TemplateStylesDisplayProps {
    templateName: string;
    styles: string[];
}

export default function TemplateStylesDisplay({ templateName, styles }: TemplateStylesDisplayProps) {
    const getTemplateType = (name: string) => {
        switch (name) {
            case 'Tug\'ilgan kun': return 'birthday';
            case 'To\'y': return 'wedding';
            case 'Qiz uzatish': return 'engagement';
            case 'El oshi': return 'funeral';
            default: return '';
        }
    };
    const sampleData = {
        firstName: 'Alisher',
        secondName: 'Gulnora',
        age: '7',
        parents: 'Karimovlar oilasi',
        date: new Date().toISOString(),
        time: '14:00',
        location: 'Toshkent shahri, Yunusobod tumani',
        additionalInfo: 'Iltimos, o\'z vaqtida tashrif buyuring'
    };

    // Shablon turini aniqlash
    const templateType = getTemplateType(templateName);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{templateName} shablonlari</h2>

            <div className="mt-4 mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Mavjud shablonlar</h3>
                <div className="flex flex-wrap gap-2">
                    {styles.map((style, index) => {
                        // styleNameMap obyektidan foydalanish
                        const styleDisplayName = styleNameMap[style] || style;
                        return (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {styleDisplayName}
                            </span>
                        );
                    })}
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Shablonlar namunalari</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {styles.map((style, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
                            <div className="p-2 bg-gray-50 border-b">
                                <h4 className="font-medium text-sm text-gray-700">{styleNameMap[style] || style}</h4>
                            </div>
                            <div className="p-3" style={{ transform: 'scale(0.5)', transformOrigin: 'top left', height: '250px', overflow: 'hidden' }}>
                                <div style={{ width: '200%', height: '200%' }}>
                                    {templateType === 'birthday' && (
                                        <BirthdayTemplate
                                            style={style}
                                            firstName={sampleData.firstName}
                                            age={sampleData.age}
                                            date={sampleData.date}
                                            time={sampleData.time}
                                            location={sampleData.location}
                                            additionalInfo={sampleData.additionalInfo}
                                        />
                                    )}
                                    {templateType === 'wedding' && (
                                        <WeddingTemplate
                                            style={style}
                                            firstName={sampleData.firstName}
                                            secondName={sampleData.secondName}
                                            date={sampleData.date}
                                            time={sampleData.time}
                                            location={sampleData.location}
                                            additionalInfo={sampleData.additionalInfo}
                                        />
                                    )}
                                    {templateType === 'engagement' && (
                                        <EngagementTemplate
                                            style={style}
                                            firstName={sampleData.firstName}
                                            parents={sampleData.parents}
                                            date={sampleData.date}
                                            time={sampleData.time}
                                            location={sampleData.location}
                                            additionalInfo={sampleData.additionalInfo}
                                        />
                                    )}
                                    {templateType === 'funeral' && (
                                        <FuneralTemplate
                                            style={style}
                                            firstName={sampleData.firstName}
                                            date={sampleData.date}
                                            time={sampleData.time}
                                            location={sampleData.location}
                                            additionalInfo={sampleData.additionalInfo}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
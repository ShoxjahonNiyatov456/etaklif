import React from 'react';
import TemplateStats from './TemplateStats';

interface Template {
    name: string;
    styles: string[];
}

const templates: Template[] = [
    {
        name: 'Tug\'ilgan kun',
        styles: ['colorful', 'kids', 'floral-frame', 'butterfly', 'kids-photo', 'unicorn']
    },
    {
        name: 'To\'y',
        styles: ['floral-gold', 'elegant-frame', 'blue-floral', 'golden-ornament', 'floral-hexagon']
    },
    {
        name: 'Qiz uzatish',
        styles: ['romantic', 'national', 'floral-engagement', 'modern-engagement', 'traditional-engagement']
    },
    {
        name: 'El oshi',
        styles: ['traditional', 'calm', 'photo-memorial', 'elegant-memorial', 'islamic-memorial']
    }
];

export default function AdminDashboard() {
    const mockPurchaseData = {
        totalTemplates: templates.reduce((acc, template) => acc + template.styles.length, 0),
        templates: templates.map(template => ({
            name: template.name,
            totalSales: Math.floor(Math.random() * 50),
            totalRevenue: Math.floor(Math.random() * 1000000),
            purchaseHistory: Array(5).fill(null).map(() => ({
                email: 'example@mail.com',
                purchaseDate: new Date().toISOString(),
                amount: Math.floor(Math.random() * 100000)
            }))
        }))
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600">Jami shablonlar</p>
                    <p className="text-2xl font-bold text-blue-700">{mockPurchaseData.totalTemplates}</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600">Jami sotuvlar</p>
                    <p className="text-2xl font-bold text-green-700">
                        {mockPurchaseData.templates.reduce((acc, template) => acc + template.totalSales, 0)}
                    </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-600">Jami daromad</p>
                    <p className="text-2xl font-bold text-purple-700">
                        {new Intl.NumberFormat('uz-UZ', {
                            style: 'currency',
                            currency: 'UZS'
                        }).format(mockPurchaseData.templates.reduce((acc, template) => acc + template.totalRevenue, 0))}
                    </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-600">O'rtacha xarid</p>
                    <p className="text-2xl font-bold text-yellow-700">
                        {new Intl.NumberFormat('uz-UZ', {
                            style: 'currency',
                            currency: 'UZS'
                        }).format(mockPurchaseData.templates.reduce((acc, template) => acc + template.totalRevenue, 0) /
                            mockPurchaseData.templates.reduce((acc, template) => acc + template.totalSales, 0))}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {mockPurchaseData.templates.map((template, index) => {
                    const templateData = templates.find(t => t.name === template.name);
                    return (
                        <TemplateStats
                            key={index}
                            templateName={template.name}
                            totalSales={template.totalSales}
                            totalRevenue={template.totalRevenue}
                            styles={templateData?.styles || []}
                            purchaseHistory={template.purchaseHistory}
                        />
                    );
                })}
            </div>
        </div>
    );
}
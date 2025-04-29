import React from 'react';
import { styleNameMap } from './styleNameMap';

interface TemplateStatsProps {
  templateName: string;
  totalSales: number;
  totalRevenue: number;
  styles?: string[];
  purchaseHistory: Array<{
    email: string;
    purchaseDate: string;
    amount: number;
  }>;
}

export default function TemplateStats({
  templateName,
  totalSales,
  totalRevenue,
  styles = [],
  purchaseHistory,
}: TemplateStatsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{templateName}</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600">Jami sotuvlar</p>
          <p className="text-2xl font-bold text-blue-700">{totalSales}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600">Jami daromad</p>
          <p className="text-2xl font-bold text-green-700">
            {new Intl.NumberFormat('uz-UZ', {
              style: 'currency',
              currency: 'UZS'
            }).format(totalRevenue)}
          </p>
        </div>
      </div>

      {styles.length > 0 && (
        <div className="mt-6 mb-6">
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
      )}

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Xaridlar tarixi</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sana</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Summa</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {purchaseHistory.map((purchase, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-4 py-3 text-sm text-gray-900">{purchase.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(purchase.purchaseDate).toLocaleDateString('uz-UZ')}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Intl.NumberFormat('uz-UZ', {
                      style: 'currency',
                      currency: 'UZS'
                    }).format(purchase.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
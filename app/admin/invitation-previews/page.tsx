"use client";

import React from 'react';
import TemplatePreviewGrid from '@/components/admin/TemplatePreviewGrid';
import { Palette } from 'lucide-react';

export default function InvitationPreviewsPage() {
  const styleNameMaps = {
    wedding: {
      'floral-gold': 'Guldor oltin',
      'elegant-frame': 'Elegant ramka',
      'blue-floral': 'Ko\'k guldor',
      'golden-ornament': 'Oltin naqsh',
      'floral-hexagon': 'Guldor olti burchak'
    },
    birthday: {
      'colorful': 'Rang-barang',
      'kids': 'Bolalar',
      'floral-frame': 'Guldor ramka',
      'butterfly': 'Kapalaklar',
      'kids-photo': 'Bolalar foto',
      'unicorn': 'Unicorn'
    },
    engagement: {
      'romantic': 'Romantik',
      'national': 'Milliy',
      'floral-engagement': 'Guldor',
      'modern-engagement': 'Zamonaviy',
      'traditional-engagement': 'An\'anaviy'
    },
    funeral: {
      'traditional': 'An\'anaviy',
      'calm': 'Tinch',
      'photo-memorial': 'Foto xotira',
      'elegant-memorial': 'Nozik xotira',
      'islamic-memorial': 'Islomiy'
    },
    jubilee: {
      'classic': 'Klassik',
      'modern': 'Zamonaviy',
      'ornate': 'Bezakli',
      'minimalist': 'Minimalist',
      'traditional': 'An\'anaviy',
      'luxury': 'Hashamatli',
      'festive': 'Bayramona',
      'photo-centric': 'Fotoli',
      'geometric': 'Geometrik',
      'nature': 'Tabiat'
    }
  };

  const templateStyles = {
    wedding: ['floral-gold', 'elegant-frame', 'blue-floral', 'golden-ornament', 'floral-hexagon'],
    birthday: ['colorful', 'kids', 'floral-frame', 'butterfly', 'kids-photo', 'unicorn'],
    engagement: ['romantic', 'national', 'floral-engagement', 'modern-engagement', 'traditional-engagement'],
    funeral: ['traditional', 'calm', 'photo-memorial', 'elegant-memorial', 'islamic-memorial'],
    jubilee: ['classic', 'modern', 'ornate', 'minimalist', 'traditional', 'luxury', 'festive', 'photo-centric', 'geometric', 'nature']
  };

  const titles = {
    wedding: 'To\'y Taklifnomalari',
    birthday: 'Tug\'ilgan Kun Taklifnomalari',
    engagement: 'Qiz uzatish (Fotiha) Taklifnomalari',
    funeral: 'El oshi Taklifnomalari',
    jubilee: 'Yubiley Taklifnomalari'
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Taklifnomalar Ko'rinishi</h1>
        <div className="flex items-center text-indigo-600">
          <Palette className="mr-2" size={20} />
          <span>Taklifnoma shablonlar</span>
        </div>
      </div>
      <TemplatePreviewGrid
        templateType="wedding"
        styles={templateStyles.wedding}
        styleNameMap={styleNameMaps.wedding}
        title={titles.wedding}
      />
      <TemplatePreviewGrid
        templateType="birthday"
        styles={templateStyles.birthday}
        styleNameMap={styleNameMaps.birthday}
        title={titles.birthday}
      />

      <TemplatePreviewGrid
        templateType="engagement"
        styles={templateStyles.engagement}
        styleNameMap={styleNameMaps.engagement}
        title={titles.engagement}
      />
      <TemplatePreviewGrid
        templateType="funeral"
        styles={templateStyles.funeral}
        styleNameMap={styleNameMaps.funeral}
        title={titles.funeral}
      />
      <TemplatePreviewGrid
        templateType="jubilee"
        styles={templateStyles.jubilee}
        styleNameMap={styleNameMaps.jubilee}
        title={titles.jubilee}
      />
    </div>
  );
} 
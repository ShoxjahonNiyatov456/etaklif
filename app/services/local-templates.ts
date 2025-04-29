import { Template } from "../models/templates";

// This file provides local template data (hardcoded) instead of fetching from Firebase
// It mimics the Firebase template service interface but serves local data

// Define available style options for each template type
export const templateStyles = {
  birthday: ['colorful', 'elegant', 'minimalist', 'photo', 'traditional'],
  wedding: ['classic', 'modern', 'rustic', 'elegant', 'minimalist'],
  engagement: ['classic', 'elegant', 'floral', 'modern', 'romantic'],
  funeral: ['elegant', 'memorial', 'peaceful', 'photo', 'traditional'],
  jubilee: ['classic', 'modern', 'ornate', 'minimalist', 'traditional', 'luxury', 'festive', 'photo-centric', 'geometric', 'nature']
};

// Create template data with the same structure as Firebase templates
const localTemplates: Template[] = [
  // Birthday templates
  ...templateStyles.birthday.map((style, index) => ({
    id: `birthday-${index}`,
    title: `Birthday Template - ${style}`,
    description: `Beautiful birthday invitation template with ${style} style`,
    eventTypeId: 'birthday',
    previewImage: `/images/templates/birthday-${style}.jpg`,
    content: {
      html: '',
      css: '',
      json: { style },
      config: { type: 'birthday', style }
    },
    isActive: true,
    isPremium: index % 3 === 0, // Every third template is premium
    createdAt: new Date(Date.now() - (1000 * 60 * 60 * 24 * index)), // Different dates
    updatedAt: new Date()
  })),
  
  // Wedding templates
  ...templateStyles.wedding.map((style, index) => ({
    id: `wedding-${index}`,
    title: `Wedding Template - ${style}`,
    description: `Elegant wedding invitation template with ${style} style`,
    eventTypeId: 'wedding',
    previewImage: `/images/templates/wedding-${style}.jpg`,
    content: {
      html: '',
      css: '',
      json: { style },
      config: { type: 'wedding', style }
    },
    isActive: true,
    isPremium: index % 3 === 0,
    createdAt: new Date(Date.now() - (1000 * 60 * 60 * 24 * index)),
    updatedAt: new Date()
  })),
  
  // Engagement templates
  ...templateStyles.engagement.map((style, index) => ({
    id: `engagement-${index}`,
    title: `Engagement Template - ${style}`,
    description: `Beautiful engagement invitation template with ${style} style`,
    eventTypeId: 'engagement',
    previewImage: `/images/templates/engagement-${style}.jpg`,
    content: {
      html: '',
      css: '',
      json: { style },
      config: { type: 'engagement', style }
    },
    isActive: true,
    isPremium: index % 3 === 0,
    createdAt: new Date(Date.now() - (1000 * 60 * 60 * 24 * index)),
    updatedAt: new Date()
  })),
  
  // Funeral templates
  ...templateStyles.funeral.map((style, index) => ({
    id: `funeral-${index}`,
    title: `Funeral Template - ${style}`,
    description: `Respectful funeral invitation template with ${style} style`,
    eventTypeId: 'funeral',
    previewImage: `/images/templates/funeral-${style}.jpg`,
    content: {
      html: '',
      css: '',
      json: { style },
      config: { type: 'funeral', style }
    },
    isActive: true,
    isPremium: index % 3 === 0,
    createdAt: new Date(Date.now() - (1000 * 60 * 60 * 24 * index)),
    updatedAt: new Date()
  })),
  
  // Jubilee templates
  ...templateStyles.jubilee.map((style, index) => ({
    id: `jubilee-${index}`,
    title: `Jubilee Template - ${style}`,
    description: `Celebratory jubilee invitation template with ${style} style`,
    eventTypeId: 'jubilee',
    previewImage: `/images/templates/jubilee-${style}.jpg`,
    content: {
      html: '',
      css: '',
      json: { style },
      config: { type: 'jubilee', style }
    },
    isActive: true,
    isPremium: index % 3 === 0,
    createdAt: new Date(Date.now() - (1000 * 60 * 60 * 24 * index)),
    updatedAt: new Date()
  }))
];

// Local event type data to match the templates
export const localEventTypes = [
  {
    id: 'birthday',
    title: 'Tug\'ilgan kun',
    description: 'Tug\'ilgan kun uchun taklifnomalar',
    isActive: true,
    createdAt: new Date(Date.now() - (1000 * 60 * 60 * 24 * 30)),
    updatedAt: new Date()
  },
  {
    id: 'wedding',
    title: 'To\'y',
    description: 'To\'y marosimlari uchun taklifnomalar',
    isActive: true,
    createdAt: new Date(Date.now() - (1000 * 60 * 60 * 24 * 25)),
    updatedAt: new Date()
  },
  {
    id: 'engagement',
    title: 'Qiz uzatish',
    description: 'Qiz uzatish marosimlari uchun taklifnomalar',
    isActive: true,
    createdAt: new Date(Date.now() - (1000 * 60 * 60 * 24 * 20)),
    updatedAt: new Date()
  },
  {
    id: 'funeral',
    title: 'El oshi',
    description: 'El oshi marosimlari uchun taklifnomalar',
    isActive: true,
    createdAt: new Date(Date.now() - (1000 * 60 * 60 * 24 * 15)),
    updatedAt: new Date()
  },
  {
    id: 'jubilee',
    title: 'Yubiley',
    description: 'Yubiley marosimlari uchun taklifnomalar',
    isActive: true,
    createdAt: new Date(Date.now() - (1000 * 60 * 60 * 24 * 10)),
    updatedAt: new Date()
  }
];

// Service that mimics the Firebase template service but uses local data
export const localTemplatesService = {
  // Get all templates
  async getAllTemplates(): Promise<Template[]> {
    return Promise.resolve(localTemplates);
  },

  // Get active templates
  async getActiveTemplates(): Promise<Template[]> {
    return Promise.resolve(localTemplates.filter(t => t.isActive));
  },

  // Get templates by event type
  async getTemplatesByEventType(eventTypeId: string): Promise<Template[]> {
    return Promise.resolve(localTemplates.filter(
      t => t.eventTypeId === eventTypeId && t.isActive
    ));
  },

  // Get template by ID
  async getTemplateById(id: string): Promise<Template | null> {
    const template = localTemplates.find(t => t.id === id);
    return Promise.resolve(template || null);
  },

  // Get all event types
  async getAllEventTypes() {
    return Promise.resolve(localEventTypes);
  }
};

// Sample templates data
const sampleTemplates = [
  // ... existing code ...
  
  // Jubilee templates
  {
    id: 'jubilee-classic',
    type: 'jubilee',
    style: 'classic',
    celebrationType: '60'
  },
  {
    id: 'jubilee-modern',
    type: 'jubilee',
    style: 'modern',
    celebrationType: '50'
  },
  {
    id: 'jubilee-ornate',
    type: 'jubilee',
    style: 'ornate',
    celebrationType: '70'
  },
  {
    id: 'jubilee-minimalist',
    type: 'jubilee',
    style: 'minimalist',
    celebrationType: '40'
  },
  {
    id: 'jubilee-traditional',
    type: 'jubilee',
    style: 'traditional',
    celebrationType: '80'
  },
  {
    id: 'jubilee-luxury',
    type: 'jubilee',
    style: 'luxury',
    celebrationType: '60'
  },
  {
    id: 'jubilee-festive',
    type: 'jubilee',
    style: 'festive',
    celebrationType: '50'
  },
  {
    id: 'jubilee-photo-centric',
    type: 'jubilee',
    style: 'photo-centric',
    celebrationType: '70'
  },
  {
    id: 'jubilee-geometric',
    type: 'jubilee',
    style: 'geometric',
    celebrationType: '40'
  },
  {
    id: 'jubilee-nature',
    type: 'jubilee',
    style: 'nature',
    celebrationType: '90'
  },
  // ... existing code ...
]; 
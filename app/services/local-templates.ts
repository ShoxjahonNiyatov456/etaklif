import { Template } from "../models/templates";

export const templateStyles = {
  birthday: ["colorful", "elegant", "minimalist", "photo", "traditional"],
  wedding: ["classic", "modern", "rustic", "elegant", "minimalist"],
  engagement: ["classic", "elegant", "floral", "modern", "romantic"],
  funeral: ["elegant", "memorial", "peaceful", "photo", "traditional"],
  jubilee: [
    "classic",
    "modern",
    "ornate",
    "minimalist",
    "traditional",
    "luxury",
    "festive",
    "photo-centric",
    "geometric",
    "nature",
  ],
};

const localTemplates: Template[] = [
  ...templateStyles.birthday.map((style, index) => ({
    id: `birthday-${index}`,
    title: `Birthday Template - ${style}`,
    description: `Beautiful birthday invitation template with ${style} style`,
    eventTypeId: "birthday",
    previewImage: `/images/templates/birthday-${style}.jpg`,
    content: {
      html: "",
      css: "",
      json: { style },
      config: { type: "birthday", style },
    },
    isActive: true,
    isPremium: index % 3 === 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * index),
    updatedAt: new Date(),
  })),

  ...templateStyles.wedding.map((style, index) => ({
    id: `wedding-${index}`,
    title: `Wedding Template - ${style}`,
    description: `Elegant wedding invitation template with ${style} style`,
    eventTypeId: "wedding",
    previewImage: `/images/templates/wedding-${style}.jpg`,
    content: {
      html: "",
      css: "",
      json: { style },
      config: { type: "wedding", style },
    },
    isActive: true,
    isPremium: index % 3 === 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * index),
    updatedAt: new Date(),
  })),

  ...templateStyles.engagement.map((style, index) => ({
    id: `engagement-${index}`,
    title: `Engagement Template - ${style}`,
    description: `Beautiful engagement invitation template with ${style} style`,
    eventTypeId: "engagement",
    previewImage: `/images/templates/engagement-${style}.jpg`,
    content: {
      html: "",
      css: "",
      json: { style },
      config: { type: "engagement", style },
    },
    isActive: true,
    isPremium: index % 3 === 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * index),
    updatedAt: new Date(),
  })),

  ...templateStyles.funeral.map((style, index) => ({
    id: `funeral-${index}`,
    title: `Funeral Template - ${style}`,
    description: `Respectful funeral invitation template with ${style} style`,
    eventTypeId: "funeral",
    previewImage: `/images/templates/funeral-${style}.jpg`,
    content: {
      html: "",
      css: "",
      json: { style },
      config: { type: "funeral", style },
    },
    isActive: true,
    isPremium: index % 3 === 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * index),
    updatedAt: new Date(),
  })),

  ...templateStyles.jubilee.map((style, index) => ({
    id: `jubilee-${index}`,
    title: `Jubilee Template - ${style}`,
    description: `Celebratory jubilee invitation template with ${style} style`,
    eventTypeId: "jubilee",
    previewImage: `/images/templates/jubilee-${style}.jpg`,
    content: {
      html: "",
      css: "",
      json: { style },
      config: { type: "jubilee", style },
    },
    isActive: true,
    isPremium: index % 3 === 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * index),
    updatedAt: new Date(),
  })),
];

export const localEventTypes = [
  {
    id: "birthday",
    title: "Tug'ilgan kun",
    description: "Tug'ilgan kun uchun taklifnomalar",
    isActive: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    updatedAt: new Date(),
  },
  {
    id: "wedding",
    title: "To'y",
    description: "To'y marosimlari uchun taklifnomalar",
    isActive: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25),
    updatedAt: new Date(),
  },
  {
    id: "engagement",
    title: "Qiz uzatish",
    description: "Qiz uzatish marosimlari uchun taklifnomalar",
    isActive: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
    updatedAt: new Date(),
  },
  {
    id: "funeral",
    title: "El oshi",
    description: "El oshi marosimlari uchun taklifnomalar",
    isActive: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    updatedAt: new Date(),
  },
  {
    id: "jubilee",
    title: "Yubiley",
    description: "Yubiley marosimlari uchun taklifnomalar",
    isActive: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    updatedAt: new Date(),
  },
];

export const localTemplatesService = {
  async getAllTemplates(): Promise<Template[]> {
    return Promise.resolve(localTemplates);
  },
  async getActiveTemplates(): Promise<Template[]> {
    return Promise.resolve(localTemplates.filter((t) => t.isActive));
  },
  async getTemplatesByEventType(eventTypeId: string): Promise<Template[]> {
    return Promise.resolve(
      localTemplates.filter((t) => t.eventTypeId === eventTypeId && t.isActive)
    );
  },
  async getTemplateById(id: string): Promise<Template | null> {
    const template = localTemplates.find((t) => t.id === id);
    return Promise.resolve(template || null);
  },
  async getAllEventTypes() {
    return Promise.resolve(localEventTypes);
  },
};

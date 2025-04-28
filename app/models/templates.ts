export interface Template {
  id: string;
  title: string;
  description: string;
  eventTypeId: string;
  previewImage: string;
  content: TemplateContent;
  isActive: boolean;
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TemplateContent {
  html: string;
  css: string;
  json?: any;
  config?: any;
}

export interface TemplateFormData {
  title: string;
  description: string;
  eventTypeId: string;
  previewImage: string;
  content: {
    html: string;
    css: string;
    json?: any;
    config?: any;
  };
  isActive: boolean;
  isPremium: boolean;
}

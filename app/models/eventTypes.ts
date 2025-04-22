export interface EventType {
  id: string;
  title: string;
  description: string;
  icon?: string;
  imageSrc?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventTypeFormData {
  title: string;
  description: string;
  icon?: string;
  imageSrc?: string;
  isActive: boolean;
} 
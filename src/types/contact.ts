export type ContactCategory = 'general' | 'business' | 'support' | 'other';

export interface Contact {
  id: string;
  name: string;
  email: string;
  category: ContactCategory;
  message: string;
  createdAt: Date;
  isRead: boolean;
}
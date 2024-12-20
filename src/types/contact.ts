export type ContactCategory = 'GENERAL' | 'BUSINESS' | 'SUPPORT' | 'OTHER';

export interface Contact {
  id: string;
  name: string;
  email: string;
  category: ContactCategory;
  message: string;
  createdAt: Date;
  isRead: boolean;
}
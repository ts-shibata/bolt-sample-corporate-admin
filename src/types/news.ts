export type NewsCategory = 'COMPANY' | 'PRODUCT' | 'EVENT' | 'OTHER';

export type NewsStatus = 'DRAFT' | 'PUBLISHED' | 'SCHEDULED';

export interface News {
  id: string;
  title: string;
  content: string;
  category: NewsCategory;
  status: NewsStatus;
  publishedAt: Date | null;
  scheduledAt: Date | null;
  thumbnailUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
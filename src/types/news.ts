export type NewsCategory = 'company' | 'product' | 'event' | 'other';

export type NewsStatus = 'draft' | 'published' | 'scheduled';

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
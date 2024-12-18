import { prisma } from '../prisma/client';
// import type { News, NewsCategory, NewsStatus } from '@prisma/client';

export type CreateNewsInput = {
  title: string;
  content: string;
  // category: NewsCategory;
  // status: NewsStatus;
  category: string;
  status: string;
  scheduledAt?: Date | null;
  thumbnailUrl?: string | null;
};

export type UpdateNewsInput = Partial<CreateNewsInput>;

export const newsService = {
  // Get paginated news list
  async getNewsList(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [total, items] = await Promise.all([
      prisma.news.count(),
      prisma.news.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  },

  // Get single news by ID
  async getNewsById(id: string) {
    return prisma.news.findUnique({
      where: { id },
    });
  },

  // Create news
  async createNews(data: CreateNewsInput) {
    return prisma.news.create({
      data: {
        ...data,
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
      },
    });
  },

  // Update news
  async updateNews(id: string, data: UpdateNewsInput) {
    return prisma.news.update({
      where: { id },
      data: {
        ...data,
        publishedAt:
          data.status === 'PUBLISHED'
            ? new Date()
            : data.status === 'DRAFT'
            ? null
            : undefined,
      },
    });
  },

  // Delete news
  async deleteNews(id: string) {
    return prisma.news.delete({
      where: { id },
    });
  },
};

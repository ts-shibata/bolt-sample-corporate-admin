import { prisma } from '../prisma/client';

export const contactService = {
  // Get paginated contacts list
  async getContactsList(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [total, items] = await Promise.all([
      prisma.contact.count(),
      prisma.contact.findMany({
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

  // Get single contact by ID
  async getContactById(id: string) {
    return prisma.contact.findUnique({
      where: { id },
    });
  },

  // Mark contact as read
  async markAsRead(id: string) {
    return prisma.contact.update({
      where: { id },
      data: { isRead: true },
    });
  },
};

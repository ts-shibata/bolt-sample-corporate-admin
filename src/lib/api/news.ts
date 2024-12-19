import { createServerSupabaseClient } from '../supabase/server';
import type { News, NewsCategory, NewsStatus } from '@prisma/client';

export type CreateNewsInput = {
  title: string;
  content: string;
  category: NewsCategory;
  status: NewsStatus;
  scheduledAt?: Date | null;
  thumbnailUrl?: string | null;
};

export type UpdateNewsInput = Partial<CreateNewsInput>;

export const newsService = {
  async getNewsList(page: number = 1, limit: number = 10) {
    const supabase = createServerSupabaseClient();
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const [{ count }, { data: items }] = await Promise.all([
      supabase.from('news').select('*', { count: 'exact', head: true }),
      supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })
        .range(start, end),
    ]);

    return {
      items: items || [],
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    };
  },

  async getNewsById(id: string) {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase.from('news').select('*').eq('id', id).single();
    return data;
  },

  async createNews(data: CreateNewsInput) {
    const supabase = createServerSupabaseClient();
    const { data: news, error } = await supabase.from('news').insert([
      {
        ...data,
        published_at: data.status === 'PUBLISHED' ? new Date().toISOString() : null,
      },
    ]).select().single();

    if (error) throw error;
    return news;
  },

  async updateNews(id: string, data: UpdateNewsInput) {
    const supabase = createServerSupabaseClient();
    const { data: news, error } = await supabase
      .from('news')
      .update({
        ...data,
        published_at:
          data.status === 'PUBLISHED'
            ? new Date().toISOString()
            : data.status === 'DRAFT'
            ? null
            : undefined,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return news;
  },

  async deleteNews(id: string) {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from('news').delete().eq('id', id);
    if (error) throw error;
  },
};
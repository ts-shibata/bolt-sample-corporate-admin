import { createServerSupabaseClient } from '../supabase/server';
import type { Contact } from '@prisma/client';

export const contactService = {
  async getContactsList(page: number = 1, limit: number = 10) {
    const supabase = createServerSupabaseClient();
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const [{ count }, { data: items }] = await Promise.all([
      supabase.from('contacts').select('*', { count: 'exact', head: true }),
      supabase
        .from('contacts')
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

  async getContactById(id: string) {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', id)
      .single();
    return data;
  },

  async markAsRead(id: string) {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('contacts')
      .update({ is_read: true })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
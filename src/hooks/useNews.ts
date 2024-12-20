'use client';

import { useState, useCallback } from 'react';
import { supabase } from '@/src/lib/supabase/client';
import type { News } from '@/src/types/news';

interface UseNewsOptions {
  initialPage?: number;
  limit?: number;
}

export function useNews({ initialPage = 1, limit = 10 }: UseNewsOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [news, setNews] = useState<News[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchNews = useCallback(async () => {

    setLoading(true);
    setError(null);
    try {
      const start = (page - 1) * limit;
      const end = start + limit - 1;

      const [{ count }, { data: items }] = await Promise.all([
        supabase.from('news').select('*', { count: 'exact', head: true }),
        supabase
          .from('news')
          .select('*')
          .order('createdAt', { ascending: false })
          .range(start, end),
      ]);

      if (items) {
        setNews(items);
        setTotalPages(Math.ceil((count || 0) / limit));
      }
    } catch (err) {
      setError('Failed to fetch news');
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  const createNews = async (data: Omit<News, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    setError(null);
    try {
      const { data: news, error } = await supabase
        .from('news')
        .insert([
          {
            ...data,
            publishedAt: data.status === 'PUBLISHED' ? new Date().toISOString() : null,
            updatedAt: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return news;
    } catch (err) {
      setError('Failed to create news');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateNews = async (
    id: string,
    data: Partial<Omit<News, 'id' | 'createdAt' | 'updatedAt'>>
  ) => {
    setLoading(true);
    setError(null);
    try {
      const { data: news, error } = await supabase
        .from('news')
        .update({
          ...data,
          publishedAt:
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
    } catch (err) {
      setError('Failed to update news');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    news,
    loading,
    error,
    page,
    totalPages,
    setPage,
    fetchNews,
    createNews,
    updateNews,
  };
}
'use client';

import { useState } from 'react';
// import type { News, NewsCategory, NewsStatus } from '@prisma/client';
import type { CreateNewsInput, UpdateNewsInput } from '@/src/lib/api/news';

interface UseNewsOptions {
  initialPage?: number;
  limit?: number;
}

export function useNews({ initialPage = 1, limit = 10 }: UseNewsOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [news, setNews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/news?page=${page}&limit=${limit}`);
      const data = await response.json();
      setNews(data.items);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError('Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  const createNews = async (data: CreateNewsInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      setError('Failed to create news');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateNews = async (id: string, data: UpdateNewsInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
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

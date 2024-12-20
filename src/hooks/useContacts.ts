'use client';

import { useState, useCallback } from 'react';
import { supabase } from '@/src/lib/supabase/client';
import type { Contact } from '@/src/types/contact';

interface UseContactsOptions {
  initialPage?: number;
  limit?: number;
}

export function useContacts({
  initialPage = 1,
  limit = 10,
}: UseContactsOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const start = (page - 1) * limit;
      const end = start + limit - 1;

      const [{ count }, { data: items }] = await Promise.all([
        supabase.from('contacts').select('*', { count: 'exact', head: true }),
        supabase
          .from('contacts')
          .select('*')
          .order('createdAt', { ascending: false })
          .range(start, end),
      ]);

      if (items) {
        setContacts(items);
        setTotalPages(Math.ceil((count || 0) / limit));
      }
    } catch (err) {
      setError('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  const getContactById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError('Failed to fetch contact');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('contacts')
        .update({ isRead: true })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError('Failed to mark contact as read');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    contacts,
    loading,
    error,
    page,
    totalPages,
    setPage,
    fetchContacts,
    getContactById,
    markAsRead,
  };
}
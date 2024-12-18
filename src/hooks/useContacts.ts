'use client';

import { useState } from 'react';
// import type { Contact } from '@prisma/client';

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
  const [contacts, setContacts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/contacts?page=${page}&limit=${limit}`);
      const data = await response.json();
      setContacts(data.items);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const getContactById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/contacts/${id}`);
      const data = await response.json();
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
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'PATCH',
      });
      const data = await response.json();
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

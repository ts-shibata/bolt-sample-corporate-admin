'use client';

import { useState, useEffect } from 'react';
import { ContactTable } from '@/src/components/contacts/ContactTable';
import { Pagination } from '@/src/components/ui/Pagination';
import { useContacts } from '@/src/hooks/useContacts';

export default function ContactsPage() {
  const {
    contacts,
    loading,
    error,
    page,
    totalPages,
    setPage,
    fetchContacts,
  } = useContacts();

  useEffect(() => {
    fetchContacts();
  }, [page, fetchContacts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">お問い合わせ管理</h1>

      <div className="mt-8">
        <ContactTable contacts={contacts} />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
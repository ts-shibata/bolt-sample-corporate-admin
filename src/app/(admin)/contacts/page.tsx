'use client';

import { useState } from 'react';
import { ContactTable } from '@/src/components/contacts/ContactTable';
import { Pagination } from '@/src/components/ui/Pagination';

// Dummy data for demonstration
const dummyContacts = Array.from({ length: 25 }, (_, i) => ({
  id: `${i + 1}`,
  name: `問い合わせ者 ${i + 1}`,
  email: `contact${i + 1}@example.com`,
  category: ['general', 'business', 'support', 'other'][i % 4] as any,
  message: '問い合わせ内容...',
  createdAt: new Date(),
  isRead: i % 2 === 0,
}));

export default function ContactsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(dummyContacts.length / itemsPerPage);

  const currentContacts = dummyContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">お問い合わせ管理</h1>

      <div className="mt-8">
        <ContactTable contacts={currentContacts} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

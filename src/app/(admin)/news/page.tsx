'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/Button';
import { NewsTable } from '@/src/components/news/NewsTable';
import { Pagination } from '@/src/components/ui/Pagination';
import { PlusIcon } from '@heroicons/react/24/outline';

// Dummy data for demonstration
const dummyNews = Array.from({ length: 25 }, (_, i) => ({
  id: `${i + 1}`,
  title: `お知らせタイトル ${i + 1}`,
  content: 'お知らせ本文...',
  category: ['company', 'product', 'event', 'other'][i % 4] as any,
  status: ['draft', 'published', 'scheduled'][i % 3] as any,
  publishedAt: i % 3 === 1 ? new Date() : null,
  scheduledAt: i % 3 === 2 ? new Date() : null,
  thumbnailUrl: null,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(dummyNews.length / itemsPerPage);

  const currentNews = dummyNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">お知らせ管理</h1>
        <Link href="/news/new">
          <Button className="mt-4 sm:mt-0">
            <PlusIcon className="h-5 w-5 mr-1" />
            新規作成
          </Button>
        </Link>
      </div>

      <div className="mt-8">
        <NewsTable news={currentNews} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

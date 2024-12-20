'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/Button';
import { NewsTable } from '@/src/components/news/NewsTable';
import { Pagination } from '@/src/components/ui/Pagination';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useNews } from '@/src/hooks/useNews';

export default function NewsPage() {
  const { news, loading, error, page, totalPages, setPage, fetchNews } = useNews();

  useEffect(() => {
    fetchNews();
  }, [page, fetchNews]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
        <NewsTable news={news} />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
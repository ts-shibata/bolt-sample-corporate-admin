'use client';

import { useRouter } from 'next/navigation';
import { NewsForm } from '@/src/components/news/NewsForm';
import { useNews } from '@/src/hooks/useNews';

export default function NewNewsPage() {
  const router = useRouter();
  const { createNews } = useNews();

  const handleSubmit = async (data: any) => {
    try {
      await createNews(data);
      router.push('/news');
    } catch (error) {
      console.error('Failed to create news:', error);
      // TODO: Show error message to user
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">
        お知らせ新規作成
      </h1>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <NewsForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
'use client';

import { NewsForm } from '@/src/components/news/NewsForm';

export default function NewNewsPage() {
  const handleSubmit = async (data: any) => {
    console.log('Form submitted:', data);
    // TODO: Implement actual form submission
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

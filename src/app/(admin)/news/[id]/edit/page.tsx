'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NewsForm } from '@/src/components/news/NewsForm';
import { useNews } from '@/src/hooks/useNews';
import type { News } from '@/src/types/news';
import { supabase } from '@/src/lib/supabase/client';

export default function EditNewsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { updateNews } = useNews();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await supabase
          .from('news')
          .select('*')
          .eq('id', params.id)
          .single();
        if (data) {
          setNews(data);
        }
      } catch (err) {
        setError('Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [params.id]);

  const handleSubmit = async (data: any) => {
    try {
      await updateNews(params.id, data);
      router.push('/news');
    } catch (error) {
      console.error('Failed to update news:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!news) return <div>News not found</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">
        お知らせ編集
      </h1>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <NewsForm initialData={news} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
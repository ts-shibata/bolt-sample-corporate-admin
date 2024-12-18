'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/src/components/ui/Button';
import { News, NewsCategory, NewsStatus } from '@/src/types/news';

interface NewsFormData {
  title: string;
  content: string;
  category: NewsCategory;
  status: NewsStatus;
  scheduledAt?: string;
  thumbnailUrl?: string;
}

interface NewsFormProps {
  initialData?: News;
  onSubmit: (data: NewsFormData) => void;
}

export function NewsForm({ initialData, onSubmit }: NewsFormProps) {
  const { register, handleSubmit, watch } = useForm<NewsFormData>({
    defaultValues: initialData
      ? {
          title: initialData.title,
          content: initialData.content,
          category: initialData.category,
          status: initialData.status,
          scheduledAt: initialData.scheduledAt
            ? new Date(initialData.scheduledAt).toISOString().slice(0, 16)
            : undefined,
          thumbnailUrl: initialData.thumbnailUrl || undefined,
        }
      : {
          status: 'draft',
        },
  });

  const status = watch('status');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          タイトル
        </label>
        <input
          type="text"
          id="title"
          {...register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          カテゴリー
        </label>
        <select
          id="category"
          {...register('category')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="company">会社情報</option>
          <option value="product">製品情報</option>
          <option value="event">イベント</option>
          <option value="other">その他</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          本文
        </label>
        <textarea
          id="content"
          rows={10}
          {...register('content')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          ステータス
        </label>
        <select
          id="status"
          {...register('status')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="draft">下書き</option>
          <option value="published">公開</option>
          <option value="scheduled">予約投稿</option>
        </select>
      </div>

      {status === 'scheduled' && (
        <div>
          <label
            htmlFor="scheduledAt"
            className="block text-sm font-medium text-gray-700"
          >
            公開予定日時
          </label>
          <input
            type="datetime-local"
            id="scheduledAt"
            {...register('scheduledAt')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      )}

      <div>
        <label
          htmlFor="thumbnail"
          className="block text-sm font-medium text-gray-700"
        >
          アイキャッチ画像
        </label>
        <input
          type="file"
          id="thumbnail"
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline">
          キャンセル
        </Button>
        <Button type="submit">保存</Button>
      </div>
    </form>
  );
}

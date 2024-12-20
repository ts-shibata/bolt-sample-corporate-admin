'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/src/components/ui/Button';
import { News, NewsCategory, NewsStatus } from '@/src/types/news';
import { useState } from 'react';
import Image from 'next/image';

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
  const { register, handleSubmit, watch, setValue } = useForm<NewsFormData>({
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
          status: 'DRAFT',
        },
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.thumbnailUrl || null
  );

  const status = watch('status');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setValue('thumbnailUrl', url);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          タイトル
        </label>
        <input
          type="text"
          id="title"
          {...register('title')}
          className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          カテゴリー
        </label>
        <select
          id="category"
          {...register('category')}
          className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="COMPANY">会社情報</option>
          <option value="PRODUCT">製品情報</option>
          <option value="EVENT">イベント</option>
          <option value="OTHER">その他</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          本文
        </label>
        <textarea
          id="content"
          rows={10}
          {...register('content')}
          className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          ステータス
        </label>
        <select
          id="status"
          {...register('status')}
          className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="DRAFT">下書き</option>
          <option value="PUBLISHED">公開</option>
          <option value="SCHEDULED">予約投稿</option>
        </select>
      </div>

      {status === 'SCHEDULED' && (
        <div>
          <label
            htmlFor="scheduledAt"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            公開予定日時
          </label>
          <input
            type="datetime-local"
            id="scheduledAt"
            {...register('scheduledAt')}
            className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      )}

      <div>
        <label
          htmlFor="thumbnail"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          アイキャッチ画像
        </label>
        <input
          type="file"
          id="thumbnail"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        {previewUrl && (
          <div className="mt-2">
            <Image
              src={previewUrl}
              alt="サムネイルプレビュー"
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          キャンセル
        </Button>
        <Button type="submit">保存</Button>
      </div>
    </form>
  );
}
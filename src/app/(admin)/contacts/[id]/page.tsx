'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/Button';
import { format } from 'date-fns';

// Dummy data for demonstration
const dummyContact = {
  id: '1',
  name: '問い合わせ者 1',
  email: 'contact1@example.com',
  category: 'general',
  message:
    'お問い合わせ内容のサンプルテキストです。\n\n詳細な内容がここに表示されます。',
  createdAt: new Date(),
  isRead: false,
};

export default function ContactDetailPage() {
  const params = useParams();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          お問い合わせ詳細
        </h1>
        <Button variant="outline" onClick={handleBack} className="mt-4 sm:mt-0">
          戻る
        </Button>
      </div>

      <div className="mt-8 bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">お名前</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {dummyContact.name}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                メールアドレス
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {dummyContact.email}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">カテゴリー</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {dummyContact.category}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">受信日時</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {format(dummyContact.createdAt, 'yyyy/MM/dd HH:mm')}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                お問い合わせ内容
              </dt>
              <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                {dummyContact.message}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

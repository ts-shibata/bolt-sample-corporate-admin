'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/Button';
import { format } from 'date-fns';
import { useContacts } from '@/src/hooks/useContacts';
import type { Contact } from '@/src/types/contact';

export default function ContactDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getContactById, markAsRead } = useContacts();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await getContactById(params.id as string);
        setContact(data);
      } catch (err) {
        setError('Failed to fetch contact');
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [params.id, getContactById]);

  const handleBack = () => {
    router.back();
  };

  const handleMarkAsRead = async () => {
    if (!contact || contact.isRead) return;
    try {
      await markAsRead(contact.id);
      setContact({ ...contact, isRead: true });
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!contact) return <div>Contact not found</div>;

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          お問い合わせ詳細
        </h1>
        <div className="mt-4 sm:mt-0 space-x-3">
          {!contact.isRead && (
            <Button onClick={handleMarkAsRead}>既読にする</Button>
          )}
          <Button variant="outline" onClick={handleBack}>
            戻る
          </Button>
        </div>
      </div>

      <div className="mt-8 bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">お名前</dt>
              <dd className="mt-1 text-sm text-gray-900">{contact.name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                メールアドレス
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{contact.email}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">カテゴリー</dt>
              <dd className="mt-1 text-sm text-gray-900">{contact.category}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">受信日時</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {format(new Date(contact.createdAt), 'yyyy/MM/dd HH:mm')}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                お問い合わせ内容
              </dt>
              <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                {contact.message}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
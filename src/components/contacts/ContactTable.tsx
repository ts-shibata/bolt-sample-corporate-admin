import Link from 'next/link';
import { format } from 'date-fns';
import { Contact } from '@/src/types/contact';
import { Button } from '@/src/components/ui/Button';

interface ContactTableProps {
  contacts: Contact[];
}

export function ContactTable({ contacts }: ContactTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
              名前
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              メールアドレス
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              カテゴリー
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              受信日時
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              ステータス
            </th>
            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">詳細</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                {contact.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {contact.email}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {contact.category}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {format(new Date(contact.createdAt), 'yyyy/MM/dd HH:mm')}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    contact.isRead
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {contact.isRead ? '既読' : '未読'}
                </span>
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <Link href={`/contacts/${contact.id}`}>
                  <Button variant="ghost" size="sm">
                    詳細
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
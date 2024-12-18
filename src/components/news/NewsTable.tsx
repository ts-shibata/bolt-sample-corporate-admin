import Link from 'next/link';
import { format } from 'date-fns';
import { News } from '@/src/types/news';
import { Button } from '@/src/components/ui/Button';
import { PencilIcon } from '@heroicons/react/24/outline';

interface NewsTableProps {
  news: News[];
}

export function NewsTable({ news }: NewsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
              タイトル
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              カテゴリー
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              ステータス
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              公開日
            </th>
            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">編集</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {news.map((item) => (
            <tr key={item.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                {item.title}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {item.category}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {item.status}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {item.publishedAt
                  ? format(item.publishedAt, 'yyyy/MM/dd')
                  : '-'}
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <Link href={`/news/${item.id}/edit`}>
                  <Button variant="ghost" size="sm">
                    <PencilIcon className="h-4 w-4 mr-1" />
                    編集
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

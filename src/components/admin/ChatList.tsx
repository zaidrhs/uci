import React from 'react';
import { useChats } from '../../hooks/useChats';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { cn } from '../../lib/utils'; // تأكد من أنك قد قمت بإعداد هذا المساعد
import { useAuth } from '../../contexts/AuthContext'; // استيراد استخدام السياق الخاص بالمصادقة

interface ChatListProps {
  onSelectChat: (chatId: string) => void;
  selectedChatId: string | null;
  userId: string | undefined; // إضافة خاصية userId إلى الواجهة
}

export default function ChatList({ onSelectChat, selectedChatId, userId }: ChatListProps) {
  const { chats, isLoading, error } = useChats(); // استخدام hook لجلب المحادثات

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-red-600">
        Error loading chats: {error.message}
      </div>
    );
  }

  // تصفية المحادثات بحيث تعرض فقط المحادثات التي تخص المستخدم المتصل
  const userChats = chats.filter(chat => chat.userId === userId); // فلترة المحادثات حسب userId

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">Active Chats</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {userChats.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
            No chats available
          </div>
        ) : (
          userChats.map((chat) => (
            <li
              key={chat.id}
              className={cn(
                'hover:bg-gray-50 cursor-pointer',
                selectedChatId === chat.id && 'bg-blue-50'
              )}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  {/* عرض اسم المستخدم */}
                  <p className="text-sm font-medium text-blue-600 truncate">{chat.user.name}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {chat.status}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="text-sm text-gray-500">
                      {chat.messages.length > 0
                        ? chat.messages[chat.messages.length - 1]?.content.substring(0, 50) + '...'
                        : 'No messages yet.'}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p className="text-xs">
                      {formatDistanceToNow(new Date(chat.updatedAt))} ago
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

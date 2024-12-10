import React, { useState, useEffect } from 'react';
import { useChat } from '../../hooks/useChat';
import { Chat } from '../../types/index';
import { formatDistanceToNow } from '../../utils/dateUtils'; // استخدم دالة لتنسيق الوقت
import { cn } from '../../lib/utils'; // تأكد من أنك قد قمت بإعداد هذا المساعد

interface ChatDetailsProps {
  chatId: string;
}

export default function ChatDetails({ chatId }: ChatDetailsProps) {
  const { chat, isLoading, error, sendMessage } = useChat(chatId); // استخدام hook لجلب تفاصيل المحادثة
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; // تأكد من أن الرسالة غير فارغة
    await sendMessage(newMessage);
    setNewMessage(''); // مسح خانة الرسالة بعد الإرسال
  };

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
        Error loading chat details: {error.message}
      </div>
    );
  }

  if (!chat) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        Chat not found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">Chat with {chat.user.name}</h3>
      </div>
      <div className="max-h-96 overflow-y-auto p-4">
        <ul className="space-y-4">
          {chat.messages.map((message, index) => (
            <li
              key={index}
              className={cn(
                'flex flex-col',
                message.userId === 'admin' ? 'items-end' : 'items-start'
              )}
            >
              <div className="flex items-center space-x-2">
                {message.userId !== 'admin' && (
                  <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
                    {chat.user.name[0]}
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  {message.userId !== 'admin' ? chat.user.name : 'Admin'}{' '}
                  <span className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(message.createdAt))} ago
                  </span>
                </div>
              </div>
              <div className={cn('mt-2', message.userId === 'admin' ? 'bg-blue-100' : 'bg-gray-100')}>
                <p className="p-2 text-sm">{message.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

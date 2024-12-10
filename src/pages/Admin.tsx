// Admin.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // لاستخدام السياق للتحقق من الدخول
import ChatList from '../components/admin/ChatList'; // مكون قائمة المحادثات
import ChatDetails from '../components/admin/ChatDetails'; // مكون تفاصيل المحادثة

export default function Admin() {
  const { user, isAuthenticated } = useAuth(); // الحصول على المستخدم وحالة تسجيل الدخول
  const navigate = useNavigate(); // لاستخدام التوجيه في React Router
  const [selectedChatId, setSelectedChatId] = React.useState<string | null>(null); // حالة للمحادثة المختارة

  // التحقق إذا كان المستخدم مسجل دخول وكان دوره "ADMIN"
  React.useEffect(() => {
    if (!isAuthenticated || user?.role !== 'ADMIN') {
      navigate('/login'); // إذا لم يكن هناك دخول أو إذا لم يكن الدور ADMIN، اذهب إلى صفحة الدخول
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Customer Support Dashboard
            </h2>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            {/* قائمة المحادثات */}
            <ChatList 
              onSelectChat={setSelectedChatId} 
              selectedChatId={selectedChatId} 
              userId={user?.id} // تمرير userId هنا
            />
          </div>
          <div className="lg:col-span-2">
            {/* عرض تفاصيل المحادثة عند تحديد المحادثة */}
            {selectedChatId ? (
              <ChatDetails chatId={selectedChatId} />
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                Select a chat to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

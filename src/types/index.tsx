export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'EMPLOYEE' | 'USER';
  imageUrl?: string; // رابط صورة المستخدم (اختياري)
}

export interface Message {
  id: string;
  content: string;
  chatId: string;
  userId: string;
  createdAt: string; // تاريخ إرسال الرسالة
  imageUrl?: string; // رابط صورة الرسالة (اختياري)
}

export interface Chat {
  id: string;
  userId: string;  // معرف المستخدم الذي بدأ المحادثة
  user: User;      // معلومات المستخدم الذي يتحدث
  messages: Message[];  // قائمة الرسائل
  status: 'OPEN' | 'CLOSED';  // حالة المحادثة
  createdAt: string; // تاريخ إنشاء المحادثة
  updatedAt: string; // تاريخ آخر تحديث للمحادثة
  lastMessageAt?: string;  // تاريخ آخر رسالة تم إرسالها (اختياري)
}

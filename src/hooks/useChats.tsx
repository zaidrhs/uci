// useChats.ts
import { useState, useEffect } from 'react';
import { Chat } from '../types';
import { db } from '../contexts/firebase'; // تأكد من أنك قد قمت بإعداد الاتصال بـ Firebase
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export function useChats() {
  const [chats, setChats] = useState<Chat[]>([]); // تخزين المحادثات
  const [isLoading, setIsLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState<Error | null>(null); // حالة الخطأ

  useEffect(() => {
    const fetchChats = async () => {
      try {
        // جلب المحادثات من Firebase
        const chatsRef = collection(db, 'chats');
        const q = query(chatsRef, orderBy('createdAt', 'desc')); // ترتيب المحادثات بناءً على تاريخ الإنشاء
        const querySnapshot = await getDocs(q);

        // تحويل البيانات المجلوبة إلى تنسيق يناسب النوع Chat
        const chatsData: Chat[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Chat[];

        // تحديث الحالة بالمحادثات
        setChats(chatsData);
      } catch (err) {
        // التعامل مع الأخطاء
        setError(err instanceof Error ? err : new Error('An error occurred while fetching the chats'));
      } finally {
        setIsLoading(false); // إيقاف حالة التحميل
      }
    };

    fetchChats();
  }, []); // يتم تنفيذ useEffect مرة واحدة عند تحميل المكون

  return { chats, isLoading, error }; // إرجاع البيانات والحالات
}

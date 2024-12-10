import { useState, useEffect } from 'react';
import { Chat } from '../types';
import { db } from '../contexts/firebase'; // يجب إعداد الاتصال بـ Firebase
import { doc, getDoc, setDoc, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

export function useChat(chatId: string) {
  const [chat, setChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // جلب المحادثة عند تحميل الـ chatId
  useEffect(() => {
    const fetchChat = async () => {
      try {
        // قراءة المحادثة من Firebase باستخدام المعرف chatId
        const chatRef = doc(db, 'chats', chatId);
        const chatDoc = await getDoc(chatRef);

        if (chatDoc.exists()) {
          setChat({
            id: chatDoc.id,
            ...chatDoc.data(),
          } as Chat);
        } else {
          setChat(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred while fetching the chat'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchChat();
  }, [chatId]);

  // مراقبة الرسائل في المحادثة بشكل ديناميكي
  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = onSnapshot(
      query(collection(db, 'chats', chatId, 'messages'), orderBy('createdAt')),
      (snapshot) => {
        const messages = snapshot.docs.map((doc) => doc.data());
        setChat((prevChat) => (prevChat ? {
          ...prevChat,
          messages: messages as Chat['messages'],
        } : prevChat));
      },
      (error) => setError(error)
    );

    return () => unsubscribe();
  }, [chatId]);

  // وظيفة إرسال الرسالة إلى Firebase
  const sendMessage = async (content: string) => {
    if (!content.trim()) return; // تحقق إذا كانت الرسالة فارغة

    try {
      // إعداد الرسالة الجديدة
      const newMessage = {
        content,
        createdAt: new Date().toISOString(),
        userId: 'admin', // يمكن تعديلها لتكون بناءً على المستخدم الذي أرسل الرسالة
      };

      // إضافة الرسالة إلى مجموعة الرسائل
      await addDoc(collection(db, 'chats', chatId, 'messages'), newMessage);

      // تحديث تاريخ آخر تحديث للمحادثة
      const chatRef = doc(db, 'chats', chatId);
      await setDoc(chatRef, {
        updatedAt: new Date().toISOString(),
      }, { merge: true });

    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred while sending the message'));
    }
  };

  return { chat, isLoading, error, sendMessage };
}

import React, { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { db, collection, addDoc, Timestamp, onSnapshot, query, orderBy } from "../contexts/firebase";
import { useAuth } from "../contexts/AuthContext"; // استيراد useAuth للحصول على حالة المستخدم

interface Message {
  text: string;
  timestamp: Timestamp;
  sender: "client" | "admin";
}

export default function LiveChat({ roomId }: { roomId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated } = useAuth(); // جلب بيانات المستخدم من AuthContext

  // تحديد من هو الـ sender بناءً على المستخدم الحالي
  const sender = isAuthenticated && user ? "client" : "admin"; // if authenticated, sender is 'client', otherwise 'admin'

  // الاستماع للتحديثات الفورية من Firestore
  useEffect(() => {
    const messagesRef = collection(db, `chatRooms/${roomId}/messages`);
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            text: data.text,
            timestamp: data.timestamp,
            sender: data.sender,
          };
        })
      );
    });

    return () => unsubscribe();
  }, [roomId]);

  // إرسال رسالة جديدة إلى Firestore
  const sendMessage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (message.trim()) {
        if (!isAuthenticated || !user) {
          setError("You must be logged in to send a message");
          return;
        }
        if (!sender) {
          setError("Sender is not defined");
          return;
        }
        const messagesRef = collection(db, `chatRooms/${roomId}/messages`);
        try {
          await addDoc(messagesRef, {
            text: message,
            timestamp: Timestamp.now(),
            sender: sender,
            userId: user.id,
          });
          setMessage("");
          setError(null);
        } catch (error: any) {
          setError("Error sending message");
          console.error("Error sending message:", error);
        }
      } else {
        setError("Message cannot be empty");
      }
    },
    [message, sender, roomId, isAuthenticated, user]
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col">
          <div className="p-4 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">Live Chat</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="flex items-center justify-center">
                  <p className="text-sm text-gray-400">No messages yet. Start chatting!</p>
                </div>
              )}
              {messages.map((msg, index) => (
                <div key={index} className={msg.sender === sender ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={`rounded-lg p-2 text-sm ${msg.sender === sender ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-800"}`}
                  >
                    <p>{msg.text}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(msg.timestamp.seconds * 1000).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {error && (
            <div className="p-2 bg-red-500 text-white text-center">
              {error}
            </div>
          )}

          <div className="p-4 border-t">
            <form onSubmit={sendMessage} className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button type="submit" className="inline-flex items-center justify-center rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700">
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

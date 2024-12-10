import { Chat, Message, User } from '../types';

const mockUsers: User[] = [
  { id: '1', email: 'john@example.com', name: 'John Doe', role: 'USER' },
  { id: '2', email: 'jane@example.com', name: 'Jane Smith', role: 'USER' },
  { id: '3', email: 'bob@example.com', name: 'Bob Johnson', role: 'USER' },
];

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hello, I need help with my order',
    chatId: '1',
    userId: '1',
    createdAt: '2024-03-10T10:00:00Z',
  },
  {
    id: '2',
    content: 'Of course! What seems to be the issue?',
    chatId: '1',
    userId: 'admin',
    createdAt: '2024-03-10T10:05:00Z',
  },
  {
    id: '3',
    content: 'Hi, I have a question about your products',
    chatId: '2',
    userId: '2',
    createdAt: '2024-03-10T11:00:00Z',
  },
  {
    id: '4',
    content: "I'd be happy to help! What would you like to know?",
    chatId: '2',
    userId: 'admin',
    createdAt: '2024-03-10T11:02:00Z',
  },
];

const mockChats: Chat[] = [
  {
    id: '1',
    userId: '1',
    user: mockUsers[0],
    messages: mockMessages.filter(m => m.chatId === '1'),
    status: 'OPEN',
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-10T10:05:00Z',
  },
  {
    id: '2',
    userId: '2',
    user: mockUsers[1],
    messages: mockMessages.filter(m => m.chatId === '2'),
    status: 'OPEN',
    createdAt: '2024-03-10T11:00:00Z',
    updatedAt: '2024-03-10T11:02:00Z',
  },
];

export class MockChatService {
  private chats: Chat[] = [...mockChats];
  private messageCounter = mockMessages.length;

  async getChats(): Promise<Chat[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.chats);
      }, 500);
    });
  }

  async getChat(chatId: string): Promise<Chat | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const chat = this.chats.find(c => c.id === chatId) || null;
        resolve(chat);
      }, 500);
    });
  }

  async sendMessage(chatId: string, content: string, isAdmin: boolean): Promise<Message> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMessage: Message = {
          id: String(++this.messageCounter),
          content,
          chatId,
          userId: isAdmin ? 'admin' : chatId,
          createdAt: new Date().toISOString(),
        };

        const chatIndex = this.chats.findIndex(c => c.id === chatId);
        if (chatIndex !== -1) {
          this.chats[chatIndex] = {
            ...this.chats[chatIndex],
            messages: [...this.chats[chatIndex].messages, newMessage],
            updatedAt: new Date().toISOString(),
          };
        }

        resolve(newMessage);
      }, 200);
    });
  }
}

export const chatService = new MockChatService();
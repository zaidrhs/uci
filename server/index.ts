import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const prisma = new PrismaClient();

// Middleware
app.use(express.json());

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string(),
    });

    const { email, password, name } = schema.parse(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret');
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const schema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { email, password } = schema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret');
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

// Chat routes
app.post('/api/chat/start', async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    const chat = await prisma.chat.create({
      data: {
        userId,
      },
    });
    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to start chat' });
  }
});

// Notification routes
app.post('/api/notifications', async (req, res) => {
  try {
    const schema = z.object({
      title: z.string(),
      content: z.string(),
      type: z.enum(['CHAT', 'SYSTEM', 'SUPPORT']),
    });

    const { title, content, type } = schema.parse(req.body);
    const notification = await prisma.notification.create({
      data: {
        title,
        content,
        type,
      },
    });

    // Send email to admin
    const transporter = nodemailer.createTransport({
      // Configure your email service
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: title,
      text: content,
    });

    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create notification' });
  }
});

// Socket.IO chat handling
io.on('connection', (socket) => {
  socket.on('join-chat', (chatId) => {
    socket.join(chatId);
  });

  socket.on('message', async ({ chatId, userId, content }) => {
    try {
      const message = await prisma.message.create({
        data: {
          content,
          chatId,
          userId,
        },
      });

      io.to(chatId).emit('message', message);
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
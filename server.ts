import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Groq API Endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages } = req.body;
      const apiKey = process.env.GROQ_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: 'GROQ_API_KEY is not configured in the environment.' });
      }

      const groq = new Groq({ apiKey });

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are the Bastion Audit AI Assistant, an expert in Canadian Financial Services security, compliance (OSFI E-21, PIPEDA, SOC2), and AI security posture management. You provide professional, institutional-grade advice and analysis for Tier-1 banks.'
          },
          ...messages
        ],
        model: 'llama-3.3-70b-versatile',
      });

      res.json({ message: completion.choices[0].message.content });
    } catch (error: any) {
      console.error('Groq API Error:', error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

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

  // Lakera Guard security scan endpoint
  app.post('/api/security/scan', async (req, res) => {
    try {
      const { input } = req.body;
      const apiKey = process.env.LAKERA_GUARD_API_KEY;

      if (!apiKey) {
        // Return a mock success if key is missing during development, 
        // but tell the client it's not actually scanning.
        return res.status(200).json({ 
          warning: 'LAKERA_GUARD_API_KEY missing. Security scan bypassed.',
          results: [{ categories: {}, flag: false }] 
        });
      }

      // Use prompt_injection endpoint for broader availability and reliability
      // We transform the response to match the 'results' structure expected by Chat.tsx
      const response = await fetch('https://api.lakera.ai/v1/prompt_injection', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input: input,
        })
      });

      if (!response.ok) {
        // If prompt_injection also fails with 404, the path is definitively different
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Lakera API returned ${response.status}`);
      }

      const rawData: any = await response.json();
      
      // Transform to the structure expected by the client: { results: [{ flag, categories: { ... } }] }
      const data = {
        results: [{
          flag: rawData.flagged || false,
          categories: {
            prompt_injection: rawData.flagged || false
          }
        }]
      };
      
      res.json(data);
    } catch (error: any) {
      console.error('Lakera Guard API Proxy Error:', error);
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

import path from 'path';
import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const ttsPlugin = (): Plugin => ({
  name: 'vietnamese-tts-proxy',
  configureServer(server) {
    server.middlewares.use('/api/tts', async (req, res) => {
      try {
        const url = new URL(req.url || '', 'http://localhost:3000');
        const text = url.searchParams.get('text') || '';
        if (!text) {
          res.statusCode = 400;
          res.end('Missing text parameter');
          return;
        }

        const encoded = encodeURIComponent(text.trim());
        const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encoded}`;
        
        const response = await fetch(ttsUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://translate.google.com/'
          }
        });

        if (!response.ok) {
          res.statusCode = response.status;
          res.end('TTS request failed');
          return;
        }

        const buffer = await response.arrayBuffer();
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.end(Buffer.from(buffer));
      } catch (e) {
        res.statusCode = 500;
        res.end('Internal TTS error');
      }
    });
  }
});

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), ttsPlugin()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});

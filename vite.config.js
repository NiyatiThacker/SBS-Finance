import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { pathToFileURL } from 'url';

// Custom plugin to mock Vercel API routes locally in Vite
const vercelApiPlugin = () => ({
  name: 'vercel-api-plugin',
  configureServer(server) {
    // Load env vars into process.env so the API route can read them
    Object.assign(process.env, loadEnv('development', process.cwd(), ''));

    server.middlewares.use(async (req, res, next) => {
      if (req.url.startsWith('/api/contact') && req.method === 'POST') {
        try {
          // Parse JSON body
          const buffers = [];
          for await (const chunk of req) {
            buffers.push(chunk);
          }
          const data = Buffer.concat(buffers).toString();
          if (data) req.body = JSON.parse(data);

          // Mock Vercel response methods
          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          };

          // Execute the Vercel function using an absolute file:// URL
          const absolutePath = path.join(process.cwd(), 'api', 'contact.js');
          const fileUrl = pathToFileURL(absolutePath).href + '?update=' + Date.now();
          const { default: handler } = await import(fileUrl);
          await handler(req, res);
          return;
        } catch (err) {
          console.error('API Error:', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Internal Server Error' }));
          return;
        }
      }
      next();
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vercelApiPlugin()],
  server: {
    proxy: {
      '/api/chat': 'http://127.0.0.1:8001',
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  }
});

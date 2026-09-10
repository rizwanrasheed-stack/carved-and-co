import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function devEmailMiddleware(): Plugin {
  return {
    name: 'dev-email-mock',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';
        if (req.method === 'POST' && (url === '/api/send-email.php' || url === '/send-email.php')) {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');
              const ref = data.referenceNumber || data.quoteId || `INQ-${Date.now().toString(36).toUpperCase()}`;
              const attachmentsCount = Array.isArray(data.referenceImages) ? data.referenceImages.length : 0;
              
              console.log(
                `[CARVED & CO. Dev Concierge] Received inquiry Ref: ${ref} for carvedandco@carvedandco.net with ${attachmentsCount} attachment(s).`
              );

              res.setHeader('Content-Type', 'application/json; charset=UTF-8');
              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  success: true,
                  mailSent: true,
                  referenceNumber: ref,
                  recipient: 'carvedandco@carvedandco.net',
                  attachmentsCount,
                  message: `Inquiry with ${attachmentsCount} attachment(s) received and dispatched to carvedandco@carvedandco.net (Dev Simulation). In production on Hostinger, native PHP mail() attaches the files.`,
                })
              );
            } catch {
              res.setHeader('Content-Type', 'application/json; charset=UTF-8');
              res.statusCode = 400;
              res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload' }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), devEmailMiddleware()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      port: 3000,
      host: '0.0.0.0',
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },
  };
});

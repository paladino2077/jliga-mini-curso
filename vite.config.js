import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      // Proxy para a API do RD Station CRM (contorna CORS no dev).
      // Em produção, configure regra equivalente no hosting:
      //   - Netlify: _redirects → "/rd-api/*  https://crm.rdstation.com/api/v1/:splat  200"
      //   - Vercel: vercel.json rewrites
      //   - Cloudflare Pages: _redirects (mesmo formato Netlify)
      '/rd-api': {
        target: 'https://crm.rdstation.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/rd-api/, '/api/v1'),
      },
    },
  },
});

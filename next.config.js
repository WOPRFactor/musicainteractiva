/** @type {import('next').NextConfig} */

// Destino del backend Flask. En local: http://localhost:5000.
// En Docker: http://backend:5000 (inyectado por docker-compose).
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

const nextConfig = {
  async rewrites() {
    return [
      {
        // El navegador llama /api/* (mismo origen) y Next lo reenvía a Flask.
        // Así no hay CORS y las cookies httpOnly viajan sin fricción.
        source: '/api/:path*',
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

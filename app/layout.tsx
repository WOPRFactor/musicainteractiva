import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Escuela de Música Interactiva',
  description: 'Plataforma interactiva para aprender música',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 min-h-screen antialiased">{children}</body>
    </html>
  );
}

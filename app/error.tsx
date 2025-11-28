"use client";
import Link from "next/link";
import React from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-800">
        <h2 className="text-3xl font-bold mb-4">¡Uy! Algo salió mal.</h2>
        <p className="mb-6">Ha ocurrido un error inesperado. Por favor, intenta recargar la página o vuelve al inicio.</p>
        <div className="flex gap-4">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
          >
            Ir al inicio
          </Link>
        </div>
        <pre className="mt-8 p-4 bg-red-100 rounded text-xs max-w-xl overflow-x-auto">{error?.message}</pre>
      </body>
    </html>
  );
} 
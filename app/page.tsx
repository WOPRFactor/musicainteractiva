import React from 'react';
import Navbar from './components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Bienvenido a la Escuela de Música Interactiva
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Descubre el maravilloso mundo de la música a través de nuestra plataforma interactiva
          </p>
          <div className="mt-8">
            <Link href="/teoria" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Comenzar a Aprender
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              ¿Por qué elegirnos?
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Folklore Argentino',
                description: 'Explorá las raíces, ritmos y melodías del folklore argentino de manera interactiva.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-indigo-600 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3" />
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <path d="M8 16c1.5-2 6.5-2 8 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                )
              },
              {
                title: 'Armonía',
                description: 'Domina los conceptos de armonía y composición musical.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-indigo-600 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M4 8h16M4 16h16" />
                    <rect x="7" y="6" width="2" height="12" rx="1" fill="currentColor" />
                  </svg>
                )
              },
              {
                title: 'Ritmo',
                description: 'Desarrolla tu sentido del ritmo con ejercicios prácticos.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-indigo-600 mx-auto">
                    <rect x="4" y="14" width="16" height="6" rx="2" fill="currentColor" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 14V6m8 8V6" />
                  </svg>
                )
              },
              {
                title: 'Exclusivo Bajistas',
                description: 'El mundo en clave de Fa.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" className="w-10 h-10 text-indigo-600 mx-auto">
                    <circle cx="48" cy="20" r="2.5" fill="currentColor" />
                    <circle cx="48" cy="32" r="2.5" fill="currentColor" />
                    <path d="M24 52c0-12 8-20 20-20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="24" cy="52" r="3" fill="currentColor" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div key={index} className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">¿Listo para comenzar tu viaje musical?</span>
            <span className="block text-indigo-200">Comienza hoy mismo.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="/teoria" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                Explorar Cursos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 
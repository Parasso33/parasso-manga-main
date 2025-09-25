// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import MangaCard from '@/components/MangaCard';
import { mangaData } from '@/data/manga';

const carouselImages = [
  '/images/bleachi.jpg',
  '/images/dmsl.jpg',
  '/images/op.jpg',
  '/images/saka.jpg',
  '/images/bl.jpg'
];

const Home: React.FC = () => {
  const { translation } = useApp();
  const mangas = Object.values(mangaData);
  const latestMangas = mangas.slice(0, 5);
  const popularMangas = mangas.slice(-5);

  const [currentIndex, setCurrentIndex] = useState(0);

  // autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">

      {/* Top carousel */}
      <div className="w-full max-w-full mt-0" style={{ backgroundColor: '#171A1C' }}>
        <div className="relative w-full h-56 md:h-80 rounded-none overflow-hidden">
          {carouselImages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`slide-${i}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-600 ${i === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              loading="lazy"
            />
          ))}

          {/* Dots */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
            {carouselImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    <div className="flex-1 flex flex-col justify-center">
      <div className="container mx-auto px-4 py-8">
        {/* Latest section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#FF6633' }}>
            {translation.latestChapters || 'Latest'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {latestMangas.map((m) => (
              <MangaCard key={m.id} manga={m}/>
            ))}
          </div>
        </section>

        {/* Popular section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#FF6633' }}>
            {translation.popularManga || 'Popular'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {popularMangas.map((m) => (
              <MangaCard key={m.id} manga={m} />
            ))}
          </div>
        </section>
      </div>
    </div>
    </div>
  );
};

export default Home;

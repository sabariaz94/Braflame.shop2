'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const slides = [

  {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/iMaW6lQp334?autoplay=1&mute=1&loop=1&playlist=iMaW6lQp334',
    thumbnail: '/assets/imgs/thumb-youtube.jpg',
  },
];

export default function HeroSlider() {
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        effect="fade"
        navigation
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          renderBullet: (index, className) => `
            <span class="${className} swiper-thumb group cursor-pointer relative">
              <img src="${slides[index].thumbnail}" alt="${slides[index].title}" class="w-14 h-14 rounded-full border-2 border-white group-hover:border-pink-400 shadow-lg transition" />
              <span class="absolute top-full mt-1 text-xs text-white bg-black bg-opacity-70 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition">
                ${slides[index].title}
              </span>
            </span>
          `,
        }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-screen">
              {/* Background */}
              {slide.type === 'image' && (
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 8, ease: 'easeOut' }}
                  className="w-full h-full absolute"
                >
                  <Image
                    src={slide.url}
                    alt={slide.caption}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </motion.div>
              )}

              {slide.type === 'youtube' && (
                <iframe
                  src={slide.url}
                  allow="autoplay; encrypted-media"
                  muted={muted ? 1 : 0}
                  allowFullScreen
                  className="absolute w-full h-full object-cover"
                  title={slide.title}
                />
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-10" />

              {/* Caption */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 text-center px-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1
                  className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 drop-shadow-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {slide.caption}
                </motion.h1>

                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  
                 
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <div className="custom-pagination absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-30" />
    </section>
  );
}


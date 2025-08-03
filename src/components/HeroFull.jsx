'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const slides = [
  {
    type: 'video', // Local MP4 video
    baseUrl: "/images/video.mp4", // Path from /public folder
    thumbnail: '/assets/images/hero-1.jpg',
    caption: 'Luxury • Comfort • Confidence',
  },
];

export default function HeroSlider() {
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    setMuted((prev) => !prev);
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
              <img src="${slides[index].thumbnail}" alt="${slides[index].caption}" class="w-14 h-14 rounded-full border-2 border-white group-hover:border-pink-400 shadow-lg transition" />
              <span class="absolute top-full mt-1 text-xs text-white bg-black bg-opacity-70 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition">
                ${slides[index].caption}
              </span>
            </span>
          `,
        }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-screen">
              {/* Local MP4 Video */}
              {slide.type === 'video' && (
                <div className="relative w-full h-full">
                  <video
                    src={slide.baseUrl}
                    muted={muted}
                    autoPlay
                    loop
                    playsInline
                    className="absolute w-full h-full object-cover"
                  />
                  {/* Mute / Unmute Button */}
                  <button
                    onClick={toggleMute}
                    className="absolute bottom-6 right-6 z-50 bg-black/50 text-white px-4 py-2 rounded hover:bg-black/70 transition"
                  >
                    {muted ? '🔇 Unmute' : '🔊 Mute'}
                  </button>
                </div>
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

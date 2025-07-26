'use client';

import { motion, useAnimation } from 'framer-motion';
import ProductCard from './ProductCart';
import { useEffect, useState } from 'react';

export default function AutoScrollSection({ title, products = [] }) {
  const [scrollSpeed, setScrollSpeed] = useState(60); // Slower scroll

  useEffect(() => {
    const handleResize = () => {
      setScrollSpeed(window.innerWidth < 640 ? 80 : 60);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const duplicatedProducts = [...products, ...products];

  return (
    <section className="overflow-hidden bg-pink-50 py-12 border-t border-pink-200">
      <h2 className="text-3xl font-bold text-pink-700 mb-10 text-center tracking-wide">
        {title}
      </h2>

      <div className="relative group">
        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            duration: scrollSpeed,
            ease: 'linear',
          }}
        >
          {duplicatedProducts.map((product, index) => (
            <motion.div
              key={`${product._id}-${index}`}
              className="min-w-[220px] sm:min-w-[250px] md:min-w-[280px] lg:min-w-[300px]"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}



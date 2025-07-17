'use client';

import { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";
import AutoScrollSection from "@/components/AutoScrollSection";
import Benefits from "@/components/Benefits";
import { getProducts } from '@/sanity/lib/getProducts';
import WhyBrabliss from '@/components/WhyBrabliss';
import Testimonials from '@/components/Testimonials';

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data || []);
    });
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-pink-50">
        <HeroSection />

        {/* Only show sections if products are available */}
        {products.length > 0 ? (
          <>
            <ProductShowcase title="Featured Bras" products={products} />
            <AutoScrollSection title="Our Bestsellers" products={products} />
          </>
        ) : (
          <div className="text-center py-20 text-pink-700 text-lg">
            Loading products...
          </div>
        )}

        <WhyBrabliss />
        <Benefits />
        <Testimonials />
      </main>

      <Footer />
    </>
  );
}

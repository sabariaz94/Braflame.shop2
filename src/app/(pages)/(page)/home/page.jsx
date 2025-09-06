'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import HeroSlider from '../../../../components/HeroFull';
import LifestyleBanner from '../../../../components/LifestyleBanner';
import CategoryHighlight from '../../../../components/CategoryHighlight';
import ProductShowcase from '../../../../components/ProductShowcase';
import TestimonialsModern from '../../../../components/TestimonialsModern';
import { getProducts } from '../../../../sanity/lib/getProducts';
import Benefits from "../../../../components/Benefits";
import WhyBrabliss from '../../../../components/WhyBrabliss';
import IntroAnimation from "../../../../components/IntroAnimation";
import AutoScrollSection from "../../../../components/AutoScrollSection";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Added explicit loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
    <IntroAnimation/>
      <Navbar />

      <main className="bg-[#fffaf8] text-neutral-800 overflow-x-hidden">
        {/* Hero Banner */}
        <HeroSlider />

        {/* Product Showcase */}
        {loading ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            Loading products...
          </div>
        ) : products.length > 0 ? (
          <ProductShowcase title="Best Sellers" products={products.slice(0, 8)} />
        ) : (
          <div className="text-center py-20 text-red-500 text-lg">
            No products available.
          </div>
        )}
;
        <AutoScrollSection/>
        {/* Testimonials */}
        <TestimonialsModern />
        {/* Benefits Section */}
        <Benefits />

        {/* Why Brabliss Section */}
        <WhyBrabliss />

       

        {/* Lifestyle Banner */}
        <LifestyleBanner
          image="/assets/imgs/about.jpg"
          text="Love Yourself, Every Layer"
          ctaText="Explore More"
          link="/about"
          ctaStyle="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full"
        />
      </main>

      <Footer />
    </>
  );
}


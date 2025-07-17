"use client";
import { motion } from "framer-motion";
import ProductCard from "./ProductCart";

export default function AutoScrollSection({ title, products = [] }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="overflow-hidden bg-white py-12 border-t border-pink-200">
      <h2 className="text-3xl font-bold text-pink-800 mb-10 text-center">
        {title}
      </h2>
      <div className="relative">
        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {[...products, ...products].map((product, index) => (
            <div
              key={`${product._id}-${index}`} // ✅ Make key unique even if duplicated
              className="min-w-[250px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

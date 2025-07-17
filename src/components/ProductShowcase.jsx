"use client";
import ProductCard from "./ProductCart";

export default function ProductShowcase({ title, products = [] }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-pink-800 mb-10 text-center">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product, index) => {
          const uniqueKey = product._id || product.id || `product-${index}`;
          return <ProductCard key={uniqueKey} product={product} />;
        })}
      </div>
    </section>
  );
}


"use client";
import { useState } from "react";
import ProductCard from "./ProductCart";
import { useCart } from "../context/CartContext";

export default function ProductShowcase({ title, products = [] }) {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  if (!products || products.length === 0) return null;

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setSelectedSize(""); // reset previous selection
  };

  const handleConfirmAdd = () => {
    if (!selectedSize) return alert("Please select a size.");
    addToCart({ ...selectedProduct, selectedSize });
    setSelectedProduct(null); // close modal
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-pink-800 mb-10 text-center">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product, index) => {
          const uniqueKey = product._id || product.id || `product-${index}`;
          return (
            <ProductCard
              key={uniqueKey}
              product={product}
              onAddToCart={() => handleAddToCartClick(product)}
            />
          );
        })}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold text-pink-700 mb-4">
              Select Size for {selectedProduct.title}
            </h3>

            <div className="flex gap-3 flex-wrap mb-6">
              {selectedProduct.sizes?.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded-full text-sm font-medium ${
                    selectedSize === size
                      ? "bg-pink-600 text-white"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-pink-100"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAdd}
                className="px-6 py-2 rounded-md bg-pink-600 text-white font-semibold hover:bg-pink-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

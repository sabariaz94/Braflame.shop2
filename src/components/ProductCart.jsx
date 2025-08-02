"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Info } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const imageUrl = product?.images?.[0]?.asset?.url;

  const sizes = ["S", "M", "L", "XL"];
  const availableStockPerSize = 10; // Uniform stock for all sizes

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size.");
      return;
    }

    addToCart({ ...product, selectedSize, quantity });
    toast.success("Product added to cart!");
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative h-64 w-full">
        <Link href={`/productDetails/${product?._id}`}>
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition-colors line-clamp-1">
          {product.title}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description || "No description provided."}
        </p>

        {/* Size Selector */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Size:</label>
          <select
            value={selectedSize}
            onChange={(e) => {
              setSelectedSize(e.target.value);
              setQuantity(1);
            }}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Select</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

        
        </div>

        {/* Quantity Selector */}
        {selectedSize && (
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Qty:</label>
            <input
              type="number"
              min={1}
              max={availableStockPerSize}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 border border-gray-300 px-2 py-1 rounded-md text-sm focus:ring-2 focus:ring-pink-500"
            />
            <span className="text-xs text-gray-500">{availableStockPerSize} in stock</span>
          </div>
        )}

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-pink-600">PKR {product?.price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full transition-all duration-300 shadow"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}


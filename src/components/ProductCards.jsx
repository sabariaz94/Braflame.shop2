'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Info } from 'lucide-react';

export default function ProductList({ products, onAddToCart }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

function ProductCard({
  id,
  title,
  price,
  imageUrl,
  description,
  onAddToCart,
}) {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [error, setError] = useState('');

  // Mock stock data
  const sizeStock = { S: 5, M: 3, L: 0, XL: 7 };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size before adding to cart.');
      return;
    }
    setError('');
    if (onAddToCart) {
      onAddToCart({ id, title, price, imageUrl, size: selectedSize, quantity });
    }
  };

  const handleQuantityChange = (delta) => {
    const maxQty = sizeStock[selectedSize] || 10;
    setQuantity((prev) => {
      const newQty = prev + delta;
      if (newQty < 1) return 1;
      if (newQty > maxQty) return maxQty;
      return newQty;
    });
  };

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Product Image */}
      <div className="relative w-full h-48 sm:h-56">
        <Image
          src={imageUrl || '/placeholder.jpg'}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-5 flex flex-col flex-1">
        <h3 className="text-sm sm:text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-pink-600 text-base sm:text-xl font-semibold mt-1">
          PKR {parseFloat(price).toFixed(0)}
        </p>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 line-clamp-3">{description}</p>

        
        </div>

        {showSizeChart && (
          <div className="bg-blue-50 p-2 sm:p-3 text-xs rounded-md mb-2 border border-blue-200">
            <p className="mb-1 font-semibold">Size Guide:</p>
            <p>S: Chest 36" – M: Chest 38" – L: Chest 40" – XL: Chest 42"</p>
          </div>
        )}

        {/* Size Dropdown */}
        <select
          value={selectedSize}
          onChange={(e) => {
            setSelectedSize(e.target.value);
            setQuantity(1);
          }}
          className="w-full border border-gray-300 rounded-md px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="">Select Size</option>
          {Object.entries(sizeStock).map(([size, stock]) => (
            <option key={size} value={size} disabled={stock === 0}>
              {size} {stock === 0 ? '– Out of Stock' : `– ${stock} left`}
            </option>
          ))}
        </select>

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

        {/* Quantity Selector */}
        {selectedSize && sizeStock[selectedSize] > 0 && (
          <div className="flex items-center mt-4 gap-2">
            <span className="text-xs sm:text-sm text-gray-600">Qty:</span>
            <button
              onClick={() => handleQuantityChange(-1)}
              className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm"
            >
              –
            </button>
            <span className="w-6 text-center">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm"
            >
              +
            </button>
          </div>
        )}

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition font-medium text-sm sm:text-base"
        >
          Add to Cart
        </button>
      </div>
  );
}

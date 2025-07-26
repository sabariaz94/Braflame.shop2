'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Info } from 'lucide-react';

export default function ProductCard({
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

  // 👕 Example size stock (mock)
  const sizeStock = {
    S: 5,
    M: 3,
    L: 0,
    XL: 7,
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size before adding to cart.');
      return;
    }

    setError('');
    if (onAddToCart) {
      onAddToCart({
        id,
        title,
        price,
        imageUrl,
        size: selectedSize,
        quantity,
      });
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
      <div className="relative w-full h-64">
        <Image
          src={imageUrl || '/placeholder.jpg'}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-pink-600 text-xl font-semibold mt-1">
          PKR {parseFloat(price).toFixed(0)}
        </p>

        <p className="text-sm text-gray-500 mt-2 line-clamp-3">{description}</p>

        {/* Size Chart Toggle */}
        <div className="flex items-center justify-between mt-4 mb-1">
          <label className="text-sm font-medium text-gray-600">Select Size</label>
          <button
            type="button"
            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
            onClick={() => setShowSizeChart(!showSizeChart)}
          >
            <Info size={14} /> Size Chart
          </button>
        </div>

        {showSizeChart && (
          <div className="bg-blue-50 p-3 text-xs rounded-md mb-2 border border-blue-200">
            <p className="mb-1 font-semibold">Size Guide:</p>
            <p>S: Chest 36" – M: Chest 38" – L: Chest 40" – XL: Chest 42"</p>
          </div>
        )}

        {/* Size Dropdown with Stock */}
        <select
          value={selectedSize}
          onChange={(e) => {
            setSelectedSize(e.target.value);
            setQuantity(1); // reset quantity
          }}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="">Select Size</option>
          {Object.entries(sizeStock).map(([size, stock]) => (
            <option
              key={size}
              value={size}
              disabled={stock === 0}
            >
              {size} {stock === 0 ? '– Out of Stock' : `– ${stock} left`}
            </option>
          ))}
        </select>

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

        {/* Quantity Selector */}
        {selectedSize && sizeStock[selectedSize] > 0 && (
          <div className="flex items-center mt-4 gap-2">
            <span className="text-sm text-gray-600">Qty:</span>
            <button
              onClick={() => handleQuantityChange(-1)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              –
            </button>
            <span className="w-6 text-center">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              +
            </button>
          </div>
        )}

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

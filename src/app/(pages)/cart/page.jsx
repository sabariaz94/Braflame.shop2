'use client'
import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Footer from '@/components/Footer';


// CartPage Component
export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      const parsed = JSON.parse(stored);

      // Group items by id for quantity tracking
      const grouped = {};
      for (const item of parsed) {
        if (grouped[item.id]) {
          grouped[item.id].quantity += 1;
        } else {
          grouped[item.id] = { ...item, quantity: 1 };
        }
      }

      setCartItems(Object.values(grouped));
    }
  }, []);

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total = cartItems
    .reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)
    .toFixed(2);

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-12 min-h-screen">
        <h1 className="text-4xl font-bold text-pink-700 mb-10 text-center">🛍 Your Shopping Bag</h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-lg">Your cart is currently empty.</p>
            <Link
             href='/products'
              className="mt-4 inline-block text-pink-600 font-medium hover:underline"
            >
              Browse Products →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white border border-pink-100 rounded-xl shadow-sm p-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-pink-800">{item.name}</h2>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)} × {item.quantity || 1}
                      </p>
                    </div>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-600 transition"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary Box */}
            <div className="bg-pink-50 p-6 rounded-xl shadow-md border border-pink-100">
              <h3 className="text-xl font-semibold text-pink-700 mb-4">Order Summary</h3>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Subtotal</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between text-gray-500 mb-4 text-sm">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <hr className="mb-4" />
              <div className="flex justify-between font-bold text-gray-800 text-lg mb-6">
                <span>Total</span>
                <span>${total}</span>
              </div>
              <Link
               href='/checkout'
                className="block text-center bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 rounded-full transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

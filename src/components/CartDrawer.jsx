// CartDrawer.jsx
"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export function CartDrawer({ onClose }) {
  const { cartItems } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
      <div className="w-full sm:w-80 bg-white p-6 shadow-lg overflow-y-auto">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Cart</h2>
        <ul className="space-y-3 mb-4">
          {cartItems.map((item, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{item.title} ({item.size}) x{item.quantity}</span>
              <span>PKR {(item.price * (item.quantity || 1)).toFixed(0)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t pt-4 text-right font-bold text-gray-900">
          Total: PKR {total.toFixed(0)}
        </div>
        <Link
          href="/checkout"
          className="mt-4 block bg-pink-600 text-white text-center py-2 rounded-md"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

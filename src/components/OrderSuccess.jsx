'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { client } from '../sanity/lib/client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const [order, setOrder] = useState(null);
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const res = await client.fetch(
          `*[_type == "order"] | order(createdAt desc)[0]`
        );
        setOrder(res);
      } catch (err) {
        console.error('Failed to fetch order:', err);
      }
    };

    fetchLatestOrder();
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-pink-600 dark:text-pink-400 text-lg font-medium bg-gray-50 dark:bg-gray-900">
        Loading your order details...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-12 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 border border-pink-100 dark:border-gray-700 transition-colors duration-300">
          <h1 className="text-3xl font-bold text-pink-700 dark:text-pink-400 text-center mb-6">
            🎉 Thank You for Your Order!
          </h1>

          <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
            We've received your order and are preparing it for shipment.
          </p>

          <div className="text-center text-green-700 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-md p-4 mb-10">
            🚚 Your order is expected to arrive within{' '}
            <span className="font-semibold">5 business days</span>. You’ll receive a confirmation email once it ships.
          </div>

          {/* Order Info */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-pink-600 dark:text-pink-400 mb-2">👤 Customer Info</h2>
              <p className="text-gray-800 dark:text-gray-200"><strong>Name:</strong> {order.fullName}</p>
              <p className="text-gray-800 dark:text-gray-200"><strong>Email:</strong> {order.email}</p>
              <p className="text-gray-800 dark:text-gray-200"><strong>Phone:</strong> {order.phone}</p>
              <p className="text-gray-800 dark:text-gray-200"><strong>Address:</strong> {order.address}, {order.city}, {order.zip}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-pink-600 dark:text-pink-400 mb-2">🧾 Order Summary</h2>
              <p className="text-gray-800 dark:text-gray-200"><strong>Total:</strong> PKR {order.total}</p>
              <p className="text-gray-800 dark:text-gray-200"><strong>Payment:</strong> {order.paymentMethod?.toUpperCase()}</p>
              <p className="text-gray-800 dark:text-gray-200"><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          <h2 className="text-xl font-semibold text-pink-600 dark:text-pink-400 mb-4">📦 Ordered Items</h2>
          <div className="space-y-4">
            {order.items?.map((item) => (
              <div key={item._key} className="flex items-center justify-between bg-pink-50 dark:bg-gray-700 rounded-lg p-4 border border-pink-200 dark:border-gray-600">
                <div className="flex items-center gap-4">
                  <Image
                    src={item.imageUrl || '/placeholder.jpg'}
                    alt={item.title}
                    width={60}
                    height={60}
                    className="rounded border object-cover border-gray-300 dark:border-gray-600"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Quantity: {item.quantity} × PKR {item.price}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-gray-700 dark:text-gray-200">
                  PKR {item.quantity * item.price}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/products" className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition">
              Continue Shopping →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


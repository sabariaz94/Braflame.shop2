"use client";

import { getProducts } from "../../../../sanity/lib/getProducts";
import { useCart } from "../../../../context/CartContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";

export default function ProductPage({ params }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const { id } = params;

  useEffect(() => {
    async function fetchProduct() {
      const allProducts = await getProducts();
      const matched = allProducts.find((item) => item._id === id);
      setProduct(matched);
    }
    fetchProduct();
  }, [id]);

  const defaultSizes = ["S", "M", "L", "XL", "XXL"];
  const sizes = product?.sizes?.length
    ? Array.from(new Set([...product.sizes, "XL"]))
    : defaultSizes;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    addToCart({ ...product, selectedSize });
    router.push("/cart");
  };

  if (!product) {
    return (
      <div className="text-center py-24 text-lg font-medium text-gray-500">
        ⏳ Loading product...
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-[420px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg border border-gray-100"
        >
          <Image
            src={product?.images?.[0]?.asset?.url}
            alt={product?.title}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            {product?.title}
          </h1>

          <p className="text-lg text-gray-600">{product?.description}</p>

          <p className="text-3xl font-bold text-pink-600 mt-2">
            {product?.price} PKR
          </p>

          {/* Size Selector */}
          <div className="mt-6 space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Select Size
            </label>

            {/* Mobile (Buttons) */}
            <div className="flex flex-wrap gap-2 sm:hidden">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-sm rounded-md font-medium border transition-all ${
                    selectedSize === size
                      ? "bg-pink-600 text-white border-pink-600"
                      : "bg-white border-gray-300 text-gray-700 hover:border-pink-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Desktop (Dropdown) */}
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="hidden sm:block w-full px-3 py-2 border rounded-md text-sm border-gray-300 focus:ring-pink-500 focus:outline-none"
            >
              <option value="">Choose size</option>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <button
              onClick={() => setIsSizeChartOpen(true)}
              className="text-sm text-blue-600 underline underline-offset-2 mt-1 hover:text-blue-700"
            >
              📏 View Size Chart
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition transform hover:scale-105"
            >
              🛒 Add to Cart
            </button>
            <button
              onClick={() => router.push("/checkout")}
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition transform hover:scale-105"
            >
              💳 Checkout Now
            </button>
          </div>
        </motion.div>
      </main>

      <Footer />

      {/* Size Chart Modal */}
      <Dialog
        open={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <Dialog.Title className="text-lg font-semibold text-gray-800 mb-3">
              Size Chart
            </Dialog.Title>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                <strong>S:</strong> Chest 34–36" – Waist 28–30"
              </li>
              <li>
                <strong>M:</strong> Chest 38–40" – Waist 32–34"
              </li>
              <li>
                <strong>L:</strong> Chest 42–44" – Waist 36–38"
              </li>
              <li>
                <strong>XL:</strong> Chest 46–48" – Waist 40–42"
              </li>
              <li>
                <strong>XXL:</strong> Chest 50–52" – Waist 44–46"
              </li>
            </ul>
            <button
              onClick={() => setIsSizeChartOpen(false)}
              className="mt-5 w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

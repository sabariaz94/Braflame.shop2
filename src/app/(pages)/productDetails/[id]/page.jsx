"use client";

import { getProducts } from "../../../../sanity/lib/getProducts";
import { useCart } from "../../../../context/CartContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { motion } from "framer-motion";

export default function ProductPage({ params }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
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

  const defaultColors = ["Black", "White", "Blue", "Red", "Green"];
  const colors = product?.colors?.length ? product.colors : defaultColors;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    if (!selectedColor) {
      alert("Please select a color before adding to cart.");
      return;
    }
    addToCart({ ...product, selectedSize, selectedColor });
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
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-[450px] md:h-[520px] rounded-3xl overflow-hidden shadow-xl border border-gray-100"
        >
          <Image
            src={product?.images?.[0]?.asset?.url}
            alt={product?.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
            {product?.title}
          </h1>

          {/* Price */}
          <p className="text-3xl font-bold text-pink-600">
            {product?.price} PKR
          </p>

          {/* Description */}
          <p className="text-base leading-relaxed text-gray-600">
            {product?.description}
          </p>

          {/* Color Selector */}
          <div className="mt-4 space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Select Color
            </label>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 text-sm rounded-full font-medium border transition-all shadow-sm ${
                    selectedColor === color
                      ? "bg-pink-600 text-white border-pink-600 shadow-md"
                      : "bg-white border-gray-300 text-gray-700 hover:border-pink-500 hover:shadow-md"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mt-4 space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Select Size
            </label>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-sm rounded-full font-medium border transition-all shadow-sm ${
                    selectedSize === size
                      ? "bg-pink-600 text-white border-pink-600 shadow-md"
                      : "bg-white border-gray-300 text-gray-700 hover:border-pink-500 hover:shadow-md"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Size Chart */}
          <div className="mt-6 border rounded-lg overflow-hidden shadow-sm">
            <h2 className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 border-b">
              📏 Size Chart
            </h2>
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2">Size</th>
                  <th className="border px-3 py-2">Chest</th>
                  <th className="border px-3 py-2">Waist</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-3 py-2">S</td>
                  <td className="border px-3 py-2">28–32"</td>
                  <td className="border px-3 py-2">28–30"</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">M</td>
                  <td className="border px-3 py-2">34–36"</td>
                  <td className="border px-3 py-2">32–34"</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">L</td>
                  <td className="border px-3 py-2">38–40"</td>
                  <td className="border px-3 py-2">36–38"</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">XL</td>
                  <td className="border px-3 py-2">42–44"</td>
                  <td className="border px-3 py-2">40–42"</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">XXL</td>
                  <td className="border px-3 py-2">46–48"</td>
                  <td className="border px-3 py-2">44–46"</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-pink-400 to-pink-400 hover:from-pink-500 hover:to-pink-400 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
              🛒 Add to Cart
            </button>
            <button
              onClick={() => router.push("/checkout")}
              className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition transform hover:scale-105"
            >
              💳 Checkout Now
            </button>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}



// 'use client';

// import React, { useState } from 'react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import { useCart } from '@/context/CartContext';
// import Image from 'next/image';
// import { toast } from 'react-hot-toast';
// import Link from 'next/link';
// import { client } from '@/sanity/lib/client';
// import { useRouter } from 'next/navigation';
// import { v4 as uuidv4 } from 'uuid';

// export default function CheckoutPage() {
//   const { cartItems, setCartItems } = useCart();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   // ✅ Group cart items by _id
//   const groupedItems = cartItems.reduce((acc, item) => {
//     const found = acc.find((i) => i._id === item._id);
//     if (found) {
//       found.quantity += 1;
//     } else {
//       acc.push({ ...item, quantity: 1 });
//     }
//     return acc;
//   }, []);

//   const total = groupedItems
//     .reduce(
//       (acc, item) => acc + parseFloat(item.price || 0) * item.quantity,
//       0
//     )
//     .toFixed(2);

//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     zip: '',
//   });

//   const [paymentMethod, setPaymentMethod] = useState('cod');

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const order = {
//       _type: 'order',
//       _id: uuidv4(),
//       customer: formData,
//       paymentMethod,
//       total,
//       items: groupedItems.map((item) => ({
//         _type: 'cartItem',
//         productId: item._id, // ✅ Valid Sanity field name
//         title: item.title,
//         price: item.price,
//         quantity: item.quantity,
//         image: item?.images?.[0]?.asset?._ref || '',
//       })),
//       createdAt: new Date().toISOString(),
//     };

//     try {
//       await client.create(order);
//       toast.success('🎉 Order placed successfully!');
//       setCartItems([]);
//       router.push('/order-success');
//     } catch (error) {
//       console.error('Order error:', error);
//       toast.error('❌ Failed to place order. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <main className="max-w-7xl mx-auto p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-3 gap-10 min-h-screen">
//         {/* Billing Form */}
//         <div className="lg:col-span-2 space-y-6">
//           <h2 className="text-3xl font-bold text-pink-700">🧾 Billing Details</h2>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="fullName"
//                 required
//                 onChange={handleChange}
//                 placeholder="Full Name"
//                 className="border border-gray-300 p-3 rounded-lg focus:outline-pink-500"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 required
//                 onChange={handleChange}
//                 placeholder="Email Address"
//                 className="border border-gray-300 p-3 rounded-lg focus:outline-pink-500"
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 required
//                 onChange={handleChange}
//                 placeholder="Phone Number"
//                 className="border border-gray-300 p-3 rounded-lg focus:outline-pink-500"
//               />
//               <input
//                 type="text"
//                 name="city"
//                 required
//                 onChange={handleChange}
//                 placeholder="City"
//                 className="border border-gray-300 p-3 rounded-lg focus:outline-pink-500"
//               />
//             </div>

//             <input
//               type="text"
//               name="address"
//               required
//               onChange={handleChange}
//               placeholder="Street Address"
//               className="w-full border border-gray-300 p-3 rounded-lg focus:outline-pink-500"
//             />
//             <input
//               type="text"
//               name="zip"
//               required
//               onChange={handleChange}
//               placeholder="Postal Code"
//               className="w-full border border-gray-300 p-3 rounded-lg focus:outline-pink-500"
//             />

//             {/* Payment Method */}
//             <div className="space-y-3">
//               <h3 className="text-xl font-semibold text-pink-600">💳 Select Payment Method</h3>
//               <label className="flex items-center gap-3">
//                 <input
//                   type="radio"
//                   name="payment"
//                   value="cod"
//                   checked={paymentMethod === 'cod'}
//                   onChange={() => setPaymentMethod('cod')}
//                 />
//                 <span>Cash on Delivery</span>
//               </label>
//               <label className="flex items-center gap-3">
//                 <input
//                   type="radio"
//                   name="payment"
//                   value="card"
//                   checked={paymentMethod === 'card'}
//                   onChange={() => setPaymentMethod('card')}
//                 />
//                 <span>Credit / Debit Card</span>
//               </label>
//               <label className="flex items-center gap-3">
//                 <input
//                   type="radio"
//                   name="payment"
//                   value="jazzcash"
//                   checked={paymentMethod === 'jazzcash'}
//                   onChange={() => setPaymentMethod('jazzcash')}
//                 />
//                 <span>JazzCash / EasyPaisa</span>
//               </label>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
//             >
//               {loading ? '⏳ Placing Order...' : '✅ Place Order'}
//             </button>
//           </form>
//         </div>

//         {/* Order Summary */}
//         <div className="bg-pink-50 p-6 rounded-xl shadow-lg border border-pink-100 space-y-6">
//           <h3 className="text-2xl font-bold text-pink-700">🛒 Your Order</h3>

//           {groupedItems.map((item) => {
//             const image = item?.images?.[0]?.asset?.url || '/placeholder.jpg';
//             return (
//               <div key={item._id} className="flex items-center justify-between border-b pb-3">
//                 <div className="flex gap-4 items-center">
//                   <Image
//                     src={image}
//                     alt={item.title}
//                     width={64}
//                     height={64}
//                     className="rounded-lg border object-cover"
//                   />
//                   <div>
//                     <h4 className="font-medium text-gray-800">{item.title}</h4>
//                     <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//                     <p className="text-sm text-gray-500">
//                       PKR {item.price} × {item.quantity}
//                     </p>
//                   </div>
//                 </div>
//                 <p className="font-semibold text-gray-700">
//                   PKR {item.price * item.quantity}
//                 </p>
//               </div>
//             );
//           })}

//           <hr />
//           <div className="flex justify-between text-gray-700 text-lg font-semibold">
//             <span>Total</span>
//             <span>PKR {total}</span>
//           </div>

//           <Link
//             href="/cart"
//             className="text-sm text-pink-600 hover:underline block text-center mt-4"
//           >
//             ← Back to Cart
//           </Link>
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }


"use client";

<<<<<<< HEAD
import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useCart } from "../../../context/CartContext";
import { toast } from "react-hot-toast";
import { client } from "../../../sanity/lib/client";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { FaCashRegister } from "react-icons/fa";
=======
import React, { useState } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useCart } from '../../../context/CartContext';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { client } from '../../../sanity/lib/client';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { FaCashRegister } from 'react-icons/fa';
>>>>>>> 370a1e322461699cf2af6e44ab14bd495873fb83

export default function CheckoutPage() {
  const { cartItems, setCartItems } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deliveryFee] = useState(125);

  const groupedItems = cartItems.reduce((acc, item) => {
    const found = acc.find((i) => i._id === item._id);
    if (found) found.quantity += 1;
    else acc.push({ ...item, quantity: 1 });
    return acc;
  }, []);

  const subtotal = groupedItems.reduce(
    (acc, item) =>
      acc +
      (item.discountedPrice
        ? item.discountedPrice
        : parseFloat(item.price || 0)) * item.quantity,
    0
  );

  const total = (subtotal + deliveryFee).toFixed(0);

  const [formData, setFormData] = useState({
<<<<<<< HEAD
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
=======
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
>>>>>>> 370a1e322461699cf2af6e44ab14bd495873fb83
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const order = {
      _type: "order",
      _id: uuidv4(),
      ...formData,
      paymentMethod,
      total: Number(total),
      createdAt: new Date().toISOString(),
      items: groupedItems.map((item) => ({
        _key: uuidv4(),
        productId: item._id,
        title: item.title,
        price: item.discountedPrice || Number(item.price),
        quantity: item.quantity,
        imageUrl: item?.images?.[0]?.asset?.url || "",
      })),
    };

    try {
      await client.create(order);
      toast.success("🎉 Order placed successfully!");
      setCartItems([]);
      router.push("/order-success");
    } catch (error) {
      console.error("Order Error:", error);
      toast.error("❌ Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
<<<<<<< HEAD
      <main className="bg-white dark:bg-black min-h-screen py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
=======
      <main className="bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-950 min-h-screen py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
>>>>>>> 370a1e322461699cf2af6e44ab14bd495873fb83
          {/* Left: Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 space-y-8"
          >
            {/* Billing Info */}
<<<<<<< HEAD
            <div className="bg-gray-50 dark:bg-gray-900 shadow-md rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                📝 Billing Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["fullName", "email", "phone", "city"].map((field) => (
=======
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 border border-pink-100 dark:border-gray-700 transition-colors duration-300">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                📝 Billing Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {['fullName', 'email', 'phone', 'city'].map((field) => (
>>>>>>> 370a1e322461699cf2af6e44ab14bd495873fb83
                  <input
                    key={field}
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    required
                    onChange={handleChange}
                    placeholder={field
<<<<<<< HEAD
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none w-full"
=======
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase())}
                    className="bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600 p-4 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none transition"
>>>>>>> 370a1e322461699cf2af6e44ab14bd495873fb83
                  />
                ))}
              </div>
              <input
                type="text"
                name="address"
                required
                onChange={handleChange}
                placeholder="Street Address"
<<<<<<< HEAD
                className="mt-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none w-full"
=======
                className="mt-4 w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600 p-4 rounded-lg focus:ring-2 focus:ring-pink-400 transition"
>>>>>>> 370a1e322461699cf2af6e44ab14bd495873fb83
              />
              <input
                type="text"
                name="zip"
                required
                onChange={handleChange}
                placeholder="Postal Code"
<<<<<<< HEAD
                className="mt-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none w-full"
=======
                className="mt-4 w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600 p-4 rounded-lg focus:ring-2 focus:ring-pink-400 transition"
>>>>>>> 370a1e322461699cf2af6e44ab14bd495873fb83
              />
            </div>

            {/* Payment Options */}
<<<<<<< HEAD
            <div className="bg-gray-50 dark:bg-gray-900 shadow-md rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                💳 Payment Method
              </h2>
              {[{ label: "Cash on Delivery", value: "cod", icon: <FaCashRegister /> }].map(
                (method) => (
                  <label
                    key={method.value}
                    className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg border transition ${
                      paymentMethod === method.value
                        ? "border-pink-500 bg-pink-50 dark:bg-pink-900/30"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={() => setPaymentMethod(method.value)}
                      className="accent-pink-500"
                    />
                    <span className="flex items-center gap-2 text-gray-900 dark:text-white font-medium">
                      {method.icon} {method.label}
                    </span>
                  </label>
                )
              )}
            </div>

            {/* Submit Button */}
          <button
  type="submit"
  disabled={loading}
  className={`w-full font-semibold py-3 rounded-lg shadow-md transition
    ${loading ? "opacity-70 cursor-not-allowed" : ""}
    bg-black hover:bg-pink-900 text-white
  `}
>
  {loading ? "⏳ Placing Order..." : "✅ Place Order Now"}
</button>

          </form>

          {/* Right: Order Summary */}
          <div className="bg-gray-50 dark:bg-gray-900 shadow-md rounded-xl p-6 border border-gray-200 dark:border-gray-700 h-fit sticky top-20">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              🛍️ Order Summary
            </h2>
            <ul className="space-y-3">
              {groupedItems.map((item) => (
                <li key={item._id} className="text-gray-900 dark:text-white">
=======
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 border border-pink-100 dark:border-gray-700 transition-colors duration-300">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                💳 Payment Method
              </h2>
              <div className="space-y-4">
                {[{ label: 'Cash on Delivery', value: 'cod', icon: <FaCashRegister /> }].map(
                  (method) => (
                    <label
                      key={method.value}
                      className={`flex items-center gap-4 cursor-pointer p-4 rounded-lg transition border ${
                        paymentMethod === method.value
                          ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={() => setPaymentMethod(method.value)}
                        className="accent-pink-500"
                      />
                      <span className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium">
                        {method.icon} {method.label}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full font-bold py-4 rounded-xl shadow-lg transition border 
                  ${loading ? 'opacity-70 cursor-not-allowed' : ''}
                  bg-white text-black hover:bg-gray-100 border-gray-300
                  dark:bg-black dark:text-white dark:hover:bg-gray-900 dark:border-gray-700
                `}
              >
                {loading ? '⏳ Placing Order...' : '✅ Place Order Now'}
              </button>
            </div>
          </form>

          {/* Right: Order Summary */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 border border-pink-100 dark:border-gray-700 h-fit sticky top-20 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              🛍️ Order Summary
            </h2>
            <ul className="space-y-4">
              {groupedItems.map((item) => (
                <li key={item._id} className="text-gray-700 dark:text-gray-200 space-y-1">
>>>>>>> 370a1e322461699cf2af6e44ab14bd495873fb83
                  <div className="flex justify-between items-center">
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span>
                      {item.discountedPrice ? (
                        <>
                          <span className="line-through text-gray-400 mr-1">
                            {(item.price * item.quantity).toFixed(0)} PKR
                          </span>
                          <span className="text-pink-600 font-semibold">
                            {(item.discountedPrice * item.quantity).toFixed(0)} PKR
                          </span>
                        </>
                      ) : (
                        `${(item.price * item.quantity).toFixed(0)} PKR`
                      )}
                    </span>
                  </div>
                  {item.discountedPrice && (
                    <p className="text-xs text-green-600 dark:text-green-400">
                      You saved {(item.price - item.discountedPrice) * item.quantity} PKR
                    </p>
                  )}
                </li>
              ))}
            </ul>
<<<<<<< HEAD
            <hr className="my-3 border-gray-300 dark:border-gray-700" />
            <div className="flex justify-between text-gray-900 dark:text-white font-medium">
              <span>Delivery</span>
              <span>{deliveryFee} PKR</span>
            </div>
            <div className="flex justify-between mt-2 text-lg font-bold text-pink-600 dark:text-pink-400">
=======
            <hr className="my-4 border-gray-200 dark:border-gray-700" />
            <div className="flex justify-between text-gray-700 dark:text-gray-200 font-medium">
              <span>Delivery</span>
              <span>{deliveryFee} PKR</span>
            </div>
            <div className="flex justify-between mt-2 text-xl font-bold text-pink-600 dark:text-pink-400">
>>>>>>> 370a1e322461699cf2af6e44ab14bd495873fb83
              <span>Total</span>
              <span>{total} PKR</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


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


'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export default function CheckoutPage() {
  const { cartItems, setCartItems } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [deliveryFee] = useState(125); // Fixed fee

  const groupedItems = cartItems.reduce((acc, item) => {
    const found = acc.find((i) => i._id === item._id);
    if (found) {
      found.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const subtotal = groupedItems
    .reduce((acc, item) => acc + parseFloat(item.price || 0) * item.quantity, 0);

  const total = (subtotal + deliveryFee).toFixed(0);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const order = {
      _type: 'order',
      _id: uuidv4(),
      ...formData,
      paymentMethod,
      total: Number(total),
      createdAt: new Date().toISOString(),
      items: groupedItems.map((item) => ({
        _key: uuidv4(),
        productId: item._id,
        title: item.title,
        price: Number(item.price),
        quantity: item.quantity,
        imageUrl: item?.images?.[0]?.asset?.url || '',
      })),
    };

    try {
      await client.create(order);
      toast.success('🎉 Order placed successfully!');
      setCartItems([]);
      router.push('/order-success');
    } catch (error) {
      console.error('Order Error:', error);
      toast.error('❌ Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Form Section */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
          {/* Billing Info */}
          <section className="bg-white rounded-2xl shadow-md p-6 border">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Billing Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="fullName" required onChange={handleChange} placeholder="Full Name" className="border border-gray-300 p-3 rounded-lg focus:outline-pink-500" />
              <input type="email" name="email" required onChange={handleChange} placeholder="Email Address" className="border border-gray-300 p-3 rounded-lg focus:outline-pink-500" />
              <input type="text" name="phone" required onChange={handleChange} placeholder="Phone Number" className="border border-gray-300 p-3 rounded-lg focus:outline-pink-500" />
              <input type="text" name="city" required onChange={handleChange} placeholder="City" className="border border-gray-300 p-3 rounded-lg focus:outline-pink-500" />
            </div>
            <input type="text" name="address" required onChange={handleChange} placeholder="Street Address" className="w-full border border-gray-300 p-3 mt-4 rounded-lg focus:outline-pink-500" />
            <input type="text" name="zip" required onChange={handleChange} placeholder="Postal Code" className="w-full border border-gray-300 p-3 mt-4 rounded-lg focus:outline-pink-500" />
          </section>

          {/* Payment Method */}
          <section className="bg-white rounded-2xl shadow-md p-6 border">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                <span>Credit / Debit Card</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="payment" value="jazzcash" checked={paymentMethod === 'jazzcash'} onChange={() => setPaymentMethod('jazzcash')} />
                <span>JazzCash / EasyPaisa</span>
              </label>
            </div>
          </section>

          {/* Submit Button */}
          <section>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg shadow transition-all duration-300"
            >
              {loading ? '⏳ Placing Order...' : '✅ Place Order'}
            </button>
          </section>
        </form>

        {/* RIGHT: Daraz-style Order Summary */}
        <div className="lg:sticky lg:top-28 bg-white rounded-2xl shadow-md p-6 border h-fit space-y-6">
          <h3 className="text-xl font-bold text-pink-700">🛒 Order Summary</h3>

          {/* Promo Code */}
          <div>
            <p className="font-semibold mb-2 text-gray-700">Promotion</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Store Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-pink-500 text-sm"
              />
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all"
              >
                APPLY
              </button>
            </div>
          </div>

          {/* Summary Details */}
          <div className="border-t pt-4 text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span>Items Total ({groupedItems.length} {groupedItems.length === 1 ? 'item' : 'items'})</span>
              <span>Rs. {subtotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>Rs. {deliveryFee}</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>Total:</span>
              <span className="text-red-600">Rs. {total}</span>
            </div>
            <p className="text-xs text-gray-500">VAT included, where applicable</p>
          </div>

          <button
            type="button"
            disabled
            className="w-full bg-gray-300 text-white font-semibold py-3 rounded-lg cursor-not-allowed"
          >
            Proceed to Pay
          </button>

          <Link href="/cart" className="text-sm text-pink-600 hover:underline block text-center mt-4">
            ← Back to Cart
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}


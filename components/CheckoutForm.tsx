'use client';

import { useState } from "react";

export default function CheckoutForm({ product }: { product: any }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePay = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/mpesa/stk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: product.price,
          phone,
          productId: product.id,
        }),
      });
      const data = await res.json();
      if (data.error) setMessage("Payment failed: " + data.error);
      else setMessage("STK Push sent. Complete payment on your phone.");
    } catch (err: any) {
      setMessage("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6 space-y-4">
      <h1 className="text-xl font-bold">Checkout</h1>
      <p>
        <strong>{product.title}</strong> – Ksh {product.price}
      </p>

      <label className="block">
        <span className="text-sm text-gray-600">M-Pesa Phone Number</span>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded p-2 mt-1"
          placeholder="2547XXXXXXXX"
        />
      </label>

      <button
        onClick={handlePay}
        disabled={loading}
        className="bg-brand text-white px-4 py-2 rounded shadow hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay with M-Pesa"}
      </button>

      {message && <p className="text-sm text-gray-700">{message}</p>}
    </div>
  );
}

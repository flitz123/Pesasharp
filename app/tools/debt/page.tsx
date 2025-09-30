"use client";
import { useState } from "react";
import Card from "@/components/Card";

export default function InvestmentAnalyzer() {
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [years, setYears] = useState(0);
  const [future, setFuture] = useState(0);

  const calculate = () => {
    const result = amount * Math.pow(1 + rate / 100, years);
    setFuture(result);
  };

  return (
    <Card title="Investment Analyzer">
      <p className="text-sm text-gray-600 mb-2">
        Estimate future value of your investment using compound growth.
      </p>
      <input
        type="number"
        placeholder="Initial Amount (Ksh)"
        className="border rounded p-2 w-full mb-2"
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Annual Rate (%)"
        className="border rounded p-2 w-full mb-2"
        onChange={(e) => setRate(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Years"
        className="border rounded p-2 w-full mb-2"
        onChange={(e) => setYears(Number(e.target.value))}
      />
      <button
        onClick={calculate}
        className="bg-brand text-white px-4 py-2 rounded shadow"
      >
        Calculate
      </button>
      {future > 0 && (
        <p className="mt-4 text-sm">
          Future Value: <strong>Ksh {future.toLocaleString()}</strong>
        </p>
      )}
    </Card>
  );
}

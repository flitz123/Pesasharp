"use client";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { shillings } from "../../../lib/format";

function project(amount: number, years: number, rate: number) {
  const data = [];
  let val = amount;
  for (let i = 0; i <= years; i++) {
    data.push({ year: i, value: Math.round(val) });
    val *= 1 + rate / 100;
  }
  return data;
}

export default function InvestmentAnalyzer() {
  const [amount, setAmount] = useState(20000);
  const [years, setYears] = useState(5);
  const [market, setMarket] = useState<any>(null);

  useEffect(() => {
    fetch("/api/market")
      .then((r) => r.json())
      .then(setMarket)
      .catch(() => {});
  }, []);

  const sacco = project(amount, years, 10);
  const mmf = project(amount, years, 8);
  const nse = project(amount, years, 12);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Investment Analyzer</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white p-4 rounded-lg shadow">
          <label>Initial amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />

          <label>Years</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(+e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />

          <p className="text-sm text-gray-600">
            Compare SACCO (10% p.a.), MMF (8% p.a.), NSE (12% p.a.)
          </p>

          <a
            className="inline-block mt-3 text-brand underline"
            href="https://ken.en.fxpesa.finance/"
          >
            Open a low-fee account ↗
          </a>
        </div>

        {/* Chart */}
        <div className="bg-white p-4 rounded-lg shadow h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sacco}>
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(v) => shillings(v)} />
              <Tooltip formatter={(v: any) => shillings(v as number)} />
              <Line
                type="monotone"
                dataKey="value"
                data={sacco}
                stroke="#1E3A8A"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Market snapshot */}
      {market?.data && (
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold mb-2">Market snapshot</h3>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(market.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

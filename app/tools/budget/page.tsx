"use client";
import { useState } from "react";
import Card from "@/components/Card";

export default function BudgetPlanner() {
  const [income, setIncome] = useState(0);
  const [needs, setNeeds] = useState(0);
  const [wants, setWants] = useState(0);
  const [savings, setSavings] = useState(0);

  const calculate = () => {
    const needsVal = income * 0.5;
    const wantsVal = income * 0.3;
    const savingsVal = income * 0.2;
    setNeeds(needsVal);
    setWants(wantsVal);
    setSavings(savingsVal);
  };

  return (
    <Card title="Budget Planner">
      <p className="text-sm text-gray-600 mb-2">
        Apply the 50/30/20 rule to manage your income.
      </p>
      <input
        type="number"
        placeholder="Monthly Income (Ksh)"
        className="border rounded p-2 w-full mb-2"
        onChange={(e) => setIncome(Number(e.target.value))}
      />
      <button
        onClick={calculate}
        className="bg-brand text-white px-4 py-2 rounded shadow"
      >
        Calculate
      </button>
      {income > 0 && (
        <div className="mt-4 text-sm space-y-1">
          <p>
            Needs (50%): <strong>Ksh {needs.toLocaleString()}</strong>
          </p>
          <p>
            Wants (30%): <strong>Ksh {wants.toLocaleString()}</strong>
          </p>
          <p>
            Savings (20%): <strong>Ksh {savings.toLocaleString()}</strong>
          </p>
        </div>
      )}
    </Card>
  );
}

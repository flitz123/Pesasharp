"use client";
import { useState } from "react";
import Card from "@/components/Card";

export default function SavingsGoalTracker() {
  const [goal, setGoal] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [months, setMonths] = useState(0);

  const calculate = () => {
    if (monthly > 0) setMonths(Math.ceil(goal / monthly));
  };

  return (
    <Card title="Savings Goal Tracker">
      <p className="text-sm text-gray-600 mb-2">
        Plan how long it will take to reach your savings goal.
      </p>
      <input
        type="number"
        placeholder="Goal Amount (Ksh)"
        className="border rounded p-2 w-full mb-2"
        onChange={(e) => setGoal(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Monthly Savings (Ksh)"
        className="border rounded p-2 w-full mb-2"
        onChange={(e) => setMonthly(Number(e.target.value))}
      />
      <button
        onClick={calculate}
        className="bg-brand text-white px-4 py-2 rounded shadow"
      >
        Calculate
      </button>
      {months > 0 && (
        <p className="mt-4 text-sm">
          You’ll reach your goal in about <strong>{months} months</strong>.
        </p>
      )}
    </Card>
  );
}

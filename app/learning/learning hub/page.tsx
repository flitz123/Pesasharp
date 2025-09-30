"use client";
import { useParams } from "next/navigation";
import Link from "next/link";

const pdfMap: Record<
  string,
  {
    path: string;
    title: string;
    intro: string[];
    related: { name: string; href: string }[];
  }
> = {
  investing: {
    path: "/docs/Investing_Guide.pdf",
    title: "Investing Guide",
    intro: [
      "Learn how to grow your wealth through SACCOs, NSE, Pension Funds, MMFs, and Real Estate.",
      "Covers risk vs return, diversification, and practical steps to start investing today.",
      "Includes step-by-step beginner’s path and pro best practices.",
    ],
    related: [
      { name: "Investment Analyzer", href: "/tools/investment-analyzer" },
      { name: "Savings Goal Tracker", href: "/tools/savings" },
    ],
  },
  saving: {
    path: "/docs/Saving_Guide.pdf",
    title: "Saving Guide",
    intro: [
      "Discover how to build an emergency fund, save for goals, and leverage mobile savings platforms.",
      "Explains types of savings and step-by-step plan for consistent growth.",
      "Learn habits that make saving easier and sustainable.",
    ],
    related: [
      { name: "Savings Goal Tracker", href: "/tools/savings" },
      { name: "Budget Planner", href: "/tools/budget" },
    ],
  },
  debt: {
    path: "/docs/Debt_Management_Guide.pdf",
    title: "Debt Management Guide",
    intro: [
      "Understand good vs bad debt and how interest rates impact repayment.",
      "Learn strategies like Avalanche vs Snowball to clear debts faster.",
      "Get tips to avoid debt traps and manage loans wisely.",
    ],
    related: [
      { name: "Debt Payoff Calculator", href: "/tools/debt" },
      { name: "Budget Planner", href: "/tools/budget" },
    ],
  },
  business: {
    path: "/docs/Business_Finance_Guide.pdf",
    title: "Business Finance Guide",
    intro: [
      "Master financial planning for SMEs and startups.",
      "Explore funding options like SACCOs, VCs, and grants.",
      "Step-by-step guide to managing business cash flow, reinvestment, and scaling.",
    ],
    related: [
      { name: "Budget Planner", href: "/tools/budget" },
      { name: "Investment Analyzer", href: "/tools/investment-analyzer" },
    ],
  },
};

export default function LearningCategory() {
  const params = useParams();
  const category = params?.category as string;
  const guide = pdfMap[category];

  if (!guide) {
    return <div className="p-6">Category not found.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold">{guide.title}</h1>

      {/* Article Summary */}
      <div className="bg-white p-4 rounded shadow space-y-2">
        <h2 className="text-lg font-semibold">What you’ll learn</h2>
        <ul className="list-disc pl-6 text-sm text-gray-700">
          {guide.intro.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>

      {/* Embedded PDF */}
      <div className="bg-white p-2 rounded shadow">
        <iframe
          src={guide.path}
          className="w-full h-[600px] rounded"
          title={guide.title}
        />
      </div>

      {/* Download button */}
      <a
        href={guide.path}
        download
        className="inline-block bg-brand text-white px-4 py-2 rounded shadow hover:opacity-90"
      >
        Download PDF
      </a>

      {/* Related Tools */}
      <div className="bg-gray-50 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Apply What You Learned</h2>
        <ul className="list-disc pl-6 text-sm">
          {guide.related.map((tool, i) => (
            <li key={i}>
              <Link href={tool.href} className="text-brand underline">
                {tool.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

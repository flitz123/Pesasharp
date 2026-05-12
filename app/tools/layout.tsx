import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="col-span-1">
            <nav className="flex flex-col space-y-2">
              <Link href="/tools/budget" className="p-2 bg-gray-200 rounded">Budget Planner</Link>
              <Link href="/tools/debt" className="p-2 bg-gray-200 rounded">Debt Calculator</Link>
              <Link href="/tools/savings" className="p-2 bg-gray-200 rounded">Savings Estimator</Link>
              <Link href="/tools/investments" className="p-2 bg-gray-200 rounded">Investment Simulator</Link>
            </nav>
          </aside>
          <div className="col-span-3">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

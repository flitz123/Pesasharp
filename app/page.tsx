import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Welcome to PesaPlan</h1>
      <p className="text-gray-600">
        Your personal hub for financial education, planning, and smart money
        tools. Learn to save, invest, and manage your money like a pro.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <Link
          href="/learning"
          className="p-6 bg-white rounded shadow hover:bg-gray-50"
        >
          📚 Learning Hub
        </Link>
        <Link
          href="/tools/budget"
          className="p-6 bg-white rounded shadow hover:bg-gray-50"
        >
          🛠 Tools & Simulators
        </Link>
        <Link
          href="/merch"
          className="p-6 bg-white rounded shadow hover:bg-gray-50"
        >
          👕 Merch Store
        </Link>
        <Link
          href="/digital"
          className="p-6 bg-white rounded shadow hover:bg-gray-50"
        >
          💻 Digital Products
        </Link>
      </div>
    </div>
  );
}

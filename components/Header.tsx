import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-brand text-white shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-xl font-bold">
          PesaPlan
        </Link>
        <nav className="space-x-4 text-sm font-medium">
          <Link href="/learning" className="hover:underline">
            Learning Hub
          </Link>
          <Link href="/tools/budget" className="hover:underline">
            Tools
          </Link>
          <Link href="/merch" className="hover:underline">
            Merch
          </Link>
          <Link href="/digital" className="hover:underline">
            Digital Products
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

import Card from "@/components/Card";
import Link from "next/link";

const moneyBooks = [
  {
    id: "personal-finance-summaries",
    title: "Personal Finance Book Summaries",
    desc: "Summaries of top personal finance books to accelerate your learning.",
    price: "500",
    file: "/assets/Moneybooks/Personal_Finance_Book_Summaries.pdf",
  },
  {
    id: "psychology-of-money",
    title: "The Psychology of Money",
    desc: "Learn about the psychology behind wealth and financial decisions.",
    price: "700",
    file: "/assets/Moneybooks/The Psychology of Money.pdf",
  },
  {
    id: "the-mountain-is-you",
    title: "The mountain is you",
    desc: "A book about self-sabotage and how to overcome it.",
    price: "600",
    file: "/assets/Moneybooks/The mountain is you.pdf",
  },
  {
    id: "the-circle-maker",
    title: "The Circle Maker",
    desc: "A sample of The Circle Maker by Mark Batterson.",
    price: "Free",
    file: "/assets/Moneybooks/The-Circle-Maker-by-Mark-Batterson-sample.pdf",
  },
];

export default function DigitalProducts() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Digital Products</h1>
      <p className="text-gray-600">
        Unlock premium financial tools and resources. Instant delivery after
        purchase.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {moneyBooks.map((item) => (
          <Card key={item.id} title={item.title}>
            <p className="text-sm text-gray-700">{item.desc}</p>
            <p className="text-lg font-semibold">
              {item.price === "Free" ? "Free" : `Ksh ${item.price}`}
            </p>
            <Link
              href={item.file}
              className="block bg-brand text-white text-center py-2 rounded shadow hover:opacity-90 mt-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.price === "Free" ? "Download" : "Buy Now"}
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}


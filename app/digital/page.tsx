import Card from "@/components/Card";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function DigitalProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Digital Products</h1>
      <p className="text-gray-600">
        Unlock premium financial tools and resources. Instant delivery after
        purchase.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((item) => (
          <Card key={item.id} title={item.title}>
            <p className="text-sm text-gray-700">{item.desc}</p>
            <p className="text-lg font-semibold">Ksh {item.price}</p>
            <Link
              href={`/checkout/${item.id}`}
              className="block bg-brand text-white text-center py-2 rounded shadow hover:opacity-90 mt-2"
            >
              Buy Now
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

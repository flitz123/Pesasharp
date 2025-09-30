import Card from "@/components/Card";
import Image from "next/image";
import Link from "next/link";

const merch = [
  {
    id: "shirt1",
    title: "PesaPlan Classic Tee",
    price: "Ksh 1,500",
    img: "/merch/shirt1.png",
    url: "/api/affiliate/jumia",
  },
  {
    id: "hoodie1",
    title: "PesaPlan Hoodie",
    price: "Ksh 3,000",
    img: "/merch/hoodie1.png",
    url: "/api/affiliate/jumia",
  },
  {
    id: "cap1",
    title: "PesaPlan Cap",
    price: "Ksh 1,000",
    img: "/merch/cap1.png",
    url: "/api/affiliate/jumia",
  },
];

export default function MerchPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Merch Store</h1>
      <p className="text-gray-600">
        Support PesaPlan by grabbing some cool merch! All purchases help fund
        free financial education.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {merch.map((item) => (
          <Card key={item.id} title={item.title}>
            <div className="space-y-2">
              <div className="relative w-full h-48">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <p className="text-sm text-gray-700">{item.price}</p>
              <Link
                href={item.url}
                className="block bg-brand text-white text-center py-2 rounded shadow hover:opacity-90"
              >
                Buy Now
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

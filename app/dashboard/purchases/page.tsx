import prisma from "@/lib/prisma";

export default async function PurchasesPage() {
  const purchases = await prisma.purchase.findMany({
    orderBy: { createdAt: "desc" },
    include: { productRef: true }, // 👈 fetch product relation
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Purchases</h1>
      {purchases.length === 0 && <p>You have no purchases yet.</p>}
      <ul className="space-y-4">
        {purchases.map((p) => (
          <li
            key={p.id}
            className="p-4 bg-white rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                {p.productRef?.title || "Unknown Product"}
              </p>
              <p className="text-sm text-gray-600">
                {p.amount} Ksh – {p.status}
              </p>
            </div>
            {p.status === "success" && (
              <a
                href={`/downloads/${p.productRef?.title || "file"}.pdf`}
                className="bg-brand text-white px-4 py-2 rounded shadow hover:opacity-90"
              >
                Download
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

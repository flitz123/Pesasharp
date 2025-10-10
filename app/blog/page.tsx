import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">PesaPlan Blog</h1>
      <p className="text-gray-600">Financial insights, news, and updates.</p>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow">
            <Link href={`/blog/${post.id}`}>
              <h2 className="text-lg font-semibold text-brand hover:underline">
                {post.title}
              </h2>
            </Link>
            <p className="text-sm text-gray-600 mt-1">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

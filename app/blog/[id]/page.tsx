import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post) return notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-600">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <article className="prose max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>

      <hr className="my-4" />

      {/* Example: Embedded social posts */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Related Social Posts</h2>

        {/* Example embeds */}
        <blockquote className="twitter-tweet">
          <a href="https://twitter.com/PesaPlanKE/status/1234567890">
            Loading Tweet…
          </a>
        </blockquote>

        <iframe
          src="https://www.instagram.com/p/Cxyz123/embed"
          className="w-full rounded"
          height="500"
          allowTransparency
        ></iframe>

        <iframe
          src="https://www.threads.net/embed/post/Cxyz456"
          className="w-full rounded"
          height="500"
          allowTransparency
        ></iframe>
      </div>
    </div>
  );
}

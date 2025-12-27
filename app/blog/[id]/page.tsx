
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import fs from 'fs';
import path from 'path';
import remarkGfm from 'remark-gfm';

export default async function BlogPost({ params }: { params: { id: string } }) {
  const { id } = params;
  let filePath;
  if (id === 'Posts') {
    filePath = path.join(process.cwd(), 'app', 'admin', 'Posts.md');
  } else {
    filePath = path.join(process.cwd(), 'app', 'blog', `${id}.md`);
  }

  if (!fs.existsSync(filePath)) {
    return notFound();
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const titleLine = fileContents.split('\n')[0];
  const title = titleLine ? titleLine.replace(/#+\s*/, '').replace(/📘/g, '').trim() : 'Untitled Post';
  const createdAt = fs.statSync(filePath).ctime;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-gray-600">
        {new Date(createdAt).toLocaleDateString()}
      </p>

      <article className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{fileContents}</ReactMarkdown>
      </article>
    </div>
  );
}

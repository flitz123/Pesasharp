import Link from 'next/link';
import fs from 'fs';
import path from 'path';

const BlogPage = () => {
  const posts = [];

  // Get posts from app/blog
  const blogDirectory = path.join(process.cwd(), 'app', 'blog');
  const blogFilenames = fs.readdirSync(blogDirectory);
  blogFilenames
    .filter(filename => filename.endsWith('.md'))
    .forEach(filename => {
        const filePath = path.join(blogDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const titleLine = fileContents.split('\n')[0];
        const title = titleLine ? titleLine.replace(/#+\s*/, '').replace(/📘/g, '').trim() : 'Untitled Post';
        const id = filename.replace('.md', '');
        posts.push({ id, title, createdAt: fs.statSync(filePath).ctime.toISOString() });
    });

    // Get post from app/admin
    const adminDirectory = path.join(process.cwd(), 'app', 'admin');
    try {
        const adminFilenames = fs.readdirSync(adminDirectory);
        adminFilenames
        .filter(filename => filename === 'Posts.md')
        .forEach(filename => {
            const filePath = path.join(adminDirectory, filename);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const titleLine = fileContents.split('\n')[0];
            const title = titleLine ? titleLine.replace(/#+\s*/, '').replace(/📘/g, '').trim() : 'Untitled Post';
            const id = filename.replace('.md', '');
            posts.push({ id, title, createdAt: fs.statSync(filePath).ctime.toISOString() });
        });
    } catch (error) {
        // Suppress error if admin directory doesn't exist
    }


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">PesaSharp Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">
                Published on {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <Link href={`/blog/${post.id}`} className="text-blue-500 hover:underline">
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;

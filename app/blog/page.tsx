"use client";
import { useEffect, useState } from "react";

export default function AdminBlog() {
  const [secret, setSecret] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const fetchPosts = async () => {
    const res = await fetch("/api/admin/blog");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreate = async (e: any) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, secret }),
    });
    const data = await res.json();
    if (data.error) setMessage(`❌ ${data.error}`);
    else {
      setMessage("✅ Post created successfully!");
      setTitle("");
      setContent("");
      fetchPosts();
    }
  };

  const handleEdit = async (id: string) => {
    const res = await fetch("/api/admin/blog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, content, secret }),
    });
    const data = await res.json();
    if (data.error) setMessage(`❌ ${data.error}`);
    else {
      setMessage("✏️ Post updated successfully!");
      setEditing(null);
      setTitle("");
      setContent("");
      fetchPosts();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    const res = await fetch("/api/admin/blog", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, secret }),
    });
    const data = await res.json();
    if (data.error) setMessage(`❌ ${data.error}`);
    else {
      setMessage("🗑 Post deleted successfully.");
      fetchPosts();
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded shadow p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admin Blog Manager</h1>
      <p className="text-gray-600 text-sm">
        Protected by your admin password. Use Markdown in the content field.
      </p>

      <form onSubmit={handleCreate} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Admin Password</label>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="Enter admin password"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Post Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">
            Post Content (Markdown supported)
          </label>
          <textarea
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border rounded p-2 w-full font-mono"
            placeholder="Write your post here..."
            required
          />
        </div>

        <button
          type="submit"
          className="bg-brand text-white px-4 py-2 rounded shadow hover:opacity-90"
        >
          Publish Post
        </button>
      </form>

      {message && <p className="text-sm mt-4">{message}</p>}

      <hr className="my-6" />

      <h2 className="text-lg font-semibold">Existing Posts</h2>
      {posts.length === 0 && <p>No posts yet.</p>}

      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.id} className="p-4 border rounded space-y-2">
            {editing === p.id ? (
              <>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border rounded p-2 w-full"
                />
                <textarea
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="border rounded p-2 w-full"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(p.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-semibold text-brand">{p.title}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(p.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditing(p.id);
                      setTitle(p.title);
                      setContent(p.content);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

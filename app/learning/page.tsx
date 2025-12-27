import Link from "next/link";

export default function LearningHome() {
  const categories = [
    { slug: "investing", title: "Investing Guide" },
    { slug: "saving", title: "Saving Guide" },
    { slug: "debt", title: "Debt Management Guide" },
    { slug: "business", title: "Business Finance Guide" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Learning Hub</h1>
      <p>Explore guides, articles, and videos to master your finances.</p>

      <ul className="grid md:grid-cols-2 gap-4">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/learning/${c.slug}`}
              className="block p-4 bg-white rounded shadow hover:bg-gray-50"
            >
              {c.title}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/learning/videos"
        className="inline-block bg-brand text-white px-4 py-2 rounded shadow hover:opacity-90"
      >
        🎥 Watch Video Lessons
      </Link>
    </div>
  );
}


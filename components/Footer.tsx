export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-8">
      <div className="max-w-6xl mx-auto p-4 text-sm text-gray-600 flex justify-between">
        <p>© {new Date().getFullYear()} PesaPlan. All rights reserved.</p>
        <div className="space-x-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Twitter
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}

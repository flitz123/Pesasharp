import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 max-w-6xl mx-auto p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

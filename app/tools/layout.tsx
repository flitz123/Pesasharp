import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto p-6 space-y-6">{children}</main>
      <Footer />
    </div>
  );
}

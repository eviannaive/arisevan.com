export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <header className="py-6 border-b">
        <h1 className="text-2xl font-bold">Dashboard Site</h1>
      </header>
      <main className="py-8">{children}</main>
      <footer className="py-6 border-t">
        <p>© 2025 Arisevan</p>
      </footer>
    </div>
  );
}

import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white/70 p-6 shadow-md">
        <nav>
          <ul>
            <li className="mb-4">
              <Link
                href="/happycoding/dashboard"
                className="text-lg font-semibold hover:text-blue-800"
              >
                Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/happycoding/dashboard/articles"
                className="text-lg font-semibold text-blue-600 hover:text-blue-800"
              >
                Articles
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/happycoding/dashboard/categories"
                className="text-lg font-semibold text-blue-600 hover:text-blue-800"
              >
                Categories
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/happycoding/dashboard/tags"
                className="text-lg font-semibold text-blue-600 hover:text-blue-800"
              >
                Tags
              </Link>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </nav>
      </aside>

      {/* Right Content Area */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

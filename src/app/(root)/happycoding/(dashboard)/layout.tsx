"use client";
import { cn, capitalize } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";

const sidebar = [
  {
    name: "dashboard",
    path: "/happycoding/dashboard",
  },
  {
    name: "articles",
    path: "/happycoding/articles",
  },
  {
    name: "categories",
    path: "/happycoding/categories",
  },
  {
    name: "tags",
    path: "/happycoding/tags",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const unit = pathName.split("/")[2];
  const detectUnit = (unitName: string) => {
    return unitName === unit;
  };

  return (
    <div className="flex">
      {/* Left Sidebar */}
      <aside className="w-58 bg-white/70 p-6 shadow-md rounded-xs">
        <nav className="sticky top-10">
          <ul className="text-large font-bold text-secondary-600">
            {sidebar.map((item) => (
              <li key={item.name} className={cn("", detectUnit(item.name))}>
                <Link href={item.path} className="flex group">
                  <div
                    className={cn(
                      "size-4 mt-3 mr-2 font-bold transition-width overflow-hidden h-5",
                      detectUnit(item.name) ? "w-5" : "w-0",
                    )}
                  >
                    <ArrowRightCircleIcon
                      className={cn("size-5 mr-2 font-bold")}
                    />
                  </div>

                  <div className="py-2 flex-grow group-hover:text-secondary-700 relative">
                    {capitalize(item.name)}
                    <div className="w-0 h-1 bg-secondary-300 transition-width group-hover:w-full"></div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Right Content Area */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

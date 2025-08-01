import { Button } from "@heroui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 w-full min-h-screen flex flex-col">
      <header className="py-6 border-b flex items-center justify-between">
        <div className="text-2xl font-bold">Arisevan Blog Dashboard Site</div>
        <Button color="secondary" radius="full">
          Logout
        </Button>
      </header>
      <main className="py-8 flex-1">{children}</main>
      <footer className="py-6 border-t text-center">
        <p>© 2025 Arisevan</p>
      </footer>
    </div>
  );
}

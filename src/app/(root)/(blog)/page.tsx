import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="p-20">
        <Link href="/happycoding" className="text-5xl font-bold bg-gray-300">
          Go dasg board
        </Link>
      </div>
    </>
  );
}

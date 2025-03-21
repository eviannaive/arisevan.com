import Nav from "@/components/layouts/Nav";
import Image from "next/image";

const data_menu = [
  {
    img: "/menu/js.svg",
    label: "javascript",
  },
  {
    img: "/menu/react.svg",
    label: "react",
  },
  {
    img: "/menu/vue.svg",
    label: "vue",
  },
  {
    img: "/menu/workflow.svg",
    label: "workflow",
  },
  {
    img: "/menu/fish.svg",
    label: "arisevan",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <div className="">
        <div className="flex">
          <div className="w-(--menu-width) border-r-2 bg-white/70 border-primary relative shrink-0">
            <div className="absolute w-12 top-0 left-0 bg-gray-300 h-full"></div>
            <div className="flex sticky top-(--header-caculate) h-[calc(100vh-var(--header-caculate))]">
              <div className="w-24 p-4 pt-14">
                <div className="w-full grid grid-cols-1 gap-4 relative z-10">
                  {data_menu.map((d, index) => (
                    <button
                      key={index}
                      className="w-full p-2 bg-white rounded-full grid place-content-center shadow-common cursor-pointer hover:shadow-(--shadow-float) hover:border-2 hover:border-primary-800/80 hover:bg-gray-100"
                    >
                      <Image src={d.img} alt={d.label} width="50" height="50" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-grow pr-4 py-6 font-mono custom-scrollbar overflow-y-scroll">
                <ul className="grid grid-cols-1 gap-4 break-words w-full">
                  {Array(30)
                    .fill(null)
                    .map((d, index) => (
                      <li
                        className="hover:text-primary-900 cursor-pointer hover:underline"
                        key={index}
                      >
                        gkjfdkl;gjdlfksjg
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex-grow h-[200vh] pt-(--header-caculate)">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

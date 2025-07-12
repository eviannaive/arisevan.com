// scripts/seed-categories.ts
import { prisma } from "../src/lib/prisma"; // 調整成你的 prisma 實際位置
import generateSlug from "../src/lib/generateSlug"; // 確保 generateSlug 存在

const data_menu = [
  { img: "/menu/js.svg", label: "Javascript" },
  { img: "/menu/react.svg", label: "React" },
  { img: "/menu/vue.svg", label: "Vue" },
  { img: "/menu/workflow.svg", label: "Workflow" },
];

async function seedCategories() {
  for (const item of data_menu) {
    if (!item.label) continue;

    await prisma.category.upsert({
      where: { name: item.label },
      update: {},
      create: {
        name: item.label,
        slug: generateSlug(item.label),
      },
    });
  }

  console.log("✅ Categories seeded!");
}

seedCategories()
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
  })
  .finally(() => prisma.$disconnect());

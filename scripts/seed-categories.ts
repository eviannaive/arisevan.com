// scripts/seed-categories.ts
import { prisma } from "../src/lib/prisma"; // 調整成你的 prisma 實際位置
import generateSlug from "../src/lib/generateSlug"; // 確保 generateSlug 存在

const data_menu = [
  { image: "/menu/js.svg", label: "Javascript" },
  { image: "/menu/react.svg", label: "React" },
  { image: "/menu/vue.svg", label: "Vue" },
  { image: "/menu/workflow.svg", label: "Workflow" },
  { image: "/menu/database.png", label: "Backend Journey" },
];

async function seedCategories() {
  for (const item of data_menu) {
    if (!item.label) continue;

    await prisma.category.upsert({
      where: { name: item.label },
      update: { image: item.image },
      create: {
        name: item.label,
        image: item.image,
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

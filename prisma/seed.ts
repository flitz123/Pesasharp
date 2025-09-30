import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear old data (optional for dev only)
  await prisma.purchase.deleteMany();
  await prisma.post.deleteMany();
  await prisma.product.deleteMany();

  // Sample Posts
  await prisma.post.createMany({
    data: [
      {
        title: 'Top 5 Savings Strategies for 2025',
        content: 'Learn the most effective ways to build an emergency fund and long-term savings.',
      },
      {
        title: 'Beginner’s Guide to SACCO Investing',
        content: 'Step-by-step guide to choosing the right SACCO and understanding dividends.',
      },
      {
        title: 'Avoiding Debt Traps in Kenya',
        content: 'Practical advice on avoiding high-interest loans and managing credit responsibly.',
      },
    ],
  });

  // Sample Products
  const products = await prisma.product.createMany({
    data: [
      {
        title: 'Premium Investing Course',
        desc: 'Step-by-step advanced investing strategies with real case studies.',
        price: 2000,
        type: 'course',
      },
      {
        title: 'Advanced Investment Simulator',
        desc: 'A pro version of our simulator with more data sources and export options.',
        price: 1000,
        type: 'simulator',
      },
      {
        title: 'Personal Finance Mastery eBook',
        desc: 'In-depth guide to saving, investing, and debt management.',
        price: 500,
        type: 'ebook',
      },
    ],
  });

  // Fetch products with IDs (createMany doesn’t return records)
  const allProducts = await prisma.product.findMany();

  // Link Purchases to Products
  const course = allProducts.find(p => p.title.includes('Course'));
  const ebook = allProducts.find(p => p.title.includes('eBook'));

  if (course && ebook) {
    await prisma.purchase.createMany({
      data: [
        {
          product: course.id,
          phone: '254700123456',
          amount: course.price,
          status: 'success',
        },
        {
          product: ebook.id,
          phone: '254711234567',
          amount: ebook.price,
          status: 'pending',
        },
      ],
    });
  }

  console.log('✅ Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

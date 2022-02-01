import { Prisma } from "@prisma/client";
import { prisma } from "./index";

const userData: Prisma.UserCreateInput = {
  firstName: "Hendrik",
  lastName: "Wendt",
  email: "hendrikw@phoscreative.com",
  role: "ADMIN",
};

async function main() {
  console.log("\n\nSeeding db...");

  const user = await prisma.user.create({ data: userData });
  const categories = await prisma.category.createMany({
    data: [
      { title: "Income", userId: user.id },
      { title: "Housing", userId: user.id },
      { title: "Transportation", userId: user.id },
      { title: "Food", userId: user.id },
      { title: "Personal", userId: user.id },
    ],
  });

  const getCategories = await prisma.category.findMany();

  getCategories.forEach(async (category) => {
    switch (category.title) {
      case "Income":
        await prisma.item.createMany({
          data: [
            { title: "Paycheck 1", categoryId: category.id },
            { title: "Pacycheck 2", categoryId: category.id },
          ],
        });
        break;
      case "Housing":
        await prisma.item.createMany({
          data: [
            { title: "Rent", categoryId: category.id },
            { title: "Garden", categoryId: category.id },
          ],
        });
        break;
      case "Transportation":
        await prisma.item.createMany({
          data: [
            { title: "Gas", categoryId: category.id },
            { title: "Maintenance", categoryId: category.id },
          ],
        });
        break;
      case "Food":
        await prisma.item.createMany({
          data: [
            { title: "Groceries", categoryId: category.id },
            { title: "Restaurants", categoryId: category.id },
          ],
        });
        break;
      case "Personal":
        await prisma.item.createMany({
          data: [
            { title: "Phone", categoryId: category.id },
            { title: "Subscriptions", categoryId: category.id },
            { title: "Haircut", categoryId: category.id },
          ],
        });
        break;

      default:
        break;
    }
  });

  const items = await prisma.item.findMany();

  console.log(`Created user with id: ${user.id}`);
  console.log(`Created ${categories.count} categories`);
  console.log(`Created ${items.length} items`);
  console.log(`Seeding finished.\n\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

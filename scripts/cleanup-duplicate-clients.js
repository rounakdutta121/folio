const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

async function main() {
  const clients = await p.client.findMany({
    include: { _count: { select: { documents: true } } },
    orderBy: { createdAt: "asc" },
  });

  console.log(
    clients.map((c) => ({
      id: c.id,
      name: c.name,
      phone: c.phone,
      email: c.email,
      docs: c._count.documents,
    })),
  );

  const empty = clients.filter((c) => c._count.documents === 0);
  for (const c of empty) {
    const twin = clients.find(
      (o) =>
        o.id !== c.id &&
        o.name === c.name &&
        o.phone === c.phone &&
        o.email === c.email &&
        o._count.documents > 0,
    );
    if (twin) {
      await p.client.delete({ where: { id: c.id } });
      console.log("deleted empty duplicate", c.id, c.name);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => p.$disconnect());

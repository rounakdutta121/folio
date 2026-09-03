const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");

const p = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("password12", 10);
  const user = await p.user.upsert({
    where: { email: "desk@folio.test" },
    update: {},
    create: {
      email: "desk@folio.test",
      passwordHash: hash,
      business: {
        create: {
          name: "Atelier Rao",
          currency: "INR",
          taxRate: 18,
          paymentQrUrl:
            "https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=folio-pay",
          payInstructions: "Scan GPay. Pay the total.",
        },
      },
    },
  });
  const b = await p.business.findUnique({ where: { userId: user.id } });
  let client = await p.client.findFirst({ where: { businessId: b.id } });
  if (!client) {
    client = await p.client.create({
      data: {
        businessId: b.id,
        name: "Meera Clinic",
        phone: "919800000000",
        email: "meera@example.com",
      },
    });
  }
  const qtok = nanoid(12);
  const itok = nanoid(12);
  const quote = await p.document.create({
    data: {
      businessId: b.id,
      clientId: client.id,
      kind: "quote",
      status: "sent",
      number: "QT-2026-0099",
      publicToken: qtok,
      taxRate: 18,
      validUntil: new Date("2026-12-01"),
      lineItems: {
        create: [{ description: "Consultation block", qty: 1, rate: 8000, sort: 0 }],
      },
    },
  });
  await p.document.create({
    data: {
      businessId: b.id,
      clientId: client.id,
      kind: "invoice",
      status: "due",
      number: "INV-2026-0099",
      publicToken: itok,
      taxRate: 18,
      dueDate: new Date("2026-12-01"),
      convertedFromId: quote.id,
      lineItems: {
        create: [{ description: "Consultation block", qty: 1, rate: 8000, sort: 0 }],
      },
    },
  });
  console.log("Q", qtok);
  console.log("I", itok);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => p.$disconnect());

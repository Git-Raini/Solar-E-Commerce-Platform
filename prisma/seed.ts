import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Admin123!", 10);

  await prisma.user.upsert({
    where: { email: "admin@solarsphere.com" },
    update: {},
    create: {
      name: "SolarSphere Admin",
      email: "admin@solarsphere.com",
      password: passwordHash,
      role: "ADMIN",
    },
  });

  await prisma.product.deleteMany();

  const products = [
    {
      slug: "heliomax-440w-panel",
      name: "HelioMax 440W Solar Panel",
      description: "High-efficiency mono-crystalline panel engineered for residential rooftops.",
      category: "Solar Panels",
      price: 420,
      power: "440 W",
      efficiency: "21.4%",
      warranty: "25 years",
      rating: 4.8,
      availability: "In stock",
      country: "India",
      image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=900&q=80",
    },
    {
      slug: "storion-10kwh-battery",
      name: "Storion 10kWh Battery System",
      description: "Reliable energy storage for backup and peak shaving with seamless grid integration.",
      category: "Batteries",
      price: 5500,
      power: "10 kWh",
      efficiency: "95%",
      warranty: "10 years",
      rating: 4.7,
      availability: "Limited stock",
      country: "USA",
      image: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=900&q=80",
    },
    {
      slug: "ecoflow-8kw-inverter",
      name: "EcoFlow 8kW Hybrid Inverter",
      description: "Hybrid inverter optimized for solar plus battery installations with smart load management.",
      category: "Inverters",
      price: 2100,
      power: "8 kW",
      efficiency: "98.5%",
      warranty: "12 years",
      rating: 4.6,
      availability: "In stock",
      country: "Germany",
      image: "https://images.unsplash.com/photo-1514171221478-1c3e3cb3d9a8?auto=format&fit=crop&w=900&q=80",
    },
    {
      slug: "chargepulse-ev-charger",
      name: "ChargePulse EV Charger",
      description: "Compact home EV charger built for fast charging with smart scheduling and remote control.",
      category: "EV Chargers",
      price: 750,
      power: "7.2 kW",
      efficiency: "99%",
      warranty: "5 years",
      rating: 4.4,
      availability: "In stock",
      country: "UK",
      image: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=900&q=80",
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  await prisma.installer.upsert({
    where: { id: "installer-001" },
    update: {},
    create: {
      id: "installer-001",
      name: "Sunrise Solar Installers",
      region: "India",
      rating: 4.9,
      available: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed completed.");
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

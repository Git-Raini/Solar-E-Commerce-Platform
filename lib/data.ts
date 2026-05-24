export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  power: string;
  efficiency: string;
  warranty: string;
  rating: number;
  description: string;
  image: string;
  availability: string;
  country: string;
};

export const products: Product[] = [
  {
    id: "panel-001",
    name: "HelioMax 440W Solar Panel",
    category: "Solar Panels",
    price: 420,
    power: "440 W",
    efficiency: "21.4%",
    warranty: "25 years",
    rating: 4.8,
    description: "High-efficiency mono-crystalline panel engineered for residential rooftops.",
    image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=900&q=80",
    availability: "In stock",
    country: "India",
  },
  {
    id: "battery-001",
    name: "Storion 10kWh Battery System",
    category: "Batteries",
    price: 5500,
    power: "10 kWh",
    efficiency: "95%",
    warranty: "10 years",
    rating: 4.7,
    description: "Reliable energy storage for backup and peak shaving with seamless grid integration.",
    image: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=900&q=80",
    availability: "Limited stock",
    country: "USA",
  },
  {
    id: "inverter-001",
    name: "EcoFlow 8kW Hybrid Inverter",
    category: "Inverters",
    price: 2100,
    power: "8 kW",
    efficiency: "98.5%",
    warranty: "12 years",
    rating: 4.6,
    description: "Hybrid inverter optimized for solar plus battery installations with smart load management.",
    image: "https://images.unsplash.com/photo-1514171221478-1c3e3cb3d9a8?auto=format&fit=crop&w=900&q=80",
    availability: "In stock",
    country: "Germany",
  },
  {
    id: "ev-001",
    name: "ChargePulse EV Charger",
    category: "EV Chargers",
    price: 750,
    power: "7.2 kW",
    efficiency: "99%",
    warranty: "5 years",
    rating: 4.4,
    description: "Compact home EV charger built for fast charging with smart scheduling and remote control.",
    image: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=900&q=80",
    availability: "In stock",
    country: "UK",
  },
];

export type QuoteRequest = {
  name: string;
  email: string;
  phone: string;
  country: string;
  electricityBill: number;
  roofArea: number;
  preferredTimeline: string;
  message?: string;
};

export function calculateSolarRecommendation(inputs: {
  monthlyBill: number;
  roofArea: number;
  location: string;
}): {
  requiredKW: number;
  estimatedCost: number;
  annualSavings: number;
  paybackYears: number;
  co2Reduction: number;
} {
  const requiredKW = Math.min(Math.max((inputs.monthlyBill / 100) * 1.15, 2), 20);
  const estimatedCost = Math.round(requiredKW * 950);
  const annualSavings = Math.round(inputs.monthlyBill * 0.84 * 12);
  const paybackYears = Number((estimatedCost / (annualSavings || 1)).toFixed(1));
  const co2Reduction = Math.round(requiredKW * 850);

  return {
    requiredKW,
    estimatedCost,
    annualSavings,
    paybackYears,
    co2Reduction,
  };
}

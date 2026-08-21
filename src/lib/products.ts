import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  badge?: string;
  tags: string[];
  description: string;
  image: string;
};

export const products: Product[] = [
  {
    id: "nv-01",
    name: "Aura ANC Headphones",
    price: 189,
    rating: 4.8,
    badge: "Best Seller",
    tags: ["audio", "work", "travel"],
    description: "Active noise cancelling over-ear headphones with 40h battery.",
    image: p1,
  },
  {
    id: "nv-02",
    name: "Pulse Smartwatch",
    price: 149,
    rating: 4.6,
    badge: "New",
    tags: ["wearable", "fitness", "health"],
    description: "Health tracking smartwatch with AMOLED display and GPS.",
    image: p2,
  },
  {
    id: "nv-03",
    name: "Elevate Laptop Stand",
    price: 59,
    rating: 4.7,
    tags: ["desk", "ergonomic", "remote work"],
    description: "Aluminium ergonomic stand that lifts your screen to eye level.",
    image: p3,
  },
  {
    id: "nv-04",
    name: "Nova65 Mechanical Keyboard",
    price: 129,
    rating: 4.9,
    badge: "Hot",
    tags: ["desk", "typing", "remote work"],
    description: "Hot-swappable 65% keyboard with RGB and silent tactile switches.",
    image: p4,
  },
  {
    id: "nv-05",
    name: "Matte Ceramic Desk Mug",
    price: 24,
    rating: 4.4,
    tags: ["desk", "minimalist", "home"],
    description: "Double-walled 350ml mug that keeps coffee warm for hours.",
    image: p5,
  },
  {
    id: "nv-06",
    name: "Echo Mini Speaker",
    price: 79,
    rating: 4.5,
    badge: "Deal",
    tags: ["audio", "portable", "home"],
    description: "Pocket-size speaker with deep bass and 18h playtime.",
    image: p6,
  },
  {
    id: "nv-07",
    name: "Lumen LED Desk Lamp",
    price: 89,
    rating: 4.6,
    tags: ["desk", "lighting", "remote work"],
    description: "Dimmable lamp with adjustable colour temperature and USB-C port.",
    image: p7,
  },
  {
    id: "nv-08",
    name: "Carry Leather Sleeve Set",
    price: 69,
    rating: 4.3,
    tags: ["accessory", "travel", "minimalist"],
    description: "Full-grain leather laptop sleeve with matching notebook.",
    image: p8,
  },
];

export const productById = (id: string) => products.find((p) => p.id === id);
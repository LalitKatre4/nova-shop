import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Flame } from "lucide-react";
import { CartProvider } from "@/lib/cart";
import { products } from "@/lib/products";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AiAssistant } from "@/components/AiAssistant";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";

const title = "NovaShop — AI-Curated Tech & Desk Essentials";
const description =
  "Shop AI-recommended headphones, desk gear and accessories. Describe what you need and NovaShop's assistant picks the perfect match.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      `${p.name} ${p.description} ${p.tags.join(" ")}`.toLowerCase().includes(q),
    );
  }, [search]);

  const deals = products.filter((p) => p.price < 100);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar onSearch={setSearch} />
        <main>
          <Hero />
          <AiAssistant />

          <section id="shop" className="mx-auto max-w-7xl px-4 py-16">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold md:text-3xl">Featured Catalog</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {filtered.length} product{filtered.length === 1 ? "" : "s"} available
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="mt-10 text-center text-sm text-muted-foreground">
                No products match “{search}”.
              </p>
            )}
          </section>

          <section id="deals" className="mx-auto max-w-7xl px-4 pb-20">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-accent" />
              <h2 className="text-2xl font-bold md:text-3xl">Deals under $100</h2>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {deals.map((p) => (
                <ProductCard key={`deal-${p.id}`} product={p} />
              ))}
            </div>
          </section>
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

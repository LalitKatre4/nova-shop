import { Menu, Search, ShoppingCart, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";

const links = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#shop" },
  { label: "AI Assistant", href: "#ai" },
  { label: "Deals", href: "#deals" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ onSearch }: { onSearch: (q: string) => void }) {
  const { count, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="glass fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <a href="#home" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="gradient-text">NovaShop</span>
        </a>

        <nav className="ml-6 hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1.5 md:flex">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            aria-label="Search products"
            placeholder="Search products…"
            onChange={(e) => onSearch(e.target.value)}
            className="w-40 bg-transparent text-sm outline-none placeholder:text-muted-foreground lg:w-56"
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setOpen(true)}
          aria-label="Open cart"
          className="relative ml-auto grid h-10 w-10 place-items-center rounded-full border border-border bg-secondary/40 md:ml-0"
        >
          <ShoppingCart className="h-4 w-4" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-semibold text-accent-foreground">
              {count}
            </span>
          )}
        </motion.button>

        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 pb-4 pt-2 lg:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-2 py-2 text-sm text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
import { Plus, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

export function ProductCard({ product, reason }: { product: Product; reason?: string }) {
  const { add } = useCart();

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="relative aspect-square overflow-hidden bg-surface">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={768}
          height={768}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground">
            {product.badge}
          </span>
        )}
        {reason && (
          <span className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-accent-foreground">
            AI Match
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          {product.rating.toFixed(1)}
          <span className="ml-auto uppercase tracking-wide">{product.tags[0]}</span>
        </div>
        <h3 className="text-sm font-semibold">{product.name}</h3>
        <p className="line-clamp-2 text-xs text-muted-foreground">{product.description}</p>
        {reason && <p className="text-xs font-medium text-accent">“{reason}”</p>}
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-bold">${product.price}</span>
          <button
            onClick={() => add(product)}
            className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.04]"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Plus className="h-3.5 w-3.5" /> Add to Cart
          </button>
        </div>
      </div>
    </motion.article>
  );
}
import { useState } from "react";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { products, productById } from "@/lib/products";
import { ProductCard } from "./ProductCard";

const samples = [
  "Minimalist desk items for remote work under $100",
  "Gifts for a music lover who travels a lot",
  "Upgrade my home office for long typing sessions",
];

export function AiAssistant() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<"ai" | null>(null);
  const [matches, setMatches] = useState<{ id: string; reason: string }[]>([]);

  const submit = async (q: string) => {
    if (q.trim().length < 3) return;

    const configuredApiUrl = import.meta.env.VITE_AI_API_URL;
    if (!configuredApiUrl) {
      setError("AI service is not configured yet. Please add VITE_AI_API_URL.");
      return;
    }

    const apiUrl = `${configuredApiUrl.replace(/\/$/, "")}/recommend`;

    setLoading(true);
    setError(null);
    setMatches([]);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: q,
          catalog: products.map(({ id, name, price, tags, description }) => ({
            id,
            name,
            price,
            tags,
            description,
          })),
        }),
      });

      const result = (await response.json()) as {
        source?: "ai";
        matches?: { id: string; reason: string }[];
        error?: string;
      };

      if (!response.ok) throw new Error(result.error || "AI request failed");
      if (!result.matches?.length) throw new Error("No recommendations returned");

      setSource("ai");
      setMatches(result.matches);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "The Gemini assistant is unavailable right now. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai" className="mx-auto max-w-7xl px-4 py-20">
      <div
        className="glow-ring rounded-3xl border border-border bg-card p-6 md:p-10"
        style={{ background: "var(--gradient-hero), var(--card)" }}
      >
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
          <Sparkles className="h-4 w-4" /> AI Smart Recommendations
        </div>
        <h2 className="mt-3 text-2xl font-bold md:text-4xl">Let the assistant shop for you</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Describe what you are looking for and we will match it against the full NovaShop catalog.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit(query);
          }}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe what you are looking for (e.g., 'Minimalist desk items for remote work under $100')"
            aria-label="Describe what you are looking for"
            className="flex-1 rounded-full border border-border bg-background/70 px-5 py-3.5 text-sm outline-none ring-ring/40 placeholder:text-muted-foreground focus:ring-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] disabled:opacity-60"
            style={{ background: "var(--gradient-primary)" }}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
            {loading ? "Thinking…" : "Find Matches"}
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          {samples.map((s) => (
            <button
              key={s}
              onClick={() => {
                setQuery(s);
                void submit(s);
              }}
              className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        {matches.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-lg font-semibold gradient-text">AI Matches For You</h3>
              <span className="rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground">
                Generated by Gemini
              </span>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {matches.map((m) => {
                const product = productById(m.id);
                if (!product) return null;
                return <ProductCard key={m.id} product={product} reason={m.reason} />;
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
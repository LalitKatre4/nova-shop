import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28">
      <img
        src={heroImg}
        alt=""
        aria-hidden="true"
        width={1600}
        height={900}
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center md:py-32">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs text-muted-foreground"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent" /> Powered by Gemini AI
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl"
        >
          Discover Products <span className="gradient-text">Tailored By AI</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg"
        >
          Tell NovaShop what you need in plain words — our assistant reads the whole catalog and
          hand-picks the pieces that actually fit your setup and budget.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mt-9 flex flex-wrap justify-center gap-3"
        >
          <a
            href="#shop"
            className="glow-ring inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            style={{ background: "var(--gradient-primary)" }}
          >
            Shop Now <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#ai"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-7 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Try the AI Assistant
          </a>
        </motion.div>
      </div>
    </section>
  );
}
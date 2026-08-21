import { Github, Linkedin, Send, Sparkles, Twitter } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer id="contact" className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="gradient-text">NovaShop</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            AI-curated gear for people who care about their setup.
          </p>
          <div className="mt-4 flex gap-3 text-muted-foreground">
            <a href="#home" aria-label="Twitter"><Twitter className="h-4 w-4" /></a>
            <a href="#home" aria-label="GitHub"><Github className="h-4 w-4" /></a>
            <a href="#home" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Shop</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="#shop" className="hover:text-foreground">All Products</a></li>
            <li><a href="#deals" className="hover:text-foreground">Deals</a></li>
            <li><a href="#ai" className="hover:text-foreground">AI Assistant</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Company</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="#home" className="hover:text-foreground">About</a></li>
            <li><a href="#home" className="hover:text-foreground">Shipping &amp; Returns</a></li>
            <li><a href="#contact" className="hover:text-foreground">Support</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Newsletter</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Drop-alerts and AI picks, once a week.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setDone(true);
            }}
            className="mt-3 flex gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              aria-label="Email address"
              className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          {done && <p className="mt-2 text-xs text-accent">You are on the list. Welcome aboard!</p>}
        </div>
      </div>

      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NovaShop · Designed &amp; developed by Lalit
      </div>
    </footer>
  );
}
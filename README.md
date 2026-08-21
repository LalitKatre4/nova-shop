# NovaShop AI Assistant

Task: Create a responsive, multi-section E-commerce website called "NovaShop" built with React, Tailwind CSS, Lucide Icons, and Framer Motion. This website must feature an interactive AI Smart Product Recommendation tool using Google Gemini API.

1. Website Structure & Design:

Theme: Sleek, modern Dark Mode website (Dark Slate #0f172a background, Indigo/Violet accents, glassmorphic navbar).

Header/Navbar: Brand Logo, Navigation Links (Home, Shop, AI Assistant, Deals, Contact), Search Bar, and Cart Icon with badge count.

Hero Section: High-converting banner with headline "Discover Products Tailored By AI", sub-headline, and a "Shop Now" CTA button.

AI Recommendation Section (Main Feature): A dedicated section on the homepage with an interactive prompt box: "Describe what you are looking for (e.g., 'Minimalist desk items for remote work under $100')".

Product Grid Section: Catalog of 8-10 items with images, prices, badges, rating stars, and "Add to Cart" buttons.

Shopping Cart Drawer: Slide-out side drawer for items, quantity adjustment, total price, and checkout preview.

Footer: Quick website links, newsletter subscription, and developer credits.

2. AI Recommendation Logic:

Connect the input box to Google Gemini through the Cloudflare Worker backend. The Gemini API key stays server-side as the `GEMINI_API_KEY` Worker secret; the frontend only uses `VITE_AI_API_URL`.

Pass user query + product catalog data to AI.

AI must return matching product IDs with a personalized short reason (e.g., "Perfect for your ergonomic setup").

Display recommended products in a glowing "AI Matches For You" section with custom badges.

Keep the Gemini API key out of the frontend bundle. The Cloudflare Worker handles Gemini requests and returns validated product matches.

3. Code Output Requirements:

Clean, production-ready website codebase with proper components (Navbar.jsx, Hero.jsx, AiAssistant.jsx, ProductCard.jsx, CartDrawer.jsx, Footer.jsx).



- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```


## Gemini + Cloudflare Worker

The GitHub Pages frontend calls the Cloudflare Worker at `VITE_AI_API_URL`. The Worker exposes `POST /recommend` and reads the Gemini key from the `GEMINI_API_KEY` secret.

Frontend `.env` example:

```env
VITE_AI_API_URL=https://novashop-ai.workers.dev
```

Worker deployment (from the `worker` directory):

```sh
npm install
npx wrangler login
npx wrangler secret put GEMINI_API_KEY
npx wrangler deploy
```

Never put `GEMINI_API_KEY` in the frontend `.env`, source code, or GitHub repository.

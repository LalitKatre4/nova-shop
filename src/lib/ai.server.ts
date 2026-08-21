type CatalogItem = {
  id: string;
  name: string;
  price: number;
  tags: string[];
  description: string;
};

export type Recommendation = { id: string; reason: string };

export function buildPrompt(query: string, catalog: CatalogItem[]) {
  return `You are NovaShop's shopping assistant. The catalog is:\n${JSON.stringify(
    catalog,
  )}\n\nCustomer request: "${query}"\n\nPick the 2-4 best matching products. Respond with JSON only: {"matches":[{"id":"<product id>","reason":"<short personalized reason, max 12 words>"}]}`;
}

export function mockRecommendations(query: string, catalog: CatalogItem[]): Recommendation[] {
  const words = query.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  const scored = catalog
    .map((p) => {
      const hay = `${p.name} ${p.description} ${p.tags.join(" ")}`.toLowerCase();
      return { p, score: words.filter((w) => w.length > 2 && hay.includes(w)).length };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  return scored.map(({ p }) => ({
    id: p.id,
    reason: `Matches your ${p.tags[0]} needs at $${p.price}.`,
  }));
}

export function parseMatches(content: string): Recommendation[] {
  const cleaned = content.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) return [];
  const parsed = JSON.parse(cleaned.slice(start, end + 1)) as {
    matches?: Recommendation[];
  };
  return (parsed.matches ?? []).filter((m) => m && typeof m.id === "string");
}
export interface Env {
  GEMINI_API_KEY: string;
}

type CatalogItem = {
  id: string;
  name: string;
  price: number;
  tags: string[];
  description: string;
};

type RequestBody = {
  query?: string;
  catalog?: CatalogItem[];
};

const allowedOrigin = "https://lalitkatre4.github.io";

function corsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": origin === allowedOrigin ? allowedOrigin : allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}

function json(data: unknown, status = 200, origin: string | null = null) {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders(origin) });
}

function buildPrompt(query: string, catalog: CatalogItem[]) {
  return `You are NovaShop's shopping assistant. Use ONLY products from this catalog.

Catalog:
${JSON.stringify(catalog)}

Customer request: "${query}"

Return ONLY valid JSON in exactly this format:
{"matches":[{"id":"product id from catalog","reason":"short personalized reason, maximum 12 words"}]}

Choose 2 to 4 best matches. Never invent product IDs.`;
}

function parseMatches(content: string, catalog: CatalogItem[]) {
  try {
    const cleaned = content.replace(/```json|```/g, "").trim();
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start === -1 || end === -1) return [];
    const parsed = JSON.parse(cleaned.slice(start, end + 1)) as {
      matches?: { id?: unknown; reason?: unknown }[];
    };
    const validIds = new Set(catalog.map((item) => item.id));
    return (parsed.matches ?? [])
      .filter((match) => typeof match?.id === "string" && validIds.has(match.id))
      .slice(0, 4)
      .map((match) => ({
        id: match.id as string,
        reason: typeof match.reason === "string" ? match.reason.slice(0, 140) : "Recommended for your request.",
      }));
  } catch {
    return [];
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin) });
    }

    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/recommend") {
      return json({ error: "Not found" }, 404, origin);
    }

    if (origin && origin !== allowedOrigin) {
      return json({ error: "Origin not allowed" }, 403, origin);
    }

    try {
      const body = (await request.json()) as RequestBody;
      const query = body.query?.trim();
      const catalog = body.catalog;

      if (!query || query.length < 3 || query.length > 400) {
        return json({ error: "Query must be between 3 and 400 characters." }, 400, origin);
      }
      if (!Array.isArray(catalog) || catalog.length === 0) {
        return json({ error: "Catalog is required." }, 400, origin);
      }
      if (!env.GEMINI_API_KEY) {
        return json({ error: "Gemini API key is not configured." }, 500, origin);
      }

      const geminiResponse = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": env.GEMINI_API_KEY,
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: buildPrompt(query, catalog) }] }],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.2,
            },
          }),
        },
      );

      if (!geminiResponse.ok) {
        const details = await geminiResponse.text();
        console.error("Gemini error", geminiResponse.status, details);
        return json({ error: "Gemini request failed." }, 502, origin);
      }

      const geminiJson = (await geminiResponse.json()) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      };
      const text = geminiJson.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("") ?? "";
      const matches = parseMatches(text, catalog);

      if (!matches.length) {
        return json({ error: "Gemini did not return valid product matches." }, 502, origin);
      }

      return json({ source: "ai", matches }, 200, origin);
    } catch (error) {
      console.error(error);
      return json({ error: "Unable to process recommendation request." }, 500, origin);
    }
  },
};

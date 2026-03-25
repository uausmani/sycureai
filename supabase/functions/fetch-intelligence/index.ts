import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const CATEGORY_QUERIES: Record<string, string> = {
  ai: '("LLM" OR "GenAI") AND ("vulnerability" OR "exploit" OR "injection")',
  cybersecurity: '("CVE-2025" OR "CVE-2026" OR "zero-day" OR "ransomware")',
  btc: '("Bitcoin" OR "Ethereum") AND ("drainer" OR "hack" OR "exploit")',
  quantum: '("PQC" OR "Post-Quantum") AND ("security" OR "standard")',
};

const HIGH_PRIORITY_KEYWORDS = ['CVE-', 'Vulnerability', 'Exploit', 'Zero-Day', 'Patch', 'Security Advisory'];
const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

function isRelevant(article: any): boolean {
  const text = `${article.title || ''} ${article.description || ''}`.toLowerCase();
  return HIGH_PRIORITY_KEYWORDS.some(kw => text.includes(kw.toLowerCase()));
}

function isRecent(article: any): boolean {
  if (!article.publishedAt) return false;
  return Date.now() - new Date(article.publishedAt).getTime() < TWO_DAYS_MS;
}

function isValidTitle(article: any): boolean {
  const title = (article.title || '').trim();
  if (!title) return false;
  if (/^Home\s*-\s*/i.test(title)) return false;
  if (title === '[Removed]') return false;
  return true;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category } = await req.json();
    const query = CATEGORY_QUERIES[category];

    if (!query) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid category' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const apiKey = Deno.env.get('NEWSAPI_KEY');
    if (!apiKey) {
      throw new Error('NEWSAPI_KEY is not configured');
    }

    const params = new URLSearchParams({
      q: query,
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: '20',
      apiKey,
    });

    const response = await fetch(`https://newsapi.org/v2/everything?${params}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`NewsAPI error [${response.status}]: ${JSON.stringify(data)}`);
    }

    const articles = (data.articles || [])
      .filter((a: any) => isValidTitle(a) && isRecent(a) && isRelevant(a))
      .slice(0, 3)
      .map((a: any) => ({
        title: a.title,
        sourceName: a.source?.name || 'Unknown',
        url: a.url,
        timestamp: a.publishedAt,
      }));

    return new Response(JSON.stringify({ success: true, articles, fetchedAt: new Date().toISOString() }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('fetch-intelligence error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

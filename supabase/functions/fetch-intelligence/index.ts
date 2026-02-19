import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const CATEGORY_QUERIES: Record<string, string> = {
  ai: '"LLM security vulnerability" OR "Adversarial AI" OR "AI exploit"',
  cybersecurity: '"Latest CVE" OR "Ransomware alert" OR "Zero-Day" OR "Vulnerability"',
  btc: '"Crypto exchange hack" OR "Blockchain vulnerability" OR "Bitcoin exploit"',
  quantum: '"Post-Quantum Cryptography" OR "NIST PQC" OR "quantum computing security"',
};

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
      pageSize: '3',
      apiKey,
    });

    const response = await fetch(`https://newsapi.org/v2/everything?${params}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`NewsAPI error [${response.status}]: ${JSON.stringify(data)}`);
    }

    const articles = (data.articles || []).map((a: any) => ({
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

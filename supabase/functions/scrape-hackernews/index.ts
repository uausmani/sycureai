const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const response = await fetch('https://feeds.feedburner.com/TheHackersNews');

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS: ${response.status}`);
    }

    const xml = await response.text();

    // Parse RSS items - extract title and link
    const articles: { title: string; url: string }[] = [];
    const itemRegex = /<item>[\s\S]*?<title>([^<]*)<\/title>[\s\S]*?<link>([^<]*)<\/link>[\s\S]*?<\/item>/gi;
    let match;

    while ((match = itemRegex.exec(xml)) !== null && articles.length < 3) {
      articles.push({
        title: match[1].trim(),
        url: match[2].trim(),
      });
    }

    console.log(`Found ${articles.length} articles from RSS`);

    return new Response(
      JSON.stringify({ success: true, articles, fetchedAt: new Date().toISOString() }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching RSS:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

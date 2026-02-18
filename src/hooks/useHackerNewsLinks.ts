import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface HackerNewsLink {
  title: string;
  url: string;
}

const CACHE_KEY = "hackernews_links";
const CACHE_DURATION = 4 * 60 * 60 * 1000; // 4 hours

export function useHackerNewsLinks() {
  const [links, setLinks] = useState<HackerNewsLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { articles, fetchedAt } = JSON.parse(cached);
        if (Date.now() - new Date(fetchedAt).getTime() < CACHE_DURATION) {
          setLinks(articles);
          setLoading(false);
          return;
        }
      }

      try {
        const { data, error } = await supabase.functions.invoke("scrape-hackernews");

        if (error) throw error;

        if (data?.success && data.articles?.length > 0) {
          setLinks(data.articles);
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            articles: data.articles,
            fetchedAt: data.fetchedAt,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch Hacker News links:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  return { links, loading };
}

export interface NewsLink {
  title: string;
  sourceName: string;
  url: string;
  timestamp: string; // ISO string
}

export interface CategoryNews {
  section: string;
  links: NewsLink[];
  lastUpdated: string; // ISO string
}

// Mock data — swap each category's fetch for a real API or Edge Function later
const mockNews: Record<string, NewsLink[]> = {
  ai: [
    {
      title: "OpenAI Announces GPT-5 With Unprecedented Reasoning Capabilities",
      sourceName: "OpenAI Blog",
      url: "https://openai.com/blog",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "Google DeepMind's Gemini 3 Sets New Benchmarks in Multimodal AI",
      sourceName: "DeepMind Blog",
      url: "https://deepmind.google/discover/blog/",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "EU AI Act Enforcement Begins: What Companies Need to Know",
      sourceName: "TechCrunch",
      url: "https://techcrunch.com/category/artificial-intelligence/",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    },
  ],
  cybersecurity: [
    // Overridden by live HackerNews data when available
    {
      title: "Critical Zero-Day in Popular VPN Software Exploited in the Wild",
      sourceName: "The Hacker News",
      url: "https://thehackernews.com",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "NIST Releases Updated Cybersecurity Framework 3.0 Guidelines",
      sourceName: "NIST",
      url: "https://www.nist.gov/cyberframework",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "State-Sponsored Hackers Target Critical Infrastructure in NATO Countries",
      sourceName: "BleepingComputer",
      url: "https://www.bleepingcomputer.com",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    },
  ],
  btc: [
    {
      title: "Bitcoin Surpasses $120K as Institutional Demand Reaches Record Highs",
      sourceName: "CoinDesk",
      url: "https://www.coindesk.com",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "BlackRock Bitcoin ETF Sees $2B Inflow in Single Week",
      sourceName: "Bloomberg",
      url: "https://www.bloomberg.com/crypto",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "El Salvador's Bitcoin Strategy: Two Years Later — Lessons Learned",
      sourceName: "Bitcoin Magazine",
      url: "https://bitcoinmagazine.com",
      timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    },
  ],
  quantum: [
    {
      title: "IBM Unveils 1,000+ Qubit Processor, Shattering Previous Records",
      sourceName: "IBM Research",
      url: "https://research.ibm.com/quantum-computing",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "NIST Finalizes Post-Quantum Cryptography Standards for Global Adoption",
      sourceName: "NIST",
      url: "https://www.nist.gov/pqcrypto",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "Microsoft Achieves Breakthrough in Topological Qubit Stability",
      sourceName: "Microsoft Research",
      url: "https://www.microsoft.com/en-us/research/",
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    },
  ],
};

/**
 * Fetch news for a given section.
 * Replace this function body with a real API call or Edge Function invocation.
 */
export async function fetchNewsForSection(section: string): Promise<CategoryNews> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const links = mockNews[section] ?? [];
  return {
    section,
    links,
    lastUpdated: new Date().toISOString(),
  };
}

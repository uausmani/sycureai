import { useState, useEffect, useCallback } from "react";
import { Logo } from "@/components/Logo";
import { Sidebar } from "@/components/Sidebar";
import { TopicAccordion } from "@/components/TopicAccordion";
import { ContactForm } from "@/components/ContactForm";
import { useHackerNewsLinks } from "@/hooks/useHackerNewsLinks";
import { fetchNewsForSection, type NewsLink } from "@/data/newsData";

interface Topic {
  title: string;
  subtitle: string;
  section: string;
  links: NewsLink[];
  lastUpdated?: string;
}

const topicMeta = [
  { title: "AI INSIGHTS", subtitle: "Is generative AI the next cyber threat?", section: "ai" },
  { title: "CYBERSECURITY", subtitle: "REAL TIME THREAT INTELLIGENCE", section: "cybersecurity" },
  { title: "BITCOIN", subtitle: "SECURITY AND THE FUTURE", section: "btc" },
  { title: "QUANTUM COMPUTING", subtitle: "Upcoming advances", section: "quantum" },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>("all");
  const [topicData, setTopicData] = useState<Record<string, { links: NewsLink[]; lastUpdated: string }>>({});
  const [refreshing, setRefreshing] = useState<Record<string, boolean>>({});
  const { links: hackerNewsLinks } = useHackerNewsLinks();

  // Load mock data for all sections on mount
  useEffect(() => {
    topicMeta.forEach(async (t) => {
      const data = await fetchNewsForSection(t.section);
      setTopicData((prev) => ({
        ...prev,
        [t.section]: { links: data.links, lastUpdated: data.lastUpdated },
      }));
    });
  }, []);

  const handleRefresh = useCallback(async (section: string) => {
    setRefreshing((prev) => ({ ...prev, [section]: true }));
    try {
      const data = await fetchNewsForSection(section);
      setTopicData((prev) => ({
        ...prev,
        [section]: { links: data.links, lastUpdated: new Date().toISOString() },
      }));
    } finally {
      setRefreshing((prev) => ({ ...prev, [section]: false }));
    }
  }, []);

  // Build final topics, overriding cybersecurity with live HN data when available
  const topics: Topic[] = topicMeta.map((meta) => {
    const sectionData = topicData[meta.section];
    let links = sectionData?.links ?? [];
    let lastUpdated = sectionData?.lastUpdated;

    if (meta.section === "cybersecurity" && hackerNewsLinks.length > 0) {
      links = hackerNewsLinks.map((l) => ({
        title: l.title,
        sourceName: "The Hacker News",
        url: l.url,
        timestamp: new Date().toISOString(),
      }));
      lastUpdated = new Date().toISOString();
    }

    return { ...meta, links, lastUpdated };
  });

  const filteredTopics =
    activeSection === "all"
      ? topics
      : topics.filter((t) => t.section === activeSection);

  const showContactForm = activeSection === "connect";
  const displayTopics = filteredTopics.length > 0 ? filteredTopics : topics;

  const handleLogoClick = () => {
    setActiveSection("all");
  };

  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-8 md:py-12 max-w-6xl">
          {/* Header */}
          <header className="mb-12 md:mb-16">
            <Logo onClick={handleLogoClick} />
          </header>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Sidebar Navigation */}
            <nav className="lg:w-56 flex-shrink-0" aria-label="Topic navigation">
              <Sidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </nav>

            {/* Topic Accordions or Contact Form */}
            <section className="flex-1 space-y-6" aria-label="Topics">
              {showContactForm ? (
                <ContactForm />
              ) : (
                displayTopics.map((topic, index) => (
                  <TopicAccordion
                    key={topic.title}
                    title={topic.title}
                    subtitle={topic.subtitle}
                    links={topic.links}
                    index={index}
                    lastUpdated={topic.lastUpdated}
                    onRefresh={() => handleRefresh(topic.section)}
                    isRefreshing={refreshing[topic.section] ?? false}
                  />
                ))
              )}
            </section>
          </div>

          {/* Footer */}
          <footer className="mt-16 md:mt-24 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground font-light tracking-wide">
              © {new Date().getFullYear()} Sycure.ai — Exploring the intersection of AI, security, and emerging tech.
            </p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default Index;

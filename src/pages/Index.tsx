import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Sidebar } from "@/components/Sidebar";
import { TopicCard } from "@/components/TopicCard";

interface Topic {
  title: string;
  subtitle: string;
  section: string;
}

const topics: Topic[] = [
  {
    title: "AI INSIGHTS",
    subtitle: "Is generative AI the next cyber threat?",
    section: "ai",
  },
  {
    title: "CYBERSECURITY PULSE",
    subtitle: "New exploits as we go",
    section: "cybersecurity",
  },
  {
    title: "BITCOIN",
    subtitle: "Current and future price action",
    section: "btc",
  },
  {
    title: "QUANTUM COMPUTING",
    subtitle: "Upcoming advances",
    section: "quantum",
  },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>("ai");

  const filteredTopics =
    activeSection === "connect"
      ? topics
      : topics.filter((t) => t.section === activeSection);

  const displayTopics = filteredTopics.length > 0 ? filteredTopics : topics;

  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-8 md:py-12 max-w-6xl">
          {/* Header */}
          <header className="mb-12 md:mb-16">
            <Logo />
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

            {/* Topic Cards */}
            <section className="flex-1 space-y-6" aria-label="Topics">
              {displayTopics.map((topic, index) => (
                <TopicCard
                  key={topic.title}
                  title={topic.title}
                  subtitle={topic.subtitle}
                  index={index}
                />
              ))}
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

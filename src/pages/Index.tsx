import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Sidebar } from "@/components/Sidebar";
import { TopicAccordion } from "@/components/TopicAccordion";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface TopicLink {
  title: string;
  url?: string;
}

interface Topic {
  title: string;
  subtitle: string;
  section: string;
  links: TopicLink[];
}

const topics: Topic[] = [
  {
    title: "AI INSIGHTS",
    subtitle: "Is generative AI the next cyber threat?",
    section: "ai",
    links: [
      { title: "Understanding Large Language Models" },
      { title: "AI in Cybersecurity: Friend or Foe?" },
      { title: "Humanoids & Generative AI" },
    ],
  },
  {
    title: "CYBERSECURITY",
    subtitle: "REAL TIME THREAT INTELLIGENCE",
    section: "cybersecurity",
    links: [
      { title: "Latest Zero-Day Vulnerabilities" },
      { title: "Ransomware Trends 2024" },
      { title: "Securing Your Digital Identity" },
    ],
  },
  {
    title: "BITCOIN",
    subtitle: "SECURITY AND THE FUTURE",
    section: "btc",
    links: [
      { title: "Bitcoin Market Analysis" },
      { title: "Institutional Adoption Updates" },
      { title: "Bitcoin Halving Impact" },
    ],
  },
  {
    title: "QUANTUM COMPUTING",
    subtitle: "Upcoming advances",
    section: "quantum",
    links: [
      { title: "Quantum Supremacy Explained" },
      { title: "Post-Quantum Cryptography" },
      { title: "Quantum Computing Breakthroughs" },
    ],
  },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>("all");

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
          <header className="mb-12 md:mb-16 flex items-center justify-between">
            <Logo onClick={handleLogoClick} />
            <Button asChild variant="outline" size="sm" className="gap-2">
              <a href="/AllElectricCars.xlsx" download>
                <Download className="h-4 w-4" />
                Download
              </a>
            </Button>
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

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface TopicLink {
  title: string;
  url?: string;
}

interface TopicAccordionProps {
  title: string;
  subtitle: string;
  links: TopicLink[];
  index: number;
}

export function TopicAccordion({ title, subtitle, links, index }: TopicAccordionProps) {
  return (
    <div
      className={cn(
        "opacity-0 animate-fade-in"
      )}
      style={{ animationDelay: `${200 + index * 150}ms` }}
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={title} className="border-2 border-border rounded-2xl bg-card overflow-hidden hover:border-primary/40 transition-all duration-300">
          <AccordionTrigger className="px-8 py-6 hover:no-underline group">
            <div className="flex flex-col items-start text-left">
              <h3 className="text-xl font-medium tracking-wide text-foreground group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground font-light tracking-wide uppercase mt-1">
                {subtitle}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-8 pb-6">
            <ul className="space-y-3">
              {links.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.url || "#"}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm tracking-wide"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
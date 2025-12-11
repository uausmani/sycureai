import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface TopicCardProps {
  title: string;
  subtitle: string;
  index: number;
  onClick?: () => void;
}

export function TopicCard({ title, subtitle, index, onClick }: TopicCardProps) {
  return (
    <article
      onClick={onClick}
      className={cn(
        "group relative p-8 rounded-2xl border-2 border-border bg-card cursor-pointer",
        "transition-all duration-300 ease-out",
        "hover:border-primary/40 hover:shadow-lg hover:-translate-y-1",
        "opacity-0 animate-fade-in"
      )}
      style={{ animationDelay: `${200 + index * 150}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h3 className="text-xl font-medium tracking-wide text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground font-light tracking-wide uppercase">
            {subtitle}
          </p>
        </div>
        <ArrowRight 
          className={cn(
            "w-5 h-5 text-muted-foreground transition-all duration-300",
            "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
            "group-hover:text-primary"
          )} 
        />
      </div>
      
      {/* Subtle gradient overlay on hover */}
      <div 
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300",
          "bg-gradient-to-br from-accent/50 to-transparent",
          "group-hover:opacity-100 -z-10"
        )} 
      />
    </article>
  );
}

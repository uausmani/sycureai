import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      toast({
        title: "Thank you for connecting!",
        description: "We'll be in touch soon.",
      });
      setName("");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="opacity-0 animate-fade-in border-2 border-border rounded-2xl p-8 bg-card">
      <h2 className="text-2xl font-light tracking-wide text-foreground mb-2">
        CONNECT WITH US
      </h2>
      <p className="text-muted-foreground text-sm mb-8">
        Stay updated on the latest in AI, cybersecurity, Bitcoin & quantum computing.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-border rounded-xl px-4 py-3 bg-background focus:border-primary transition-colors"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-border rounded-xl px-4 py-3 bg-background focus:border-primary transition-colors"
          />
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl py-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-medium tracking-wide"
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Submit
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

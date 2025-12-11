import sycureLogo from "@/assets/sycure-logo.png";

export function Logo() {
  return (
    <div className="flex items-center opacity-0 animate-fade-in">
      <img 
        src={sycureLogo} 
        alt="Sycure.ai - AI, Cybersecurity, Bitcoin & Quantum Insights" 
        className="h-10 md:h-12 w-auto"
      />
    </div>
  );
}

import sycureLogo from "@/assets/sycure-logo.png";

interface LogoProps {
  onClick?: () => void;
}

export function Logo({ onClick }: LogoProps) {
  return (
    <div className="flex items-center opacity-0 animate-fade-in">
      <button 
        onClick={onClick}
        className="focus:outline-none transition-transform duration-200 hover:scale-105"
        aria-label="Go to home"
      >
        <img 
          src={sycureLogo} 
          alt="Sycure.ai - AI, Cybersecurity, Bitcoin & Quantum Insights" 
          className="h-[22px] md:h-[28px] w-auto"
        />
      </button>
    </div>
  );
}

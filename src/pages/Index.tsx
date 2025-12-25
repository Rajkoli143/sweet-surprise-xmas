import { useState } from "react";
import Snowfall from "@/components/Snowfall";
import ChristmasLights from "@/components/ChristmasLights";
import GiftBox from "@/components/GiftBox";
import RomanticLetter from "@/components/RomanticLetter";

const Index = () => {
  const [phase, setPhase] = useState<1 | 2>(1);
  const [transitioning, setTransitioning] = useState(false);

  const handlePhaseComplete = () => {
    setTransitioning(true);
    setTimeout(() => {
      setPhase(2);
      setTransitioning(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-christmas-night via-background to-christmas-red/5 pointer-events-none" />

      {/* Stars background */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-christmas-cream/60 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Snow effect */}
      <Snowfall />

      {/* Christmas lights */}
      <ChristmasLights />

      {/* Main content with transition */}
      <div
        className={`
          transition-opacity duration-1000
          ${transitioning ? "opacity-0" : "opacity-100"}
        `}
      >
        {phase === 1 && <GiftBox onComplete={handlePhaseComplete} />}
        {phase === 2 && <RomanticLetter />}
      </div>

      {/* Phase 2 back button */}
      {phase === 2 && (
        <button
          onClick={() => {
            setTransitioning(true);
            setTimeout(() => {
              setPhase(1);
              setTransitioning(false);
            }, 1000);
          }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 text-muted-foreground hover:text-christmas-gold transition-colors font-elegant text-sm underline underline-offset-4"
        >
          ← Back to the gift
        </button>
      )}
    </div>
  );
};

export default Index;

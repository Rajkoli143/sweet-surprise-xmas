import { useState, useEffect } from "react";
import { Gift, Heart, Sparkles, Star } from "lucide-react";

interface GiftBoxProps {
  onComplete: () => void;
}

const messages = [
  "You are the most beautiful gift I've ever received... 💝",
  "Every moment with you feels like Christmas morning... ✨",
  "Your smile lights up my world brighter than any Christmas tree... 🎄",
  "I fall in love with you more every single day... 💕",
  "You make my heart feel warm even on the coldest winter nights... ❄️",
  "Being with you is my favorite place to be... 🏠",
  "You are my today and all of my tomorrows... 💫",
  "Merry Christmas, Madam Ji ❤️",
];

const GiftBox = ({ onComplete }: GiftBoxProps) => {
  const [messageIndex, setMessageIndex] = useState(-1);
  const [isShaking, setIsShaking] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [lidOpen, setLidOpen] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [bounceCount, setBounceCount] = useState(0);

  // Idle bounce animation
  useEffect(() => {
    if (messageIndex === -1) {
      const interval = setInterval(() => {
        setBounceCount((prev) => prev + 1);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [messageIndex]);

  const handleClick = () => {
    if (messageIndex < messages.length - 1) {
      // Shake animation
      setIsShaking(true);
      setShowParticles(true);
      
      setTimeout(() => {
        setIsShaking(false);
        setLidOpen(true);
        setIsOpened(true);
        setMessageIndex((prev) => prev + 1);
        
        // Close lid after showing message
        setTimeout(() => {
          if (messageIndex < messages.length - 2) {
            setLidOpen(false);
          }
          setShowParticles(false);
        }, 800);
      }, 600);
    }

    if (messageIndex === messages.length - 2) {
      setTimeout(() => {
        onComplete();
      }, 4000);
    }
  };

  const isFinalMessage = messageIndex === messages.length - 1;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 relative z-30">
      {/* Title */}
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="font-romantic text-4xl md:text-6xl text-christmas-gold text-shadow-warm mb-2">
          A Special Gift For You
        </h1>
        <p className="text-muted-foreground font-elegant italic">
          Click to unwrap your surprise...
        </p>
      </div>

      {/* Gift Box */}
      <div
        onClick={handleClick}
        className="relative cursor-pointer"
        style={{
          transform: isShaking 
            ? 'rotate(-5deg)' 
            : bounceCount % 2 === 0 && messageIndex === -1 
              ? 'translateY(-8px) rotate(2deg)' 
              : 'translateY(0) rotate(0deg)',
          transition: isShaking ? 'transform 0.1s' : 'transform 0.5s ease-in-out',
          animation: isShaking ? 'shake 0.5s ease-in-out' : undefined,
        }}
      >
        {/* Particle burst */}
        {showParticles && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{
                  animation: 'particle-burst 0.8s ease-out forwards',
                  animationDelay: `${i * 0.05}s`,
                  transform: `rotate(${i * 30}deg) translateY(-80px)`,
                }}
              >
                <Star className="w-4 h-4 text-christmas-gold fill-christmas-gold" />
              </div>
            ))}
          </div>
        )}

        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-2xl blur-3xl transition-all duration-500"
          style={{
            background: `radial-gradient(circle, hsl(var(--christmas-gold) / ${isOpened ? 0.4 : 0.2}) 0%, hsl(var(--christmas-red) / ${isOpened ? 0.3 : 0.15}) 50%, transparent 70%)`,
            transform: `scale(${isOpened ? 1.3 : 1})`,
          }}
        />

        {/* Gift box container */}
        <div className="relative">
          {/* Ribbon vertical */}
          <div className="absolute left-1/2 -translate-x-1/2 w-6 md:w-8 h-full bg-gradient-to-b from-christmas-gold-light via-christmas-gold to-christmas-gold-light z-10 rounded-sm shadow-lg" />
          
          {/* Ribbon horizontal */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-6 md:h-8 bg-gradient-to-r from-christmas-gold-light via-christmas-gold to-christmas-gold-light z-10 rounded-sm shadow-lg" />

          {/* Box lid */}
          <div 
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-52 md:w-72 h-8 bg-gradient-to-r from-primary via-christmas-red-light to-primary rounded-t-xl border-4 border-christmas-gold z-20 origin-bottom transition-transform duration-500"
            style={{
              transform: `translateX(-50%) rotateX(${lidOpen ? -120 : 0}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Ribbon on lid */}
            <div className="absolute left-1/2 -translate-x-1/2 w-6 md:w-8 h-full bg-gradient-to-b from-christmas-gold-light to-christmas-gold rounded-t-sm" />
          </div>

          {/* Box */}
          <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-christmas-red via-primary to-christmas-red rounded-2xl border-4 border-christmas-gold relative overflow-hidden shadow-2xl">
            {/* Box shine effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-christmas-cream/20 via-transparent to-transparent pointer-events-none"
            />
            
            {/* Sparkle decorations */}
            <Sparkles className="absolute top-4 left-4 w-6 h-6 text-christmas-gold animate-twinkle" />
            <Sparkles
              className="absolute bottom-4 right-4 w-6 h-6 text-christmas-gold animate-twinkle"
              style={{ animationDelay: "0.5s" }}
            />
            <Sparkles
              className="absolute top-4 right-4 w-4 h-4 text-christmas-gold-light animate-twinkle"
              style={{ animationDelay: "1s" }}
            />
            <Sparkles
              className="absolute bottom-4 left-4 w-4 h-4 text-christmas-gold-light animate-twinkle"
              style={{ animationDelay: "1.5s" }}
            />

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              {isOpened ? (
                <Heart
                  className={`w-16 h-16 md:w-20 md:h-20 text-christmas-gold fill-christmas-gold drop-shadow-lg ${
                    isFinalMessage ? "animate-heartbeat" : ""
                  }`}
                  style={{
                    filter: 'drop-shadow(0 0 10px hsl(var(--christmas-gold) / 0.8))',
                  }}
                />
              ) : (
                <Gift className="w-16 h-16 md:w-20 md:h-20 text-christmas-gold drop-shadow-lg" />
              )}
            </div>
          </div>

          {/* Ribbon bow */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-end gap-0 z-30">
            {/* Left loop */}
            <div 
              className="w-10 h-14 md:w-12 md:h-16 border-4 border-christmas-gold bg-gradient-to-br from-christmas-gold-light to-christmas-gold rounded-full transform -rotate-45 origin-bottom-right"
              style={{ marginRight: '-8px' }}
            />
            {/* Center knot */}
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-christmas-gold-light to-christmas-gold rounded-full z-10 shadow-lg border-2 border-christmas-gold-light" />
            {/* Right loop */}
            <div 
              className="w-10 h-14 md:w-12 md:h-16 border-4 border-christmas-gold bg-gradient-to-bl from-christmas-gold-light to-christmas-gold rounded-full transform rotate-45 origin-bottom-left"
              style={{ marginLeft: '-8px' }}
            />
          </div>
          
          {/* Ribbon tails */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-8 z-20">
            <div className="w-3 h-8 bg-gradient-to-b from-christmas-gold to-christmas-gold-light rounded-b-full transform -rotate-12" />
            <div className="w-3 h-8 bg-gradient-to-b from-christmas-gold to-christmas-gold-light rounded-b-full transform rotate-12" />
          </div>
        </div>
      </div>

      {/* Message display */}
      <div className="mt-16 h-32 flex items-center justify-center px-4">
        {messageIndex >= 0 && (
          <div
            key={messageIndex}
            className={`
              text-center
              ${isFinalMessage ? "scale-110" : ""}
            `}
            style={{
              animation: 'message-appear 0.6s ease-out forwards',
            }}
          >
            <p
              className={`
                font-romantic text-2xl md:text-4xl leading-relaxed
                ${isFinalMessage ? "text-christmas-gold text-shadow-warm" : "text-foreground"}
              `}
            >
              {messages[messageIndex]}
            </p>
          </div>
        )}
      </div>

      {/* Progress indicator */}
      <div className="mt-8 flex gap-2">
        {messages.map((_, index) => (
          <div
            key={index}
            className={`
              w-2 h-2 rounded-full transition-all duration-500
              ${index <= messageIndex ? "bg-christmas-gold scale-125 shadow-lg" : "bg-muted"}
            `}
            style={{
              boxShadow: index <= messageIndex ? '0 0 8px hsl(var(--christmas-gold))' : 'none',
            }}
          />
        ))}
      </div>

      {/* Instruction */}
      {messageIndex < messages.length - 1 && (
        <p className="mt-6 text-muted-foreground text-sm animate-pulse font-elegant">
          {messageIndex === -1 ? "✨ Tap the gift to begin... ✨" : "💝 Tap again for more... 💝"}
        </p>
      )}

      {/* Extra CSS for animations */}
      <style>{`
        @keyframes particle-burst {
          0% {
            opacity: 1;
            transform: rotate(var(--rotation)) translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: rotate(var(--rotation)) translateY(-100px) scale(0);
          }
        }
        
        @keyframes message-appear {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          50% {
            transform: translateY(-5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(-8deg) scale(1.05); }
          20% { transform: rotate(8deg) scale(1.05); }
          30% { transform: rotate(-8deg) scale(1.03); }
          40% { transform: rotate(8deg) scale(1.03); }
          50% { transform: rotate(-5deg) scale(1.02); }
          60% { transform: rotate(5deg) scale(1.02); }
          70% { transform: rotate(-3deg) scale(1.01); }
          80% { transform: rotate(3deg) scale(1.01); }
          90% { transform: rotate(-1deg); }
        }
      `}</style>
    </div>
  );
};

export default GiftBox;

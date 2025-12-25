import { useState } from "react";
import { Gift, Heart, Sparkles } from "lucide-react";

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

  const handleClick = () => {
    if (messageIndex < messages.length - 1) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setIsOpened(true);
        setMessageIndex((prev) => prev + 1);
      }, 500);
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
        className={`
          relative cursor-pointer transition-all duration-500
          ${isShaking ? "animate-shake" : "animate-float"}
          ${isOpened ? "scale-110" : "hover:scale-105"}
        `}
      >
        {/* Box glow effect */}
        <div className="absolute inset-0 bg-christmas-red/20 rounded-2xl blur-3xl animate-pulse-glow" />

        {/* Gift box container */}
        <div className="relative">
          {/* Ribbon vertical */}
          <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-christmas-gold rounded-sm z-10" />

          {/* Box */}
          <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-christmas-red to-primary rounded-2xl border-4 border-christmas-gold box-glow relative overflow-hidden">
            {/* Sparkle decorations */}
            <Sparkles className="absolute top-4 left-4 w-6 h-6 text-christmas-gold animate-twinkle" />
            <Sparkles
              className="absolute bottom-4 right-4 w-6 h-6 text-christmas-gold animate-twinkle"
              style={{ animationDelay: "0.5s" }}
            />

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              {isOpened ? (
                <Heart
                  className={`w-16 h-16 md:w-20 md:h-20 text-christmas-gold fill-christmas-gold ${
                    isFinalMessage ? "animate-heartbeat" : ""
                  }`}
                />
              ) : (
                <Gift className="w-16 h-16 md:w-20 md:h-20 text-christmas-gold" />
              )}
            </div>
          </div>

          {/* Ribbon bow */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1">
            <div className="w-10 h-10 bg-christmas-gold rounded-full transform -rotate-45 origin-bottom-right" />
            <div className="w-6 h-6 bg-christmas-gold-light rounded-full" />
            <div className="w-10 h-10 bg-christmas-gold rounded-full transform rotate-45 origin-bottom-left" />
          </div>
        </div>
      </div>

      {/* Message display */}
      <div className="mt-12 h-32 flex items-center justify-center px-4">
        {messageIndex >= 0 && (
          <div
            key={messageIndex}
            className={`
              text-center animate-fade-in-up
              ${isFinalMessage ? "scale-110" : ""}
            `}
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
              w-2 h-2 rounded-full transition-all duration-300
              ${index <= messageIndex ? "bg-christmas-gold scale-125" : "bg-muted"}
            `}
          />
        ))}
      </div>

      {/* Instruction */}
      {messageIndex < messages.length - 1 && (
        <p className="mt-6 text-muted-foreground text-sm animate-pulse">
          {messageIndex === -1 ? "Tap the gift to begin..." : "Tap again for more..."}
        </p>
      )}
    </div>
  );
};

export default GiftBox;

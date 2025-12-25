import { useEffect, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import PhotoGalleryPopup from "./PhotoGalleryPopup";

const letterContent = `Dear Madam Ji,

As I write this letter on Christmas night, my heart is overflowing with love for you. You are the most beautiful thing that has ever happened to me.

Every day with you feels like a blessing. Your laughter is my favorite sound, your smile is my favorite sight, and your love is my favorite feeling.

This Christmas, I want you to know that you are my greatest gift. Not the presents under the tree, not the lights that shine so bright - just you, being you, makes everything feel right.

You make ordinary moments feel magical. You turn simple days into beautiful memories. You are my home, my peace, my everything.

I am so grateful for every second we share together. For your patience, your kindness, your beautiful soul. You make me want to be a better person every single day.

Thank you for loving me the way you do. Thank you for being my partner, my best friend, my soulmate.

I promise to love you more with each passing day, to cherish every moment we have together, and to always be there for you.

Forever and always yours,
With all my heart and soul...

Merry Christmas, Madam Ji ❤️`;

const RomanticLetter = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < letterContent.length) {
        setDisplayedText(letterContent.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
        
        // Show photos after letter completes
        setTimeout(() => {
          setShowPhotos(true);
        }, 1500);
      }
    }, 35);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative z-30">
      {/* Background glow */}
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background to-christmas-red/10 pointer-events-none" />

      {/* Photo Gallery Popup */}
      {showPhotos && <PhotoGalleryPopup />}

      {/* Letter container */}
      <div className="relative max-w-2xl w-full">
        {/* Decorative elements */}
        <Sparkles className="absolute -top-8 left-4 w-8 h-8 text-christmas-gold animate-twinkle" />
        <Sparkles
          className="absolute -top-6 right-8 w-6 h-6 text-christmas-gold animate-twinkle"
          style={{ animationDelay: "0.7s" }}
        />
        <Heart
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-10 h-10 text-christmas-red fill-christmas-red animate-heartbeat"
        />

        {/* Letter paper */}
        <div 
          className="bg-gradient-to-br from-christmas-cream/95 to-christmas-cream/90 rounded-lg p-6 md:p-10 shadow-2xl relative overflow-hidden transition-all duration-500"
          style={{
            boxShadow: showPhotos 
              ? '0 0 30px hsl(var(--christmas-gold) / 0.4), 0 25px 50px -12px rgba(0,0,0,0.5)'
              : '0 0 20px hsl(var(--christmas-gold) / 0.3), 0 25px 50px -12px rgba(0,0,0,0.4)',
            transform: showPhotos ? 'scale(0.85)' : 'scale(1)',
          }}
        >
          {/* Paper texture overlay */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Letter content */}
          <div className="relative">
            <p className="font-romantic text-lg md:text-xl text-christmas-red/90 leading-relaxed whitespace-pre-wrap">
              {displayedText}
              {!isComplete && (
                <span className="inline-block w-0.5 h-6 bg-christmas-red ml-1 animate-typing-cursor" />
              )}
            </p>
          </div>

          {/* Bottom decorations */}
          {isComplete && (
            <div className="mt-8 flex justify-center gap-3 animate-fade-in-up">
              <Heart className="w-5 h-5 text-christmas-red fill-christmas-red animate-heartbeat" />
              <Heart
                className="w-6 h-6 text-christmas-red fill-christmas-red animate-heartbeat"
                style={{ animationDelay: "0.2s" }}
              />
              <Heart
                className="w-5 h-5 text-christmas-red fill-christmas-red animate-heartbeat"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
          )}
        </div>

        {/* Bottom corner decorations */}
        <Sparkles
          className="absolute -bottom-6 left-8 w-6 h-6 text-christmas-gold animate-twinkle"
          style={{ animationDelay: "1s" }}
        />
        <Sparkles
          className="absolute -bottom-8 right-4 w-8 h-8 text-christmas-gold animate-twinkle"
          style={{ animationDelay: "0.3s" }}
        />
      </div>

      {/* "Our memories" text when photos appear */}
      {showPhotos && (
        <div 
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 text-center animate-fade-in-up"
        >
          <h2 className="font-romantic text-3xl md:text-4xl text-christmas-gold text-shadow-warm">
            Our Beautiful Memories Together 💕
          </h2>
        </div>
      )}
    </div>
  );
};

export default RomanticLetter;

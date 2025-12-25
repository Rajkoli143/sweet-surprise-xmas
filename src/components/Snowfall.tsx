import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  slow: boolean;
}

const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = [];
    for (let i = 0; i < 60; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 8 + 8,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.6 + 0.4,
        slow: Math.random() > 0.5,
      });
    }
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className={flake.slow ? "animate-snowfall-slow" : "animate-snowfall"}
          style={{
            position: "absolute",
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            background: "radial-gradient(circle, hsl(var(--christmas-cream)) 0%, transparent 70%)",
            borderRadius: "50%",
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
            opacity: flake.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default Snowfall;

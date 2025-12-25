import { useEffect, useState } from "react";

const ChristmasLights = () => {
  const [lights, setLights] = useState<Array<{ id: number; color: string; delay: number }>>([]);

  useEffect(() => {
    const colors = ["light-red", "light-gold", "light-green", "light-blue"];
    const lightArray = [];
    for (let i = 0; i < 20; i++) {
      lightArray.push({
        id: i,
        color: colors[i % colors.length],
        delay: Math.random() * 2,
      });
    }
    setLights(lightArray);
  }, []);

  return (
    <>
      {/* Top string of lights */}
      <div className="fixed top-0 left-0 right-0 z-20 flex justify-between px-4 pt-2">
        {lights.slice(0, 10).map((light) => (
          <div key={light.id} className="flex flex-col items-center">
            <div className="w-px h-4 bg-muted-foreground/30" />
            <div
              className={`w-3 h-4 rounded-b-full ${light.color} animate-twinkle`}
              style={{ animationDelay: `${light.delay}s` }}
            />
          </div>
        ))}
      </div>

      {/* Bottom decorative lights */}
      <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-between px-4 pb-2">
        {lights.slice(10, 20).map((light) => (
          <div key={light.id} className="flex flex-col items-center">
            <div
              className={`w-3 h-4 rounded-t-full ${light.color} animate-twinkle`}
              style={{ animationDelay: `${light.delay}s` }}
            />
            <div className="w-px h-4 bg-muted-foreground/30" />
          </div>
        ))}
      </div>
    </>
  );
};

export default ChristmasLights;

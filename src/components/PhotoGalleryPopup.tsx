import { useEffect, useState } from "react";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import memory4 from "@/assets/memory-4.jpg";
import memory5 from "@/assets/memory-5.jpg";
import memory6 from "@/assets/memory-6.jpg";

interface PhotoPosition {
  id: number;
  src: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  delay: number;
  width: number;
  height: number;
}

const photos = [memory1, memory2, memory3, memory4, memory5, memory6];

const PhotoGalleryPopup = () => {
  const [photoPositions, setPhotoPositions] = useState<PhotoPosition[]>([]);
  const [visiblePhotos, setVisiblePhotos] = useState<number[]>([]);

  useEffect(() => {
    // Generate random positions for photos across the screen
    const positions: PhotoPosition[] = [
      // Top left
      { id: 0, src: photos[0], x: 5, y: 8, rotation: -12, scale: 1, delay: 0, width: 180, height: 180 },
      // Top right
      { id: 1, src: photos[1], x: 70, y: 5, rotation: 8, scale: 0.95, delay: 0.3, width: 160, height: 200 },
      // Middle left
      { id: 2, src: photos[2], x: 2, y: 45, rotation: 5, scale: 1.05, delay: 0.6, width: 200, height: 160 },
      // Middle right
      { id: 3, src: photos[3], x: 65, y: 40, rotation: -8, scale: 1, delay: 0.9, width: 175, height: 175 },
      // Bottom left
      { id: 4, src: photos[4], x: 8, y: 75, rotation: 10, scale: 0.9, delay: 1.2, width: 190, height: 150 },
      // Bottom right
      { id: 5, src: photos[5], x: 68, y: 70, rotation: -6, scale: 1, delay: 1.5, width: 155, height: 195 },
    ];
    
    setPhotoPositions(positions);

    // Stagger the appearance of photos
    positions.forEach((pos) => {
      setTimeout(() => {
        setVisiblePhotos((prev) => [...prev, pos.id]);
      }, pos.delay * 1000);
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {photoPositions.map((photo) => (
        <div
          key={photo.id}
          className={`absolute transition-all duration-700 ease-out pointer-events-auto ${
            visiblePhotos.includes(photo.id)
              ? "opacity-100 scale-100"
              : "opacity-0 scale-50"
          }`}
          style={{
            left: `${photo.x}%`,
            top: `${photo.y}%`,
            transform: `rotate(${photo.rotation}deg) scale(${photo.scale})`,
            transitionDelay: `${photo.delay}s`,
            width: `${photo.width}px`,
            maxWidth: '40vw',
          }}
        >
          {/* Photo frame */}
          <div 
            className="bg-christmas-cream p-2 md:p-3 rounded-sm shadow-2xl"
            style={{
              boxShadow: '0 10px 40px rgba(0,0,0,0.4), 0 0 20px hsl(var(--christmas-gold) / 0.3)',
            }}
          >
            <img
              src={photo.src}
              alt="Memory"
              className="w-full h-auto rounded-sm object-cover"
              style={{
                height: `${photo.height}px`,
                maxHeight: '30vh',
              }}
            />
          </div>
          
          {/* Decorative tape */}
          <div 
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-christmas-gold/40 rounded-sm"
            style={{
              transform: `translateX(-50%) rotate(${Math.random() > 0.5 ? 3 : -3}deg)`,
            }}
          />
        </div>
      ))}

      {/* Floating hearts */}
      {visiblePhotos.length === photos.length && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-christmas-red animate-float"
              style={{
                left: `${15 + i * 10}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.3}s`,
                fontSize: `${16 + Math.random() * 12}px`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoGalleryPopup;

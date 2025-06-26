import { useEffect, useRef } from 'react';
import type Hls from "hls.js";

interface Props {
  src: string;
  poster?: string;
  className?: string;
}

export default function SplitHeroVideo({ src, poster, className = '' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hlsInstance: Hls | null = null;

    const handleIntersect: IntersectionObserverCallback = async ([entry]) => {
      if (!video) return;

      if (entry.isIntersecting) {
        // → Erst hier HLS laden / src setzen
        if (src.endsWith('.m3u8') && typeof window !== 'undefined') {
          const { default: Hls } = await import('hls.js');
          if (Hls.isSupported()) {
            hlsInstance = new Hls();
            hlsInstance.loadSource(src);
            hlsInstance.attachMedia(video);
          } else {
            video.src = src;
          }
        } else {
          video.src = src;
        }

        // → Playback-Speed erst nach Metadaten setzen
        const onMeta = () => {
          video.playbackRate = 3.0;
          video.removeEventListener('loadedmetadata', onMeta);
        };
        video.addEventListener('loadedmetadata', onMeta);

        // → und dann abspielen
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const io = new IntersectionObserver(handleIntersect, { threshold: 0.3 });
    io.observe(video);

    return () => {
      io.disconnect();
      video.removeEventListener('loadedmetadata', () => {});
      hlsInstance?.destroy();
    };
  }, [src]);

  return (
    // Wrapper sorgt für 16:9-Platz bereits vor Videoladen
    <div className="w-full aspect-video overflow-hidden rounded-3xl shadow-2xl">
      <video
        ref={videoRef}
        width={1274}
        height={720}
        className={`object-cover ${className}`}
        muted
        loop
        controls
        playsInline
        preload="none"
        poster={poster}
        aria-label="Was ist ein Kolleg? – Erklärvideo"
      />
    </div>
  );
}

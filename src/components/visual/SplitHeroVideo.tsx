// src/components/visual/SplitHeroVideo.tsx
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface Props {
    src: string;
    width?: number | string;
    height?: number | string;
    poster?: string;
    className?: string;
}

export default function SplitHeroVideo({ src, width, height, poster, className = '' }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        /* HLS oder direct src ------------------------------------------------*/
        let hls: Hls | null = null;
        if (src.endsWith('.m3u8') && Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);
        } else {
            video.src = src;
        }

        /* 3×-Geschwindigkeit sobald Metadaten geladen ------------------------*/
        const setSpeed = () => (video.playbackRate = 3.0);
        video.addEventListener('loadedmetadata', setSpeed);

        /* Autoplay/Pause per Sichtbarkeit ------------------------------------*/
        const io = new IntersectionObserver(
            ([e]) => (e.isIntersecting ? video.play().catch(() => {}) : video.pause()),
            { threshold: 0.3 },
        );
        io.observe(video);

        return () => {
            io.disconnect();
            video.removeEventListener('loadedmetadata', setSpeed);
            hls?.destroy();
        };
    }, [src]);

    return (
        <video
            ref={videoRef}
            className={`w-full max-h-[200vh] object-cover ${className}`}
            muted
            loop
            controls
            playsInline
            preload="none"
            poster={poster}
            aria-label="Was ist ein Kolleg? – Erklärvideo"
        />
    );
}
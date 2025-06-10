import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function RecognitionVideoHLS() {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let hls: Hls | null = null;

        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource("/videos/kolleg-hls/anerkennung.m3u8");
            hls.attachMedia(video);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = "/videos/anerkennung-hls/anerkennung.m3u8";
        }

        video.playbackRate = 3.0;

        let isPlaying = false;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isPlaying) {
                    video.play().catch(() => {});
                    isPlaying = true;
                } else if (!entry.isIntersecting && isPlaying) {
                    video.pause();
                    isPlaying = false;
                }
            },
            { threshold: 0.6 }
        );

        observer.observe(video);
        return () => {
            observer.disconnect();
            if (hls) hls.destroy();
        };
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-lg">
            <video
                ref={videoRef}
                controls
                muted
                playsInline
                className="w-full h-auto rounded-3xl"
                aria-label="Erklärvideo zur Anerkennung des Kollegs (Streaming)"
            />
        </div>
    );
}
import { useEffect, useRef } from "react";
import Hls from "hls.js";
import gsap from "gsap";

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const SOCIALS = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "GitHub", href: "https://github.com" },
];

export default function Contact() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // HLS video (flipped vertically)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | undefined;
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
    }

    return () => hls?.destroy();
  }, []);

  // GSAP marquee
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="relative overflow-hidden bg-bg pb-8 pt-16 md:pb-12 md:pt-20">
      {/* Background video, flipped vertically */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-y-[-1] object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />

      {/* Marquee */}
      <div className="relative z-10 mb-16 overflow-hidden md:mb-24">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-5xl italic text-text-primary/90 md:text-7xl lg:text-8xl"
            >
              Building the Future •&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center px-6 text-center">
        <span className="mb-6 text-xs uppercase tracking-[0.3em] text-muted">
          Let's work together
        </span>
        <a
          href="mailto:dxruxx@gmail.com"
          className="group relative rounded-full text-base md:text-lg"
        >
          <span
            className="accent-gradient-animated absolute rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ inset: "-2px" }}
          />
          <span className="relative block rounded-full bg-text-primary px-8 py-4 text-bg transition-colors duration-300 group-hover:bg-bg group-hover:text-text-primary">
            dxruxx@gmail.com ↗
          </span>
        </a>
      </div>

      {/* Footer bar */}
      <div className="relative z-10 mx-auto mt-20 flex max-w-[1200px] flex-col items-center gap-6 px-6 md:mt-28 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-sm text-muted">Available for projects</span>
        </div>

        <div className="flex items-center gap-6">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted transition-colors duration-200 hover:text-text-primary"
            >
              {social.label}
            </a>
          ))}
        </div>

        <span className="text-xs text-muted">© 2026 Michael Smith</span>
      </div>
    </footer>
  );
}

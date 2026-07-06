import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import gsap from "gsap";

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
const ROLES = ["Creative", "Fullstack", "Founder", "Scholar"];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // HLS background video
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

  // Cycle roles every 2s
  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".name-reveal", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.1,
      }).from(
        ".blur-in",
        {
          opacity: 0,
          filter: "blur(10px)",
          y: 20,
          duration: 1,
          stagger: 0.1,
        },
        0.3
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <span className="blur-in mb-8 text-xs uppercase tracking-[0.3em] text-muted">
          Collection '26
        </span>

        <h1 className="name-reveal mb-6 font-display text-6xl italic leading-[0.9] tracking-tight text-text-primary md:text-8xl lg:text-9xl">
          Michael Smith
        </h1>

        <p className="blur-in mb-6 text-lg text-text-primary/90 md:text-xl">
          A{" "}
          <span
            key={roleIndex}
            className="inline-block animate-role-fade-in font-display italic text-text-primary"
          >
            {ROLES[roleIndex]}
          </span>{" "}
          lives in Chicago.
        </p>

        <p className="blur-in mb-12 max-w-md text-sm text-muted md:text-base">
          Designing seamless digital interactions by focusing on the unique
          nuances which bring systems to life.
        </p>

        <div className="blur-in inline-flex gap-4">
          {/* See Works */}
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#work")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative rounded-full text-sm transition-transform duration-300 hover:scale-105"
          >
            <span className="accent-gradient-animated absolute rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ inset: "-2px" }} />
            <span className="relative block rounded-full bg-text-primary px-7 py-3.5 text-bg transition-colors duration-300 group-hover:bg-bg group-hover:text-text-primary">
              See Works
            </span>
          </a>

          {/* Reach out */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative rounded-full text-sm transition-transform duration-300 hover:scale-105"
          >
            <span className="accent-gradient-animated absolute rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ inset: "-2px" }} />
            <span className="relative block rounded-full border-2 border-stroke bg-bg px-7 py-3.5 text-text-primary transition-colors duration-300 group-hover:border-transparent">
              Reach out...
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">
          Scroll
        </span>
        <div className="relative h-10 w-px overflow-hidden bg-stroke">
          <div className="accent-gradient absolute left-0 h-4 w-full animate-scroll-down" />
        </div>
      </div>
    </div>
  );
}

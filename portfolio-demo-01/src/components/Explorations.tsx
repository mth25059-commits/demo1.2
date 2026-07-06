import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=700&q=80",
];

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    if (!section || !content || !leftCol || !rightCol) return;

    const ctx = gsap.context(() => {
      // Pin the centered content
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: content,
        pinSpacing: false,
      });

      // Parallax columns
      gsap.to(leftCol, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(rightCol, {
        yPercent: -28,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const left = IMAGES.filter((_, i) => i % 2 === 0);
  const right = IMAGES.filter((_, i) => i % 2 === 1);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[300vh] bg-bg"
    >
      {/* Layer 1: Pinned center */}
      <div
        ref={contentRef}
        className="pointer-events-none relative z-10 flex h-screen flex-col items-center justify-center px-6 text-center"
      >
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            Explorations
          </span>
          <span className="h-px w-8 bg-stroke" />
        </div>
        <h2 className="text-5xl leading-tight tracking-tight text-text-primary md:text-7xl lg:text-8xl">
          Visual <span className="font-display italic">playground</span>
        </h2>
        <p className="mt-5 max-w-md text-sm text-muted md:text-base">
          Experiments, side quests, and moments of visual curiosity.
        </p>
        <a
          href="https://dribbble.com"
          target="_blank"
          rel="noreferrer"
          className="group pointer-events-auto relative mt-8 inline-flex rounded-full text-sm"
        >
          <span
            className="accent-gradient-animated absolute rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ inset: "-2px" }}
          />
          <span className="relative inline-flex items-center gap-2 rounded-full border border-stroke bg-bg px-6 py-3 text-text-primary transition-colors duration-300 group-hover:border-transparent">
            View on Dribbble ↗
          </span>
        </a>
      </div>

      {/* Layer 2: Parallax columns */}
      <div className="absolute inset-0 z-20 flex justify-center px-6">
        <div className="grid w-full max-w-[1400px] grid-cols-2 gap-12 md:gap-40">
          <div
            ref={leftColRef}
            className="flex flex-col items-end gap-16 pt-[40vh] md:gap-28"
          >
            {left.map((src, i) => (
              <button
                key={src}
                onClick={() => setLightbox(src)}
                style={{ transform: `rotate(${i % 2 === 0 ? -3 : 2}deg)` }}
                className="group aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border border-stroke bg-surface transition-transform duration-500 hover:!rotate-0 hover:scale-[1.03]"
              >
                <img
                  src={src}
                  alt="Exploration"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>

          <div
            ref={rightColRef}
            className="flex flex-col gap-16 pt-[65vh] md:gap-28"
          >
            {right.map((src, i) => (
              <button
                key={src}
                onClick={() => setLightbox(src)}
                style={{ transform: `rotate(${i % 2 === 0 ? 3 : -2}deg)` }}
                className="group aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border border-stroke bg-surface transition-transform duration-500 hover:!rotate-0 hover:scale-[1.03]"
              >
                <img
                  src={src}
                  alt="Exploration"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[9998] flex cursor-zoom-out items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
        >
          <img
            src={lightbox}
            alt="Exploration enlarged"
            className="max-h-[85vh] max-w-[85vw] rounded-2xl object-contain"
          />
        </div>
      )}
    </section>
  );
}

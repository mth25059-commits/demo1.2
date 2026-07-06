import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Resume", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent, href: string, label: string) => {
    e.preventDefault();
    setActive(label);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <nav
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNav(e, "#home", "Home")}
          className="group relative flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
        >
          <span className="accent-gradient absolute inset-0 rounded-full transition-transform duration-500 group-hover:-rotate-180" />
          <span className="absolute inset-[2px] rounded-full bg-bg" />
          <span className="relative z-10 font-display italic text-[13px] text-text-primary">
            JA
          </span>
        </a>

        {/* Divider */}
        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        {/* Nav links */}
        <div className="flex items-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNav(e, link.href, link.label)}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors duration-200 sm:px-4 sm:py-2 sm:text-sm ${
                active === link.label
                  ? "bg-stroke/50 text-text-primary"
                  : "text-muted hover:bg-stroke/50 hover:text-text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        {/* Say hi button */}
        <a
          href="#contact"
          onClick={(e) => handleNav(e, "#contact", "Resume")}
          className="group relative rounded-full"
        >
          <span className="accent-gradient-animated absolute rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ inset: "-2px" }} />
          <span className="relative inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-xs text-text-primary backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
            Say hi
            <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </span>
        </a>
      </nav>
    </div>
  );
}

import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  headingLead: string;
  headingItalic: string;
  subtext: string;
  ctaLabel?: string;
}

export default function SectionHeader({
  eyebrow,
  headingLead,
  headingItalic,
  subtext,
  ctaLabel,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            {eyebrow}
          </span>
        </div>
        <h2 className="text-4xl leading-tight tracking-tight text-text-primary md:text-5xl lg:text-6xl">
          {headingLead}{" "}
          <span className="font-display italic">{headingItalic}</span>
        </h2>
        <p className="mt-4 max-w-md text-sm text-muted md:text-base">
          {subtext}
        </p>
      </div>

      {ctaLabel && (
        <a
          href="#work"
          className="group relative hidden self-start rounded-full text-sm md:inline-flex"
        >
          <span
            className="accent-gradient-animated absolute rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ inset: "-2px" }}
          />
          <span className="relative inline-flex items-center gap-2 rounded-full border border-stroke bg-bg px-6 py-3 text-text-primary transition-colors duration-300 group-hover:border-transparent">
            {ctaLabel}
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </a>
      )}
    </motion.div>
  );
}

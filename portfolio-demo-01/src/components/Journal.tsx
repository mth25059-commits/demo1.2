import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

interface Entry {
  title: string;
  image: string;
  readTime: string;
  date: string;
}

const ENTRIES: Entry[] = [
  {
    title: "On designing with restraint",
    image:
      "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=400&q=80",
    readTime: "5 min read",
    date: "Jun 2026",
  },
  {
    title: "The quiet power of motion",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80",
    readTime: "7 min read",
    date: "May 2026",
  },
  {
    title: "Building systems that breathe",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
    readTime: "4 min read",
    date: "Apr 2026",
  },
  {
    title: "Typography as a first principle",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    readTime: "6 min read",
    date: "Mar 2026",
  },
];

export default function Journal() {
  return (
    <div className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Journal"
          headingLead="Recent"
          headingItalic="thoughts"
          subtext="Notes on design, engineering, and the craft in between."
          ctaLabel="View all"
        />

        <div className="flex flex-col gap-4">
          {ENTRIES.map((entry, i) => (
            <motion.a
              key={entry.title}
              href="#"
              onClick={(e) => e.preventDefault()}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group flex items-center gap-6 rounded-[40px] border border-stroke bg-surface/30 p-4 transition-colors duration-300 hover:bg-surface sm:rounded-full"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full sm:h-20 sm:w-20">
                <img
                  src={entry.image}
                  alt={entry.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="flex flex-1 flex-col">
                <h3 className="text-lg text-text-primary transition-colors md:text-xl">
                  {entry.title}
                </h3>
                <span className="text-xs text-muted">{entry.readTime}</span>
              </div>

              <div className="hidden shrink-0 items-center gap-6 pr-4 sm:flex">
                <span className="text-sm text-muted">{entry.date}</span>
                <span className="text-text-primary transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}

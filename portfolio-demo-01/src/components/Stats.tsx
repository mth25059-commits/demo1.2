import { motion } from "framer-motion";

const STATS = [
  { value: "20+", label: "Years Experience" },
  { value: "95+", label: "Projects Done" },
  { value: "200%", label: "Satisfied Clients" },
];

export default function Stats() {
  return (
    <div className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 md:gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex flex-col items-center text-center"
            >
              <span className="font-display text-6xl italic text-text-primary md:text-7xl lg:text-8xl">
                {stat.value}
              </span>
              <span className="mt-3 text-xs uppercase tracking-[0.3em] text-muted">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

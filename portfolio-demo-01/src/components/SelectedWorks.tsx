import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

interface Project {
  title: string;
  image: string;
  span: string;
  aspect: string;
}

const PROJECTS: Project[] = [
  {
    title: "Automotive Motion",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    span: "md:col-span-7",
    aspect: "aspect-[4/3] md:aspect-[16/10]",
  },
  {
    title: "Urban Architecture",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1000&q=80",
    span: "md:col-span-5",
    aspect: "aspect-[4/3] md:aspect-[16/10]",
  },
  {
    title: "Human Perspective",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80",
    span: "md:col-span-5",
    aspect: "aspect-[4/3] md:aspect-[16/10]",
  },
  {
    title: "Brand Identity",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80",
    span: "md:col-span-7",
    aspect: "aspect-[4/3] md:aspect-[16/10]",
  },
];

export default function SelectedWorks() {
  return (
    <div className="bg-bg py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Selected Work"
          headingLead="Featured"
          headingItalic="projects"
          subtext="A selection of projects I've worked on, from concept to launch."
          ctaLabel="View all work"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                delay: (i % 2) * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={`group relative overflow-hidden rounded-3xl border border-stroke bg-surface ${project.span} ${project.aspect}`}
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Halftone overlay */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #000 1px, transparent 1px)",
                  backgroundSize: "4px 4px",
                }}
              />

              {/* Hover veil */}
              <div className="absolute inset-0 flex items-center justify-center bg-bg/70 opacity-0 backdrop-blur-lg transition-opacity duration-500 group-hover:opacity-100">
                <div className="group/pill relative rounded-full">
                  <span
                    className="accent-gradient-animated absolute rounded-full"
                    style={{ inset: "-2px" }}
                  />
                  <span className="relative inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm text-black">
                    View —{" "}
                    <span className="font-display italic">{project.title}</span>
                  </span>
                </div>
              </div>

              {/* Corner label */}
              <div className="absolute bottom-5 left-5 z-10">
                <p className="text-sm text-white/90 drop-shadow">
                  {project.title}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

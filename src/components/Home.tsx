import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CATEGORIES, PROJECTS } from "../data";
import FallbackPlaceholder from "./FallbackPlaceholder";

interface HomeProps {
  key?: string;
  onProjectSelect: (id: string) => void;
}

export default function Home({ onProjectSelect }: HomeProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [errorProjects, setErrorProjects] = useState<Set<string>>(new Set());

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const handleImageError = (id: string) => {
    setErrorProjects(prev => new Set(prev).add(id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="px-4 md:px-5 lg:px-8 pt-20 md:pt-24 lg:pt-24 pb-6 md:pb-5 lg:pb-8 min-h-full flex flex-col"
    >
      {/* Filter */}
      <div className="flex flex-wrap gap-4 md:gap-5 lg:gap-6 mb-6 md:mb-8 lg:mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-[15px] md:text-[14px] lg:text-[16px] leading-snug font-[475] tracking-tight transition-colors ${
              activeCategory === cat
                ? "text-black dark:text-white border-b border-black dark:border-white pb-1"
                : "text-black/50 dark:text-white/50 hover:text-black/90 dark:hover:text-white/90 pb-1"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col lg:flex-row gap-4 md:gap-4 lg:gap-6 items-stretch"
        >
          {[
            filteredProjects.slice(0, Math.ceil(filteredProjects.length / 2)),
            filteredProjects.slice(Math.ceil(filteredProjects.length / 2))
          ].map((col, colIdx) => (
            <div key={colIdx} className="flex-1 flex flex-col gap-4 md:gap-4 lg:gap-6">
              {col.map((project, i) => (
                <div
                  key={project.id}
                  className={`relative group cursor-pointer rounded-xl lg:rounded-2xl overflow-hidden backdrop-blur-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col transition-colors duration-500 ${i === col.length - 1 ? 'lg:flex-1' : ''}`}
                  onClick={() => onProjectSelect(project.id)}
                >
                  <div className={`relative w-full flex flex-col ${i === col.length - 1 ? 'lg:flex-1' : ''}`}>
                    {errorProjects.has(project.id) ? (
                      <FallbackPlaceholder 
                        type="image" 
                        message="Cover failed to load"
                        className={`w-full ${i === col.length - 1 ? 'lg:h-full min-h-[300px] lg:min-h-[400px]' : 'aspect-video'}`}
                      />
                    ) : (
                      <img
                        src={project.cover}
                        alt={project.title}
                        onError={() => handleImageError(project.id)}
                        className={`w-full object-cover transition-all duration-700 group-hover:scale-105 lg:grayscale lg:group-hover:grayscale-0 ${i === col.length - 1 ? 'lg:h-full' : 'h-auto'}`}
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 md:p-5 lg:p-6">
                      <div className="flex justify-between items-baseline w-full">
                        <h3 className="text-white text-[16px] md:text-[15px] lg:text-[18px] leading-snug font-[475] tracking-tight truncate">
                          {project.title}
                        </h3>
                        <span className="text-white/80 text-[13px] md:text-[12px] lg:text-[14px] leading-snug font-normal ml-4 shrink-0">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

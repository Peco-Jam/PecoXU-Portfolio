import React, { useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CATEGORIES, PROJECTS } from "../data";
import FallbackPlaceholder from "./FallbackPlaceholder";

interface HomeProps {
  key?: string;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  onProjectSelect: (id: string) => void;
  onMount?: () => void;
}

export default function Home({ activeCategory, setActiveCategory, onProjectSelect, onMount }: HomeProps) {
  const [errorProjects, setErrorProjects] = useState<Set<string>>(new Set());

  useLayoutEffect(() => {
    if (onMount) onMount();
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const handleImageError = (id: string) => {
    setErrorProjects(prev => new Set(prev).add(id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="px-4 md:px-5 lg:px-8 pt-20 md:pt-24 lg:pt-24 pb-6 md:pb-5 lg:pb-8 min-h-full flex flex-col w-full"
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

      <motion.div 
        key={activeCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full"
      >
        {/* Desktop Layout (lg and up) */}
          <div className="hidden lg:flex flex-row gap-6 items-stretch">
            {[
              activeCategory === "All" 
                ? ['1', '4', '7', '8', '5'].map(id => filteredProjects.find(p => p.id === id)).filter(Boolean) as typeof PROJECTS
                : filteredProjects.filter((_, i) => i % 2 === 0),
              activeCategory === "All"
                ? ['2', '3', '6', '9', '10'].map(id => filteredProjects.find(p => p.id === id)).filter(Boolean) as typeof PROJECTS
                : filteredProjects.filter((_, i) => i % 2 === 1)
            ].map((col, colIdx) => (
              <div key={colIdx} className="flex-1 flex flex-col gap-6">
                {col.map((project, i) => (
                  <div
                    key={project.id}
                    className={`relative group cursor-pointer rounded-2xl overflow-hidden backdrop-blur-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col transition-colors duration-500 ${i === col.length - 1 ? 'flex-1' : ''}`}
                    onClick={() => onProjectSelect(project.id)}
                  >
                    <div className={`relative w-full flex flex-col ${i === col.length - 1 ? 'flex-1' : ''}`}>
                      {errorProjects.has(project.id) ? (
                        <FallbackPlaceholder 
                          type="image" 
                          message="Cover failed to load"
                          className={`w-full ${i === col.length - 1 ? 'flex-1 min-h-0 h-full min-h-[400px]' : (colIdx === 1 ? 'aspect-[4/3]' : 'aspect-video')}`}
                        />
                      ) : (
                        <img
                          src={project.cover}
                          alt={project.title}
                          onError={() => handleImageError(project.id)}
                          className={`w-full object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 ${i === col.length - 1 ? 'flex-1 min-h-0 h-full' : (colIdx === 1 ? 'aspect-[4/3]' : 'h-auto')}`}
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                        <div className="flex justify-between items-baseline w-full">
                          <h3 className="text-white text-[18px] leading-snug font-[475] tracking-tight truncate">
                            {project.title}
                          </h3>
                          <span className="text-white/80 text-[14px] leading-snug font-normal ml-4 shrink-0">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Mobile & Tablet Layout (below lg) */}
          <div className="flex lg:hidden flex-col gap-4 md:gap-4">
            {(activeCategory === "All" 
              ? ['1', '2', '3', '7', '4', '6', '10', '8', '9', '5'].map(id => filteredProjects.find(p => p.id === id)).filter(Boolean) as typeof PROJECTS
              : filteredProjects
            ).map((project) => (
              <div
                key={project.id}
                className="relative group cursor-pointer rounded-xl overflow-hidden backdrop-blur-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col transition-colors duration-500"
                onClick={() => onProjectSelect(project.id)}
              >
                <div className="relative w-full flex flex-col">
                  {errorProjects.has(project.id) ? (
                    <FallbackPlaceholder 
                      type="image" 
                      message="Cover failed to load"
                      className="w-full aspect-video"
                    />
                  ) : (
                    <img
                      src={project.cover}
                      alt={project.title}
                      onError={() => handleImageError(project.id)}
                      className="w-full h-auto object-cover transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 md:p-5">
                    <div className="flex justify-between items-baseline w-full">
                      <h3 className="text-white text-[16px] md:text-[15px] leading-snug font-[475] tracking-tight truncate">
                        {project.title}
                      </h3>
                      <span className="text-white/80 text-[13px] md:text-[12px] leading-snug font-normal ml-4 shrink-0">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </motion.div>
    </motion.div>
  );
}

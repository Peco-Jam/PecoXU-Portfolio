import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, Maximize2, ArrowLeft } from "lucide-react";
import { PROJECTS } from "../data";
import FallbackPlaceholder from "./FallbackPlaceholder";

interface ProjectDetailProps {
  key?: string;
  projectId: string;
  onBack: () => void;
}

export default function ProjectDetail({
  projectId,
  onBack,
}: ProjectDetailProps) {
  const project = PROJECTS.find((p) => p.id === projectId);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"work" | "info">("work");
  const [errorMedia, setErrorMedia] = useState<Set<number>>(new Set());
  const infoRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to update active tab on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id === "info-section" ? "info" : "work");
          }
        });
      },
      { threshold: 0.1, rootMargin: "-80px 0px 0px 0px" }
    );

    const infoSection = document.getElementById('info-section');
    if (infoSection) observer.observe(infoSection);
    if (workRef.current) observer.observe(workRef.current);

    return () => observer.disconnect();
  }, []);

  if (!project || !project.media) return null;

  const scrollToSection = (section: "work" | "info") => {
    if (section === "work") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById('info-section');
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  // Use media as is to respect defined order
  const sortedMedia = project.media;

  const handleMediaError = (index: number) => {
    setErrorMedia(prev => new Set(prev).add(index));
  };

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-full bg-transparent pb-6 md:pb-5 lg:pb-8 pt-20 md:pt-24 lg:pt-24 px-4 md:px-5 lg:px-8"
    >
      {/* Mobile Navigation */}
      <div className="md:hidden z-30 mb-6 bg-transparent pt-1 pb-1">
        <div className="flex flex-col gap-4">
          {/* Back Button */}
          <div className="flex items-center">
            <button 
              onClick={onBack}
              className="flex items-center gap-1 text-[16px] font-[475] tracking-tight text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white active:opacity-60 transition-none"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>

          {/* Work/Info Toggle - Refined premium style */}
          <div className="flex justify-center">
            <div className="relative inline-flex bg-zinc-100/80 dark:bg-zinc-900/50 backdrop-blur-xl p-1 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
              <div className="relative flex items-center">
                <button
                  onClick={() => scrollToSection("work")}
                  className={`relative z-10 px-6 py-1.5 rounded-full text-[12px] font-medium transition-colors duration-300 ${
                    activeTab === "work"
                      ? "text-zinc-900 dark:text-white"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                  }`}
                >
                  Work
                  {activeTab === "work" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-full shadow-sm -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
                <button
                  onClick={() => scrollToSection("info")}
                  className={`relative z-10 px-6 py-1.5 rounded-full text-[12px] font-medium transition-colors duration-300 ${
                    activeTab === "info"
                      ? "text-zinc-900 dark:text-white"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                  }`}
                >
                  Info
                  {activeTab === "info" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-full shadow-sm -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto">
        {/* Work Section */}
        <div id="work-content" ref={workRef} className="grid grid-cols-2 gap-4 md:gap-6">
          {sortedMedia.map((item, i) => {
            const isLandscape = !item.aspectRatio || (() => {
              const [w, h] = item.aspectRatio.split('/').map(Number);
              return w > h;
            })();
            
            let spanClass = isLandscape ? 'col-span-2' : 'col-span-1';
            if (item.type === 'image') {
              spanClass += ' md:col-span-1';
            }
            
            return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative group rounded-xl overflow-hidden backdrop-blur-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 transition-colors duration-500 ${spanClass}`}
            >
              {errorMedia.has(i) ? (
                <FallbackPlaceholder 
                  type={item.type as 'image' | 'video'} 
                  message={`${item.type} failed to load`}
                  className="aspect-video w-full"
                />
              ) : item.type === 'video' ? (
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: item.aspectRatio }}>
                  <video
                    src={item.url}
                    controls
                    muted
                    playsInline
                    onError={() => handleMediaError(i)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 pointer-events-none">
                    <span className="text-white text-[14px] font-[475] tracking-tight bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                      {item.title}
                    </span>
                  </div>
                </div>
              ) : (
                <div 
                  className="relative cursor-zoom-in group/img h-full"
                  onClick={() => setSelectedImage(item.url)}
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    onError={() => handleMediaError(i)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <Maximize2 className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 w-8 h-8 drop-shadow-lg" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white text-[14px] font-[475] tracking-tight bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                      {item.title}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {createPortal(
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-12 overscroll-none"
              onClick={() => setSelectedImage(null)}
            >
              <button 
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-10"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-8 h-8" strokeWidth={1.5} />
              </button>
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={selectedImage}
                alt="Zoomed view"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl relative z-0"
                referrerPolicy="no-referrer"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
}

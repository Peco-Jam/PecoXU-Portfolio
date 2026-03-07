import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import ProjectDetail from "./components/ProjectDetail";
import ProjectSidebar from "./components/ProjectSidebar";
import TopBanner from "./components/TopBanner";
import SnakeLightBackground from "./components/SnakeLightBackground";
import SkeletonScreen from "./components/SkeletonScreen";
import ErrorBoundary from "./components/ErrorBoundary";
import { X } from "lucide-react";
import { PROFILE } from "./data";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio_active_category') || "All";
    }
    return "All";
  });
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('portfolio_active_category', activeCategory);
  }, [activeCategory]);

  const leftPaneRef = useRef<HTMLDivElement>(null);
  const rightPaneRef = useRef<HTMLDivElement>(null);

  const isNameClicking = useRef(false);
  const scrollPositionRef = useRef({ rightPane: 0, leftPane: 0, window: 0, rightPaneHeight: 0, windowHeight: 0 });

  // Handle browser back/forward buttons
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#project-')) {
        setSelectedProjectId(prev => {
          if (!prev) {
            // Capture scroll position before transitioning from Home to Project
            scrollPositionRef.current = {
              rightPane: rightPaneRef.current?.scrollTop || 0,
              leftPane: leftPaneRef.current?.scrollTop || 0,
              window: window.scrollY || 0,
              rightPaneHeight: rightPaneRef.current?.scrollHeight || 0,
              windowHeight: document.documentElement.scrollHeight || 0,
            };
          }
          return hash.replace('#project-', '');
        });
      } else {
        setSelectedProjectId(null);
      }
    };

    // Initial check on load
    handlePopState();

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleProjectSelect = (id: string | null) => {
    if (id) {
      if (!selectedProjectId) {
        scrollPositionRef.current = {
          rightPane: rightPaneRef.current?.scrollTop || 0,
          leftPane: leftPaneRef.current?.scrollTop || 0,
          window: window.scrollY || 0,
          rightPaneHeight: rightPaneRef.current?.scrollHeight || 0,
          windowHeight: document.documentElement.scrollHeight || 0,
        };
      }
      window.history.pushState(null, '', `#project-${id}`);
      setSelectedProjectId(id);
    } else {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
      setSelectedProjectId(null);
    }
  };

  const scrollToLeftTop = () => {
    if (window.innerWidth >= 768) {
      leftPaneRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const infoSection = document.getElementById('info-section');
      if (infoSection) {
        const y = infoSection.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const scrollToBothTop = () => {
    if (window.innerWidth >= 768) {
      leftPaneRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      rightPaneRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Scroll to top when project changes
  useEffect(() => {
    // Simulate loading or wait for resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const minHeightTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Global protection against downloading
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.tagName === 'VIDEO') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  const handleNameClick = () => {
    if (window.innerWidth < 768 && selectedProjectId) {
      // 在手机端作品页面，点击名字直接跳转到作品信息栏
      const infoSection = document.getElementById('info-content');
      if (infoSection) {
        const y = infoSection.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top: y, behavior: 'smooth' });
        return;
      }
    }

    if (selectedProjectId) {
      // 如果在作品页面，点击名字直接回顶，不返回主页
      scrollToLeftTop();
      return;
    }

    // 如果在主页，返回主页并回顶
    isNameClicking.current = true;
    handleProjectSelect(null);
    
    requestAnimationFrame(() => {
      scrollToLeftTop();
    });
  };

  const handleHomeMount = React.useCallback(() => {
    if (isNameClicking.current) {
      isNameClicking.current = false;
      return;
    }

    if (minHeightTimeoutRef.current) {
      clearTimeout(minHeightTimeoutRef.current);
    }
    
    const content = rightPaneRef.current?.querySelector('.min-h-full') as HTMLElement;
    if (content) {
      const isDesktop = window.innerWidth >= 768;
      const requiredHeight = isDesktop 
        ? scrollPositionRef.current.rightPaneHeight 
        : scrollPositionRef.current.windowHeight;
      
      if (requiredHeight > 0) {
        content.style.minHeight = `${requiredHeight}px`;
      }
    }

    // Use a small delay to ensure layout is stable
    setTimeout(() => {
      if (window.innerWidth >= 768) {
        if (rightPaneRef.current) {
          rightPaneRef.current.scrollTop = scrollPositionRef.current.rightPane;
        }
        if (leftPaneRef.current) {
          leftPaneRef.current.scrollTop = scrollPositionRef.current.leftPane;
        }
      } else {
        window.scrollTo(0, scrollPositionRef.current.window);
      }
    }, 50);

    minHeightTimeoutRef.current = setTimeout(() => {
      const content = rightPaneRef.current?.querySelector('.min-h-full') as HTMLElement;
      if (content) {
        content.style.minHeight = '';
      }
    }, 1000);
  }, []);

  const handleProjectMount = React.useCallback(() => {
    rightPaneRef.current?.scrollTo(0, 0);
    leftPaneRef.current?.scrollTo(0, 0);
    if (window.innerWidth < 768) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#f5f5f5] dark:bg-[#050505] font-sans text-[#111] dark:text-white/90 transition-colors duration-500">
      
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100]"
          >
            <SkeletonScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== 层级 0：背景流光层 (绝对固定，不可交互) ===== */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <SnakeLightBackground />
      </div>

      {/* ===== 层级 10：网站主体内容层 ===== */}
      <div className="relative z-10 flex flex-col w-full min-h-screen">
        <TopBanner onNameClick={handleNameClick} onTopClick={scrollToBothTop} />
        
        <div className="flex flex-col-reverse md:flex-row md:h-screen w-full">
          {/* 左侧栏 (必须透明) */}
          <aside
            id="info-section"
            ref={leftPaneRef}
            className="relative w-full md:w-[45%] lg:w-[35%] xl:w-[25%] md:h-full md:overflow-y-auto border-r border-black/10 dark:border-white/10 scrollbar-hide backdrop-blur-2xl bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-500"
          >
            <ErrorBoundary name="Sidebar">
            <AnimatePresence mode="wait">
                {selectedProjectId ? (
                  <ProjectSidebar 
                    key="project-sidebar"
                    projectId={selectedProjectId} 
                    onBack={() => handleProjectSelect(null)}
                  />
                ) : (
                  <Sidebar 
                    key="main-sidebar" 
                    onAvatarClick={() => setIsAvatarModalOpen(true)}
                  />
                )}
              </AnimatePresence>
            </ErrorBoundary>
          </aside>

          {/* 右侧作品区 (改为半透明，允许背景透出) */}
          <main
            id="right-pane"
            ref={rightPaneRef}
            className="relative w-full md:flex-1 md:h-full md:overflow-y-auto scrollbar-hide bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-500"
          >
            <ErrorBoundary name="MainContent">
              <AnimatePresence mode="wait">
                {selectedProjectId ? (
                  <ProjectDetail
                    key="detail"
                    projectId={selectedProjectId}
                    onBack={() => handleProjectSelect(null)}
                    onMount={handleProjectMount}
                  />
                ) : (
                  <Home 
                    key="home" 
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    onProjectSelect={handleProjectSelect} 
                    onMount={handleHomeMount}
                  />
                )}
              </AnimatePresence>
            </ErrorBoundary>
          </main>
        </div>
      </div>
      {/* Avatar Modal */}
      <AnimatePresence>
        {isAvatarModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAvatarModalOpen(false)}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setIsAvatarModalOpen(false)}
            >
              <X className="w-8 h-8" />
            </motion.button>
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={PROFILE.avatar}
              alt={PROFILE.name}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

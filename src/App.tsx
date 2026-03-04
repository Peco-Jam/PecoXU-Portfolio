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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );

  const leftPaneRef = useRef<HTMLDivElement>(null);
  const rightPaneRef = useRef<HTMLDivElement>(null);

  const isNameClicking = useRef(false);

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

  useEffect(() => {
    // 如果是通过点击名字触发的切换，我们跳过这个全局回顶逻辑，由 handleNameClick 自己处理
    if (isNameClicking.current) {
      isNameClicking.current = false;
      return;
    }

    rightPaneRef.current?.scrollTo(0, 0);
    leftPaneRef.current?.scrollTo(0, 0);
    if (window.innerWidth < 768) {
      window.scrollTo(0, 0);
    }
  }, [selectedProjectId]);

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
    setSelectedProjectId(null);
    
    requestAnimationFrame(() => {
      scrollToLeftTop();
    });
  };

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
            className="relative w-full md:w-[45%] lg:w-[35%] xl:w-[25%] md:h-full md:overflow-y-auto border-r border-black/10 dark:border-white/10 scrollbar-hide backdrop-blur-2xl bg-[#FAFAFA] dark:bg-white/[0.03] transition-colors duration-500"
          >
            <ErrorBoundary name="Sidebar">
              <AnimatePresence mode="wait">
                {selectedProjectId ? (
                  <ProjectSidebar 
                    key="project-sidebar"
                    projectId={selectedProjectId} 
                    onBack={() => setSelectedProjectId(null)}
                  />
                ) : (
                  <Sidebar key="main-sidebar" />
                )}
              </AnimatePresence>
            </ErrorBoundary>
          </aside>

          {/* 右侧作品区 (改为半透明，允许背景透出) */}
          <main
            id="right-pane"
            ref={rightPaneRef}
            className="w-full md:flex-1 md:h-full md:overflow-y-auto scrollbar-hide bg-white/20 dark:bg-black/20 backdrop-blur-[2px] transition-colors duration-500"
          >
            <ErrorBoundary name="MainContent">
              <AnimatePresence mode="wait">
                {selectedProjectId ? (
                  <ProjectDetail
                    key="detail"
                    projectId={selectedProjectId}
                    onBack={() => setSelectedProjectId(null)}
                  />
                ) : (
                  <Home key="home" onProjectSelect={setSelectedProjectId} />
                )}
              </AnimatePresence>
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </div>
  );
}

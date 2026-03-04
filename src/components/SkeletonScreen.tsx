import React from "react";
import { motion } from "motion/react";

export default function SkeletonScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col w-full h-screen bg-[#f5f5f5] dark:bg-[#050505] transition-colors duration-500 overflow-hidden">
      <div className="relative z-10 flex flex-col w-full min-h-screen max-w-[1920px] mx-auto border-x border-black/5 dark:border-white/5">
        {/* Top Banner Skeleton */}
        <div className="fixed top-0 left-0 right-0 z-50 h-16 lg:h-24 bg-white/40 dark:bg-black/50 backdrop-blur-2xl saturate-150 border-b border-black/5 dark:border-white/10 flex justify-center">
          <div className="w-full max-w-[1920px] h-full flex items-center px-6 md:px-8 lg:px-16 border-x border-transparent">
            <div className="h-6 w-32 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
            <div className="ml-auto flex gap-4">
              <div className="h-6 w-6 bg-black/5 dark:bg-white/5 rounded-full animate-pulse" />
              <div className="h-6 w-6 bg-black/5 dark:bg-white/5 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row h-screen w-full overflow-hidden">
          {/* Sidebar Skeleton */}
          <aside className="w-full md:w-[45%] lg:w-[35%] xl:w-[25%] h-full border-r border-black/10 dark:border-white/10 px-4 pt-8 pb-6 md:px-5 md:pt-24 md:pb-5 lg:px-16 lg:pt-40 lg:pb-20 bg-[#FAFAFA] dark:bg-white/[0.03] backdrop-blur-2xl">
            <div className="w-24 h-24 md:w-20 md:h-20 lg:w-48 lg:h-48 rounded-full bg-black/5 dark:bg-white/5 animate-pulse mb-6 md:mb-4 lg:mb-12" />
            <div className="h-10 w-3/4 bg-black/5 dark:bg-white/5 rounded animate-pulse mb-2" />
            <div className="h-6 w-1/2 bg-black/5 dark:bg-white/5 rounded animate-pulse mb-12" />
            
            <div className="space-y-8 md:space-y-5 lg:space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-6 w-1/3 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-black/5 dark:bg-white/5 rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content Skeleton */}
          <main className="flex-1 h-full px-4 pt-20 pb-8 md:px-5 md:pt-24 lg:px-16 lg:pt-40 overflow-hidden bg-white/20 dark:bg-black/20 backdrop-blur-[2px]">
            {/* Filter Skeleton */}
            <div className="flex flex-wrap gap-6 mb-6 md:mb-12">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-6 w-16 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
              ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-6 md:gap-4 lg:gap-10 h-full">
              {[1, 2].map((col) => (
                <div key={col} className="flex-1 flex flex-col gap-6 md:gap-4 lg:gap-10">
                  {[1, 2].map((i) => (
                    <div key={i} className="relative aspect-[16/10] bg-black/5 dark:bg-white/5 rounded-xl overflow-hidden animate-pulse">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent flex flex-col justify-end p-[14px] md:p-[18px]">
                        <div className="flex justify-between items-baseline w-full">
                          <div className="h-6 w-32 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
                          <div className="h-4 w-16 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

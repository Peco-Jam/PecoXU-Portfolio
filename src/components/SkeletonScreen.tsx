import React from "react";

export default function SkeletonScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col w-full h-screen bg-[#f5f5f5] dark:bg-[#050505] transition-colors duration-500 overflow-hidden font-sans">
      {/* Top Banner Skeleton */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white/40 dark:bg-black/50 backdrop-blur-2xl saturate-150 z-50 border-b border-black/5 dark:border-white/10 flex items-center justify-between px-4 md:px-5 lg:px-8">
        <div className="h-6 w-32 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="h-9 w-9 bg-black/5 dark:bg-white/5 rounded-full animate-pulse" />
          <div className="h-9 w-9 bg-black/5 dark:bg-white/5 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row md:h-screen w-full">
        {/* Sidebar Skeleton */}
        <aside className="relative w-full md:w-[45%] lg:w-[35%] xl:w-[25%] md:h-full md:overflow-y-auto border-r border-black/10 dark:border-white/10 scrollbar-hide backdrop-blur-2xl bg-[#FAFAFA] dark:bg-white/[0.03] px-4 pt-8 pb-6 md:px-5 md:pt-24 md:pb-5 lg:px-8 lg:pt-24 lg:pb-8">
          {/* Profile Header */}
          <div className="mb-10 pb-10 md:mb-6 md:pb-6 lg:mb-10 lg:pb-10 border-b border-black/10 dark:border-white/10">
            <div className="w-24 h-24 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-black/5 dark:bg-white/5 animate-pulse mb-6 md:mb-4 lg:mb-6" />
            <div className="h-8 md:h-7 lg:h-10 w-32 bg-black/5 dark:bg-white/5 rounded animate-pulse mb-2" />
            <div className="h-4 w-24 bg-black/5 dark:bg-white/5 rounded animate-pulse mb-4" />
            <div className="h-4 w-20 bg-black/5 dark:bg-white/5 rounded animate-pulse mb-12 md:mb-8 lg:mb-10" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-black/5 dark:bg-white/5 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
              <div className="h-4 w-4/6 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
            </div>
          </div>

          {/* Profile Info Section */}
          <div className="mb-10 pb-10 md:mb-6 md:pb-6 lg:mb-10 lg:pb-10 border-b border-black/10 dark:border-white/10">
            <div className="h-6 w-24 bg-black/5 dark:bg-white/5 rounded animate-pulse mb-6 md:mb-4 lg:mb-6" />
            <div className="space-y-8 md:space-y-5 lg:space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="h-5 w-20 bg-black/5 dark:bg-white/5 rounded animate-pulse mb-3" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-black/5 dark:bg-white/5 rounded animate-pulse" />
                    <div className="h-4 w-3/4 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About Me */}
          <div className="mb-10 pb-10 md:mb-6 md:pb-6 lg:mb-10 lg:pb-10 border-b border-black/10 dark:border-white/10">
            <div className="h-6 w-32 bg-black/5 dark:bg-white/5 rounded animate-pulse mb-6 md:mb-4 lg:mb-6" />
            <div className="space-y-2 mb-8">
              <div className="h-4 w-full bg-black/5 dark:bg-white/5 rounded animate-pulse" />
              <div className="h-4 w-full bg-black/5 dark:bg-white/5 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 w-24 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Skeleton */}
        <main className="w-full md:flex-1 md:h-full md:overflow-y-auto scrollbar-hide bg-white/20 dark:bg-black/20 backdrop-blur-[2px] px-4 md:px-5 lg:px-8 pt-20 md:pt-24 lg:pt-24 pb-6 md:pb-5 lg:pb-8">
          {/* Filter Skeleton */}
          <div className="flex flex-wrap gap-4 md:gap-5 lg:gap-6 mb-6 md:mb-8 lg:mb-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-6 w-16 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
            ))}
          </div>

          {/* Desktop Grid (lg+) */}
          <div className="hidden lg:flex flex-row gap-6 items-stretch">
            {[1, 2].map((col) => (
              <div key={col} className="flex-1 flex flex-col gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className={`relative rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 animate-pulse ${col === 2 && i === 1 ? 'aspect-[4/3]' : 'aspect-video'}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent flex flex-col justify-end p-6">
                      <div className="flex justify-between items-baseline w-full">
                        <div className="h-6 w-32 bg-black/10 dark:bg-white/10 rounded" />
                        <div className="h-4 w-16 bg-black/10 dark:bg-white/10 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Mobile/Tablet List (below lg) */}
          <div className="flex lg:hidden flex-col gap-4 md:gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 animate-pulse aspect-video">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent flex flex-col justify-end p-4 md:p-5">
                  <div className="flex justify-between items-baseline w-full">
                    <div className="h-5 w-32 bg-black/10 dark:bg-white/10 rounded" />
                    <div className="h-4 w-16 bg-black/10 dark:bg-white/10 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

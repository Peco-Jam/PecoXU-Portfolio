import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { PROJECTS } from '../data';

interface ProjectSidebarProps {
  key?: string;
  projectId: string;
  onBack: () => void;
}

export default function ProjectSidebar({ projectId, onBack }: ProjectSidebarProps) {
  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) return null;

  // 自定义格式化函数：处理 **加粗**、换行以及蓝色圆点列表
  const renderFormattedText = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      // 检查是否以 · 开头，如果是，则渲染为蓝色圆点列表项
      const isBullet = line.trim().startsWith('·');
      const cleanLine = isBullet ? line.trim().substring(1).trim() : line;

      // 使用正则匹配 **内容**
      const parts = cleanLine.split(/(\*\*.*?\*\*)/);
      
      return (
        <div key={i} className={`mb-2 last:mb-0 flex items-start gap-2 ${isBullet ? 'pl-1' : ''}`}>
          {isBullet && (
            <span className="mt-[0.65em] w-1 h-1 rounded-full bg-black dark:bg-white shrink-0 transition-colors duration-500" />
          )}
          <div className="flex-1">
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                const content = part.slice(2, -2);
                return (
                  <strong key={j} className="font-[450] text-black dark:text-white transition-colors duration-500">
                    {content}
                  </strong>
                );
              }
              return <span key={j}>{part}</span>;
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="px-4 pt-6 pb-6 md:px-5 md:pt-24 md:pb-5 lg:px-8 lg:pt-24 lg:pb-8 text-[#111] dark:text-white/90 transition-colors duration-500"
    >
      {/* Back Button & Header */}
      <div className="mb-6 pb-6 md:mb-8 md:pb-8 lg:mb-12 lg:pb-12 border-b border-black/10 dark:border-white/10 transition-colors duration-500">
        <div className="hidden md:flex justify-start mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-1 text-[16px] font-[475] tracking-tight text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white active:opacity-60 transition-none"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
        
        <div className="flex flex-col gap-4">
          <h1 className="text-[32px] md:text-[30px] lg:text-[44px] leading-[1.1] font-[500] tracking-tighter text-black dark:text-white transition-colors duration-500 whitespace-pre-line">
            {project.title}
          </h1>
          
          {project.subtitle && (
            <p className="text-[15px] md:text-[14px] lg:text-[17px] leading-snug font-normal italic text-black/50 dark:text-white/50 transition-colors duration-500">
              {project.subtitle}
            </p>
          )}
          
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[11px] uppercase tracking-wider text-black/40 dark:text-white/40 font-medium transition-colors duration-500">Type</span>
            <span className="text-[16px] md:text-[15px] lg:text-[18px] leading-snug font-[475] italic tracking-tight text-black dark:text-white transition-colors duration-500">
              {project.category}
            </span>
          </div>
        </div>
      </div>

      {/* Project Info Section */}
      <div className="mb-10 pb-10 md:mb-6 md:pb-6 lg:mb-10 lg:pb-10 border-b border-black/10 dark:border-white/10 transition-colors duration-500">
        <h2 className="text-[18px] md:text-[20px] lg:text-[24px] leading-tight font-[500] tracking-tight mb-6 md:mb-4 lg:mb-6 text-black dark:text-white transition-colors duration-500">Details.</h2>
        
        <div className="space-y-4 md:space-y-3 lg:space-y-4 text-[14px] md:text-[13px] lg:text-[16px] leading-relaxed">
          <div className="flex justify-between items-start gap-4">
            <span className="font-[475] text-black dark:text-white shrink-0 transition-colors duration-500">Year</span>
            <span className="font-normal text-black/60 dark:text-white/60 text-right transition-colors duration-500">{project.year}</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="font-[475] text-black dark:text-white shrink-0 transition-colors duration-500">Role</span>
            <span className="font-normal text-black/60 dark:text-white/60 text-right transition-colors duration-500">{project.role}</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="font-[475] text-black dark:text-white shrink-0 transition-colors duration-500">Organization</span>
            <span className="font-normal text-black/60 dark:text-white/60 text-right transition-colors duration-500">{project.client}</span>
          </div>
        </div>
      </div>

      {/* Project Narrative Section */}
      <div className="space-y-10 md:space-y-6 lg:space-y-10">
        <div className="pb-10 md:pb-6 lg:pb-10 border-b border-black/10 dark:border-white/10 transition-colors duration-500">
          <h3 className="text-[16px] md:text-[15px] lg:text-[18px] leading-snug font-[475] tracking-tight mb-4 md:mb-3 lg:mb-4 text-black dark:text-white transition-colors duration-500">Challenge</h3>
          <div className="text-[14px] md:text-[13px] lg:text-[16px] leading-relaxed font-normal text-black/60 dark:text-white/60 text-justify transition-colors duration-500">
            {renderFormattedText(project.challenge)}
          </div>
        </div>
        <div className="pb-10 md:pb-6 lg:pb-10 border-b border-black/10 dark:border-white/10 transition-colors duration-500">
          <h3 className="text-[16px] md:text-[15px] lg:text-[18px] leading-snug font-[475] tracking-tight mb-4 md:mb-3 lg:mb-4 text-black dark:text-white transition-colors duration-500">Execution</h3>
          <div className="text-[14px] md:text-[13px] lg:text-[16px] leading-relaxed font-normal text-black/60 dark:text-white/60 text-justify transition-colors duration-500">
            {renderFormattedText(project.solution)}
          </div>
        </div>
        {project.outcome && (
          <div className="pb-10 md:pb-6 lg:pb-10 border-b border-black/10 dark:border-white/10 transition-colors duration-500">
            <h3 className="text-[16px] md:text-[15px] lg:text-[18px] leading-snug font-[475] tracking-tight mb-4 md:mb-3 lg:mb-4 text-black dark:text-white transition-colors duration-500">Impact</h3>
            <div className="text-[14px] md:text-[13px] lg:text-[16px] leading-relaxed font-normal text-black/60 dark:text-white/60 text-justify transition-colors duration-500">
              {renderFormattedText(project.outcome)}
            </div>
          </div>
        )}
      </div>

      <div className="text-[11px] md:text-[10px] lg:text-[12px] leading-relaxed font-normal text-black/40 dark:text-white/40 mt-12 md:mt-8 lg:mt-12 transition-colors duration-500">
        © {new Date().getFullYear()} <strong className="font-[475]">PECO XU.</strong> All rights reserved.
      </div>
    </motion.div>
  );
}

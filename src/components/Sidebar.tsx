import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Palette,
  Cpu,
  Layers,
  Award,
  Briefcase,
  User,
} from "lucide-react";
import { PROFILE, LOGOS } from "../data";

interface SidebarProps {
  onAvatarClick?: () => void;
}

export default function Sidebar({ onAvatarClick }: SidebarProps) {
  const [avatarError, setAvatarError] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
      transition={{ duration: 0.3 }}
      className="px-4 pt-8 pb-6 md:px-5 md:pt-24 md:pb-5 lg:px-8 lg:pt-24 lg:pb-8 text-[#111] dark:text-white/90 transition-colors duration-500"
    >
      {/* Profile Header */}
      <div className="mb-10 pb-10 md:mb-6 md:pb-6 lg:mb-10 lg:pb-10 border-b border-black/10 dark:border-white/10 transition-colors duration-500">
        <div 
          className="cursor-pointer group relative w-fit"
          onClick={onAvatarClick}
        >
          {avatarError ? (
            <div className="w-24 h-24 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6 md:mb-4 lg:mb-6 border border-black/10 dark:border-white/10">
              <User className="w-10 h-10 lg:w-10 lg:h-10 opacity-20" />
            </div>
          ) : (
            <img
              src={PROFILE.avatar}
              alt={PROFILE.name}
              onError={() => setAvatarError(true)}
              className="w-24 h-24 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover mb-6 md:mb-4 lg:mb-6 shadow-lg shadow-black/20 dark:shadow-black/50 transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/5 transition-colors duration-300 mb-6 md:mb-4 lg:mb-6" />
        </div>
        <div className="w-fit">
          <h1 className="text-[32px] md:text-[30px] lg:text-[44px] leading-[1.1] font-[500] tracking-tighter mb-1 text-black dark:text-white transition-colors duration-500">
            徐宇轩
          </h1>
          <p className="text-[12px] md:text-[11px] lg:text-[14px] italic leading-snug font-normal text-black/50 dark:text-white/50 mb-4 transition-colors duration-500">
            PECO XU
          </p>
        </div>
        <p className="text-[15px] md:text-[14px] lg:text-[17px] leading-snug font-normal text-black/50 dark:text-white/50 transition-colors duration-500">{PROFILE.title}</p>
        <p className="text-[14px] md:text-[13px] lg:text-[16px] leading-relaxed font-normal text-black/60 dark:text-white/60 mt-12 md:mt-8 lg:mt-10 text-justify transition-colors duration-500">
          从<span className="text-black dark:text-white font-[450]">杭州浙传</span>到<span className="text-black dark:text-white font-[450]">伦敦 UCL</span>，在<span className="text-black dark:text-white font-[450]">数字媒体领域</span>“打怪升级”多年，也在<span className="text-black dark:text-white font-[450]">腾讯&网易</span>死磕过 <span className="text-black dark:text-white font-[450]">S 级项目</span>——我依然是个热衷新技术的 <span className="text-black dark:text-white font-[450]">ACG 玩家</span>。正试着用<span className="text-black dark:text-white font-[450]">数字叙事</span>的专业逻辑，给内容宣发叠个“<span className="text-black dark:text-white font-[450]">有趣</span>”的 Buff。
        </p>
      </div>

      {/* Profile Info Section */}
      <div className="mb-10 pb-10 md:mb-6 md:pb-6 lg:mb-10 lg:pb-10 border-b border-black/10 dark:border-white/10 transition-colors duration-500">
        <h2 className="text-[18px] md:text-[20px] lg:text-[24px] leading-tight font-[500] tracking-tight mb-6 md:mb-4 lg:mb-6 text-black dark:text-white transition-colors duration-500">Profile.</h2>
        
        <div className="space-y-8 md:space-y-5 lg:space-y-8">
          {/* 基本信息 */}
          <div>
            <h3 className="text-[16px] md:text-[15px] lg:text-[18px] leading-snug font-[475] tracking-tight mb-4 md:mb-3 lg:mb-4 text-black dark:text-white transition-colors duration-500">基本信息</h3>
            <div className="flex flex-col gap-3 md:gap-2 lg:gap-3 text-[14px] md:text-[13px] lg:text-[16px] leading-relaxed">
              <div className="flex justify-between items-start gap-4"><span className="font-[475] text-black dark:text-white shrink-0 transition-colors duration-500">生日</span> <span className="font-normal text-black/60 dark:text-white/60 text-right transition-colors duration-500">{PROFILE.birthday}</span></div>
              <div className="flex justify-between items-start gap-4"><span className="font-[475] text-black dark:text-white shrink-0 transition-colors duration-500">所在地</span> <span className="font-normal text-black/60 dark:text-white/60 text-right transition-colors duration-500">{PROFILE.location}</span></div>
            </div>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="text-[16px] md:text-[15px] lg:text-[18px] leading-snug font-[475] tracking-tight mb-4 md:mb-3 lg:mb-4 text-black dark:text-white transition-colors duration-500">联系方式</h3>
            <div className="flex flex-col gap-1.5 md:gap-1 lg:gap-1.5 text-[14px] md:text-[13px] lg:text-[16px] leading-relaxed">
              <div className="flex justify-between items-start gap-4"><span className="font-[475] text-black dark:text-white shrink-0 transition-colors duration-500">电话</span> <span className="font-normal text-black/60 dark:text-white/60 text-right break-all transition-colors duration-500">{PROFILE.phone}</span></div>
              <div className="flex justify-between items-start gap-4"><span className="font-[475] text-black dark:text-white shrink-0 transition-colors duration-500">邮箱</span> <span className="font-normal text-black/60 dark:text-white/60 text-right break-all transition-colors duration-500">{PROFILE.email}</span></div>
            </div>
          </div>

          {/* 教育经历 */}
          <div>
            <h3 className="text-[16px] md:text-[15px] lg:text-[18px] leading-snug font-[475] tracking-tight mb-4 md:mb-3 lg:mb-4 text-black dark:text-white transition-colors duration-500">教育经历</h3>
            <div className="flex flex-col gap-4 md:gap-3 lg:gap-4 text-[14px] md:text-[13px] lg:text-[16px] leading-relaxed">
              {PROFILE.education.map((edu, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex justify-between items-start gap-4">
                    <span className="font-[475] text-black dark:text-white shrink-0 transition-colors duration-500">{edu.school}</span>
                    <span className="font-normal text-black/60 dark:text-white/60 text-right transition-colors duration-500">{edu.degree}</span>
                  </div>
                  <span className="font-normal text-black/60 dark:text-white/60 transition-colors duration-500">{edu.major}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* About Me */}
      <div className="mb-10 pb-10 md:mb-6 md:pb-6 lg:mb-10 lg:pb-10 border-b border-black/10 dark:border-white/10 transition-colors duration-500">
        <h2 className="text-[18px] md:text-[20px] lg:text-[24px] leading-tight font-[500] tracking-tight mb-6 md:mb-4 lg:mb-6 text-black dark:text-white transition-colors duration-500">
          About Me.
        </h2>
        <p className="text-[14px] md:text-[13px] lg:text-[16px] leading-relaxed font-normal text-black/60 dark:text-white/60 mb-8 md:mb-5 lg:mb-8 text-justify break-words [text-wrap:pretty] transition-colors duration-500">
          {PROFILE.bio}
        </p>
        
        {/* Highlights */}
        <div className="space-y-1.5 md:space-y-1 lg:space-y-1.5">
          {PROFILE.aboutHighlights.map((item, i) => (
            <div key={i} className="flex justify-between items-start gap-4 text-[13px] md:text-[12px] lg:text-[15px] leading-relaxed">
              <div className="flex items-center gap-2 lg:gap-2 shrink-0">
                <span className="font-[475] text-black dark:text-white whitespace-nowrap transition-colors duration-500">{item.company}</span>
                <span className="text-black/40 dark:text-white/40 transition-colors duration-500">·</span>
                <span className="font-normal text-black/60 dark:text-white/60 whitespace-nowrap transition-colors duration-500">{item.role}</span>
              </div>
              <span className="font-normal text-black/50 dark:text-white/50 text-right transition-colors duration-500">{item.description}</span>
            </div>
          ))}
        </div>

        {/* Logo Carousel */}
        <div 
          className="mt-12 lg:mt-12 overflow-hidden relative w-full" 
          style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
          <div className="flex w-max animate-marquee items-center">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div key={i} className="flex-shrink-0 mx-4 md:mx-6 lg:mx-8">
                <img 
                  src={logo.url} 
                  alt={logo.name} 
                  className="h-6 md:h-7 lg:h-8 w-auto object-contain opacity-60 dark:invert transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="mb-10 pb-10 md:mb-6 md:pb-6 lg:mb-10 lg:pb-10 border-b border-black/10 dark:border-white/10 transition-colors duration-500">
        <h2 className="text-[18px] md:text-[20px] lg:text-[24px] leading-tight font-[500] tracking-tight mb-6 md:mb-4 lg:mb-6 text-black dark:text-white transition-colors duration-500">
          Capabilities.
        </h2>
        <div className="space-y-6 md:space-y-4 lg:space-y-6">
          {PROFILE.capabilities.map((cap, i) => (
            <div key={i}>
              <h3 className="text-[16px] md:text-[15px] lg:text-[18px] leading-snug font-[475] tracking-tight mb-2 lg:mb-2 flex items-center gap-2 lg:gap-2 text-black dark:text-white transition-colors duration-500">
                {i === 0 && <Palette className="w-4 h-4 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-black/50 dark:text-white/50 transition-colors duration-500" />}
                {i === 1 && <Cpu className="w-4 h-4 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-black/50 dark:text-white/50 transition-colors duration-500" />}
                {i === 2 && <Layers className="w-4 h-4 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-black/50 dark:text-white/50 transition-colors duration-500" />}
                {cap.category}
              </h3>
              <ul className="text-[14px] md:text-[13px] lg:text-[16px] leading-relaxed font-normal text-black/60 dark:text-white/60 space-y-1 lg:space-y-1 pl-6 md:pl-5 lg:pl-6 list-disc marker:text-black dark:marker:text-white transition-colors duration-500">
                {cap.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-10 pb-10 md:mb-6 md:pb-6 lg:mb-10 lg:pb-10 border-b border-black/10 dark:border-white/10 transition-colors duration-500">
        <h2 className="text-[18px] md:text-[20px] lg:text-[24px] leading-tight font-[500] tracking-tight mb-6 md:mb-4 lg:mb-6 text-black dark:text-white transition-colors duration-500">
          Stack.
        </h2>
        {/* 控制 Stack 区域左右位置的代码位于下方的 grid-cols 定义中：xl:grid-cols-[220px_1fr] */}
        {/* 其中 220px 决定了第一列的宽度，从而控制第二列（右侧部分）的左对齐位置 */}
        <div className="grid grid-cols-1 xl:grid-cols-[253px_1fr] gap-x-4 gap-y-6 md:gap-y-4 lg:gap-y-6">
          {PROFILE.techStack.map((tech) => {
            let orderClass = '';
            if (tech.name === 'Photoshop') orderClass = 'order-1';
            else if (tech.name === 'After Effects') orderClass = 'order-2';
            else if (tech.name === 'Blender') orderClass = 'order-3';
            else if (tech.name === 'Unreal Engine 5') orderClass = 'order-4';
            else if (tech.name === 'Gemini') orderClass = 'order-5';
            else if (tech.name === 'ComfyUI') orderClass = 'order-6';

            return (
              <div key={tech.name} className={`flex items-center gap-3 md:gap-2.5 lg:gap-3 ${orderClass}`}>
                <div className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8 flex items-center justify-center shrink-0">
                  <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className={`object-contain rounded-[4px] lg:rounded-[4px] w-full h-full ${tech.name === 'Unreal Engine 5' ? 'dark:invert' : ''} transition-all duration-500`}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[16px] md:text-[15px] lg:text-[18px] leading-snug font-[475] tracking-tight text-black dark:text-white truncate transition-colors duration-500">{tech.name}</div>
                  <div className="text-[13px] md:text-[12px] lg:text-[15px] leading-relaxed font-normal text-black/60 dark:text-white/60 truncate transition-colors duration-500">{tech.usage}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8 md:mt-5 lg:mt-8 text-[13px] md:text-[12px] lg:text-[15px] leading-relaxed font-normal text-black/40 dark:text-white/40 opacity-65 transition-colors duration-500">
          and more ...
        </div>
      </div>

      {/* Experience & Awards */}
      <div className="mb-12 md:mb-8 lg:mb-12">
        <h2 className="text-[18px] md:text-[20px] lg:text-[24px] leading-tight font-[500] tracking-tight mb-6 md:mb-4 lg:mb-6 text-black dark:text-white transition-colors duration-500">
          Experience & Awards.
        </h2>
        <div className="space-y-8 md:space-y-5 lg:space-y-8">
          <div>
            <h3 className="text-[16px] md:text-[15px] lg:text-[18px] leading-snug font-[475] tracking-tight mb-4 md:mb-3 lg:mb-4 flex items-center gap-2 lg:gap-2 text-black dark:text-white transition-colors duration-500">
              <Briefcase className="w-4 h-4 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-black/50 dark:text-white/50 transition-colors duration-500" /> Experience
            </h3>
            <div className="space-y-10 md:space-y-7 lg:space-y-10 pl-6 md:pl-5 lg:pl-6 border-l border-black/10 dark:border-white/10 transition-colors duration-500">
              {PROFILE.experience.map((exp, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[27px] md:-left-[23px] lg:-left-[27px] top-[0.65em] w-1.5 h-1.5 rounded-full bg-black dark:bg-white transition-colors duration-500"></div>
                  <div className="text-[14px] md:text-[13px] lg:text-[16px] leading-snug font-[475] text-black dark:text-white mb-2 md:mb-1 lg:mb-2 transition-colors duration-500">
                    <span>{exp.role}</span>
                    <span className="mx-1.5 text-black/40 dark:text-white/40 font-normal">·</span>
                    <span className="text-black/60 dark:text-white/60 font-normal">{exp.company}</span>
                    <span className="mx-1.5 text-black/40 dark:text-white/40 font-normal">·</span>
                    <span className="text-black/60 dark:text-white/60 font-normal whitespace-nowrap transition-colors duration-500">{exp.year}</span>
                  </div>
                  {/* @ts-ignore */}
                  {exp.description && (
                    <p className="text-[13px] md:text-[12px] lg:text-[15px] leading-relaxed font-normal text-black/60 dark:text-white/60 text-justify break-words [text-wrap:pretty] transition-colors duration-500">
                      {/* @ts-ignore */}
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[16px] md:text-[15px] lg:text-[18px] leading-snug font-[475] tracking-tight mb-4 md:mb-3 lg:mb-4 flex items-center gap-2 lg:gap-2 text-black dark:text-white transition-colors duration-500">
              <Award className="w-4 h-4 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-black/50 dark:text-white/50 transition-colors duration-500" /> Awards
            </h3>
            <div className="space-y-4 md:space-y-3 lg:space-y-4 pl-6 md:pl-5 lg:pl-6 border-l border-black/10 dark:border-white/10 transition-colors duration-500">
              {PROFILE.awards.map((award, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[27px] md:-left-[23px] lg:-left-[27px] top-[0.65em] w-1.5 h-1.5 rounded-full bg-black dark:bg-white transition-colors duration-500"></div>
                  <div className="text-[14px] md:text-[13px] lg:text-[16px] leading-snug font-[475] text-black dark:text-white transition-colors duration-500">
                    <span>{award.title}</span>
                    <span className="mx-1.5 text-black/40 dark:text-white/40 font-normal">·</span>
                    <span className="text-black/60 dark:text-white/60 font-normal transition-colors duration-500">{award.event}</span>
                    <span className="mx-1.5 text-black/40 dark:text-white/40 font-normal">·</span>
                    <span className="text-black/60 dark:text-white/60 font-normal whitespace-nowrap transition-colors duration-500">{award.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-[11px] md:text-[10px] lg:text-[12px] leading-relaxed font-normal text-black/40 dark:text-white/40 mt-6 md:mt-8 lg:mt-12 transition-colors duration-500 flex flex-col gap-1.5">
        <div>
          © 2026 <strong className="font-[475]">PECO XU</strong>. All Rights Reserved.<br />
          Powered by Gemini 3.1 via Google AI Studio.
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a href="https://beian.mps.gov.cn/#/query/webSearch?code=51019002009132" rel="noreferrer" target="_blank" className="flex items-center gap-1 hover:text-black/60 dark:hover:text-white/60 transition-colors">
            <img src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png" alt="公安备案图标" className="w-3.5 h-3.5 object-contain" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = 'https://www.beian.gov.cn/img/ghs.png'; e.currentTarget.onerror = () => e.currentTarget.style.display = 'none'; }} />
            川公网安备51019002009132号
          </a>
          <a href="https://beian.miit.gov.cn/" rel="noreferrer" target="_blank" className="hover:text-black/60 dark:hover:text-white/60 transition-colors">
            蜀ICP备2026009415号-1
          </a>
        </div>
      </div>
    </motion.div>
  );
}

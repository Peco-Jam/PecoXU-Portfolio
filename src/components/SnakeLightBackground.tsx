import React from "react";
import { motion } from "motion/react";

export default function SnakeLightBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#f8f8f8] dark:bg-[#030303] transition-colors duration-1000">
      
      {/* 核心液态光影层 */}
      <div className="absolute inset-0 filter blur-[120px] md:blur-[160px] opacity-60 dark:opacity-40">
        
        {/* 动态色块 1: 顶部左侧 - 柔和深灰/浅白 */}
        <motion.div
          animate={{
            x: ["-10%", "10%", "-10%"],
            y: ["-5%", "15%", "-5%"],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-black/[0.05] dark:bg-white/[0.08]"
        />

        {/* 动态色块 2: 中间右侧 - 极淡灰色 */}
        <motion.div
          animate={{
            x: ["10%", "-10%", "10%"],
            y: ["20%", "40%", "20%"],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[10%] -right-[15%] w-[80%] h-[80%] rounded-full bg-black/[0.03] dark:bg-white/[0.05]"
        />

        {/* 动态色块 3: 底部中心 - 宽广的光晕 */}
        <motion.div
          animate={{
            y: ["10%", "-10%", "10%"],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[30%] left-[10%] w-[100%] h-[60%] rounded-[100%] bg-black/[0.04] dark:bg-white/[0.06]"
        />
      </div>

      {/* 装饰性微光：增加层次感 */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-black/[0.01] to-transparent dark:via-white/[0.01]" />
      </div>

      {/* 细腻噪点层：消除色彩断层，增加高级感 */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

import React from 'react';
import { AlertCircle, Image as ImageIcon, Video as VideoIcon, FileText } from 'lucide-react';

interface FallbackPlaceholderProps {
  type?: 'image' | 'video' | 'text' | 'component';
  message?: string;
  className?: string;
}

export default function FallbackPlaceholder({ 
  type = 'component', 
  message = 'Content unavailable',
  className = ''
}: FallbackPlaceholderProps) {
  const getIcon = () => {
    switch (type) {
      case 'image': return <ImageIcon className="w-8 h-8 opacity-20" />;
      case 'video': return <VideoIcon className="w-8 h-8 opacity-20" />;
      case 'text': return <FileText className="w-8 h-8 opacity-20" />;
      default: return <AlertCircle className="w-8 h-8 opacity-20" />;
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center bg-black/5 dark:bg-white/5 border border-dashed border-black/10 dark:border-white/10 rounded-xl p-8 text-center transition-colors duration-500 ${className}`}>
      <div className="mb-3">
        {getIcon()}
      </div>
      <p className="text-[12px] font-[475] tracking-tight text-black/40 dark:text-white/40 uppercase">
        {message}
      </p>
    </div>
  );
}

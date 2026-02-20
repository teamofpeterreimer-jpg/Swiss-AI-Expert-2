import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      onClick={() => setIsOpen(!isOpen)}
      className="relative group rounded-2xl transition-all duration-500 hover:scale-[1.02] h-[400px] cursor-pointer overflow-hidden"
    >
      
      {/* 1. Default Background (Static) - Disappears on hover AND on open to reveal the gradient below */}
      {/* Added group-hover:opacity-0 to ensure the static border doesn't block the animated one on hover */}
      <div className={`absolute inset-0 bg-slate-900/80 border border-slate-800 rounded-2xl transition-opacity duration-500 z-0 ${isOpen ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}`}></div>

      {/* 2. Hover/Active Background (Animated Gradient Border) */}
      {/* Shows on hover via group-hover:opacity-100 and persists when isOpen */}
      <div className={`absolute inset-0 rounded-2xl p-[2px] transition-all duration-500 -z-10 bg-gradient-to-r from-swiss-red via-blue-600 to-swiss-red bg-[length:200%_auto] animate-gradient-x ${isOpen ? 'opacity-100 shadow-[0_0_40px_rgba(239,68,68,0.2)]' : 'opacity-0 group-hover:opacity-100 shadow-[0_0_30px_rgba(59,130,246,0.15)]'}`}>
        <div className="h-full w-full bg-slate-900/95 rounded-[14px] backface-hidden"></div>
      </div>
      
      {/* Content Wrapper - Centers content vertically initially */}
      <div className="relative z-10 p-8 h-full flex flex-col items-center justify-center text-center w-full">
        
        {/* Animated Container for Icon and Title */}
        <div className={`flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? '-translate-y-16 scale-90' : 'translate-y-0 scale-100'}`}>
            
            {/* Holographic Icon Container */}
            <div className="relative w-24 h-24 flex items-center justify-center mb-6">
                {/* Outer Ring */}
                <div className="absolute inset-0 border-[1px] border-blue-500/30 rounded-full animate-[spin_8s_linear_infinite] border-t-blue-400 border-l-transparent group-hover:border-blue-400/80 transition-colors"></div>
                
                {/* Inner Ring */}
                <div className="absolute inset-3 border-[1px] border-swiss-red/30 rounded-full animate-[spin_5s_linear_infinite_reverse] border-b-swiss-red border-r-transparent group-hover:border-swiss-red/80 transition-colors"></div>
                
                {/* Core Glow */}
                <div className={`absolute inset-0 bg-blue-500/10 blur-xl rounded-full transition-all duration-500 ${isOpen ? 'bg-blue-500/30 scale-110' : 'group-hover:bg-blue-500/20'}`}></div>

                {/* The Icon */}
                <div className={`relative z-10 text-white transition-colors drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] ${isOpen ? 'text-blue-200' : 'group-hover:text-blue-100'}`}>
                     {/* Scale icon wrapper slightly */}
                     <div className="transform scale-125">
                        {icon}
                     </div>
                </div>
            </div>

            <h3 className={`text-2xl font-bold text-white transition-all duration-500 ${isOpen ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200' : 'group-hover:text-blue-100'}`}>
                {title}
            </h3>
        </div>
        
        {/* Description Text - Reveals from bottom */}
        <div 
            className={`absolute bottom-0 left-0 w-full px-8 pb-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
        >
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-swiss-red to-transparent mx-auto mb-6 opacity-50"></div>
            <p className="text-gray-300 leading-relaxed text-base">
            {description}
            </p>
        </div>

        {/* Click Hint (Arrow) - Disappears when open */}
        <div className={`absolute bottom-8 text-gray-500 text-sm font-medium transition-all duration-300 flex flex-col items-center gap-2 ${isOpen ? 'opacity-0 translate-y-4' : 'opacity-60 group-hover:opacity-100 animate-pulse'}`}>
            <span>Mehr erfahren</span>
            <ArrowDown size={16} />
        </div>

      </div>
    </div>
  );
};

export default ServiceCard;
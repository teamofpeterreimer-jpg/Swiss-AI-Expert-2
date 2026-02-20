import React from 'react';

interface HologramIconProps {
  icon: React.ElementType;
  value: string;
  label: string;
  onClick?: () => void;
  description?: string;
  linkTo?: string;
}

const HologramIcon: React.FC<HologramIconProps> = ({ icon: Icon, value, label, onClick, description, linkTo }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative group h-48 p-4 flex flex-col items-center justify-center rounded-xl transition-all duration-500 z-10 ${onClick ? 'cursor-pointer hover:scale-105' : 'cursor-default'}`}
    >
      
      {/* 1. Default Background (Static) - Disappears on hover */}
      <div className="absolute inset-0 bg-slate-800/40 border border-slate-700/50 rounded-xl transition-opacity duration-300 -z-20 group-hover:opacity-0"></div>

      {/* 2. Hover/Active Background (Animated Gradient Border) */}
      <div className="absolute inset-0 rounded-xl p-[2px] transition-opacity duration-300 -z-10 bg-gradient-to-r from-swiss-red via-blue-600 to-swiss-red bg-[length:200%_auto] animate-gradient-x shadow-[0_0_20px_rgba(239,68,68,0.3)] opacity-0 group-hover:opacity-100">
        <div className="h-full w-full bg-slate-900/95 rounded-[10px] backface-hidden"></div>
      </div>
      
      {/* Content Container */}
      <div className="flex flex-col items-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        
        {/* Holographic Container */}
        <div className="relative w-16 h-16 flex items-center justify-center mb-3">
          {/* Outer Ring (Blue) */}
          <div className="absolute inset-0 border-[1px] border-blue-500/30 rounded-full animate-[spin_4s_linear_infinite] border-t-blue-400 border-l-transparent group-hover:border-blue-400/80 transition-colors"></div>
          
          {/* Inner Ring (Red) */}
          <div className="absolute inset-2 border-[1px] border-swiss-red/30 rounded-full animate-[spin_3s_linear_infinite_reverse] border-b-swiss-red border-r-transparent group-hover:border-swiss-red/80 transition-colors"></div>
          
          {/* Core Glow */}
          <div className="absolute inset-0 bg-blue-500/5 blur-xl rounded-full group-hover:bg-blue-500/20 transition-colors"></div>
          
          {/* The Icon itself */}
          <Icon 
            size={28} 
            className="relative z-10 text-white drop-shadow-[0_0_5px_rgba(59,130,246,0.8)] group-hover:text-blue-100 transition-colors" 
          />
          
          {/* Scanning Line Animation */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent translate-y-[-100%] animate-[float_3s_ease-in-out_infinite] pointer-events-none"></div>
        </div>
        
        {/* Text Content */}
        <div className="text-center z-10 relative">
          <span className="block text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 transition-all">{value}</span>
          <span className="text-xs text-blue-200/60 uppercase tracking-widest font-medium group-hover:text-blue-200 transition-colors">{label}</span>
          
           {/* Description Tooltip on Hover */}
           {description && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 p-3 bg-slate-900/95 border border-slate-700 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
              <p className="text-[10px] text-gray-300 leading-normal">{description}</p>
            </div>
          )}
        </div>

      </div>

      {/* Click Hint (only visible if onclick exists) */}
      {onClick && (
        <div className="absolute bottom-4 opacity-0 transition-all duration-300 text-[10px] text-swiss-red group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 font-medium tracking-wide">
          DETAILS ANSEHEN
        </div>
      )}

    </div>
  );
};

export default HologramIcon;

import React from 'react';

interface Props {
  onNavClick: (id: string) => void;
}

const Header: React.FC<Props> = ({ onNavClick }) => {
  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20 items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-glow-emerald transition-transform group-hover:scale-110">
              <i className="fas fa-eye text-white text-xl sm:text-2xl eye-pulse"></i>
              <div className="absolute -inset-1 bg-emerald-500/20 rounded-2xl blur-lg animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-black tracking-tighter leading-none italic">
                AI<span className="text-emerald-400">-</span>INDUCTION
              </span>
              <span className="text-[9px] sm:text-[10px] text-emerald-500/80 font-bold tracking-[0.25em] uppercase">
                Vision Sensing Tech
              </span>
            </div>
          </div>
          
          <div className="hidden lg:flex space-x-10 text-[11px] font-black uppercase tracking-widest text-slate-400">
            <button onClick={() => onNavClick('technology')} className="hover:text-emerald-400 transition-colors">Technology</button>
            <button onClick={() => onNavClick('comparison')} className="hover:text-emerald-400 transition-colors">Comparison</button>
            <button onClick={() => onNavClick('simulation')} className="text-emerald-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              Live Simulation
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
             <div className="hidden sm:flex flex-col items-end">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Status: Active</span>
                <span className="text-[11px] text-emerald-400 font-mono font-black">NO BLIND AI</span>
             </div>
             <button className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 active:scale-90 transition-transform">
                <i className="fas fa-bars text-slate-400"></i>
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

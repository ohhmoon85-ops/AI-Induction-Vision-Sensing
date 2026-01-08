
import React from 'react';

interface Props {
  onNavClick: (id: string) => void;
}

const Header: React.FC<Props> = ({ onNavClick }) => {
  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
              <i className="fas fa-eye text-white text-xl animate-pulse"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tighter leading-none">AI-INDUCTION</span>
              <span className="text-[10px] text-emerald-400 font-bold tracking-[0.2em]">VISION SENSING</span>
            </div>
          </div>
          
          <div className="hidden lg:flex space-x-10 text-sm font-bold text-slate-400">
            <button onClick={() => onNavClick('technology')} className="hover:text-white transition-colors flex flex-col items-center group">
              Technology
              <span className="w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full mt-1"></span>
            </button>
            <button onClick={() => onNavClick('comparison')} className="hover:text-white transition-colors flex flex-col items-center group">
              Comparison
              <span className="w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full mt-1"></span>
            </button>
            <button onClick={() => onNavClick('simulation')} className="hover:text-white transition-colors flex flex-col items-center group text-emerald-400">
              Live Simulation
              <span className="w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full mt-1"></span>
            </button>
          </div>

          <div className="flex items-center gap-3">
             <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Eye of Kitchen</span>
                <span className="text-xs text-emerald-400 font-mono">NO MORE BLIND AI</span>
             </div>
             <button className="lg:hidden bg-white/5 p-2 rounded-lg border border-white/10">
                <i className="fas fa-bars text-slate-400"></i>
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;


import React, { useState } from 'react';

interface Props {
  onNavClick: (id: string) => void;
}

const Header: React.FC<Props> = ({ onNavClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNav = (id: string) => {
    onNavClick(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20 items-center">
          {/* Logo Section */}
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
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
            <button onClick={() => onNavClick('technology')} className="hover:text-emerald-400 transition-colors">Technology</button>
            <button onClick={() => onNavClick('comparison')} className="hover:text-emerald-400 transition-colors">Comparison</button>
            <button onClick={() => onNavClick('simulation')} className="hover:text-emerald-400 transition-colors">Live Simulation</button>
          </div>

          {/* Status & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-4">
             <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Status: Active</span>
                <span className="text-[11px] text-emerald-400 font-mono font-black">NO BLIND AI</span>
             </div>
             
             {/* Hamburger Menu Button */}
             <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 active:scale-90 transition-transform relative z-[60]"
             >
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-slate-400 transition-all duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}></i>
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[55] lg:hidden transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-slate-950/90 backdrop-blur-xl transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        ></div>
        
        {/* Menu Content */}
        <div className={`absolute right-0 top-0 h-full w-[280px] bg-slate-900 border-l border-white/10 p-8 pt-24 flex flex-col gap-8 transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col gap-6">
            <button onClick={() => handleNav('technology')} className="text-left text-lg font-black tracking-widest text-slate-300 hover:text-emerald-400">TECHNOLOGY</button>
            <button onClick={() => handleNav('comparison')} className="text-left text-lg font-black tracking-widest text-slate-300 hover:text-emerald-400">COMPARISON</button>
            <button onClick={() => handleNav('simulation')} className="text-left text-lg font-black tracking-widest text-slate-300 hover:text-emerald-400">LIVE SIMULATION</button>
          </div>
          
          <div className="mt-auto">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="block text-[10px] text-slate-500 font-black uppercase mb-1">System status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-mono font-bold text-emerald-400">ALL SYSTEMS GO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

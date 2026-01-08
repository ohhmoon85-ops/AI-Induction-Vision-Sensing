
import React, { useState } from 'react';
import Header from './components/Header';
import ComparisonTable from './components/ComparisonTable';
import CookingSimulation from './components/CookingSimulation';
import AutonomousPanel from './components/AutonomousPanel';
import { RECIPES, Recipe } from './types';

const App: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(RECIPES[0]);
  const [isSimulating, setIsSimulating] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-[#020617] text-slate-200">
      <Header onNavClick={scrollToSection} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-12 space-y-16 lg:space-y-32">
        {/* Intro */}
        <section id="technology" className="text-center space-y-6 pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] sm:text-xs font-black tracking-widest uppercase">
             <i className="fas fa-eye"></i> Ground Truth Real-time Sensing
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] px-2">
            안대를 벗은 인덕션,<br/>
            <span className="gradient-text">진정한 AI를 만나다.</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-lg font-medium leading-relaxed px-4">
            삼성·LG가 추측(Blind)할 때, AI-Induction은 직접 봅니다(Vision).<br className="hidden sm:block"/>
            특허받은 실측 기술로 완성하는 맛과 안전의 압도적 차이.
          </p>
        </section>

        {/* Live Simulation */}
        <section id="simulation" className="scroll-mt-24 space-y-8">
          <div className="glass p-6 sm:p-8 rounded-[2rem] border border-white/5 flex flex-col lg:flex-row gap-6 items-center shadow-2xl">
             <div className="flex-1 w-full space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-widest">
                   <span className="w-8 h-px bg-emerald-500/30"></span> Simulation Scenarios
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {RECIPES.map(recipe => (
                    <button
                      key={recipe.id}
                      onClick={() => { setSelectedRecipe(recipe); setIsSimulating(false); }}
                      className={`group p-3 sm:p-4 rounded-2xl transition-all border flex flex-col items-center gap-2 ${
                        selectedRecipe.id === recipe.id 
                        ? 'bg-emerald-500 border-emerald-400 text-white shadow-glow-emerald scale-105' 
                        : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'
                      }`}
                    >
                      <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform">{recipe.icon}</span>
                      <span className="text-[10px] sm:text-[11px] font-black whitespace-nowrap">{recipe.name.split(' (')[0]}</span>
                    </button>
                  ))}
                </div>
             </div>
             <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`w-full lg:w-64 h-16 sm:h-24 rounded-2xl font-black text-lg sm:text-xl transition-all shadow-xl flex items-center justify-center gap-3 ${
                isSimulating 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-glow-emerald'
              }`}
            >
              <i className={`fas ${isSimulating ? 'fa-square' : 'fa-play'}`}></i>
              {isSimulating ? 'STOP' : 'RUN TEST'}
            </button>
          </div>

          <CookingSimulation 
            recipe={selectedRecipe} 
            isActive={isSimulating} 
            onComplete={() => setIsSimulating(false)} 
          />
        </section>

        {/* Feature Table */}
        <section id="comparison" className="scroll-mt-24 space-y-8">
           <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h3 className="text-2xl sm:text-4xl font-black tracking-tight">Technical Benchmarks</h3>
              <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-widest">2026 Premium Lineup Comparison</p>
           </div>
           <ComparisonTable />
        </section>

        {/* Exclusive Features */}
        <section className="pb-20 space-y-12">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-4xl font-black">AI-Induction 독점 기술</h3>
            <p className="text-slate-500 text-sm">기존 대기업 제품으로는 불가능한 기능들</p>
          </div>
          <AutonomousPanel />
        </section>
      </main>

      {/* Quick Action Footer */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
         <div className="glass p-2 rounded-2xl border border-white/10 shadow-2xl flex gap-2">
            <button 
              onClick={() => window.open('https://ai-induction.vercel.app/', '_blank')}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Official
            </button>
            <button 
              onClick={() => scrollToSection('simulation')}
              className="flex-[2] bg-emerald-500 hover:bg-emerald-400 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-glow-emerald"
            >
              Live Demo
            </button>
         </div>
      </div>
    </div>
  );
};

export default App;

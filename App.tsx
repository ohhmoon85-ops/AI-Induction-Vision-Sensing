
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

  const externalSimLink = "https://ai-induction.vercel.app/";

  return (
    <div className="min-h-screen pb-20 bg-[#020617] text-slate-200">
      <Header onNavClick={scrollToSection} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-12 space-y-24 lg:space-y-48">
        {/* Intro Section */}
        <section id="technology" className="text-center space-y-10 pt-16">
          <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] sm:text-xs font-black tracking-[0.4em] uppercase">
             <i className="fas fa-certificate"></i> PATENTED SENSING TECHNOLOGY
          </div>
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.82] px-2 italic">
            기성 제품을<br/>
            <span className="gradient-text">앞서가는 눈(Eye).</span>
          </h2>
          <p className="text-slate-400 max-w-4xl mx-auto text-base sm:text-2xl font-medium leading-relaxed px-4 tracking-tight">
            S사·L사가 프로그램된 '시간'에 의존할 때, AI-Induction은 <br className="hidden sm:block"/>
            특허받은 **비접촉 실측 센서**로 조리 상황을 실시간으로 읽어냅니다.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-6">
             {["실시간 생성형 제어", "비접촉 IR 센싱", "PCB 적층 워킹코일", "분리형 상판 구조"].map(tag => (
               <span key={tag} className="text-[10px] font-black px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-500 uppercase tracking-widest">{tag}</span>
             ))}
          </div>
        </section>

        {/* Cooking Simulation Section */}
        <section id="simulation" className="scroll-mt-32 space-y-16">
          <div className="glass p-8 sm:p-16 rounded-[4rem] border border-white/5 shadow-3xl relative overflow-hidden">
             <div className="absolute -left-40 -bottom-40 w-80 h-80 bg-blue-500/5 blur-[120px] rounded-full"></div>
             <div className="flex flex-col lg:flex-row gap-16 items-center mb-20 relative z-10">
                <div className="flex-1 space-y-8 text-center lg:text-left">
                   <div className="space-y-2">
                      <h3 className="text-4xl font-black tracking-tight italic">Live Cooking Simulation</h3>
                      <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">라면부터 튀김까지, 인덕션이 직접 판단합니다.</p>
                   </div>
                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                     {RECIPES.map(recipe => (
                       <button
                         key={recipe.id}
                         onClick={() => { setSelectedRecipe(recipe); setIsSimulating(false); }}
                         className={`group p-6 rounded-[2rem] transition-all duration-500 border flex flex-col items-center gap-3 ${
                           selectedRecipe.id === recipe.id 
                           ? 'bg-emerald-500 border-emerald-400 text-white shadow-glow-emerald scale-110 rotate-1' 
                           : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20 hover:scale-105'
                         }`}
                       >
                         <span className="text-3xl group-hover:animate-bounce">{recipe.icon}</span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-center leading-tight">
                            {recipe.name.split(' (')[0]}
                         </span>
                       </button>
                     ))}
                   </div>
                </div>
                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`w-full lg:w-80 h-28 sm:h-32 rounded-[2.5rem] font-black text-2xl transition-all duration-500 shadow-2xl flex items-center justify-center gap-5 hover:scale-105 active:scale-95 ${
                    isSimulating 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-emerald-500 text-white shadow-glow-emerald'
                  }`}
                >
                  <i className={`fas ${isSimulating ? 'fa-square' : 'fa-play-circle'} text-3xl`}></i>
                  {isSimulating ? 'STOP SIM' : '시뮬레이션 시작'}
                </button>
             </div>

             <CookingSimulation 
               recipe={selectedRecipe} 
               isActive={isSimulating} 
               onComplete={() => setIsSimulating(false)} 
             />
          </div>
        </section>

        {/* Comparison Table Section */}
        <section id="comparison" className="scroll-mt-32 space-y-16">
           <div className="text-center space-y-4">
              <h3 className="text-4xl sm:text-5xl font-black tracking-tighter italic">Technical Superiority</h3>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.2em]">User-Centric Performance Comparison</p>
           </div>
           <ComparisonTable />
        </section>

        {/* Feature Cards Section */}
        <section className="space-y-16">
          <AutonomousPanel />
        </section>

        {/* External Simulation Section (Added at the bottom as requested) */}
        <section className="pb-24 pt-12">
           <div className="glass p-12 sm:p-20 rounded-[4rem] border border-emerald-500/20 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
              <div className="relative z-10 space-y-8">
                <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                  Ready for more data?
                </div>
                <h3 className="text-4xl sm:text-6xl font-black italic tracking-tighter">
                  더 깊이 있는<br/>
                  <span className="text-emerald-400">시뮬레이션을 만나보세요.</span>
                </h3>
                <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-lg font-medium leading-relaxed">
                  특허 기술이 적용된 센서 어레이의 실시간 온도 매핑과<br/> 
                  세부적인 하드웨어 로직을 직접 확인하실 수 있는 전용 페이지로 안내합니다.
                </p>
                <div className="pt-4">
                  <a 
                    href={externalSimLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 px-12 py-6 rounded-[2rem] bg-emerald-500 text-white font-black text-xl sm:text-2xl shadow-glow-emerald hover:scale-110 transition-all duration-300 group-hover:rotate-1"
                  >
                    <i className="fas fa-external-link-alt text-lg"></i>
                    세부 시뮬레이션 바로가기
                  </a>
                </div>
              </div>
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/5 blur-[120px] rounded-full group-hover:bg-emerald-500/10 transition-all"></div>
           </div>
        </section>
      </main>

      {/* Footer Info */}
      <footer className="max-w-7xl mx-auto px-4 py-20 border-t border-white/5 text-center">
         <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] mb-4">
            Intellectual Property Reserved © 2026 AI-Induction Next-Gen Kitchen
         </p>
         <div className="flex justify-center gap-10 opacity-30 grayscale hover:grayscale-0 transition-all">
            <span className="font-black italic text-xl">S-CORP</span>
            <span className="font-black italic text-xl">L-CORP</span>
            <span className="font-black italic text-xl text-emerald-500">AI-INDUCTION</span>
         </div>
      </footer>
    </div>
  );
};

export default App;


import React, { useState, useEffect } from 'react';
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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openVercelLink = () => {
    window.open('https://ai-induction.vercel.app/', '_blank');
  };

  return (
    <div className="min-h-screen pb-24 lg:pb-20 bg-[#0f172a]">
      <Header onNavClick={scrollToSection} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 lg:mt-8 space-y-12 lg:space-y-20">
        {/* Intro Section */}
        <section id="technology" className="text-center space-y-4 lg:space-y-6 pt-6 lg:pt-10">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] lg:text-sm font-bold mb-2">
            AI-INDUCTION : GROUND TRUTH INNOVATION
          </div>
          <h2 className="text-3xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent leading-tight px-2">
            Eye of the Kitchen:<br/><span className="text-white">Blind AI vs Vision Sensing</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm lg:text-lg leading-relaxed px-4">
            특허(10-2708883) 기반의 <b>실측형 Vision Sensing</b> 기술.<br className="hidden lg:block"/>
            기존 삼성/LG의 '장님(Blind)' 방식이 초래하는 에너지 낭비와 화재 위험을 해결합니다.
          </p>
        </section>

        {/* Comparison Simulation Area */}
        <section id="simulation" className="space-y-6 lg:space-y-8 scroll-mt-24">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 glass p-6 lg:p-8 rounded-3xl border border-white/5 shadow-2xl">
            <div className="flex flex-col gap-3 w-full">
              <h3 className="text-lg lg:text-xl font-bold text-white text-center lg:text-left">실시간 조리 시나리오 선택</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {RECIPES.map(recipe => (
                  <button
                    key={recipe.id}
                    onClick={() => { setSelectedRecipe(recipe); setIsSimulating(false); }}
                    className={`px-3 py-3 lg:px-5 lg:py-4 rounded-2xl transition-all font-bold flex flex-col sm:flex-row items-center gap-2 lg:gap-3 border ${
                      selectedRecipe.id === recipe.id 
                      ? 'bg-blue-600 text-white border-blue-400 shadow-lg scale-105' 
                      : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <span className="text-xl lg:text-2xl">{recipe.icon}</span>
                    <div className="text-center sm:text-left">
                      <div className="text-[8px] opacity-70 hidden lg:block uppercase">Scenario</div>
                      <div className="text-[10px] lg:text-sm whitespace-nowrap">{recipe.name.split(' (')[0]}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`w-full lg:w-auto px-10 py-4 lg:py-5 rounded-2xl font-black text-base lg:text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl ${
                isSimulating 
                ? 'bg-red-500 text-white' 
                : 'bg-emerald-500 text-white shadow-emerald-500/20'
              }`}
            >
              <i className={`fas ${isSimulating ? 'fa-stop' : 'fa-play'} mr-2`}></i>
              {isSimulating ? 'STOP' : 'START SIMULATION'}
            </button>
          </div>

          <CookingSimulation 
            recipe={selectedRecipe} 
            isActive={isSimulating} 
            onComplete={() => setIsSimulating(false)} 
          />
        </section>

        {/* Feature Comparison Table */}
        <section id="comparison" className="space-y-6 lg:space-y-8 scroll-mt-24 px-2 lg:px-0">
          <div className="flex items-center gap-4">
            <h3 className="text-xl lg:text-3xl font-bold">에너지 효율 및 기술 상세 비교</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-700 to-transparent"></div>
          </div>
          <ComparisonTable />
        </section>

        {/* Autonomous Exclusive Section */}
        <section className="space-y-8 pb-10 px-2 lg:px-0">
          <div className="flex items-center gap-4">
            <h3 className="text-xl lg:text-3xl font-bold text-emerald-400">AI-Induction 독점 기술</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/30 to-transparent"></div>
          </div>
          <AutonomousPanel />
        </section>
      </main>

      {/* Mobile-Friendly CTA Footer */}
      <footer className="fixed bottom-0 left-0 right-0 glass border-t border-white/5 py-3 lg:py-4 z-50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2 lg:gap-0">
          <div className="hidden lg:flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-emerald-400 font-bold tracking-tight">AI-Induction Live Vision</span> 
          </div>
          <div className="flex gap-2 lg:gap-4 w-full sm:w-auto">
            <button 
              onClick={openVercelLink}
              className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 lg:px-8 py-2.5 lg:py-3 rounded-xl text-xs lg:text-sm font-bold transition-all flex items-center justify-center gap-2"
            >
              <i className="fas fa-external-link-alt"></i>
              <span className="hidden sm:inline">Official Site</span>
              <span className="sm:hidden">공식 사이트</span>
            </button>
            <button 
              onClick={() => scrollToSection('simulation')}
              className="flex-1 sm:flex-none bg-emerald-500 hover:bg-emerald-600 text-white px-4 lg:px-8 py-2.5 lg:py-3 rounded-xl text-xs lg:text-sm font-bold transition-all shadow-lg"
            >
              Quick Sim
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

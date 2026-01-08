
import React, { useState } from 'react';

const AutonomousPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      title: "완전 자율 조리 (Autonomous Cooking)",
      desc: "재료만 넣고 레시피를 선택하면, AI가 온도와 화력을 알아서 조절합니다. 김치찌개, 된장국 등 한식 특화 모드 탑재.",
      icon: "fa-robot",
      color: "from-blue-500 to-emerald-500"
    },
    {
      title: "스마트 예약 시스템",
      desc: "아침 출근 전 재료를 세팅하고 7:30분 예약을 걸어두면, 기상 시간에 맞춰 갓 끓인 국이 완성됩니다.",
      icon: "fa-clock",
      color: "from-purple-500 to-blue-500"
    },
    {
      title: "Ground Truth 예측 안전",
      desc: "단순히 끓은 후 멈추는 것이 아니라, 끓기 직전의 미세한 물리 변화를 예측하여 화재와 오염을 원천 봉쇄합니다.",
      icon: "fa-shield-halved",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((f, i) => (
        <div 
          key={i}
          onMouseEnter={() => setActiveTab(i)}
          className={`p-6 rounded-3xl glass transition-all duration-500 cursor-pointer border-2 ${
            activeTab === i ? 'border-emerald-500/50 scale-[1.02]' : 'border-transparent opacity-70'
          }`}
        >
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-6 glow-blue`}>
             <i className={`fas ${f.icon} text-2xl text-white`}></i>
          </div>
          <h5 className="text-lg font-bold mb-3">{f.title}</h5>
          <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
          
          <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
             <span className="w-8 h-[1px] bg-emerald-500"></span>
             Existing Induction cannot do this
          </div>
        </div>
      ))}
    </div>
  );
};

export default AutonomousPanel;

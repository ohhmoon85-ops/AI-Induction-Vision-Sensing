
import React, { useState } from 'react';

interface LogicStep {
  title: string;
  desc: string;
  icon: string;
}

interface Feature {
  title: string;
  desc: string;
  icon: string;
  color: string;
  patent: string;
  details: string;
  logicSteps: LogicStep[];
}

const AutonomousPanel: React.FC = () => {
  const [activeDetail, setActiveDetail] = useState<Feature | null>(null);

  const features: Feature[] = [
    {
      title: "생성형 조리 인지 (Self-Awareness)",
      desc: "인덕션이 스스로 현재 요리가 '튀김'인지 '볶음'인지 판단하고, 재료의 수분이나 온도 변화에 맞춰 실시간으로 제어 로직을 자동 생성합니다.",
      icon: "fa-brain",
      color: "from-blue-500 to-emerald-500",
      patent: "스마트 쿠킹 기술",
      details: "기존 인덕션은 사용자가 설정한 온도를 유지하려고만 하지만, AI-Induction은 열의 '지문'을 읽습니다. 수분 증발 에너지 소비량과 재료 투입 시의 열 충격 패턴을 분석하여 현재 조리 모드를 0.1초 단위로 추론합니다.",
      logicSteps: [
        { title: "데이터 수집", desc: "IR 센서 어레이가 용기 바닥면의 복사 에너지를 다각도로 측정합니다.", icon: "fa-broadcast-tower" },
        { title: "열 지문 분석", desc: "튀김은 일정한 열 평형 상태를 유지하고, 볶음은 재료 이동에 따른 급격한 열 변동 패턴을 보입니다.", icon: "fa-wave-square" },
        { title: "모드 추론", desc: "수분 증발량과 열 흡수율 곡선을 비교하여 '튀김/볶음/끓임' 중 하나로 확정합니다.", icon: "fa-microchip" },
        { title: "로직 생성", desc: "인지된 모드에 최적화된 PWM(펄스폭 변조) 출력을 실시간으로 생성하여 화력을 제어합니다.", icon: "fa-cogs" }
      ]
    },
    {
      title: "분리 상판 및 PCB 코일 (Hardware Innovation)",
      desc: "가열 영역만 고가 내열 유리를 사용하고 나머지는 강화유리를 적용하여 단가를 낮추며, 효율 높은 PCB 적층 워킹코일을 지원합니다.",
      icon: "fa-layer-group",
      color: "from-amber-500 to-orange-500",
      patent: "특허 10-2708883",
      details: "열이 발생하는 부분과 제어 부분을 물리적으로 분리하여 전자 부품의 수명을 획기적으로 늘렸습니다. 또한 구리 선을 감는 대신 PCB에 코일을 직접 패턴화하여 에너지 손실을 최소화했습니다.",
      logicSteps: [
        { title: "열 차단 분리", desc: "고가 세라믹 글라스를 가열부에만 집중 배치하여 열전도를 원천 차단합니다.", icon: "fa-divide" },
        { title: "PCB 적층 코일", desc: "수천 번 감은 구리선 대신 얇은 PCB 층에 코일을 인쇄하여 저항을 줄였습니다.", icon: "fa-microchip" },
        { title: "슬림 디자인", desc: "코일 두께가 1/3로 줄어들어 하부 공간을 더욱 넓게 활용 가능합니다.", icon: "fa-arrows-alt-v" },
        { title: "냉각 효율", desc: "분리형 구조 덕분에 냉각 팬의 공기 흐름이 더 원활해져 소음이 감소합니다.", icon: "fa-wind" }
      ]
    },
    {
      title: "외란 실시간 분석 (Disturbance Filter)",
      desc: "끓어 넘침, 상판 오염 등 조리를 방해하는 '외란' 패턴을 AI가 즉각 포착하여 화력을 낮추거나 경고를 발생시켜 안전을 보장합니다.",
      icon: "fa-shield-heart",
      color: "from-emerald-500 to-teal-500",
      patent: "통합 지능형 시스템",
      details: "조리 중 용기 밖으로 튀는 기름이나 국물은 센서 값에 노이즈를 발생시킵니다. AI는 이 노이즈가 '의도된 가열'인지 '외부 방해'인지를 구분하여 기기 오작동을 방지합니다.",
      logicSteps: [
        { title: "노이즈 감지", desc: "센서 어레이 중 특정 픽셀에서 불규칙한 온도 급등락을 포착합니다.", icon: "fa-exclamation-triangle" },
        { title: "패턴 매칭", desc: "넘침 데이터셋과 실시간 센서 값을 대조하여 외란 여부를 판단합니다.", icon: "fa-search" },
        { title: "안전 개입", desc: "외란 확정 시 0.1초 이내에 해당 화구의 출력을 20% 이하로 급격히 낮춥니다.", icon: "fa-hand-paper" },
        { title: "사용자 알림", desc: "음성 가이드와 스마트폰 앱을 통해 오염 상태를 즉시 알립니다.", icon: "fa-bell" }
      ]
    }
  ];

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div 
            key={i}
            className="p-10 rounded-[2.5rem] glass border border-white/5 hover:border-emerald-500/30 transition-all duration-700 group relative overflow-hidden flex flex-col min-h-[420px]"
          >
            <div className={`absolute -top-10 -right-10 p-4 opacity-5 group-hover:opacity-10 transition-all duration-700 group-hover:-translate-x-8 group-hover:translate-y-8`}>
               <i className={`fas ${f.icon} text-[12rem]`}></i>
            </div>

            <div className="mb-8">
              <span className="px-4 py-2 rounded-full bg-slate-800/80 border border-white/10 text-[10px] font-black text-slate-300 uppercase tracking-widest backdrop-blur-md">
                {f.patent}
              </span>
            </div>

            <h5 className="text-3xl font-black mb-6 text-white tracking-tight leading-tight pr-4">
              {f.title}
            </h5>
            <p className="text-base text-slate-400 leading-relaxed font-medium mb-8">
              {f.desc}
            </p>
            
            <div className="mt-auto pt-8 border-t border-white/5 flex flex-col gap-4">
              <button 
                onClick={() => setActiveDetail(f)}
                className="flex items-center gap-2 text-[11px] font-black text-emerald-400 uppercase tracking-widest hover:text-white transition-colors group/btn"
              >
                 <span className="w-12 h-[1.5px] bg-emerald-500 group-hover/btn:w-16 transition-all"></span>
                 Detailed Logic View
                 <i className="fas fa-arrow-right ml-1 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeDetail && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in duration-300"
            onClick={() => setActiveDetail(null)}
          ></div>
          <div className="relative glass-dark max-w-4xl w-full p-8 sm:p-12 rounded-[3.5rem] border border-emerald-500/30 shadow-4xl animate-in zoom-in-95 duration-300 overflow-y-auto max-h-[90vh]">
             <button 
               onClick={() => setActiveDetail(null)}
               className="sticky top-0 float-right w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-slate-400 transition-all z-20"
             >
                <i className="fas fa-times text-xl"></i>
             </button>
             
             <div className="flex flex-col lg:flex-row gap-12 mt-4">
                {/* Left: Intro & Visual Icon */}
                <div className="lg:w-1/3 space-y-8">
                  <div className={`w-24 h-24 rounded-[2rem] bg-gradient-to-br ${activeDetail.color} flex items-center justify-center shadow-glow-emerald`}>
                      <i className={`fas ${activeDetail.icon} text-4xl text-white`}></i>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">{activeDetail.patent}</span>
                    <h4 className="text-4xl font-black text-white italic mt-2 tracking-tighter leading-none">{activeDetail.title}</h4>
                    <div className="h-1.5 w-16 bg-emerald-500 mt-6 rounded-full"></div>
                  </div>
                  <p className="text-lg text-slate-400 leading-relaxed font-medium">
                    {activeDetail.details}
                  </p>
                </div>

                {/* Right: Detailed Logic Steps (The "Diagram") */}
                <div className="lg:w-2/3">
                  <h6 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                    <i className="fas fa-project-diagram"></i> System Logic Flow
                  </h6>
                  <div className="space-y-4 relative">
                    {/* Vertical Line Connector */}
                    <div className="absolute left-7 top-10 bottom-10 w-[2px] bg-gradient-to-b from-emerald-500 via-blue-500 to-transparent opacity-20 hidden sm:block"></div>
                    
                    {activeDetail.logicSteps.map((step, idx) => (
                      <div key={idx} className="relative flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group/step">
                         <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 z-10 group-hover/step:border-emerald-500/50 transition-colors shadow-xl">
                            <i className={`fas ${step.icon} text-xl text-slate-500 group-hover/step:text-emerald-400 transition-colors`}></i>
                         </div>
                         <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-black text-emerald-500/50 uppercase">Step 0{idx+1}</span>
                              <h5 className="text-lg font-black text-white tracking-tight">{step.title}</h5>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed font-medium">
                              {step.desc}
                            </p>
                         </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Box */}
                  <div className="mt-8 p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20">
                     <div className="flex items-start gap-4">
                        <i className="fas fa-info-circle text-emerald-400 mt-1"></i>
                        <p className="text-xs text-emerald-100/70 font-medium leading-relaxed">
                          이 기술은 AI-Induction의 핵심 하드웨어인 <b>센서 어레이</b>와 <b>실시간 추론 엔진</b>을 통해 구현됩니다. 
                          복잡한 데이터 분석 과정을 사용자에게는 보이지 않는 백그라운드에서 처리하여, 
                          사용자는 단지 '시작' 버튼 하나로 최상의 요리 결과를 얻을 수 있습니다.
                        </p>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutonomousPanel;

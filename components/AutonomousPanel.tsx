
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
      title: "지능형 열 분포 최적화 (Heat Balancing)",
      desc: "중앙만 타고 외곽은 안 익는 문제를 해결합니다. 중앙(210)과 주변부(220) 센서의 온도 편차를 실시간 분석하여 화력을 펄스 제어합니다.",
      icon: "fa-arrows-left-right-to-line",
      color: "from-orange-500 to-red-500",
      patent: "열 분포 정밀 제어",
      details: "기성 인덕션의 '중앙 과열' 문제를 다지점 센서 퓨전 기술로 해결합니다. 전 부치기 등 넓은 팬 조리 시, 중앙 온도가 타겟을 넘어서면 즉시 출력을 미세하게 끊어주어(Duty Cycle Modulation) 열이 주변으로 전도될 골든타임을 확보합니다.",
      logicSteps: [
        { title: "편차(Gradient) 감지", desc: "중앙과 주변부 5개 지점 센서의 온도 데이터를 0.1초 단위로 대조합니다.", icon: "fa-temperature-half" },
        { title: "균일 가열 알고리즘", desc: "온도 편차가 30°C 이상 벌어질 경우 'Uniformity Boost' 로직을 실행합니다.", icon: "fa-calculator" },
        { title: "미세 펄스 출력", desc: "중앙 출력을 미세하게 펄스 형태로 조절하여 중앙 과열을 억제하고 열 전도를 유도합니다.", icon: "fa-wave-square" },
        { title: "180°C 안전 리밋", desc: "식재료의 탄화를 방지하기 위해 어떤 상황에서도 상판 온도가 180°C를 넘지 않도록 강제 제어합니다.", icon: "fa-shield-halved" }
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
      title: "생성형 조리 인지 (Self-Awareness)",
      desc: "인덕션이 스스로 현재 요리가 '튀김'인지 '볶음'인지를 판단하고, 재료 투입 시의 열 충격을 분석하여 최적의 제어 로직을 실시간 생성합니다.",
      icon: "fa-brain",
      color: "from-blue-500 to-emerald-500",
      patent: "스마트 쿠킹 기술",
      details: "단순 온도 유지가 아닌 요리의 '맥락'을 이해합니다. 수분 증발 속도와 열 흡수 패턴의 '지문'을 분석하여 현재 조리 상태에 가장 적합한 PWM 화력을 생성해냅니다.",
      logicSteps: [
        { title: "열 지문 수집", desc: "복사 에너지 패턴을 분석하여 '액체/고체/기름' 기반 조리를 분류합니다.", icon: "fa-fingerprint" },
        { title: "맥락 추론", desc: "재료 투입 시의 온도 급락 곡선을 보고 '냉동/생물' 여부를 판별합니다.", icon: "fa-microchip" },
        { title: "동적 로직 생성", desc: "판단된 조리 모드에 맞춰 목표 온도 도달 속도와 유지 화력을 실시간으로 설계합니다.", icon: "fa-cogs" },
        { title: "안전 검증", desc: "생성된 로직이 안전 범위를 벗어날 경우 표준 모드로 자동 회귀합니다.", icon: "fa-check-double" }
      ]
    },
    {
      title: "외란 실시간 분석 (Disturbance Filter)",
      desc: "끓어 넘침, 상판 오염 등 조리를 방해하는 요소를 포착합니다. 노이즈 데이터에서 '의도된 가열'만 분리하여 오작동을 원천 차단합니다.",
      icon: "fa-shield-heart",
      color: "from-emerald-500 to-teal-500",
      patent: "통합 지능형 시스템",
      details: "조리 중 용기 밖으로 튀는 기름이나 국물은 센서 값에 노이즈를 발생시킵니다. AI는 이 노이즈 패턴이 '넘침'인지 '조리 중 튐'인지를 구분하여 불필요한 전원 차단을 방지하면서도 실제 위험에는 즉각 대응합니다.",
      logicSteps: [
        { title: "노이즈 프로파일링", desc: "불규칙한 온도 급등락 데이터를 실시간 패턴 매칭합니다.", icon: "fa-search" },
        { title: "외란 확정", desc: "데이터셋 대조 결과 넘침으로 판단될 경우 0.1초 이내 개입합니다.", icon: "fa-hand-paper" },
        { title: "출력 자동 다운", desc: "화구 출력을 20% 이하로 즉시 낮춰 피해 확산을 방지합니다.", icon: "fa-arrow-down-wide-short" },
        { title: "상태 리포트", desc: "스마트홈 앱을 통해 오염 위치와 대응 결과를 음성으로 안내합니다.", icon: "fa-bell" }
      ]
    }
  ];

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div 
            key={i}
            className="p-8 rounded-[2.5rem] glass border border-white/5 hover:border-emerald-500/30 transition-all duration-700 group relative overflow-hidden flex flex-col min-h-[460px]"
          >
            <div className={`absolute -top-10 -right-10 p-4 opacity-5 group-hover:opacity-10 transition-all duration-700 group-hover:-translate-x-8 group-hover:translate-y-8`}>
               <i className={`fas ${f.icon} text-[10rem]`}></i>
            </div>

            <div className="mb-6">
              <span className="px-4 py-1.5 rounded-full bg-slate-800/80 border border-white/10 text-[9px] font-black text-slate-300 uppercase tracking-widest backdrop-blur-md">
                {f.patent}
              </span>
            </div>

            <h5 className="text-2xl font-black mb-5 text-white tracking-tight leading-tight pr-4">
              {f.title}
            </h5>
            <p className="text-sm text-slate-400 leading-relaxed font-medium mb-8">
              {f.desc}
            </p>
            
            <div className="mt-auto pt-6 border-t border-white/5">
              <button 
                onClick={() => setActiveDetail(f)}
                className="w-full relative py-4 px-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center gap-3 group/btn overflow-hidden transition-all duration-500 hover:bg-emerald-500/10 hover:border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.05)] hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]"
              >
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                 
                 <div className="flex items-center gap-2 relative z-10">
                    <span className="w-8 h-[2px] bg-emerald-500 group-hover/btn:w-12 transition-all duration-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                    <span className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.2em] group-hover/btn:text-white transition-colors duration-300">
                       Detailed Logic View
                    </span>
                 </div>
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

                <div className="lg:w-2/3">
                  <h6 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                    <i className="fas fa-project-diagram"></i> System Logic Flow
                  </h6>
                  <div className="space-y-4 relative">
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

                  <div className="mt-8 p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20">
                     <div className="flex items-start gap-4">
                        <i className="fas fa-info-circle text-emerald-400 mt-1"></i>
                        <p className="text-xs text-emerald-100/70 font-medium leading-relaxed">
                          이 기술은 AI-Induction의 핵심 하드웨어인 <b>커스텀 센서 어레이</b>와 <b>지능형 제어 알고리즘</b>을 통해 구현됩니다. 
                          사용자 요구사항에 맞춘 하드웨어 혁신과 소프트웨어 지능화를 통해 기성 제품과는 차별화된 조리 경험과 안전성을 보장합니다.
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

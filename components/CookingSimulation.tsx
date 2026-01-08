
import React, { useState, useEffect, useRef } from 'react';
import { Brand, Recipe, CookingState } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface Props {
  recipe: Recipe;
  isActive: boolean;
  onComplete: () => void;
}

const CookingSimulation: React.FC<Props> = ({ recipe, isActive, onComplete }) => {
  const [time, setTime] = useState(0);
  const [states, setStates] = useState<Record<Brand, CookingState>>({
    [Brand.AI_INDUCTION]: { time: 0, vesselTemp: 25, sensorTemp: 25, powerLevel: 0, status: '가열 전', isBoilingOver: false, energyConsumed: 0 },
    [Brand.SAMSUNG]: { time: 0, vesselTemp: 25, sensorTemp: 25, powerLevel: 0, status: '가열 전', isBoilingOver: false, energyConsumed: 0 },
    [Brand.LG]: { time: 0, vesselTemp: 25, sensorTemp: 25, powerLevel: 0, status: '가열 전', isBoilingOver: false, energyConsumed: 0 },
  });
  
  const [history, setHistory] = useState<any[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setTime(prev => prev + 1);
      }, 100); 
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setTime(0);
      setHistory([]);
      setStates({
        [Brand.AI_INDUCTION]: { time: 0, vesselTemp: 25, sensorTemp: 25, powerLevel: 0, status: '대기', isBoilingOver: false, energyConsumed: 0 },
        [Brand.SAMSUNG]: { time: 0, vesselTemp: 25, sensorTemp: 25, powerLevel: 0, status: '대기', isBoilingOver: false, energyConsumed: 0 },
        [Brand.LG]: { time: 0, vesselTemp: 25, sensorTemp: 25, powerLevel: 0, status: '대기', isBoilingOver: false, energyConsumed: 0 },
      });
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    if (time > 150) { onComplete(); return; }

    setStates(prev => {
      const next = { ...prev };
      Object.values(Brand).forEach(brand => {
        next[brand] = { ...next[brand] };
        const s = next[brand];
        const isAI = brand === Brand.AI_INDUCTION;
        
        if (recipe.id === 'seaweed-soup') {
          if (!isAI) {
            s.powerLevel = 0;
            s.status = "예약 기능 미지원";
            s.vesselTemp = 25;
          } else {
            if (time < 30) { s.powerLevel = 0; s.status = "07:00 예약 대기"; }
            else if (time < 80) { s.powerLevel = 10; s.vesselTemp += 2.8; s.status = "자율 가열 중"; }
            else { s.powerLevel = 2; s.vesselTemp = 99; s.status = "심머링 유지"; }
            s.energyConsumed += (s.powerLevel * 0.012);
            s.sensorTemp = s.vesselTemp;
          }
        } 
        else if (recipe.id === 'fried-fish') {
          if (time < 50) { // 예열
            if (s.vesselTemp < 180) { s.powerLevel = 10; s.vesselTemp += 5; }
            else { s.powerLevel = isAI ? 3 : 0; s.vesselTemp = 180 + (Math.random()*2 - 1); }
            s.status = "기름 예열 중 (180°C)";
          } else if (time < 55) { // 투입
            s.vesselTemp -= 60;
            s.status = "냉동 생선 투입!";
          } else { // 튀김 중
            if (isAI) {
              if (s.vesselTemp < 180) { s.powerLevel = 10; s.vesselTemp += 8; }
              else { s.powerLevel = 3.5; s.vesselTemp = 180 + (Math.random()*0.6 - 0.3); }
              s.status = "180°C 칼유지 (바삭함)";
            } else {
              const lag = brand === Brand.SAMSUNG ? 18 : 12;
              if (time < 55 + lag) {
                s.powerLevel = 1; // 온도 떨어진 걸 아직 모름
                s.vesselTemp += 0.4;
                s.status = "인지 지연 (눅눅함 진행)";
              } else {
                s.powerLevel = 10; // 뒤늦게 풀가열
                s.vesselTemp += 7.5;
                if (s.vesselTemp > 195) {
                   s.status = "과열! 오버슈트 발생";
                   s.powerLevel = 0;
                } else {
                   s.status = "지연 추격 가열 중";
                }
              }
            }
          }
          s.energyConsumed += (s.powerLevel * (isAI ? 0.012 : 0.028));
          if (isAI) s.sensorTemp = s.vesselTemp;
          else s.sensorTemp = s.sensorTemp + (s.vesselTemp - s.sensorTemp) * 0.04;
        }
        else { // 기본 로직
          s.vesselTemp += (isAI ? 2.5 : 2.2);
          if (s.vesselTemp > 95) {
            if (isAI) { s.vesselTemp = 99.5; s.powerLevel = 2; s.status = "넘침 예측 제어"; }
            else { s.vesselTemp += 1.5; if (s.vesselTemp > 105) s.isBoilingOver = true; s.status = "넘침 임계점"; }
          }
          s.energyConsumed += (s.powerLevel * (isAI ? 0.012 : 0.025));
          if (isAI) s.sensorTemp = s.vesselTemp;
          else s.sensorTemp = s.sensorTemp + (s.vesselTemp - s.sensorTemp) * 0.07;
        }
      });

      setHistory(hPrev => [...hPrev, { 
        time, 
        ai: Math.round(next[Brand.AI_INDUCTION].vesselTemp), 
        samsung: Math.round(next[Brand.SAMSUNG].vesselTemp),
        lg: Math.round(next[Brand.LG].vesselTemp)
      }].slice(-100));
      return next;
    });
  }, [time, isActive]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.values(Brand).map(brand => (
            <div key={brand} className={`relative p-5 rounded-3xl glass border-t-4 transition-all overflow-hidden ${
              brand === Brand.AI_INDUCTION ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-800'
            }`}>
              {brand === Brand.AI_INDUCTION && <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-3xl -z-10"></div>}
              
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{brand.split(' ')[0]} 2026 Model</span>
                <span className={`text-[8px] px-2 py-0.5 rounded font-black ${brand === Brand.AI_INDUCTION ? 'bg-emerald-500 text-white shadow-glow-emerald' : 'bg-red-500/20 text-red-500'}`}>
                  {brand === Brand.AI_INDUCTION ? 'VISION AI' : 'BLIND AI'}
                </span>
              </div>

              <div className="h-32 bg-black/40 rounded-2xl relative flex items-center justify-center border border-white/5 mb-4">
                {recipe.id === 'seaweed-soup' && brand !== Brand.AI_INDUCTION && (
                   <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-red-950/80 backdrop-blur-md p-4">
                      <i className="fas fa-lock text-red-500 mb-1"></i>
                      <span className="text-[9px] text-white font-black leading-none uppercase">Safety Restricted</span>
                   </div>
                )}
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-slate-700 rounded-t-xl relative z-10 overflow-hidden shadow-lg ${states[brand].isBoilingOver ? 'boil-animation' : ''}`}>
                   <div className={`absolute bottom-0 w-full transition-all duration-300 ${recipe.id === 'fried-fish' ? 'bg-orange-500' : 'bg-emerald-400/30'}`} 
                        style={{height: `${Math.min(states[brand].vesselTemp/2.5, 98)}%`}}></div>
                </div>
                {/* Heat Waves */}
                {states[brand].powerLevel > 0 && (
                   <div className="absolute bottom-4 flex gap-1 animate-pulse">
                      <div className="w-1 h-6 bg-orange-500/40 rounded-full"></div>
                      <div className="w-1 h-10 bg-orange-500/60 rounded-full"></div>
                      <div className="w-1 h-6 bg-orange-500/40 rounded-full"></div>
                   </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Actual Temp</span>
                  <span className={`text-xl font-black ${brand === Brand.AI_INDUCTION ? 'text-white' : 'text-slate-400'}`}>{Math.round(states[brand].vesselTemp)}°C</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Efficiency</span>
                  <span className="text-[10px] text-emerald-400 font-mono">⚡ {states[brand].energyConsumed.toFixed(4)} kWh</span>
                </div>
                <div className={`text-[10px] py-1.5 rounded-lg font-black text-center uppercase tracking-tighter ${
                  states[brand].isBoilingOver ? 'bg-red-500 text-white' : 'bg-slate-900 text-slate-400'
                }`}>
                  {states[brand].status}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-64 sm:h-80 glass p-4 sm:p-6 rounded-3xl border border-white/5 relative">
          <div className="absolute top-4 left-6 flex items-center gap-4 z-10 text-[10px] font-black uppercase">
             <div className="flex items-center gap-1.5"><div className="w-3 h-1 bg-emerald-500 rounded-full"></div><span>AI-Induction</span></div>
             <div className="flex items-center gap-1.5 text-slate-500"><div className="w-3 h-1 bg-blue-500/50 rounded-full"></div><span>Samsung</span></div>
             <div className="flex items-center gap-1.5 text-slate-500"><div className="w-3 h-1 bg-purple-500/50 rounded-full"></div><span>LG</span></div>
          </div>
          {recipe.id === 'fried-fish' && (
             <div className="absolute top-1/2 left-6 -translate-y-1/2 text-white/5 font-black text-6xl italic pointer-events-none select-none">180°C TARGET</div>
          )}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={recipe.id === 'fried-fish' ? [20, 220] : [20, 120]} hide />
              <Tooltip contentStyle={{ background: '#020617', border: 'none', borderRadius: '12px', fontSize: '10px' }} />
              <ReferenceLine y={recipe.id === 'fried-fish' ? 180 : 100} stroke="#475569" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="ai" stroke="#10b981" strokeWidth={5} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="samsung" stroke="#3b82f6" strokeWidth={1} strokeDasharray="5 5" dot={false} isAnimationActive={false} opacity={0.5} />
              <Line type="monotone" dataKey="lg" stroke="#a855f7" strokeWidth={1} strokeDasharray="5 5" dot={false} isAnimationActive={false} opacity={0.5} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass p-6 rounded-3xl flex flex-col border border-white/5 h-full max-h-[600px]">
        <h4 className="text-emerald-400 font-black mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
           <i className="fas fa-eye animate-pulse"></i> Ground Truth Analysis
        </h4>
        <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar text-[11px] font-mono leading-relaxed">
          <div className="p-3 bg-slate-900/80 rounded-xl border-l-4 border-emerald-500">
             <span className="text-emerald-400 font-bold">[CONCEPT]</span> <b>장님 AI vs 뜬 눈 AI</b><br/>
             기존 삼성/LG는 유리 상판을 통해 간접적으로 온도를 추측합니다. 이는 안대로 눈을 가리고 조리하는 것과 같습니다.
          </div>
          {isActive && (
            <>
              {recipe.id === 'fried-fish' && (
                <div className="p-3 bg-blue-500/10 rounded-xl border-l-4 border-blue-500">
                  <span className="text-blue-400 font-bold">[SENSING]</span> <b>냉동 부하 변동 감지</b><br/>
                  생선 투입 시 온도가 60도 급락했습니다. AI-Induction은 0.1초 만에 이를 감지해 가열을 시작하지만, 경쟁사는 유리가 식을 때까지 감지하지 못해 기름이 식어버립니다(눅눅함의 원인).
                </div>
              )}
              {recipe.id === 'fried-fish' && time > 80 && (
                <div className="p-3 bg-red-500/10 rounded-xl border-l-4 border-red-500 animate-pulse">
                  <span className="text-red-400 font-bold">[WARNING]</span> <b>경쟁사 오버슈트 감지</b><br/>
                  Blind AI가 뒤늦게 가열을 시작해 목표치인 180도를 뚫고 200도 가까이 치솟고 있습니다. 발암물질(벤조피렌) 위험 구간입니다.
                </div>
              )}
              <div className="p-3 bg-emerald-500/10 rounded-xl border-l-4 border-emerald-500">
                <span className="text-emerald-400 font-bold">[EFFICIENCY]</span> <b>전력 낭비 차단</b><br/>
                정밀 제어로 불필요한 고화력을 쓰지 않아 전력 효율이 경쟁사 대비 약 28% 높게 기록되고 있습니다.
              </div>
            </>
          )}
        </div>
        <div className="mt-6 bg-gradient-to-br from-emerald-500 to-blue-600 p-4 rounded-2xl shadow-glow-emerald">
           <div className="text-[10px] font-black text-white/90 mb-1 uppercase tracking-widest">Vision Advantage</div>
           <div className="text-lg font-black text-white italic">NO MORE GUESSING.</div>
        </div>
      </div>
    </div>
  );
};

export default CookingSimulation;

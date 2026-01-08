
import React, { useState, useEffect, useRef } from 'react';
import { Brand, Recipe, CookingState } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  recipe: Recipe;
  isActive: boolean;
  onComplete: () => void;
}

const CookingSimulation: React.FC<Props> = ({ recipe, isActive, onComplete }) => {
  const [time, setTime] = useState(0);
  const [states, setStates] = useState<Record<Brand, CookingState>>({
    [Brand.AI_INDUCTION]: { time: 0, vesselTemp: 25, sensorTemp: 25, powerLevel: 10, status: '가열 시작', isBoilingOver: false, energyConsumed: 0 },
    [Brand.SAMSUNG]: { time: 0, vesselTemp: 25, sensorTemp: 25, powerLevel: 0, status: '대기', isBoilingOver: false, energyConsumed: 0 },
    [Brand.LG]: { time: 0, vesselTemp: 25, sensorTemp: 25, powerLevel: 0, status: '대기', isBoilingOver: false, energyConsumed: 0 },
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
        [Brand.AI_INDUCTION]: { time: 0, vesselTemp: 25, sensorTemp: 25, powerLevel: 10, status: '대기', isBoilingOver: false, energyConsumed: 0 },
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
        
        // --- Scenario Logic ---
        if (recipe.id === 'seaweed-soup') {
          if (!isAI) {
            s.powerLevel = 0;
            s.status = "예약 기능 미지원 (안전 제한)";
            s.vesselTemp = 25;
            s.energyConsumed = 0;
          } else {
            if (time < 30) {
              s.powerLevel = 0;
              s.status = "07:00 예약 대기 중...";
            } else if (time >= 30 && time < 80) {
              s.powerLevel = 10;
              s.vesselTemp += 2.5;
              s.status = "자율 조리 가동 중";
              s.energyConsumed += (s.powerLevel * 0.012);
            } else {
              s.powerLevel = 2;
              s.vesselTemp = 99;
              s.status = "정밀 심머링 (보온/맛내기)";
              s.energyConsumed += (s.powerLevel * 0.012);
            }
            s.sensorTemp = s.vesselTemp;
          }
        } 
        else if (recipe.id === 'fried-fish') {
          const efficiencyFactor = isAI ? 0.012 : 0.028; // Competition wastes more during oscillation
          s.energyConsumed += (s.powerLevel * efficiencyFactor);

          if (time < 50) { // Preheat Phase
            if (s.vesselTemp < 180) s.vesselTemp += 4.5;
            else s.vesselTemp = 180 + (Math.random() - 0.5); // Hold 180
            s.status = "기름 예열 중 (Target: 180°C)";
          } else if (time >= 50 && time < 55) { // Fish Insertion
            s.vesselTemp -= 55; // Sudden drop
            s.status = "생선 투입 (온도 급락!)";
          } else { // Frying Phase
            if (isAI) {
              // AI-Induction: Fast recovery & rock-solid 180
              if (s.vesselTemp < 180) {
                s.powerLevel = 10;
                s.vesselTemp += 6.5;
              } else {
                s.powerLevel = 3.5;
                s.vesselTemp = 180 + (Math.random() * 0.4 - 0.2);
              }
              s.status = "180°C 정밀 유지 (바삭함 최적화)";
            } else {
              // Competition: Blind AI sensing lag + poor PID control
              // Lag causes late power boost and massive overshoot
              const sensingLag = brand === Brand.SAMSUNG ? 15 : 10;
              if (time < 50 + sensingLag) {
                s.powerLevel = 2; // Still hasn't realized the temp dropped
                s.vesselTemp += 0.5;
                s.status = "인지 지연 중 (눅눅함 발생)";
              } else {
                s.powerLevel = 10; // Late reaction -> Full power
                s.vesselTemp += 7.0;
                if (s.vesselTemp > 195) {
                   s.status = "오버슈트 발생! (기름 과열)";
                } else {
                   s.status = "지연 보상 가열 중";
                }
              }
              // Oscillation simulation for competition after recovery
              if (s.vesselTemp > 185) s.powerLevel = 0; 
            }
          }
          
          if (isAI) s.sensorTemp = s.vesselTemp;
          else s.sensorTemp = s.sensorTemp + (s.vesselTemp - s.sensorTemp) * 0.05; // High lag for competition
        }
        else {
          // Ramen & Steak Logic
          const efficiencyFactor = isAI ? 0.012 : 0.025; 
          s.energyConsumed += (s.powerLevel * efficiencyFactor);

          if (recipe.id === 'ramen') {
            s.vesselTemp += 2.5;
            if (s.vesselTemp > 95) {
              if (isAI) { s.powerLevel = 2; s.status = "넘침 선제 차단"; s.vesselTemp = 99.5; }
              else { s.vesselTemp += 1.8; if (s.vesselTemp >= 105) { s.isBoilingOver = true; s.status = "넘침 발생"; } }
            }
          } else if (recipe.id === 'steak') {
            if (time < 50) { s.vesselTemp += 4.0; s.status = "고온 예열"; }
            else if (time >= 50 && time < 55) { s.vesselTemp -= 50; s.status = "고기 투입"; }
            else {
              if (isAI) { s.powerLevel = 10; s.vesselTemp += 5.2; s.status = "시어링 최적화"; }
              else { s.powerLevel = 7; s.vesselTemp += 2.8; s.status = "간접 추정 가열"; }
            }
          }

          if (isAI) { s.sensorTemp = s.vesselTemp; } 
          else {
            const target = s.vesselTemp;
            s.sensorTemp = s.sensorTemp + (target - s.sensorTemp) * 0.08;
          }
        }
      });

      setHistory(hPrev => [
        ...hPrev, 
        { 
          time, 
          ai: Math.round(next[Brand.AI_INDUCTION].vesselTemp), 
          samsung: Math.round(next[Brand.SAMSUNG].vesselTemp),
          lg: Math.round(next[Brand.LG].vesselTemp)
        }
      ].slice(-100));
      return next;
    });
  }, [time, isActive]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {Object.values(Brand).map(brand => (
            <div key={brand} className={`relative p-5 lg:p-6 rounded-3xl glass border-t-8 transition-all ${
              brand === Brand.AI_INDUCTION ? 'border-emerald-500 bg-emerald-500/10 shadow-2xl' : 'border-slate-800 opacity-90'
            }`}>
              <div className="flex justify-between items-start mb-4">
                <div className="text-[10px] font-black text-slate-500 uppercase">{brand.split(' ')[0]}</div>
                <div className="flex flex-col items-end">
                   {brand !== Brand.AI_INDUCTION ? (
                      <span className="bg-red-500/10 text-red-500 text-[8px] px-2 py-0.5 rounded font-black mb-1">BLIND SENSING</span>
                   ) : (
                      <span className="bg-emerald-500 text-white text-[8px] px-2 py-0.5 rounded font-black mb-1 shadow-glow">GROUND TRUTH</span>
                   )}
                   <span className="text-[9px] text-slate-400 font-mono">⚡ {states[brand].energyConsumed.toFixed(3)} kWh</span>
                </div>
              </div>
              
              <div className="h-32 lg:h-40 bg-slate-950/80 rounded-2xl relative flex items-center justify-center overflow-hidden">
                 {recipe.id === 'seaweed-soup' && brand !== Brand.AI_INDUCTION && (
                   <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-red-950/60 backdrop-blur-sm p-4 text-center">
                      <i className="fas fa-lock text-red-500 text-xl mb-2"></i>
                      <span className="text-[9px] text-white font-bold leading-tight uppercase tracking-tighter">Safety Block:<br/>No Remote Access</span>
                   </div>
                 )}
                 <div className={`w-20 h-20 lg:w-24 lg:h-24 bg-slate-500 rounded-t-xl relative z-10 ${states[brand].isBoilingOver ? 'boil-animation' : ''}`}>
                    <div className={`absolute bottom-0 w-full transition-all duration-300 ${recipe.id === 'fried-fish' || recipe.id === 'steak' ? 'bg-orange-600' : 'bg-emerald-600/40'}`} 
                         style={{height: `${Math.min(states[brand].vesselTemp/2.5, 98)}%`}}></div>
                    {brand === Brand.AI_INDUCTION && (
                      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
                         <i className="fas fa-eye text-emerald-400 text-[10px] animate-pulse"></i>
                      </div>
                    )}
                 </div>
                 {/* Fire Visual */}
                 <div className={`absolute bottom-0 w-full h-12 bg-gradient-to-t from-orange-600/40 to-transparent transition-opacity duration-300 ${states[brand].powerLevel > 5 ? 'opacity-100' : 'opacity-0'}`}></div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Real Temperature</span>
                  <span className={`text-base lg:text-lg font-black ${brand === Brand.AI_INDUCTION ? 'text-white' : 'text-slate-300'}`}>{Math.round(states[brand].vesselTemp)}°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">AI Prediction</span>
                  <span className={`text-xs lg:text-sm font-bold ${brand === Brand.AI_INDUCTION ? 'text-emerald-400' : 'text-orange-500/70'}`}>
                    {brand === Brand.AI_INDUCTION ? Math.round(states[brand].sensorTemp) + "°C" : (recipe.id === 'seaweed-soup' ? "N/A" : Math.round(states[brand].sensorTemp) + "°C (Lag)")}
                  </span>
                </div>
                <div className={`text-[10px] p-2 rounded-lg font-bold text-center h-8 flex items-center justify-center ${states[brand].isBoilingOver ? 'bg-red-500/20 text-red-500' : brand !== Brand.AI_INDUCTION && recipe.id === 'seaweed-soup' ? 'bg-slate-800 text-slate-500' : 'bg-slate-900 text-slate-400'}`}>
                  {states[brand].status}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Graph Area */}
        <div className="h-56 lg:h-72 glass p-4 lg:p-6 rounded-3xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-4 left-6 flex items-center gap-4 z-10">
             <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-emerald-500 rounded-full"></div><span className="text-[10px] font-bold text-slate-400">AI-Induction</span></div>
             <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-blue-500 rounded-full"></div><span className="text-[10px] font-bold text-slate-400 italic">Samsung (Blind)</span></div>
             <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-purple-500 rounded-full"></div><span className="text-[10px] font-bold text-slate-400 italic">LG (Blind)</span></div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="2 2" stroke="#334155" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={recipe.id.includes('fried') || recipe.id === 'steak' ? [20, 240] : [20, 130]} hide />
              <Tooltip 
                contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '10px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }} 
                itemStyle={{ fontWeight: 'bold' }}
              />
              <Line type="monotone" dataKey="ai" stroke="#10b981" strokeWidth={5} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="samsung" stroke="#3b82f6" strokeWidth={2} strokeDasharray="6 3" dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="lg" stroke="#a855f7" strokeWidth={2} strokeDasharray="6 3" dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
          {recipe.id === 'fried-fish' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10">
               <i className="fas fa-chart-line text-8xl text-white"></i>
            </div>
          )}
        </div>
      </div>

      <div className="glass p-6 rounded-3xl flex flex-col border border-white/5 h-full overflow-hidden">
        <h4 className="text-emerald-400 font-black mb-4 flex items-center gap-2 uppercase tracking-widest text-sm">
           <i className="fas fa-eye"></i> Ground Truth Analysis
        </h4>
        <div className="flex-1 space-y-4 overflow-y-auto text-[11px] font-mono custom-scrollbar pr-2 mb-6">
          <div className="p-3 bg-slate-900/80 rounded-xl border-l-4 border-emerald-500">
             <span className="text-emerald-400 font-bold">[CORE DIFF]</span> <b>센서 위치가 품질을 결정합니다.</b><br/>
             삼성/LG의 'Blind' 센서는 유리 상판 가열 후 2차적으로 온도를 추측합니다. 특히 튀김처럼 온도가 급변하는 조리에서 치명적인 오차가 발생합니다.
          </div>
          {isActive && (
            <>
              {recipe.id === 'fried-fish' && (
                <div className="p-3 bg-blue-500/10 rounded-xl border-l-4 border-blue-500">
                  <span className="text-blue-400 font-bold">[SENSING]</span> <b>냉동 생선 투입 감지</b><br/>
                  AI-Induction은 용기 바닥 온도 하락을 0.05초 내에 감지하여 즉각 보상 가열합니다. 경쟁사는 10초 이상 지연되어 기름이 식고 눅눅해집니다.
                </div>
              )}
              {recipe.id === 'fried-fish' && time > 80 && (
                <div className="p-3 bg-red-500/10 rounded-xl border-l-4 border-red-500">
                  <span className="text-red-400 font-bold">[CRITICAL]</span> <b>오버슈트 경고</b><br/>
                  Blind AI가 뒤늦게 가열을 시작하여 195°C 이상으로 오버슈트하고 있습니다. 튀김 옷이 타고 발암 물질이 형성될 수 있는 위험 구간입니다.
                </div>
              )}
              <div className="p-3 bg-orange-500/10 rounded-xl border-l-4 border-orange-500">
                <span className="text-orange-400 font-bold">[ECONOMY]</span> <b>불필요한 에너지 소모</b><br/>
                정밀 제어가 안 되는 경쟁사 모델은 온도를 맞추기 위해 잦은 과가열을 반복하며 AI-Induction 대비 30% 더 많은 전기를 씁니다.
              </div>
            </>
          )}
        </div>
        <div className="bg-emerald-500/20 p-4 rounded-2xl border border-emerald-500/30">
           <div className="text-[10px] font-black text-emerald-400 mb-2 uppercase">Vision AI Comparison</div>
           <div className="grid grid-cols-2 gap-2 text-[9px] text-slate-300">
              <div className="flex flex-col">
                 <span className="text-slate-500">Stability (Fried Fish)</span>
                 <span className="font-bold text-emerald-400">99.9% (Steady 180°C)</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-slate-500">Competition Stability</span>
                 <span className="font-bold text-red-400">Low (±15°C Volatile)</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CookingSimulation;

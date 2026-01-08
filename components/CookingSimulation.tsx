
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
    [Brand.AI_INDUCTION]: { time: 0, vesselTemp: 25, sensorTemp: 25, powerLevel: 0, status: '대기 중', isBoilingOver: false, energyConsumed: 0 },
    [Brand.SAMSUNG]: { time: 0, vesselTemp: 25, sensorTemp: 25, powerLevel: 0, status: '대기 중', isBoilingOver: false, energyConsumed: 0 },
    [Brand.LG]: { time: 0, vesselTemp: 25, sensorTemp: 25, powerLevel: 0, status: '대기 중', isBoilingOver: false, energyConsumed: 0 },
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
      setStates(prev => {
        const reset = {...prev};
        Object.values(Brand).forEach(b => {
          reset[b] = { ...reset[b], vesselTemp: 25, sensorTemp: 25, powerLevel: 0, status: '대기 중', isBoilingOver: false };
        });
        return reset;
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
            s.powerLevel = 0; s.status = "예약 기능 미지원"; s.vesselTemp = 25;
          } else {
            if (time < 30) { s.status = "07:00 예약 대기"; s.powerLevel = 0; }
            else if (time < 80) { s.vesselTemp += 2.8; s.status = "자율 가열 중"; s.powerLevel = 10; }
            else { s.vesselTemp = 99; s.status = "정밀 심머링"; s.powerLevel = 2; }
            s.energyConsumed += (s.powerLevel * 0.012);
            s.sensorTemp = s.vesselTemp;
          }
        } 
        else if (recipe.id === 'fried-fish') {
          if (time < 50) { // 예열 단계
            if (s.vesselTemp < 180) { s.powerLevel = 10; s.vesselTemp += 4.5; }
            else { s.vesselTemp = 180 + (Math.random() - 0.5); s.powerLevel = isAI ? 3 : 0; }
            s.status = "기름 예열 중 (180°C)";
          } else if (time < 56) { // 투입 단계
            s.vesselTemp -= 12; // 투입 직후 떨어지기 시작
            s.status = "생선 투입!";
          } else { // 튀김 및 복구 단계
            if (isAI) {
              if (s.vesselTemp < 180) { s.powerLevel = 10; s.vesselTemp += 6.5; }
              else { s.vesselTemp = 180 + (Math.random() * 0.4 - 0.2); s.powerLevel = 3.5; }
              s.status = "180°C 정밀 유지";
            } else {
              const lag = brand === Brand.SAMSUNG ? 25 : 18;
              if (time < 56 + lag) {
                s.vesselTemp -= 2.5; // 센서가 인지를 못해서 계속 떨어짐
                s.status = "온도 급락 (인지 지연)";
                s.powerLevel = 1;
              } else {
                s.powerLevel = 10; // 뒤늦게 가열
                s.vesselTemp += 8.5;
                if (s.vesselTemp > 195) {
                   s.status = "과열! (오버슈팅)";
                   s.powerLevel = 0;
                } else {
                   s.status = "지연 대응 가열 중";
                }
              }
            }
          }
          s.energyConsumed += (s.powerLevel * (isAI ? 0.012 : 0.028));
          if (isAI) s.sensorTemp = s.vesselTemp;
          else s.sensorTemp = s.sensorTemp + (s.vesselTemp - s.sensorTemp) * 0.04;
        }
        else { // 일반 (라면, 스테이크)
          s.vesselTemp += (isAI ? 2.6 : 2.2);
          if (s.vesselTemp > 95) {
            if (isAI) { s.vesselTemp = 99.5; s.powerLevel = 2; s.status = "넘침 예측 제어"; }
            else { s.vesselTemp += 1.8; if (s.vesselTemp > 105) s.isBoilingOver = true; s.status = "넘침 발생 위험"; }
          }
          s.energyConsumed += (s.powerLevel * (isAI ? 0.012 : 0.025));
          if (isAI) s.sensorTemp = s.vesselTemp;
          else s.sensorTemp = s.sensorTemp + (s.vesselTemp - s.sensorTemp) * 0.08;
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
            <div key={brand} className={`relative p-5 rounded-3xl glass border-t-4 transition-all ${
              brand === Brand.AI_INDUCTION ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-800'
            }`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{brand.split(' ')[0]}</span>
                  <span className="text-[8px] text-slate-600 font-bold italic">Premium Line 2026</span>
                </div>
                <span className={`text-[8px] px-2 py-0.5 rounded font-black ${brand === Brand.AI_INDUCTION ? 'bg-emerald-500 text-white' : 'bg-red-500/20 text-red-500'}`}>
                  {brand === Brand.AI_INDUCTION ? 'VISION AI' : 'BLIND AI'}
                </span>
              </div>

              <div className="h-28 bg-black/40 rounded-2xl relative flex items-center justify-center border border-white/5 mb-4 overflow-hidden">
                {recipe.id === 'seaweed-soup' && brand !== Brand.AI_INDUCTION && (
                   <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-red-950/90 backdrop-blur-sm p-4 text-center">
                      <i className="fas fa-lock text-red-500 mb-1 text-sm"></i>
                      <span className="text-[8px] text-white font-black leading-tight">안전 규제로<br/>기능 미지원</span>
                   </div>
                )}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-slate-600 rounded-t-lg relative z-10 shadow-lg ${states[brand].isBoilingOver ? 'boil-animation' : ''}`}>
                   <div className={`absolute bottom-0 w-full transition-all duration-300 ${recipe.id === 'fried-fish' ? 'bg-orange-500' : 'bg-emerald-400/30'}`} 
                        style={{height: `${Math.min(states[brand].vesselTemp/2.5, 98)}%`}}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Temperature</span>
                  <span className={`text-xl font-black ${brand === Brand.AI_INDUCTION ? 'text-emerald-400' : 'text-white'}`}>
                    {Math.round(states[brand].vesselTemp)}°C
                  </span>
                </div>
                <div className={`text-[9px] py-1 rounded font-black text-center uppercase tracking-tighter ${
                  states[brand].isBoilingOver ? 'bg-red-500 text-white' : 'bg-slate-900 text-slate-500'
                }`}>
                  {states[brand].status}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-64 sm:h-80 glass p-4 sm:p-6 rounded-[2rem] border border-white/5 relative overflow-hidden">
          <div className="absolute top-4 left-6 flex items-center gap-4 z-10 text-[9px] font-black uppercase">
             <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-emerald-500 rounded-full"></div><span>AI-Induction</span></div>
             <div className="flex items-center gap-1.5 opacity-40"><div className="w-3 h-3 bg-blue-500 rounded-full"></div><span>Competition (Blind)</span></div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={recipe.id === 'fried-fish' ? [20, 220] : [20, 120]} hide />
              <ReferenceLine y={recipe.id === 'fried-fish' ? 180 : 100} stroke="#334155" strokeDasharray="3 3" label={{ position: 'right', value: 'TARGET', fill: '#475569', fontSize: 10 }} />
              <Line type="monotone" dataKey="ai" stroke="#10b981" strokeWidth={5} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="samsung" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" dot={false} isAnimationActive={false} opacity={0.4} />
              <Line type="monotone" dataKey="lg" stroke="#a855f7" strokeWidth={2} strokeDasharray="5 5" dot={false} isAnimationActive={false} opacity={0.4} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass p-6 rounded-3xl flex flex-col border border-white/5 h-full">
        <h4 className="text-emerald-400 font-black mb-6 flex items-center gap-2 uppercase tracking-widest text-[10px]">
           <i className="fas fa-microchip animate-pulse"></i> Real-time Logic Log
        </h4>
        <div className="flex-1 space-y-4 overflow-y-auto text-[10px] font-mono leading-relaxed pr-2 custom-scrollbar">
          <div className="p-3 bg-slate-900/80 rounded-xl border-l-4 border-emerald-500">
             <span className="text-emerald-400 font-bold">[INFO]</span> <b>센싱의 혁명: 직접 센싱</b><br/>
             삼성/LG가 사용하는 '간접 추정' 방식은 유리 상판이 식거나 달궈질 때까지 실제 온도를 알 수 없습니다.
          </div>
          {isActive && (
            <>
              {recipe.id === 'fried-fish' && (
                <div className="p-3 bg-red-500/10 rounded-xl border-l-4 border-red-500">
                  <span className="text-red-400 font-bold">[CRITICAL]</span> <b>경쟁사 인지 지연</b><br/>
                  생선 투입으로 기름 온도가 급락했으나, Blind AI는 여전히 가열을 멈춘 상태입니다. 이 20초의 지연이 튀김을 눅눅하게 만듭니다.
                </div>
              )}
              {recipe.id === 'fried-fish' && time > 90 && (
                <div className="p-3 bg-blue-500/10 rounded-xl border-l-4 border-blue-500">
                  <span className="text-blue-400 font-bold">[CONTROL]</span> <b>AI-Induction 복구 완료</b><br/>
                  0.1초 만에 감지하여 180도로 즉시 복구했습니다. 반면 경쟁사는 이제야 가열을 시작하여 오버슈팅이 예상됩니다.
                </div>
              )}
              <div className="p-3 bg-emerald-500/10 rounded-xl border-l-4 border-emerald-500">
                <span className="text-emerald-400 font-bold">[ADVANTAGE]</span> <b>에너지 최적화</b><br/>
                불필요한 과열을 방지하여 경쟁사 대비 25% 이상의 전력 소모를 줄이고 있습니다.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookingSimulation;

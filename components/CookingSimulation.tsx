
import React, { useState, useEffect, useRef } from 'react';
import { Brand, Recipe, CookingState } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface Props {
  recipe: Recipe;
  isActive: boolean;
  onComplete: () => void;
}

const CookingSimulation: React.FC<Props> = ({ recipe, isActive, onComplete }) => {
  const [time, setTime] = useState(0);
  const [states, setStates] = useState<Record<Brand, CookingState>>({
    [Brand.AI_INDUCTION]: { time: 0, vesselTemp: 25, sensorData: { center: 25, peripheral: [25,25,25,25,25] }, powerLevel: 0, status: '대기', isBoilingOver: false, disturbanceDetected: false, energyConsumed: 0, safetyVerified: false, controlModel: 'Generative', heatUniformity: 100 },
    [Brand.SAMSUNG]: { time: 0, vesselTemp: 25, sensorData: { center: 25, peripheral: [] }, powerLevel: 0, status: '대기', isBoilingOver: false, disturbanceDetected: false, energyConsumed: 0, safetyVerified: false, controlModel: 'Static', heatUniformity: 100 },
    [Brand.LG]: { time: 0, vesselTemp: 25, sensorData: { center: 25, peripheral: [] }, powerLevel: 0, status: '대기', isBoilingOver: false, disturbanceDetected: false, energyConsumed: 0, safetyVerified: false, controlModel: 'Static', heatUniformity: 100 },
  });
  
  const [history, setHistory] = useState<any[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => setTime(prev => prev + 1), 100); 
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setTime(0);
      setHistory([]);
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
        
        if (recipe.id === 'pancake') {
          if (time < 40) {
            s.vesselTemp += (isAI ? 4.0 : 3.5);
            s.status = "팬 전체 예열 중";
            s.powerLevel = 10;
            s.heatUniformity = isAI ? 95 : 80;
          } else if (time < 90) {
            if (isAI) {
              s.status = "Uniformity Boost: 외곽 전도 유도";
              s.vesselTemp = 160 + Math.random()*5;
              s.powerLevel = 4; // 펄스 제어 상징
              s.heatUniformity = 92 + Math.random()*5;
            } else {
              s.status = "중앙 과열 진행 중 (외곽 미열)";
              s.vesselTemp += 2.0;
              s.heatUniformity = Math.max(40, (s.heatUniformity || 80) - 1.5);
              if (s.vesselTemp > 185) s.disturbanceDetected = true; // 타기 시작
            }
          } else {
             if (isAI) {
               s.status = "전체 균일 익힘 상태 유지";
               s.vesselTemp = 175;
               s.powerLevel = 3;
               s.heatUniformity = 98;
             } else {
               s.status = "중앙 탄화(Burn) 발생";
               s.vesselTemp = 210;
               s.heatUniformity = 35;
             }
          }
        } else if (recipe.id === 'ramen') {
          if (time < 40) {
            s.vesselTemp < 100 ? s.vesselTemp += (isAI ? 2.5 : 2.0) : s.vesselTemp = 100;
            s.status = "물 가열 중 (PCB 코일 효율 가속)";
            s.powerLevel = 10;
          } else if (time < 50) {
            if (isAI) { s.status = "비점 정확 포착! 면 투입 알림"; s.vesselTemp = 100; s.powerLevel = 5; }
            else { s.status = "유리 온도 지연 인지 중"; s.vesselTemp = 102; s.isBoilingOver = true; }
          } else {
            if (isAI) { s.vesselTemp = 99 + Math.random()*2; s.status = "면 식감 최적화 온도 제어"; }
            else { s.vesselTemp = 106; s.status = "과열(면 불음 발생)"; }
          }
        } else if (recipe.id === 'fried-fish') {
          if (time < 50) {
            s.vesselTemp < 180 ? (s.vesselTemp += 5.0, s.powerLevel = 10) : (s.powerLevel = 2);
            s.status = "튀김 온도 예열";
          } else if (time < 60) {
            s.vesselTemp -= 20;
            s.disturbanceDetected = true;
            s.status = "재료 투입 즉각 감지 (0.1s)";
          } else {
            if (isAI) {
              s.vesselTemp < 180 ? (s.vesselTemp += 8, s.powerLevel = 10) : (s.vesselTemp = 180, s.powerLevel = 3);
              s.status = "생성형 제어: 180°C 안전 리밋 유지";
            } else {
              if (time < 85) { s.status = "온도 하락 인지 지연"; s.powerLevel = 2; }
              else { s.powerLevel = 10; s.vesselTemp += 9; s.status = "과열 오버슈팅 (탄화 위험)"; }
            }
          }
        } else if (recipe.id === 'reservation') {
          if (isAI) {
            if (time < 70) {
              s.vesselTemp += 1.5;
              s.status = "예약 조리: 목표 온도로 정밀 가열";
              s.powerLevel = 6;
            } else {
              s.vesselTemp = 85;
              s.status = "조리물 실측: 안전 보온 모드 전환";
              s.powerLevel = 2;
            }
          } else {
            // 기성 제품은 지능형 예약 가열을 지원하지 않거나 단순 타이머만 가능
            s.vesselTemp = 25; 
            s.status = "기능 미지원 (안전 규제 제한)";
            s.powerLevel = 0;
            if (time > 10) {
               s.status = "원격 예약 가열 불가 (화재 위험)";
            }
          }
        }
      });

      setHistory(hPrev => [...hPrev, { 
        time, 
        ai: Math.round(next[Brand.AI_INDUCTION].vesselTemp), 
        competitor: Math.round(next[Brand.SAMSUNG].vesselTemp) 
      }].slice(-100));
      return next;
    });
  }, [time, isActive, recipe.id]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.values(Brand).map(brand => {
            const isAI = brand === Brand.AI_INDUCTION;
            const s = states[brand];
            return (
              <div key={brand} className={`p-6 rounded-[2.5rem] glass border relative overflow-hidden transition-all duration-300 ${isAI ? 'border-emerald-500/50 bg-emerald-500/5 shadow-glow-emerald' : 'border-white/5 opacity-70'}`}>
                {recipe.id === 'reservation' && !isAI && (
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] z-10 flex items-center justify-center p-4 text-center">
                    <div className="bg-red-500/20 border border-red-500/40 text-red-400 text-[10px] font-black px-3 py-2 rounded-xl uppercase tracking-tighter">
                      No Reservation Logic<br/>(Safety Constraint)
                    </div>
                  </div>
                )}
                {s.disturbanceDetected && !isAI && recipe.id === 'pancake' && (
                  <div className="absolute inset-0 bg-orange-600/10 animate-pulse flex items-center justify-center">
                    <div className="bg-red-600/90 text-xs font-black px-4 py-1.5 rounded-full text-white shadow-2xl tracking-widest">CENTER BURNING</div>
                  </div>
                )}
                <div className="flex justify-between items-center mb-6">
                   <div className="flex flex-col">
                      <span className="text-xs font-black text-slate-500 uppercase tracking-tighter">{brand.split(' ')[0]}</span>
                      <span className="text-[10px] text-slate-600 font-bold">{isAI ? 'Multi-Sensing (210/220)' : 'Blind Central Sensing'}</span>
                   </div>
                   {isAI && <div className={`w-3 h-3 rounded-full ${s.heatUniformity && s.heatUniformity > 90 ? 'bg-emerald-500 animate-pulse' : 'bg-orange-500'}`}></div>}
                </div>
                
                <div className="text-5xl font-black italic mb-2 text-center tracking-tighter">
                   {Math.round(s.vesselTemp)}<span className="text-xl font-normal not-italic text-slate-500">°C</span>
                </div>

                {/* Uniformity Gauge */}
                <div className="mb-6 space-y-1">
                   <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase">
                      <span>Heat Uniformity</span>
                      <span className={isAI ? 'text-emerald-400' : 'text-orange-400'}>{Math.round(s.heatUniformity || 0)}%</span>
                   </div>
                   <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-500 ${isAI ? 'bg-emerald-500' : 'bg-orange-500'}`} style={{width: `${s.heatUniformity}%`}}></div>
                   </div>
                </div>

                <div className={`py-3 rounded-2xl text-xs font-black text-center uppercase tracking-widest ${isAI ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                  {s.status}
                </div>
                
                <div className="mt-6 flex gap-1 h-2 bg-slate-900 rounded-full overflow-hidden">
                   <div className={`h-full transition-all duration-300 ${isAI ? 'bg-gradient-to-r from-emerald-500 to-blue-500 shadow-[0_0_10px_#10b981]' : 'bg-slate-700'}`} style={{width: `${(s.vesselTemp/220)*100}%`}}></div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="h-72 glass p-8 rounded-[3rem] border border-white/5 relative overflow-hidden">
           <div className="absolute top-4 left-8 text-xs font-black text-slate-500 uppercase tracking-widest">Real-time Multi-Point Heat Gradient</div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <defs>
                <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={[20, 240]} hide />
              <ReferenceLine y={180} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'right', value: 'Safety Limit', fill: '#ef4444', fontSize: 10 }} />
              <Area type="monotone" dataKey="ai" stroke="#10b981" strokeWidth={4} fill="url(#colorAi)" isAnimationActive={false} />
              <Area type="monotone" dataKey="competitor" stroke="#f97316" strokeWidth={1.5} fill="transparent" strokeDasharray="6 4" isAnimationActive={false} opacity={0.4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="glass p-10 rounded-[3rem] border border-white/5 flex flex-col justify-start gap-6 relative overflow-hidden min-h-[500px]">
         <div className="absolute -right-20 -top-20 w-40 h-40 bg-emerald-500/10 blur-[100px] rounded-full"></div>
         <div className="space-y-4">
            <h5 className="text-xs font-black text-emerald-400 uppercase tracking-[0.4em]">Efficiency Core Drivers</h5>
            <p className="text-2xl font-bold leading-[1.1] tracking-tight text-white italic">"중앙 과열을 억제하고 전체 균일도를 확보"</p>
         </div>

         <div className="grid grid-cols-1 gap-4 pt-4">
            {[
              { icon: 'fa-arrows-left-right-to-line', title: 'Intelligent Heat Balancing', desc: '중앙과 외곽의 온도 편차를 분석하여 펄스 화력 제어로 열 평형을 유지합니다.' },
              { icon: 'fa-shield-halved', title: '180°C Safety Hard-Limit', desc: '어떤 레시피에서도 상판 온도가 180°C를 넘지 않도록 강제 제어하여 탄화를 방지합니다.' },
              { icon: 'fa-microchip', title: 'PCB 적층 워킹코일', desc: '고밀도 설계로 에너지 전달 손실을 최소화하고 가열 속도를 비약적으로 향상합니다.' },
              { icon: 'fa-expand-arrows-alt', title: '맞춤형 용기 가열', desc: '용기 크기를 정밀 식별하여 팬 외곽까지 효율적으로 열을 전달합니다.' }
            ].map((item, idx) => (
              <div key={idx} className="group p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/20 transition-all flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-all">
                  <i className={`fas ${item.icon} text-emerald-400 group-hover:text-white text-sm`}></i>
                </div>
                <div className="space-y-1">
                  <h6 className="text-sm font-black text-white uppercase tracking-tighter">{item.title}</h6>
                  <p className="text-sm text-slate-400 leading-tight font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
         </div>

         <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Control Status</span>
              <span className="text-sm font-bold text-emerald-400 italic">UNIFORMITY BOOST ACTIVE</span>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Energy Class</span>
              <span className="text-lg font-black text-white italic tracking-tighter">NEXT-GEN S+</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CookingSimulation;

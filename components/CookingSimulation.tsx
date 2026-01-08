
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
    [Brand.AI_INDUCTION]: { time: 0, vesselTemp: 25, sensorData: { center: 25, peripheral: [25,25,25,25,25] }, powerLevel: 0, status: '대기', isBoilingOver: false, disturbanceDetected: false, energyConsumed: 0, safetyVerified: false, controlModel: 'Generative' },
    [Brand.SAMSUNG]: { time: 0, vesselTemp: 25, sensorData: { center: 25, peripheral: [] }, powerLevel: 0, status: '대기', isBoilingOver: false, disturbanceDetected: false, energyConsumed: 0, safetyVerified: false, controlModel: 'Static' },
    [Brand.LG]: { time: 0, vesselTemp: 25, sensorData: { center: 25, peripheral: [] }, powerLevel: 0, status: '대기', isBoilingOver: false, disturbanceDetected: false, energyConsumed: 0, safetyVerified: false, controlModel: 'Static' },
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
        
        if (recipe.id === 'ramen') {
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
        } else if (recipe.id === 'kimchi-stew') {
          if (time < 50) {
            s.vesselTemp < 100 ? s.vesselTemp += (isAI ? 2.2 : 1.8) : s.vesselTemp = 100;
            s.status = "초기 가열";
          } else {
            if (isAI) {
              s.vesselTemp = 94 + Math.random()*1;
              s.status = "외란 분석: 넘침 방지 심머링";
              s.powerLevel = 3;
            } else {
              s.vesselTemp = 104;
              s.status = "끓어 넘침 (사후 전원 차단)";
              s.isBoilingOver = true;
              s.powerLevel = 10;
            }
          }
        } else if (recipe.id === 'seaweed-soup') {
          if (!isAI) {
            s.status = "안전 센서 부재로 예약 불가";
            s.powerLevel = 0;
          } else {
            if (time < 30) {
              s.status = "센서 안전 확증 (내용물 확인)";
              s.safetyVerified = true;
            } else if (time < 80) {
              s.powerLevel = 10;
              s.vesselTemp += 2.5;
              s.status = "자율 예약 가열 진행";
            } else {
              s.vesselTemp = 99;
              s.status = "기상 시간 최적 보온";
            }
          }
        } else if (recipe.id === 'fried-fish') {
          if (time < 50) {
            s.vesselTemp < 180 ? (s.vesselTemp += 5.0, s.powerLevel = 10) : (s.powerLevel = 2);
            s.status = "튀김 온도 예열";
          } else if (time < 60) {
            s.vesselTemp -= 20; // 재료 투입
            s.disturbanceDetected = true;
            s.status = "재료 투입 즉각 감지 (0.1s)";
          } else {
            if (isAI) {
              s.vesselTemp < 180 ? (s.vesselTemp += 8, s.powerLevel = 10) : (s.vesselTemp = 180 + Math.random(), s.powerLevel = 3);
              s.status = "생성형 제어: 실시간 온도 복구";
            } else {
              if (time < 85) { s.status = "온도 하락 인지 지연"; s.powerLevel = 2; }
              else { s.powerLevel = 10; s.vesselTemp += 9; s.status = "과열 오버슈팅"; }
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
                {s.isBoilingOver && !isAI && (
                  <div className="absolute inset-0 bg-blue-500/10 animate-pulse flex items-center justify-center">
                    <div className="bg-red-600/90 text-[10px] font-black px-4 py-1.5 rounded-full text-white shadow-2xl">OVERBOILING DETECTED</div>
                  </div>
                )}
                <div className="flex justify-between items-center mb-6">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{brand.split(' ')[0]}</span>
                      <span className="text-[8px] text-slate-600 font-bold">{isAI ? 'Patent Sensing' : 'Blind Sensing'}</span>
                   </div>
                   {isAI && s.safetyVerified && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>}
                </div>
                <div className="text-5xl font-black italic mb-6 text-center tracking-tighter">
                   {Math.round(s.vesselTemp)}<span className="text-xl font-normal not-italic text-slate-500">°C</span>
                </div>
                <div className={`py-3 rounded-2xl text-[10px] font-black text-center uppercase tracking-widest ${isAI ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                  {s.status}
                </div>
                <div className="mt-6 flex gap-1 h-2 bg-slate-900 rounded-full overflow-hidden">
                   <div className={`h-full transition-all duration-300 ${isAI ? 'bg-gradient-to-r from-emerald-500 to-blue-500' : 'bg-slate-700'}`} style={{width: `${(s.vesselTemp/200)*100}%`}}></div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="h-72 glass p-8 rounded-[3rem] border border-white/5 relative overflow-hidden">
           <div className="absolute top-4 left-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Real-time Heat Map Analytics</div>
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
              <YAxis domain={[20, 220]} hide />
              <ReferenceLine y={recipe.targetTemp} stroke="#334155" strokeDasharray="5 5" label={{ position: 'right', value: 'Target', fill: '#475569', fontSize: 10 }} />
              <Area type="monotone" dataKey="ai" stroke="#10b981" strokeWidth={4} fill="url(#colorAi)" isAnimationActive={false} />
              <Area type="monotone" dataKey="competitor" stroke="#3b82f6" strokeWidth={1.5} fill="transparent" strokeDasharray="6 4" isAnimationActive={false} opacity={0.4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Updated Efficiency Summary Section */}
      <div className="glass p-10 rounded-[3rem] border border-white/5 flex flex-col justify-start gap-6 relative overflow-hidden min-h-[500px]">
         <div className="absolute -right-20 -top-20 w-40 h-40 bg-emerald-500/10 blur-[100px] rounded-full"></div>
         <div className="space-y-4">
            <h5 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em]">Efficiency Core Drivers</h5>
            <p className="text-2xl font-bold leading-[1.1] tracking-tight text-white italic">"지능형 가열로 완성하는 압도적 효율"</p>
         </div>

         <div className="grid grid-cols-1 gap-4 pt-4">
            {[
              { icon: 'fa-microchip', title: 'PCB 적층 워킹코일', desc: '고밀도 적층 설계로 에너지 전달 손실을 최소화하고 가열 속도를 가속합니다.' },
              { icon: 'fa-expand-arrows-alt', title: '맞춤형 용기 가열', desc: '용기 크기와 재질을 정밀 식별하여 불필요한 열 방산을 원천 차단합니다.' },
              { icon: 'fa-bolt', title: '생성형 동적 제어', desc: '고정된 출력이 아닌 실시간 상태별 미세 화력 조절로 과소비를 방지합니다.' },
              { icon: 'fa-layer-group', title: '분리형 하드웨어 구조', desc: '가열부와 제어부의 분리로 내구성을 높이고 유지 관리 효율을 극대화합니다.' }
            ].map((item, idx) => (
              <div key={idx} className="group p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/20 transition-all flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-all">
                  <i className={`fas ${item.icon} text-emerald-400 group-hover:text-white text-sm`}></i>
                </div>
                <div className="space-y-1">
                  <h6 className="text-[11px] font-black text-white uppercase tracking-tighter">{item.title}</h6>
                  <p className="text-[10px] text-slate-400 leading-tight font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
         </div>

         <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">System Status</span>
              <span className="text-xs font-bold text-emerald-400">OPTIMIZED FLOW</span>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Energy Class</span>
              <span className="text-lg font-black text-white italic tracking-tighter">NEXT-GEN S+</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CookingSimulation;


import React from 'react';

const ComparisonTable: React.FC = () => {
  const comparisonData = [
    {
      category: "핵심 센서",
      samsungLg: "상판 하부 접촉식 / 외부 무선 프로브",
      smartCooking: "비접촉(IR) + 접촉식 다각도 배치",
      patentTech: "열원 외부 오프셋 직접 접촉 센서",
      highlight: true
    },
    {
      category: "조리 자동화",
      samsungLg: "수동 출력/시간 조절 중심 (레시피 스캔)",
      smartCooking: "생성형 AI 모델의 조리 형태 스스로 인지",
      patentTech: "센서 기반 화력 및 목표 온도 직접 제어",
      highlight: false
    },
    {
      category: "용기 인식",
      samsungLg: "용기 유무 및 대략적 크기 인식",
      smartCooking: "정밀 위치, 크기, 재질, 형상 자동 식별",
      patentTech: "바닥 평탄도 상관없이 밀착 감지",
      highlight: false
    },
    {
      category: "돌발 상황 대응",
      samsungLg: "과열 시 전원 차단 (사후 대응)",
      smartCooking: "외란 패턴(넘침, 오염) 실시간 AI 분석",
      patentTech: "95°C부터 화력 조절로 넘침 사전 방지",
      highlight: true
    },
    {
      category: "하드웨어 특징",
      samsungLg: "일체형 상판 / 일반 워킹코일",
      smartCooking: "생성형 제어 모델 / 실시간 맞춤 조리",
      patentTech: "분리 상판(원가 절감) / PCB 적층 코일",
      highlight: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-[2.5rem] glass border border-white/5 shadow-3xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/50 border-b border-white/10">
              <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">비교 항목</th>
              <th className="p-6 text-[10px] font-black text-blue-400 uppercase tracking-widest">삼성 / LG (기성 제품)</th>
              <th className="p-6 text-[10px] font-black text-emerald-400 uppercase tracking-widest">AI-Induction (스마트 쿠킹)</th>
              <th className="p-6 text-[10px] font-black text-amber-400 uppercase tracking-widest">AI-Induction (특허 기술)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {comparisonData.map((row, idx) => (
              <tr key={idx} className={`group transition-colors ${row.highlight ? 'bg-emerald-500/5' : 'hover:bg-white/5'}`}>
                <td className="p-6 text-xs font-bold text-slate-400">{row.category}</td>
                <td className="p-6 text-[11px] text-slate-500 italic">{row.samsungLg}</td>
                <td className="p-6 text-[11px] text-emerald-100 font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                    {row.smartCooking}
                  </div>
                </td>
                <td className="p-6 text-[11px] text-amber-100 font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></div>
                    {row.patentTech}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <div className="glass px-6 py-3 rounded-2xl border border-emerald-500/20 flex items-center gap-3">
          <span className="text-[10px] font-black text-emerald-400 uppercase">AI-Logic</span>
          <span className="text-xs text-slate-400">실시간 생성형 제어 모델로 조리 상황별 맞춤 대응</span>
        </div>
        <div className="glass px-6 py-3 rounded-2xl border border-amber-500/20 flex items-center gap-3">
          <span className="text-[10px] font-black text-amber-400 uppercase">Patent-08883</span>
          <span className="text-xs text-slate-400">오프셋 센서 배치로 온도 측정 정확도 극대화</span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;

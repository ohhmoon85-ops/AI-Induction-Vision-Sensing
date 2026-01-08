
import React from 'react';

const ComparisonTable: React.FC = () => {
  const data = [
    {
      feature: "핵심 센싱 메커니즘",
      ai: "Vision Sensing (직접 접촉 - 눈을 뜸)",
      others: "Blind Sensing (추정/간접 - 눈을 감음)",
      impact: "지연 없는 실시간 데이터 확보"
    },
    {
      feature: "튀김 온도 유지 (180°C)",
      ai: "오차 ±1°C 내 철저 유지 (바삭함)",
      others: "오차 ±15°C 이상 발생 (눅눅함/타버림)",
      impact: "튀김 조리의 성패를 가르는 정밀도"
    },
    {
      feature: "자율 예약/원격 조리",
      ai: "완전 지원 (상태 확신 기반 안전 확보)",
      others: "지원 불가 (화재 위험 및 규제 제한)",
      impact: "아침 식사 자동화 등 라이프스타일 혁명"
    },
    {
      feature: "에너지 효율 (Efficiency)",
      ai: "최적 화력 유지로 전력 25% 절감",
      others: "오버슈팅 및 잦은 재가열로 전력 낭비",
      impact: "누적 전기료 및 탄소 배출량의 결정적 차이"
    },
    {
      feature: "반응 속도 (Latency)",
      ai: "0.1초 미만 (Interrupt 방식)",
      others: "3초 ~ 7초 (Inference 방식)",
      impact: "튀김/스테이크 조리 품질의 극명한 차이"
    }
  ];

  return (
    <div className="overflow-x-auto rounded-3xl glass border border-white/5 shadow-2xl">
      <table className="min-w-full divide-y divide-slate-800">
        <thead className="bg-slate-900/80">
          <tr>
            <th className="px-4 lg:px-6 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">구분</th>
            <th className="px-4 lg:px-6 py-5 text-left text-[10px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/5">AI-Induction</th>
            <th className="px-4 lg:px-6 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest italic">기존 대기업 (Blind)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50 bg-slate-900/30">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-white/5 transition-colors">
              <td className="px-4 lg:px-6 py-4 text-xs font-bold text-slate-300">{row.feature}</td>
              <td className="px-4 lg:px-6 py-4 text-xs font-extrabold text-white bg-emerald-500/5">
                <i className="fas fa-check-circle text-emerald-400 mr-2"></i> {row.ai}
              </td>
              <td className="px-4 lg:px-6 py-4 text-xs text-slate-500 italic">
                {row.others.includes("지원 불가") || row.others.includes("±15°C") ? (
                  <span className="text-red-400/70"><i className="fas fa-times-circle mr-1"></i> {row.others}</span>
                ) : row.others}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;

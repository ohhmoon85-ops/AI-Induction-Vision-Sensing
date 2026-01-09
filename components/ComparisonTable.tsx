
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
      category: "열 분포 제어",
      samsungLg: "중앙 집중 가열 (중앙 과열/외곽 미가열)",
      smartCooking: "다지점 분석 기반 열 편차 자동 보정",
      patentTech: "Uniformity Boost 펄스 화력 제어",
      highlight: true
    },
    {
      category: "지능형 예약 조리",
      samsungLg: "미지원 (화재 위험 및 정밀 센서 부재로 불가)",
      smartCooking: "센서 기반 자동 화력 조절 예약 시스템",
      patentTech: "목표 온도 도달 시 보온 자동 전환",
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
      category: "안전 최대 온도",
      samsungLg: "소재 한계까지 가열 (탄화 위험)",
      smartCooking: "지능형 180°C 하드 리밋 (Safety Lock)",
      patentTech: "과열 전조 증상 0.1초 즉각 감지",
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
    }
  ];

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-[2.5rem] glass border border-white/5 shadow-3xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/50 border-b border-white/10">
              <th className="p-6 text-xs font-black text-slate-500 uppercase tracking-widest">비교 항목</th>
              <th className="p-6 text-xs font-black text-blue-400 uppercase tracking-widest">S사 / L사 (기성 제품)</th>
              <th className="p-6 text-xs font-black text-emerald-400 uppercase tracking-widest">AI-Induction (스마트 쿠킹)</th>
              <th className="p-6 text-xs font-black text-amber-400 uppercase tracking-widest">AI-Induction (특허 기술)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {comparisonData.map((row, idx) => (
              <tr key={idx} className={`group transition-colors ${row.highlight ? 'bg-emerald-500/5' : 'hover:bg-white/5'}`}>
                <td className="p-6 text-sm font-bold text-slate-400">{row.category}</td>
                <td className="p-6 text-sm text-slate-500 italic">
                  {row.category === "지능형 예약 조리" ? (
                    <span className="text-red-400/80 font-bold underline decoration-red-500/30 underline-offset-4">{row.samsungLg}</span>
                  ) : row.samsungLg}
                </td>
                <td className="p-6 text-sm text-emerald-100 font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                    {row.smartCooking}
                  </div>
                </td>
                <td className="p-6 text-sm text-amber-100 font-medium">
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
      <div className="flex flex-col md:flex-row gap-4 justify-center text-center px-4">
        <div className="glass px-6 py-4 rounded-2xl border border-red-500/20 flex flex-col items-center gap-1">
          <span className="text-sm font-black text-red-400 uppercase">기성제품 한계</span>
          <span className="text-xs text-slate-400">실시간 조리물 상태(비점, 수분량) 확인 불가로 원격/예약 가열 시 화재 위험 존재</span>
        </div>
        <div className="glass px-6 py-4 rounded-2xl border border-emerald-500/20 flex flex-col items-center gap-1">
          <span className="text-sm font-black text-emerald-400 uppercase">AI-Induction 솔루션</span>
          <span className="text-xs text-slate-400">비접촉 IR 센서로 조리물 온도를 직접 읽어 끓어넘침 및 빈 냄비 가열 원천 차단</span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;

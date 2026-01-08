
export enum Brand {
  AI_INDUCTION = 'AI-Induction',
  SAMSUNG = 'Samsung Bespoke AI Infinite',
  LG = 'LG DIOS Objet Collection'
}

export interface CookingState {
  time: number; // seconds
  vesselTemp: number; // Celsius
  sensorTemp: number; // What the machine thinks
  powerLevel: number; // 0-10
  status: string;
  isBoilingOver: boolean;
  energyConsumed: number; // kWh (simulated)
}

export interface Recipe {
  id: string;
  name: string;
  targetTemp: number;
  stages: { time: number; instruction: string }[];
  icon: string;
}

export const RECIPES: Recipe[] = [
  {
    id: 'seaweed-soup',
    name: '아침 7시 미역국 (Reservation)',
    targetTemp: 100,
    icon: '🥣',
    stages: [
      { time: 0, instruction: '예약 대기 모드 (07:00)' },
      { time: 20, instruction: '조리 시작 (자동 가열)' },
      { time: 60, instruction: '미세 심머링 (맛 우려내기)' }
    ]
  },
  {
    id: 'ramen',
    name: '라면 끓이기 (Ramen)',
    targetTemp: 100,
    icon: '🍜',
    stages: [
      { time: 0, instruction: '가열 시작' },
      { time: 30, instruction: '면/스프 투입' },
      { time: 60, instruction: '끓어넘침 임계점 도달' }
    ]
  },
  {
    id: 'fried-fish',
    name: '생선 튀김 (Fried Fish)',
    targetTemp: 180,
    icon: '🐟',
    stages: [
      { time: 0, instruction: '기름 예열 시작' },
      { time: 50, instruction: '생선 투입 (온도 급감)' },
      { time: 100, instruction: '바삭한 질감 유지' }
    ]
  },
  {
    id: 'steak',
    name: '스테이크 (Steak)',
    targetTemp: 220,
    icon: '🥩',
    stages: [
      { time: 0, instruction: '팬 예열' },
      { time: 40, instruction: '고기 투입' },
      { time: 80, instruction: '온도 복구 및 시어링' }
    ]
  }
];

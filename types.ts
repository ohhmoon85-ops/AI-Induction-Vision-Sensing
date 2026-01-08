
export enum Brand {
  AI_INDUCTION = 'AI-Induction (Patent Offset Sensing)',
  SAMSUNG = 'S사 Bespoke AI (Blind Sensing)',
  LG = 'L사 DIOS (Blind Sensing)'
}

export interface SensorData {
  center: number;
  peripheral: number[];
}

export interface CookingState {
  time: number;
  vesselTemp: number;
  sensorData: SensorData;
  powerLevel: number;
  status: string;
  isBoilingOver: boolean;
  disturbanceDetected: boolean;
  energyConsumed: number;
  safetyVerified: boolean; // 특허 기반 안전 확증 상태
  controlModel: 'Generative' | 'Static';
}

export interface Recipe {
  id: string;
  name: string;
  targetTemp: number;
  stages: { time: number; instruction: string }[];
  icon: string;
  description: string;
  safetyRequirement: string;
}

export const RECIPES: Recipe[] = [
  {
    id: 'ramen',
    name: '라면 끓이기 (Ramen)',
    targetTemp: 100,
    icon: '🍜',
    safetyRequirement: '비점 감지 및 화력 즉각 전환',
    description: '특허 10-2708883: 물이 끓는 순간(100도)을 정확히 포착하여 면 투입 알림을 제공하고, 면 투입 시의 온도 변화를 즉각 보상합니다.',
    stages: [
      { time: 0, instruction: '가열 시작' },
      { time: 40, instruction: '비점 도달 (면 투입 알림)' },
      { time: 80, instruction: '최적 식감 유지 가열' }
    ]
  },
  {
    id: 'kimchi-stew',
    name: '김치찌개 (Kimchi Stew)',
    targetTemp: 100,
    icon: '🥘',
    safetyRequirement: '장시간 심머링 및 넘침 방지',
    description: '특허 10-2022-0021808: 찌개가 끓어 넘치기 직전의 미세한 파동을 감지하여 화력을 조절, 깊은 맛을 내는 최적의 심머링 온도를 유지합니다.',
    stages: [
      { time: 0, instruction: '초기 가열' },
      { time: 50, instruction: '비점 감지 및 화력 다운' },
      { time: 100, instruction: '지능형 심머링 (깊은 맛 추출)' }
    ]
  },
  {
    id: 'seaweed-soup',
    name: '아침 자율 예약 조리 (Morning Reservation)',
    targetTemp: 100,
    icon: '🥣',
    safetyRequirement: '용기 내 내용물 유무 실측 필요',
    description: '특허 10-2708883: 열원부를 벗어난 곳에서 온도를 직접 측정하여 넘침을 사전에 방지하고 안전을 확증합니다.',
    stages: [
      { time: 0, instruction: '예약 대기 모드' },
      { time: 20, instruction: '센서 어레이 안전 확증 (Safety Lock ON)' },
      { time: 50, instruction: '자율 가열 시작' }
    ]
  },
  {
    id: 'fried-fish',
    name: '정밀 온도 튀김 (Fried Fish)',
    targetTemp: 180,
    icon: '🐟',
    safetyRequirement: '급격한 온도 하락 실시간 복구',
    description: '특허 10-2022-0021808: 냉동 생선 투입으로 인한 온도 급락을 0.1초 만에 감지하여 180도를 유지합니다.',
    stages: [
      { time: 0, instruction: '가열 시작' },
      { time: 60, instruction: '냉동 생선 투입' },
      { time: 100, instruction: '복구 완료' }
    ]
  }
];

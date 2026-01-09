
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
  safetyVerified: boolean;
  controlModel: 'Generative' | 'Static';
  heatUniformity?: number; // 열 균일도 (0-100%)
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
    id: 'pancake',
    name: '전·부침 요리 (Uniform Pancake)',
    targetTemp: 175,
    icon: '🥞',
    safetyRequirement: '중앙-외곽 온도 편차 30°C 이내 유지',
    description: '특허 기술 기반 열 분포 최적화: 중앙(210)과 주변부(220)의 온도차를 실시간 분석하여 전이 타지 않도록 화력을 펄스 제어합니다. (최대 180°C 제한 안전 설계)',
    stages: [
      { time: 0, instruction: '팬 예열 및 균일도 체크' },
      { time: 40, instruction: '재료 투입 및 Uniformity Boost 활성' },
      { time: 80, instruction: '외곽 전도 대기 및 최적 온도 유지' }
    ]
  },
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
    id: 'fried-fish',
    name: '정밀 온도 튀김 (Fried Fish)',
    targetTemp: 180,
    icon: '🐟',
    safetyRequirement: '급격한 온도 하락 실시간 복구',
    description: '특허 10-2022-0021808: 냉동 생선 투입으로 인한 온도 급락을 0.1초 만에 감지하여 180도를 초과하지 않도록 안전하게 유지합니다.',
    stages: [
      { time: 0, instruction: '가열 시작' },
      { time: 60, instruction: '냉동 생선 투입' },
      { time: 100, instruction: '복구 완료' }
    ]
  },
  {
    id: 'reservation',
    name: '지능형 예약 조리 (Smart Timer)',
    targetTemp: 85,
    icon: '⏲️',
    safetyRequirement: '저온 유지 및 화재 원천 차단',
    description: '단순 타이머가 아닌 센서 실측 기반 예약: 목표 온도 도달 시 화력을 조절하여 보온 모드로 자동 전환하며, 수분 부족 시 안전하게 차단합니다.',
    stages: [
      { time: 0, instruction: '예약 가열 시작' },
      { time: 60, instruction: '목표 온도 도달 및 저온 유지' },
      { time: 120, instruction: '조리 완료 및 자동 보온' }
    ]
  }
];

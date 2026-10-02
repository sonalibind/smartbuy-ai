export interface Laptop {
  id: number;
  name: string;
  brand: string;
  price: number;
  processor: string;
  ram: number;
  storage: number;
  graphics: string;
  batteryHours: number;
  weight: number;
  useCases: string[];
  performanceScore: number;
  portabilityScore: number;
}

export const laptops: Laptop[];

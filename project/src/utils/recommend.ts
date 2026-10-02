import { laptops, type Laptop } from '@/data/laptops';

export interface Recommendation {
  laptop: Laptop;
  score: number;
  reasons: string[];
}

// Maps natural-language keywords found in the user's query to the useCase
// tags stored on each laptop in the dataset.
const KEYWORD_MAP: Record<string, string[]> = {
  coding: ['code', 'coding', 'programming', 'developer', 'software', 'python', 'java', 'javascript', 'react', 'ide', 'dev', 'script'],
  gaming: ['game', 'gaming', 'fps', 'minecraft', 'valorant', 'pubg', 'gta', 'esports', 'steam'],
  design: ['design', 'editing', 'video', 'photoshop', 'premiere', 'after effects', 'render', 'rendering', 'graphic', 'creative', '3d', 'blender', 'autocad', 'cad', 'modeling'],
  office: ['office', 'work', 'business', 'corporate', 'meeting', 'presentation', 'excel', 'word', 'powerpoint', 'spreadsheet', 'professional'],
  student: ['student', 'college', 'school', 'university', 'exam', 'study', 'assignment', 'homework', 'class'],
  browsing: ['browse', 'browsing', 'web', 'internet', 'youtube', 'netflix', 'streaming', 'movies', 'watch'],
};

// Hints extracted from the query for non-use-case preferences.
interface QueryHints {
  useCases: string[];
  needsHighRam: boolean;
  needsLongBattery: boolean;
  needsPortable: boolean;
  needsHighPerformance: boolean;
  needsDedicatedGraphics: boolean;
}

function parseQuery(query: string): QueryHints {
  const lower = query.toLowerCase();

  const matchedUseCases: string[] = [];
  for (const [useCase, keywords] of Object.entries(KEYWORD_MAP)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      matchedUseCases.push(useCase);
    }
  }

  const needsHighRam = /\b16\s*gb\b|\b32\s*gb\b|heavy|multitask|many tab|multiple app|virtual machine|vm|docker/.test(lower);
  const needsLongBattery = /long battery|battery life|battery backup|long lasting|all[\s-]?day|power efficient|hours/.test(lower);
  const needsPortable = /light|lightweight|portable|travel|carry|thin|compact|ultrabook|commute/.test(lower);
  const needsHighPerformance = /powerful|fast|high performance|heavy duty|heavy|demanding|intensive|render|compile/.test(lower);
  const needsDedicatedGraphics = /gaming|render|3d|video edit|graphic|gpu|graphics card|dedicated/.test(lower);

  return {
    useCases: matchedUseCases,
    needsHighRam,
    needsLongBattery,
    needsPortable,
    needsHighPerformance,
    needsDedicatedGraphics,
  };
}

function scoreLaptop(laptop: Laptop, hints: QueryHints, budget: number): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // --- Use case matching (weight: 40) ---
  const matchedUseCases = hints.useCases.filter((uc) => laptop.useCases.includes(uc));
  if (hints.useCases.length > 0) {
    const matchRatio = matchedUseCases.length / hints.useCases.length;
    score += matchRatio * 40;
    if (matchedUseCases.length > 0) {
      const labels = matchedUseCases.map((uc) => uc.charAt(0).toUpperCase() + uc.slice(1));
      reasons.push(`Great for ${labels.join(', ')}`);
    }
  } else {
    // No specific use cases detected — give partial credit based on versatility.
    score += (laptop.useCases.length / 6) * 20;
  }

  // --- RAM (weight: 15) ---
  if (hints.needsHighRam) {
    if (laptop.ram >= 32) {
      score += 15;
      reasons.push(`Excellent ${laptop.ram}GB RAM for heavy multitasking`);
    } else if (laptop.ram >= 16) {
      score += 10;
      reasons.push(`Good ${laptop.ram}GB RAM for multitasking`);
    }
  } else {
    score += (laptop.ram / 32) * 10;
  }

  // --- Battery life (weight: 15) ---
  if (hints.needsLongBattery) {
    if (laptop.batteryHours >= 12) {
      score += 15;
      reasons.push(`Outstanding ${laptop.batteryHours}-hour battery life`);
    } else if (laptop.batteryHours >= 10) {
      score += 10;
      reasons.push(`Solid ${laptop.batteryHours}-hour battery life`);
    }
  } else {
    score += (laptop.batteryHours / 18) * 10;
  }

  // --- Performance (weight: 15) ---
  if (hints.needsHighPerformance) {
    if (laptop.performanceScore >= 9) {
      score += 15;
      reasons.push(`Top-tier performance (score ${laptop.performanceScore}/10)`);
    } else if (laptop.performanceScore >= 7) {
      score += 10;
      reasons.push(`Strong performance (score ${laptop.performanceScore}/10)`);
    }
  } else {
    score += (laptop.performanceScore / 10) * 10;
  }

  // --- Portability (weight: 10) ---
  if (hints.needsPortable) {
    if (laptop.portabilityScore >= 9) {
      score += 10;
      reasons.push(`Ultra-portable at ${laptop.weight}kg (portability ${laptop.portabilityScore}/10)`);
    } else if (laptop.portabilityScore >= 7) {
      score += 7;
      reasons.push(`Lightweight at ${laptop.weight}kg`);
    }
  } else {
    score += (laptop.portabilityScore / 10) * 5;
  }

  // --- Dedicated graphics (weight: 5) ---
  if (hints.needsDedicatedGraphics) {
    const hasDedicated = /dedicated|rtx|gtx|g\d{4}/i.test(laptop.graphics);
    if (hasDedicated) {
      score += 5;
      reasons.push(`Dedicated graphics (${laptop.graphics})`);
    }
  }

  // --- Budget value bonus (weight: 5) ---
  // Reward laptops that use more of the budget (better specs tend to cost more)
  // but penalize ones that leave too much budget unused without justification.
  const budgetUtilization = laptop.price / budget;
  if (budgetUtilization > 0.5) {
    score += budgetUtilization * 5;
  }

  // Fallback reason if nothing specific matched.
  if (reasons.length === 0) {
    reasons.push(`Fits within your ₹${budget.toLocaleString('en-IN')} budget`);
  }

  return { score: Math.round(score * 10) / 10, reasons };
}

export function getRecommendations(query: string, budget: number): Recommendation[] {
  const hints = parseQuery(query);

  const withinBudget = laptops.filter((laptop) => laptop.price <= budget);

  if (withinBudget.length === 0) {
    return [];
  }

  const scored = withinBudget.map((laptop) => {
    const { score, reasons } = scoreLaptop(laptop, hints, budget);
    return { laptop, score, reasons };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, 3);
}

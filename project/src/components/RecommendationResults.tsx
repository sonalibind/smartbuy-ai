import { Star, Cpu, MemoryStick, HardDrive, Battery, Weight, RotateCcw, Lightbulb, CheckCircle2 } from 'lucide-react';
import type { Recommendation } from '@/utils/recommend';

interface RecommendationResultsProps {
  recommendations: Recommendation[];
  query: string;
  budget: number;
  onReset: () => void;
}

export function RecommendationResults({
  recommendations,
  query,
  budget,
  onReset,
}: RecommendationResultsProps) {
  if (recommendations.length === 0) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="bg-white rounded-3xl border border-navy-100 p-8 sm:p-12 text-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 mb-5 mx-auto">
            <Lightbulb className="w-7 h-7 text-amber-500" />
          </div>
          <h3 className="text-xl font-bold text-navy-900 mb-3">No laptops found in this budget</h3>
          <p className="text-sm text-navy-500 max-w-md mx-auto leading-relaxed mb-6">
            We couldn't find any laptops under ₹{budget.toLocaleString('en-IN')} matching your
            description. Try increasing your budget or simplifying your requirements.
          </p>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-accent-700 bg-accent-50 rounded-xl hover:bg-accent-100 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-navy-900">
            Top {recommendations.length} pick{recommendations.length > 1 ? 's' : ''} for you
          </h2>
          <p className="text-sm text-navy-500 mt-1">
            Based on: &ldquo;{query}&rdquo; · Budget: ₹{budget.toLocaleString('en-IN')}
          </p>
        </div>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-navy-600 hover:text-accent-700 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-4 h-4" />
          New Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {recommendations.map((rec, index) => (
          <RecommendationCard key={rec.laptop.id} rec={rec} rank={index + 1} index={index} />
        ))}
      </div>
    </div>
  );
}

function RecommendationCard({
  rec,
  rank,
  index,
}: {
  rec: Recommendation;
  rank: number;
  index: number;
}) {
  const { laptop, reasons } = rec;

  const specs = [
    { icon: Cpu, label: 'Processor', value: laptop.processor },
    { icon: MemoryStick, label: 'RAM', value: `${laptop.ram}GB` },
    { icon: HardDrive, label: 'Storage', value: `${laptop.storage}GB SSD` },
    { icon: Battery, label: 'Battery', value: `${laptop.batteryHours} hrs` },
    { icon: Weight, label: 'Weight', value: `${laptop.weight} kg` },
  ];

  const isTop = rank === 1;

  return (
    <div
      className={`group bg-white rounded-2xl border overflow-hidden transition-all duration-300 animate-slide-up ${
        isTop
          ? 'border-accent-200 shadow-xl shadow-accent-500/10'
          : 'border-navy-100 hover:shadow-lg hover:shadow-navy-900/5'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {isTop && (
        <div className="bg-gradient-to-r from-accent-500 to-accent-700 px-4 py-1.5 text-center">
          <span className="text-xs font-bold text-white tracking-wide">BEST MATCH</span>
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-accent-600 bg-accent-50 px-2 py-0.5 rounded-full">
                #{rank}
              </span>
              <span className="text-xs font-medium text-navy-400">{laptop.brand}</span>
            </div>
            <h3 className="text-base font-bold text-navy-900 leading-tight">{laptop.name}</h3>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-lg">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-xs font-bold text-navy-700">{laptop.performanceScore}</span>
          </div>
        </div>

        <div className="mb-4">
          <span className="text-xl font-bold text-navy-900">
            ₹{laptop.price.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          {specs.map((spec) => (
            <div key={spec.label} className="flex items-center gap-2">
              <spec.icon className="w-4 h-4 text-navy-400 flex-shrink-0" />
              <span className="text-xs text-navy-400 w-16 flex-shrink-0">{spec.label}</span>
              <span className="text-xs font-medium text-navy-700 truncate">{spec.value}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-navy-100">
          <p className="text-xs font-semibold text-navy-800 mb-2">Why this matches:</p>
          <ul className="space-y-1.5">
            {reasons.map((reason, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-navy-600 leading-relaxed">{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-navy-100">
          <div className="flex-1">
            <p className="text-xs text-navy-400">Match Score</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-2 bg-navy-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-400 to-accent-600 rounded-full transition-all"
                  style={{ width: `${Math.min(rec.score, 100)}%` }}
                />
              </div>
              <span className="text-xs font-bold text-accent-700">{rec.score}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

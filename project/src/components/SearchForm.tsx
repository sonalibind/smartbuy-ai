import { useRef, useState } from 'react';
import { ChevronDown, Search, Sparkles, Loader2, Wallet, MessageSquare } from 'lucide-react';

const BUDGET_OPTIONS = [
  { label: '₹30,000', value: 30000 },
  { label: '₹45,000', value: 45000 },
  { label: '₹60,000', value: 60000 },
  { label: '₹75,000', value: 75000 },
  { label: '₹1,00,000', value: 100000 },
] as const;

interface SearchFormProps {
  onSearch: (query: string, budget: number) => void;
  loading: boolean;
}

const EXAMPLE_PROMPTS = [
  'I need a laptop for college studies and light gaming',
  'A lightweight laptop for travel and office work',
  'Powerful laptop for video editing and 3D rendering',
  'Budget laptop for browsing and watching movies',
];

export function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [query, setQuery] = useState('');
  const [budget, setBudget] = useState<number>(45000);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedBudget = BUDGET_OPTIONS.find((opt) => opt.value === budget);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onSearch(query.trim(), budget);
    }
  };

  const handleExampleClick = (prompt: string) => {
    setQuery(prompt);
  };

  const handleBudgetSelect = (value: number) => {
    setBudget(value);
    setDropdownOpen(false);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl shadow-navy-900/5 border border-navy-100 p-5 sm:p-8">
        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-navy-800">
              <MessageSquare className="w-4 h-4 text-accent-600" />
              Describe what you need
            </label>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. I'm a college student who needs a laptop for coding, light gaming, and watching movies. Something that lasts long on battery..."
              rows={4}
              className="w-full px-4 py-3.5 text-navy-800 bg-navy-50 rounded-2xl border-2 border-transparent focus:border-accent-400 focus:bg-white outline-none transition-all resize-none placeholder:text-navy-400 text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-navy-800">
                <Wallet className="w-4 h-4 text-accent-600" />
                Your Budget
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-navy-800 bg-navy-50 rounded-2xl border-2 border-transparent hover:border-accent-300 transition-all text-sm sm:text-base font-medium"
                >
                  <span>{selectedBudget?.label}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-navy-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute z-20 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-navy-100 overflow-hidden animate-fade-in">
                    {BUDGET_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleBudgetSelect(opt.value)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                          opt.value === budget
                            ? 'bg-accent-50 text-accent-700'
                            : 'text-navy-700 hover:bg-navy-50'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {opt.value === budget && (
                          <div className="w-2 h-2 rounded-full bg-accent-500" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex sm:flex-col sm:justify-end">
              <button
                type="submit"
                disabled={!query.trim() || loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-white bg-gradient-to-r from-accent-500 to-accent-700 rounded-2xl shadow-lg shadow-accent-500/30 hover:shadow-xl hover:shadow-accent-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Get Recommendations</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="mt-6">
        <p className="flex items-center gap-1.5 text-xs font-medium text-navy-400 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Try an example:
        </p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleExampleClick(prompt)}
              className="px-3.5 py-2 text-xs font-medium text-navy-600 bg-white border border-navy-100 rounded-full hover:border-accent-300 hover:text-accent-700 hover:bg-accent-50 transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

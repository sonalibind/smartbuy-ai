import { useState, useRef } from 'react';
import { Sparkles, Brain, Tag, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/Header';
import { SearchForm } from '@/components/SearchForm';
import { RecommendationResults } from '@/components/RecommendationResults';
import { getRecommendations, type Recommendation } from '@/utils/recommend';

interface SubmittedSearch {
  query: string;
  budget: number;
  recommendations: Recommendation[];
}

function App() {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SubmittedSearch | null>(null);
  const [formKey, setFormKey] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSearch = (query: string, budget: number) => {
    setLoading(true);
    setSearchResult(null);

    setTimeout(() => {
      const recommendations = getRecommendations(query, budget);
      setSearchResult({ query, budget, recommendations });
      setLoading(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 1200);
  };

  const handleReset = () => {
    setSearchResult(null);
    setLoading(false);
    setFormKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Matching',
      description: 'Our assistant understands your needs in plain language and finds the best matches.',
    },
    {
      icon: Tag,
      title: 'Budget-Aware Picks',
      description: 'Every recommendation stays within your budget while maximizing value.',
    },
    {
      icon: ShieldCheck,
      title: 'Trusted & Verified',
      description: 'All laptops are curated with real specs, ratings, and honest pros and cons.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-navy-900">
      <Header />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent-50/50 via-white to-white" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-100/30 rounded-full blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-50 border border-accent-100 rounded-full mb-6 animate-fade-in">
                <Sparkles className="w-4 h-4 text-accent-600" />
                <span className="text-xs font-semibold text-accent-700">AI Shopping Assistant</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 leading-tight tracking-tight mb-5 animate-slide-up">
                Find the perfect laptop
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-accent-800">
                  for your needs.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-navy-500 leading-relaxed max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
                Our AI shopping assistant helps you discover the right laptop by understanding your
                requirements in plain language. Just describe what you need, set a budget, and get
                personalized recommendations in seconds.
              </p>
            </div>

            <div className="max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
              <SearchForm key={formKey} onSearch={handleSearch} loading={loading} />
            </div>
          </div>
        </section>

        {(loading || searchResult) && (
          <section ref={resultsRef} className="py-12 sm:py-16 bg-navy-50/30 border-t border-navy-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-accent-100" />
                    <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-accent-600 animate-spin" />
                    <Sparkles className="absolute inset-0 m-auto w-7 h-7 text-accent-600" />
                  </div>
                  <p className="mt-6 text-base font-semibold text-navy-800">Finding your perfect laptops...</p>
                  <p className="mt-1 text-sm text-navy-400">Analyzing your needs and matching with the best options</p>
                </div>
              ) : searchResult ? (
                <RecommendationResults
                  recommendations={searchResult.recommendations}
                  query={searchResult.query}
                  budget={searchResult.budget}
                  onReset={handleReset}
                />
              ) : null}
            </div>
          </section>
        )}

        {!loading && !searchResult && (
          <section className="py-16 sm:py-20 border-t border-navy-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-3">How it works</h2>
                <p className="text-sm sm:text-base text-navy-500 max-w-xl mx-auto">
                  Three simple steps to find your ideal laptop without the overwhelm.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="bg-white rounded-2xl border border-navy-100 p-6 hover:shadow-lg hover:shadow-navy-900/5 transition-all animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent-50 mb-4">
                      <feature.icon className="w-6 h-6 text-accent-600" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-navy-500 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <footer className="border-t border-navy-100 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-navy-400">
                © 2026 SmartBuy AI · Laptop recommendations powered by AI
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-navy-400 hover:text-accent-600 transition-colors">Privacy</a>
                <a href="#" className="text-sm text-navy-400 hover:text-accent-600 transition-colors">Terms</a>
                <a href="#" className="text-sm text-navy-400 hover:text-accent-600 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;

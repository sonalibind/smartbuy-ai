import { Laptop as LaptopIcon, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-navy-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 shadow-lg shadow-accent-500/30">
              <LaptopIcon className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-navy-900">SmartBuy</span>
              <span className="text-lg font-bold text-accent-600">AI</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-navy-600 hover:text-accent-600 transition-colors">
              How it Works
            </a>
            <a href="#" className="text-sm font-medium text-navy-600 hover:text-accent-600 transition-colors">
              Popular Picks
            </a>
            <a href="#" className="text-sm font-medium text-navy-600 hover:text-accent-600 transition-colors">
              About
            </a>
          </nav>

          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-accent-700 bg-accent-50 rounded-full hover:bg-accent-100 transition-colors">
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">AI Assistant</span>
          </button>
        </div>
      </div>
    </header>
  );
}

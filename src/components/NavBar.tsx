import type { Screen } from '../App';
import { Zap } from 'lucide-react';

interface NavBarProps {
  current: Screen;
  onNavigate: (screen: Screen) => void;
}

const steps: { id: Screen; label: string; num: string }[] = [
  { id: 'record', label: 'Capture', num: '01' },
  { id: 'processing', label: 'Process', num: '02' },
  { id: 'review', label: 'Review', num: '03' },
  { id: 'estimate', label: 'Estimate', num: '04' },
  { id: 'package', label: 'Package', num: '05' },
];

export default function NavBar({ current, onNavigate }: NavBarProps) {
  const currentIdx = steps.findIndex((s) => s.id === current);

  return (
    <header className="sticky top-0 z-50 bg-ink-900 text-ink-100 border-b border-ink-700">
      <div className="px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-safety-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-ink-900" strokeWidth={2.5} />
          </div>
          <div className="font-display font-bold text-sm tracking-tight">
            FIELDSCOPE<span className="text-safety-500">.</span>AI
          </div>
          <div className="h-4 w-px bg-ink-700" />
          <div className="font-mono text-[11px] text-ink-400 uppercase tracking-widest">
            Restoration Scope Capture
          </div>
        </div>

        {/* Step indicator */}
        <nav className="flex items-center gap-1">
          {steps.map((step, i) => {
            const isPast = i < currentIdx;
            const isActive = i === currentIdx;
            const isFuture = i > currentIdx;

            return (
              <button
                key={step.id}
                onClick={() => !isFuture && onNavigate(step.id)}
                disabled={isFuture}
                className={`
                  flex items-center gap-2 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider
                  transition-colors
                  ${isActive ? 'bg-safety-500 text-ink-900' : ''}
                  ${isPast ? 'text-ink-300 hover:bg-ink-800' : ''}
                  ${isFuture ? 'text-ink-600 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <span className={isActive ? 'text-ink-900' : 'text-ink-500'}>{step.num}</span>
                <span>{step.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Demo tag */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-field-500 rounded-full animate-pulse" />
          <div className="font-mono text-[11px] text-ink-400 uppercase tracking-widest">
            Demo Build v0.1
          </div>
        </div>
      </div>
    </header>
  );
}

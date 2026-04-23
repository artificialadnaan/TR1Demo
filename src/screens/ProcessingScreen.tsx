import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Check, Loader2, Mic, Image, Sparkles, FileCode2, Database } from 'lucide-react';

interface ProcessingScreenProps {
  onComplete: () => void;
}

const steps = [
  {
    id: 1,
    label: 'Audio extraction',
    detail: 'ffmpeg · 4:18 → 96kHz WAV · noise reduction pass',
    icon: Mic,
    duration: 2200,
    output: '4:18 audio · 96kHz · RNNoise applied',
  },
  {
    id: 2,
    label: 'Speech-to-text transcription',
    detail: 'Deepgram Nova-3 · word-level timestamps · speaker diarization',
    icon: Mic,
    duration: 3400,
    output: '1,847 words · 12 narration segments · 94% confidence',
  },
  {
    id: 3,
    label: 'Keyframe extraction',
    detail: 'Sampling every 2 sec + motion-stable frames · 4K source',
    icon: Image,
    duration: 2800,
    output: '129 candidate frames · 47 selected for review',
  },
  {
    id: 4,
    label: 'Damage identification (vision)',
    detail: 'Claude Opus 4.7 · transcript-guided keyframe analysis',
    icon: Sparkles,
    duration: 4200,
    output: '12 damage items identified · far + close photos paired',
  },
  {
    id: 5,
    label: 'Xactimate code mapping',
    detail: 'Fuzzy match against tenant catalog · historical pricing lookup',
    icon: FileCode2,
    duration: 2600,
    output: '12 line items mapped · 10 historical · 2 market fallback',
  },
  {
    id: 6,
    label: 'Estimate generation',
    detail: 'Format: Xactimate ESX · region: OKC · tax: 8.25%',
    icon: Database,
    duration: 2000,
    output: 'Subtotal $19,534 · O&P 20% · Total $25,374',
  },
];

export default function ProcessingScreen({ onComplete }: ProcessingScreenProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    let cancelled = false;

    const runSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        if (cancelled) return;
        setActiveStep(i);
        await new Promise((r) => setTimeout(r, steps[i].duration));
        if (cancelled) return;
        setCompletedSteps((prev) => [...prev, i]);
      }
      await new Promise((r) => setTimeout(r, 900));
      if (!cancelled) onComplete();
    };

    runSteps();
    return () => {
      cancelled = true;
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-[calc(100vh-3.5rem)] bg-ink-900 bg-grid-dark text-ink-100"
    >
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-safety-500 mb-4">
          Processing Pipeline
        </div>
        <h1 className="font-display text-5xl font-bold leading-tight mb-3">
          Analyzing walkthrough<span className="text-safety-500">.</span>
        </h1>
        <p className="font-body text-ink-400 text-base mb-16 max-w-xl">
          Six stages from raw video capture to insurance-ready scope. Each stage runs on dedicated infrastructure — parallelized where possible, verified at every handoff.
        </p>

        {/* Pipeline visualization */}
        <div className="relative">
          {/* Vertical timeline track */}
          <div className="absolute left-7 top-6 bottom-6 w-px bg-ink-700" />

          <div className="space-y-3">
            {steps.map((step, i) => {
              const isActive = i === activeStep && !completedSteps.includes(i);
              const isComplete = completedSteps.includes(i);
              const isPending = i > activeStep;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`
                    relative flex items-start gap-6 p-5 border transition-all
                    ${isActive ? 'border-safety-500 bg-ink-800' : ''}
                    ${isComplete ? 'border-field-500/40 bg-ink-800/40' : ''}
                    ${isPending ? 'border-ink-700/50 bg-transparent opacity-50' : ''}
                  `}
                >
                  {/* Status icon */}
                  <div className={`
                    relative z-10 w-14 h-14 flex items-center justify-center flex-shrink-0
                    ${isActive ? 'bg-safety-500 text-ink-900' : ''}
                    ${isComplete ? 'bg-field-500 text-ink-900' : ''}
                    ${isPending ? 'bg-ink-800 text-ink-600 border border-ink-700' : ''}
                  `}>
                    {isComplete && <Check className="w-6 h-6" strokeWidth={3} />}
                    {isActive && <Loader2 className="w-6 h-6 animate-spin" strokeWidth={2.5} />}
                    {isPending && <step.icon className="w-6 h-6" strokeWidth={1.5} />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink-500">
                        Step {step.id.toString().padStart(2, '0')}
                      </span>
                      {isActive && (
                        <span className="font-mono text-[10px] uppercase tracking-wider text-safety-500">
                          · Running
                        </span>
                      )}
                      {isComplete && (
                        <span className="font-mono text-[10px] uppercase tracking-wider text-field-400">
                          · Complete
                        </span>
                      )}
                    </div>
                    <div className="font-display text-lg font-semibold text-ink-100 leading-tight">
                      {step.label}
                    </div>
                    <div className="font-mono text-[11px] text-ink-500 mt-1">
                      {step.detail}
                    </div>

                    {/* Output line - shows when complete */}
                    {isComplete && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 pt-3 border-t border-ink-700 font-mono text-xs text-field-400"
                      >
                        → {step.output}
                      </motion.div>
                    )}

                    {/* Progress bar while active */}
                    {isActive && (
                      <div className="mt-3 h-0.5 bg-ink-700 overflow-hidden">
                        <motion.div
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: step.duration / 1000, ease: 'easeInOut' }}
                          className="h-full bg-safety-500"
                        />
                      </div>
                    )}
                  </div>

                  {/* Step number on the right */}
                  <div className="font-display text-3xl font-bold text-ink-700 tabular">
                    {(i + 1).toString().padStart(2, '0')}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Status footer */}
        <div className="mt-12 grid grid-cols-4 gap-3 font-mono text-[11px] uppercase tracking-wider">
          <div className="border-l-2 border-safety-500 pl-3">
            <div className="text-ink-500">Job ID</div>
            <div className="text-ink-100 tabular">FS-0425-7A2C</div>
          </div>
          <div className="border-l-2 border-ink-700 pl-3">
            <div className="text-ink-500">Model</div>
            <div className="text-ink-100">claude-opus-4-7</div>
          </div>
          <div className="border-l-2 border-ink-700 pl-3">
            <div className="text-ink-500">Region</div>
            <div className="text-ink-100">us-east-1</div>
          </div>
          <div className="border-l-2 border-ink-700 pl-3">
            <div className="text-ink-500">Tokens used</div>
            <div className="text-ink-100 tabular">
              {(activeStep * 12000 + (completedSteps.length * 4800)).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

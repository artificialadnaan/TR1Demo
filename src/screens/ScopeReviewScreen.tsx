import { motion } from 'motion/react';
import { useState } from 'react';
import { Play, Pause, ChevronRight, AlertTriangle, Pencil, Check, Clock, MapPin, X } from 'lucide-react';
import { damageItems, transcriptSegments, projectMeta } from '../data/scope';
import type { DamageItem } from '../data/scope';
import DamagePhotoPair from '../components/DamagePhotoPair';

interface ScopeReviewScreenProps {
  onNext: () => void;
}

const severityColor = {
  moderate: 'text-safety-600 bg-safety-500/10 border-safety-500/30',
  severe: 'text-alert-600 bg-alert-500/10 border-alert-500/30',
  total: 'text-alert-600 bg-alert-600 text-white border-alert-600',
};

const confidenceColor = {
  high: 'bg-field-500',
  medium: 'bg-safety-500',
  low: 'bg-alert-500',
};

const confidenceLabel = {
  high: 'High · rep described explicitly',
  medium: 'Medium · inferred from visual',
  low: 'Low · requires review',
};

export default function ScopeReviewScreen({ onNext }: ScopeReviewScreenProps) {
  const [selectedItem, setSelectedItem] = useState<DamageItem>(damageItems[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [acceptedItems, setAcceptedItems] = useState<Set<string>>(new Set());

  const currentTranscript = transcriptSegments.find(
    (s) => selectedItem.startTime >= s.start && selectedItem.startTime < s.end
  );

  const toggleAccept = (id: string) => {
    setAcceptedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const formatTime = (s: number) => {
    const mm = Math.floor(s / 60).toString().padStart(2, '0');
    const ss = (s % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-[calc(100vh-3.5rem)] bg-ink-50"
    >
      <div className="max-w-[1600px] mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500 mb-1">
              Scope Review · Step 03 of 05
            </div>
            <h1 className="font-display text-3xl font-bold text-ink-900 leading-tight">
              {damageItems.length} items identified
              <span className="text-safety-500">.</span>
            </h1>
            <div className="font-body text-sm text-ink-600 mt-1">
              Click any item to jump to the video moment and review the source narration
            </div>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-field-500" />
              <span className="text-ink-600">{acceptedItems.size} accepted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-ink-300" />
              <span className="text-ink-600">{damageItems.length - acceptedItems.size} pending</span>
            </div>
            <button
              onClick={onNext}
              className="bg-ink-900 text-ink-50 px-5 py-3 uppercase tracking-[0.15em] hover:bg-safety-500 hover:text-ink-900 transition-colors flex items-center gap-2"
            >
              Generate Estimate
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* LEFT: Video + transcript + detail */}
          <div className="col-span-7">
            {/* Video player (placeholder) */}
            <div className="bg-ink-900 aspect-video relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-ink-800 to-ink-900" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" strokeWidth={2} />
                  ) : (
                    <Play className="w-8 h-8 text-white fill-white ml-1" strokeWidth={2} />
                  )}
                </button>
              </div>

              {/* Time overlay */}
              <div className="absolute top-4 left-4 bg-ink-900/80 px-3 py-1.5 font-mono text-[11px] text-ink-300 uppercase tracking-widest backdrop-blur">
                {formatTime(selectedItem.startTime)} / {projectMeta.walkthroughDuration}
              </div>

              {/* Current item marker */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-ink-700">
                <div
                  className="h-full bg-safety-500"
                  style={{ width: `${(selectedItem.startTime / 258) * 100}%` }}
                />
                {/* Item tick marks */}
                {damageItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`absolute top-0 h-full w-0.5 transition-colors ${
                      item.id === selectedItem.id ? 'bg-safety-500 scale-y-[2.5]' : 'bg-ink-500 hover:bg-white'
                    }`}
                    style={{ left: `${(item.startTime / 258) * 100}%` }}
                  />
                ))}
              </div>

              {/* Location overlay */}
              <div className="absolute top-4 right-4 bg-ink-900/80 px-3 py-1.5 font-mono text-[11px] text-ink-300 uppercase tracking-widest backdrop-blur flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                {selectedItem.location}
              </div>
            </div>

            {/* Photo pair */}
            <div className="mt-4">
              <DamagePhotoPair item={selectedItem} />
            </div>

            {/* Transcript excerpt */}
            <div className="mt-4 bg-white border border-ink-200 p-5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink-500 mb-2 flex items-center gap-2">
                <Clock className="w-3 h-3" />
                Source narration · {formatTime(selectedItem.startTime)} – {formatTime(selectedItem.endTime)}
              </div>
              <p className="font-body text-sm text-ink-800 leading-relaxed italic">
                "{currentTranscript?.text}"
              </p>
              <div className="mt-3 pt-3 border-t border-ink-100">
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink-500 mb-1">
                  Extracted phrase
                </div>
                <p className="font-body text-sm text-ink-900 font-medium">
                  "...{selectedItem.narrationExcerpt}..."
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Damage item list */}
          <div className="col-span-5">
            <div className="font-mono text-[10px] uppercase tracking-wider text-ink-500 mb-3 flex items-center justify-between">
              <span>Damage Items · {damageItems.length} total</span>
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-field-500 rounded-full" /> high</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-safety-500 rounded-full" /> med</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-alert-500 rounded-full" /> low</span>
              </span>
            </div>

            <div className="space-y-2 max-h-[calc(100vh-12rem)] overflow-y-auto pr-1">
              {damageItems.map((item) => {
                const isSelected = item.id === selectedItem.id;
                const isAccepted = acceptedItems.has(item.id);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    onClick={() => setSelectedItem(item)}
                    className={`
                      group bg-white border cursor-pointer transition-all
                      ${isSelected ? 'border-safety-500 shadow-md ring-1 ring-safety-500/20' : 'border-ink-200 hover:border-ink-400'}
                      ${isAccepted ? 'opacity-60' : ''}
                    `}
                  >
                    <div className="flex">
                      {/* Left rail — item number + confidence */}
                      <div className={`
                        w-12 flex-shrink-0 flex flex-col items-center justify-between py-3
                        ${isSelected ? 'bg-safety-500/10' : 'bg-ink-50'}
                      `}>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-500">
                          {item.id}
                        </span>
                        <div
                          className={`w-2 h-2 rounded-full ${confidenceColor[item.confidence]}`}
                          title={confidenceLabel[item.confidence]}
                        />
                      </div>

                      {/* Main content */}
                      <div className="flex-1 p-3 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="min-w-0">
                            <div className="font-display text-sm font-semibold text-ink-900 leading-tight">
                              {item.description}
                            </div>
                            <div className="font-mono text-[10px] uppercase tracking-wider text-ink-500 mt-1 flex items-center gap-2 truncate">
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              {item.location}
                            </div>
                          </div>
                          <div className={`
                            font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 border flex-shrink-0
                            ${severityColor[item.severity]}
                          `}>
                            {item.severity}
                          </div>
                        </div>

                        {/* Xactimate code + quantity */}
                        <div className="flex items-center gap-4 mt-2 pt-2 border-t border-ink-100">
                          <div>
                            <span className="font-mono text-[10px] text-ink-500">CODE</span>
                            <div className="font-mono text-xs font-semibold text-ink-900">{item.xactimateCode}</div>
                          </div>
                          <div>
                            <span className="font-mono text-[10px] text-ink-500">QTY</span>
                            <div className="font-display text-xs font-semibold text-ink-900 tabular">
                              {item.quantity} {item.unit}
                            </div>
                          </div>
                          <div className="flex-1 text-right">
                            <span className="font-mono text-[10px] text-ink-500">EXT</span>
                            <div className="font-display text-xs font-semibold text-ink-900 tabular">
                              ${(item.quantity * (item.unitPrice + item.laborPrice)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                          </div>
                        </div>

                        {/* Recapture warning */}
                        {item.needsRecapture && (
                          <div className="mt-2 flex items-center gap-2 text-[11px] text-safety-600 bg-safety-500/10 px-2 py-1">
                            <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                            <span>Adjuster review flagged</span>
                          </div>
                        )}

                        {/* Actions row */}
                        <div className="flex items-center gap-1 mt-2 pt-2 border-t border-ink-100 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleAccept(item.id); }}
                            className={`
                              px-2 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors flex items-center gap-1
                              ${isAccepted
                                ? 'bg-field-500 text-ink-900'
                                : 'bg-ink-100 text-ink-700 hover:bg-field-500 hover:text-ink-900'}
                            `}
                          >
                            {isAccepted ? <Check className="w-3 h-3" /> : null}
                            {isAccepted ? 'Accepted' : 'Accept'}
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="px-2 py-1 font-mono text-[10px] uppercase tracking-wider bg-ink-100 text-ink-700 hover:bg-ink-200 transition-colors flex items-center gap-1"
                          >
                            <Pencil className="w-3 h-3" />
                            Edit
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="px-2 py-1 font-mono text-[10px] uppercase tracking-wider bg-ink-100 text-ink-700 hover:bg-alert-500 hover:text-white transition-colors flex items-center gap-1"
                          >
                            <X className="w-3 h-3" />
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

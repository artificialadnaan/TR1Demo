import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Circle, Square, MapPin, Calendar, User, FileText, Upload, Radio, Camera, MessageSquare, Mic, ChevronRight } from 'lucide-react';
import { projectMeta } from '../data/scope';

interface RecordScreenProps {
  onComplete: () => void;
}

export default function RecordScreen({ onComplete }: RecordScreenProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [phase, setPhase] = useState<'setup' | 'recording' | 'complete'>('setup');

  useEffect(() => {
    if (!isRecording) return;
    // Speed up the demo — 1 second of wall clock = ~8 seconds of "recording" time
    const fast = setInterval(() => {
      setRecordTime((t) => {
        const next = Math.min(t + 8, 258);
        if (next >= 258) {
          setIsRecording(false);
          setPhase('complete');
        }
        return next;
      });
    }, 250);
    return () => clearInterval(fast);
  }, [isRecording]);

  const formatTime = (s: number) => {
    const mm = Math.floor(s / 60).toString().padStart(2, '0');
    const ss = (s % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const toggleRecord = () => {
    if (phase === 'complete') {
      onComplete();
      return;
    }
    if (!isRecording) {
      setIsRecording(true);
      setPhase('recording');
    } else {
      setIsRecording(false);
      setPhase('complete');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-[calc(100vh-3.5rem)] bg-ink-50 bg-grid"
    >
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-12 gap-8">
        {/* LEFT: Project context */}
        <div className="col-span-4">
          <div className="sticky top-24">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500 mb-2">
              Active Inspection
            </div>
            <h1 className="font-display text-3xl font-bold text-ink-900 leading-tight mb-1 tabular">
              {projectMeta.claimNumber}
            </h1>
            <div className="font-body text-sm text-ink-600 mb-8">
              {projectMeta.clientName}
            </div>

            <dl className="space-y-4 border-t border-ink-200 pt-6">
              <div className="grid grid-cols-[20px_1fr] gap-3 items-start">
                <MapPin className="w-4 h-4 text-ink-500 mt-0.5" />
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-ink-500">Property</dt>
                  <dd className="font-body text-sm text-ink-900 mt-0.5">{projectMeta.address}</dd>
                </div>
              </div>
              <div className="grid grid-cols-[20px_1fr] gap-3 items-start">
                <Calendar className="w-4 h-4 text-ink-500 mt-0.5" />
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-ink-500">Date of Loss</dt>
                  <dd className="font-body text-sm text-ink-900 mt-0.5">{projectMeta.dateOfLoss}</dd>
                </div>
              </div>
              <div className="grid grid-cols-[20px_1fr] gap-3 items-start">
                <Radio className="w-4 h-4 text-ink-500 mt-0.5" />
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-ink-500">Cause of Loss</dt>
                  <dd className="font-body text-sm text-ink-900 mt-0.5">{projectMeta.causeOfLoss}</dd>
                </div>
              </div>
              <div className="grid grid-cols-[20px_1fr] gap-3 items-start">
                <User className="w-4 h-4 text-ink-500 mt-0.5" />
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-ink-500">Inspector</dt>
                  <dd className="font-body text-sm text-ink-900 mt-0.5">{projectMeta.inspector}</dd>
                </div>
              </div>
            </dl>

            <div className="mt-10 border-t border-ink-200 pt-6">
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink-500 mb-3">
                Capture Guidelines
              </div>
              <ul className="space-y-2 text-[13px] text-ink-600 leading-relaxed">
                <li className="flex gap-2"><span className="text-safety-500 font-bold">›</span> Narrate every damage item in frame</li>
                <li className="flex gap-2"><span className="text-safety-500 font-bold">›</span> State approximate quantities aloud</li>
                <li className="flex gap-2"><span className="text-safety-500 font-bold">›</span> Show context shot, then close-up</li>
                <li className="flex gap-2"><span className="text-safety-500 font-bold">›</span> Call out cause-of-loss on each item</li>
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT: Capture interface */}
        <div className="col-span-8">
          <div className="bg-ink-900 aspect-video relative overflow-hidden shadow-2xl">
            {/* Viewport */}
            <div className="absolute inset-0 bg-gradient-to-br from-ink-800 via-ink-900 to-black">
              {/* Camera viewfinder */}
              {!isRecording && phase === 'setup' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 border-2 border-ink-600 flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-10 h-10 text-ink-500" strokeWidth={1.5} />
                    </div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
                      Camera Ready
                    </div>
                    <div className="font-body text-sm text-ink-500 mt-2">
                      Tap record to begin walkthrough
                    </div>
                  </div>
                </div>
              )}

              {/* Recording — simulated video with placeholder gradient */}
              {isRecording && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-ink-800 to-ink-900" />
                  {/* Scanning line */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute left-0 right-0 h-[2px] bg-field-400/40 animate-scan" style={{ boxShadow: '0 0 20px rgba(45, 212, 191, 0.6)' }} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="font-display text-6xl font-bold text-ink-400 tabular opacity-30">
                      {formatTime(recordTime)}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Complete state */}
              {phase === 'complete' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-field-600/20 via-ink-800 to-ink-900 flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-field-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-9 h-9 text-ink-900" strokeWidth={2.5} />
                    </div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-field-400 mb-1">
                      Capture Complete
                    </div>
                    <div className="font-display text-4xl font-bold text-ink-100 tabular">
                      {formatTime(recordTime)}
                    </div>
                    <div className="font-body text-sm text-ink-400 mt-2">
                      4:18 of walkthrough footage · 2.4 GB
                    </div>
                  </div>
                </motion.div>
              )}

              {/* HUD overlays */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                {isRecording && (
                  <div className="flex items-center gap-2 bg-alert-500/90 px-3 py-1.5 font-mono text-[11px] text-white uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-white animate-blink" />
                    REC
                  </div>
                )}
                <div className="bg-ink-900/80 px-3 py-1.5 font-mono text-[11px] text-ink-300 uppercase tracking-widest backdrop-blur">
                  4K · 30FPS
                </div>
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className="bg-ink-900/80 px-3 py-1.5 font-mono text-[11px] text-field-400 uppercase tracking-widest backdrop-blur flex items-center gap-2">
                  <Mic className="w-3 h-3" />
                  AUDIO 96%
                </div>
                <div className="bg-ink-900/80 px-3 py-1.5 font-mono text-[11px] text-ink-300 uppercase tracking-widest backdrop-blur">
                  GPS LOCKED
                </div>
              </div>

              {/* Crosshair viewfinder lines */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-x-12 top-12 h-px bg-ink-400/20" />
                <div className="absolute inset-x-12 bottom-12 h-px bg-ink-400/20" />
                <div className="absolute inset-y-12 left-12 w-px bg-ink-400/20" />
                <div className="absolute inset-y-12 right-12 w-px bg-ink-400/20" />
              </div>

              {/* Bottom control bar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-ink-900/90 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-ink-300">
                    <FileText className="w-4 h-4" />
                    <span className="font-mono text-[11px] uppercase tracking-wider">
                      {projectMeta.claimNumber}
                    </span>
                  </div>

                  <button
                    onClick={toggleRecord}
                    className="relative"
                  >
                    <div className={`
                      w-16 h-16 rounded-full border-4 transition-all
                      ${isRecording ? 'border-alert-500 bg-alert-500' : ''}
                      ${phase === 'setup' ? 'border-white bg-alert-500' : ''}
                      ${phase === 'complete' ? 'border-field-400 bg-field-500' : ''}
                    `}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        {phase === 'setup' && <Circle className="w-6 h-6 text-white fill-white" />}
                        {isRecording && <Square className="w-5 h-5 text-white fill-white" />}
                        {phase === 'complete' && <ChevronRight className="w-6 h-6 text-ink-900" strokeWidth={3} />}
                      </div>
                    </div>
                  </button>

                  <div className="flex items-center gap-2 text-ink-300">
                    <span className="font-mono text-[11px] uppercase tracking-wider">
                      Session 01
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transcript preview panel */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-white border border-ink-200 p-4">
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink-500 mb-2 flex items-center gap-2">
                <Mic className="w-3 h-3" />
                Live Transcript
              </div>
              <div className="font-body text-[13px] text-ink-700 leading-relaxed min-h-[60px]">
                {!isRecording && phase === 'setup' && (
                  <span className="text-ink-400 italic">Waiting to begin...</span>
                )}
                {isRecording && (
                  <span>
                    {recordTime > 10 && "Alright, we're at the Morrison property on Oak Hollow — loss date was the storm on the 14th"}
                    {recordTime > 30 && "... granule loss across basically the entire field"}
                    {recordTime > 60 && "... ridge cap has lifted in multiple spots"}
                    {recordTime > 90 && "... step flashing is completely pulled away"}
                    {recordTime > 120 && "... entire gutter run is dented"}
                    {recordTime > 150 && "... siding has significant hail damage"}
                    {recordTime > 180 && "... AC condenser fins flattened"}
                    {recordTime > 210 && "... patio cover panels dented"}
                    {recordTime > 240 && "... last item — gutter guards"}
                    <span className="inline-block w-2 h-4 bg-safety-500 ml-1 animate-blink" />
                  </span>
                )}
                {phase === 'complete' && (
                  <span className="text-ink-600">Transcript saved · 4:18 duration · 12 damage items detected inline</span>
                )}
              </div>
            </div>

            <div className="bg-white border border-ink-200 p-4">
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink-500 mb-2 flex items-center gap-2">
                <Camera className="w-3 h-3" />
                Keyframes Captured
              </div>
              <div className="font-display text-4xl font-bold text-ink-900 tabular">
                {isRecording ? Math.floor(recordTime / 2) : phase === 'complete' ? '129' : '0'}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink-500 mt-1">
                1 per 2 seconds
              </div>
            </div>

            <div className="bg-white border border-ink-200 p-4">
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink-500 mb-2 flex items-center gap-2">
                <MessageSquare className="w-3 h-3" />
                Items Detected
              </div>
              <div className="font-display text-4xl font-bold text-ink-900 tabular">
                {isRecording ? Math.min(Math.floor(recordTime / 23), 12) : phase === 'complete' ? '12' : '0'}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink-500 mt-1">
                Inline extraction
              </div>
            </div>
          </div>

          {/* Action: next step */}
          {phase === 'complete' && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={onComplete}
              className="mt-6 w-full bg-ink-900 text-ink-50 py-5 font-mono text-sm uppercase tracking-[0.2em] hover:bg-safety-500 hover:text-ink-900 transition-colors flex items-center justify-center gap-3"
            >
              Process Walkthrough
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

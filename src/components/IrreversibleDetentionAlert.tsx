import React, { useState } from 'react';
import { AlertOctagon, Volume2, VolumeX, ShieldAlert, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';
import { SubjectCalculation } from '../types/attendance';

interface IrreversibleDetentionAlertProps {
  detainedSubjects: SubjectCalculation[];
  onOpenODSimulator: () => void;
  onOpenAdvisor: () => void;
}

export const IrreversibleDetentionAlert: React.FC<IrreversibleDetentionAlertProps> = ({
  detainedSubjects,
  onOpenODSimulator,
  onOpenAdvisor,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Play simple non-intrusive alert tone using Web Audio API if user activates sound
  const playAlertTone = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch (e) {
      // Audio not permitted or context not ready
    }
  };

  const handleToggleSound = () => {
    if (!soundEnabled) {
      playAlertTone();
    }
    setSoundEnabled(!soundEnabled);
  };

  if (detainedSubjects.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-red-500 bg-gradient-to-r from-red-950 via-rose-950 to-red-900 text-white p-5 sm:p-6 shadow-2xl shadow-red-900/50 mb-8 animate-pulse-slow">
      {/* Background Warning Stripe effect */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-red-800/60 pb-4 mb-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center shrink-0 shadow-lg shadow-red-600/50 animate-bounce">
              <AlertOctagon className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider">
                  Critical Academic Warning
                </span>
                <span className="text-xs text-red-300 font-semibold">
                  Exam Regulations Regulation 2021/2024
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
                🚨 IRREVERSIBLE DETENTION ALERT!
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleToggleSound}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center space-x-1.5 transition ${
                soundEnabled
                  ? 'bg-red-600 border-red-400 text-white'
                  : 'bg-red-900/60 border-red-700/80 text-red-200 hover:bg-red-800'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{soundEnabled ? 'Siren Tone Active' : 'Enable Warning Sound'}</span>
            </button>
          </div>
        </div>

        <p className="text-sm text-red-200/90 leading-relaxed mb-4">
          It is <strong className="text-white underline decoration-red-400">mathematically impossible</strong> to reach the mandatory 75.0% threshold before semester exams, <span className="font-bold text-white">even if you attend 100% of all remaining classes</span> for the following {detainedSubjects.length} subject(s):
        </p>

        {/* Detained Subjects Detail Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-5">
          {detainedSubjects.map((sub) => (
            <div
              key={sub.code}
              className="bg-black/40 border border-red-700/60 rounded-xl p-3.5 text-xs backdrop-blur-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-bold text-red-300 text-sm">{sub.name}</span>
                  <div className="text-[11px] text-slate-400">{sub.code} • {sub.faculty}</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-red-900 text-red-200 font-black text-[11px] border border-red-700">
                  {sub.currentPercentage}% Current
                </span>
              </div>

              <div className="space-y-1.5 text-slate-300 pt-2 border-t border-red-900/60">
                <div className="flex justify-between">
                  <span>Conducted so far:</span>
                  <strong className="text-white">{sub.conductedSoFar} classes</strong>
                </div>
                <div className="flex justify-between">
                  <span>Attended so far:</span>
                  <strong className="text-white">{sub.attendedSoFar} classes</strong>
                </div>
                <div className="flex justify-between">
                  <span>Remaining classes left:</span>
                  <strong className="text-emerald-400 font-bold">{sub.remainingClasses} classes</strong>
                </div>
                <div className="flex justify-between">
                  <span>Max possible if 100% attended:</span>
                  <strong className="text-rose-300 font-bold">{sub.maxPossiblePercentage}% (&lt; 75.0%)</strong>
                </div>
                <div className="flex justify-between text-red-300 font-black">
                  <span>Deficit to avoid detention:</span>
                  <span className="text-red-400 font-extrabold">Short by {sub.detentionDeficit} classes</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actionable Remedies */}
        <div className="bg-red-950/80 border border-red-800 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-red-200">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Emergency Remedies:</strong> Submit an On-Duty (OD) form for technical events/sports, provide Medical Certificates, or consult your Faculty Advisor.
            </span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={onOpenODSimulator}
              className="px-3 py-1.5 rounded-lg bg-red-800 hover:bg-red-700 text-white font-bold transition flex items-center space-x-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulate OD Rescue</span>
            </button>
            <button
              onClick={onOpenAdvisor}
              className="px-3 py-1.5 rounded-lg bg-white text-red-950 hover:bg-slate-100 font-bold transition flex items-center space-x-1"
            >
              <span>Ask Advisor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

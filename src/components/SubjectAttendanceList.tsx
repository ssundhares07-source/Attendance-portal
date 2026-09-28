import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, Clock, HelpCircle, ShieldAlert, Sparkles, User } from 'lucide-react';
import { SubjectCalculation } from '../types/attendance';

interface SubjectAttendanceListProps {
  subjects: SubjectCalculation[];
  onUpdatePercentage: (code: string, pct: number) => void;
  onUpdateCounts: (code: string, attended: number, conducted: number) => void;
  onQuickSimulateAll: (targetPct: number) => void;
}

export const SubjectAttendanceList: React.FC<SubjectAttendanceListProps> = ({
  subjects,
  onUpdatePercentage,
  onUpdateCounts,
  onQuickSimulateAll,
}) => {
  const [editingMode, setEditingMode] = useState<'percentage' | 'counts'>('percentage');
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl mb-8">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center space-x-2">
            <span>Subject Attendance Matrix</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-normal">
              {subjects.length} Subjects
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Adjust your current attendance below to calculate remaining class requirements and detention margins.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Preset Buttons */}
          <div className="flex items-center space-x-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700/80 text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold px-1.5">Presets:</span>
            <button
              onClick={() => onQuickSimulateAll(85)}
              className="px-2 py-0.5 rounded hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              85% (Safe)
            </button>
            <button
              onClick={() => onQuickSimulateAll(74)}
              className="px-2 py-0.5 rounded hover:bg-amber-950 text-amber-300 text-xs font-semibold"
            >
              74% (Danger)
            </button>
            <button
              onClick={() => onQuickSimulateAll(48)}
              className="px-2 py-0.5 rounded hover:bg-red-950 text-red-300 text-xs font-semibold"
            >
              48% (Detention Test)
            </button>
          </div>

          {/* Input Mode Toggle */}
          <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => setEditingMode('percentage')}
              className={`px-2.5 py-1 rounded font-bold transition ${
                editingMode === 'percentage'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Percentage %
            </button>
            <button
              onClick={() => setEditingMode('counts')}
              className={`px-2.5 py-1 rounded font-bold transition ${
                editingMode === 'counts'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Attended / Conducted
            </button>
          </div>
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map((sub) => {
          const isExpanded = expandedCode === sub.code;

          return (
            <div
              key={sub.code}
              className={`rounded-xl border transition-all p-4.5 ${
                sub.isIrreversibleDetention
                  ? 'bg-red-950/20 border-red-500/80 shadow-lg shadow-red-950/30'
                  : sub.isDangerZone
                  ? 'bg-amber-950/20 border-amber-500/60'
                  : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center space-x-2.5">
                  <div
                    className="w-3.5 h-10 rounded-full shrink-0"
                    style={{ backgroundColor: sub.color }}
                  />
                  <div>
                    <h3 className="font-bold text-sm text-white leading-tight">
                      {sub.name}
                    </h3>
                    <div className="text-xs text-slate-400 flex items-center space-x-2 mt-0.5">
                      <span className="font-mono text-slate-300 font-semibold">{sub.code}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <User className="w-3 h-3 mr-1 text-slate-500" />
                        {sub.faculty}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex flex-col items-end shrink-0">
                  {sub.isIrreversibleDetention ? (
                    <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-extrabold text-[11px] uppercase tracking-wider animate-pulse flex items-center space-x-1">
                      <ShieldAlert className="w-3 h-3" />
                      <span>Detention</span>
                    </span>
                  ) : sub.isDangerZone ? (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[11px] uppercase tracking-wider flex items-center space-x-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Danger Zone</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[11px] border border-emerald-500/40 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Safe</span>
                    </span>
                  )}

                  {sub.isRescuedByOD && (
                    <span className="text-[10px] text-emerald-400 font-bold mt-1 flex items-center space-x-0.5">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>OD Rescued ({sub.projectedPercentageWithOD}%)</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Attendance Adjustment Input */}
              <div className="mb-4 bg-slate-900/80 rounded-lg p-3 border border-slate-700/60">
                {editingMode === 'percentage' ? (
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-semibold text-slate-300">
                        Current Percentage:
                      </span>
                      <div className="flex items-center space-x-1">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.5"
                          value={sub.currentPercentage}
                          onChange={(e) => onUpdatePercentage(sub.code, parseFloat(e.target.value) || 0)}
                          className="w-16 bg-slate-800 border border-slate-600 rounded px-1.5 py-0.5 text-right font-black text-white text-sm focus:border-blue-500"
                        />
                        <span className="text-xs text-slate-400 font-bold">%</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={sub.currentPercentage}
                      onChange={(e) => onUpdatePercentage(sub.code, parseFloat(e.target.value))}
                      className="w-full accent-blue-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">Class Counts:</span>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <span className="text-[11px] text-slate-400">Attended:</span>
                        <input
                          type="number"
                          min="0"
                          max={sub.conductedSoFar}
                          value={sub.attendedSoFar}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10) || 0;
                            onUpdateCounts(sub.code, val, sub.conductedSoFar);
                          }}
                          className="w-12 bg-slate-800 border border-slate-600 rounded px-1.5 py-0.5 text-center font-bold text-white text-xs"
                        />
                      </div>
                      <span className="text-slate-500">/</span>
                      <div className="flex items-center space-x-1">
                        <span className="text-[11px] text-slate-400">Conducted:</span>
                        <input
                          type="number"
                          min="1"
                          max="150"
                          value={sub.conductedSoFar}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10) || 1;
                            onUpdateCounts(sub.code, sub.attendedSoFar, val);
                          }}
                          className="w-12 bg-slate-800 border border-slate-600 rounded px-1.5 py-0.5 text-center font-bold text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Visual Progress Bar with 75% Danger Marker and 90% Distinction Marker */}
                <div className="relative mt-3 pt-1">
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex relative">
                    <div
                      className={`h-full transition-all duration-300 ${
                        sub.currentPercentage < 75
                          ? 'bg-gradient-to-r from-red-600 to-rose-500'
                          : sub.currentPercentage >= 90
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-500'
                      }`}
                      style={{ width: `${Math.min(100, sub.currentPercentage)}%` }}
                    />
                  </div>

                  {/* 75% Red Marker Line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-red-400 z-10"
                    style={{ left: '75%' }}
                    title="75% Mandatory Cutoff"
                  >
                    <span className="absolute -top-3.5 -left-2.5 text-[9px] font-black text-red-400">
                      75%
                    </span>
                  </div>

                  {/* 90% Green Marker Line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-emerald-400 z-10"
                    style={{ left: '90%' }}
                    title="90% Distinction Marker"
                  >
                    <span className="absolute -top-3.5 -left-2.5 text-[9px] font-black text-emerald-400">
                      90%
                    </span>
                  </div>
                </div>
              </div>

              {/* Primary Calculations Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-3">
                <div className="bg-slate-900/60 rounded-lg p-2 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">Classes Left</span>
                  <strong className="text-white text-sm">{sub.remainingClasses}</strong>
                </div>

                <div className="bg-slate-900/60 rounded-lg p-2 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">Need for 75%</span>
                  <strong className={sub.isIrreversibleDetention ? 'text-red-400 text-sm font-black' : 'text-amber-300 text-sm'}>
                    {sub.neededFor75}
                  </strong>
                  <span className="text-[10px] text-slate-400 ml-1">/ {sub.remainingClasses}</span>
                </div>

                <div className="bg-slate-900/60 rounded-lg p-2 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">Safe Bunks</span>
                  <strong className={sub.safeBunks75 > 0 ? 'text-emerald-400 text-sm' : 'text-red-400 text-sm'}>
                    {sub.safeBunks75}
                  </strong>
                  <span className="text-[10px] text-slate-400 ml-1">allowed</span>
                </div>

                <div className="bg-slate-900/60 rounded-lg p-2 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">Need for 90%</span>
                  {sub.canReach90 ? (
                    <strong className="text-emerald-300 text-sm">{sub.neededFor90}</strong>
                  ) : (
                    <span className="text-[11px] text-slate-500 font-semibold">Unreachable</span>
                  )}
                </div>
              </div>

              {/* Irreversible Alert Notice if applicable */}
              {sub.isIrreversibleDetention && (
                <div className="bg-red-950/80 border border-red-700/80 rounded-lg p-2.5 text-xs text-red-200 mb-2">
                  <div className="font-extrabold text-red-300 flex items-center space-x-1 mb-0.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Mathematically Impossible to Reach 75%</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Even with 100% attendance in all {sub.remainingClasses} remaining classes, your maximum final score will be <strong className="text-white">{sub.maxPossiblePercentage}%</strong>. Deficit: <strong>{sub.detentionDeficit} classes short</strong>.
                  </p>
                </div>
              )}

              {/* Collapsible Details */}
              <button
                onClick={() => setExpandedCode(isExpanded ? null : sub.code)}
                className="w-full text-slate-400 hover:text-slate-200 text-[11px] font-semibold flex items-center justify-center space-x-1 pt-1"
              >
                <span>{isExpanded ? 'Hide mathematical details' : 'Show mathematical details'}</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {isExpanded && (
                <div className="mt-2.5 pt-2.5 border-t border-slate-700/70 text-[11px] text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Total Semester Classes (C + R):</span>
                    <strong className="text-white">{sub.totalSemesterClasses}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Required Attended for 75% (&lceil;0.75 &times; Total&rceil;):</span>
                    <strong className="text-white">{sub.requiredFor75}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Required Attended for 90% (&lceil;0.90 &times; Total&rceil;):</span>
                    <strong className="text-white">{sub.requiredFor90}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Possible Attendance:</span>
                    <strong className="text-white">{sub.maxPossiblePercentage}%</strong>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { BarChart3, PieChart, ShieldAlert, Sparkles } from 'lucide-react';
import { SubjectCalculation, ClassSection } from '../types/attendance';

interface ChartsViewProps {
  subjects: SubjectCalculation[];
  section: ClassSection;
}

export const ChartsView: React.FC<ChartsViewProps> = ({ subjects, section }) => {
  // Compute weekly class counts for each day
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;
  const dayClassCounts = days.map(d => ({
    day: d,
    count: (section.schedule[d] || []).length,
  }));
  const maxDayCount = Math.max(...dayClassCounts.map(d => d.count), 1);

  // Group status counts
  const safeCount = subjects.filter(s => s.currentPercentage >= 75 && !s.isIrreversibleDetention).length;
  const dangerCount = subjects.filter(s => s.currentPercentage < 75 && !s.isIrreversibleDetention).length;
  const detainedCount = subjects.filter(s => s.isIrreversibleDetention).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      
      {/* 1. Subject-by-Subject Attendance Health Bar Chart */}
      <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-base text-white">Attendance Health by Subject</h3>
            </div>
            <div className="flex items-center space-x-3 text-[11px] text-slate-400">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                <span>&lt;75% Danger</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                <span>75%-89% Safe</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                <span>&ge;90% Top</span>
              </span>
            </div>
          </div>

          {/* Chart with reference lines */}
          <div className="relative pt-4 pb-2 space-y-3">
            {/* 75% reference line */}
            <div
              className="absolute top-0 bottom-0 w-px border-l-2 border-dashed border-red-500/80 z-20 pointer-events-none"
              style={{ left: '75%' }}
            >
              <span className="absolute -top-3.5 -left-4 text-[9px] font-black text-red-400 bg-slate-900 px-1 rounded">
                75% Cutoff
              </span>
            </div>

            {/* 90% reference line */}
            <div
              className="absolute top-0 bottom-0 w-px border-l-2 border-dashed border-emerald-400/80 z-20 pointer-events-none"
              style={{ left: '90%' }}
            >
              <span className="absolute -top-3.5 -left-4 text-[9px] font-black text-emerald-400 bg-slate-900 px-1 rounded">
                90% Distinction
              </span>
            </div>

            {subjects.map((s) => (
              <div key={s.code} className="relative z-10">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-semibold truncate max-w-[200px] sm:max-w-xs">
                    {s.name} ({s.code})
                  </span>
                  <span className={`font-black ${
                    s.isIrreversibleDetention
                      ? 'text-red-400'
                      : s.isDangerZone
                      ? 'text-amber-400'
                      : s.currentPercentage >= 90
                      ? 'text-emerald-400'
                      : 'text-blue-400'
                  }`}>
                    {s.currentPercentage}%
                  </span>
                </div>
                <div className="h-3.5 w-full bg-slate-800 rounded-full overflow-hidden flex relative">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      s.isIrreversibleDetention
                        ? 'bg-red-600'
                        : s.isDangerZone
                        ? 'bg-amber-500'
                        : s.currentPercentage >= 90
                        ? 'bg-emerald-400'
                        : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min(100, s.currentPercentage)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span>SRM TRP University Criteria: 75.0% Mandatory for Semester Hall Ticket</span>
          <span className="font-semibold text-slate-300">{section.name}</span>
        </div>
      </div>

      {/* 2. Weekly Load & Health Distribution Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-5">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <PieChart className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-base text-white">Status Breakdown</h3>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center mb-5">
            <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-2.5">
              <span className="text-xl font-black text-emerald-400 block">{safeCount}</span>
              <span className="text-[10px] uppercase font-bold text-emerald-300">Safe (&ge;75%)</span>
            </div>
            <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-2.5">
              <span className="text-xl font-black text-amber-400 block">{dangerCount}</span>
              <span className="text-[10px] uppercase font-bold text-amber-300">Danger Zone</span>
            </div>
            <div className="bg-red-950/40 border border-red-800/60 rounded-xl p-2.5">
              <span className="text-xl font-black text-red-400 block">{detainedCount}</span>
              <span className="text-[10px] uppercase font-bold text-red-300">Detained</span>
            </div>
          </div>

          {/* Weekly Class Distribution Chart */}
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Weekly Class Load (Periods / Day)
          </h4>
          <div className="space-y-2">
            {dayClassCounts.map((d) => (
              <div key={d.day} className="flex items-center text-xs">
                <span className="w-20 text-slate-400 font-medium">{d.day}</span>
                <div className="flex-1 bg-slate-800 h-3 rounded-full overflow-hidden mr-2">
                  <div
                    className="bg-indigo-500 h-full rounded-full"
                    style={{ width: `${(d.count / maxDayCount) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-right font-bold text-slate-200">{d.count}p</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/60 rounded-xl p-3 text-[11px] text-slate-300 border border-slate-700/60">
          💡 <strong>Attendance Tip:</strong> Lab sessions carry 2 to 3 period weights. Missing a single lab impacts your percentage two-to-three times as heavily as a 50-minute lecture.
        </div>
      </div>

    </div>
  );
};

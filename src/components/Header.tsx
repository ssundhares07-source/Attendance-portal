import React from 'react';
import { Calendar, Clock, Download, GraduationCap, School, ShieldAlert, Sparkles } from 'lucide-react';
import { ClassSection } from '../types/attendance';
import { CLASS_SECTIONS } from '../data/srmTimetables';

interface HeaderProps {
  selectedSection: ClassSection;
  onSelectSection: (section: ClassSection) => void;
  referenceDate: string;
  onChangeReferenceDate: (date: string) => void;
  targetDate: string;
  onChangeTargetDate: (date: string) => void;
  onOpenTimetable: () => void;
  onOpenODSimulator: () => void;
  onOpenAdvisor: () => void;
  activeODCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  selectedSection,
  onSelectSection,
  referenceDate,
  onChangeReferenceDate,
  targetDate,
  onChangeTargetDate,
  onOpenTimetable,
  onOpenODSimulator,
  onOpenAdvisor,
  activeODCount,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Brand & Campus Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center shadow-md shadow-indigo-500/25">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-lg tracking-tight bg-gradient-to-r from-blue-400 via-indigo-200 to-white bg-clip-text text-transparent">
                  ClassTrack
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800/60 font-medium">
                  SRM TRP FET
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official Odd Semester (2024-25 / 2026-27) Timetable Attendance Engine
              </p>
            </div>
          </div>

          {/* Controls: Section, Reference Date, Target Date */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-sm">
            
            {/* Section Selector */}
            <div className="flex items-center bg-slate-800/90 border border-slate-700/80 rounded-lg px-2.5 py-1.5 focus-within:border-blue-500 transition">
              <School className="w-4 h-4 text-blue-400 mr-2 shrink-0" />
              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Class Section</label>
                <select
                  value={selectedSection.id}
                  onChange={(e) => {
                    const sec = CLASS_SECTIONS.find(s => s.id === e.target.value);
                    if (sec) onSelectSection(sec);
                  }}
                  className="bg-transparent text-white font-semibold text-xs sm:text-sm focus:outline-none cursor-pointer pr-1"
                >
                  {CLASS_SECTIONS.map((sec) => (
                    <option key={sec.id} value={sec.id} className="bg-slate-900 text-white">
                      {sec.name} ({sec.branch.split(' ')[0]})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Current Reference Date (Today) */}
            <div className="flex items-center bg-slate-800/90 border border-slate-700/80 rounded-lg px-2.5 py-1.5 focus-within:border-blue-500 transition">
              <Clock className="w-4 h-4 text-emerald-400 mr-2 shrink-0" />
              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Reference Date (Today)</label>
                <input
                  type="date"
                  value={referenceDate}
                  onChange={(e) => onChangeReferenceDate(e.target.value)}
                  className="bg-transparent text-white text-xs sm:text-sm font-semibold focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Planning Target Date */}
            <div className="flex items-center bg-slate-800/90 border border-slate-700/80 rounded-lg px-2.5 py-1.5 focus-within:border-blue-500 transition">
              <Calendar className="w-4 h-4 text-indigo-400 mr-2 shrink-0" />
              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Target Planning Date</label>
                <input
                  type="date"
                  value={targetDate}
                  min={referenceDate}
                  onChange={(e) => onChangeTargetDate(e.target.value)}
                  className="bg-transparent text-white text-xs sm:text-sm font-semibold focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Timetable Matrix button */}
            <button
              onClick={onOpenTimetable}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition shadow-sm"
              title="View full weekly timetable matrix"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span>Timetable</span>
            </button>

            {/* OD Simulator Button */}
            <button
              onClick={onOpenODSimulator}
              className="px-3 py-2 rounded-lg bg-indigo-900/40 hover:bg-indigo-900/70 text-indigo-200 border border-indigo-700/50 text-xs font-semibold flex items-center space-x-1.5 transition shadow-sm relative"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>OD Simulator</span>
              {activeODCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                  {activeODCount}
                </span>
              )}
            </button>

            {/* AI Advisor Button */}
            <button
              onClick={onOpenAdvisor}
              className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-blue-600/30 transition transform active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Advisor</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};

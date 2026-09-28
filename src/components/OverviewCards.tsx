import React from 'react';
import { Award, BookOpen, CheckCircle, Flame, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';
import { OverallCalculation } from '../types/attendance';

interface OverviewCardsProps {
  overall: OverallCalculation;
  targetDate: string;
  referenceDate: string;
}

export const OverviewCards: React.FC<OverviewCardsProps> = ({
  overall,
  targetDate,
  referenceDate,
}) => {
  const isHealthy = overall.currentOverallPercentage >= 75;
  const isDistinction = overall.currentOverallPercentage >= 90;

  // Circular progress calculations for SVG
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overall.currentOverallPercentage / 100) * circumference;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      
      {/* 1. Overall Attendance Gauge */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Overall Health
          </span>
          <div className="flex items-baseline space-x-1.5">
            <span className={`text-3xl font-black ${
              overall.currentOverallPercentage < 75
                ? 'text-red-400'
                : overall.currentOverallPercentage >= 90
                ? 'text-emerald-400'
                : 'text-blue-400'
            }`}>
              {overall.currentOverallPercentage}%
            </span>
          </div>
          <div className="mt-2 flex items-center space-x-1 text-xs">
            <span className="text-slate-400">Attended:</span>
            <span className="font-bold text-white">{overall.totalAttended}</span>
            <span className="text-slate-400">/ {overall.totalConducted} conducted</span>
          </div>
        </div>

        {/* Circular Gauge */}
        <div className="relative w-22 h-22 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="currentColor"
              strokeWidth="7"
              className="text-slate-800"
              fill="transparent"
            />
            {/* 75% indicator line */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="currentColor"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={
                overall.currentOverallPercentage < 75
                  ? 'text-red-500 transition-all duration-700'
                  : overall.currentOverallPercentage >= 90
                  ? 'text-emerald-400 transition-all duration-700'
                  : 'text-blue-500 transition-all duration-700'
              }
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            {overall.hasAnyIrreversibleDetention ? (
              <ShieldAlert className="w-6 h-6 text-red-400" />
            ) : isDistinction ? (
              <Award className="w-6 h-6 text-emerald-400" />
            ) : isHealthy ? (
              <CheckCircle className="w-6 h-6 text-blue-400" />
            ) : (
              <Flame className="w-6 h-6 text-amber-400" />
            )}
          </div>
        </div>
      </div>

      {/* 2. Total Remaining Classes in Semester */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Classes Remaining
            </span>
            <div className="text-3xl font-black text-white">
              {overall.totalRemaining}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/50 flex items-center justify-center text-blue-400">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex justify-between">
          <span>Target Deadline:</span>
          <span className="font-bold text-slate-200">{targetDate}</span>
        </div>
      </div>

      {/* 3. Minimum Attendance Needed for 75% */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Need for 75% Safety
            </span>
            <div className="text-3xl font-black text-amber-400">
              {overall.overallNeededFor75}
              <span className="text-xs font-semibold text-slate-400 ml-1.5">classes</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-800/50 flex items-center justify-center text-amber-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs flex justify-between items-center">
          <span className="text-slate-400">Safe Bunks Allowed:</span>
          <span className={`font-bold ${overall.overallSafeBunks75 > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {overall.overallSafeBunks75} classes
          </span>
        </div>
      </div>

      {/* 4. Target for 90% Distinction */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Target for 90%
            </span>
            <div className="text-3xl font-black text-emerald-400">
              {overall.overallNeededFor90}
              <span className="text-xs font-semibold text-slate-400 ml-1.5">classes</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs flex justify-between items-center">
          <span className="text-slate-400">Margin for 90%:</span>
          <span className="font-bold text-slate-200">
            {overall.overallSafeBunks90} bunks cushion
          </span>
        </div>
      </div>

    </div>
  );
};

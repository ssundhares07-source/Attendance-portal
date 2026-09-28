import React, { useState } from 'react';
import { Calendar, Download, FileText, School, X, ExternalLink, Check, Copy } from 'lucide-react';
import { ClassSection, DayOfWeek } from '../types/attendance';
import { CLASS_SECTIONS } from '../data/srmTimetables';

interface TimetableExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: ClassSection;
  onSelectSection: (section: ClassSection) => void;
}

const PERIOD_TIMES: { period: number; time: string }[] = [
  { period: 1, time: '09:00 - 09:50' },
  { period: 2, time: '09:55 - 10:45' },
  { period: 3, time: '10:50 - 11:40' },
  { period: 4, time: '11:45 - 12:35' },
  { period: 5, time: '12:35 - 01:30' },
  { period: 6, time: '01:30 - 02:20' },
  { period: 7, time: '02:25 - 03:15' },
  { period: 8, time: '03:20 - 04:10' },
  { period: 9, time: '04:15 - 05:05' },
];

const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const TimetableExplorerModal: React.FC<TimetableExplorerModalProps> = ({
  isOpen,
  onClose,
  section,
  onSelectSection,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Export dataset function
  const handleDownloadDatasetJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(CLASS_SECTIONS, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `SRM_TRP_10_Sections_Timetable_Dataset.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(section, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl text-white overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-black text-white">{section.name} Timetable</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Venue: {section.room}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Mentor/Coord: {section.mentor} • {section.branch}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownloadDatasetJSON}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center space-x-1.5 transition"
              title="Download all 10 timetable section datasets"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Download 10-Section Dataset (JSON)</span>
            </button>

            <button
              onClick={handleCopyJSON}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center space-x-1.5 transition"
              title="Copy JSON for this section"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Switcher Tabs */}
        <div className="px-6 py-2.5 bg-slate-950/70 border-b border-slate-800 flex overflow-x-auto gap-1.5 shrink-0 scrollbar-thin">
          {CLASS_SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectSection(s)}
              className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                s.id === section.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Timetable Matrix */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="border border-slate-800 rounded-xl overflow-x-auto min-w-[750px]">
            <table className="w-full text-center text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <th className="p-3 w-28 text-left font-bold text-slate-300">Day / Period</th>
                  {PERIOD_TIMES.map((pt) => (
                    <th key={pt.period} className="p-2 border-l border-slate-800 font-bold min-w-[100px]">
                      <div>Period {pt.period}</div>
                      <div className="text-[10px] text-slate-500 font-normal">{pt.time}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {DAYS.map((day) => {
                  const daySlots = section.schedule[day] || [];
                  return (
                    <tr key={day} className="hover:bg-slate-800/20">
                      <td className="p-3 text-left font-bold text-slate-300 bg-slate-950/40">
                        {day}
                      </td>
                      {PERIOD_TIMES.map((pt) => {
                        const slot = daySlots.find((s) => s.periodNumber === pt.period);
                        const isLunch = pt.period === 5;

                        if (isLunch && !slot) {
                          return (
                            <td key={pt.period} className="p-1 border-l border-slate-800 bg-slate-950/20 text-slate-500 text-[10px] uppercase font-bold">
                              Lunch Break
                            </td>
                          );
                        }

                        if (!slot) {
                          return (
                            <td key={pt.period} className="p-2 border-l border-slate-800 text-slate-600 text-[10px]">
                              -
                            </td>
                          );
                        }

                        return (
                          <td
                            key={pt.period}
                            className={`p-2 border-l border-slate-800 text-left transition ${
                              slot.type === 'lab' ? 'bg-indigo-950/40' : 'bg-slate-850'
                            }`}
                          >
                            <span className="font-bold text-white block truncate leading-tight">
                              {slot.subjectName}
                            </span>
                            <span className="text-[10px] text-blue-400 font-mono block">
                              {slot.subjectCode}
                            </span>
                            <span className="text-[9px] text-slate-400 block">
                              {slot.room}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Subjects and Faculty Reference Table */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Registered Courses & Faculty Reference</span>
            </h3>
            <div className="border border-slate-800 rounded-xl overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/60 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Course Code</th>
                    <th className="p-3">Course Name</th>
                    <th className="p-3">Credits</th>
                    <th className="p-3">Faculty / Department</th>
                    <th className="p-3">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {section.subjects.map((s) => (
                    <tr key={s.code} className="hover:bg-slate-800/30">
                      <td className="p-3 font-mono font-bold text-blue-400">{s.code}</td>
                      <td className="p-3 font-semibold text-white">{s.name}</td>
                      <td className="p-3">{s.credits}</td>
                      <td className="p-3">{s.faculty}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          s.isLab ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {s.isLab ? 'Laboratory / Practical' : 'Lecture'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

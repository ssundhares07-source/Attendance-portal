import React, { useState } from 'react';
import { Calendar, Check, Plus, Sparkles, Trash2, X, AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import { LeaveRecord, SubjectCalculation } from '../types/attendance';

interface ODSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  leaves: LeaveRecord[];
  onAddLeave: (leave: Omit<LeaveRecord, 'id'>) => void;
  onRemoveLeave: (id: string) => void;
  onToggleApproval: (id: string) => void;
  subjects: SubjectCalculation[];
  overallProjectedWithOD: number;
  currentOverallPct: number;
  referenceDate: string;
}

export const ODSimulatorModal: React.FC<ODSimulatorModalProps> = ({
  isOpen,
  onClose,
  leaves,
  onAddLeave,
  onRemoveLeave,
  onToggleApproval,
  subjects,
  overallProjectedWithOD,
  currentOverallPct,
  referenceDate,
}) => {
  const [date, setDate] = useState(referenceDate);
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState<LeaveRecord['type']>('OD');
  const [reason, setReason] = useState('SRM National Technical Symposium / Hackathon');
  const [creditMode, setCreditMode] = useState<'credit_present' | 'exempt_total'>('credit_present');

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;
    onAddLeave({
      date,
      endDate: endDate || undefined,
      type,
      reason: reason || 'University Official OD',
      approved: true,
      creditMode,
    });
    setReason('');
    setEndDate('');
  };

  const rescuedCount = subjects.filter(s => s.isRescuedByOD).length;
  const overallDiff = (overallProjectedWithOD - currentOverallPct).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl text-white">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-slate-900/95 border-b border-slate-800 px-6 py-4 flex items-center justify-between z-10 backdrop-blur-sm">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">On-Duty (OD) & Medical Leave Simulator</h2>
              <p className="text-xs text-slate-400">Model the impact of On-Duty claims, sick leaves, and sports quotas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Quick Impact Highlight Card */}
          <div className="bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-700/50 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block mb-1">
                OD Impact Summary
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-black text-white">{currentOverallPct}%</span>
                <span className="text-slate-400 text-sm">&rarr;</span>
                <span className="text-3xl font-black text-emerald-400">{overallProjectedWithOD}%</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold">
                  +{overallDiff}% boost
                </span>
              </div>
            </div>

            {rescuedCount > 0 ? (
              <div className="flex items-center space-x-2 bg-emerald-950/80 border border-emerald-600/60 px-3.5 py-2 rounded-xl text-emerald-200 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>🎉 {rescuedCount} subject(s) rescued from danger zone!</span>
              </div>
            ) : (
              <div className="text-xs text-slate-400">
                Active OD leaves approved: <strong className="text-white">{leaves.filter(l => l.approved).length}</strong>
              </div>
            )}
          </div>

          {/* Add OD Form */}
          <form onSubmit={handleAdd} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 flex items-center space-x-1.5">
              <Plus className="w-4 h-4 text-indigo-400" />
              <span>Add New OD / Medical Certificate</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Start Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-medium focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">End Date (Optional)</label>
                <input
                  type="date"
                  value={endDate}
                  min={date}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-medium focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Category</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-medium focus:border-indigo-500"
                >
                  <option value="OD">On-Duty (Symposium/Conf)</option>
                  <option value="Hackathon">Hackathon / Project Expo</option>
                  <option value="Sports">University Sports Meet</option>
                  <option value="Medical">Medical Leave (Sick cert)</option>
                  <option value="Personal">Personal Absenteeism</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Credit Mode</label>
                <select
                  value={creditMode}
                  onChange={(e) => setCreditMode(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-medium focus:border-indigo-500"
                >
                  <option value="credit_present">Credit as Present (SRM Rule)</option>
                  <option value="exempt_total">Exempt Conducted Denominator</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-slate-400 text-xs font-semibold block mb-1">Description / Reason</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Smart India Hackathon / Inter-Collegiate Basketball / Dengue Medical Rest"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition shadow-md flex items-center space-x-1 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Claim</span>
                </button>
              </div>
            </div>
          </form>

          {/* Active Claims List */}
          <div>
            <h3 className="text-sm font-bold text-slate-200 mb-3">
              Configured OD Claims ({leaves.length})
            </h3>
            {leaves.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                No OD or Medical claims simulated yet. Add one above to test your percentage recovery!
              </div>
            ) : (
              <div className="space-y-2">
                {leaves.map((l) => (
                  <div
                    key={l.id}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs ${
                      l.approved
                        ? 'bg-slate-800/80 border-slate-700'
                        : 'bg-slate-900 border-slate-800 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => onToggleApproval(l.id)}
                        className={`w-5 h-5 rounded flex items-center justify-center border transition ${
                          l.approved
                            ? 'bg-emerald-600 border-emerald-500 text-white'
                            : 'border-slate-600 text-transparent'
                        }`}
                        title="Toggle inclusion in simulation"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white">{l.reason}</span>
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800 font-semibold">
                            {l.type}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {l.date} {l.endDate ? `to ${l.endDate}` : ''} • {l.creditMode === 'credit_present' ? 'Credit as Present' : 'Exempt total'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveLeave(l.id)}
                      className="text-slate-500 hover:text-red-400 p-1 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subject-by-Subject OD Impact Table */}
          <div>
            <h3 className="text-sm font-bold text-slate-200 mb-3">Subject Impact Preview</h3>
            <div className="border border-slate-800 rounded-xl overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/80 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Subject</th>
                    <th className="p-3">Before OD</th>
                    <th className="p-3">OD Boost</th>
                    <th className="p-3">Projected %</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {subjects.map((s) => (
                    <tr key={s.code} className="hover:bg-slate-800/30">
                      <td className="p-3">
                        <span className="font-bold text-white block">{s.name}</span>
                        <span className="text-[11px] text-slate-400">{s.code}</span>
                      </td>
                      <td className="p-3 font-semibold">{s.currentPercentage}%</td>
                      <td className="p-3">
                        {s.odAttendedBoost > 0 ? (
                          <span className="text-emerald-400 font-bold">+{s.odAttendedBoost} classes</span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="p-3 font-bold text-white">
                        {s.projectedPercentageWithOD}%
                      </td>
                      <td className="p-3">
                        {s.isRescuedByOD ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold text-[10px]">
                            RESCUED (&gt;75%)
                          </span>
                        ) : s.projectedPercentageWithOD >= 75 ? (
                          <span className="text-emerald-400 font-semibold">Safe</span>
                        ) : (
                          <span className="text-red-400 font-semibold">Under 75%</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-slate-900 border-t border-slate-800 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition"
          >
            Apply & View Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};

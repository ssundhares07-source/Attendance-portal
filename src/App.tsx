/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { CLASS_SECTIONS, ACADEMIC_CALENDAR } from './data/srmTimetables';
import { calculateAttendanceForSection } from './utils/attendanceCalculator';
import { ClassSection, LeaveRecord } from './types/attendance';
import { Header } from './components/Header';
import { IrreversibleDetentionAlert } from './components/IrreversibleDetentionAlert';
import { OverviewCards } from './components/OverviewCards';
import { SubjectAttendanceList } from './components/SubjectAttendanceList';
import { ChartsView } from './components/ChartsView';
import { ODSimulatorModal } from './components/ODSimulatorModal';
import { TimetableExplorerModal } from './components/TimetableExplorerModal';
import { AttendanceAdvisorChat } from './components/AttendanceAdvisorChat';
import { Calendar, Info, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [selectedSection, setSelectedSection] = useState<ClassSection>(CLASS_SECTIONS[0]);
  const [referenceDate, setReferenceDate] = useState<string>('2026-09-28');
  const [targetDate, setTargetDate] = useState<string>('2026-11-27');

  // Attendance user overrides per subject
  const [subjectInputs, setSubjectInputs] = useState<Record<string, { currentPercentage?: number; attended?: number; conducted?: number }>>({});

  // OD / Medical Leave records
  const [leaves, setLeaves] = useState<LeaveRecord[]>([
    {
      id: 'default-od-1',
      date: '2026-09-23',
      endDate: '2026-09-24',
      type: 'OD',
      reason: 'SRM Hackathon & Technical Fest Participation',
      approved: true,
      creditMode: 'credit_present',
    },
  ]);

  // Modal view states
  const [isTimetableOpen, setIsTimetableOpen] = useState(false);
  const [isODModalOpen, setIsODModalOpen] = useState(false);
  const [isAdvisorChatOpen, setIsAdvisorChatOpen] = useState(false);

  // Run calculation engine
  const { subjects, overall, upcomingClasses } = useMemo(() => {
    return calculateAttendanceForSection(
      selectedSection,
      referenceDate,
      targetDate,
      subjectInputs,
      leaves,
      ACADEMIC_CALENDAR
    );
  }, [selectedSection, referenceDate, targetDate, subjectInputs, leaves]);

  // Handlers for subject inputs
  const handleUpdatePercentage = (code: string, pct: number) => {
    setSubjectInputs((prev) => ({
      ...prev,
      [code]: {
        ...prev[code],
        currentPercentage: Math.max(0, Math.min(100, pct)),
        attended: undefined, // Let percentage drive attended count
      },
    }));
  };

  const handleUpdateCounts = (code: string, attended: number, conducted: number) => {
    setSubjectInputs((prev) => ({
      ...prev,
      [code]: {
        conducted: Math.max(1, conducted),
        attended: Math.max(0, Math.min(conducted, attended)),
        currentPercentage: undefined, // Let counts drive percentage
      },
    }));
  };

  const handleQuickSimulateAll = (targetPct: number) => {
    const updated: Record<string, { currentPercentage: number }> = {};
    for (const sub of selectedSection.subjects) {
      updated[sub.code] = { currentPercentage: targetPct };
    }
    setSubjectInputs(updated);
  };

  // Handlers for OD Simulator
  const handleAddLeave = (leave: Omit<LeaveRecord, 'id'>) => {
    const newRecord: LeaveRecord = {
      ...leave,
      id: Date.now().toString(),
    };
    setLeaves((prev) => [...prev, newRecord]);
  };

  const handleRemoveLeave = (id: string) => {
    setLeaves((prev) => prev.filter((l) => l.id !== id));
  };

  const handleToggleApproval = (id: string) => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === id ? { ...l, approved: !l.approved } : l))
    );
  };

  const detainedSubjects = subjects.filter((s) => s.isIrreversibleDetention);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation & Controls */}
      <Header
        selectedSection={selectedSection}
        onSelectSection={(sec) => {
          setSelectedSection(sec);
          setSubjectInputs({}); // Reset custom inputs when switching section
        }}
        referenceDate={referenceDate}
        onChangeReferenceDate={setReferenceDate}
        targetDate={targetDate}
        onChangeTargetDate={setTargetDate}
        onOpenTimetable={() => setIsTimetableOpen(true)}
        onOpenODSimulator={() => setIsODModalOpen(true)}
        onOpenAdvisor={() => setIsAdvisorChatOpen(true)}
        activeODCount={leaves.filter((l) => l.approved).length}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Academic Calendar Context Bar */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl px-4 py-2.5 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span className="font-semibold text-slate-200">SRM Institute Odd Semester 2026</span>
            <span>•</span>
            <span>Term: Aug 3, 2026 to Nov 27, 2026</span>
          </div>

          <div className="flex items-center space-x-3">
            <span>Reference Date: <strong className="text-slate-200">{referenceDate}</strong></span>
            <span>&rarr;</span>
            <span>Planning End: <strong className="text-slate-200">{targetDate}</strong></span>
            <span>•</span>
            <span>Scheduled Holidays: <strong className="text-slate-200">{ACADEMIC_CALENDAR.holidays.length} Days</strong></span>
          </div>
        </div>

        {/* LOUD WARNING SYSTEM: Irreversible Detention Alert */}
        <IrreversibleDetentionAlert
          detainedSubjects={detainedSubjects}
          onOpenODSimulator={() => setIsODModalOpen(true)}
          onOpenAdvisor={() => setIsAdvisorChatOpen(true)}
        />

        {/* Overview KPI Cards */}
        <OverviewCards
          overall={overall}
          targetDate={targetDate}
          referenceDate={referenceDate}
        />

        {/* Phase 2: Visual Charts View */}
        <ChartsView
          subjects={subjects}
          section={selectedSection}
        />

        {/* Subject-by-Subject Attendance Matrix & Danger Zone Calculator */}
        <SubjectAttendanceList
          subjects={subjects}
          onUpdatePercentage={handleUpdatePercentage}
          onUpdateCounts={handleUpdateCounts}
          onQuickSimulateAll={handleQuickSimulateAll}
        />

        {/* Bottom Quick Help Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-xs text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Info className="w-5 h-5 text-blue-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">Official University Regulations (SRM TRP FET)</span>
              <span>75.0% minimum attendance is strictly mandatory to receive semester examination hall tickets. Students with 65.0% - 74.9% may apply for Condonation with medical/OD proof. Below 65.0% leads to Year/Semester repeat.</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setIsTimetableOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold"
            >
              View Full Timetable
            </button>
            <button
              onClick={() => setIsODModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
            >
              Simulate OD
            </button>
          </div>
        </div>

      </main>

      {/* Modals & Floating Tools */}
      <ODSimulatorModal
        isOpen={isODModalOpen}
        onClose={() => setIsODModalOpen(false)}
        leaves={leaves}
        onAddLeave={handleAddLeave}
        onRemoveLeave={handleRemoveLeave}
        onToggleApproval={handleToggleApproval}
        subjects={subjects}
        overallProjectedWithOD={overall.projectedOverallWithOD}
        currentOverallPct={overall.currentOverallPercentage}
        referenceDate={referenceDate}
      />

      <TimetableExplorerModal
        isOpen={isTimetableOpen}
        onClose={() => setIsTimetableOpen(false)}
        section={selectedSection}
        onSelectSection={setSelectedSection}
      />

      {/* Phase 2: Attendance Advisor AI Chatbot */}
      <AttendanceAdvisorChat
        isOpen={isAdvisorChatOpen}
        onToggle={() => setIsAdvisorChatOpen(!isAdvisorChatOpen)}
        subjects={subjects}
        overall={overall}
        section={selectedSection}
        referenceDate={referenceDate}
        targetDate={targetDate}
        upcomingClasses={upcomingClasses}
      />
    </div>
  );
}

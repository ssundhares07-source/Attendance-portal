export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export interface TimetableSlot {
  periodNumber: number;
  startTime: string;
  endTime: string;
  subjectCode: string;
  subjectName: string;
  type: 'theory' | 'lab' | 'tutorial';
  room: string;
  faculty?: string;
}

export interface DaySchedule {
  day: DayOfWeek;
  slots: TimetableSlot[];
}

export interface SubjectMeta {
  code: string;
  name: string;
  faculty: string;
  credits: number;
  color: string;
  isLab: boolean;
}

export interface ClassSection {
  id: string;
  name: string;
  branch: string;
  yearSemester: string;
  room: string;
  mentor: string;
  subjects: SubjectMeta[];
  schedule: Record<DayOfWeek, TimetableSlot[]>;
}

export interface AcademicHoliday {
  date: string; // YYYY-MM-DD
  name: string;
  type: 'national' | 'festival' | 'exam' | 'break';
}

export interface AcademicCalendarConfig {
  semesterStartDate: string; // e.g. 2026-08-03
  semesterEndDate: string;   // e.g. 2026-11-27
  holidays: AcademicHoliday[];
}

export interface LeaveRecord {
  id: string;
  date: string; // YYYY-MM-DD
  endDate?: string; // Optional range YYYY-MM-DD
  type: 'OD' | 'Medical' | 'Personal' | 'Sports' | 'Hackathon';
  reason: string;
  approved: boolean;
  creditMode: 'credit_present' | 'exempt_total';
}

export interface SubjectCalculation {
  code: string;
  name: string;
  faculty: string;
  color: string;
  conductedSoFar: number;
  attendedSoFar: number;
  currentPercentage: number;
  remainingClasses: number;
  totalSemesterClasses: number;
  
  // 75% threshold
  requiredFor75: number;
  neededFor75: number;
  safeBunks75: number;
  isDangerZone: boolean;
  isIrreversibleDetention: boolean;
  maxPossiblePercentage: number;
  detentionDeficit: number;

  // 90% threshold
  requiredFor90: number;
  neededFor90: number;
  safeBunks90: number;
  canReach90: number; // 1 if possible, 0 if not

  // OD simulator impact
  odAttendedBoost: number;
  projectedPercentageWithOD: number;
  isRescuedByOD: boolean;
}

export interface OverallCalculation {
  totalConducted: number;
  totalAttended: number;
  currentOverallPercentage: number;
  totalRemaining: number;
  totalSemesterClasses: number;
  overallNeededFor75: number;
  overallSafeBunks75: number;
  overallNeededFor90: number;
  overallSafeBunks90: number;
  hasAnyIrreversibleDetention: boolean;
  detainedSubjectCodes: string[];
  endangeredSubjectCodes: string[];
  projectedOverallWithOD: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: 'gemini' | 'algorithmic' | 'fallback';
}

export interface DateClassSlot {
  date: string;
  dayName: DayOfWeek;
  periodNumber: number;
  startTime: string;
  endTime: string;
  subjectCode: string;
  subjectName: string;
  type: 'theory' | 'lab' | 'tutorial';
  room: string;
}


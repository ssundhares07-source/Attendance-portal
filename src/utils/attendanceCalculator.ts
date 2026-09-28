import { ClassSection, AcademicCalendarConfig, LeaveRecord, SubjectCalculation, OverallCalculation, DayOfWeek, DateClassSlot } from '../types/attendance';

const DAY_NAMES: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export function getDayOfWeekName(dateStr: string): DayOfWeek | null {
  const d = new Date(dateStr + 'T12:00:00');
  const dayIndex = d.getDay(); // 0 is Sun, 6 is Sat
  if (dayIndex === 0 || dayIndex === 6) return null;
  return DAY_NAMES[dayIndex - 1] || null;
}

export function isHoliday(dateStr: string, calendar: AcademicCalendarConfig): boolean {
  return calendar.holidays.some(h => h.date === dateStr);
}

// Generate all scheduled class instances between start and end date
export function getScheduledClassesBetween(
  section: ClassSection,
  startDateStr: string,
  endDateStr: string,
  calendar: AcademicCalendarConfig
): DateClassSlot[] {
  const slots: DateClassSlot[] = [];
  const start = new Date(startDateStr + 'T00:00:00');
  const end = new Date(endDateStr + 'T00:00:00');

  if (start > end) return slots;

  const current = new Date(start);
  while (current <= end) {
    const yyyy = current.getFullYear();
    const mm = String(current.getMonth() + 1).padStart(2, '0');
    const dd = String(current.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const dayName = getDayOfWeekName(dateStr);
    if (dayName && !isHoliday(dateStr, calendar)) {
      const daySlots = section.schedule[dayName] || [];
      for (const slot of daySlots) {
        slots.push({
          date: dateStr,
          dayName,
          ...slot,
        });
      }
    }

    current.setDate(current.getDate() + 1);
  }

  return slots;
}

export function calculateAttendanceForSection(
  section: ClassSection,
  referenceDateStr: string,
  targetDateStr: string,
  subjectInputs: Record<string, { currentPercentage?: number; attended?: number; conducted?: number }>,
  leaves: LeaveRecord[],
  calendar: AcademicCalendarConfig
): { subjects: SubjectCalculation[]; overall: OverallCalculation; upcomingClasses: DateClassSlot[] } {
  // 1. Calculate conducted slots from semester start to referenceDate
  const conductedSlots = getScheduledClassesBetween(
    section,
    calendar.semesterStartDate,
    referenceDateStr,
    calendar
  );

  // 2. Calculate remaining slots from day after referenceDate to targetDate
  const refNextDate = new Date(referenceDateStr + 'T00:00:00');
  refNextDate.setDate(refNextDate.getDate() + 1);
  const refNextStr = refNextDate.toISOString().split('T')[0];

  const remainingSlots = getScheduledClassesBetween(
    section,
    refNextStr,
    targetDateStr,
    calendar
  );

  // 3. Calculate OD leave impact
  // Find which slots fall within approved OD leave dates
  const activeLeaves = leaves.filter(l => l.approved);
  const odCoveredSlotsBySubject: Record<string, number> = {};

  for (const leave of activeLeaves) {
    const lStart = leave.date;
    const lEnd = leave.endDate || leave.date;
    const leaveSlots = getScheduledClassesBetween(section, lStart, lEnd, calendar);
    for (const slot of leaveSlots) {
      // If leave was during conducted period
      if (slot.date <= referenceDateStr) {
        odCoveredSlotsBySubject[slot.subjectCode] = (odCoveredSlotsBySubject[slot.subjectCode] || 0) + 1;
      }
    }
  }

  // 4. Compute for each subject
  const subjectCalcs: SubjectCalculation[] = section.subjects.map(subject => {
    // Scheduled conducted
    const scheduledConducted = conductedSlots.filter(s => s.subjectCode === subject.code).length;
    // Scheduled remaining
    const remainingCount = remainingSlots.filter(s => s.subjectCode === subject.code).length;

    const input = subjectInputs[subject.code] || {};
    // By default conducted is scheduledConducted (min 1 to avoid div by 0)
    const conducted = input.conducted !== undefined ? input.conducted : Math.max(1, scheduledConducted);

    // Attended can be provided directly or derived from percentage
    let attended: number;
    let percentage: number;

    if (input.attended !== undefined) {
      attended = Math.min(conducted, Math.max(0, input.attended));
      percentage = conducted > 0 ? (attended / conducted) * 100 : 100;
    } else if (input.currentPercentage !== undefined) {
      percentage = Math.min(100, Math.max(0, input.currentPercentage));
      attended = Math.round((percentage / 100) * conducted);
    } else {
      // Default: 82% default healthy baseline
      percentage = 82;
      attended = Math.round((percentage / 100) * conducted);
    }

    const totalSemesterClasses = conducted + remainingCount;

    // 75% rule
    const requiredFor75 = Math.ceil(0.75 * totalSemesterClasses);
    const neededFor75 = Math.max(0, requiredFor75 - attended);
    const isIrreversibleDetention = neededFor75 > remainingCount;
    const maxPossibleAttended = attended + remainingCount;
    const maxPossiblePercentage = totalSemesterClasses > 0
      ? (maxPossibleAttended / totalSemesterClasses) * 100
      : 100;
    const detentionDeficit = isIrreversibleDetention ? neededFor75 - remainingCount : 0;
    const safeBunks75 = isIrreversibleDetention ? 0 : Math.max(0, remainingCount - neededFor75);
    const isDangerZone = percentage < 75;

    // 90% rule
    const requiredFor90 = Math.ceil(0.90 * totalSemesterClasses);
    const neededFor90 = Math.max(0, requiredFor90 - attended);
    const canReach90 = neededFor90 <= remainingCount ? 1 : 0;
    const safeBunks90 = canReach90 ? Math.max(0, remainingCount - neededFor90) : 0;

    // OD calculations
    const odSlotsCount = odCoveredSlotsBySubject[subject.code] || 0;
    let odAttendedBoost = 0;
    let projectedPercentageWithOD = percentage;

    if (odSlotsCount > 0) {
      // Assume default OD credit: counts as present
      const boostAttended = Math.min(conducted, attended + odSlotsCount);
      odAttendedBoost = boostAttended - attended;
      projectedPercentageWithOD = conducted > 0 ? (boostAttended / conducted) * 100 : 100;
    }

    const isRescuedByOD = isDangerZone && projectedPercentageWithOD >= 75;

    return {
      code: subject.code,
      name: subject.name,
      faculty: subject.faculty,
      color: subject.color,
      conductedSoFar: conducted,
      attendedSoFar: attended,
      currentPercentage: Math.round(percentage * 10) / 10,
      remainingClasses: remainingCount,
      totalSemesterClasses,
      requiredFor75,
      neededFor75,
      safeBunks75,
      isDangerZone,
      isIrreversibleDetention,
      maxPossiblePercentage: Math.round(maxPossiblePercentage * 10) / 10,
      detentionDeficit,
      requiredFor90,
      neededFor90,
      safeBunks90,
      canReach90,
      odAttendedBoost,
      projectedPercentageWithOD: Math.round(projectedPercentageWithOD * 10) / 10,
      isRescuedByOD,
    };
  });

  // Overall calculations
  const totalConducted = subjectCalcs.reduce((acc, s) => acc + s.conductedSoFar, 0);
  const totalAttended = subjectCalcs.reduce((acc, s) => acc + s.attendedSoFar, 0);
  const totalRemaining = subjectCalcs.reduce((acc, s) => acc + s.remainingClasses, 0);
  const totalSemester = totalConducted + totalRemaining;

  const currentOverallPercentage = totalConducted > 0
    ? Math.round((totalAttended / totalConducted) * 1000) / 10
    : 100;

  const overallRequired75 = Math.ceil(0.75 * totalSemester);
  const overallNeededFor75 = Math.max(0, overallRequired75 - totalAttended);
  const overallSafeBunks75 = Math.max(0, totalRemaining - overallNeededFor75);

  const overallRequired90 = Math.ceil(0.90 * totalSemester);
  const overallNeededFor90 = Math.max(0, overallRequired90 - totalAttended);
  const overallSafeBunks90 = overallNeededFor90 <= totalRemaining
    ? Math.max(0, totalRemaining - overallNeededFor90)
    : 0;

  const detainedSubjectCodes = subjectCalcs
    .filter(s => s.isIrreversibleDetention)
    .map(s => s.code);

  const endangeredSubjectCodes = subjectCalcs
    .filter(s => s.isDangerZone && !s.isIrreversibleDetention)
    .map(s => s.code);

  const totalODBoost = subjectCalcs.reduce((acc, s) => acc + s.odAttendedBoost, 0);
  const projectedOverallWithOD = totalConducted > 0
    ? Math.round(((totalAttended + totalODBoost) / totalConducted) * 1000) / 10
    : 100;

  const overall: OverallCalculation = {
    totalConducted,
    totalAttended,
    currentOverallPercentage,
    totalRemaining,
    totalSemesterClasses: totalSemester,
    overallNeededFor75,
    overallSafeBunks75,
    overallNeededFor90,
    overallSafeBunks90,
    hasAnyIrreversibleDetention: detainedSubjectCodes.length > 0,
    detainedSubjectCodes,
    endangeredSubjectCodes,
    projectedOverallWithOD,
  };

  // Next 10 upcoming classes for schedule preview
  const upcomingClasses = remainingSlots.slice(0, 15);

  return {
    subjects: subjectCalcs,
    overall,
    upcomingClasses,
  };
}

import { ClassSection, AcademicCalendarConfig } from '../types/attendance';

export const ACADEMIC_CALENDAR: AcademicCalendarConfig = {
  semesterStartDate: '2026-08-03',
  semesterEndDate: '2026-11-27',
  holidays: [
    { date: '2026-08-15', name: 'Independence Day', type: 'national' },
    { date: '2026-08-26', name: 'Krishna Janmashtami', type: 'festival' },
    { date: '2026-09-07', name: 'Vinayaka Chaturthi', type: 'festival' },
    { date: '2026-09-16', name: 'Milad-un-Nabi', type: 'festival' },
    { date: '2026-10-02', name: 'Mahatma Gandhi Jayanti', type: 'national' },
    { date: '2026-10-20', name: 'Ayutha Pooja / Maha Navami', type: 'festival' },
    { date: '2026-10-21', name: 'Vijaya Dasami', type: 'festival' },
    { date: '2026-10-31', name: 'Deepavali Eve', type: 'festival' },
    { date: '2026-11-01', name: 'Deepavali', type: 'festival' },
  ],
};

export const CLASS_SECTIONS: ClassSection[] = [
  {
    id: 'I-ECE-A',
    name: 'I ECE-A (First Year)',
    branch: 'Electronics and Communication Engineering',
    yearSemester: 'Year I / Sem I',
    room: 'IST 602',
    mentor: 'Dr. R. Aarthi (AP/Phy)',
    subjects: [
      { code: '21LEH104T', name: 'German', faculty: 'Mr. Selva', credits: 3, color: '#3B82F6', isLab: false },
      { code: '21GNH101J', name: 'Philosophy of Engineering', faculty: 'Dr. R. Aarthi', credits: 2, color: '#8B5CF6', isLab: false },
      { code: '21MAB102T', name: 'Adv. Calculus & Complex Analysis (Slot A)', faculty: 'Dr. R. Ragul', credits: 4, color: '#EC4899', isLab: false },
      { code: '21CYB101J', name: 'Chemistry (Slot B)', faculty: 'Dr. P. Pachamuthu', credits: 5, color: '#10B981', isLab: true },
      { code: '21BTB102J', name: 'Electronic System & PCB Design (Slot C)', faculty: 'Dr. U. Shajith Ali', credits: 2, color: '#F59E0B', isLab: false },
      { code: '21CSS101J', name: 'Programming for Problem Solving (Slot D)', faculty: 'Dr. A. Rama Prasath', credits: 4, color: '#06B6D4', isLab: true },
      { code: '21MES101L', name: 'Basic Civil & Mech Workshop', faculty: 'Dr. N.S. Balaji / Dr. M. Kumaran', credits: 2, color: '#6366F1', isLab: true },
      { code: '21PDM102L', name: 'General Aptitude (CDC)', faculty: 'Mr. Sivanandhan', credits: 2, color: '#14B8A6', isLab: false },
      { code: '21GNM102L', name: 'NSS', faculty: 'Dr. R. Manickam', credits: 2, color: '#84CC16', isLab: false },
      { code: '21BTB103T', name: 'Biology (Slot F)', faculty: 'Dr. M. Jaya Priya', credits: 2, color: '#F97316', isLab: false }
    ],
    schedule: {
      Monday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21GNH101J', subjectName: 'Philosophy of Engg', type: 'theory', room: 'IST602' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21GNH101J', subjectName: 'Philosophy of Engg', type: 'theory', room: 'IST602' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21CYB101J', subjectName: 'Chemistry', type: 'theory', room: 'IST602' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21MAB102T', subjectName: 'Adv. Calculus', type: 'theory', room: 'IST602' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21CYB101J', subjectName: 'Che Lab', type: 'lab', room: 'Che Lab' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21CYB101J', subjectName: 'Che Lab', type: 'lab', room: 'Che Lab' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21BTB103T', subjectName: 'Biology', type: 'theory', room: 'IST710' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21PDM102L', subjectName: 'CDC Aptitude', type: 'theory', room: 'IST710' }
      ],
      Tuesday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21BTB102J', subjectName: 'Electronic System & PCB', type: 'theory', room: 'IST602' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21CYB101J', subjectName: 'Chemistry', type: 'theory', room: 'IST602' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21MAB102T', subjectName: 'Adv. Calculus', type: 'theory', room: 'IST602' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21CSS101J', subjectName: 'Programming (PPS)', type: 'theory', room: 'IST602' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21MES101L', subjectName: 'Workshop', type: 'lab', room: 'IST 20,21' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21MES101L', subjectName: 'Workshop', type: 'lab', room: 'IST 20,21' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21MES101L', subjectName: 'Workshop', type: 'lab', room: 'IST 20,21' }
      ],
      Wednesday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21CYB101J', subjectName: 'Chemistry', type: 'theory', room: 'IST602' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21GNH101J', subjectName: 'Philosophy of Engg', type: 'theory', room: 'IST602' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21CSS101J', subjectName: 'Programming (PPS)', type: 'theory', room: 'IST602' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21CSS101J', subjectName: 'PPS LAB', type: 'lab', room: 'IST 618' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21CSS101J', subjectName: 'PPS LAB', type: 'lab', room: 'IST 618' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21BTB102J', subjectName: 'PCB Lab', type: 'lab', room: 'IST 108' }
      ],
      Thursday: [
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21LEH104T', subjectName: 'German', type: 'theory', room: 'IST602' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21MAB102T', subjectName: 'Adv. Calculus', type: 'theory', room: 'IST602' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21PDM102L', subjectName: 'CDC Aptitude', type: 'theory', room: 'IST510' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21PDM102L', subjectName: 'CDC Aptitude', type: 'theory', room: 'IST510' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21GNM102L', subjectName: 'NSS', type: 'theory', room: 'IST201' }
      ],
      Friday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21CSS101J', subjectName: 'Programming (PPS)', type: 'theory', room: 'IST602' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21MAB102T', subjectName: 'Adv. Calculus', type: 'theory', room: 'IST602' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21BTB102J', subjectName: 'Electronic System & PCB', type: 'theory', room: 'IST602' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21CYB101J', subjectName: 'Chemistry', type: 'theory', room: 'IST602' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21BTB103T', subjectName: 'Biology', type: 'theory', room: 'IST602' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21LEH104T', subjectName: 'German', type: 'theory', room: 'IST626' }
      ]
    }
  },
  {
    id: 'I-ECE-B-EEE',
    name: 'I ECE-B / EEE',
    branch: 'ECE & Electrical and Electronics Engg',
    yearSemester: 'Year I / Sem I',
    room: 'IST 602 / 520',
    mentor: 'Dr. V.N. Senthilkumaran (HOD - ECE/EEE)',
    subjects: [
      { code: '21LEH104T', name: 'German', faculty: 'Mr. Selva', credits: 3, color: '#3B82F6', isLab: false },
      { code: '21GNH101J', name: 'Philosophy of Engineering', faculty: 'Dr. R. Aarthi', credits: 2, color: '#8B5CF6', isLab: false },
      { code: '21MAB102T', name: 'Adv. Calculus & Complex Analysis (Slot A)', faculty: 'Dr. M. Deepa', credits: 4, color: '#EC4899', isLab: false },
      { code: '21CYB101J', name: 'Chemistry (Slot B)', faculty: 'Dr. N. Prabhu', credits: 5, color: '#10B981', isLab: true },
      { code: '21BTB102J', name: 'Electronic System & PCB Design (Slot F)', faculty: 'Dr. U. Shajith Ali', credits: 2, color: '#F59E0B', isLab: false },
      { code: '21CSS101J', name: 'Programming for Problem Solving (Slot D)', faculty: 'Dr. A. Rama Prasath', credits: 4, color: '#06B6D4', isLab: true },
      { code: '21MES101L', name: 'Basic Civil & Mech Workshop', faculty: 'Dr. Modasir MD Khan', credits: 2, color: '#6366F1', isLab: true },
      { code: '21PDM102L', name: 'General Aptitude (CDC)', faculty: 'Mrs. Thenmozhi', credits: 2, color: '#14B8A6', isLab: false },
      { code: '21GNM102L', name: 'NSS', faculty: 'Dr. R. Manickam', credits: 2, color: '#84CC16', isLab: false },
      { code: '21BTB103T', name: 'Biology (Slot C)', faculty: 'Dr. M. Jaya Priya', credits: 2, color: '#F97316', isLab: false },
      { code: '21EEC101J', name: 'Electrical Circuits (Slot G)', faculty: 'Dr. Dheepanchakkravarthy', credits: 2, color: '#A855F7', isLab: true }
    ],
    schedule: {
      Monday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21PDM102L', subjectName: 'CDC Aptitude', type: 'theory', room: 'IST609' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21BTB102J', subjectName: 'PCB Design', type: 'theory', room: 'IST710' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21CYB101J', subjectName: 'Che Lab', type: 'lab', room: 'Che Lab' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21CYB101J', subjectName: 'Che Lab', type: 'lab', room: 'Che Lab' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21GNH101J', subjectName: 'Philosophy of Engg', type: 'theory', room: 'IST602' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21GNH101J', subjectName: 'Philosophy of Engg', type: 'theory', room: 'IST602' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21CYB101J', subjectName: 'Chemistry', type: 'theory', room: 'IST602' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21MAB102T', subjectName: 'Adv. Calculus', type: 'theory', room: 'IST602' }
      ],
      Tuesday: [
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21MES101L', subjectName: 'Workshop', type: 'lab', room: 'IST 20,21' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21MES101L', subjectName: 'Workshop', type: 'lab', room: 'IST 20,21' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21BTB103T', subjectName: 'Biology', type: 'theory', room: 'IST602' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21CYB101J', subjectName: 'Chemistry', type: 'theory', room: 'IST602' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21MAB102T', subjectName: 'Adv. Calculus', type: 'theory', room: 'IST602' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21CSS101J', subjectName: 'Programming (PPS)', type: 'theory', room: 'IST602' }
      ],
      Wednesday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21BTB102J', subjectName: 'Electronic System & PCB', type: 'theory', room: 'IST710' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21CSS101J', subjectName: 'PPS Lab', type: 'lab', room: 'IST617' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21PDM102L', subjectName: 'CDC Aptitude', type: 'theory', room: 'IST510' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21PDM102L', subjectName: 'CDC Aptitude', type: 'theory', room: 'IST510' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21CSS101J', subjectName: 'PPS Lab', type: 'lab', room: 'IST618' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21CYB101J', subjectName: 'Chemistry', type: 'theory', room: 'IST602' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21GNH101J', subjectName: 'Philosophy of Engg', type: 'theory', room: 'IST602' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21CSS101J', subjectName: 'Programming (PPS)', type: 'theory', room: 'IST602' }
      ],
      Thursday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21GNM102L', subjectName: 'NSS', type: 'theory', room: '201' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21GNM102L', subjectName: 'NSS', type: 'theory', room: '201' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21BTB103T', subjectName: 'Biology', type: 'theory', room: 'IST626' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21MAB102T', subjectName: 'Adv. Calculus', type: 'theory', room: 'IST710' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21CSS101J', subjectName: 'Programming (PPS)', type: 'theory', room: 'IST602' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21LEH104T', subjectName: 'German', type: 'theory', room: 'IST602' }
      ],
      Friday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21BTB102J', subjectName: 'PCB Lab / EC Lab', type: 'lab', room: 'IST 617' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21BTB102J', subjectName: 'PCB Lab / EC Lab', type: 'lab', room: 'IST 617' },
        { periodNumber: 5, startTime: '12:35', endTime: '13:25', subjectCode: '21LEH104T', subjectName: 'German', type: 'theory', room: 'IST626' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21CYB101J', subjectName: 'Chemistry', type: 'theory', room: 'IST602' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21MAB102T', subjectName: 'Adv. Calculus', type: 'theory', room: 'IST602' }
      ]
    }
  },
  {
    id: 'I-ECE-DS',
    name: 'I ECE - Data Science',
    branch: 'Electronics and Communication (Data Science)',
    yearSemester: 'Year I / Sem I',
    room: 'IST 502',
    mentor: 'Dr. V.N. Senthil Kumaran (Asso.Prof/ECE)',
    subjects: [
      { code: '21LEH104T', name: 'German', faculty: 'Mr. Selva', credits: 3, color: '#3B82F6', isLab: false },
      { code: '21GNH101J', name: 'Philosophy of Engineering', faculty: 'Dr. R. Ramesh', credits: 2, color: '#8B5CF6', isLab: false },
      { code: '21MAB102T', name: 'Adv. Calculus & Complex Analysis (Slot A)', faculty: 'Dr. Pandiyarajan', credits: 4, color: '#EC4899', isLab: false },
      { code: '21CYB101J', name: 'Chemistry (Slot B)', faculty: 'Dr. Ujjwala', credits: 5, color: '#10B981', isLab: true },
      { code: '21BTB102J', name: 'Electronic System & PCB Design (Slot C)', faculty: 'Dr. V.N. Senthil Kumaran', credits: 2, color: '#F59E0B', isLab: false },
      { code: '21CSS101J', name: 'Programming for Problem Solving (Slot D)', faculty: 'Mrs. R. Sharanya', credits: 4, color: '#06B6D4', isLab: true },
      { code: '21MES101L', name: 'Basic Civil & Mech Workshop', faculty: 'Dr. Sakthibalan / Dr. Modasir', credits: 2, color: '#6366F1', isLab: true },
      { code: '21PDM102L', name: 'General Aptitude', faculty: 'Mr. Sivanandhan', credits: 2, color: '#14B8A6', isLab: false },
      { code: '21GNM102L', name: 'NSS', faculty: 'Dr. R. Manickam', credits: 2, color: '#84CC16', isLab: false },
      { code: '21BTB103T', name: 'Biology (Slot F)', faculty: 'Dr. M. Maria Leena', credits: 2, color: '#F97316', isLab: false }
    ],
    schedule: {
      Monday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21BTB103T', subjectName: 'Biology', type: 'theory', room: 'IST710' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21PDM102L', subjectName: 'CDC Aptitude', type: 'theory', room: 'IST710' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21BTB102J', subjectName: 'PCB Lab', type: 'lab', room: 'IST 617' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21BTB102J', subjectName: 'PCB Lab', type: 'lab', room: 'IST 617' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21GNH101J', subjectName: 'Philosophy of Engg', type: 'theory', room: 'IST502' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21GNH101J', subjectName: 'Philosophy of Engg', type: 'theory', room: 'IST502' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21CYB101J', subjectName: 'Chemistry', type: 'theory', room: 'IST502' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21MAB102T', subjectName: 'Adv. Calculus', type: 'theory', room: 'IST502' }
      ],
      Tuesday: [
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21CYB101J', subjectName: 'Che Lab', type: 'lab', room: 'Che Lab' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21GNM102L', subjectName: 'NSS', type: 'theory', room: '201' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21GNM102L', subjectName: 'NSS', type: 'theory', room: '201' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21BTB102J', subjectName: 'Electronic System & PCB', type: 'theory', room: 'IST502' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21CYB101J', subjectName: 'Chemistry', type: 'theory', room: 'IST502' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21MAB102T', subjectName: 'Adv. Calculus', type: 'theory', room: 'IST502' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21CSS101J', subjectName: 'Programming (PPS)', type: 'theory', room: 'IST502' }
      ],
      Wednesday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21PDM102L', subjectName: 'CDC Aptitude', type: 'theory', room: 'IST510' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21PDM102L', subjectName: 'CDC Aptitude', type: 'theory', room: 'IST510' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21MAB102T', subjectName: 'Adv. Calculus', type: 'theory', room: 'IST710' },
        { periodNumber: 5, startTime: '12:35', endTime: '13:25', subjectCode: '21CSS101J', subjectName: 'PPS Lab', type: 'lab', room: 'IST 617' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21CSS101J', subjectName: 'PPS Lab', type: 'lab', room: 'IST 617' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21CYB101J', subjectName: 'Chemistry', type: 'theory', room: 'IST502' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21GNH101J', subjectName: 'Philosophy of Engg', type: 'theory', room: 'IST502' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21CSS101J', subjectName: 'Programming (PPS)', type: 'theory', room: 'IST502' }
      ],
      Thursday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21BTB103T', subjectName: 'Biology', type: 'theory', room: 'IST710' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21MAB102T', subjectName: 'Adv. Calculus', type: 'theory', room: 'IST510' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21CSS101J', subjectName: 'Programming (PPS)', type: 'theory', room: 'IST710' },
        { periodNumber: 5, startTime: '12:35', endTime: '13:25', subjectCode: '21LEH104T', subjectName: 'German', type: 'theory', room: 'IST502' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21BTB102J', subjectName: 'Electronic System & PCB', type: 'theory', room: 'IST502' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21CYB101J', subjectName: 'Chemistry', type: 'theory', room: 'IST502' }
      ],
      Friday: [
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21LEH104T', subjectName: 'German', type: 'theory', room: 'IST626' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21CSS101J', subjectName: 'PPS Lab', type: 'lab', room: 'IST626' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21MES101L', subjectName: 'Workshop', type: 'lab', room: 'IST 20,21' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21MES101L', subjectName: 'Workshop', type: 'lab', room: 'IST 20,21' }
      ]
    }
  },
  {
    id: 'I-BIOTECH-BME',
    name: 'I Biotech-B / Biomed',
    branch: 'Biotechnology & Biomedical Engineering',
    yearSemester: 'Year I / Sem I',
    room: 'IST 702',
    mentor: 'Dr. Daniel Paul / Dr. Jaya Priya',
    subjects: [
      { code: '21LEH105T', name: 'Japanese', faculty: 'Mr. Nadeem', credits: 3, color: '#3B82F6', isLab: false },
      { code: '21GNH101J', name: 'Philosophy of Engineering', faculty: 'Dr. J. Ramya Parkavi', credits: 2, color: '#8B5CF6', isLab: false },
      { code: '21MAB102T', name: 'Adv. Calculus & Complex Analysis (Slot A)', faculty: 'Dr. R. Suresh', credits: 4, color: '#EC4899', isLab: false },
      { code: '21CYB101J', name: 'Chemistry (Slot B)', faculty: 'Dr. R. Logudurai', credits: 5, color: '#10B981', isLab: true },
      { code: '21CSS101J', name: 'Programming for Problem Solving (Slot D)', faculty: 'Dr. B. Chitradevi', credits: 4, color: '#06B6D4', isLab: true },
      { code: '21BTC105T', name: 'Cell Biology (Slot C)', faculty: 'Dr. Daniel Paul', credits: 2, color: '#F59E0B', isLab: false },
      { code: '21MES101L', name: 'Basic Civil & Mech Workshop', faculty: 'Dr. R. Manimaran', credits: 2, color: '#6366F1', isLab: true },
      { code: '21PDM102L', name: 'General Aptitude', faculty: 'Mr. Sivanandhan', credits: 2, color: '#14B8A6', isLab: false },
      { code: '21GNM101L', name: 'Yoga for Health', faculty: 'Ms. Balasivapriya', credits: 2, color: '#84CC16', isLab: false },
      { code: '21BTC101T', name: 'Biochemistry (Slot F)', faculty: 'Dr. M. Jaya Priya', credits: 3, color: '#F97316', isLab: false },
      { code: '21BTB104T', name: 'Human Physiology & Anatomy', faculty: 'Dr. Daniel Paul', credits: 2, color: '#A855F7', isLab: false }
    ],
    schedule: {
      Monday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21BTC105T', subjectName: 'Cell Biology', type: 'theory', room: 'IST520' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21GNM101L', subjectName: 'Yoga', type: 'theory', room: 'Yoga Hall' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21GNM101L', subjectName: 'Yoga', type: 'theory', room: 'Yoga Hall' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21BTC101T', subjectName: 'Biochemistry', type: 'theory', room: 'IST710' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21GNH101J', subjectName: 'Philosophy of Engg', type: 'theory', room: 'IST702' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21GNH101J', subjectName: 'Philosophy of Engg', type: 'theory', room: 'IST702' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21MAB102T', subjectName: 'Adv. Calculus', type: 'theory', room: 'IST702' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21CYB101J', subjectName: 'Chemistry', type: 'theory', room: 'IST702' }
      ],
      Tuesday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21PDM102L', subjectName: 'CDC Aptitude', type: 'theory', room: 'IST710' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21PDM102L', subjectName: 'CDC Aptitude', type: 'theory', room: 'IST710' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21BTC105T', subjectName: 'Cell Biology', type: 'theory', room: 'IST520' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21BTC101T', subjectName: 'Biochemistry', type: 'theory', room: 'IST710' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21CYB101J', subjectName: 'Chemistry', type: 'theory', room: 'IST702' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21MAB102T', subjectName: 'Adv. Calculus', type: 'theory', room: 'IST702' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21CSS101J', subjectName: 'Programming (PPS)', type: 'theory', room: 'IST702' }
      ],
      Wednesday: [
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21MES101L', subjectName: 'Workshop', type: 'lab', room: 'IST 20,21' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21MES101L', subjectName: 'Workshop', type: 'lab', room: 'IST 20,21' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21CSS101J', subjectName: 'Programming (PPS)', type: 'theory', room: 'IST702' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21CYB101J', subjectName: 'Chemistry', type: 'theory', room: 'IST702' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21GNH101J', subjectName: 'Philosophy of Engg', type: 'theory', room: 'IST702' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21CSS101J', subjectName: 'Programming (PPS)', type: 'theory', room: 'IST702' }
      ],
      Thursday: [
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21CYB101J', subjectName: 'Che Lab', type: 'lab', room: 'Che Lab' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21MAB102T', subjectName: 'Adv. Calculus', type: 'theory', room: 'IST710' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21BTC105T', subjectName: 'Cell Biology', type: 'theory', room: 'IST510' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21CYB101J', subjectName: 'Chemistry', type: 'theory', room: 'IST702' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21LEH105T', subjectName: 'Japanese', type: 'theory', room: 'IST702' }
      ],
      Friday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21BTC101T', subjectName: 'Biochemistry', type: 'theory', room: 'IST702' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21PDM102L', subjectName: 'CDC Aptitude', type: 'theory', room: 'IST702' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21MAB102T', subjectName: 'Adv. Calculus', type: 'theory', room: 'IST702' },
        { periodNumber: 5, startTime: '12:35', endTime: '13:25', subjectCode: '21LEH105T', subjectName: 'Japanese', type: 'theory', room: 'IST702' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21CSS101J', subjectName: 'PPS Lab', type: 'lab', room: 'PPS Lab' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21CSS101J', subjectName: 'PPS Lab', type: 'lab', room: 'PPS Lab' }
      ]
    }
  },
  {
    id: 'II-BME',
    name: 'II - BME (Biomedical)',
    branch: 'Biomedical Engineering',
    yearSemester: 'Year II / Sem III',
    room: 'IST 602 / FN',
    mentor: 'Dr. A. Manickam (ASP/MAT)',
    subjects: [
      { code: '21MAB201T', name: 'Transforms & Boundary Value Problems (Slot A)', faculty: 'Dr. A. Manickam', credits: 4, color: '#3B82F6', isLab: false },
      { code: '21BMC202T', name: 'Biomedical Signals & Systems (Slot B)', faculty: 'Dr. Senthil Kumaran V N', credits: 3, color: '#10B981', isLab: false },
      { code: '21BMC203J', name: 'Electric & Electronic Circuits (Slot C)', faculty: 'Dr. Prabin Kumar Bera', credits: 4, color: '#F59E0B', isLab: true },
      { code: '21BMC204J', name: 'Digital Logic for Medical Systems (Slot D)', faculty: 'Dr. G. Gifta', credits: 3, color: '#8B5CF6', isLab: true },
      { code: '21PYS202T', name: 'Medical Physics (Slot E)', faculty: 'Dr. D. Rajeswari', credits: 3, color: '#EC4899', isLab: false },
      { code: '21LEM201T', name: 'Professional Ethics (Slot F)', faculty: 'Dr. H. Sribhuvaneshwari', credits: 1, color: '#06B6D4', isLab: false },
      { code: '21LEM202T', name: 'Universal Human Values-II (Slot G)', faculty: 'Mrs. N. Suganthi', credits: 3, color: '#14B8A6', isLab: false },
      { code: '21PDM201L', name: 'Verbal Reasoning (Slot H)', faculty: 'CDC Trainer', credits: 2, color: '#6366F1', isLab: false },
      { code: '21PDH201T', name: 'Social Engineering (Slot I)', faculty: 'Mrs. Francis Arockiya Mary', credits: 2, color: '#F97316', isLab: false }
    ],
    schedule: {
      Monday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21PYS202T', subjectName: 'Medical Physics', type: 'theory', room: 'IST602' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21BMC203J', subjectName: 'Electric & Electronic Circuits', type: 'theory', room: 'IST602' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21PDH201T', subjectName: 'Social Engineering', type: 'theory', room: 'IST602' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21BMC203J', subjectName: 'DLMS/EEC Lab', type: 'lab', room: '107, 309' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21BMC203J', subjectName: 'DLMS/EEC Lab', type: 'lab', room: '107, 309' }
      ],
      Tuesday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21BMC203J', subjectName: 'Electric & Electronic Circuits', type: 'theory', room: 'IST602' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21PYS202T', subjectName: 'Medical Physics', type: 'theory', room: 'IST602' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21BMC202T', subjectName: 'Biomedical Signals', type: 'theory', room: 'IST602' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21MAB201T', subjectName: 'Transforms & BVP', type: 'theory', room: 'IST602' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21PDM201L', subjectName: 'Verbal Reasoning', type: 'theory', room: 'TB-106' }
      ],
      Wednesday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21BMC202T', subjectName: 'Biomedical Signals', type: 'theory', room: 'IST602' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21BMC204J', subjectName: 'Digital Logic Med Systems', type: 'theory', room: 'IST602' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21MAB201T', subjectName: 'Transforms & BVP', type: 'theory', room: 'IST602' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21PDM201L', subjectName: 'Verbal Reasoning', type: 'theory', room: 'TB-106' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21LEM202T', subjectName: 'Universal Human Values', type: 'theory', room: 'G-602' }
      ],
      Thursday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21MAB201T', subjectName: 'Transforms & BVP', type: 'theory', room: 'IST602' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21PYS202T', subjectName: 'Medical Physics', type: 'theory', room: 'IST602' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21BMC202T', subjectName: 'Biomedical Signals', type: 'theory', room: 'IST602' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21BMC204J', subjectName: 'Digital Logic Med Systems', type: 'theory', room: 'IST602' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21BMC204J', subjectName: 'DLMS/EEC Lab', type: 'lab', room: '107, 309' }
      ],
      Friday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21LEM201T', subjectName: 'Professional Ethics', type: 'theory', room: 'IST602' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21MAB201T', subjectName: 'Transforms & BVP', type: 'theory', room: 'IST602' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21BMC203J', subjectName: 'Electric & Electronic Circuits', type: 'theory', room: 'IST602' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21BMC204J', subjectName: 'Digital Logic Med Systems', type: 'theory', room: 'IST602' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21LEM202T', subjectName: 'Universal Human Values', type: 'theory', room: 'G-602' }
      ]
    }
  },
  {
    id: 'II-ECE-DS-A',
    name: 'II - ECE-DS A',
    branch: 'ECE - Data Science Section A',
    yearSemester: 'Year II / Sem III',
    room: 'IST 416 / FN',
    mentor: 'Dr. C. Arun Kumar (AP/Maths)',
    subjects: [
      { code: '21MAB201T', name: 'Transforms & Boundary Value Problems (Slot A)', faculty: 'Dr. C. Arun Kumar', credits: 4, color: '#3B82F6', isLab: false },
      { code: '21ECC201T', name: 'Solid State Devices (Slot B)', faculty: 'Dr. Jeevanantham S', credits: 3, color: '#10B981', isLab: false },
      { code: '21CSS201T', name: 'Computer Org & Architecture (Slot C)', faculty: 'Dr. P. Murugapandiyan', credits: 4, color: '#F59E0B', isLab: false },
      { code: '21ECC203T', name: 'Digital Logic Design (Slot D)', faculty: 'Dr. S. Krishnakumar', credits: 3, color: '#8B5CF6', isLab: false },
      { code: '21ECC205T', name: 'Electromagnetic Theory (Slot E)', faculty: 'Dr. V. Bharathi', credits: 3, color: '#EC4899', isLab: false },
      { code: '21LEM201T', name: 'Professional Ethics (Slot F)', faculty: 'Dr. Jothi M', credits: 1, color: '#06B6D4', isLab: false },
      { code: '21LEM202T', name: 'Universal Human Values-II (Slot G)', faculty: 'Mrs. N. Suganthi', credits: 3, color: '#14B8A6', isLab: false },
      { code: '21PDM201L', name: 'Verbal Reasoning (Slot H)', faculty: 'CDC Trainer', credits: 2, color: '#6366F1', isLab: false },
      { code: '21PDH209T', name: 'Social Engineering (Slot I)', faculty: 'Mrs. D. Lavanya', credits: 2, color: '#F97316', isLab: false },
      { code: '21ECC211L', name: 'Devices & Digital IC Lab', faculty: 'Dr. Jeevanantham / Dr. Bharathi', credits: 2, color: '#84CC16', isLab: true }
    ],
    schedule: {
      Monday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21ECC205T', subjectName: 'Electromagnetic Theory', type: 'theory', room: 'IST416' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21MAB201T', subjectName: 'Transforms & BVP', type: 'theory', room: 'IST416' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21PDH209T', subjectName: 'Social Engineering', type: 'theory', room: 'IST416' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21LEM202T', subjectName: 'Universal Human Values', type: 'theory', room: 'G-602' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21ECC211L', subjectName: 'Digital IC Lab', type: 'lab', room: 'LAB 309' }
      ],
      Tuesday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21CSS201T', subjectName: 'Comp Org & Arch', type: 'theory', room: 'IST416' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21MAB201T', subjectName: 'Transforms & BVP', type: 'theory', room: 'IST416' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21ECC205T', subjectName: 'Electromagnetic Theory', type: 'theory', room: 'IST416' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21ECC203T', subjectName: 'Digital Logic Design', type: 'theory', room: 'IST416' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21LEM202T', subjectName: 'Universal Human Values', type: 'theory', room: 'G-602' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21PDM201L', subjectName: 'Verbal Reasoning', type: 'theory', room: 'TB-106' }
      ],
      Wednesday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21MAB201T', subjectName: 'Transforms & BVP', type: 'theory', room: 'IST416' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21ECC201T', subjectName: 'Solid State Devices', type: 'theory', room: 'IST416' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21CSS201T', subjectName: 'Comp Org & Arch', type: 'theory', room: 'IST416' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21ECC203T', subjectName: 'Digital Logic Design', type: 'theory', room: 'IST416' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21PDM201L', subjectName: 'Verbal Reasoning', type: 'theory', room: 'TB-106' }
      ],
      Thursday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21ECC201T', subjectName: 'Solid State Devices', type: 'theory', room: 'IST416' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21CSS201T', subjectName: 'Comp Org & Arch', type: 'theory', room: 'IST416' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21MAB201T', subjectName: 'Transforms & BVP', type: 'theory', room: 'IST416' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21LEM201T', subjectName: 'Professional Ethics', type: 'theory', room: 'IST416' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21ECC211L', subjectName: 'Digital IC Lab', type: 'lab', room: 'LAB 309' }
      ],
      Friday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21ECC203T', subjectName: 'Digital Logic Design', type: 'theory', room: 'IST416' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21ECC201T', subjectName: 'Solid State Devices', type: 'theory', room: 'IST416' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21ECC205T', subjectName: 'Electromagnetic Theory', type: 'theory', room: 'IST416' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21CSS201T', subjectName: 'Comp Org & Arch', type: 'theory', room: 'IST416' }
      ]
    }
  },
  {
    id: 'II-ECE-DS-B',
    name: 'II - ECE-DS B',
    branch: 'ECE - Data Science Section B',
    yearSemester: 'Year II / Sem III',
    room: 'IST 411 / AN',
    mentor: 'Dr. S. Krishnakumar (AP/ECE DS)',
    subjects: [
      { code: '21MAB201T', name: 'Transforms & Boundary Value Problems (Slot A)', faculty: 'Faculty Maths Dept', credits: 4, color: '#3B82F6', isLab: false },
      { code: '21ECC201T', name: 'Solid State Devices (Slot B)', faculty: 'Dr. Jeevanantham S', credits: 3, color: '#10B981', isLab: false },
      { code: '21CSS201T', name: 'Computer Org & Architecture (Slot C)', faculty: 'Dr. P. Murugapandiyan', credits: 4, color: '#F59E0B', isLab: false },
      { code: '21ECC203T', name: 'Digital Logic Design (Slot D)', faculty: 'Dr. S. Krishnakumar', credits: 3, color: '#8B5CF6', isLab: false },
      { code: '21ECC205T', name: 'Electromagnetic Theory (Slot E)', faculty: 'Dr. V. Bharathi', credits: 3, color: '#EC4899', isLab: false },
      { code: '21LEM201T', name: 'Professional Ethics (Slot F)', faculty: 'Dr. K. Vigneshwaran', credits: 1, color: '#06B6D4', isLab: false },
      { code: '21LEM202T', name: 'Universal Human Values-II (Slot G)', faculty: 'Mrs. D. Lavanya', credits: 3, color: '#14B8A6', isLab: false },
      { code: '21PDM201L', name: 'Verbal Reasoning (Slot H)', faculty: 'CDC Trainer', credits: 2, color: '#6366F1', isLab: false },
      { code: '21PDH209T', name: 'Social Engineering (Slot I)', faculty: 'Mrs. D. Lavanya', credits: 2, color: '#F97316', isLab: false },
      { code: '21ECC211L', name: 'Devices & Digital IC Lab', faculty: 'Dr. S. Krishnakumar', credits: 2, color: '#84CC16', isLab: true }
    ],
    schedule: {
      Monday: [
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21ECC211L', subjectName: 'Digital IC Lab', type: 'lab', room: 'LAB 309' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21ECC203T', subjectName: 'Digital Logic Design', type: 'theory', room: 'IST411' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21ECC201T', subjectName: 'Solid State Devices', type: 'theory', room: 'IST411' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21CSS201T', subjectName: 'Comp Org & Arch', type: 'theory', room: 'IST411' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21PDH209T', subjectName: 'Social Engineering', type: 'theory', room: 'IST411' }
      ],
      Tuesday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21ECC211L', subjectName: 'Digital IC Lab', type: 'lab', room: 'LAB 309' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21CSS201T', subjectName: 'Comp Org & Arch', type: 'theory', room: 'IST411' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21ECC203T', subjectName: 'Digital Logic Design', type: 'theory', room: 'IST411' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21ECC205T', subjectName: 'Electromagnetic Theory', type: 'theory', room: 'IST411' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21MAB201T', subjectName: 'Transforms & BVP', type: 'theory', room: 'IST411' }
      ],
      Wednesday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21LEM202T', subjectName: 'Universal Human Values', type: 'theory', room: 'G-401' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21PDH209T', subjectName: 'Social Engineering', type: 'theory', room: 'IST411' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21ECC205T', subjectName: 'Electromagnetic Theory', type: 'theory', room: 'IST411' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21MAB201T', subjectName: 'Transforms & BVP', type: 'theory', room: 'IST411' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21ECC203T', subjectName: 'Digital Logic Design', type: 'theory', room: 'IST411' }
      ],
      Thursday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21LEM202T', subjectName: 'Universal Human Values', type: 'theory', room: 'G-401' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21PDM201L', subjectName: 'Verbal Reasoning', type: 'theory', room: 'TB-106' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21MAB201T', subjectName: 'Transforms & BVP', type: 'theory', room: 'IST411' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21CSS201T', subjectName: 'Comp Org & Arch', type: 'theory', room: 'IST411' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21ECC201T', subjectName: 'Solid State Devices', type: 'theory', room: 'IST411' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21ECC205T', subjectName: 'Electromagnetic Theory', type: 'theory', room: 'IST411' }
      ],
      Friday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21PDM201L', subjectName: 'Verbal Reasoning', type: 'theory', room: 'TB-106' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21LEM201T', subjectName: 'Professional Ethics', type: 'theory', room: 'IST411' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21MAB201T', subjectName: 'Transforms & BVP', type: 'theory', room: 'IST411' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21ECC201T', subjectName: 'Solid State Devices', type: 'theory', room: 'IST411' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21CSS201T', subjectName: 'Comp Org & Arch', type: 'theory', room: 'IST411' }
      ]
    }
  },
  {
    id: 'III-BME',
    name: 'III - BME',
    branch: 'Biomedical Engineering',
    yearSemester: 'Year III / Sem V',
    room: 'IST 211 / AN',
    mentor: 'Dr. K. M. Karuppusamy (AP/Maths)',
    subjects: [
      { code: '21MAB301T', name: 'Probability & Statistics (Slot A)', faculty: 'Dr. K. M. Karuppusamy', credits: 4, color: '#3B82F6', isLab: false },
      { code: '21BMC302J', name: 'Microcontrollers in Medicine (Slot B)', faculty: 'Dr. K. Vigneshwaran', credits: 4, color: '#10B981', isLab: true },
      { code: '21BMC301J', name: 'Biomedical Signal Processing (Slot C)', faculty: 'Dr. V.N. Senthilkumaran', credits: 4, color: '#F59E0B', isLab: true },
      { code: '21BME266T', name: 'Biometrics (Slot D)', faculty: 'Dr. G. Gifta', credits: 3, color: '#8B5CF6', isLab: false },
      { code: '21ECO103T', name: 'Modern Wireless Comm (Slot E)', faculty: 'Dr. Vaishnavi', credits: 3, color: '#EC4899', isLab: false },
      { code: '21BMC303T', name: 'Principles of Medical Imaging (Slot F)', faculty: 'Dr. N. Prasana Venkatesh', credits: 3, color: '#06B6D4', isLab: false },
      { code: '21PDM301L', name: 'Analytical & Logical Skills (Slot G)', faculty: 'CDC Trainer', credits: 2, color: '#14B8A6', isLab: false },
      { code: '21LEM301T', name: 'Indian Art Form (Slot H)', faculty: 'Dr. G. Gifta', credits: 1, color: '#6366F1', isLab: false },
      { code: '21GNP301L', name: 'Community Connect (Slot I)', faculty: 'Dr. J. Jencia', credits: 1, color: '#F97316', isLab: false }
    ],
    schedule: {
      Monday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21PDM301L', subjectName: 'CDC Skills', type: 'theory', room: 'G-625' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21BMC302J', subjectName: 'MPMC LAB', type: 'lab', room: '107' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21ECO103T', subjectName: 'Wireless Comm', type: 'theory', room: 'IST211' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21BMC302J', subjectName: 'Microcontrollers', type: 'theory', room: 'IST211' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21BMC303T', subjectName: 'Medical Imaging', type: 'theory', room: 'IST211' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21LEM301T', subjectName: 'Indian Art Form', type: 'theory', room: 'IST211' }
      ],
      Tuesday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21BMC301J', subjectName: 'BIO DSP LAB', type: 'lab', room: '108' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21PDM301L', subjectName: 'CDC Skills', type: 'theory', room: 'G-625' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21BMC301J', subjectName: 'Biomedical Signal Proc', type: 'theory', room: 'IST211' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21BME266T', subjectName: 'Biometrics', type: 'theory', room: 'IST211' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21MAB301T', subjectName: 'Prob & Stats', type: 'theory', room: 'IST211' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21BMC302J', subjectName: 'Microcontrollers', type: 'theory', room: 'IST211' }
      ],
      Wednesday: [
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21BMC301J', subjectName: 'Biomedical Signal Proc', type: 'theory', room: 'IST211' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21MAB301T', subjectName: 'Prob & Stats', type: 'theory', room: 'IST211' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21BMC303T', subjectName: 'Medical Imaging', type: 'theory', room: 'IST211' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21BME266T', subjectName: 'Biometrics', type: 'theory', room: 'IST211' }
      ],
      Thursday: [
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21GNP301L', subjectName: 'Community Connect', type: 'theory', room: 'I-108' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21MAB301T', subjectName: 'Prob & Stats', type: 'theory', room: 'IST211' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21BMC301J', subjectName: 'Biomedical Signal Proc', type: 'theory', room: 'IST211' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21ECO103T', subjectName: 'Wireless Comm', type: 'theory', room: 'IST211' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21BMC302J', subjectName: 'Microcontrollers', type: 'theory', room: 'IST211' }
      ],
      Friday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21GNP301L', subjectName: 'Community Connect', type: 'theory', room: 'I-108' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21BMC303T', subjectName: 'Medical Imaging', type: 'theory', room: 'IST211' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21MAB301T', subjectName: 'Prob & Stats', type: 'theory', room: 'IST211' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21BME266T', subjectName: 'Biometrics', type: 'theory', room: 'IST211' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21ECO103T', subjectName: 'Wireless Comm', type: 'theory', room: 'IST211' }
      ]
    }
  },
  {
    id: 'III-ECE-A',
    name: 'III ECE-A',
    branch: 'Electronics and Communication Engineering',
    yearSemester: 'Year III / Sem V',
    room: 'IST 518 / FN',
    mentor: 'Dr. M. Manikandan (AP/ECE)',
    subjects: [
      { code: '21MAB302T', name: 'Discrete Mathematics (Slot A)', faculty: 'Maths Faculty', credits: 4, color: '#3B82F6', isLab: false },
      { code: '21ECC301P', name: 'Microprocessor & Microcontroller (Slot B)', faculty: 'Dr. M. Manikandan', credits: 4, color: '#10B981', isLab: true },
      { code: '21ECC303T', name: 'VLSI Design & Technology (Slot C)', faculty: 'Dr. M. Jothi', credits: 3, color: '#F59E0B', isLab: false },
      { code: '21ECE468T', name: 'System and Network on Chip (Slot D)', faculty: 'Dr. V. Manikandan', credits: 3, color: '#8B5CF6', isLab: false },
      { code: '21CSO355T', name: 'Machine Learning for All (Slot E)', faculty: 'Dr. J. Jencia', credits: 3, color: '#EC4899', isLab: false },
      { code: '21GNP301L', name: 'Community Connect (Slot F)', faculty: 'Dr. V. Rajesh', credits: 1, color: '#06B6D4', isLab: false },
      { code: '21PDM301L', name: 'CDC Logical Skills (Slot G)', faculty: 'CDC Trainer', credits: 2, color: '#14B8A6', isLab: false },
      { code: '21LEM301T', name: 'Indian Art Form (Slot H)', faculty: 'Dr. K. Vigneshwaran', credits: 1, color: '#6366F1', isLab: false },
      { code: '21ECC311L', name: 'VLSI Design / MPMC Lab', faculty: 'Dr. M. Jothi / Dr. Murugapandiyan', credits: 2, color: '#84CC16', isLab: true }
    ],
    schedule: {
      Monday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21CSO355T', subjectName: 'Machine Learning', type: 'theory', room: 'IST518' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21ECC301P', subjectName: 'Microprocessors', type: 'theory', room: 'IST518' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21ECC301P', subjectName: 'Microprocessors', type: 'theory', room: 'IST518' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21MAB302T', subjectName: 'Discrete Maths', type: 'theory', room: 'IST518' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21PDM301L', subjectName: 'CDC Skills', type: 'theory', room: 'G-625' }
      ],
      Tuesday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21LEM301T', subjectName: 'Indian Art Form', type: 'theory', room: 'IST518' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21ECE468T', subjectName: 'System on Chip', type: 'theory', room: 'IST518' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21ECC301P', subjectName: 'Microprocessors', type: 'theory', room: 'IST518' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21ECC301P', subjectName: 'B-Proj', type: 'theory', room: 'IST518' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21PDM301L', subjectName: 'CDC Skills', type: 'theory', room: 'G-625' }
      ],
      Wednesday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21ECC303T', subjectName: 'VLSI Design', type: 'theory', room: 'IST518' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21MAB302T', subjectName: 'Discrete Maths', type: 'theory', room: 'IST518' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21ECE468T', subjectName: 'System on Chip', type: 'theory', room: 'IST518' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21GNP301L', subjectName: 'Community Connect', type: 'theory', room: 'IST518' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21ECC311L', subjectName: 'VLSI Lab', type: 'lab', room: 'LAB-108/309' }
      ],
      Thursday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21MAB302T', subjectName: 'Discrete Maths', type: 'theory', room: 'IST518' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21CSO355T', subjectName: 'Machine Learning', type: 'theory', room: 'IST518' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21ECC303T', subjectName: 'VLSI Design', type: 'theory', room: 'IST518' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21GNP301L', subjectName: 'Community Connect', type: 'theory', room: 'IST518' }
      ],
      Friday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21ECE468T', subjectName: 'System on Chip', type: 'theory', room: 'IST518' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21MAB302T', subjectName: 'Discrete Maths', type: 'theory', room: 'IST518' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21CSO355T', subjectName: 'Machine Learning', type: 'theory', room: 'IST518' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21ECC303T', subjectName: 'VLSI Design', type: 'theory', room: 'IST518' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21ECC311L', subjectName: 'VLSI Lab', type: 'lab', room: 'LAB-108/309' }
      ]
    }
  },
  {
    id: 'III-ECE-B',
    name: 'III ECE-B',
    branch: 'Electronics and Communication Engineering',
    yearSemester: 'Year III / Sem V',
    room: 'IST 518 / AN',
    mentor: 'Mrs. B. Abirami (EO/SRMIST)',
    subjects: [
      { code: '21MAB302T', name: 'Discrete Mathematics (Slot A)', faculty: 'Dr. M. Thanga Rejini', credits: 4, color: '#3B82F6', isLab: false },
      { code: '21ECC301P', name: 'Microprocessor & Microcontroller (Slot B)', faculty: 'Mrs. B. Abirami', credits: 4, color: '#10B981', isLab: true },
      { code: '21ECC303T', name: 'VLSI Design & Technology (Slot C)', faculty: 'Dr. R. Vinoth Raj', credits: 3, color: '#F59E0B', isLab: false },
      { code: '21ECE468T', name: 'System and Network on Chip (Slot D)', faculty: 'Dr. V. Manikandan', credits: 3, color: '#8B5CF6', isLab: false },
      { code: '21CSO355T', name: 'Machine Learning for All (Slot E)', faculty: 'Dr. J. Jencia', credits: 3, color: '#EC4899', isLab: false },
      { code: '21GNP301L', name: 'Community Connect (Slot F)', faculty: 'Dr. H. Sudharsan', credits: 1, color: '#06B6D4', isLab: false },
      { code: '21PDM301L', name: 'CDC Logical Skills (Slot G)', faculty: 'CDC Trainer', credits: 2, color: '#14B8A6', isLab: false },
      { code: '21LEM301T', name: 'Indian Art Form (Slot H)', faculty: 'Dr. A. Anand', credits: 1, color: '#6366F1', isLab: false },
      { code: '21ECC311L', name: 'VLSI / Microprocessor Lab', faculty: 'Dr. Sreenivasa Ijada Rao', credits: 2, color: '#84CC16', isLab: true }
    ],
    schedule: {
      Monday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21ECC311L', subjectName: 'VLSI Lab', type: 'lab', room: 'LAB-108/309' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21CSO355T', subjectName: 'Machine Learning', type: 'theory', room: 'IST518' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21ECC301P', subjectName: 'Microprocessors', type: 'theory', room: 'IST518' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21MAB302T', subjectName: 'Discrete Maths', type: 'theory', room: 'IST518' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21ECE468T', subjectName: 'System on Chip', type: 'theory', room: 'IST518' }
      ],
      Tuesday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21PDM301L', subjectName: 'CDC Skills', type: 'theory', room: 'G-625' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21GNP301L', subjectName: 'Community Connect', type: 'theory', room: 'IST518' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21ECC301P', subjectName: 'Microprocessors', type: 'theory', room: 'IST518' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21ECE468T', subjectName: 'System on Chip', type: 'theory', room: 'IST518' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21ECC303T', subjectName: 'VLSI Design', type: 'theory', room: 'IST518' }
      ],
      Wednesday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21PDM301L', subjectName: 'CDC Skills', type: 'theory', room: 'G-625' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21ECC301P', subjectName: 'B-Proj', type: 'theory', room: 'IST518' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21ECC301P', subjectName: 'Microprocessors', type: 'theory', room: 'IST518' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21MAB302T', subjectName: 'Discrete Maths', type: 'theory', room: 'IST518' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21LEM301T', subjectName: 'Indian Art Form', type: 'theory', room: 'IST518' }
      ],
      Thursday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21ECC311L', subjectName: 'VLSI Lab', type: 'lab', room: 'LAB-108/309' },
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21MAB302T', subjectName: 'Discrete Maths', type: 'theory', room: 'IST518' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21ECC303T', subjectName: 'VLSI Design', type: 'theory', room: 'IST518' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21CSO355T', subjectName: 'Machine Learning', type: 'theory', room: 'IST518' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21GNP301L', subjectName: 'Community Connect', type: 'theory', room: 'IST518' }
      ],
      Friday: [
        { periodNumber: 6, startTime: '13:30', endTime: '14:20', subjectCode: '21ECC303T', subjectName: 'VLSI Design', type: 'theory', room: 'IST518' },
        { periodNumber: 7, startTime: '14:25', endTime: '15:15', subjectCode: '21MAB302T', subjectName: 'Discrete Maths', type: 'theory', room: 'IST518' },
        { periodNumber: 8, startTime: '15:20', endTime: '16:10', subjectCode: '21CSO355T', subjectName: 'Machine Learning', type: 'theory', room: 'IST518' },
        { periodNumber: 9, startTime: '16:15', endTime: '17:05', subjectCode: '21ECE468T', subjectName: 'System on Chip', type: 'theory', room: 'IST518' }
      ]
    }
  },
  {
    id: 'IV-ECE-A',
    name: 'IV ECE-A (Final Year)',
    branch: 'Electronics and Communication Engineering',
    yearSemester: 'Year IV / Sem VII',
    room: 'IST 225',
    mentor: 'Dr. A. Anand (AP/ECE)',
    subjects: [
      { code: '21GNH401T', name: 'Behavioural Psychology (Slot A)', faculty: 'Dr. A. Anand', credits: 3, color: '#3B82F6', isLab: false },
      { code: '21ECC401T', name: 'Wireless Comm & Antenna Systems (Slot B)', faculty: 'Dr. K. Vigneshwaran', credits: 3, color: '#10B981', isLab: false },
      { code: '21ECC402P', name: 'Comp Comm & Network Security (Slot C)', faculty: 'Dr. S. Jeevanantham', credits: 3, color: '#F59E0B', isLab: true },
      { code: '21ECE461T', name: 'Semiconductor Memory Design (Slot D)', faculty: 'Dr. H. SriBhuvaneshwari', credits: 3, color: '#8B5CF6', isLab: false },
      { code: '21ECE463T', name: 'Scripting for Electronic Design (Slot E)', faculty: 'Dr. Sreenivasa Rao Ijada', credits: 3, color: '#EC4899', isLab: false },
      { code: '21CSO355T', name: 'Machine Learning for All (Slot F)', faculty: 'Dr. N. Prasanna Venkatesh', credits: 3, color: '#06B6D4', isLab: false }
    ],
    schedule: {
      Monday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21ECC402P', subjectName: 'Network Security', type: 'theory', room: 'IST225' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21GNH401T', subjectName: 'Behavioural Psych', type: 'theory', room: 'IST225' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21ECE461T', subjectName: 'Memory Design', type: 'theory', room: 'IST225' }
      ],
      Tuesday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21ECC402P', subjectName: 'Network Security', type: 'theory', room: 'IST225' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21ECE461T', subjectName: 'Memory Design', type: 'theory', room: 'IST225' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21ECC401T', subjectName: 'Wireless Comm & Antenna', type: 'theory', room: 'IST225' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21CSO355T', subjectName: 'Machine Learning', type: 'theory', room: 'IST225' }
      ],
      Wednesday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21ECC401T', subjectName: 'Wireless Comm & Antenna', type: 'theory', room: 'IST225' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21ECC402P', subjectName: 'Network Sec Lab', type: 'lab', room: 'IST108' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21ECE463T', subjectName: 'Scripting EDA', type: 'theory', room: 'IST225' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21CSO355T', subjectName: 'Machine Learning', type: 'theory', room: 'IST225' }
      ],
      Thursday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21CSO355T', subjectName: 'Machine Learning', type: 'theory', room: 'IST225' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21GNH401T', subjectName: 'Behavioural Psych', type: 'theory', room: 'IST225' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21ECE463T', subjectName: 'Scripting EDA', type: 'theory', room: 'IST225' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21ECC401T', subjectName: 'Wireless Comm & Antenna', type: 'theory', room: 'IST225' }
      ],
      Friday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21ECC402P', subjectName: 'Network Security', type: 'theory', room: 'IST225' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21GNH401T', subjectName: 'Behavioural Psych', type: 'theory', room: 'IST225' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21ECE461T', subjectName: 'Memory Design', type: 'theory', room: 'IST225' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21ECE463T', subjectName: 'Scripting EDA', type: 'theory', room: 'IST225' }
      ]
    }
  },
  {
    id: 'IV-ECE-B',
    name: 'IV ECE-B (Final Year)',
    branch: 'Electronics and Communication Engineering',
    yearSemester: 'Year IV / Sem VII',
    room: 'IST 227',
    mentor: 'Dr. R. Rajasekar (HOD - ECE)',
    subjects: [
      { code: '21GNH401T', name: 'Behavioural Psychology (Slot A)', faculty: 'Dr. A. Annand', credits: 3, color: '#3B82F6', isLab: false },
      { code: '21ECC401T', name: 'Wireless Comm & Antenna Systems (Slot B)', faculty: 'Dr. K. Vigneshwaran', credits: 3, color: '#10B981', isLab: false },
      { code: '21ECC402P', name: 'Comp Comm & Network Security (Slot C)', faculty: 'Dr. R. Rajasekar', credits: 3, color: '#F59E0B', isLab: true },
      { code: '21ECE461T', name: 'Semiconductor Memory Design (Slot D)', faculty: 'Dr. H. SriBhuvaneshwari', credits: 3, color: '#8B5CF6', isLab: false },
      { code: '21ECE463T', name: 'Scripting for Electronic Design (Slot E)', faculty: 'Dr. Sreenivasa Rao Ijada', credits: 3, color: '#EC4899', isLab: false },
      { code: '21CSO355T', name: 'Machine Learning for All (Slot F)', faculty: 'Dr. N. Prasanna Venkatesh', credits: 3, color: '#06B6D4', isLab: false }
    ],
    schedule: {
      Monday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21ECC402P', subjectName: 'Network Security', type: 'theory', room: 'IST227' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21GNH401T', subjectName: 'Behavioural Psych', type: 'theory', room: 'IST227' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21ECE463T', subjectName: 'Scripting EDA', type: 'theory', room: 'IST227' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21CSO355T', subjectName: 'Machine Learning', type: 'theory', room: 'IST227' }
      ],
      Tuesday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21ECC402P', subjectName: 'Network Security', type: 'theory', room: 'IST227' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21ECE463T', subjectName: 'Scripting EDA', type: 'theory', room: 'IST227' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21CSO355T', subjectName: 'Machine Learning', type: 'theory', room: 'IST227' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21ECC401T', subjectName: 'Wireless Comm & Antenna', type: 'theory', room: 'IST227' }
      ],
      Wednesday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21ECC402P', subjectName: 'Network Security', type: 'theory', room: 'IST227' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21ECE461T', subjectName: 'Memory Design', type: 'theory', room: 'IST227' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21GNH401T', subjectName: 'Behavioural Psych', type: 'theory', room: 'IST227' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21ECC401T', subjectName: 'Wireless Comm & Antenna', type: 'theory', room: 'IST227' }
      ],
      Thursday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21ECE461T', subjectName: 'Memory Design', type: 'theory', room: 'IST227' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21ECC401T', subjectName: 'Wireless Comm & Antenna', type: 'theory', room: 'IST227' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21ECC402P', subjectName: 'Net Sec Lab', type: 'lab', room: 'IST108' },
        { periodNumber: 4, startTime: '11:45', endTime: '12:35', subjectCode: '21GNH401T', subjectName: 'Behavioural Psych', type: 'theory', room: 'IST227' }
      ],
      Friday: [
        { periodNumber: 1, startTime: '09:00', endTime: '09:50', subjectCode: '21ECE463T', subjectName: 'Scripting EDA', type: 'theory', room: 'IST227' },
        { periodNumber: 2, startTime: '09:55', endTime: '10:45', subjectCode: '21ECE461T', subjectName: 'Memory Design', type: 'theory', room: 'IST227' },
        { periodNumber: 3, startTime: '10:50', endTime: '11:40', subjectCode: '21CSO355T', subjectName: 'Machine Learning', type: 'theory', room: 'IST227' }
      ]
    }
  }
];

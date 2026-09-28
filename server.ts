import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini client with user-agent header as per skill guidelines
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Chat API endpoint for Attendance Advisor
app.post('/api/chat', async (req, res) => {
  try {
    const { message, studentContext } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      // Intelligent fallback logic when API key isn't provided
      const simpleResponse = generateRuleBasedAttendanceAdvice(message, studentContext);
      return res.json({ response: simpleResponse, source: 'algorithmic' });
    }

    const systemInstruction = `You are "ClassTrack Attendance Advisor", an expert university academic advisor, timetable strategist, and attendance mathematician.
Your role:
- Answer student queries about attendance, bunking limits, leaves, OD (On-Duty) impacts, and semester planning.
- Always perform accurate, step-by-step arithmetic based on the provided studentContext.
- Clearly state:
  1. Current attendance % and conducted vs attended counts.
  2. Exactly how many classes are missed if leave is taken (check the day-by-day timetable for the upcoming dates).
  3. New attendance % after the proposed leave.
  4. Status: SAFE (>=75%), AT RISK (75%-78%), DANGER ZONE (<75%), or IRREVERSIBLE DETENTION (impossible to recover even attending 100% of remaining classes).
  5. Actionable recommendation (e.g. "You can skip Wednesday's 1 period, but do NOT skip Friday's 3-hour lab", "Apply for OD for the 2-day symposium to avoid detention").
- Tone: Empathetic, sharp, student-friendly, encouraging, yet strictly rigorous about university regulations and the 75% cutoff and 90% distinction bar.
- Use markdown formatting with bullet points, bold key percentages, and short summary boxes where suitable.`;

    const prompt = `Student Attendance Context:
${JSON.stringify(studentContext, null, 2)}

Student Query:
"${message}"

Provide a detailed, accurate calculation and personalized recommendation.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    const reply = response.text || 'Unable to generate advice at this moment. Please check your dashboard stats.';
    return res.json({ response: reply, source: 'gemini' });
  } catch (error: any) {
    console.error('Error generating AI advice:', error);
    // Provide smart algorithmic fallback on any Gemini API failure
    const fallbackAdvice = generateRuleBasedAttendanceAdvice(
      req.body?.message || '',
      req.body?.studentContext
    );
    return res.json({
      response: fallbackAdvice,
      source: 'fallback',
      warning: 'AI service temporarily unavailable; computed via algorithmic rules.',
    });
  }
});

// Helper for algorithmic attendance advice
function generateRuleBasedAttendanceAdvice(query: string, context: any): string {
  if (!context || !context.subjects) {
    return "I can help you calculate safe leaves, OD impacts, and detention risks! Please select your class section and subjects on the dashboard.";
  }

  const queryLower = query.toLowerCase();
  const subjects = context.subjects as any[];
  const referenceDate = context.referenceDate || 'Today';

  // Check if query is about a specific subject
  const matchedSubject = subjects.find(s => 
    queryLower.includes(s.name.toLowerCase()) || 
    queryLower.includes(s.code.toLowerCase())
  );

  if (queryLower.includes('sick') || queryLower.includes('leave') || queryLower.includes('bunk') || queryLower.includes('absent')) {
    if (matchedSubject) {
      const curAttended = matchedSubject.attendedSoFar;
      const curConducted = matchedSubject.conductedSoFar;
      const remaining = matchedSubject.remainingClasses;
      const total = curConducted + remaining;
      const curPct = ((curAttended / (curConducted || 1)) * 100).toFixed(1);
      
      // Assume 2 classes if unspecified
      let missedCount = 2;
      const daysMatch = query.match(/(\d+)\s*[- ]*(day|class|lecture|period)/i);
      if (daysMatch) {
        missedCount = parseInt(daysMatch[1], 10) * 1;
      }

      const newAttended = curAttended;
      const newConducted = curConducted + missedCount;
      const newPct = ((newAttended / (newConducted || 1)) * 100).toFixed(1);

      const requiredFor75 = Math.ceil(0.75 * total);
      const remainingAfterMiss = Math.max(0, remaining - missedCount);
      const maxPossible = (((curAttended + remainingAfterMiss) / total) * 100).toFixed(1);

      let status = '✅ SAFE';
      if (parseFloat(newPct) < 75) status = '🚨 DANGER ZONE (<75%)';
      else if (parseFloat(newPct) < 80) status = '⚠️ BORDERLINE RISK';

      return `### 📊 Attendance Impact for **${matchedSubject.name}** (${matchedSubject.code})
- **Current Attendance**: ${curAttended}/${curConducted} (${curPct}%)
- **Estimated Leave Impact**: Miss ${missedCount} class(es)
- **Attendance after leave**: **${newPct}%** (${status})
- **Total classes in semester**: ${total} (Remaining: ${remaining})
- **Classes needed for 75%**: ${matchedSubject.neededFor75} classes
- **Maximum reachable if you take this leave**: ${maxPossible}%

💡 **Advisor Recommendation**: ${parseFloat(newPct) < 75 ? 'Taking this leave drops you below the 75% mandatory threshold! We recommend attending or securing an official On-Duty (OD) permit before skipping.' : 'You have a safety cushion to take this leave, but make sure to attend subsequent sessions to maintain buffer for exams.'}`;
    }

    // Overall summary
    const endangered = subjects.filter(s => s.currentPercentage < 75);
    const irreversible = subjects.filter(s => s.isIrreversibleDetention);

    return `### 📋 Semester Leave Advisory
Based on your current status as of **${referenceDate}**:
- **Total subjects**: ${subjects.length}
- **Subjects in Danger Zone (<75%)**: ${endangered.length > 0 ? endangered.map(s => s.code).join(', ') : 'None (Great job!)'}
- **Irreversible Detention Risk**: ${irreversible.length > 0 ? `🚨 ${irreversible.map(s => s.code).join(', ')}` : 'None detected'}

To evaluate a specific leave, mention the subject name (e.g., *"Can I take 2 days leave for ${subjects[0]?.name || 'Math'}?"*), and I will calculate the exact period-by-period impact!`;
  }

  return `### 🎓 ClassTrack Attendance Advisor
I can calculate your safe leaves, danger zone boundaries, and On-Duty (OD) leave recoveries.
Try asking:
- *"If I take a 3-day sick leave starting tomorrow, will my ${subjects[0]?.name || 'Chemistry'} attendance drop below 75%?"*
- *"How many classes can I safely bunk in ${subjects[1]?.name || 'Data Structures'}?"*
- *"What is my worst-case attendance if I skip this Friday?"*
- *"Can an On-Duty (OD) claim save me from detention?"*`;
}

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`ClassTrack server running at http://localhost:${port}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});

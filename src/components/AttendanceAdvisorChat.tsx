import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, User, X, Minimize2, Maximize2, ShieldAlert, CheckCircle, RefreshCw } from 'lucide-react';
import { SubjectCalculation, OverallCalculation, ClassSection, DateClassSlot, ChatMessage } from '../types/attendance';

interface AttendanceAdvisorChatProps {
  isOpen: boolean;
  onToggle: () => void;
  subjects: SubjectCalculation[];
  overall: OverallCalculation;
  section: ClassSection;
  referenceDate: string;
  targetDate: string;
  upcomingClasses: DateClassSlot[];
}

export const AttendanceAdvisorChat: React.FC<AttendanceAdvisorChatProps> = ({
  isOpen,
  onToggle,
  subjects,
  overall,
  section,
  referenceDate,
  targetDate,
  upcomingClasses,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `👋 **Hello! I'm your SRM ClassTrack Attendance Advisor.**
I have loaded your active status for **${section.name}** (Current Overall: **${overall.currentOverallPercentage}%**).

You can ask me questions like:
- *"If I take a 3-day sick leave starting tomorrow, will my Chemistry attendance drop below 75%?"*
- *"How many classes can I safely bunk in ${subjects[0]?.name || 'Math'}?"*
- *"Can an On-Duty (OD) permit save me from detention?"*

How can I help you plan your semester today?`,
      timestamp: 'Just now',
      source: 'gemini',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    `If I take a 3-day sick leave starting tomorrow, will my Chemistry attendance drop below 75%?`,
    `How many classes can I safely bunk in ${subjects[0]?.name || 'my first course'}?`,
    `Which subject is at the highest risk of detention?`,
    `What will my attendance be if I skip all classes this Friday?`,
  ];

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!messageText) setInput('');
    setLoading(true);

    try {
      // Build student context snapshot
      const studentContext = {
        sectionId: section.id,
        sectionName: section.name,
        referenceDate,
        targetDate,
        overallPercentage: overall.currentOverallPercentage,
        totalConducted: overall.totalConducted,
        totalAttended: overall.totalAttended,
        totalRemaining: overall.totalRemaining,
        hasDetention: overall.hasAnyIrreversibleDetention,
        detainedSubjectCodes: overall.detainedSubjectCodes,
        subjects: subjects.map((s) => ({
          code: s.code,
          name: s.name,
          faculty: s.faculty,
          currentPercentage: s.currentPercentage,
          conductedSoFar: s.conductedSoFar,
          attendedSoFar: s.attendedSoFar,
          remainingClasses: s.remainingClasses,
          neededFor75: s.neededFor75,
          safeBunks75: s.safeBunks75,
          neededFor90: s.neededFor90,
          isIrreversibleDetention: s.isIrreversibleDetention,
          maxPossiblePercentage: s.maxPossiblePercentage,
          detentionDeficit: s.detentionDeficit,
        })),
        upcomingFiveClasses: upcomingClasses.slice(0, 8).map((c) => ({
          date: c.date,
          day: c.dayName,
          period: c.periodNumber,
          subject: c.subjectName,
          code: c.subjectCode,
        })),
      };

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          studentContext,
        }),
      });

      const data = await res.json();
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.response || 'Sorry, I could not compute that. Please verify your subject entries.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: `⚠️ **Connection Error:** Could not contact the advisor engine. Here is a quick estimate:
- Current overall attendance: **${overall.currentOverallPercentage}%**
- Total remaining classes: **${overall.totalRemaining}**
- Classes needed for 75%: **${overall.overallNeededFor75}**`,
          timestamp: 'Just now',
          source: 'fallback',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Simple Markdown parser for bolding, bullet points, headers
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="font-extrabold text-blue-300 text-sm mt-2 mb-1">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={idx} className="font-black text-white text-base mt-2 mb-1">{line.replace('## ', '')}</h3>;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const content = line.substring(2);
        return (
          <li key={idx} className="ml-4 list-disc text-slate-200 my-0.5">
            <span dangerouslySetInnerHTML={{ __html: formatInline(content) }} />
          </li>
        );
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-1.5" />;
      }
      return (
        <p key={idx} className="text-slate-200 my-0.5 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      );
    });
  };

  const formatInline = (str: string) => {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-blue-200">$1</em>');
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full p-4 shadow-2xl shadow-blue-500/40 border-2 border-white/20 flex items-center space-x-2 transition transform hover:scale-105 active:scale-95 group"
        >
          <div className="relative">
            <Bot className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900 animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900" />
          </div>
          <span className="font-black text-xs tracking-wide pr-1">Attendance Advisor AI</span>
        </button>
      )}

      {/* Floating Chat Drawer */}
      {isOpen && (
        <div
          className={`fixed bottom-4 right-4 z-50 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white transition-all duration-300 ${
            isExpanded
              ? 'w-[94vw] sm:w-[680px] h-[86vh]'
              : 'w-[92vw] sm:w-[440px] h-[580px]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-b border-slate-700 p-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/30 border border-blue-400/50 flex items-center justify-center text-blue-300">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-sm text-white flex items-center space-x-1.5">
                  <span>Attendance Advisor</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold">
                    Gemini 3.8
                  </span>
                </h3>
                <p className="text-[11px] text-slate-300 truncate max-w-[200px] sm:max-w-xs">
                  {section.name} • {overall.currentOverallPercentage}% Overall
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-slate-300">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 rounded-md hover:bg-slate-800 hover:text-white transition"
                title={isExpanded ? 'Minimize' : 'Maximize'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onToggle}
                className="p-1 rounded-md hover:bg-slate-800 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="bg-slate-950/70 border-b border-slate-800 px-3 py-2 flex overflow-x-auto gap-1.5 scrollbar-thin shrink-0">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={loading}
                className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-blue-900/60 text-slate-300 hover:text-white text-[11px] border border-slate-700/60 whitespace-nowrap transition"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 shadow-md ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-800/90 border border-slate-700 text-slate-200 rounded-tl-none'
                  }`}
                >
                  {m.sender === 'assistant' ? (
                    <div>{renderFormattedText(m.text)}</div>
                  ) : (
                    <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                  )}
                  <div className="flex justify-end items-center space-x-1 mt-1.5 text-[9px] text-slate-400">
                    <span>{m.timestamp}</span>
                    {m.source && <span>• {m.source}</span>}
                  </div>
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-purple-600/40 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs">
                <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 animate-spin">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <span>Advisor is analyzing your timetable schedule & calculating margins...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2 shrink-0"
          >
            <input
              type="text"
              placeholder="Ask anything (e.g. 'Can I skip Friday's lab and still stay above 80%?')"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white transition shadow-md shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};

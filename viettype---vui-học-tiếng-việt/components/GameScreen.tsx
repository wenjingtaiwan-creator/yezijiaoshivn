import React, { useState, useEffect, useRef } from 'react';
import { GameMode, GameStats, QuestionItem } from '../types';
import { fetchQuestions } from '../services/geminiService';
import Button from './Button';
import IllustrationCard from './IllustrationCard';
import { 
  Send, 
  RotateCcw, 
  Volume2, 
  Flame, 
  Trophy, 
  Target, 
  Gauge, 
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  ChevronRight
} from 'lucide-react';
import { 
  playKeyClick, 
  playCorrectChime, 
  playErrorBuzzer, 
  playComboChime, 
  speakVietnamese,
  isSpeechMuted 
} from '../utils/soundEffects';

interface GameScreenProps {
  mode: GameMode;
  categoryId?: string;
  customTopic?: string;
  customItems?: QuestionItem[];
  studentName?: string;
  onFinish: (stats: GameStats) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ 
  mode, 
  categoryId, 
  customTopic, 
  customItems,
  studentName,
  onFinish 
}) => {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
  
  // Game stats tracking
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [currentCombo, setCurrentCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [mistakeItems, setMistakeItems] = useState<QuestionItem[]>([]);

  // UI state
  const [isError, setIsError] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [showTelexGuide, setShowTelexGuide] = useState(true);

  // Time tracking
  const startTimeRef = useRef<number>(Date.now());
  const totalCharsCorrectRef = useRef<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      let data: QuestionItem[] = [];

      if (customItems && customItems.length > 0) {
        data = customItems;
      } else {
        data = await fetchQuestions(mode, categoryId, customTopic);
      }

      setQuestions(data);
      setLoading(false);
      startTimeRef.current = Date.now();

      // Auto focus input and focus first question
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    };

    loadQuestions();
  }, [mode, categoryId, customTopic, customItems]);

  // Auto focus input and speak question when switching question
  useEffect(() => {
    if (!loading && questions[currentIndex]) {
      inputRef.current?.focus();
      if (!isSpeechMuted()) {
        speakVietnamese(questions[currentIndex].text);
      }
    }
  }, [currentIndex, loading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    playKeyClick();
    setInputValue(val);
    if (isError) setIsError(false);
  };

  const calculateWPM = () => {
    const durationMinutes = (Date.now() - startTimeRef.current) / 60000;
    if (durationMinutes <= 0) return 0;
    return Math.round((totalCharsCorrectRef.current / 5) / durationMinutes);
  };

  const handleSubmit = () => {
    if (!questions[currentIndex]) return;

    const target = questions[currentIndex].text.trim();
    const input = inputValue.trim();

    // Normalizing text comparison (case-insensitive & accent exact match)
    if (input.toLowerCase() === target.toLowerCase()) {
      // --- CORRECT ANSWER ---
      const points = 10 + currentCombo * 2;
      totalCharsCorrectRef.current += target.length;

      const newCombo = currentCombo + 1;
      setCurrentCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);

      setScore(prev => prev + points);
      setCorrectCount(prev => prev + 1);

      if (newCombo % 5 === 0) {
        playComboChime(newCombo);
      } else {
        playCorrectChime();
      }

      setFeedbackMsg({
        text: `🎉 Chính xác! (+${points} 分${newCombo > 1 ? `, ${newCombo}連勝特惠!` : ''})`,
        type: 'success'
      });

      setIsError(false);
      setInputValue('');

      // Advance to next question (new question will auto-pronounce upon presentation)
      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          // Automatically fetch more questions or trigger completion
          fetchQuestions(mode, categoryId, customTopic).then(newQs => {
            if (newQs && newQs.length > 0) {
              setQuestions(prev => [...prev, ...newQs]);
              setCurrentIndex(prev => prev + 1);
            } else {
              handleCompleteGame();
            }
          });
        }
      }, 200);
    } else {
      // --- INCORRECT ANSWER ---
      setIsError(true);
      setMistakeCount(prev => prev + 1);
      setCurrentCombo(0);

      // Record mistake item
      const currentItem = questions[currentIndex];
      if (!mistakeItems.some(m => m.text === currentItem.text)) {
        setMistakeItems(prev => [...prev, currentItem]);
      }

      playErrorBuzzer();
      setFeedbackMsg({
        text: `❌ 未完全正確，請對照上方標點重試！`,
        type: 'error'
      });

      // Shake input animation
      const el = document.getElementById('typing-input-box');
      if (el) {
        el.classList.remove('animate-shake');
        void el.offsetWidth;
        el.classList.add('animate-shake');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleCompleteGame = () => {
    const finalWpm = calculateWPM();
    const totalAttempts = correctCount + mistakeCount;
    const accuracy = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 100;
    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);

    onFinish({
      studentName,
      score,
      correctCount,
      mistakeCount,
      questionsAnswered: correctCount,
      wpm: finalWpm,
      maxCombo,
      accuracy,
      timeSpentSeconds: timeSpent,
      mistakeItems
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl">🇻🇳</div>
        </div>
        <p className="text-xl font-bold text-slate-300 font-display">
          正在準備智慧題庫與圖像卡片...
        </p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  // Render character by character visual matching for current input vs target text
  const targetChars = currentQ.text.split('');
  const inputChars = inputValue.split('');

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header Bar with Live Stats */}
      <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        {/* Left: Progress & Question Counter */}
        <div className="flex items-center space-x-3">
          <span className="bg-indigo-500/20 text-indigo-300 font-mono-code font-bold px-3 py-1 rounded-xl border border-indigo-500/30 text-sm">
            第 {currentIndex + 1} / {questions.length} 題
          </span>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            模式: {mode === 'sentences' ? '實用句型' : mode === 'custom_ai' ? 'AI 自訂情境' : '主題單字'}
          </span>
        </div>

        {/* Center: WPM & Accuracy meters */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-xs text-slate-300 font-medium">
            <Gauge className="w-4 h-4 text-purple-400" />
            <span>速度:</span>
            <span className="font-mono-code font-bold text-purple-300 text-sm">{calculateWPM()} WPM</span>
          </div>

          <div className="h-4 w-px bg-slate-700"></div>

          <div className="flex items-center space-x-1.5 text-xs text-slate-300 font-medium">
            <Target className="w-4 h-4 text-emerald-400" />
            <span>正確率:</span>
            <span className="font-mono-code font-bold text-emerald-400 text-sm">
              {correctCount + mistakeCount > 0 
                ? Math.round((correctCount / (correctCount + mistakeCount)) * 100) 
                : 100}%
            </span>
          </div>

          {currentCombo > 1 && (
            <div className="flex items-center space-x-1 bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-xl border border-amber-500/40 text-xs font-black animate-pulse-subtle">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>{currentCombo}x 連勝</span>
            </div>
          )}
        </div>

        {/* Right: End & Score Button */}
        <Button variant="danger" size="sm" onClick={handleCompleteGame}>
          結束練習 (Finish)
        </Button>
      </div>

      {/* Main Illustration & Word Display Card */}
      <IllustrationCard item={currentQ} />

      {/* Real-Time Typing Comparison & Input Field */}
      <div id="typing-input-box" className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 shadow-2xl space-y-6">
        
        {/* Target Character Highlighting Bar */}
        <div className="bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800 text-center overflow-x-auto min-h-[70px] flex items-center justify-center">
          <div className="flex items-center justify-center tracking-wide text-2xl md:text-4xl font-bold font-display select-none">
            {targetChars.map((char, i) => {
              let charStyle = "text-slate-500"; // default un-typed
              
              if (i < inputChars.length) {
                if (inputChars[i].toLowerCase() === char.toLowerCase()) {
                  charStyle = "text-emerald-400 bg-emerald-500/10 rounded px-0.5 border-b-2 border-emerald-400";
                } else {
                  charStyle = "text-rose-400 bg-rose-500/20 rounded px-0.5 border-b-2 border-rose-500 animate-pulse";
                }
              } else if (i === inputChars.length) {
                charStyle = "text-amber-300 underline decoration-amber-400 decoration-2 underline-offset-8";
              }

              return (
                <span key={i} className={`transition-colors duration-100 ${charStyle}`}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </div>
        </div>

        {/* Input Box with Action Buttons */}
        <div className="relative flex items-center">
          <input
            id="typing-input"
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="請在 此處輸入 越南語 (Press Enter to submit)..."
            autoComplete="off"
            className={`w-full p-4 md:p-5 pr-16 text-xl md:text-3xl text-center font-bold rounded-2xl border-2 outline-none transition-all duration-200 bg-slate-950 text-white placeholder-slate-600
              ${isError 
                ? 'border-rose-500 ring-4 ring-rose-500/20' 
                : 'border-indigo-500/60 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20'
              }
            `}
          />

          <button 
            onClick={handleSubmit}
            title="送出答案 (Enter)"
            className="absolute right-3 p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg transition-transform active:scale-90"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Message Banner */}
        {feedbackMsg && (
          <div className={`p-3 rounded-xl text-center font-bold text-sm transition-all duration-200 ${
            feedbackMsg.type === 'success' 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
          }`}>
            {feedbackMsg.text}
          </div>
        )}

        {/* TELEX Quick Helper Prompt */}
        {showTelexGuide && currentQ.telexGuide && (
          <div className="flex items-center justify-between bg-slate-900/60 px-4 py-2.5 rounded-xl border border-slate-800/80 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-amber-400">⌨️ TELEX 鍵盤提示:</span>
              <span className="font-mono-code text-amber-300 font-bold tracking-wider">{currentQ.telexGuide}</span>
            </div>
            <span className="text-slate-500 hidden sm:inline">按 Enter 送出答案</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameScreen;

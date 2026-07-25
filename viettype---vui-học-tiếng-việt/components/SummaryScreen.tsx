import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import { 
  Trophy, 
  RotateCcw, 
  Home, 
  Eye, 
  Flame, 
  Target, 
  Gauge, 
  Clock, 
  Sparkles, 
  Camera, 
  Mail, 
  CheckCircle2, 
  User, 
  Send,
  Download,
  X
} from 'lucide-react';
import { GameStats } from '../types';
import Button from './Button';
import { playVictoryFanfare } from '../utils/soundEffects';

interface SummaryScreenProps {
  stats: GameStats;
  onPlayAgain: () => void;
  onGoHome: () => void;
  onOpenReview: () => void;
}

const SummaryScreen: React.FC<SummaryScreenProps> = ({
  stats,
  onPlayAgain,
  onGoHome,
  onOpenReview
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [hasCapturedImage, setHasCapturedImage] = useState(false);

  useEffect(() => {
    // Play celebratory victory fanfare
    playVictoryFanfare();

    // Trigger canvas confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  }, []);

  // Grade calculation
  const getGrade = () => {
    if (stats.accuracy >= 95 && stats.wpm >= 20) return { title: 'S+ 級大師 (Vietnamese Master)', color: 'text-amber-400', bg: 'from-amber-500/20 to-yellow-500/10' };
    if (stats.accuracy >= 85) return { title: 'A 級優等 (Excellent)', color: 'text-emerald-400', bg: 'from-emerald-500/20 to-teal-500/10' };
    if (stats.accuracy >= 70) return { title: 'B 級良好 (Good Progress)', color: 'text-indigo-400', bg: 'from-indigo-500/20 to-blue-500/10' };
    return { title: 'C 級加油 (Keep Practicing)', color: 'text-rose-400', bg: 'from-rose-500/20 to-orange-500/10' };
  };

  const grade = getGrade();
  const studentName = stats.studentName || 'Học viên (學生)';
  const teacherEmail = 'wenjingtaiwan@gmail.com';

  const handleCaptureScreenshot = async () => {
    if (!cardRef.current) return;
    setIsCapturing(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0f172a',
        scale: 2,
        useCORS: true,
        logging: false
      });

      // Download PNG image
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().slice(0, 10);
      link.download = `VietType_Result_${studentName}_${dateStr}.png`;
      link.href = image;
      link.click();

      setHasCapturedImage(true);
      setShowSubmitModal(true);
    } catch (e) {
      console.error('Screenshot capture failed:', e);
      setShowSubmitModal(true);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleOpenEmail = () => {
    const subject = encodeURIComponent(`[VietType 越南語打字作業] 學生: ${studentName} - 成績報告`);
    const bodyText = `親愛的老師好，\n\n我是學生：${studentName}\n\n以下是我的越南語打字練習成績報告：\n--------------------------------\n- 玩家姓名: ${studentName}\n- 總得分: ${stats.score} 分\n- 正確率: ${stats.accuracy}%\n- 打字速度: ${stats.wpm} WPM\n- 最高連勝: ${stats.maxCombo}x\n- 練習耗時: ${stats.timeSpentSeconds} 秒\n- 答對題數: ${stats.correctCount} 題\n- 答錯題數: ${stats.mistakeCount} 題\n--------------------------------\n(附件已自動儲存成績卡截圖 PNG 於本機，交卷時請直接夾帶該圖片即可)\n\n祝 順心！\n${studentName}`;

    window.open(`mailto:${teacherEmail}?subject=${subject}&body=${encodeURIComponent(bodyText)}`);
  };

  return (
    <div className="max-w-3xl mx-auto w-full my-6 animate-in zoom-in-95 duration-300">
      
      {/* Captured Card Target */}
      <div 
        ref={cardRef} 
        className="bg-slate-900 border border-slate-700/80 rounded-3xl p-8 md:p-10 shadow-2xl relative text-center space-y-8 overflow-hidden"
      >
        {/* Top Student Name Badge */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2 bg-indigo-500/10 px-4 py-1.5 rounded-2xl border border-indigo-500/20 text-indigo-300 font-bold text-sm">
            <User className="w-4 h-4 text-indigo-400" />
            <span>玩家姓名: {studentName}</span>
          </div>

          <div className="text-xs text-slate-400 font-medium">
            <span>教師指定郵件: {teacherEmail}</span>
          </div>
        </div>

        {/* Top Trophy Decoration */}
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-1 shadow-xl shadow-amber-500/20 mx-auto flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
              <Trophy className="w-12 h-12 text-amber-400 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Title & Grade Banner */}
        <div>
          <h2 className="text-3xl md:text-5xl font-black font-display text-white tracking-tight">
            結算報告 (Performance Summary)
          </h2>
          <div className={`mt-3 inline-block px-6 py-2 rounded-2xl border border-slate-700 bg-gradient-to-r ${grade.bg}`}>
            <p className={`text-lg md:text-xl font-bold ${grade.color}`}>
              {grade.title}
            </p>
          </div>
        </div>

        {/* Stats Grid Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 flex flex-col items-center text-center">
            <Sparkles className="w-5 h-5 text-amber-400 mb-1" />
            <span className="text-xs text-slate-400 font-bold uppercase">總得分 (Score)</span>
            <span className="text-3xl font-black font-mono-code text-amber-400 mt-1">{stats.score}</span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 flex flex-col items-center text-center">
            <Target className="w-5 h-5 text-emerald-400 mb-1" />
            <span className="text-xs text-slate-400 font-bold uppercase">正確率 (Accuracy)</span>
            <span className="text-3xl font-black font-mono-code text-emerald-400 mt-1">{stats.accuracy}%</span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 flex flex-col items-center text-center">
            <Gauge className="w-5 h-5 text-purple-400 mb-1" />
            <span className="text-xs text-slate-400 font-bold uppercase">打字速度 (WPM)</span>
            <span className="text-3xl font-black font-mono-code text-purple-400 mt-1">{stats.wpm}</span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 flex flex-col items-center text-center">
            <Flame className="w-5 h-5 text-orange-500 mb-1" />
            <span className="text-xs text-slate-400 font-bold uppercase">最高連勝 (Max Combo)</span>
            <span className="text-3xl font-black font-mono-code text-orange-400 mt-1">{stats.maxCombo}x</span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 flex flex-col items-center text-center">
            <Clock className="w-5 h-5 text-cyan-400 mb-1" />
            <span className="text-xs text-slate-400 font-bold uppercase">耗時 (Time Spent)</span>
            <span className="text-3xl font-black font-mono-code text-cyan-400 mt-1">{stats.timeSpentSeconds}s</span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 flex flex-col items-center justify-center text-center">
            <span className="text-xs text-slate-400 font-bold uppercase">答對 / 錯誤</span>
            <span className="text-2xl font-black font-mono-code text-white mt-1">
              <span className="text-emerald-400">{stats.correctCount}</span> / <span className="text-rose-400">{stats.mistakeCount}</span>
            </span>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-800">
          <Button
            variant="success"
            size="lg"
            onClick={handleCaptureScreenshot}
            disabled={isCapturing}
            icon={<Camera className="w-5 h-5 text-emerald-200" />}
          >
            {isCapturing ? "自動截圖中..." : "📸 截圖與交卷 (Screenshot & Submit)"}
          </Button>

          {stats.mistakeItems && stats.mistakeItems.length > 0 && (
            <Button 
              variant="outline" 
              size="lg" 
              onClick={onOpenReview}
              icon={<Eye className="w-5 h-5 text-rose-400" />}
            >
              檢視錯題 ({stats.mistakeItems.length})
            </Button>
          )}

          <Button 
            variant="ghost" 
            size="lg" 
            onClick={onGoHome}
            icon={<Home className="w-5 h-5" />}
          >
            首頁 (Home)
          </Button>

          <Button 
            variant="accent" 
            size="lg" 
            onClick={onPlayAgain}
            icon={<RotateCcw className="w-5 h-5" />}
          >
            再玩一次
          </Button>
        </div>
      </div>

      {/* Submission Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/90 rounded-3xl max-w-lg w-full shadow-2xl p-6 md:p-8 relative text-slate-100 space-y-6">
            
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-5 right-5 p-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white">
                  成績卡截圖已自動下載！
                </h3>
                <p className="text-xs text-slate-400">
                  是否要立即寄出 Email 交卷給老師？
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300">
              <p className="font-bold text-amber-400 flex items-center space-x-1">
                <Send className="w-3.5 h-3.5" />
                <span>作業寄送資訊:</span>
              </p>
              <p>• 收件人: <span className="font-mono-code text-indigo-300 font-bold">{teacherEmail}</span></p>
              <p>• 學生姓名: <span className="font-bold text-white">{studentName}</span></p>
              <p>• 總得分: <span className="font-bold text-emerald-400">{stats.score} 分</span> (正確率: {stats.accuracy}%)</p>
              <p className="text-slate-400 pt-1 border-t border-slate-800">
                💡 點擊下方按鈕將開啟您的郵件軟體，開啟後請將剛剛下載的截圖圖片附件隨信寄出即可！
              </p>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <Button
                variant="ghost"
                fullWidth
                onClick={() => setShowSubmitModal(false)}
              >
                稍後再說
              </Button>

              <Button
                variant="primary"
                fullWidth
                onClick={handleOpenEmail}
                icon={<Mail className="w-5 h-5 text-yellow-300" />}
              >
                寄出 Email 交卷
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryScreen;

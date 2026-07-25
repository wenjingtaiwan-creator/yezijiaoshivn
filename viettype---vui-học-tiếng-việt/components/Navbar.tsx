import React from 'react';
import { Volume2, VolumeX, Mic, MicOff, Keyboard, Sparkles, Trophy, Flame, Clipboard } from 'lucide-react';
import { isSoundMuted, setSoundMuted, isSpeechMuted, setSpeechMuted } from '../utils/soundEffects';

interface NavbarProps {
  score: number;
  streak: number;
  onOpenGuide: () => void;
  onOpenAIGenerator: () => void;
  onOpenCustomImport?: () => void;
  onGoHome: () => void;
  soundState: boolean;
  setSoundState: (val: boolean) => void;
  speechState: boolean;
  setSpeechState: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  score,
  streak,
  onOpenGuide,
  onOpenAIGenerator,
  onOpenCustomImport,
  onGoHome,
  soundState,
  setSoundState,
  speechState,
  setSpeechState
}) => {
  const toggleSound = () => {
    const next = !soundState;
    setSoundMuted(next);
    setSoundState(next);
  };

  const toggleSpeech = () => {
    const next = !speechState;
    setSpeechMuted(next);
    setSpeechState(next);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo */}
        <button 
          onClick={onGoHome}
          className="flex items-center space-x-3 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-rose-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center font-black text-xl text-yellow-400">
              🇻🇳
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-black text-xl md:text-2xl text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                VietType
              </span>
              <span className="text-[10px] uppercase tracking-widest font-extrabold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              越南語商業打字與單字學習網
            </p>
          </div>
        </button>

        {/* Center Live Stats */}
        <div className="flex items-center space-x-3 bg-slate-800/80 px-4 py-1.5 rounded-2xl border border-slate-700/80">
          <div className="flex items-center space-x-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-400 font-semibold uppercase">得分:</span>
            <span className="font-mono-code font-bold text-amber-400 text-sm md:text-base">{score}</span>
          </div>

          <div className="h-4 w-px bg-slate-700"></div>

          <div className="flex items-center space-x-1.5">
            <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
            <span className="text-xs text-slate-400 font-semibold uppercase">連勝:</span>
            <span className="font-mono-code font-bold text-orange-400 text-sm md:text-base">{streak}x</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Custom Paste Text Button */}
          {onOpenCustomImport && (
            <button
              onClick={onOpenCustomImport}
              title="貼上想練習的越南語詞彙或句子"
              className="flex items-center space-x-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white px-3 py-2 rounded-xl shadow-md text-xs font-bold transition-all hover:scale-105 active:scale-95 border border-emerald-500/50"
            >
              <Clipboard className="w-4 h-4 text-emerald-200" />
              <span className="hidden md:inline">貼上自訂文本</span>
            </button>
          )}

          {/* TELEX Input Guide Button */}
          <button
            onClick={onOpenGuide}
            title="開啟 TELEX / VNI 輸入法規則"
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-xl border border-slate-700 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
          >
            <Keyboard className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">輸入法對照</span>
          </button>

          {/* AI Generator Button */}
          <button
            onClick={onOpenAIGenerator}
            title="使用 AI 生成專屬練習題目"
            className="flex items-center space-x-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-3 py-2 rounded-xl shadow-md text-xs font-bold transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
            <span className="hidden md:inline">AI 題庫</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            title={soundState ? "音效: 已靜音" : "音效: 開啟"}
            className={`p-2 rounded-xl border transition-all ${
              soundState 
                ? 'bg-rose-950/40 border-rose-800/80 text-rose-400' 
                : 'bg-slate-800 border-slate-700 text-emerald-400 hover:bg-slate-700'
            }`}
          >
            {soundState ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Voice Pronunciation Toggle */}
          <button
            onClick={toggleSpeech}
            title={speechState ? "語音朗讀: 已關閉" : "語音朗讀: 自動朗讀"}
            className={`p-2 rounded-xl border transition-all ${
              speechState 
                ? 'bg-rose-950/40 border-rose-800/80 text-rose-400' 
                : 'bg-slate-800 border-slate-700 text-indigo-400 hover:bg-slate-700'
            }`}
          >
            {speechState ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

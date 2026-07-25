import React, { useState } from 'react';
import { Volume2, Info, Sparkles, Image as ImageIcon } from 'lucide-react';
import { QuestionItem } from '../types';
import { speakVietnamese } from '../utils/soundEffects';

interface IllustrationCardProps {
  item: QuestionItem;
  autoSpeakOnMount?: boolean;
}

const IllustrationCard: React.FC<IllustrationCardProps> = ({ item }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  const handlePlayAudio = async () => {
    setIsPlayingAudio(true);
    await speakVietnamese(item.text);
    setIsPlayingAudio(false);
  };

  return (
    <div className="w-full bg-slate-800/90 rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[220px]">
        {/* Left Side: Visual Illustration Image */}
        <div className="md:col-span-5 relative bg-slate-950 overflow-hidden min-h-[180px] md:min-h-[240px] flex items-center justify-center group">
          {item.illustrationUrl ? (
            <img 
              src={item.illustrationUrl} 
              alt={item.text}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              onError={(e) => {
                // Fallback on image load error
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : null}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>

          {/* Emoji Badge overlay */}
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-700/80 text-2xl shadow-lg flex items-center space-x-2">
            <span>{item.emoji || '🇻🇳'}</span>
            {item.categoryName && (
              <span className="text-xs font-bold text-slate-300">
                {item.categoryName}
              </span>
            )}
          </div>

          {/* Audio Pronunciation Quick Trigger on image */}
          <button
            onClick={handlePlayAudio}
            title="點擊聽標準越南語發音"
            className={`absolute bottom-3 right-3 p-3 rounded-2xl shadow-xl transition-all ${
              isPlayingAudio 
                ? 'bg-amber-500 text-slate-950 scale-110 ring-4 ring-amber-400/50' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:scale-105 active:scale-95'
            }`}
          >
            <Volume2 className={`w-5 h-5 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
          </button>
        </div>

        {/* Right Side: Word / Sentence Details */}
        <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-4">
          <div>
            {/* Top Category / Difficulty tag */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                {item.difficulty === 'advanced' ? '高級句型' : item.difficulty === 'intermediate' ? '中級詞彙' : '基礎常用'}
              </span>
              
              <button
                onClick={() => setShowGuide(!showGuide)}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center space-x-1 transition-colors"
              >
                <Info className="w-3.5 h-3.5" />
                <span>{showGuide ? '隱藏拼寫提示' : '顯示拼寫提示'}</span>
              </button>
            </div>

            {/* Main Vietnamese Word Display */}
            <div className="flex items-center space-x-3 group">
              <h2 className="text-3xl md:text-5xl font-black font-display text-white tracking-tight leading-tight">
                {item.text}
              </h2>
              <button
                onClick={handlePlayAudio}
                title="發音 (Pronunciation)"
                className="text-slate-400 hover:text-amber-400 p-2 rounded-xl hover:bg-slate-700/50 transition-all shrink-0"
              >
                <Volume2 className="w-7 h-7" />
              </button>
            </div>

            {/* Traditional Chinese Meaning */}
            <p className="text-xl md:text-2xl font-bold text-emerald-400 mt-2">
              {item.meaning}
            </p>
          </div>

          {/* TELEX and Diacritic Typing Hint Box */}
          {showGuide && (
            <div className="bg-slate-900/90 rounded-2xl p-3.5 border border-slate-700/80 text-xs md:text-sm space-y-1.5 animate-in fade-in duration-200">
              {item.pinyin && (
                <p className="text-slate-300 font-medium flex items-center space-x-2">
                  <span className="text-indigo-400 font-bold">註音拆解:</span>
                  <span>{item.pinyin}</span>
                </p>
              )}
              {item.telexGuide && (
                <div className="flex items-center space-x-2">
                  <span className="text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 text-[11px]">
                    TELEX 打字法
                  </span>
                  <span className="font-mono-code font-bold text-amber-300 tracking-wider">
                    {item.telexGuide}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IllustrationCard;

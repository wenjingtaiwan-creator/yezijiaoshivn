import React from 'react';
import { X, RotateCcw, Volume2, AlertCircle } from 'lucide-react';
import { QuestionItem } from '../types';
import Button from './Button';
import { speakVietnamese } from '../utils/soundEffects';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  mistakes: QuestionItem[];
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, mistakes }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/90 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 md:p-8 relative text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-rose-500/20 text-rose-400 rounded-2xl border border-rose-500/30">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-display text-white">
              錯題複習庫 (Mistakes Flashcards)
            </h2>
            <p className="text-xs text-slate-400">
              共計 {mistakes.length} 題需要加強練習，點擊喇叭圖示可收聽標準朗讀。
            </p>
          </div>
        </div>

        {/* Mistakes List */}
        {mistakes.length === 0 ? (
          <div className="text-center py-12 bg-slate-950/50 rounded-2xl border border-slate-800">
            <p className="text-emerald-400 font-bold text-lg">🎉 完全沒有錯題，真棒！</p>
            <p className="text-xs text-slate-400 mt-1">您在此次練習中答對了所有題目。</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
            {mistakes.map((item, idx) => (
              <div 
                key={item.id || idx}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:bg-slate-800"
              >
                <div className="flex items-center space-x-4">
                  {item.illustrationUrl && (
                    <img 
                      src={item.illustrationUrl} 
                      alt={item.text} 
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-700"
                    />
                  )}
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-xl font-bold text-white font-display">
                        {item.text}
                      </h4>
                      <button
                        onClick={() => speakVietnamese(item.text)}
                        title="發音"
                        className="p-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-indigo-400 transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-emerald-400 mt-0.5">
                      {item.meaning}
                    </p>
                    {item.telexGuide && (
                      <p className="text-xs text-amber-400 font-mono-code mt-1">
                        TELEX: {item.telexGuide}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <Button variant="primary" onClick={onClose}>
            完成複習 (Done)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;

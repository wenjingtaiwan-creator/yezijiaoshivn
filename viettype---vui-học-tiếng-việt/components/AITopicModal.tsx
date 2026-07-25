import React, { useState } from 'react';
import { X, Sparkles, Loader2, Compass, Check } from 'lucide-react';
import Button from './Button';

interface AITopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateCustom: (topic: string) => void;
  isLoading: boolean;
}

const PRESET_TOPICS = [
  '✈️ 越南機場與海關通關 (Airport & Customs)',
  '☕ 咖啡廳點餐與甜點 (Coffee & Bakery)',
  '🚕 計程車與地圖問路 (Taxi & Directions)',
  '🛍️ 夜市購物與殺價 (Night Market Shopping)',
  '💼 辦公室職場商務 (Office & Business)',
  '🏥 醫院看診與藥局 (Medical & Pharmacy)',
  '🏖️ 峴港與下龍灣旅遊 (Travel & Resorts)',
];

const AITopicModal: React.FC<AITopicModalProps> = ({
  isOpen,
  onClose,
  onGenerateCustom,
  isLoading
}) => {
  const [customInput, setCustomInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      onGenerateCustom(customInput.trim());
    }
  };

  const handleSelectPreset = (topic: string) => {
    setCustomInput(topic);
    onGenerateCustom(topic);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/90 rounded-3xl max-w-xl w-full shadow-2xl p-6 md:p-8 relative text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white rounded-2xl shadow-lg">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-display text-white">
              AI 智慧自訂題庫 (AI Generator)
            </h2>
            <p className="text-xs text-slate-400">
              輸入任何教學情境或主題，Gemini 即刻為您生成即時打字考題！
            </p>
          </div>
        </div>

        {/* Custom Topic Input */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              自訂主題或情境 (Custom Topic):
            </label>
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="例如: 胡志明市美食、熱帶水果、家庭親屬稱謂..."
              className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl px-4 py-3.5 text-base text-white outline-none font-medium transition-all"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={!customInput.trim() || isLoading}
            icon={isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 text-yellow-300" />}
          >
            {isLoading ? "AI 生成中 (Generating...)" : "生成專屬題庫 (Generate)"}
          </Button>
        </form>

        {/* Quick Presets */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center space-x-1">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>或選擇熱門推薦情境 (Popular Scenarios):</span>
          </label>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {PRESET_TOPICS.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => handleSelectPreset(topic)}
                disabled={isLoading}
                className="w-full text-left bg-slate-800/60 hover:bg-indigo-950/50 hover:border-indigo-500/50 p-3 rounded-2xl border border-slate-700/80 text-xs md:text-sm font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-between group"
              >
                <span>{topic}</span>
                <Check className="w-4 h-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITopicModal;

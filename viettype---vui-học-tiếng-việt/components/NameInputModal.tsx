import React, { useState, useEffect } from 'react';
import { User, Sparkles, Check, Play, Keyboard } from 'lucide-react';
import Button from './Button';

interface NameInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmName: (name: string) => void;
  gameModeTitle?: string;
}

const NameInputModal: React.FC<NameInputModalProps> = ({
  isOpen,
  onClose,
  onConfirmName,
  gameModeTitle = '越南語打字練習'
}) => {
  const [name, setName] = useState('');

  useEffect(() => {
    // Load cached name if exists
    const saved = localStorage.getItem('vi_typing_student_name');
    if (saved) {
      setName(saved);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim() || 'Học viên (無名氏)';
    localStorage.setItem('vi_typing_student_name', cleanName);
    onConfirmName(cleanName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/90 rounded-3xl max-w-md w-full shadow-2xl p-6 md:p-8 relative text-slate-100">
        
        {/* Header Icon */}
        <div className="flex flex-col items-center text-center space-y-3 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-rose-500 p-0.5 shadow-xl shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-2xl text-amber-400">
              🇻🇳
            </div>
          </div>

          <h2 className="text-2xl font-bold font-display text-white">
            請輸入玩家姓名 (Student Name)
          </h2>
          <p className="text-xs text-slate-400 max-w-xs">
            開始【{gameModeTitle}】前，請先輸入您的越南語名字或中文姓名，成績將記於結算報告並可交給老師。
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              姓名 / 學號 (Họ và Tên):
            </label>
            <div className="relative flex items-center">
              <User className="w-5 h-5 absolute left-4 text-indigo-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例如: Nguyễn Văn A (陳小明)..."
                autoFocus
                className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl pl-12 pr-4 py-3.5 text-base text-white placeholder-slate-600 outline-none font-bold transition-all"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center space-x-3">
            <Button variant="ghost" fullWidth type="button" onClick={onClose}>
              取消 (Cancel)
            </Button>
            <Button
              variant="primary"
              fullWidth
              type="submit"
              disabled={!name.trim()}
              icon={<Play className="w-4 h-4 fill-current" />}
            >
              進入遊戲 (Start)
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NameInputModal;

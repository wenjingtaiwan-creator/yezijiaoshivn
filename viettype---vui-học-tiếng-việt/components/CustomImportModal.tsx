import React, { useState } from 'react';
import { X, FileText, Sparkles, ArrowRight, Clipboard, HelpCircle, CheckCircle2 } from 'lucide-react';
import Button from './Button';
import { QuestionItem } from '../types';

interface CustomImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCustomPractice: (items: QuestionItem[]) => void;
}

export const generateTelexGuide = (text: string): string => {
  // Simple heuristic mapper for common Vietnamese accents for student guidance
  const mappings: { [key: string]: string } = {
    'à': 'af', 'á': 'as', 'ả': 'ar', 'ã': 'ax', 'ạ': 'aj',
    'â': 'aa', 'ầ': 'aaf', 'ấ': 'aas', 'ẩ': 'aar', 'ẫ': 'aax', 'ậ': 'aaj',
    'ă': 'aw', 'ằ': 'awf', 'ắ': 'aws', 'ẳ': 'awr', 'ẵ': 'awx', 'ặ': 'awj',
    'è': 'ef', 'é': 'es', 'ẻ': 'er', 'ẽ': 'ex', 'ẹ': 'ej',
    'ê': 'ee', 'ề': 'eef', 'ế': 'ees', 'ể': 'eer', 'ễ': 'eex', 'ệ': 'eej',
    'ì': 'if', 'í': 'is', 'ỉ': 'ir', 'ĩ': 'ix', 'ị': 'ij',
    'ò': 'of', 'ó': 'os', 'ỏ': 'or', 'õ': 'ox', 'ọ': 'oj',
    'ô': 'oo', 'ồ': 'oof', 'ố': 'oos', 'ổ': 'oor', 'ỗ': 'oox', 'ộ': 'ooj',
    'ơ': 'ow', 'ờ': 'owf', 'ớ': 'ows', 'ở': 'owr', 'ỡ': 'owx', 'ợ': 'owj',
    'ù': 'uf', 'ú': 'us', 'ủ': 'ur', 'ũ': 'ux', 'ụ': 'uj',
    'ư': 'uw', 'ừ': 'uwf', 'ứ': 'uws', 'ử': 'uwr', 'ữ': 'uwx', 'ự': 'uwj',
    'ỳ': 'yf', 'ý': 'ys', 'ỷ': 'yr', 'ỹ': 'yx', 'ỵ': 'yj',
    'đ': 'dd'
  };

  return text.split('').map(char => {
    const lower = char.toLowerCase();
    if (mappings[lower]) {
      return mappings[lower];
    }
    return char;
  }).join('');
};

const CustomImportModal: React.FC<CustomImportModalProps> = ({
  isOpen,
  onClose,
  onStartCustomPractice
}) => {
  const [pastedText, setPastedText] = useState('');
  const [splitMode, setSplitMode] = useState<'line' | 'comma'>('line');

  if (!isOpen) return null;

  const handlePasteDemo = () => {
    const demo = `Xin chào các bạn!\nCảm ơn bạn rất nhiều.\nTôi đang học tiếng Việt.\nCà phê sữa đá rất ngon.\nChúc bạn một ngày vui vẻ!`;
    setPastedText(demo);
  };

  const handleStart = () => {
    if (!pastedText.trim()) return;

    let rawItems: string[] = [];
    if (splitMode === 'line') {
      rawItems = pastedText.split('\n').map(s => s.trim()).filter(Boolean);
    } else {
      rawItems = pastedText.split(/[,，;\n]/).map(s => s.trim()).filter(Boolean);
    }

    if (rawItems.length === 0) return;

    const formattedQuestions: QuestionItem[] = rawItems.map((raw, idx) => ({
      id: `custom_${Date.now()}_${idx}`,
      text: raw,
      meaning: '自訂練習句 (Custom Input Practice)',
      category: 'custom',
      categoryName: '自訂文本',
      difficulty: 'intermediate',
      emoji: '📝',
      telexGuide: generateTelexGuide(raw),
      illustrationUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80'
    }));

    onStartCustomPractice(formattedQuestions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/90 rounded-3xl max-w-2xl w-full shadow-2xl p-6 md:p-8 relative text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
            <Clipboard className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-display text-white">
              貼上自訂文本/課文練習 (Paste Custom Text)
            </h2>
            <p className="text-xs text-slate-400">
              您可以複製課本句子、單字列表或文章貼於此處，系統將自動解析為打字考題！
            </p>
          </div>
        </div>

        {/* Split Options */}
        <div className="flex items-center space-x-4 mb-4">
          <label className="text-xs font-bold text-slate-300 uppercase">分割方式:</label>
          <button
            type="button"
            onClick={() => setSplitMode('line')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              splitMode === 'line' 
                ? 'bg-indigo-600 text-white border border-indigo-400' 
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            按逐行分割 (Per Line)
          </button>
          <button
            type="button"
            onClick={() => setSplitMode('comma')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              splitMode === 'comma' 
                ? 'bg-indigo-600 text-white border border-indigo-400' 
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            按逗號/符號分割 (Per Word/Comma)
          </button>
        </div>

        {/* Text Area Input */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-300">
              請貼上越南語句子或單字 (Paste Vietnamese Text):
            </label>
            <button
              onClick={handlePasteDemo}
              className="text-xs text-indigo-400 hover:text-indigo-300 underline font-medium"
            >
              載入示範課文
            </button>
          </div>

          <textarea
            rows={7}
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder={`在此貼上您想練習的越南文內容...\n例如：\nXin chào các bạn.\nBánh mì Việt Nam rất ngon.`}
            className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl p-4 text-base text-white placeholder-slate-600 outline-none font-medium transition-all"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-400">
            {pastedText.trim() ? `已偵測到內容，預計拆分為題庫` : '等待貼上文本...'}
          </span>

          <div className="flex space-x-3">
            <Button variant="ghost" onClick={onClose}>
              取消 (Cancel)
            </Button>
            <Button
              variant="success"
              onClick={handleStart}
              disabled={!pastedText.trim()}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              開始練習 (Start Practice)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomImportModal;

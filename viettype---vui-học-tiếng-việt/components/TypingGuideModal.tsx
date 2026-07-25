import React, { useState } from 'react';
import { X, Keyboard, CheckCircle, Lightbulb } from 'lucide-react';
import Button from './Button';

interface TypingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TypingGuideModal: React.FC<TypingGuideModalProps> = ({ isOpen, onClose }) => {
  const [testInput, setTestInput] = useState('');

  if (!isOpen) return null;

  const specialChars = [
    { letter: 'â', telex: 'aa', vni: 'a6', example: 'cân (caan)' },
    { letter: 'ê', telex: 'ee', vni: 'e6', example: 'đêm (ddeem)' },
    { letter: 'ô', telex: 'oo', vni: 'o6', example: 'cô (coo)' },
    { letter: 'đ', telex: 'dd', vni: 'd9', example: 'đi (ddi)' },
    { letter: 'ă', telex: 'aw', vni: 'a1', example: 'ăn (awn)' },
    { letter: 'ơ', telex: 'ow', vni: 'o7', example: 'mơ (mow)' },
    { letter: 'ư', telex: 'uw', vni: 'u7', example: 'mưa (muwa)' },
  ];

  const toneMarks = [
    { tone: 'Sắc (陰平/銳聲)', mark: '´', telex: 's', vni: '1', example: 'cá (cas)' },
    { tone: 'Huyền (陽平/重聲)', mark: '`', telex: 'f', vni: '2', example: 'cà (caf)' },
    { tone: 'Hỏi (問聲)', mark: 'ˀ', telex: 'r', vni: '5', example: 'cả (car)' },
    { tone: 'Ngã (跌聲/波浪)', mark: '~', telex: 'x', vni: '4', example: 'cã (cax)' },
    { tone: 'Nặng (重音點)', mark: '.', telex: 'j', vni: '6', example: 'cạ (caj)' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/90 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 relative text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-2xl border border-cyan-500/30">
            <Keyboard className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-white">
              越南語輸入法對照表 (Input Guide)
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              快速學會 TELEX 與 VNI 輸入規則，打出標準越南語調符！
            </p>
          </div>
        </div>

        {/* Special Letters Table */}
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-amber-400 flex items-center space-x-2 mb-3">
              <Lightbulb className="w-4 h-4" />
              <span>1. 特殊字母輸入法 (Special Vowels & D)</span>
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800/80 text-xs text-slate-300 uppercase font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-3">字母</th>
                    <th className="p-3 text-cyan-400">TELEX 鍵盤</th>
                    <th className="p-3 text-indigo-400">VNI 鍵盤</th>
                    <th className="p-3">範例說明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {specialChars.map((item) => (
                    <tr key={item.letter} className="hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-lg text-emerald-400">{item.letter}</td>
                      <td className="p-3 font-mono-code font-bold text-cyan-300">{item.telex}</td>
                      <td className="p-3 font-mono-code font-bold text-indigo-300">{item.vni}</td>
                      <td className="p-3 text-xs text-slate-400">{item.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tone Marks Table */}
          <div>
            <h3 className="text-base font-bold text-amber-400 flex items-center space-x-2 mb-3">
              <Lightbulb className="w-4 h-4" />
              <span>2. 五大聲調標誌 (Five Diacritic Tones)</span>
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800/80 text-xs text-slate-300 uppercase font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-3">聲調名稱</th>
                    <th className="p-3">調符</th>
                    <th className="p-3 text-cyan-400">TELEX 鍵盤</th>
                    <th className="p-3 text-indigo-400">VNI 鍵盤</th>
                    <th className="p-3">範例說明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {toneMarks.map((item) => (
                    <tr key={item.tone} className="hover:bg-slate-800/40">
                      <td className="p-3 font-semibold">{item.tone}</td>
                      <td className="p-3 font-bold text-lg text-rose-400">{item.mark}</td>
                      <td className="p-3 font-mono-code font-bold text-cyan-300">{item.telex}</td>
                      <td className="p-3 font-mono-code font-bold text-indigo-300">{item.vni}</td>
                      <td className="p-3 text-xs text-slate-400">{item.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Test Sandbox */}
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80 space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              ⌨️ 現場打字測試區 (SandBox Practice)
            </label>
            <input
              type="text"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="試著在這裡輸入越南文，例如: Xin chao, Banh mi..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-base text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 font-medium"
            />
            {testInput && (
              <p className="text-xs text-emerald-400 font-medium flex items-center space-x-1 pt-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>實時結果: {testInput}</span>
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          <Button variant="primary" onClick={onClose}>
            我瞭解了 (Close)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TypingGuideModal;

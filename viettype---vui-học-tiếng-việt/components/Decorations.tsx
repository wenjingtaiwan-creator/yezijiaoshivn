import React from 'react';

const Decorations: React.FC = () => {
  const specialChars = [
    { label: 'â', rule: 'aa' },
    { label: 'ô', rule: 'oo' },
    { label: 'ê', rule: 'ee' },
    { label: 'đ', rule: 'dd' },
    { label: 'ă', rule: 'aw' },
    { label: 'ơ', rule: 'ow' },
    { label: 'ư', rule: 'uw' }, 
  ];

  const tones = [
    { label: 'Sắc', icon: '´', rule: 's' },
    { label: 'Huyền', icon: '`', rule: 'f' },
    { label: 'Hỏi', icon: 'ˀ', rule: 'r' },
    { label: 'Ngã', icon: '~', rule: 'x' },
    { label: 'Nặng', icon: '.', rule: 'j' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-0 flex justify-between p-2 md:p-6 overflow-hidden">
      {/* Left Column: Special Letters */}
      <div className="flex flex-col justify-center space-y-3 md:space-y-4 opacity-60">
        <div className="mb-2">
            <h3 className="font-bold text-yellow-800 text-sm md:text-lg uppercase bg-yellow-100/80 px-2 py-1 rounded inline-block shadow-sm">Ký tự (Letters)</h3>
        </div>
        {specialChars.map((item) => (
          <div key={item.label} className="flex items-center gap-3 bg-white/70 p-3 rounded-xl shadow-sm border-2 border-yellow-100 transform transition-transform hover:scale-110 hover:bg-white">
            <span className="text-2xl md:text-3xl font-black text-red-600 min-w-[2rem] text-center">{item.label}</span>
            <span className="text-gray-400 font-bold">=</span>
            <span className="text-xl md:text-2xl font-bold text-blue-700 font-mono tracking-wider">{item.rule}</span>
          </div>
        ))}
      </div>

      {/* Right Column: Tones */}
      <div className="flex flex-col justify-center space-y-3 md:space-y-4 opacity-60 items-end">
        <div className="mb-2">
            <h3 className="font-bold text-yellow-800 text-sm md:text-lg uppercase bg-yellow-100/80 px-2 py-1 rounded inline-block shadow-sm">Dấu (Tones)</h3>
        </div>
        {tones.map((item) => (
          <div key={item.label} className="flex items-center gap-3 bg-white/70 p-3 rounded-xl shadow-sm border-2 border-yellow-100 transform transition-transform hover:scale-110 hover:bg-white">
             <span className="text-sm md:text-base font-bold text-gray-600 hidden md:inline-block">{item.label}</span>
             <div className="relative h-8 w-8 flex items-center justify-center bg-gray-100 rounded-full">
                 <span className="text-2xl font-black text-red-600 pb-2">{item.icon}</span>
             </div>
            <span className="text-gray-400 font-bold">=</span>
            <span className="text-xl md:text-2xl font-bold text-blue-700 font-mono min-w-[1rem] text-center">{item.rule}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Decorations;
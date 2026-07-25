import React, { useState } from 'react';
import { GameMode, GameState, GameStats, CategoryId, QuestionItem } from './types';
import Navbar from './components/Navbar';
import Button from './components/Button';
import GameScreen from './components/GameScreen';
import SummaryScreen from './components/SummaryScreen';
import TypingGuideModal from './components/TypingGuideModal';
import AITopicModal from './components/AITopicModal';
import ReviewModal from './components/ReviewModal';
import CustomImportModal from './components/CustomImportModal';
import NameInputModal from './components/NameInputModal';
import { CATEGORIES } from './data/vocabularyData';
import { 
  Type, 
  MessageSquare, 
  Sparkles, 
  Play, 
  Keyboard, 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  ChevronRight,
  Flame,
  Award,
  Clipboard
} from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [gameMode, setGameMode] = useState<GameMode>('vocabulary');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customTopic, setCustomTopic] = useState<string | undefined>(undefined);
  const [customItems, setCustomItems] = useState<QuestionItem[] | undefined>(undefined);
  const [finalStats, setFinalStats] = useState<GameStats | null>(null);

  // Audio mute state
  const [soundState, setSoundState] = useState<boolean>(false); // false = enabled
  const [speechState, setSpeechState] = useState<boolean>(false); // false = enabled

  // Modals state
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isCustomImportOpen, setIsCustomImportOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);

  // Stats across session
  const [totalScore, setTotalScore] = useState(0);
  const [sessionStreak, setSessionStreak] = useState(0);

  // Student Name & Pending Start Config
  const [studentName, setStudentName] = useState<string>(() => localStorage.getItem('vi_typing_student_name') || '');
  const [isNameModalOpen, setIsNameModalOpen] = useState<boolean>(false);
  const [pendingGameConfig, setPendingGameConfig] = useState<{
    mode: GameMode;
    catId: string;
    topic?: string;
    items?: QuestionItem[];
  } | null>(null);

  // Trigger name input before starting game
  const requestStartGame = (mode: GameMode, catId: string = 'all', topic?: string, items?: QuestionItem[]) => {
    setPendingGameConfig({ mode, catId, topic, items });
    setIsNameModalOpen(true);
  };

  const executeStartGame = (confirmedName: string) => {
    setStudentName(confirmedName);
    setIsNameModalOpen(false);

    if (pendingGameConfig) {
      setGameMode(pendingGameConfig.mode);
      setSelectedCategory(pendingGameConfig.catId);
      setCustomTopic(pendingGameConfig.topic);
      setCustomItems(pendingGameConfig.items);
      setGameState('playing');
      setFinalStats(null);
    }
  };

  const handleStartCustomPractice = (items: QuestionItem[]) => {
    requestStartGame('custom_paste', 'all', undefined, items);
  };

  const handleFinishGame = (stats: GameStats) => {
    setFinalStats(stats);
    setTotalScore(prev => prev + stats.score);
    if (stats.accuracy >= 80) {
      setSessionStreak(prev => prev + 1);
    } else {
      setSessionStreak(0);
    }
    setGameState('summary');
  };

  const handleGenerateAITopic = (topic: string) => {
    setIsAILoading(true);
    setTimeout(() => {
      setIsAILoading(false);
      setIsAIOpen(false);
      startGame('custom_ai', 'all', topic);
    }, 600);
  };

  const resetGame = () => {
    setGameState('menu');
    setFinalStats(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Navbar Header */}
      <Navbar
        score={totalScore}
        streak={sessionStreak}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenAIGenerator={() => setIsAIOpen(true)}
        onOpenCustomImport={() => setIsCustomImportOpen(true)}
        onGoHome={resetGame}
        soundState={soundState}
        setSoundState={setSoundState}
        speechState={speechState}
        setSpeechState={setSpeechState}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        
        {/* === MENU STATE === */}
        {gameState === 'menu' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            
            {/* Hero Banner Section */}
            <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center space-x-2 bg-indigo-500/10 text-indigo-300 px-3.5 py-1.5 rounded-full border border-indigo-500/20 text-xs font-extrabold uppercase tracking-widest">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>商業級越南語多媒體教學系統</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black font-display text-white tracking-tight leading-none">
                  邊學打字，邊圖解認字！
                </h1>

                <p className="text-slate-300 text-base md:text-lg font-medium leading-relaxed">
                  專為語言學習者與學生設計的現代打字平台。搭配高清主題圖卡、標準真人語音朗讀、TELEX 與 VNI 輸入法實時指引，讓打字練習變得極致有趣！
                </p>

                {/* Quick Launch Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => requestStartGame('vocabulary', 'all')}
                    icon={<BookOpen className="w-5 h-5" />}
                  >
                    開始單字練習 (Vocabulary)
                  </Button>

                  <Button
                    variant="success"
                    size="lg"
                    onClick={() => requestStartGame('sentences', 'all')}
                    icon={<MessageSquare className="w-5 h-5" />}
                  >
                    挑戰實用句型 (Sentences)
                  </Button>

                  <Button
                    variant="accent"
                    size="lg"
                    onClick={() => setIsCustomImportOpen(true)}
                    icon={<Clipboard className="w-5 h-5" />}
                  >
                    貼上自訂文章/詞彙 (Custom Paste)
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsAIOpen(true)}
                    icon={<Sparkles className="w-5 h-5 text-yellow-300" />}
                  >
                    AI 自訂情境題庫
                  </Button>
                </div>
              </div>
            </div>

            {/* Mode Category Selector Header */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold font-display text-white flex items-center space-x-2">
                    <Layers className="w-7 h-7 text-indigo-400" />
                    <span>主題詞彙選單 (Learning Categories)</span>
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400">
                    選擇您感興趣的日常生活情境，進行帶圖單字與語音打字練習！
                  </p>
                </div>

                {/* Keyboard Guide Link */}
                <button
                  onClick={() => setIsGuideOpen(true)}
                  className="flex items-center space-x-2 text-xs md:text-sm font-bold text-cyan-400 hover:text-cyan-300 bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl hover:bg-slate-800 transition-all"
                >
                  <Keyboard className="w-4 h-4" />
                  <span>檢視 TELEX / VNI 輸入法規則</span>
                </button>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => requestStartGame('vocabulary', cat.id)}
                    className="group bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-indigo-500/60 p-6 rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-indigo-500/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-4xl p-2.5 rounded-2xl bg-slate-950 border border-slate-800">
                          {cat.icon}
                        </span>
                        <span className="text-xs font-bold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
                          <span>開始</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white font-display">
                        {cat.nameZh}
                      </h3>
                      <p className="text-xs font-extrabold text-indigo-300 mt-0.5">
                        {cat.nameVi}
                      </p>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                        {cat.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-white">
                      <span>包含帶圖卡片 & 語音</span>
                      <Play className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* === PLAYING STATE === */}
        {gameState === 'playing' && (
          <GameScreen
            mode={gameMode}
            categoryId={selectedCategory}
            customTopic={customTopic}
            customItems={customItems}
            studentName={studentName}
            onFinish={handleFinishGame}
          />
        )}

        {/* === SUMMARY STATE === */}
        {gameState === 'summary' && finalStats && (
          <SummaryScreen
            stats={finalStats}
            onPlayAgain={() => requestStartGame(gameMode, selectedCategory, customTopic)}
            onGoHome={resetGame}
            onOpenReview={() => setIsReviewOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      <NameInputModal
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        onConfirmName={executeStartGame}
      />

      <TypingGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <AITopicModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onGenerateCustom={handleGenerateAITopic}
        isLoading={isAILoading}
      />

      <CustomImportModal
        isOpen={isCustomImportOpen}
        onClose={() => setIsCustomImportOpen(false)}
        onStartCustomPractice={handleStartCustomPractice}
      />

      {finalStats && (
        <ReviewModal
          isOpen={isReviewOpen}
          onClose={() => setIsReviewOpen(false)}
          mistakes={finalStats.mistakeItems || []}
        />
      )}
    </div>
  );
};

export default App;

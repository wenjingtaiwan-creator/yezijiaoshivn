export type GameMode = 'vocabulary' | 'sentences' | 'custom_ai' | 'custom_paste';

export type CategoryId = 
  | 'all'
  | 'food' 
  | 'travel' 
  | 'greetings' 
  | 'school' 
  | 'animals' 
  | 'family' 
  | 'jobs' 
  | 'shopping' 
  | 'fruits' 
  | 'health';

export type DifficultyLevel = 'all' | 'beginner' | 'intermediate' | 'advanced';

export type GameState = 'menu' | 'playing' | 'summary';

export interface QuestionItem {
  id?: string;
  text: string; // Vietnamese word or sentence with diacritics
  meaning: string; // Traditional Chinese translation
  pinyin?: string; // Phonetic or diacritics hint
  category?: CategoryId | string;
  categoryName?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  illustrationUrl?: string; // SVG or image visual illustration
  emoji?: string; // Icon or emoji visual
  telexGuide?: string; // TELEX typing keystrokes hint
  vniGuide?: string; // VNI typing keystrokes hint
  audioText?: string; // Text to synthesize via Web Speech API
}

export interface GameStats {
  studentName?: string;
  score: number;
  correctCount: number;
  mistakeCount: number;
  questionsAnswered: number;
  wpm: number;
  maxCombo: number;
  accuracy: number;
  timeSpentSeconds: number;
  mistakeItems: QuestionItem[];
}

export interface CategoryInfo {
  id: CategoryId;
  nameVi: string;
  nameZh: string;
  icon: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  description: string;
}

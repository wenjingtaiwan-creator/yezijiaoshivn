import { GoogleGenAI, Type } from "@google/genai";
import { QuestionItem, GameMode } from "../types";
import { VOCABULARY_ITEMS, SENTENCE_ITEMS } from "../data/vocabularyData";

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
});

export const fetchQuestions = async (
  mode: GameMode,
  categoryId?: string,
  customTopic?: string
): Promise<QuestionItem[]> => {
  const modelId = "gemini-3.6-flash";
  
  let prompt = "";
  if (customTopic) {
    prompt = `Generate a structured list of 15 distinct, authentic Vietnamese typing practice items specifically for the custom theme/topic: "${customTopic}". Include accurate Vietnamese diacritics, clear Traditional Chinese translations (繁體中文), phonetic/diacritic hints, and TELEX typing guide hints.`;
  } else if (mode === 'vocabulary') {
    prompt = `Generate a list of 15 distinct, common Vietnamese vocabulary words for language learners practicing typing. ${categoryId && categoryId !== 'all' ? `Theme category: ${categoryId}.` : ''} Include accurate Vietnamese diacritics, brief Traditional Chinese meaning (繁體中文), phonetic breakdown, and TELEX typing guide.`;
  } else {
    prompt = `Generate a list of 10 distinct, natural Vietnamese sentences for language learners practicing typing. ${categoryId && categoryId !== 'all' ? `Theme category: ${categoryId}.` : ''} Include accurate Vietnamese diacritics, Traditional Chinese translation (繁體中文), and TELEX typing guide.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: {
                type: Type.STRING,
                description: "The Vietnamese word or sentence with accurate tone marks/diacritics."
              },
              meaning: {
                type: Type.STRING,
                description: "Traditional Chinese translation (繁體中文)."
              },
              pinyin: {
                type: Type.STRING,
                description: "Phonetic or diacritics breakdown."
              },
              categoryName: {
                type: Type.STRING,
                description: "Category label."
              },
              telexGuide: {
                type: Type.STRING,
                description: "TELEX input keystroke guide."
              },
              emoji: {
                type: Type.STRING,
                description: "Single representative emoji."
              }
            },
            required: ["text", "meaning"]
          }
        },
        systemInstruction: "You are a professional, friendly Vietnamese language instructor creating educational typing practice materials for Traditional Chinese speaking students. Always include accurate Vietnamese diacritical marks. Ensure high quality educational translations."
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from Gemini");
    
    const data = JSON.parse(text) as QuestionItem[];
    // Enrich items with visual image placeholders or Unsplash artwork based on emoji/word
    return data.map((item, idx) => ({
      ...item,
      id: `ai_${Date.now()}_${idx}`,
      difficulty: 'beginner',
      illustrationUrl: `https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80`
    }));
  } catch (error) {
    console.warn("Gemini API fallback to curated offline database:", error);
    
    // Fallback using curated static database
    let baseList = mode === 'sentences' ? SENTENCE_ITEMS : VOCABULARY_ITEMS;
    if (categoryId && categoryId !== 'all') {
      const filtered = baseList.filter(item => item.category === categoryId);
      if (filtered.length > 0) baseList = filtered;
    }
    
    // Shuffle copy of list
    return [...baseList].sort(() => Math.random() - 0.5);
  }
};

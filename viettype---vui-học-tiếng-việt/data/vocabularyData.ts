import { QuestionItem, CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'food',
    nameVi: 'Ẩm thực & Đồ uống',
    nameZh: '美食與飲料',
    icon: '🍜',
    bgColor: 'bg-orange-500/10 hover:bg-orange-500/20',
    borderColor: 'border-orange-500/30',
    textColor: 'text-orange-400',
    description: 'Bánh mì, phở, cà phê, gỏi cuốn...'
  },
  {
    id: 'greetings',
    nameVi: 'Giao tiếp hàng ngày',
    nameZh: '日常社交用語',
    icon: '💬',
    bgColor: 'bg-emerald-500/10 hover:bg-emerald-500/20',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    description: 'Xin chào, cảm ơn, tạm biệt...'
  },
  {
    id: 'travel',
    nameVi: 'Du lịch & Giao thông',
    nameZh: '旅遊與交通',
    icon: '✈️',
    bgColor: 'bg-blue-500/10 hover:bg-blue-500/20',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    description: 'Sân bay, taxi, khách sạn, vé xe...'
  },
  {
    id: 'school',
    nameVi: 'Trường học & Học tập',
    nameZh: '校園與學習',
    icon: '📚',
    bgColor: 'bg-purple-500/10 hover:bg-purple-500/20',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-400',
    description: 'Sách, bút, thầy cô, bài tập...'
  },
  {
    id: 'animals',
    nameVi: 'Động vật & Tự nhiên',
    nameZh: '動物與自然',
    icon: '🐶',
    bgColor: 'bg-amber-500/10 hover:bg-amber-500/20',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
    description: 'Con mèo, con chó, con chim...'
  },
  {
    id: 'family',
    nameVi: 'Gia đình & Xưng hô',
    nameZh: '家庭與親屬稱謂',
    icon: '👨‍👩‍👧',
    bgColor: 'bg-rose-500/10 hover:bg-rose-500/20',
    borderColor: 'border-rose-500/30',
    textColor: 'text-rose-400',
    description: 'Ông bà, bố mẹ, anh chị em...'
  },
  {
    id: 'jobs',
    nameVi: 'Nghề nghiệp & Nghề',
    nameZh: '職業與工作',
    icon: '💼',
    bgColor: 'bg-cyan-500/10 hover:bg-cyan-500/20',
    borderColor: 'border-cyan-500/30',
    textColor: 'text-cyan-400',
    description: 'Bác sĩ, giáo viên, kỹ sư...'
  },
  {
    id: 'fruits',
    nameVi: 'Trái cây & Hoa quả',
    nameZh: '水果與蔬果',
    icon: '🍉',
    bgColor: 'bg-teal-500/10 hover:bg-teal-500/20',
    borderColor: 'border-teal-500/30',
    textColor: 'text-teal-400',
    description: 'Quả chôm chôm, xoài, dưa hấu...'
  }
];

export const VOCABULARY_ITEMS: QuestionItem[] = [
  // --- FOOD (Ẩm thực) ---
  {
    id: 'v_food_1',
    text: 'Bánh mì',
    meaning: '越南法式麵包',
    pinyin: 'Bánh = B-a-n-h-s | mì = m-i-f',
    category: 'food',
    categoryName: '美食與飲料',
    difficulty: 'beginner',
    emoji: '🥖',
    telexGuide: 'Banhs mi1',
    vniGuide: 'Banh1 mi2',
    illustrationUrl: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'v_food_2',
    text: 'Phở bò',
    meaning: '牛肉河粉',
    pinyin: 'Phở = P-h-o-w-r | bò = b-o-f',
    category: 'food',
    categoryName: '美食與飲料',
    difficulty: 'beginner',
    emoji: '🍜',
    telexGuide: 'Phowr bo1',
    vniGuide: 'Pho5 bo2',
    illustrationUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'v_food_3',
    text: 'Cà phê sữa đá',
    meaning: '冰煉乳咖啡',
    pinyin: 'Cà = c-a-f | phê = p-h-e-e | sữa = s-u-w-a-x | đá = d-d-a-s',
    category: 'food',
    categoryName: '美食與飲料',
    difficulty: 'intermediate',
    emoji: '☕',
    telexGuide: 'Ca1 phee suwax ddas',
    vniGuide: 'Ca2 phe1 su7a5 dda1',
    illustrationUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'v_food_4',
    text: 'Gỏi cuốn',
    meaning: '生春捲 (越南春捲)',
    pinyin: 'Gỏi = G-o-i-r | cuốn = c-u-o-o-n-s',
    category: 'food',
    categoryName: '美食與飲料',
    difficulty: 'beginner',
    emoji: '🌯',
    telexGuide: 'Goir cuons',
    vniGuide: 'Goi5 cuon1',
    illustrationUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'v_food_5',
    text: 'Bún chả',
    meaning: '烤肉米線',
    pinyin: 'Bún = B-u-n-s | chả = c-h-a-r',
    category: 'food',
    categoryName: '美食與飲料',
    difficulty: 'intermediate',
    emoji: '🥗',
    telexGuide: 'Buns char',
    vniGuide: 'Bun1 cha5',
    illustrationUrl: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80'
  },

  // --- GREETINGS (Giao tiếp) ---
  {
    id: 'v_greet_1',
    text: 'Xin chào',
    meaning: '你好 / 您好',
    pinyin: 'Xin = X-i-n | chào = c-h-a-o-f',
    category: 'greetings',
    categoryName: '日常社交用語',
    difficulty: 'beginner',
    emoji: '👋',
    telexGuide: 'Xin chao1',
    vniGuide: 'Xin chao2',
    illustrationUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'v_greet_2',
    text: 'Cảm ơn',
    meaning: '謝謝',
    pinyin: 'Cảm = C-a-m-r | ơn = o-w-n',
    category: 'greetings',
    categoryName: '日常社交用語',
    difficulty: 'beginner',
    emoji: '🙏',
    telexGuide: 'Camr own',
    vniGuide: 'Cam5 on7',
    illustrationUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'v_greet_3',
    text: 'Tạm biệt',
    meaning: '再見',
    pinyin: 'Tạm = T-a-m-j | biệt = b-i-e-e-t-j',
    category: 'greetings',
    categoryName: '日常社交用語',
    difficulty: 'beginner',
    emoji: '🙋‍♂️',
    telexGuide: 'Tamj bietj',
    vniGuide: 'Tam6 biet6',
    illustrationUrl: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'v_greet_4',
    text: 'Xin lỗi',
    meaning: '對不起 / 抱歉',
    pinyin: 'Xin = X-i-n | lỗi = l-o-o-i-x',
    category: 'greetings',
    categoryName: '日常社交用語',
    difficulty: 'beginner',
    emoji: '🙇',
    telexGuide: 'Xin looix',
    vniGuide: 'Xin loi5',
    illustrationUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'v_greet_5',
    text: 'Chúc ngủ ngon',
    meaning: '晚安',
    pinyin: 'Chúc = C-h-u-c-s | ngủ = n-g-u-r | ngon = n-g-o-n',
    category: 'greetings',
    categoryName: '日常社交用語',
    difficulty: 'intermediate',
    emoji: '🌙',
    telexGuide: 'Chuc1 ngur ngon',
    vniGuide: 'Chuc1 ngu5 ngon',
    illustrationUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
  },

  // --- TRAVEL (Du lịch) ---
  {
    id: 'v_trav_1',
    text: 'Sân bay',
    meaning: '機場',
    pinyin: 'Sân = S-a-a-n | bay = b-a-y',
    category: 'travel',
    categoryName: '旅遊與交通',
    difficulty: 'beginner',
    emoji: '✈️',
    telexGuide: 'Saan bay',
    vniGuide: 'San6 bay',
    illustrationUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'v_trav_2',
    text: 'Khách sạn',
    meaning: '飯店 / 旅館',
    pinyin: 'Khách = K-h-a-c-h-s | sạn = s-a-a-n-j',
    category: 'travel',
    categoryName: '旅遊與交通',
    difficulty: 'intermediate',
    emoji: '🏨',
    telexGuide: 'Khachs saanj',
    vniGuide: 'Khach1 san6',
    illustrationUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'v_trav_3',
    text: 'Xe máy',
    meaning: '摩托車 / 機車',
    pinyin: 'Xe = X-e | máy = m-a-y-s',
    category: 'travel',
    categoryName: '旅遊與交通',
    difficulty: 'beginner',
    emoji: '🛵',
    telexGuide: 'Xe mays',
    vniGuide: 'Xe may1',
    illustrationUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'v_trav_4',
    text: 'Hộ chiếu',
    meaning: '護照',
    pinyin: 'Hộ = H-o-o-j | chiếu = c-h-i-e-e-u-s',
    category: 'travel',
    categoryName: '旅遊與交通',
    difficulty: 'intermediate',
    emoji: '🛂',
    telexGuide: 'Hooj chieu1s',
    vniGuide: 'Ho6 chieu1',
    illustrationUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80'
  },

  // --- SCHOOL (Trường học) ---
  {
    id: 'v_sch_1',
    text: 'Trường học',
    meaning: '學校',
    pinyin: 'Trường = T-r-u-w-o-w-n-g-f | học = h-o-c-j',
    category: 'school',
    categoryName: '校園與學習',
    difficulty: 'beginner',
    emoji: '🏫',
    telexGuide: 'Truowngf hocj',
    vniGuide: 'Tru7ong72 hoc6',
    illustrationUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'v_sch_2',
    text: 'Thầy giáo',
    meaning: '男老師',
    pinyin: 'Thầy = T-h-a-a-y-f | giáo = g-i-a-o-s',
    category: 'school',
    categoryName: '校園與學習',
    difficulty: 'intermediate',
    emoji: '👨‍🏫',
    telexGuide: 'Thayf giaos',
    vniGuide: 'Thay62 giao1',
    illustrationUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'v_sch_3',
    text: 'Quyển sách',
    meaning: '一本書',
    pinyin: 'Quyển = Q-u-y-e-e-n-r | sách = s-a-c-h-s',
    category: 'school',
    categoryName: '校園與學習',
    difficulty: 'intermediate',
    emoji: '📖',
    telexGuide: 'Quyenr sachs',
    vniGuide: 'Quyen5 sach1',
    illustrationUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80'
  },

  // --- ANIMALS (Động vật) ---
  {
    id: 'v_anim_1',
    text: 'Con mèo',
    meaning: '貓咪',
    pinyin: 'Con = C-o-n | mèo = m-e-o-f',
    category: 'animals',
    categoryName: '動物與自然',
    difficulty: 'beginner',
    emoji: '🐱',
    telexGuide: 'Con meo1',
    vniGuide: 'Con meo2',
    illustrationUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'v_anim_2',
    text: 'Con chó',
    meaning: '小狗',
    pinyin: 'Con = C-o-n | chó = c-h-o-s',
    category: 'animals',
    categoryName: '動物與自然',
    difficulty: 'beginner',
    emoji: '🐶',
    telexGuide: 'Con chos',
    vniGuide: 'Con cho1',
    illustrationUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'v_anim_3',
    text: 'Con voi',
    meaning: '大象',
    pinyin: 'Con = C-o-n | voi = v-o-i',
    category: 'animals',
    categoryName: '動物與自然',
    difficulty: 'beginner',
    emoji: '🐘',
    telexGuide: 'Con voi',
    vniGuide: 'Con voi',
    illustrationUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=600&q=80'
  },

  // --- FRUITS (Trái cây) ---
  {
    id: 'v_frt_1',
    text: 'Quả dưa hấu',
    meaning: '西瓜',
    pinyin: 'Quả = Q-u-a-r | dưa = d-u-w-a | hấu = h-a-a-u-s',
    category: 'fruits',
    categoryName: '水果與蔬果',
    difficulty: 'intermediate',
    emoji: '🍉',
    telexGuide: 'Quar duwa haus',
    vniGuide: 'Qua5 du7a hau1',
    illustrationUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'v_frt_2',
    text: 'Quả xoài',
    meaning: '芒果',
    pinyin: 'Quả = Q-u-a-r | xoài = x-o-a-i-f',
    category: 'fruits',
    categoryName: '水果與蔬果',
    difficulty: 'beginner',
    emoji: '🥭',
    telexGuide: 'Quar xoai1',
    vniGuide: 'Qua5 xoai2',
    illustrationUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80'
  }
];

export const SENTENCE_ITEMS: QuestionItem[] = [
  {
    id: 's_1',
    text: 'Hôm nay trời đẹp quá.',
    meaning: '今天天氣真好。',
    pinyin: 'Hôm nay = 今天 | trời = 天氣 | đẹp = 美麗 | quá = 太、真',
    category: 'greetings',
    categoryName: '日常生活句型',
    difficulty: 'beginner',
    emoji: '☀️',
    telexGuide: 'Hom nay troiwf ddepj quas.',
    illustrationUrl: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 's_2',
    text: 'Tôi thích uống cà phê sữa đá.',
    meaning: '我喜歡喝冰煉乳咖啡。',
    pinyin: 'Tôi = 我 | thích = 喜歡 | uống = 喝',
    category: 'food',
    categoryName: '飲食生活句型',
    difficulty: 'intermediate',
    emoji: '🥤',
    telexGuide: 'Tooi thichs uongs ca1 phee suwax ddas.',
    illustrationUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 's_3',
    text: 'Cho tôi một bát phở bò nóng.',
    meaning: '請給我一碗熱牛肉河粉。',
    pinyin: 'Cho tôi = 給我 | một bát = 一碗 | nóng = 熱的',
    category: 'food',
    categoryName: '餐廳點餐句型',
    difficulty: 'intermediate',
    emoji: '🍜',
    telexGuide: 'Cho tooi motj bat1 phowr bo1 nong1.',
    illustrationUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 's_4',
    text: 'Rất vui được gặp bạn.',
    meaning: '很高興認識你！',
    pinyin: 'Rất vui = 很高興 | được gặp = 能遇見 | bạn = 你',
    category: 'greetings',
    categoryName: '日常社交句型',
    difficulty: 'beginner',
    emoji: '🤝',
    telexGuide: 'Rat1 vui dduowcj gapj banj.',
    illustrationUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 's_5',
    text: 'Xin hỏi sân bay ở đâu?',
    meaning: '請問機場在哪裡？',
    pinyin: 'Xin hỏi = 請問 | sân bay = 機場 | ở đâu = 在哪裡',
    category: 'travel',
    categoryName: '旅遊問路句型',
    difficulty: 'intermediate',
    emoji: '🗺️',
    telexGuide: 'Xin hoir saan bay owr ddau?',
    illustrationUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 's_6',
    text: 'Cái này giá bao nhiêu tiền?',
    meaning: '這個多少錢？',
    pinyin: 'Cái này = 這個 | giá bao nhiêu = 多少價格 | tiền = 錢',
    category: 'shopping',
    categoryName: '購物詢價句型',
    difficulty: 'intermediate',
    emoji: '💵',
    telexGuide: 'Cai1 nay1 gia1 bao nhieu1 tien1?',
    illustrationUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 's_7',
    text: 'Việt Nam là một đất nước xinh đẹp.',
    meaning: '越南是一個美麗的國家。',
    pinyin: 'đất nước = 國家 | xinh đẹp = 美麗',
    category: 'travel',
    categoryName: '文化介紹句型',
    difficulty: 'advanced',
    emoji: '🇻🇳',
    telexGuide: 'Vietj Nam la1 motj ddat1 nuowc1 xinh ddepj.',
    illustrationUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 's_8',
    text: 'Chúc bạn một ngày vui vẻ!',
    meaning: '祝你有美好愉快的一天！',
    pinyin: 'Chúc = 祝福 | một ngày = 一天 | vui vẻ = 愉快',
    category: 'greetings',
    categoryName: '日常祝福句型',
    difficulty: 'beginner',
    emoji: '🎉',
    telexGuide: 'Chuc1 banj motj ngay1 vui veox!',
    illustrationUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80'
  }
];

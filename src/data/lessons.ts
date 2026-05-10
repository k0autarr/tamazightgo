export interface VocabularyItem {
  id: string;
  tamazight: string;
  tifinagh: string;
  transliteration: string;
  english: string;
  arabic?: string;
  category: string;
  exampleTamazight: string;
  exampleEnglish: string;
}

export interface DialogueLine {
  speaker: 'A' | 'B';
  speakerName: string;
  tamazight: string;
  transliteration: string;
  english: string;
}

export interface PracticeItem {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

export interface Phrase {
  tamazight: string;
  transliteration: string;
  english: string;
}

export interface Lesson {
  id: string;
  level: number;
  category: string;
  title: string;
  titleTamazight: string;
  titleTifinagh: string;
  description: string;
  culturalNote: string;
  duration: number;
  difficulty: 'beginner' | 'elementary' | 'intermediate';
  vocabulary: VocabularyItem[];
  phrases: Phrase[];
  dialogue: DialogueLine[];
  practiceItems: PracticeItem[];
}

export interface Level {
  level: number;
  name: string;
  nameAmazigh: string;
  tifinagh: string;
  color: string;
  description: string;
}

export const LEVELS: Level[] = [
  { level: 1, name: 'Basics', nameAmazigh: 'Asekked', tifinagh: 'ⴰⵙⴽⴽⴻⴷ', color: '#C8502A', description: 'Essential greetings, introductions, and first expressions' },
  { level: 2, name: 'Family', nameAmazigh: 'Tawacult', tifinagh: 'ⵜⴰⵡⴰⵛⵓⵍⵜ', color: '#1E3D72', description: 'Family members, relationships, and home vocabulary' },
  { level: 3, name: 'Daily Life', nameAmazigh: 'Ass n Wass', tifinagh: 'ⴰⵙⵙ ⵏ ⵡⴰⵙⵙ', color: '#1D5E40', description: 'Food, home, school, work, and the market' },
  { level: 4, name: 'Numbers & Time', nameAmazigh: 'Imdan d Akud', tifinagh: 'ⵉⵎⴷⴰⵏ ⴷ ⴰⴽⵓⴷ', color: '#C8920A', description: 'Count, express time, and navigate days and months' },
  { level: 5, name: 'Culture & Life', nameAmazigh: 'Tamurt n Imazighen', tifinagh: 'ⵜⴰⵎⵓⵔⵜ ⵏ ⵉⵎⴰⵣⵉⵖⴻⵏ', color: '#7B3B99', description: 'Amazigh expressions, market talks, and traditions' },
];

export const LESSONS: Lesson[] = [

  // ───────────── LEVEL 1 — BASICS ─────────────

  {
    id: 'l1-greetings',
    level: 1, category: 'Greetings',
    title: 'Greetings', titleTamazight: 'Tirmousin', titleTifinagh: 'ⵜⵉⵔⵎⵓⵙⵉⵏ',
    description: 'Learn the most essential Amazigh greetings. Every conversation starts with "Azul".',
    culturalNote: 'In Amazigh culture, greetings carry deep respect. "Azul" is used across Morocco, Algeria, and the diaspora. Taking time to greet someone properly — asking about their family, their health — is a sign of honor and warmth.',
    duration: 10, difficulty: 'beginner',
    vocabulary: [
      { id: 'v-azul', tamazight: 'Azul', tifinagh: 'ⴰⵣⵓⵍ', transliteration: 'a-ZUL', english: 'Hello', arabic: 'مرحبا', category: 'Greetings', exampleTamazight: 'Azul, mamek tllid?', exampleEnglish: 'Hello, how are you?' },
      { id: 'v-mamek', tamazight: 'Mamek tllid?', tifinagh: 'ⵎⴰⵎⴻⴽ ⵜⵍⵍⵉⴷ؟', transliteration: 'MA-mek t-LLID', english: 'How are you?', arabic: 'كيف حالك؟', category: 'Greetings', exampleTamazight: 'Mamek tllid, yma?', exampleEnglish: 'How are you, sister?' },
      { id: 'v-labas', tamazight: 'Labas', tifinagh: 'ⵍⴰⴱⴰⵙ', transliteration: 'la-BAS', english: "I'm fine / No problem", arabic: 'لا بأس', category: 'Greetings', exampleTamazight: 'Labas, tanemmirt.', exampleEnglish: "I'm fine, thank you." },
      { id: 'v-tanemmirt', tamazight: 'Tanemmirt', tifinagh: 'ⵜⴰⵏⵎⵎⵉⵔⵜ', transliteration: 'ta-nem-MIRT', english: 'Thank you', arabic: 'شكرا', category: 'Expressions', exampleTamazight: 'Tanemmirt, baba.', exampleEnglish: 'Thank you, father.' },
      { id: 'v-afak', tamazight: 'Afak', tifinagh: 'ⴰⴼⴰⴽ', transliteration: 'a-FAK', english: 'Please', arabic: 'من فضلك', category: 'Expressions', exampleTamazight: 'Aman afak.', exampleEnglish: 'Water, please.' },
      { id: 'v-artufat', tamazight: 'Ar tufat', tifinagh: 'ⴰⵔ ⵜⵓⴼⴰⵜ', transliteration: 'ar tu-FAT', english: 'Goodbye', arabic: 'مع السلامة', category: 'Greetings', exampleTamazight: 'Ar tufat, bsl-ak.', exampleEnglish: 'Goodbye, take care.' },
    ],
    phrases: [
      { tamazight: 'Azul-nwen!', transliteration: 'azul-NWEN', english: 'Hello (to a group)!' },
      { tamazight: 'Azul f ellun', transliteration: 'azul f EL-lun', english: 'Hello to everyone' },
      { tamazight: 'Labas darik?', transliteration: 'la-BAS da-RIK', english: 'Everything good with you?' },
      { tamazight: 'Ala labas, tanemmirt', transliteration: 'a-LA la-BAS', english: 'All is well, thank you' },
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Amal', tamazight: 'Azul!', transliteration: 'a-ZUL', english: 'Hello!' },
      { speaker: 'B', speakerName: 'Idir', tamazight: 'Azul! Mamek tllid?', transliteration: 'a-ZUL! MA-mek t-LLID?', english: 'Hello! How are you?' },
      { speaker: 'A', speakerName: 'Amal', tamazight: 'Labas, tanemmirt. Kinn?', transliteration: 'la-BAS, ta-nem-MIRT. KINN?', english: "I'm fine, thank you. And you?" },
      { speaker: 'B', speakerName: 'Idir', tamazight: 'Labas ala labas.', transliteration: 'la-BAS a-LA la-BAS', english: 'Fine, all is well.' },
      { speaker: 'A', speakerName: 'Amal', tamazight: 'Ar tufat!', transliteration: 'ar tu-FAT', english: 'Goodbye!' },
      { speaker: 'B', speakerName: 'Idir', tamazight: 'Ar tufat, bsl-ak.', transliteration: 'ar tu-FAT, bsl-AK', english: 'Goodbye, take care.' },
    ],
    practiceItems: [
      { id: 'p1', question: 'What does "Azul" mean?', options: ['Goodbye', 'Hello', 'Thank you', 'Please'], answer: 'Hello' },
      { id: 'p2', question: 'How do you say "I\'m fine"?', options: ['Tanemmirt', 'Afak', 'Labas', 'Mamek'], answer: 'Labas' },
      { id: 'p3', question: 'Translate: "Tanemmirt"', options: ['Hello', 'Please', 'Thank you', 'Goodbye'], answer: 'Thank you' },
      { id: 'p4', question: 'How do you say goodbye?', options: ['Azul', 'Labas', 'Ar tufat', 'Afak'], answer: 'Ar tufat' },
    ],
  },

  {
    id: 'l1-introductions',
    level: 1, category: 'Introductions',
    title: 'Introductions', titleTamazight: 'Imlaln', titleTifinagh: 'ⵉⵎⵍⴰⵍⵏ',
    description: 'Introduce yourself in Tamazight — share your name, where you\'re from, and learn to ask others.',
    culturalNote: 'Introductions in Amazigh culture often include mentioning your village or region — identity is deeply tied to place. Saying you are from the Atlas, the Souss, or the Rif immediately gives cultural context.',
    duration: 12, difficulty: 'beginner',
    vocabulary: [
      { id: 'v-isem', tamazight: 'Isem-inu', tifinagh: 'ⵉⵙⵎ ⵉⵏⵓ', transliteration: 'i-SEM i-NU', english: 'My name', arabic: 'اسمي', category: 'Identity', exampleTamazight: 'Isem-inu d Amal.', exampleEnglish: 'My name is Amal.' },
      { id: 'v-nekk', tamazight: 'Nekk', tifinagh: 'ⵏⴻⴽⴽ', transliteration: 'NEKK', english: 'I / Me', arabic: 'أنا', category: 'Pronouns', exampleTamazight: 'Nekk d Imazighen.', exampleEnglish: 'I am Amazigh.' },
      { id: 'v-kinn', tamazight: 'Kinn / Kimm', tifinagh: 'ⴽⵉⵏⵏ / ⴽⵉⵎⵎ', transliteration: 'KINN / KIMM', english: 'You (m/f)', arabic: 'أنت / أنتِ', category: 'Pronouns', exampleTamazight: 'Kinn manugh tegid?', exampleEnglish: 'You, where are you from?' },
      { id: 'v-manugh', tamazight: 'Manugh?', tifinagh: 'ⵎⴰⵏⵓⵖ؟', transliteration: 'ma-NUGH', english: 'Where (from)?', arabic: 'من أين؟', category: 'Questions', exampleTamazight: 'Manugh tegid?', exampleEnglish: 'Where are you from?' },
      { id: 'v-zeg', tamazight: 'Nekk zeg...', tifinagh: 'ⵏⴻⴽⴽ ⵣⴻⴳ', transliteration: 'NEKK ZEG', english: 'I am from...', arabic: 'أنا من...', category: 'Identity', exampleTamazight: 'Nekk zeg Ait Melloul.', exampleEnglish: 'I am from Ait Melloul.' },
      { id: 'v-manidat', tamazight: 'Mani dat tegid?', tifinagh: 'ⵎⴰⵏⵉ ⴷⴰⵜ ⵜⴻⴳⵉⴷ؟', transliteration: 'MA-ni dat te-GID', english: 'Where do you live?', arabic: 'أين تسكن؟', category: 'Questions', exampleTamazight: 'Mani dat tegid tura?', exampleEnglish: 'Where do you live now?' },
    ],
    phrases: [
      { tamazight: 'Isem-inu d...', transliteration: 'i-SEM i-NU d', english: 'My name is...' },
      { tamazight: 'Mani isem-ik?', transliteration: 'MA-ni i-SEM-ik', english: 'What is your name? (to a man)' },
      { tamazight: 'Mani isem-im?', transliteration: 'MA-ni i-SEM-im', english: 'What is your name? (to a woman)' },
      { tamazight: 'Nekk zeg tmurt n...', transliteration: 'NEKK ZEG t-MURT n', english: 'I am from the land of...' },
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Fatima', tamazight: 'Azul! Mani isem-ik?', transliteration: 'a-ZUL! MA-ni i-SEM-ik?', english: 'Hello! What is your name?' },
      { speaker: 'B', speakerName: 'Yidir', tamazight: 'Azul! Isem-inu d Yidir. Kinn?', transliteration: 'a-ZUL! i-SEM i-NU d yi-DIR. KINN?', english: 'Hello! My name is Yidir. And you?' },
      { speaker: 'A', speakerName: 'Fatima', tamazight: 'Isem-inu d Fatima. Manugh tegid?', transliteration: 'i-SEM i-NU d fa-TI-ma. ma-NUGH te-GID?', english: 'My name is Fatima. Where are you from?' },
      { speaker: 'B', speakerName: 'Yidir', tamazight: 'Nekk zeg Azilal. Kinn?', transliteration: 'NEKK ZEG a-zi-LAL. KINN?', english: 'I am from Azilal. And you?' },
      { speaker: 'A', speakerName: 'Fatima', tamazight: 'Nekk zeg Agadir. Tanemmirt!', transliteration: 'NEKK ZEG a-ga-DIR. ta-nem-MIRT!', english: 'I am from Agadir. Thank you!' },
    ],
    practiceItems: [
      { id: 'p1', question: 'How do you say "My name is"?', options: ['Manugh?', 'Isem-inu d', 'Nekk zeg', 'Kinn'], answer: 'Isem-inu d' },
      { id: 'p2', question: 'What does "Manugh tegid?" mean?', options: ['What is your name?', 'How are you?', 'Where are you from?', 'Do you speak Tamazight?'], answer: 'Where are you from?' },
      { id: 'p3', question: '"Nekk" means:', options: ['You', 'He', 'I/Me', 'We'], answer: 'I/Me' },
    ],
  },

  {
    id: 'l1-yesno',
    level: 1, category: 'Expressions',
    title: 'Yes, No & Responses', titleTamazight: 'Ih, Oho d Tirrayin', titleTifinagh: 'ⵉⵀ, ⴰⵀⴰ ⴷ ⵜⵉⵔⵔⴰⵢⵉⵏ',
    description: 'Master basic responses — yes, no, maybe, okay — essential for any conversation.',
    culturalNote: 'Directness in Amazigh speech is balanced with politeness. "Oho" (no) is often softened with a smile or a reason. Phrases like "Wakha" (okay/agreed) are used constantly in daily Moroccan Amazigh speech.',
    duration: 8, difficulty: 'beginner',
    vocabulary: [
      { id: 'v-ih', tamazight: 'Ih', tifinagh: 'ⵉⵀ', transliteration: 'IH', english: 'Yes', arabic: 'نعم', category: 'Responses', exampleTamazight: 'Ih, nekk d Imazighen.', exampleEnglish: 'Yes, I am Amazigh.' },
      { id: 'v-oho', tamazight: 'Oho', tifinagh: 'ⴰⵀⴰ', transliteration: 'O-HO', english: 'No', arabic: 'لا', category: 'Responses', exampleTamazight: 'Oho, ur ssinegh.', exampleEnglish: 'No, I don\'t know.' },
      { id: 'v-wakha', tamazight: 'Wakha', tifinagh: 'ⵡⴰⵅⴰ', transliteration: 'wa-KHA', english: 'Okay / Alright', arabic: 'حسنا', category: 'Responses', exampleTamazight: 'Wakha, ar tufat.', exampleEnglish: 'Okay, goodbye.' },
      { id: 'v-ahat', tamazight: 'Ahat', tifinagh: 'ⴰⵀⴰⵜ', transliteration: 'a-HAT', english: 'Maybe / Perhaps', arabic: 'ربما', category: 'Responses', exampleTamazight: 'Ahat ass n sin.', exampleEnglish: 'Maybe on Monday.' },
      { id: 'v-mashi', tamazight: 'Mashi', tifinagh: 'ⵎⴰⵛⵉ', transliteration: 'ma-SHI', english: 'It\'s not / Not at all', arabic: 'ليس', category: 'Responses', exampleTamazight: 'Mashi nekk.', exampleEnglish: 'It\'s not me.' },
      { id: 'v-ssinegh', tamazight: 'Ur ssinegh', tifinagh: 'ⵓⵔ ⵙⵙⵉⵏⴻⵖ', transliteration: 'ur s-si-NEGH', english: 'I don\'t know', arabic: 'لا أعرف', category: 'Responses', exampleTamazight: 'Ur ssinegh manugh.', exampleEnglish: 'I don\'t know where.' },
    ],
    phrases: [
      { tamazight: 'Ih, tanemmirt', transliteration: 'IH, ta-nem-MIRT', english: 'Yes, thank you' },
      { tamazight: 'Oho, afak', transliteration: 'O-HO, a-FAK', english: 'No, please (declining politely)' },
      { tamazight: 'Wakha, mani?', transliteration: 'wa-KHA, MA-ni?', english: 'Okay, where?' },
      { tamazight: 'Ur fhimegh', transliteration: 'ur fhi-MEGH', english: 'I don\'t understand' },
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Tafat', tamazight: 'Tsawalt Tamazight?', transliteration: 'tsa-WALT ta-ma-ZIGHT?', english: 'Do you speak Tamazight?' },
      { speaker: 'B', speakerName: 'Hamza', tamazight: 'Ih, walakin ur llin.', transliteration: 'IH, wa-LA-kin ur l-LIN', english: 'Yes, but not much.' },
      { speaker: 'A', speakerName: 'Tafat', tamazight: 'Wakha! Fhimd "azul"?', transliteration: 'wa-KHA! fhi-MD a-ZUL?', english: 'Okay! Do you understand "azul"?' },
      { speaker: 'B', speakerName: 'Hamza', tamazight: 'Ih! Azul d "hello".', transliteration: 'IH! a-ZUL d HEL-lo', english: 'Yes! Azul means "hello".' },
      { speaker: 'A', speakerName: 'Tafat', tamazight: 'Ih, mazal! Tanemmirt.', transliteration: 'IH, ma-ZAL! ta-nem-MIRT', english: 'Yes, exactly! Thank you.' },
    ],
    practiceItems: [
      { id: 'p1', question: 'How do you say "yes" in Tamazight?', options: ['Oho', 'Wakha', 'Ih', 'Ahat'], answer: 'Ih' },
      { id: 'p2', question: '"Wakha" means:', options: ['Maybe', 'Okay', 'No', 'Yes'], answer: 'Okay' },
      { id: 'p3', question: '"Ur ssinegh" means:', options: ['I understand', 'I don\'t know', 'I agree', 'I speak'], answer: 'I don\'t know' },
    ],
  },

  // ───────────── LEVEL 2 — FAMILY ─────────────

  {
    id: 'l2-family-basic',
    level: 2, category: 'Family',
    title: 'Immediate Family', titleTamazight: 'Tawacult', titleTifinagh: 'ⵜⴰⵡⴰⵛⵓⵍⵜ',
    description: 'Learn the words for your closest family members — the people at the heart of Amazigh life.',
    culturalNote: 'Family is the center of Amazigh society. The word "Tawacult" (family) comes from "awacul" — to gather together. Amazigh families traditionally lived in extended multi-generational homes, sharing everything from meals to celebrations.',
    duration: 12, difficulty: 'beginner',
    vocabulary: [
      { id: 'v-yamma', tamazight: 'Yamma', tifinagh: 'ⵢⴰⵎⵎⴰ', transliteration: 'YAM-ma', english: 'Mother', arabic: 'أمي', category: 'Family', exampleTamazight: 'Yamma-inu tsawal Tamazight.', exampleEnglish: 'My mother speaks Tamazight.' },
      { id: 'v-baba', tamazight: 'Baba', tifinagh: 'ⴱⴰⴱⴰ', transliteration: 'BA-ba', english: 'Father', arabic: 'أبي', category: 'Family', exampleTamazight: 'Baba-inu d amazigh.', exampleEnglish: 'My father is Amazigh.' },
      { id: 'v-agma', tamazight: 'Agma', tifinagh: 'ⴰⴳⵎⴰ', transliteration: 'ag-MA', english: 'My brother', arabic: 'أخي', category: 'Family', exampleTamazight: 'Agma yella g Agadir.', exampleEnglish: 'My brother is in Agadir.' },
      { id: 'v-ultma', tamazight: 'Ultma', tifinagh: 'ⵓⵍⵜⵎⴰ', transliteration: 'ult-MA', english: 'My sister', arabic: 'أختي', category: 'Family', exampleTamazight: 'Ultma d tafransist.', exampleEnglish: 'My sister speaks French.' },
      { id: 'v-argaz', tamazight: 'Argaz', tifinagh: 'ⴰⵔⴳⴰⵣ', transliteration: 'ar-GAZ', english: 'Man / Husband', arabic: 'رجل / زوج', category: 'Family', exampleTamazight: 'Argaz-inu d aselmed.', exampleEnglish: 'My husband is a teacher.' },
      { id: 'v-tamghart', tamazight: 'Tamghart', tifinagh: 'ⵜⴰⵎⴳⵔⴰⵜ', transliteration: 'tam-GHART', english: 'Woman / Wife', arabic: 'زوجة', category: 'Family', exampleTamazight: 'Tamghart-inu tsawal snat n tutlayin.', exampleEnglish: 'My wife speaks two languages.' },
    ],
    phrases: [
      { tamazight: 'Yella-yi sin n warraw.', transliteration: 'yel-LA-yi sin n war-RAW', english: 'I have two children.' },
      { tamazight: 'Tawacult-inu tennaw.', transliteration: 'ta-wa-CULT i-NU ten-NAW', english: 'My family is large.' },
      { tamazight: 'Baba d yamma llant g tigmmi.', transliteration: 'BA-ba d YAM-ma l-LANT g tig-MMI', english: 'Father and mother are at home.' },
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Malika', tamazight: 'Mani tella tawacult-ik?', transliteration: 'MA-ni tel-LA ta-wa-CULT-ik?', english: 'Where is your family?' },
      { speaker: 'B', speakerName: 'Hassan', tamazight: 'Tawacult-inu tella g Azrou.', transliteration: 'ta-wa-CULT i-NU tel-LA g az-ROU', english: 'My family is in Azrou.' },
      { speaker: 'A', speakerName: 'Malika', tamazight: 'Yella-k warraw?', transliteration: 'yel-LA-k war-RAW?', english: 'Do you have children?' },
      { speaker: 'B', speakerName: 'Hassan', tamazight: 'Ih, yella-yi yan warraw — isem-ines d Amayas.', transliteration: 'IH, yel-LA-yi yan war-RAW — i-SEM-ines d a-ma-YAS', english: 'Yes, I have one child — his name is Amayas.' },
      { speaker: 'A', speakerName: 'Malika', tamazight: 'Mazal! Tanemmirt.', transliteration: 'ma-ZAL! ta-nem-MIRT', english: 'Wonderful! Thank you.' },
    ],
    practiceItems: [
      { id: 'p1', question: '"Yamma" means:', options: ['Father', 'Sister', 'Mother', 'Wife'], answer: 'Mother' },
      { id: 'p2', question: 'How do you say "my brother"?', options: ['Ultma', 'Agma', 'Baba', 'Argaz'], answer: 'Agma' },
      { id: 'p3', question: '"Tamghart" means:', options: ['Girl', 'Sister', 'Mother', 'Woman/Wife'], answer: 'Woman/Wife' },
    ],
  },

  {
    id: 'l2-extended-family',
    level: 2, category: 'Family',
    title: 'Extended Family', titleTamazight: 'Ait Tawacult', titleTifinagh: 'ⴰⵢⵜ ⵜⴰⵡⴰⵛⵓⵍⵜ',
    description: 'Grandparents, uncles, aunts — the extended Amazigh family that gathers for celebrations.',
    culturalNote: 'Extended family ("Ait Tawacult") plays a vital role in Amazigh communities. Grandparents are deeply respected. The grandfather ("Jeddi") is often the family elder who preserves oral traditions, poetry, and proverbs.',
    duration: 12, difficulty: 'beginner',
    vocabulary: [
      { id: 'v-tajjayt', tamazight: 'Tajjayt', tifinagh: 'ⵜⴰⵊⵊⴰⵢⵜ', transliteration: 'taj-JAYT', english: 'Grandmother', arabic: 'جدتي', category: 'Family', exampleTamazight: 'Tajjayt-inu tsawal Tamazight mazal.', exampleEnglish: 'My grandmother speaks Tamazight well.' },
      { id: 'v-jiddi', tamazight: 'Jeddi', tifinagh: 'ⵊⴻⴷⴷⵉ', transliteration: 'JED-di', english: 'Grandfather', arabic: 'جدي', category: 'Family', exampleTamazight: 'Jeddi yessawal timedhulin.', exampleEnglish: 'My grandfather tells old stories.' },
      { id: 'v-3amm', tamazight: '3amm', tifinagh: 'ⵄⴰⵎⵎ', transliteration: '3AMM', english: 'Uncle (father\'s brother)', arabic: 'عم', category: 'Family', exampleTamazight: '3amm-inu yella g Marrakech.', exampleEnglish: 'My uncle is in Marrakech.' },
      { id: 'v-xalti', tamazight: 'Xalti', tifinagh: 'ⵅⴰⵍⵜⵉ', transliteration: 'xal-TI', english: 'Aunt (mother\'s sister)', arabic: 'خالتي', category: 'Family', exampleTamazight: 'Xalti-inu d tamddakult.', exampleEnglish: 'My aunt is a teacher.' },
      { id: 'v-ayt-ma', tamazight: 'Ayt-ma', tifinagh: 'ⴰⵢⵜ ⵎⴰ', transliteration: 'ayt-MA', english: 'My brothers (plural)', arabic: 'إخوتي', category: 'Family', exampleTamazight: 'Ayt-ma llan g tmurt.', exampleEnglish: 'My brothers are in the homeland.' },
      { id: 'v-warraw', tamazight: 'Warraw', tifinagh: 'ⵡⴰⵔⵔⴰⵡ', transliteration: 'war-RAW', english: 'Children', arabic: 'أطفال', category: 'Family', exampleTamazight: 'Warraw-inu llan g tmddaght.', exampleEnglish: 'My children are at school.' },
    ],
    phrases: [
      { tamazight: 'Tajjayt-inu d tamghart tameqrant.', transliteration: 'taj-JAYT i-NU d tam-GHART ta-meq-RANT', english: 'My grandmother is a wise woman.' },
      { tamazight: 'Jeddi yessawl awal n Tamazight.', transliteration: 'JED-di yes-SAWL a-WAL n ta-ma-ZIGHT', english: 'Grandfather speaks the Tamazight language.' },
      { tamazight: '3amm-inu d bab n iger.', transliteration: '3AMM i-NU d BAB n i-GER', english: 'My uncle owns a farm.' },
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Nadia', tamazight: 'Yella-k jeddi?', transliteration: 'yel-LA-k JED-di?', english: 'Do you have a grandfather?' },
      { speaker: 'B', speakerName: 'Omar', tamazight: 'Ih! Jeddi-inu yella g Ait Benhaddou.', transliteration: 'IH! JED-di i-NU yel-LA g ayt ben-HA-du', english: 'Yes! My grandfather lives in Ait Benhaddou.' },
      { speaker: 'A', speakerName: 'Nadia', tamazight: 'Isawl Tamazight?', transliteration: 'i-SAWL ta-ma-ZIGHT?', english: 'Does he speak Tamazight?' },
      { speaker: 'B', speakerName: 'Omar', tamazight: 'Ih mazal! Isawl d yessawal timedhulin n Imazighen.', transliteration: 'IH ma-ZAL! i-SAWL d yes-SAWL ti-med-HU-lin n i-ma-ZI-ghen', english: 'Yes, fluently! He speaks and tells Amazigh stories.' },
    ],
    practiceItems: [
      { id: 'p1', question: '"Tajjayt" means:', options: ['Aunt', 'Grandmother', 'Mother', 'Sister'], answer: 'Grandmother' },
      { id: 'p2', question: 'How do you say "grandfather"?', options: ['Jeddi', 'Baba', '3amm', 'Agma'], answer: 'Jeddi' },
      { id: 'p3', question: '"Warraw" means:', options: ['Family', 'Children', 'Brothers', 'Friends'], answer: 'Children' },
    ],
  },

  {
    id: 'l2-family-life',
    level: 2, category: 'Family',
    title: 'Family & Home Life', titleTamazight: 'Tudert n Tawacult', titleTifinagh: 'ⵜⵓⴷⴻⵔⵜ ⵏ ⵜⴰⵡⴰⵛⵓⵍⵜ',
    description: 'Talk about your family life, describe your relatives, and share daily moments at home.',
    culturalNote: 'The Amazigh home ("Tigmmi") is more than a building — it is the center of identity. Traditional Amazigh homes in the Atlas are built from clay and stone. Women are the guardians of the household culture.',
    duration: 14, difficulty: 'elementary',
    vocabulary: [
      { id: 'v-imqran', tamazight: 'Imqran', tifinagh: 'ⵉⵎⵇⵔⴰⵏ', transliteration: 'im-QRAN', english: 'Old / Elder', arabic: 'كبير', category: 'Descriptions', exampleTamazight: 'Jeddi imqran mazal.', exampleEnglish: 'My grandfather is very old.' },
      { id: 'v-miskin', tamazight: 'Amsskan', tifinagh: 'ⴰⵎⵙⵙⴽⴰⵏ', transliteration: 'am-SS-kan', english: 'Young', arabic: 'صغير', category: 'Descriptions', exampleTamazight: 'Warraw-inu amsskan.', exampleEnglish: 'My child is young.' },
      { id: 'v-yella', tamazight: 'Yella / Tella', tifinagh: 'ⵢⴻⵍⵍⴰ / ⵜⴻⵍⵍⴰ', transliteration: 'yel-LA / tel-LA', english: 'He/She is / lives at', arabic: 'هو/هي في', category: 'Verbs', exampleTamazight: 'Agma yella g Fes.', exampleEnglish: 'My brother is/lives in Fes.' },
      { id: 'v-iherzan', tamazight: 'Iherzan', tifinagh: 'ⵉⵀⴻⵔⵣⴰⵏ', transliteration: 'i-her-ZAN', english: 'Strong / Healthy', arabic: 'قوي / بصحة', category: 'Descriptions', exampleTamazight: 'Jeddi iherzan tura.', exampleEnglish: 'Grandfather is strong/healthy now.' },
      { id: 'v-tameqqrant', tamazight: 'Tameqqrant', tifinagh: 'ⵜⴰⵎⴻⵇⵇⵔⴰⵏⵜ', transliteration: 'ta-meq-QRANT', english: 'Great / Important', arabic: 'عظيمة', category: 'Descriptions', exampleTamazight: 'Yamma-inu d tamghart tameqqrant.', exampleEnglish: 'My mother is a great woman.' },
    ],
    phrases: [
      { tamazight: 'Tawacult-inu tferhu ad tennaw.', transliteration: 'ta-wa-CULT i-NU tfer-HU ad ten-NAW', english: 'My family is happy to be together.' },
      { tamazight: 'Nkker nkkes imensi.', transliteration: 'NK-ker nk-KES i-MEN-si', english: 'We got up and had dinner together.' },
      { tamazight: 'Ass n Ahad d ass n tawacult.', transliteration: 'ASS n a-HAD d ASS n ta-wa-CULT', english: 'Sunday is family day.' },
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Zineb', tamazight: 'Mamek tlla tawacult-im?', transliteration: 'MA-mek tl-LA ta-wa-CULT-im?', english: 'How is your family?' },
      { speaker: 'B', speakerName: 'Siham', tamazight: 'Labas, tanemmirt! Yamma-inu tferhu mazal.', transliteration: 'la-BAS, ta-nem-MIRT! YAM-ma i-NU tfer-HU ma-ZAL', english: 'Fine, thank you! My mother is very happy.' },
      { speaker: 'A', speakerName: 'Zineb', tamazight: 'Jeddi-nik yella labas?', transliteration: 'JED-di-nik yel-LA la-BAS?', english: 'Is your grandfather well?' },
      { speaker: 'B', speakerName: 'Siham', tamazight: 'Ih! Jeddi iherzan mazal.', transliteration: 'IH! JED-di i-her-ZAN ma-ZAL', english: 'Yes! Grandfather is still strong.' },
    ],
    practiceItems: [
      { id: 'p1', question: '"Yella/Tella" means:', options: ['He/she goes', 'He/she is at', 'He/she speaks', 'He/she eats'], answer: 'He/she is at' },
      { id: 'p2', question: 'How do you say "old/elder"?', options: ['Amsskan', 'Imqran', 'Iherzan', 'Tameqqrant'], answer: 'Imqran' },
    ],
  },

  // ───────────── LEVEL 3 — DAILY LIFE ─────────────

  {
    id: 'l3-food',
    level: 3, category: 'Food',
    title: 'Food & Drink', titleTamazight: 'Imekli d Wayuren', titleTifinagh: 'ⵉⵎⴻⴽⵍⵉ ⴷ ⵡⴰⵢⵓⵔⴻⵏ',
    description: 'Essential food vocabulary — from traditional Amazigh dishes to everyday staples.',
    culturalNote: 'Food is central to Amazigh hospitality. Offering food to a guest is an honor. Traditional Tamazight foods include "tafarnout" (barley flatbread), "amlou" (argan nut butter paste), and "imi n waman" (mint tea — literally "mouth of water").',
    duration: 15, difficulty: 'beginner',
    vocabulary: [
      { id: 'v-aman', tamazight: 'Aman', tifinagh: 'ⴰⵎⴰⵏ', transliteration: 'a-MAN', english: 'Water', arabic: 'ماء', category: 'Food', exampleTamazight: 'Bghigh aman afak.', exampleEnglish: 'I want water, please.' },
      { id: 'v-aghrum', tamazight: 'Aghrum', tifinagh: 'ⴰⵖⵔⵓⵎ', transliteration: 'agh-RUM', english: 'Bread', arabic: 'خبز', category: 'Food', exampleTamazight: 'Aghrum n tmazirt.', exampleEnglish: 'Village bread (homemade bread).' },
      { id: 'v-imensi', tamazight: 'Imensi', tifinagh: 'ⵉⵎⴻⵏⵙⵉ', transliteration: 'i-MEN-si', english: 'Dinner / Evening meal', arabic: 'عشاء', category: 'Food', exampleTamazight: 'Imensi d aghrum d aman.', exampleEnglish: 'Dinner is bread and water.' },
      { id: 'v-afullus', tamazight: 'Afullus', tifinagh: 'ⴰⴼⵓⵍⵍⵓⵙ', transliteration: 'a-ful-LUS', english: 'Chicken', arabic: 'دجاج', category: 'Food', exampleTamazight: 'Yamma tessaw afullus.', exampleEnglish: 'Mother cooked chicken.' },
      { id: 'v-azemmur', tamazight: 'Azemmur', tifinagh: 'ⴰⵣⴻⵎⵎⵓⵔ', transliteration: 'a-zem-MUR', english: 'Olive', arabic: 'زيتون', category: 'Food', exampleTamazight: 'Azemmur n tmurt-nnegh.', exampleEnglish: 'Olives from our land.' },
      { id: 'v-amlou', tamazight: 'Amlou', tifinagh: 'ⴰⵎⵍⵓ', transliteration: 'am-LU', english: 'Argan paste (sweet)', arabic: 'أملو', category: 'Food', exampleTamazight: 'Amlou d taḥlawt n Imazighen.', exampleEnglish: 'Amlou is an Amazigh sweet.' },
      { id: 'v-atay', tamazight: 'Atay', tifinagh: 'ⴰⵜⴰⵢ', transliteration: 'a-TAY', english: 'Mint tea', arabic: 'أتاي', category: 'Drinks', exampleTamazight: 'Atay d tiziri n Imazighen.', exampleEnglish: 'Mint tea is the light of the Amazigh.' },
    ],
    phrases: [
      { tamazight: 'Bghigh ad tchigh.', transliteration: 'bghigh ad t-CHIGH', english: 'I want to eat.' },
      { tamazight: 'Imensi yettwari.', transliteration: 'i-MEN-si yet-TWA-ri', english: 'Dinner is ready.' },
      { tamazight: 'Ur tssid?', transliteration: 'ur ts-SID?', english: 'Haven\'t you eaten?' },
      { tamazight: 'Atay d afus n wellas.', transliteration: 'a-TAY d a-FUS n wel-LAS', english: 'Tea is the hand of hospitality.' },
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Yamma', tamazight: 'Imensi yettwari! Awn-d!', transliteration: 'i-MEN-si yet-TWA-ri! AWN-d!', english: 'Dinner is ready! Come!' },
      { speaker: 'B', speakerName: 'Amayas', tamazight: 'Mazal dqiqa yamma, bghigh ad siwlagh.', transliteration: 'ma-ZAL dqi-QA YAM-ma, BGHI-gh ad si-WLAGH', english: 'One minute mom, I want to wash up.' },
      { speaker: 'A', speakerName: 'Yamma', tamazight: 'Wakha, walakin ur ttruh!', transliteration: 'wa-KHA, wa-LA-kin ur ttr-UH!', english: "Okay, but don't go away!" },
      { speaker: 'B', speakerName: 'Amayas', tamazight: 'Ih yamma. Mani tella afullus?', transliteration: 'IH YAM-ma. MA-ni tel-LA a-ful-LUS?', english: 'Yes mom. Where is the chicken?' },
      { speaker: 'A', speakerName: 'Yamma', tamazight: 'Dinna, d aghrum d azemmur.', transliteration: 'DIN-na, d agh-RUM d a-zem-MUR', english: 'There, with bread and olives.' },
    ],
    practiceItems: [
      { id: 'p1', question: '"Aman" means:', options: ['Food', 'Tea', 'Water', 'Bread'], answer: 'Water' },
      { id: 'p2', question: 'What is "Afullus"?', options: ['Olive', 'Chicken', 'Bread', 'Water'], answer: 'Chicken' },
      { id: 'p3', question: '"Atay" is:', options: ['Juice', 'Milk', 'Coffee', 'Mint tea'], answer: 'Mint tea' },
      { id: 'p4', question: '"Aghrum" means:', options: ['Bread', 'Chicken', 'Olive', 'Dinner'], answer: 'Bread' },
    ],
  },

  {
    id: 'l3-home',
    level: 3, category: 'Home',
    title: 'The Home', titleTamazight: 'Tigmmi', titleTifinagh: 'ⵜⵉⴳⵎⵎⵉ',
    description: 'Learn the rooms, objects, and vocabulary of the Amazigh home.',
    culturalNote: 'The traditional Amazigh house ("Tigmmi") is built from earth, stone, and wood — blending into the mountain landscape. The roof terrace ("taskka") is where families gather in evenings, and the ground floor often houses animals in winter.',
    duration: 12, difficulty: 'beginner',
    vocabulary: [
      { id: 'v-tigmmi', tamazight: 'Tigmmi', tifinagh: 'ⵜⵉⴳⵎⵎⵉ', transliteration: 'tig-MMI', english: 'House / Home', arabic: 'بيت', category: 'Home', exampleTamazight: 'Tigmmi-inu tella g draren.', exampleEnglish: 'My house is in the mountains.' },
      { id: 'v-tawwurt', tamazight: 'Tawwurt', tifinagh: 'ⵜⴰⵡⵡⵓⵔⵜ', transliteration: 'taw-WURT', english: 'Door', arabic: 'باب', category: 'Home', exampleTamazight: 'Tawwurt ttzegwint.', exampleEnglish: 'The door is open.' },
      { id: 'v-taskka', tamazight: 'Taskka', tifinagh: 'ⵜⴰⵙⴽⴽⴰ', transliteration: 'task-KA', english: 'Roof terrace', arabic: 'سطح', category: 'Home', exampleTamazight: 'Nkker nnwl taskka.', exampleEnglish: 'We went up to the terrace.' },
      { id: 'v-afulki', tamazight: 'Afulki', tifinagh: 'ⴰⴼⵓⵍⴽⵉ', transliteration: 'a-ful-KI', english: 'Beautiful / Good', arabic: 'جميل', category: 'Descriptions', exampleTamazight: 'Tigmmi-inu afulki.', exampleEnglish: 'My house is beautiful.' },
      { id: 'v-tazdayt', tamazight: 'Tazdayt', tifinagh: 'ⵜⴰⵣⴷⴰⵢⵜ', transliteration: 'taz-DAYT', english: 'Palm tree', arabic: 'نخلة', category: 'Nature', exampleTamazight: 'Yella yan tazdayt iger n tigmmi.', exampleEnglish: 'There is a palm tree next to the house.' },
    ],
    phrases: [
      { tamazight: 'Ugh d tigmmi-nu.', transliteration: 'UGH d tig-MMI-nu', english: 'Welcome to my home.' },
      { tamazight: 'Tawwurt ttzgwa.', transliteration: 'taw-WURT ttz-GWA', english: 'The door is open (welcome).' },
      { tamazight: 'Fkiy-d lmukan.', transliteration: 'fki-YD l-MU-kan', english: 'Please take a seat.' },
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Brahim', tamazight: 'Azul! Ugh d tigmmi-nu!', transliteration: 'a-ZUL! UGH d tig-MMI-nu!', english: 'Hello! Welcome to my home!' },
      { speaker: 'B', speakerName: 'Tiziri', tamazight: 'Tanemmirt, tigmmi-nik afulki mazal!', transliteration: 'ta-nem-MIRT, tig-MMI-nik a-ful-KI ma-ZAL!', english: 'Thank you, your house is so beautiful!' },
      { speaker: 'A', speakerName: 'Brahim', tamazight: 'Tigmmi n jeddi d yamma. Imqran walakin afulki.', transliteration: 'tig-MMI n JED-di d YAM-ma. im-QRAN wa-LA-kin a-ful-KI', english: "It's grandfather and grandmother's house. Old but beautiful." },
    ],
    practiceItems: [
      { id: 'p1', question: '"Tigmmi" means:', options: ['Market', 'School', 'House/Home', 'Mountain'], answer: 'House/Home' },
      { id: 'p2', question: '"Tawwurt" is:', options: ['Window', 'Roof', 'Door', 'Garden'], answer: 'Door' },
    ],
  },

  {
    id: 'l3-market',
    level: 3, category: 'Market',
    title: 'At the Market', titleTamazight: 'Assuq', titleTifinagh: 'ⴰⵙⵙⵓⵇ',
    description: 'Navigate the souk — buy, sell, ask prices, and haggle in Tamazight.',
    culturalNote: 'The weekly "souk" (market) is central to Amazigh village life. Every region has its market day. People travel from surrounding mountains to trade goods, meet family, and exchange news. The souk is as much a social event as a commercial one.',
    duration: 18, difficulty: 'elementary',
    vocabulary: [
      { id: 'v-assuq', tamazight: 'Assuq', tifinagh: 'ⴰⵙⵙⵓⵇ', transliteration: 'as-SUQ', english: 'Market / Souk', arabic: 'السوق', category: 'Market', exampleTamazight: 'Nekk ra dmurugh assuq.', exampleEnglish: 'I will go to the market.' },
      { id: 'v-mnik', tamazight: 'Mnik iga?', tifinagh: 'ⵎⵏⵉⴽ ⵉⴳⴰ؟', transliteration: 'mnik i-GA?', english: 'How much is it?', arabic: 'بكم؟', category: 'Market', exampleTamazight: 'Mnik iga afullus?', exampleEnglish: 'How much is the chicken?' },
      { id: 'v-ssmer', tamazight: 'Ssmer', tifinagh: 'ⵙⵙⵎⴻⵔ', transliteration: 'ss-MER', english: 'Price / Cost', arabic: 'ثمن', category: 'Market', exampleTamazight: 'Ssmer-is iga mnik?', exampleEnglish: 'What is its price?' },
      { id: 'v-aksum', tamazight: 'Aksum', tifinagh: 'ⴰⴽⵙⵓⵎ', transliteration: 'ak-SUM', english: 'Meat', arabic: 'لحم', category: 'Market', exampleTamazight: 'Aksum n ulli.', exampleEnglish: 'Sheep meat.' },
      { id: 'v-tafacht', tamazight: 'Tafacht', tifinagh: 'ⵜⴰⴼⴰⵛⵜ', transliteration: 'ta-FACHT', english: 'Apple', arabic: 'تفاحة', category: 'Market', exampleTamazight: 'Tafacht n draren.', exampleEnglish: 'Mountain apple.' },
      { id: 'v-bghigh', tamazight: 'Bghigh', tifinagh: 'ⴱⵖⵉⵖ', transliteration: 'BGHIGH', english: 'I want', arabic: 'أريد', category: 'Verbs', exampleTamazight: 'Bghigh aghrum d azemmur.', exampleEnglish: 'I want bread and olives.' },
    ],
    phrases: [
      { tamazight: 'Mnik iga wad?', transliteration: 'mnik i-GA wad?', english: 'How much is this?' },
      { tamazight: 'Smmer-it afak!', transliteration: 'sm-MER it a-FAK!', english: 'Reduce it please!' },
      { tamazight: 'Iga galyan!', transliteration: 'i-GA gal-YAN!', english: 'It\'s too expensive!' },
      { tamazight: 'Fkiy-d ssin.', transliteration: 'fki-YD SSIN', english: 'Give me two (of them).' },
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Hamid', tamazight: 'Azul! Mnik iga afullus-agi?', transliteration: 'a-ZUL! mnik i-GA a-ful-LUS a-gi?', english: 'Hello! How much is this chicken?' },
      { speaker: 'B', speakerName: 'Vendor', tamazight: 'Azul! Iga miya d rbayin.', transliteration: 'a-ZUL! i-GA MI-ya d rba-YIN', english: 'Hello! It is 140 dirhams.' },
      { speaker: 'A', speakerName: 'Hamid', tamazight: 'Iga galyan! Smmer-it afak!', transliteration: 'i-GA gal-YAN! sm-MER it a-FAK!', english: "It's expensive! Reduce it please!" },
      { speaker: 'B', speakerName: 'Vendor', tamazight: 'Wakha, miya d tin. Hak!', transliteration: 'wa-KHA, MI-ya d TIN. HAK!', english: 'Okay, 110. Here you go!' },
      { speaker: 'A', speakerName: 'Hamid', tamazight: 'Tanemmirt! Ar tufat.', transliteration: 'ta-nem-MIRT! ar tu-FAT', english: 'Thank you! Goodbye.' },
    ],
    practiceItems: [
      { id: 'p1', question: 'How do you ask "How much is it?"', options: ['Manugh?', 'Mnik iga?', 'Mamek?', 'Mani?'], answer: 'Mnik iga?' },
      { id: 'p2', question: '"Bghigh" means:', options: ['I have', 'I want', 'I buy', 'I sell'], answer: 'I want' },
      { id: 'p3', question: '"Aksum" is:', options: ['Chicken', 'Bread', 'Meat', 'Fish'], answer: 'Meat' },
    ],
  },

  {
    id: 'l3-school-work',
    level: 3, category: 'School & Work',
    title: 'School & Work', titleTamazight: 'Tamddaght d Amahad', titleTifinagh: 'ⵜⴰⵎⴷⴷⴰⵖⵜ ⴷ ⴰⵎⴰⵀⴰⴷ',
    description: 'Talk about where you study or work, and describe your daily activities.',
    culturalNote: 'Tamazight is now officially taught in Moroccan schools following constitutional recognition in 2011. The IRCAM (Royal Institute of Amazigh Culture) develops teaching materials. Many Amazigh children grow up speaking Tamazight at home and learning Arabic and French at school.',
    duration: 14, difficulty: 'elementary',
    vocabulary: [
      { id: 'v-tamddaght', tamazight: 'Tamddaght', tifinagh: 'ⵜⴰⵎⴷⴷⴰⵖⵜ', transliteration: 'tam-DDAGHT', english: 'School', arabic: 'مدرسة', category: 'Education', exampleTamazight: 'Nekk ttazmad g tmddaght.', exampleEnglish: 'I study at school.' },
      { id: 'v-aselmed', tamazight: 'Aselmed', tifinagh: 'ⴰⵙⴻⵍⵎⴻⴷ', transliteration: 'a-sel-MED', english: 'Teacher (m)', arabic: 'أستاذ', category: 'Education', exampleTamazight: 'Aselmed-inu isawl Tamazight.', exampleEnglish: 'My teacher speaks Tamazight.' },
      { id: 'v-anelmad', tamazight: 'Anelmad', tifinagh: 'ⴰⵏⴻⵍⵎⴰⴷ', transliteration: 'a-nel-MAD', english: 'Student (m)', arabic: 'تلميذ', category: 'Education', exampleTamazight: 'Nekk d anelmad.', exampleEnglish: 'I am a student.' },
      { id: 'v-amahad', tamazight: 'Amahad', tifinagh: 'ⴰⵎⴰⵀⴰⴷ', transliteration: 'a-ma-HAD', english: 'Work / Job', arabic: 'عمل', category: 'Work', exampleTamazight: 'Amahad-inu d aselmed.', exampleEnglish: 'My job is teaching.' },
      { id: 'v-ttazmad', tamazight: 'Ttazmad', tifinagh: 'ⵜⵜⴰⵣⵎⴰⴷ', transliteration: 'tta-ZMAD', english: 'I study / I learn', arabic: 'أدرس', category: 'Verbs', exampleTamazight: 'Ttazmad Tamazight tura.', exampleEnglish: 'I am learning Tamazight now.' },
    ],
    phrases: [
      { tamazight: 'Nekk ttazmad Tamazight.', transliteration: 'NEKK tta-ZMAD ta-ma-ZIGHT', english: 'I am learning Tamazight.' },
      { tamazight: 'Amahad-inu d aselmed.', transliteration: 'a-ma-HAD i-NU d a-sel-MED', english: 'My job is being a teacher.' },
      { tamazight: 'Tamddaght tella iqlan.', transliteration: 'tam-DDAGHT tel-LA iq-LAN', english: 'The school is nearby.' },
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Sara', tamazight: 'Mani ttamahaddid?', transliteration: 'MA-ni tta-ma-HAD-did?', english: 'Where do you work?' },
      { speaker: 'B', speakerName: 'Youssef', tamazight: 'Ttamahaddigh g tmddaght.', transliteration: 'tta-ma-HAD-digh g tm-DDAGHT', english: 'I work at school.' },
      { speaker: 'A', speakerName: 'Sara', tamazight: 'D aselmed?', transliteration: 'd a-sel-MED?', english: 'As a teacher?' },
      { speaker: 'B', speakerName: 'Youssef', tamazight: 'Ih! Sselmadagh Tamazight d Tifinagh.', transliteration: 'IH! ss-el-MAD-agh ta-ma-ZIGHT d ti-fi-NAGH', english: 'Yes! I teach Tamazight and Tifinagh script.' },
    ],
    practiceItems: [
      { id: 'p1', question: '"Tamddaght" means:', options: ['Market', 'School', 'House', 'Work'], answer: 'School' },
      { id: 'p2', question: '"Anelmad" is:', options: ['Teacher', 'Student', 'Principal', 'Doctor'], answer: 'Student' },
    ],
  },

  // ───────────── LEVEL 4 — NUMBERS & TIME ─────────────

  {
    id: 'l4-numbers',
    level: 4, category: 'Numbers',
    title: 'Numbers 1–20', titleTamazight: 'Imdan 1-20', titleTifinagh: 'ⵉⵎⴷⴰⵏ',
    description: 'Count in Tamazight — from one to twenty and beyond.',
    culturalNote: 'Amazigh numbers are ancient and unique. The counting system reflects the deep mathematical knowledge of the Amazigh — who built complex agricultural irrigation systems across the Sahara and Atlas millennia ago.',
    duration: 15, difficulty: 'beginner',
    vocabulary: [
      { id: 'v-yan', tamazight: 'Yan / Yat', tifinagh: 'ⵢⴰⵏ / ⵢⴰⵜ', transliteration: 'YAN / YAT', english: '1 (m/f)', arabic: '١', category: 'Numbers', exampleTamazight: 'Yan warraw.', exampleEnglish: 'One child.' },
      { id: 'v-sin', tamazight: 'Sin / Snat', tifinagh: 'ⵙⵉⵏ / ⵙⵏⴰⵜ', transliteration: 'SIN / SNAT', english: '2 (m/f)', arabic: '٢', category: 'Numbers', exampleTamazight: 'Sin n wussan.', exampleEnglish: 'Two days.' },
      { id: 'v-krad', tamazight: 'Krad', tifinagh: 'ⴽⵔⴰⴷ', transliteration: 'KRAD', english: '3', arabic: '٣', category: 'Numbers', exampleTamazight: 'Krad n warraw.', exampleEnglish: 'Three children.' },
      { id: 'v-kkuz', tamazight: 'Kkuz', tifinagh: 'ⴽⴽⵓⵣ', transliteration: 'KKUZ', english: '4', arabic: '٤', category: 'Numbers', exampleTamazight: 'Kkuz n wussan.', exampleEnglish: 'Four days.' },
      { id: 'v-smmus', tamazight: 'Smmus', tifinagh: 'ⵙⵎⵎⵓⵙ', transliteration: 'SMMUS', english: '5', arabic: '٥', category: 'Numbers', exampleTamazight: 'Smmus n iseggwassen.', exampleEnglish: 'Five years.' },
      { id: 'v-sdis', tamazight: 'Sdis', tifinagh: 'ⵙⴷⵉⵙ', transliteration: 'SDIS', english: '6', arabic: '٦', category: 'Numbers', exampleTamazight: 'Sdis n wayyuren.', exampleEnglish: 'Six months.' },
      { id: 'v-sa', tamazight: 'Sa', tifinagh: 'ⵙⴰ', transliteration: 'SA', english: '7', arabic: '٧', category: 'Numbers', exampleTamazight: 'Sa n wussan g imayla.', exampleEnglish: 'Seven days a week.' },
      { id: 'v-tam', tamazight: 'Tam', tifinagh: 'ⵜⴰⵎ', transliteration: 'TAM', english: '8', arabic: '٨', category: 'Numbers', exampleTamazight: 'Tam n wussan.', exampleEnglish: 'Eight days.' },
      { id: 'v-tza', tamazight: 'Tza', tifinagh: 'ⵜⵣⴰ', transliteration: 'TZA', english: '9', arabic: '٩', category: 'Numbers', exampleTamazight: 'Tza n warraw.', exampleEnglish: 'Nine children.' },
      { id: 'v-mraw', tamazight: 'Mraw', tifinagh: 'ⵎⵔⴰⵡ', transliteration: 'MRAW', english: '10', arabic: '١٠', category: 'Numbers', exampleTamazight: 'Mraw n iseggwassen.', exampleEnglish: 'Ten years.' },
    ],
    phrases: [
      { tamazight: 'Yan, sin, krad...', transliteration: 'YAN, SIN, KRAD', english: 'One, two, three...' },
      { tamazight: 'Smmus d mraw.', transliteration: 'SMMUS d MRAW', english: 'Fifteen.' },
      { tamazight: 'Sin n mraw.', transliteration: 'SIN n MRAW', english: 'Twenty.' },
      { tamazight: 'Yella-yi mraw d krad n iseggwassen.', transliteration: 'yel-LA-yi MRAW d KRAD n i-seg-WAS-sen', english: 'I am 13 years old.' },
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Child', tamazight: 'Jeddi, ssin-iyi ad nussan!', transliteration: 'JED-di, ssin-i-YI ad nu-SSAN!', english: 'Grandfather, teach me to count!' },
      { speaker: 'B', speakerName: 'Jeddi', tamazight: 'Wakha! Kker: yan, sin, krad...', transliteration: 'wa-KHA! kk-ER: YAN, SIN, KRAD...', english: "Okay! Start: one, two, three..." },
      { speaker: 'A', speakerName: 'Child', tamazight: 'Kkuz, smmus, sdis, sa, tam, tza, mraw!', transliteration: 'KK-UZ, SM-MUS, SDIS, SA, TAM, TZA, MRAW!', english: 'Four, five, six, seven, eight, nine, ten!' },
      { speaker: 'B', speakerName: 'Jeddi', tamazight: 'Mazal, arraw-inu!', transliteration: 'ma-ZAL, ar-RAW i-NU!', english: 'Excellent, my child!' },
    ],
    practiceItems: [
      { id: 'p1', question: 'How do you say "3" in Tamazight?', options: ['Sin', 'Krad', 'Kkuz', 'Smmus'], answer: 'Krad' },
      { id: 'p2', question: '"Mraw" means:', options: ['5', '7', '10', '20'], answer: '10' },
      { id: 'p3', question: 'What is "Smmus"?', options: ['4', '5', '6', '7'], answer: '5' },
      { id: 'p4', question: '"Sin" means:', options: ['1', '2', '3', '4'], answer: '2' },
    ],
  },

  {
    id: 'l4-days',
    level: 4, category: 'Time',
    title: 'Days & Months', titleTamazight: 'Wussan d Wayyuren', titleTifinagh: 'ⵡⵓⵙⵙⴰⵏ ⴷ ⵡⴰⵢⵢⵓⵔⴻⵏ',
    description: 'Navigate time in Tamazight — the days of the week and months of the year.',
    culturalNote: 'The Amazigh calendar ("Innayr") is ancient — it predates the Islamic calendar by millennia. January 13th is celebrated as the Amazigh New Year ("Innayr") across Morocco, Algeria, and the diaspora.',
    duration: 14, difficulty: 'elementary',
    vocabulary: [
      { id: 'v-ass', tamazight: 'Ass', tifinagh: 'ⴰⵙⵙ', transliteration: 'ASS', english: 'Day', arabic: 'يوم', category: 'Time', exampleTamazight: 'Ass n Asamas d ass n nnwi.', exampleEnglish: 'Saturday is a day of rest.' },
      { id: 'v-ahad', tamazight: 'Ahad', tifinagh: 'ⴰⵀⴰⴷ', transliteration: 'a-HAD', english: 'Sunday', arabic: 'الأحد', category: 'Days', exampleTamazight: 'Ass n Ahad d ass n tawacult.', exampleEnglish: 'Sunday is family day.' },
      { id: 'v-itnin', tamazight: 'Itnin', tifinagh: 'ⵉⵜⵏⵉⵏ', transliteration: 'it-NIN', english: 'Monday', arabic: 'الاثنين', category: 'Days', exampleTamazight: 'Ttmashkadagh ass n Itnin.', exampleEnglish: 'I work on Monday.' },
      { id: 'v-asim', tamazight: 'Asim', tifinagh: 'ⴰⵙⵉⵎ', transliteration: 'a-SIM', english: 'Friday', arabic: 'الجمعة', category: 'Days', exampleTamazight: 'Asim d ass n sslukat.', exampleEnglish: 'Friday is the prayer day.' },
      { id: 'v-asamas', tamazight: 'Asamas', tifinagh: 'ⴰⵙⴰⵎⴰⵙ', transliteration: 'a-SA-mas', english: 'Saturday', arabic: 'السبت', category: 'Days', exampleTamazight: 'Ass n Asamas, assuq.', exampleEnglish: 'On Saturday, the market.' },
      { id: 'v-innayr', tamazight: 'Innayr', tifinagh: 'ⵉⵏⵏⴰⵢⵔ', transliteration: 'in-NAYR', english: 'January / Amazigh New Year', arabic: 'يناير', category: 'Months', exampleTamazight: 'Innayr d asegwas amaynu n Imazighen.', exampleEnglish: 'Innayr is the Amazigh New Year.' },
    ],
    phrases: [
      { tamazight: 'Ass n manugh?', transliteration: 'ASS n ma-NUGH?', english: 'What day is it?' },
      { tamazight: 'Tura d ass n Itnin.', transliteration: 'tu-RA d ASS n it-NIN', english: 'Today is Monday.' },
      { tamazight: 'Azekka d ass n Talata.', transliteration: 'a-ZEK-ka d ASS n ta-LA-ta', english: 'Tomorrow is Tuesday.' },
      { tamazight: 'Isduh asegwas amaynu!', transliteration: 'is-DUH a-SEG-was a-MAY-nu!', english: 'Happy New Year!' },
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Nabil', tamazight: 'Ass n manugh tura?', transliteration: 'ASS n ma-NUGH tu-RA?', english: 'What day is it today?' },
      { speaker: 'B', speakerName: 'Latifa', tamazight: 'Tura d ass n Arba3.', transliteration: 'tu-RA d ASS n ar-BA3', english: 'Today is Wednesday.' },
      { speaker: 'A', speakerName: 'Nabil', tamazight: 'Amayn assuq?', transliteration: 'a-MAYN as-SUQ?', english: 'When is the market?' },
      { speaker: 'B', speakerName: 'Latifa', tamazight: 'Assuq d ass n Asamas.', transliteration: 'as-SUQ d ASS n a-SA-mas', english: 'The market is on Saturday.' },
    ],
    practiceItems: [
      { id: 'p1', question: '"Ahad" means:', options: ['Monday', 'Friday', 'Sunday', 'Saturday'], answer: 'Sunday' },
      { id: 'p2', question: 'How do you say "Today is..."?', options: ['Azekka d...', 'Tura d...', 'Ass n...', 'Imayla d...'], answer: 'Tura d...' },
      { id: 'p3', question: 'What is "Innayr"?', options: ['A month', 'Amazigh New Year', 'A day', 'A season'], answer: 'Amazigh New Year' },
    ],
  },

  {
    id: 'l4-time',
    level: 4, category: 'Time',
    title: 'Time Expressions', titleTamazight: 'Imeslayen n Wakud', titleTifinagh: 'ⵉⵎⴻⵙⵍⴰⵢⴻⵏ ⵏ ⵡⴰⴽⵓⴷ',
    description: 'Express time naturally — now, before, after, morning, evening.',
    culturalNote: 'Amazigh sense of time is often connected to nature — the sun, moon, and agricultural seasons. "Tafukt" (the sun) is both the word for sun and for the concept of daytime. Time is fluid and relational in traditional Amazigh culture.',
    duration: 12, difficulty: 'elementary',
    vocabulary: [
      { id: 'v-tura', tamazight: 'Tura', tifinagh: 'ⵜⵓⵔⴰ', transliteration: 'tu-RA', english: 'Now', arabic: 'الآن', category: 'Time', exampleTamazight: 'Tura ttazmadigh.', exampleEnglish: 'I am learning now.' },
      { id: 'v-azekka', tamazight: 'Azekka', tifinagh: 'ⴰⵣⴻⴽⴽⴰ', transliteration: 'a-ZEK-ka', english: 'Tomorrow', arabic: 'غدا', category: 'Time', exampleTamazight: 'Azekka ra dmurugh assuq.', exampleEnglish: 'Tomorrow I will go to the market.' },
      { id: 'v-idhelli', tamazight: 'Idhelli', tifinagh: 'ⵉⴷⵀⴻⵍⵍⵉ', transliteration: 'id-HEL-li', english: 'Yesterday', arabic: 'أمس', category: 'Time', exampleTamazight: 'Idhelli ughigh d tigmmi.', exampleEnglish: 'Yesterday I came home.' },
      { id: 'v-tazwara', tamazight: 'Tazwara', tifinagh: 'ⵜⴰⵣⵡⴰⵔⴰ', transliteration: 'taz-WA-ra', english: 'Morning / Beginning', arabic: 'الصباح', category: 'Time', exampleTamazight: 'Tazwara, sekker nekker.', exampleEnglish: 'In the morning, we wake up.' },
      { id: 'v-tafukt', tamazight: 'Tafukt', tifinagh: 'ⵜⴰⴼⵓⴽⵜ', transliteration: 'ta-FUKT', english: 'Sun / Daytime', arabic: 'الشمس', category: 'Nature', exampleTamazight: 'Tafukt tettu g idurar.', exampleEnglish: 'The sun sets over the mountains.' },
    ],
    phrases: [
      { tamazight: 'Manis tella tafukt?', transliteration: 'ma-NIS tel-LA ta-FUKT?', english: 'Where is the sun? (what time is it roughly?)' },
      { tamazight: 'Tazwara n wass.', transliteration: 'taz-WA-ra n WASS', english: 'Early morning.' },
      { tamazight: 'Azekka insha-llah.', transliteration: 'a-ZEK-ka in-sha-LAH', english: 'Tomorrow, God willing.' },
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Aicha', tamazight: 'Mani tegid tura?', transliteration: 'MA-ni te-GID tu-RA?', english: 'Where are you going now?' },
      { speaker: 'B', speakerName: 'Moha', tamazight: 'Dmurough assuq. Azekka ra ddrugh.', transliteration: 'dmu-ROUGH as-SUQ. a-ZEK-ka ra d-DRUGH', english: 'I am going to the market. I will return tomorrow.' },
      { speaker: 'A', speakerName: 'Aicha', tamazight: 'Wakha. Ar tufat!', transliteration: 'wa-KHA. ar tu-FAT!', english: 'Okay. Goodbye!' },
    ],
    practiceItems: [
      { id: 'p1', question: '"Tura" means:', options: ['Yesterday', 'Tomorrow', 'Now', 'Later'], answer: 'Now' },
      { id: 'p2', question: 'How do you say "tomorrow"?', options: ['Idhelli', 'Azekka', 'Tura', 'Tazwara'], answer: 'Azekka' },
      { id: 'p3', question: '"Tafukt" means:', options: ['Moon', 'Star', 'Sun/Daytime', 'Night'], answer: 'Sun/Daytime' },
    ],
  },

  // ───────────── LEVEL 5 — CULTURE & LIFE ─────────────

  {
    id: 'l5-expressions',
    level: 5, category: 'Culture',
    title: 'Amazigh Expressions', titleTamazight: 'Imeslayen n Imazighen', titleTifinagh: 'ⵉⵎⴻⵙⵍⴰⵢⴻⵏ ⵏ ⵉⵎⴰⵣⵉⵖⴻⵏ',
    description: 'Learn authentic Amazigh proverbs, idioms, and expressions that reveal the Amazigh philosophy of life.',
    culturalNote: 'Amazigh oral literature is rich with proverbs ("imttawen"). These short phrases carry centuries of wisdom about life, family, hospitality, and nature. Learning them gives you a window into the Amazigh worldview.',
    duration: 20, difficulty: 'intermediate',
    vocabulary: [
      { id: 'v-awal', tamazight: 'Awal', tifinagh: 'ⴰⵡⴰⵍ', transliteration: 'a-WAL', english: 'Word / Language / Promise', arabic: 'كلمة', category: 'Culture', exampleTamazight: 'Awal n wergaz d taghanimt.', exampleEnglish: 'A man\'s word is his bond.' },
      { id: 'v-tiziri', tamazight: 'Tiziri', tifinagh: 'ⵜⵉⵣⵉⵔⵉ', transliteration: 'ti-ZI-ri', english: 'Moonlight / Clarity', arabic: 'ضوء القمر', category: 'Nature/Metaphor', exampleTamazight: 'Tiziri n Tamazight.', exampleEnglish: 'The light of Tamazight.' },
      { id: 'v-tamurt', tamazight: 'Tamurt', tifinagh: 'ⵜⴰⵎⵓⵔⵜ', transliteration: 'ta-MURT', english: 'Land / Homeland / Earth', arabic: 'الأرض / الوطن', category: 'Culture', exampleTamazight: 'Tamurt n Imazighen.', exampleEnglish: 'The land of the Amazigh.' },
      { id: 'v-timanit', tamazight: 'Timanit', tifinagh: 'ⵜⵉⵎⴰⵏⵉⵜ', transliteration: 'ti-MA-nit', english: 'Identity / Dignity', arabic: 'الهوية / الكرامة', category: 'Culture', exampleTamazight: 'Timanit n Imazighen ur ttmallalt.', exampleEnglish: 'The Amazigh identity is not forgotten.' },
      { id: 'v-imazighen', tamazight: 'Imazighen', tifinagh: 'ⵉⵎⴰⵣⵉⵖⴻⵏ', transliteration: 'i-ma-ZI-ghen', english: 'Free people (plural of Amazigh)', arabic: 'الأمازيغ', category: 'Culture', exampleTamazight: 'Imazighen d akal n Ummazigh.', exampleEnglish: 'The Amazigh are the people of the ancient land.' },
    ],
    phrases: [
      { tamazight: 'Awal n wergaz d taghanimt.', transliteration: 'a-WAL n wer-GAZ d ta-gha-NIMT', english: 'A man\'s word is his bond. (Proverb)' },
      { tamazight: 'Ur telli tmurt, ur yelli wawal.', transliteration: 'ur tel-LI t-MURT, ur yel-LI wa-WAL', english: 'Without land, there is no language. (Proverb)' },
      { tamazight: 'Amazigh — yella, yella, ra yili.', transliteration: 'a-MA-zigh — yel-LA, yel-LA, ra yi-LI', english: 'Amazigh — was, is, will be. (Identity chant)' },
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Young Learner', tamazight: 'Jeddi, ma d "Imazighen"?', transliteration: 'JED-di, ma d i-ma-ZI-ghen?', english: 'Grandfather, what are "Imazighen"?' },
      { speaker: 'B', speakerName: 'Jeddi', tamazight: 'Imazighen yessent "aytma n tmazirt". Nutni d imdanen n tazuri.', transliteration: 'i-ma-ZI-ghen yes-SENT "ayt-MA n t-MA-zirt". nut-NI d im-DA-nen n ta-ZU-ri', english: '"Imazighen" means "free children of the land". They are the people of ancient civilization.' },
      { speaker: 'A', speakerName: 'Young Learner', tamazight: 'Mazal! D nkk d Amazigh?', transliteration: 'ma-ZAL! d NKK d a-MA-zigh?', english: 'Amazing! Am I also Amazigh?' },
      { speaker: 'B', speakerName: 'Jeddi', tamazight: 'Ih, arraw-inu. Tamurt-nnegh d tamurt n Imazighen. Ttsawed awal-nnegh.', transliteration: 'IH, ar-RAW i-NU. ta-MURT n-NEGH d ta-MURT n i-ma-ZI-ghen. tts-AWED a-WAL n-NEGH', english: 'Yes, my child. Our land is the Amazigh land. Preserve our language.' },
    ],
    practiceItems: [
      { id: 'p1', question: '"Tamurt" means:', options: ['Mountain', 'Land/Homeland', 'River', 'Village'], answer: 'Land/Homeland' },
      { id: 'p2', question: 'What does "Imazighen" literally mean?', options: ['Mountain people', 'Desert people', 'Free people', 'Ancient people'], answer: 'Free people' },
      { id: 'p3', question: '"Timanit" refers to:', options: ['Family', 'Identity/Dignity', 'Language', 'Culture'], answer: 'Identity/Dignity' },
    ],
  },

  {
    id: 'l5-market-conversation',
    level: 5, category: 'Conversation',
    title: 'A Day at the Market', titleTamazight: 'Ass n Assuq', titleTifinagh: 'ⴰⵙⵙ ⵏ ⴰⵙⵙⵓⵇ',
    description: 'A full market conversation — buying, asking prices, haggling, and saying goodbye.',
    culturalNote: 'The souk is theatre. Sellers call out their goods, buyers inspect and negotiate. Tea is sometimes shared as part of the transaction. Never refuse the first price without at least one counter-offer — it is part of the dance.',
    duration: 20, difficulty: 'intermediate',
    vocabulary: [
      { id: 'v-ugh-d', tamazight: 'Ugh-d!', tifinagh: 'ⵓⵖ ⴷ!', transliteration: 'UGH-d', english: 'Come! / Here! (to come closer)', arabic: 'تعال!', category: 'Market', exampleTamazight: 'Ugh-d, ẓr imekli-agi!', exampleEnglish: 'Come, look at this food!' },
      { id: 'v-hak', tamazight: 'Hak!', tifinagh: 'ⵀⴰⴽ!', transliteration: 'HAK', english: 'Here you go! / Take it!', arabic: 'خذ!', category: 'Market', exampleTamazight: 'Hak, aghrum n tmazirt.', exampleEnglish: 'Here, village bread.' },
      { id: 'v-galyan', tamazight: 'Galyan', tifinagh: 'ⴳⴰⵍⵢⴰⵏ', transliteration: 'gal-YAN', english: 'Expensive', arabic: 'غالي', category: 'Market', exampleTamazight: 'Iga galyan mazal!', exampleEnglish: 'It is very expensive!' },
      { id: 'v-rkhis', tamazight: 'Rkhis', tifinagh: 'ⵔⵅⵉⵙ', transliteration: 'r-KHIS', english: 'Cheap', arabic: 'رخيص', category: 'Market', exampleTamazight: 'Rkhis d afulki!', exampleEnglish: 'Cheap and good!' },
    ],
    phrases: [
      { tamazight: 'Mnik igant tifachtin?', transliteration: 'mnik i-GANT ti-FACH-tin?', english: 'How much are the apples?' },
      { tamazight: 'Smmer afak, d ameddakul.', transliteration: 'sm-MER a-FAK, d a-med-DA-kul', english: 'Reduce it please, as a friend.' },
      { tamazight: 'Wakha, ad yak.', transliteration: 'wa-KHA, ad YAK', english: 'Okay, I\'ll take it.' },
      { tamazight: 'Tanemmirt, bsl-ak.', transliteration: 'ta-nem-MIRT, bsl-AK', english: 'Thank you, take care.' },
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Seller', tamazight: 'Ugh-d! Tifachtin n draren! Afulki d rkhis!', transliteration: 'UGH-d! ti-FACH-tin n dra-REN! a-ful-KI d r-KHIS!', english: 'Come! Mountain apples! Good and cheap!' },
      { speaker: 'B', speakerName: 'Buyer', tamazight: 'Azul! Mnik igant tifachtin-agi?', transliteration: 'a-ZUL! mnik i-GANT ti-FACH-tin a-GI?', english: 'Hello! How much are these apples?' },
      { speaker: 'A', speakerName: 'Seller', tamazight: 'Iga smmus n mraw i kilu.', transliteration: 'i-GA SMMUS n MRAW i KI-lu', english: 'It is 50 per kilo.' },
      { speaker: 'B', speakerName: 'Buyer', tamazight: 'Iga galyan! Kkuz d mraw?', transliteration: 'i-GA gal-YAN! KK-UZ d MRAW?', english: 'Expensive! How about 40?' },
      { speaker: 'A', speakerName: 'Seller', tamazight: 'Wakha! Kkuz d mraw d krad. D ameddakul!', transliteration: 'wa-KHA! KK-UZ d MRAW d KRAD. d a-med-DA-kul!', english: 'Okay! 43 dirhams. As a friend!' },
      { speaker: 'B', speakerName: 'Buyer', tamazight: 'Wakha, ad yak sin n kilu. Hak.', transliteration: 'wa-KHA, ad YAK SIN n KI-lu. HAK', english: "Okay, I'll take two kilos. Here." },
      { speaker: 'A', speakerName: 'Seller', tamazight: 'Tanemmirt! Ar tufat!', transliteration: 'ta-nem-MIRT! ar tu-FAT!', english: 'Thank you! Goodbye!' },
    ],
    practiceItems: [
      { id: 'p1', question: '"Galyan" means:', options: ['Cheap', 'Good', 'Expensive', 'Bad'], answer: 'Expensive' },
      { id: 'p2', question: '"Hak!" means:', options: ['Come!', 'Here you go!', 'No!', 'Thank you!'], answer: 'Here you go!' },
    ],
  },

  {
    id: 'l5-family-gathering',
    level: 5, category: 'Conversation',
    title: 'Family Gathering', titleTamazight: 'Tajmaat n Tawacult', titleTifinagh: 'ⵜⴰⵊⵎⴰⴰⵜ ⵏ ⵜⴰⵡⴰⵛⵓⵍⵜ',
    description: 'Navigate a family celebration — greetings, asking after relatives, sharing food, and heartfelt conversation.',
    culturalNote: 'Family gatherings ("tajmaat n tawacult") are joyful and central to Amazigh life. They mark births, weddings, Eid, the new year, and harvests. Food is shared from one large communal dish — eating together is a sacred act of unity.',
    duration: 22, difficulty: 'intermediate',
    vocabulary: [
      { id: 'v-tferhu', tamazight: 'Tferhu', tifinagh: 'ⵜⴼⴻⵔⵀⵓ', transliteration: 't-FER-hu', english: 'Happy / Joyful', arabic: 'سعيد', category: 'Emotions', exampleTamazight: 'Tawacult-inu tferhu mazal.', exampleEnglish: 'My family is very happy.' },
      { id: 'v-tajmaat', tamazight: 'Tajmaat', tifinagh: 'ⵜⴰⵊⵎⴰⴰⵜ', transliteration: 'taj-MAAT', english: 'Gathering / Meeting', arabic: 'تجمع', category: 'Social', exampleTamazight: 'Tajmaat n tawacult tferhu.', exampleEnglish: 'The family gathering is joyful.' },
      { id: 'v-imekli', tamazight: 'Imekli', tifinagh: 'ⵉⵎⴻⴽⵍⵉ', transliteration: 'i-MEK-li', english: 'Meal / Lunch', arabic: 'الغداء', category: 'Food', exampleTamazight: 'Imekli yettwari, awn d!', exampleEnglish: 'The meal is ready, come!' },
      { id: 'v-bislama', tamazight: 'Bislama', tifinagh: 'ⴱⵉⵙⵍⴰⵎⴰ', transliteration: 'bis-LA-ma', english: 'Goodbye / Peace be with you', arabic: 'مع السلامة', category: 'Expressions', exampleTamazight: 'Bislama, ar tufat!', exampleEnglish: 'Goodbye, farewell!' },
    ],
    phrases: [
      { tamazight: 'Nkker nkkes imekli d tawacult.', transliteration: 'NK-ker nk-KES i-MEK-li d ta-wa-CULT', english: 'Let us share a meal as a family.' },
      { tamazight: 'Mamek tllid, mmi?', transliteration: 'MA-mek tl-LID, MM-i?', english: 'How are you, my son?' },
      { tamazight: 'Tafukt tga gi ddunit.', transliteration: 'ta-FUKT tga gi d-DU-nit', english: 'The sun shines on the world.' },
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Tajjayt', tamazight: 'Azul, warraw! Awn d, awn d!', transliteration: 'a-ZUL, war-RAW! AWN-d, AWN-d!', english: 'Hello, children! Come, come!' },
      { speaker: 'B', speakerName: 'Amayas', tamazight: 'Azul tajjayt! Mamek tllid?', transliteration: 'a-ZUL taj-JAYT! MA-mek tl-LID?', english: 'Hello grandmother! How are you?' },
      { speaker: 'A', speakerName: 'Tajjayt', tamazight: 'Labas, tanemmirt! Baba d yamma?', transliteration: 'la-BAS, ta-nem-MIRT! BA-ba d YAM-ma?', english: "I'm fine, thank you! Father and mother?" },
      { speaker: 'B', speakerName: 'Amayas', tamazight: 'Llan labas, awn-d azekka.', transliteration: 'LLAN la-BAS, AWN-d a-ZEK-ka', english: 'They are fine, they\'re coming tomorrow.' },
      { speaker: 'A', speakerName: 'Tajjayt', tamazight: 'Tanemmirt! Awn d, imekli yettwari.', transliteration: 'ta-nem-MIRT! AWN-d, i-MEK-li yet-TWA-ri', english: 'Thank you! Come, the meal is ready.' },
    ],
    practiceItems: [
      { id: 'p1', question: '"Tferhu" means:', options: ['Tired', 'Happy/Joyful', 'Sad', 'Sick'], answer: 'Happy/Joyful' },
      { id: 'p2', question: '"Tajmaat" means:', options: ['Market', 'Gathering/Meeting', 'House', 'Meal'], answer: 'Gathering/Meeting' },
    ],
  },

  {
    id: 'l5-visiting',
    level: 5, category: 'Traditions',
    title: 'Visiting & Greeting Elders', titleTamazight: 'Tizawalt d Ismaren', titleTifinagh: 'ⵜⵉⵣⴰⵡⴰⵍⵜ ⴷ ⵉⵙⵎⴰⵔⴻⵏ',
    description: 'Learn the etiquette of visiting an Amazigh home — greeting elders, accepting tea, and the art of Amazigh hospitality.',
    culturalNote: 'Visiting someone in Amazigh culture is a profound social act. You bring gifts, remove your shoes at the door, greet the eldest first, and never refuse the first glass of tea — to do so is to reject the family\'s hospitality. "Tiwizi" (communal support/solidarity) is a core Amazigh value.',
    duration: 20, difficulty: 'intermediate',
    vocabulary: [
      { id: 'v-tiwizi', tamazight: 'Tiwizi', tifinagh: 'ⵜⵉⵡⵉⵣⵉ', transliteration: 'ti-WI-zi', english: 'Solidarity / Community support', arabic: 'التضامن', category: 'Culture', exampleTamazight: 'Tiwizi d aghbalu n Imazighen.', exampleEnglish: 'Solidarity is the spring of the Amazigh.' },
      { id: 'v-igh', tamazight: 'Ugh-d dar-nnegh', tifinagh: 'ⵓⵖ ⴷ ⴷⴰⵔ ⵏⵏⴻⵖ', transliteration: 'UGH-d dar-NNEGH', english: 'Welcome to our home', arabic: 'أهلا بك في بيتنا', category: 'Hospitality', exampleTamazight: 'Ugh-d dar-nnegh, amddakul!', exampleEnglish: 'Welcome to our home, friend!' },
      { id: 'v-ssrs', tamazight: 'Ssrs-d', tifinagh: 'ⵙⵙⵔⵙ ⴷ', transliteration: 'ss-RS-d', english: 'Sit down!', arabic: 'اجلس!', category: 'Hospitality', exampleTamazight: 'Ssrs-d, fkiy-d lmukan.', exampleEnglish: 'Sit down, let me give you a place.' },
      { id: 'v-amddakul', tamazight: 'Amddakul', tifinagh: 'ⴰⵎⴷⴷⴰⴽⵓⵍ', transliteration: 'am-DDA-kul', english: 'Friend / Companion', arabic: 'صديق', category: 'Social', exampleTamazight: 'Amddakul-inu d amazigh.', exampleEnglish: 'My friend is Amazigh.' },
    ],
    phrases: [
      { tamazight: 'Ugh-d dar-nnegh! Tigmmi-nnegh d tigmmi-nik.', transliteration: 'UGH-d dar-NNEGH! tig-MMI-nnegh d tig-MMI-nik', english: 'Welcome to us! Our home is your home.' },
      { tamazight: 'Fkiy-d kra n atay?', transliteration: 'fki-YD kra n a-TAY?', english: 'Can I offer you some tea?' },
      { tamazight: 'Tanemmirt! Tawacult-nik tga labas?', transliteration: 'ta-nem-MIRT! ta-wa-CULT-nik tga la-BAS?', english: 'Thank you! Is your family well?' },
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Host', tamazight: 'Azul! Ugh-d dar-nnegh! Tanemmirt i tizawalt!', transliteration: 'a-ZUL! UGH-d dar-NNEGH! ta-nem-MIRT i ti-ZA-walt!', english: 'Hello! Welcome! Thank you for visiting!' },
      { speaker: 'B', speakerName: 'Guest', tamazight: 'Tanemmirt i ugh-nnegh! Mamek tllim?', transliteration: 'ta-nem-MIRT i UGH-nnegh! MA-mek tl-LIM?', english: 'Thank you for having us! How are you all?' },
      { speaker: 'A', speakerName: 'Host', tamazight: 'Labas ala labas! Ssrs-d! Fkigh-k atay.', transliteration: 'la-BAS a-LA la-BAS! ss-RS-d! fki-GH-k a-TAY', english: 'All is well! Sit down! I will bring you tea.' },
      { speaker: 'B', speakerName: 'Guest', tamazight: 'Tanemmirt mazal. Tigmmi-nik afulki!', transliteration: 'ta-nem-MIRT ma-ZAL. tig-MMI-nik a-ful-KI!', english: 'Thank you so much. Your home is beautiful!' },
      { speaker: 'A', speakerName: 'Host', tamazight: 'Tigmmi-nnegh d tigmmi-nik. Amazigh f ellun.', transliteration: 'tig-MMI-nnegh d tig-MMI-nik. a-MA-zigh f EL-lun', english: 'Our home is your home. Amazigh forever.' },
    ],
    practiceItems: [
      { id: 'p1', question: '"Tiwizi" means:', options: ['Tradition', 'Solidarity/Community', 'Family', 'Language'], answer: 'Solidarity/Community' },
      { id: 'p2', question: '"Amddakul" means:', options: ['Brother', 'Elder', 'Friend', 'Guest'], answer: 'Friend' },
      { id: 'p3', question: 'What is the Tamazight phrase for "Welcome to our home"?', options: ['Azul f ellun', 'Ar tufat', 'Ugh-d dar-nnegh', 'Labas darik'], answer: 'Ugh-d dar-nnegh' },
    ],
  },
];

export const getAllVocabulary = (): VocabularyItem[] => {
  const seen = new Set<string>();
  const all: VocabularyItem[] = [];
  LESSONS.forEach(lesson => {
    lesson.vocabulary.forEach(v => {
      if (!seen.has(v.id)) {
        seen.add(v.id);
        all.push(v);
      }
    });
  });
  return all;
};

export const getLessonsByLevel = (level: number): Lesson[] =>
  LESSONS.filter(l => l.level === level);

export const getLessonById = (id: string): Lesson | undefined =>
  LESSONS.find(l => l.id === id);

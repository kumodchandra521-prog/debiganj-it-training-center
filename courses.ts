import { Course, TypingLesson } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'office-operating',
    titleBn: 'সকল অফিসের কম্পিউটার অপারেটিং প্রশিক্ষণ',
    titleEn: 'All Office Computer Operating Course',
    icon: 'Monitor',
    duration: '৩ মাস (3 Months)',
    fee: 3000,
    descriptionBn: 'যে কোনো সরকারি বা বেসরকারি অফিসে সফলভাবে কম্পিউটার পরিচালনার জন্য প্রয়োজনীয় যাবতীয় কাজ শেখানো হবে।',
    descriptionEn: 'Learn comprehensive computer operating skills necessary for administrative jobs in government and private offices.',
    featuresBn: [
      'উইন্ডোজ অপারেটিং সিস্টেমের বেসিক',
      'ফাইল ও ফোল্ডার ম্যানেজমেন্ট এবং ব্যাকআপ',
      'অফিস ফাইল স্ক্যানিং ও প্রিন্টিং সিস্টেম',
      'বাংলা ও ইংরেজি ডকুমেন্ট প্রিপারেশন'
    ],
    featuresEn: [
      'Windows OS Basics & Settings',
      'File & Folder Management and Backup',
      'Office Scanning & Printing Systems',
      'Bengali & English Document Preparation'
    ],
    syllabusBn: [
      'উইন্ডোজ সেটআপ এবং সফটওয়্যার ইন্সটলেশন',
      'কন্ট্রোল প্যানেল এবং ডিভাইস ড্রাইভার কনফিগারেশন',
      'ফাইল কম্প্রেশন (Zip/Unzip) এবং ক্লাউড স্টোরেজ',
      'কম্পিউটার সিকিউরিটি ও এন্টিভাইরাস ম্যানেজমেন্ট',
      'বাস্তব অফিসের বিভিন্ন হার্ডওয়্যার সংযোগ ও ট্রাবলশুটিং'
    ],
    syllabusEn: [
      'Windows Setup and Software Installation',
      'Control Panel and Device Driver Configuration',
      'File Compression (Zip/Unzip) and Cloud Storage',
      'Computer Security & Antivirus Management',
      'Hardware Connectivity & Troubleshooting in Real Office Setup'
    ],
    seatsLeft: 12,
    totalSeats: 30
  },
  {
    id: 'typing-master',
    titleBn: 'বাংলা ও ইংরেজি প্রফেশনাল টাইপিং',
    titleEn: 'Professional Bangla & English Typing',
    icon: 'Keyboard',
    duration: '১ মাস (1 Month)',
    fee: 1500,
    descriptionBn: 'হাতে-কলমে কিবোর্ডের সঠিক ব্যবহার শিখে ঝড়ের গতিতে টাইপ করার কৌশল। বাংলা অব্র, বিজয় এবং ইংরেজি টাচ টাইপিং স্পিড বৃদ্ধির গ্যারান্টি।',
    descriptionEn: 'Master touch typing for English and Bengali (Avro & Bijoy layouts) to typing at high speed with full accuracy.',
    featuresBn: [
      'কিবোর্ড না দেখে টাইপ করার ম্যাজিক টেকনিক',
      'ভয়েস টাইপিং ও ডিকটেশন সিস্টেমের ব্যবহার',
      'টাইপিং স্পিড ৪০+ WPM করার বিশেষ প্র্যাকটিস',
      'বাংলা যুক্তবর্ণ সহজে টাইপ করার ফর্মুলা'
    ],
    featuresEn: [
      'Blind Touch Typing Magic Techniques',
      'Voice Typing & Smart Dictation Tools',
      'Increase Typing Speed to 40+ WPM',
      'Bangla Conjunct Letters (যুক্তবর্ণ) Typing Secrets'
    ],
    syllabusBn: [
      'কিবোর্ড ফিঙ্গার পজিশন অ্যান্ড হোম রো (Home Row) প্র্যাকটিস',
      'ইংরেজি ক্যারেক্টার ও সিম্বল টাইপিং স্পিড টেস্ট',
      'বিজয় বায়ান্ন কিবোর্ড লেআউট আয়ত্তকরণ',
      'অব্র ফোনেটিক কিবোর্ড ও স্পিড বুস্টিং',
      'ভয়েস টু টেক্সট (Voice-to-Text) টেকনোলজি ব্যবহার'
    ],
    syllabusEn: [
      'Finger Position and Home Row Mastery',
      'English Character & Symbol Speed Building',
      'Bijoy 52 Keyboard Layout Mastery',
      'Avro Phonetic Keyboard Speed Boosting',
      'Integrating Voice-to-Text Technologies'
    ],
    seatsLeft: 8,
    totalSeats: 25
  },
  {
    id: 'office-automation',
    titleBn: 'MS Word, Excel, PowerPoint-এর বাস্তব ব্যবহার',
    titleEn: 'Practical MS Office (Word, Excel, PowerPoint)',
    icon: 'FileSpreadsheet',
    duration: '৩ মাস (3 Months)',
    fee: 3500,
    descriptionBn: 'শুধুমাত্র থিওরি নয়, বাস্তব অফিসে কীভাবে রিপোর্ট তৈরি, হিসাব-নিকাশ এবং গর্জিয়াস প্রেজেন্টেশন স্লাইড বানাবেন তা শেখানো হবে।',
    descriptionEn: 'Move beyond basic theory. Learn practical report generation, accounting formulas, and gorgeous presentations.',
    featuresBn: [
      'এমএস ওয়ার্ডে সরকারি চিঠিপত্র ও নোটিশ তৈরি',
      'এক্সেলের অ্যাডভান্সড ফর্মুলা (VLOOKUP, IF, SUMIF)',
      'পাওয়ারপয়েন্টে প্রফেশনাল এনিমেশন ও থিম স্লাইড',
      'গুগল ডকস এবং গুগল শিটসের সাহায্যে রিয়েল-টাইম টিম কাজ'
    ],
    featuresEn: [
      'Official Letter & Notice Designing in Word',
      'Advanced Excel Formulas (VLOOKUP, IF, SUMIF, Pivot)',
      'Professional Dynamic Animations in PowerPoint',
      'Real-time Teamwork using Google Docs & Google Sheets'
    ],
    syllabusBn: [
      'এমএস ওয়ার্ড: বুক ফরম্যাটিং, টেবিল ক্রিয়েশন, মেইলিং এবং সেভ টু পিডিএফ',
      'এমএস এক্সেল: স্যালারি শিট, রেজাল্ট শিট, ক্যাশ বুক ও চার্ট ভিজ্যুয়ালাইজেশন',
      'এমএস পাওয়ারপয়েন্ট: স্লাইড ট্রানজিশন, কাস্টম অবজেক্ট ডিজাইন ও প্রেজেন্টেশন আর্ট',
      'গুগল ড্রাইভ ও অনলাইন অফিস কোলাবোরেশন টুলস'
    ],
    syllabusEn: [
      'MS Word: Book Formatting, Tables, Mail Merge, Page Layouts',
      'MS Excel: Salary Sheets, Student Grade Sheets, Cash Book & Charts',
      'MS PowerPoint: Slide Transitions, Custom Templates, Pitch Deck Design',
      'Google Drive Workspace Setup & Live Co-editing Tools'
    ],
    seatsLeft: 15,
    totalSeats: 35
  },
  {
    id: 'graphic-design',
    titleBn: 'গ্রাফিক ডিজাইন (Photoshop, Illustrator & Canva)',
    titleEn: 'Professional Graphic Design (Photoshop & Canva)',
    icon: 'Palette',
    duration: '৩ মাস (3 Months)',
    fee: 4000,
    descriptionBn: 'সোশ্যাল মিডিয়া ব্যানার, লোগো, ভিজিটিং কার্ড এবং প্রফেশনাল কন্টেন্ট ডিজাইনিং শিখে ফ্রিল্যান্সিং মার্কেটপ্লেসে কাজ করার সুযোগ।',
    descriptionEn: 'Design social media banners, logos, flyers, and professional brand assets using Canva, Photoshop, and Illustrator.',
    featuresBn: [
      'ফটোশপে প্রফেশনাল ফটো এডিটিং ও ব্যাকগ্রাউন্ড রিমুভ',
      'ইলাস্ট্রেটরে কাস্টম ভেক্টর লোগো ডিজাইন',
      'ক্যানভা প্রো-এর মাধ্যমে মিনিটে আকর্ষণীয় ব্যানার তৈরি',
      'কালার থিওরি এবং ফন্ট সিলেকশন সিক্রেট'
    ],
    featuresEn: [
      'Professional Photo Editing & Retouching in Photoshop',
      'Vector Branding and Custom Logo Design in Illustrator',
      'Create Jaw-Dropping Social Banners in Canva Pro in Minutes',
      'Color Harmonies, Typography Pairing & Grid Alignments'
    ],
    syllabusBn: [
      'ফটোশপ: লেয়ার মাস্কিং, পেন টুল ক্রিয়েশন, ব্রাশ ও কালার কারেকশন',
      'ইলাস্ট্রেটর: পেন টুল ট্র্যাকিং, পাথফাইন্ডার, টাইপোগ্রাফি অ্যান্ড পোস্টার',
      'ক্যানভা: ড্র্যাগ-অ্যান্ড-ড্রপ টেম্পলেট কাস্টমাইজেশন, ব্র্যান্ড কিট তৈরি',
      'ডিজাইন পোর্টফোলিও বিল্ডিং (Behance / Dribbble)'
    ],
    syllabusEn: [
      'Photoshop: Pen Tool Selection, Masking, Retouching, Color Grading',
      'Illustrator: Paths, Typography, Vectorizing Images, Brochure Making',
      'Canva: Template Customization, Asset Generation, Animation Exporting',
      'Building a Design Portfolio on Behance & Dribbble'
    ],
    seatsLeft: 6,
    totalSeats: 20
  },
  {
    id: 'youtube-seo',
    titleBn: 'YouTube Channel তৈরি, ভিডিও SEO ও মনিটাইজেশন',
    titleEn: 'YouTube Channel Management, SEO & Monetization',
    icon: 'Youtube',
    duration: '২ মাস (2 Months)',
    fee: 3000,
    descriptionBn: 'ভিডিও তৈরি, থাম্বনেইল ডিজাইন, প্রফেশনাল ভিডিও এডিটিং, সঠিক কিওয়ার্ড রিসার্চ এবং চ্যানেল মনিটাইজ করে আয়ের পূর্ণাঙ্গ গাইডলাইন।',
    descriptionEn: 'Create engaging videos, design high-CTR thumbnails, write metadata, practice search engine optimization, and monetize.',
    featuresBn: [
      'ক্যাপকাট (CapCut) দিয়ে মোবাইলে ও পিসিতে ভিডিও এডিটিং',
      'ইউটিউব ভিডিও এসইও (Tag, Title, Description, Keyword)',
      'ক্লিক-বেট থাম্বনেইল তৈরির গোপন ট্রিকস',
      'প্রথম ১০০০ সাবস্ক্রাইবার ও ৪০০০ ঘণ্টা ওয়াচটাইম অর্জনের রোডম্যাপ'
    ],
    featuresEn: [
      'CapCut Video Editing (Desktop & Mobile Mastery)',
      'YouTube SEO: Keywords, High-Ranking Title & Tag Strategies',
      'Designing High-CTR Clickable Thumbnails',
      'Roadmap to achieve first 1,000 Subscribers & 4,000 Watch Hours'
    ],
    syllabusBn: [
      'চ্যানেল তৈরি ও ব্র্যান্ডিং (লোগো, ব্যানার, ওয়াটারমার্ক)',
      'ভিডিও শুটিং টেকনিক এবং স্ক্রিপ্ট রাইটিং',
      'ভিডিও এডিটিং: কাটিং, কালার গ্রেডিং, অডিও নয়েজ ক্লিন ও ট্রানজিশন',
      'VidIQ এবং TubeBuddy দিয়ে কিওয়ার্ড ও কম্পিটিশন রিসার্চ',
      'ইউটিউব পার্টনার প্রোগ্রাম ও গুগল এডসেন্স একাউন্ট সেটআপ'
    ],
    syllabusEn: [
      'Channel Setup & Branding: Logo, Banner, Channel Trailer & Layout',
      'Video Recording Setup, Camera Angles, and Script Writing',
      'Editing: Sound Enhancements, Cuts, Transitions, Subtitles, Background Music',
      'VidIQ and TubeBuddy Tools for Keyword and Competitor Auditing',
      'YouTube Partner Program & Google AdSense Verification'
    ],
    seatsLeft: 10,
    totalSeats: 25
  },
  {
    id: 'facebook-monetization',
    titleBn: 'Facebook Content তৈরি করে আয়ের কৌশল',
    titleEn: 'Facebook Content Creation & Marketing',
    icon: 'Facebook',
    duration: '২ মাস (2 Months)',
    fee: 3000,
    descriptionBn: 'ফেসবুক পেজ প্রফেশনাল সেটআপ, ইন-স্ট্রিম এডস এবং রিলস ভিডিও আপলোড করে প্রতি মাসে ঘরে বসেই ইনকাম করার বাস্তব কোর্স।',
    descriptionEn: 'Professional Facebook Page management, video scriptwriting, In-Stream Ads strategy, and Reels production to earn money.',
    featuresBn: [
      'ফেসবুক বিজনেস পেজ অপ্টিমাইজেশন',
      'রিলস (Reels) ভিডিওর মাধ্যমে ভাইরাল হওয়ার ট্রিকস',
      'কপিরাইট ফ্রি মিউজিক ও ভিডিও ফুটেজ কালেকশন',
      'ফেসবুক পেজ মনিটাইজেশন পলিসি এড়ানো ও সমাধান'
    ],
    featuresEn: [
      'Optimized Facebook Business Page & Creator Studio Setup',
      'Secrets to Virality using Reels & Short Video Formats',
      'Finding and Using Copyright-free Music & Visual Assets',
      'Adhering to Partner Monetization Policies & Resolving Issues'
    ],
    syllabusBn: [
      'ফেসবুক পেজ সেটআপ ও মেটা বিজনেস স্যুট পরিচিতি',
      'মোবাইল দিয়ে প্রফেশনাল শর্ট ভিডিও এডিটিং',
      'রিলস অ্যালগরিদম হ্যাকস এবং সঠিক হ্যাশট্যাগ রিসার্চ',
      'ফ্রি ট্রাফিক ড্রাইভিং এবং গ্রুপ শেয়ারিং টেকনিক',
      'ব্যাংক একাউন্ট যুক্ত করা ও পেমেন্ট রিসিভ পদ্ধতি'
    ],
    syllabusEn: [
      'Page Configuration & Meta Business Suite Deep-Dive',
      'Mobile Video Editing specifically for Facebook Formats',
      'Reels Algorithm Hacks and Hashtag Optimization',
      'Viral Sharing Strategies and Facebook Groups Traffic Driver',
      'Bank Account Connection & Safe Payout Operations'
    ],
    seatsLeft: 9,
    totalSeats: 25
  },
  {
    id: 'freelancing',
    titleBn: 'Freelancing ও Online Income-এর বাস্তব প্রশিক্ষণ',
    titleEn: 'Freelancing & Online Outsourcing Blueprint',
    icon: 'TrendingUp',
    duration: '৩ মাস (3 Months)',
    fee: 5000,
    descriptionBn: 'Fiverr এবং Upwork মার্কেটপ্লেসে কীভাবে সফল একাউন্ট খুলবেন, গিগ সাজাবেন, ক্লায়েন্টের সাথে চ্যাট করবেন এবং ডলারে পেমেন্ট নিয়ে আসবেন।',
    descriptionEn: 'A hands-on blueprint to register, find work, communicate with international clients, and withdraw earnings safely.',
    featuresBn: [
      'Fiverr, Upwork ও Freelancer.com একাউন্ট ১০০% ভেরিফিকেশন',
      'কভার লেটার রাইটিং ও কাজ পাওয়ার আকর্ষণীয় গিগ ইমেজ তৈরি',
      'ইংরেজি চ্যাটিং এবং ক্লায়েন্ট ম্যানেজমেন্টের চমৎকার টেকনিক',
      'Payoneer-এর মাধ্যমে সরাসরি টাকা বিকাশ বা ব্যাংক একাউন্টে আনা'
    ],
    featuresEn: [
      'Fiverr, Upwork, and Freelancer.com 100% Account Verification',
      'Compelling Cover Letter Writing & High-ranking Gig Setup',
      'Client Chat Scripts and Communication Skills Builder',
      'Connect Payoneer and withdraw funds straight to bKash or local Banks'
    ],
    syllabusBn: [
      'মার্কেটপ্লেস পরিচিতি ও ক্যাটাগরি নির্ধারণ',
      'ফাইভার গিগ এসইও (Fiverr Gig SEO) এবং কিওয়ার্ড পজিশনিং',
      'আপওয়ার্ক কানেক্ট ব্যবহার ও বিডিং প্রোজেক্ট প্রপোজাল',
      'মার্কেটপ্লেসের বাইরে লিংকডইন (LinkedIn) থেকে ক্লায়েন্ট শিকার',
      'ট্যাক্স ইনফরমেশন পূরণ ও ডলার থেকে টাকা কনভার্সন গাইড'
    ],
    syllabusEn: [
      'Marketplace Landscape and choosing your Profitable Niche',
      'Fiverr Gig Creation, Keyword Research and Ranking Optimization',
      'Upwork Project Proposals, Connect Allocation and Safe Bidding',
      'Out-of-Marketplace Client acquisition via LinkedIn and Cold Emailing',
      'W8-BEN Tax Form validation and Payout routing to bKash'
    ],
    seatsLeft: 5,
    totalSeats: 15
  },
  {
    id: 'ai-voice-typing',
    titleBn: 'আধুনিক AI ও Voice Typing স্মার্ট কোর্স',
    titleEn: 'Smart AI Tools & Voice Typing Masterclass',
    icon: 'Sparkles',
    duration: '১ মাস (1 Month)',
    fee: 2000,
    descriptionBn: '১ ঘণ্টার কাজ ৫ মিনিটে! ChatGPT, Gemini, ভয়েস টাইপিং ও এআই প্রেজেন্টেশন মেকার দিয়ে অফিসিয়াল কাজকে করুন রকেটের মতো গতিশীল।',
    descriptionEn: 'Turn 1-hour of manual work into 5-minutes! Integrate ChatGPT, Gemini, Speech-to-Text and AI Presentation Builders.',
    featuresBn: [
      'ChatGPT ও Gemini-কে ডিরেকশন দেওয়ার সঠিক প্রম্পট ইঞ্জিনিয়ারিং',
      'মুখে বলেই কোনো ভুল ছাড়া বাংলা ও ইংরেজি লেখার যাদু',
      'AI দিয়ে নিমেষে সুন্দর পাওয়ারপয়েন্ট স্লাইড ও ব্যানার তৈরি',
      'অফিসের জটিল ইমেইল ও রিপোর্ট AI দিয়ে সেকেন্ডে লিখিয়ে নেওয়ার উপায়'
    ],
    featuresEn: [
      'Prompt Engineering Basics for ChatGPT & Gemini',
      'Speak & Type: Write perfect Bangla and English with Voice Command',
      'Generate stunning Slides and graphics via AI in seconds',
      'Draft complex official Emails and reports in one tap'
    ],
    syllabusBn: [
      'প্রম্পট ইঞ্জিনিয়ারিং এর ফান্ডামেন্টাল এবং এআই চ্যাটবট',
      'গুগল ভয়েস টাইপিং ডিকটেশন এবং কীবোর্ড কনফিগারেশন',
      'গুগল ট্রান্সলেট ও এআই ট্রান্সলেশন টুলস এর প্রফেশনাল ব্যবহার',
      'Gamma, SlidesAI ব্যবহার করে এআই স্লাইড প্রেজেন্টেশন মেকিং',
      'এআই ইমেজ জেনারেশন এবং কন্টেন্ট রাইটিং অ্যাসিস্ট্যান্টস'
    ],
    syllabusEn: [
      'Prompt Engineering Fundamentals and LLM Agents',
      'Google Voice Typing, Dictation Engine setup & Custom Words',
      'Professional AI Translations and localization techniques',
      'Generating slideshows in Gamma and SlidesAI within 60 seconds',
      'Visual AI image creation and advanced content writing assistance'
    ],
    seatsLeft: 10,
    totalSeats: 20
  }
];

export const TYPING_LESSONS: TypingLesson[] = [
  {
    id: 'en-easy-1',
    language: 'en',
    difficulty: 'Beginner',
    titleBn: 'ইংরেজি সহজ প্র্যাকটিস - হোম রো',
    titleEn: 'English Easy Practice - Home Row',
    text: 'asdf jkl; asdf jkl; asdf jkl; a s d f j k l ; asdf jkl; the quick brown fox jumps over the lazy dog'
  },
  {
    id: 'en-med-1',
    language: 'en',
    difficulty: 'Medium',
    titleBn: 'ইংরেজি অফিস চিঠি টাইপিং',
    titleEn: 'English Official Letter Snippet',
    text: 'Dear Sir, I am writing to apply for the position of Computer Operator at your esteemed organization. I have completed my three months intensive training in office applications.'
  },
  {
    id: 'bn-easy-1',
    language: 'bn',
    difficulty: 'Beginner',
    titleBn: 'বাংলা ফোনেটিক - বর্ণমালা',
    titleEn: 'Bangla Phonetic - Alphabet Basics',
    text: 'ami banglay gan gai. amra bangladeshi nagorik. deviganj amader bhalobashar shohor. ekhane computer shikha khub shohoj.'
  },
  {
    id: 'bn-med-1',
    language: 'bn',
    difficulty: 'Medium',
    titleBn: 'বাংলা অফিস নোটিশ প্র্যাকটিস',
    titleEn: 'Bangla Official Notice Practice',
    text: 'এতদ্বারা জানানো যাইতেছে যে দেবীগঞ্জ আইটি সেন্টারের সকল ছাত্রছাত্রীদের কম্পিউটার অপারেটিং কোর্সের ব্যবহারিক পরীক্ষা আগামী রবিবার অনুষ্ঠিত হইবে। সকলকে উপস্থিত থাকার জন্য বলা হইল।'
  }
];

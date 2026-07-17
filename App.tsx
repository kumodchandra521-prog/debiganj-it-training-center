import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TypingTutor from './components/TypingTutor';
import VoiceTyping from './components/VoiceTyping';
import ExcelLab from './components/ExcelLab';
import WhyUs from './components/WhyUs';
import AdmissionForm from './components/AdmissionForm';
import { COURSES_DATA } from './data/courses';
import { 
  Monitor, Keyboard, FileSpreadsheet, Palette, Youtube, Facebook, 
  TrendingUp, Sparkles, BookOpen, GraduationCap, Users, CheckCircle2, 
  ArrowRight, Phone, Clock, Mail, MapPin, Award, PlayCircle 
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const [activeLabSubTab, setActiveLabSubTab] = useState<'typing' | 'voice' | 'excel'>('typing');
  const [totalAdmissionsCount, setTotalAdmissionsCount] = useState(0);

  // Synchronize count of admissions currently listed in localStorage
  const updateAdmissionsCount = () => {
    const saved = localStorage.getItem('debiganj_it_admissions');
    if (saved) {
      try {
        const list = JSON.parse(saved);
        setTotalAdmissionsCount(list.filter((x: any) => x.status === 'Pending').length);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    updateAdmissionsCount();
  }, []);

  // Map string icon names to Lucide icons
  const renderCourseIcon = (iconName: string) => {
    const iconClass = "w-6 h-6 text-emerald-600";
    switch(iconName) {
      case 'Monitor': return <Monitor className={iconClass} />;
      case 'Keyboard': return <Keyboard className={iconClass} />;
      case 'FileSpreadsheet': return <FileSpreadsheet className={iconClass} />;
      case 'Palette': return <Palette className={iconClass} />;
      case 'Youtube': return <Youtube className={iconClass} />;
      case 'Facebook': return <Facebook className={iconClass} />;
      case 'TrendingUp': return <TrendingUp className={iconClass} />;
      case 'Sparkles': return <Sparkles className={iconClass} />;
      default: return <GraduationCap className={iconClass} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-200 text-slate-800">
      
      {/* Universal Header */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        lang={lang} 
        setLang={setLang} 
        totalPendingAdmissions={totalAdmissionsCount}
      />

      {/* Main Container Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        
        {/* TAB 1: HOME PAGE */}
        {currentTab === 'home' && (
          <div className="space-y-16 animate-fade-in">
            {/* HERO HERO SECTION */}
            <section className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-900 rounded-3xl p-6 md:p-12 text-white relative overflow-hidden shadow-xl text-left border border-emerald-700">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-1.5 bg-emerald-700/60 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-emerald-300">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  {lang === 'bn' ? 'দেবীগঞ্জবাসীর জন্য সুবর্ণ সুযোগ!' : 'First Time Ever in Debiganj!'}
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                  {lang === 'bn' ? (
                    <>
                      কম্পিউটার শিখুন, <span className="text-amber-400">চাকরি ও ফ্রিল্যান্সিংয়ে</span> ক্যারিয়ার গড়ুন!
                    </>
                  ) : (
                    <>
                      Learn Computer Skills, Build Your <span className="text-amber-400">Dream Career</span> Today!
                    </>
                  )}
                </h1>

                <p className="text-sm md:text-base text-emerald-100 leading-relaxed max-w-2xl">
                  {lang === 'bn' ? (
                    'অনেকেই কোর্স সম্পন্ন করে অফিসে কাজ করতে গিয়ে ঝামেলায় পড়েন। আমরা শুধু থিওরি বা সার্টিফিকেট নয়, বাস্তব অফিসের রিপোর্টিং, প্রিন্টিং, টাইপিং, এবং আধুনিক এআই টুলের বাস্তব ব্যবহার হাতে-কলমে শিখিয়ে আপনাকে দক্ষ করে তুলি।'
                  ) : (
                    'Avoid theoretical memorization. We train you through hands-on office documentation, automated spreadsheets, professional graphic design layouts, and modern AI dictation tools to get you hired instantly.'
                  )}
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button 
                    onClick={() => setCurrentTab('admission')}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    {lang === 'bn' ? 'আজই ভর্তি হোন (সীমিত আসন)' : 'Apply Admission Online'}
                  </button>
                  <button 
                    onClick={() => setCurrentTab('lab')}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold rounded-xl text-sm transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PlayCircle className="w-4 h-4 text-emerald-400" />
                    {lang === 'bn' ? 'ফ্রি প্র্যাকটিস ল্যাব দেখুন' : 'Explore Free Interactive Lab'}
                  </button>
                </div>
              </div>
            </section>

            {/* QUICK HIGHLIGHT CARDS (GAMES/FEATURES) */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Keyboard className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm">{lang === 'bn' ? 'স্মার্ট টাইপিং মাস্টার' : 'Phonetic Touch Typing'}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {lang === 'bn' ? 'বাংলা অব্র ও ইংরেজি টাচ টাইপিং শিখুন। মুখে বলেই নির্ভুল ভয়েস টাইপ করার অত্যাধুনিক ফর্মুলা।' : 'Master blind touch typing in Bangla and English. Automate transcripts using AI voice recognition.'}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm">{lang === 'bn' ? 'বাস্তব অফিস প্রজেক্ট' : 'Hands-on Office Automation'}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {lang === 'bn' ? 'সরকারি-বেসরকারি অফিসের আবেদনপত্র লিখন, এক্সেল রেজাল্ট ও স্যালারি শিট এবং পাওয়ারপয়েন্ট ডিজাইন।' : 'Learn document filing, advanced Excel formulas (VLOOKUP, IF), and design stellar presentation decks.'}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm">{lang === 'bn' ? 'ফ্রিল্যান্সিং গাইডলাইন' : 'International Freelance'}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {lang === 'bn' ? 'ফাইবার ও আপওয়ার্কে শতভাগ প্রফেশনাল একাউন্ট খুলে সরাসরি ব্যাংক বা বিকাশে ডলারে পেমেন্ট আনা।' : 'Create highly verified Upwork gig profiles and learn cash withdrawals straight to local banks.'}
                </p>
              </div>
            </section>

            {/* BANNER SHOWCASE COMPONENT: 1 Hour vs 5 Minutes */}
            <section className="bg-slate-100 border border-slate-200 rounded-3xl p-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {lang === 'bn' ? 'উন্নত প্রযুক্তি' : 'Next-Gen Workflow'}
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">
                    {lang === 'bn' ? '১ ঘণ্টার টাইপিং কাজ করুন মাত্র ৫ মিনিটে!' : 'Save 90% Time with Smart voice Dictation'}
                  </h2>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {lang === 'bn'
                      ? 'অনেকে টাইপিং করতে দীর্ঘ সময় ব্যয় করেন। দেবীগঞ্জ আইটি একাডেমিতে আমরা অত্যাধুনিক AI স্পিচ-টু-টেক্সট ভয়েস টাইপিং এবং প্রম্পট ইঞ্জিনিয়ারিং এর বাস্তব প্রয়োগ দেখাই, যার মাধ্যমে মুখের কথাই নির্ভুলভাবে টাইপ হয়ে যায় মুহূর্তে!'
                      : 'Traditional key tapping is slow. Our curriculum empowers students to speak naturally in Bangla or English and let automated engines write reports in seconds.'}
                  </p>
                  <button 
                    onClick={() => {
                      setCurrentTab('lab');
                      setActiveLabSubTab('voice');
                    }}
                    className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 text-xs font-bold underline cursor-pointer"
                  >
                    {lang === 'bn' ? 'ভয়েস টাইপিং ল্যাবের লাইভ ডেমো দেখুন' : 'Try Live Voice-Dictation Tool'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b pb-2">
                    ⏱️ {lang === 'bn' ? 'কাজের গতি তুলনা শিট' : 'TASK SPEED METRICS'}
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded">
                      <span className="text-slate-500">{lang === 'bn' ? 'সাধারণ টাইপিস্ট (১ পৃষ্ঠা)' : 'Standard Typist (1 Page)'}</span>
                      <span className="font-mono font-bold text-red-600">১৫-২০ মিনিট</span>
                    </div>
                    <div className="flex justify-between items-center bg-emerald-50/60 p-2 rounded border border-emerald-100">
                      <span className="font-semibold text-slate-800">{lang === 'bn' ? 'এআই ভয়েস টাইপিস্ট (১ পৃষ্ঠা)' : 'AI Voice Typist (1 Page)'}</span>
                      <span className="font-mono font-bold text-emerald-700">১-২ মিনিট (রকেট স্পিড!)</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* REVIEWS / ADMISSION ALERT */}
            <section className="bg-gradient-to-tr from-emerald-900 to-teal-950 text-white rounded-3xl p-6 md:p-8 text-center space-y-4">
              <h3 className="text-xl md:text-2xl font-black">
                {lang === 'bn' ? 'সীমিত আসন! আজই আপনার সিট নিশ্চিত করুন' : 'Limited Seats Left for This Batch!'}
              </h3>
              <p className="text-xs md:text-sm text-emerald-100 max-w-xl mx-auto">
                {lang === 'bn'
                  ? 'আমরা শুধু সার্টিফিকেট নয়, দক্ষ কর্মমুখী আইটি শিক্ষা দিয়ে থাকি। দেবীগঞ্জে একটি সফল ও উজ্জ্বল ক্যারিয়ার গড়তে আজই আবেদন করুন।'
                  : 'Enrollment operates on a first-come, first-served basis. Secure your laboratory desk today.'}
              </p>
              <button 
                onClick={() => setCurrentTab('admission')}
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg transform hover:scale-105 transition-all cursor-pointer inline-block"
              >
                {lang === 'bn' ? 'অনলাইন ভর্তি ফরম পূরণ করুন' : 'Open Admission Form'}
              </button>
            </section>

          </div>
        )}

        {/* TAB 2: OFFERS / COURSES */}
        {currentTab === 'courses' && (
          <div className="space-y-8 animate-fade-in text-left">
            <div className="text-center space-y-2 mb-8">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-widest">
                {lang === 'bn' ? 'আমাদের প্রশিক্ষণ কোর্সসমূহ' : 'Our Specialized Courses'}
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                {lang === 'bn' ? 'বাস্তব কাজের উপযোগী আধুনিক আইটি কোর্স' : 'Job-Focused Computer Training Curriculum'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COURSES_DATA.map((course) => (
                <div key={course.id} className="bg-white border border-slate-200 rounded-2xl shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between">
                  
                  <div className="space-y-4">
                    {/* Course top bar */}
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          {renderCourseIcon(course.icon)}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                            {lang === 'bn' ? course.titleBn : course.titleEn}
                          </h3>
                          <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                            ⏱️ {course.duration}
                          </span>
                        </div>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-2.5 py-1 rounded-lg shrink-0 font-mono">
                        ৳{course.fee}/-
                      </span>
                    </div>

                    {/* Course Description */}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lang === 'bn' ? course.descriptionBn : course.descriptionEn}
                    </p>

                    {/* Highlights list */}
                    <div className="space-y-1.5 pt-2">
                      <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{lang === 'bn' ? 'কোর্সের বিশেষ সুবিধা:' : 'Course Benefits:'}</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                        {(lang === 'bn' ? course.featuresBn : course.featuresEn).map((feat, idx) => (
                          <li key={idx} className="flex gap-1.5 items-center">
                            <span className="text-emerald-600 font-bold shrink-0">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Detailed Syllabus drop list */}
                    <div className="space-y-2 pt-2 bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs">
                      <h4 className="font-bold text-slate-700">{lang === 'bn' ? 'সিলেবাসের বিস্তারিত (যা যা শেখানো হবে):' : 'Detailed Module Contents:'}</h4>
                      <ul className="space-y-1 text-slate-500">
                        {(lang === 'bn' ? course.syllabusBn : course.syllabusEn).map((syl, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-1.5">
                            <span className="text-slate-400 shrink-0 mt-1">•</span>
                            <span>{syl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Booking Trigger CTA */}
                  <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center">
                    <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wide">
                      🔥 {lang === 'bn' ? `অবশিষ্ট সিট: ${course.seatsLeft}/${course.totalSeats}` : `Desks Left: ${course.seatsLeft}/${course.totalSeats}`}
                    </span>
                    <button
                      onClick={() => {
                        setCurrentTab('admission');
                      }}
                      className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all text-xs cursor-pointer flex items-center gap-1.5 shadow-sm hover:shadow-emerald-100 active:scale-95"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      {lang === 'bn' ? 'ভর্তি ফরম খুলুন' : 'Apply For Seat'}
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LIVE PRACTICE LABS wrapper */}
        {currentTab === 'lab' && (
          <div className="space-y-8 animate-fade-in text-left">
            <div className="text-center space-y-2 mb-6">
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200 uppercase tracking-widest">
                {lang === 'bn' ? 'ফ্রি প্র্যাকটিস ল্যাব' : 'INTERACTIVE LIVE LABS'}
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                {lang === 'bn' ? 'হাত কলমে কাজ করার বাস্তব লাইভ ল্যাব' : 'Hands-on Skill Application Laboratory'}
              </h2>
              <p className="text-xs text-slate-500 max-w-xl mx-auto font-sans">
                {lang === 'bn'
                  ? 'আমরা শুধু থিওরি নয়, বাস্তব কাজ শিখিয়ে দক্ষ করি। নিচে আমাদের ল্যাবের ৩টি অত্যন্ত দরকারি টুল ফ্রিতে ট্রাই করে দেখুন!'
                  : 'We value actions over theory. Try out our 3 interactive digital laboratories to gauge your learning pace.'}
              </p>
            </div>

            {/* Inner Lab Tabs selection */}
            <div className="flex justify-center gap-2 mb-8 bg-slate-200/60 p-1.5 rounded-xl max-w-md mx-auto border border-slate-300/40">
              <button
                onClick={() => setActiveLabSubTab('typing')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeLabSubTab === 'typing'
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ⌨️ {lang === 'bn' ? 'টাইপিং স্পিড টেস্ট' : 'Typing Test'}
              </button>
              <button
                onClick={() => setActiveLabSubTab('voice')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeLabSubTab === 'voice'
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🎙️ {lang === 'bn' ? 'ভয়েস টাইপিং ল্যাব' : 'Voice Dictate'}
              </button>
              <button
                onClick={() => setActiveLabSubTab('excel')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeLabSubTab === 'excel'
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📊 {lang === 'bn' ? 'এক্সেল রিপোর্টিং ল্যাব' : 'Excel Sheet'}
              </button>
            </div>

            {/* Sub content render based on active sub tab */}
            {activeLabSubTab === 'typing' && <TypingTutor lang={lang} />}
            {activeLabSubTab === 'voice' && <VoiceTyping lang={lang} />}
            {activeLabSubTab === 'excel' && <ExcelLab lang={lang} />}
          </div>
        )}

        {/* TAB 4: WHY CHOOSE US */}
        {currentTab === 'whyus' && (
          <div className="animate-fade-in">
            <WhyUs lang={lang} />
          </div>
        )}

        {/* TAB 5: ONLINE ADMISSION FORM */}
        {currentTab === 'admission' && (
          <div className="animate-fade-in">
            <AdmissionForm lang={lang} onAdmissionAdded={updateAdmissionsCount} />
          </div>
        )}

      </main>

      {/* Universal Footer */}
      <Footer setCurrentTab={setCurrentTab} lang={lang} />

    </div>
  );
}

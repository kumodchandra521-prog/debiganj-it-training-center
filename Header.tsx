import React from 'react';
import { GraduationCap, Phone, MapPin, Sparkles, BookOpen, Clock } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: 'bn' | 'en';
  setLang: (lang: 'bn' | 'en') => void;
  totalPendingAdmissions: number;
}

export default function Header({ currentTab, setCurrentTab, lang, setLang, totalPendingAdmissions }: HeaderProps) {
  return (
    <header id="app-header" className="bg-white border-b border-emerald-100 sticky top-0 z-50 shadow-xs">
      {/* Top micro bar for quick info */}
      <div className="bg-emerald-800 text-white py-2 px-4 text-xs font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-300" />
              {lang === 'bn' ? 'ইউসিবি ব্যাংক সংলগ্ন (২য় তলা), দেবীগঞ্জ, পঞ্চগড়' : 'Adjacent to UCB Bank (2nd Floor), Debiganj, Panchagarh'}
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-300" />
              {lang === 'bn' ? 'সকাল ৯:০০ - রাত ৮:০০' : '9:00 AM - 8:00 PM'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+8801700000000" className="flex items-center gap-1 hover:text-emerald-200 transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-300" />
              +৮৮০ ১৭৫৩-XXXXXX
            </a>
            <span className="bg-amber-500 text-slate-900 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 text-[10px] uppercase tracking-wide animate-pulse">
              <Sparkles className="w-3 h-3" />
              {lang === 'bn' ? 'ভর্তি চলছে!' : 'Admission Open!'}
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('home')}>
          <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-200 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-700 to-teal-500 group-hover:scale-110 transition-transform duration-300"></div>
            <GraduationCap className="w-7 h-7 relative z-10" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-600 rounded-full border border-white"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold font-sans text-slate-900 tracking-tight flex items-center gap-1.5 leading-none">
              {lang === 'bn' ? 'দেবীগঞ্জ আইটি' : 'Debiganj IT'}
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                Academy
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-sans mt-1">
              {lang === 'bn' ? 'দেবীগঞ্জবাসীর জন্য আধুনিক ও বাস্তবমুখী প্রশিক্ষণ কেন্দ্র' : 'Modern & Practical IT Training Center in Debiganj'}
            </p>
          </div>
        </div>

        {/* Tab Items */}
        <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
          <button
            onClick={() => setCurrentTab('home')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
              currentTab === 'home'
                ? 'bg-emerald-50 text-emerald-700 shadow-xs border border-emerald-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {lang === 'bn' ? 'হোম' : 'Home'}
          </button>
          <button
            onClick={() => setCurrentTab('courses')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
              currentTab === 'courses'
                ? 'bg-emerald-50 text-emerald-700 shadow-xs border border-emerald-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {lang === 'bn' ? 'কোর্সসমূহ' : 'Courses'}
          </button>
          
          {/* Interactive Live Labs Dropdown representation */}
          <button
            onClick={() => setCurrentTab('lab')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 flex items-center gap-1 ${
              currentTab === 'lab'
                ? 'bg-amber-50 text-amber-800 shadow-xs border border-amber-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
            {lang === 'bn' ? 'বাস্তব প্র্যাকটিস ল্যাব' : 'Live Practice Lab'}
          </button>

          <button
            onClick={() => setCurrentTab('whyus')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
              currentTab === 'whyus'
                ? 'bg-emerald-50 text-emerald-700 shadow-xs border border-emerald-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {lang === 'bn' ? 'কেন আমরা?' : 'Why Us?'}
          </button>

          <button
            onClick={() => setCurrentTab('admission')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-600 text-white shadow-md hover:bg-emerald-700 active:scale-95 transition-all flex items-center gap-1.5`}
          >
            <BookOpen className="w-4 h-4" />
            {lang === 'bn' ? 'ভর্তি ফরম' : 'Online Admission'}
            {totalPendingAdmissions > 0 && (
              <span className="ml-1 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-sans font-bold">
                {totalPendingAdmissions}
              </span>
            )}
          </button>

          {/* Language Switcher */}
          <div className="ml-2 border-l border-slate-200 pl-2 flex items-center gap-1">
            <button
              onClick={() => setLang('bn')}
              className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                lang === 'bn'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              বাং
            </button>
            <button
              onClick={() => setLang('en')}
              className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                lang === 'en'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

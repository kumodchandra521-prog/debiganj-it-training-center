import React, { useState, useEffect, useRef } from 'react';
import { TYPING_LESSONS } from '../data/courses';
import { Keyboard, RefreshCw, Trophy, AlertTriangle, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

interface TypingTutorProps {
  lang: 'bn' | 'en';
}

export default function TypingTutor({ lang }: TypingTutorProps) {
  const [selectedLessonId, setSelectedLessonId] = useState(TYPING_LESSONS[0].id);
  const [inputText, setInputText] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const currentLesson = TYPING_LESSONS.find(l => l.id === selectedLessonId) || TYPING_LESSONS[0];

  // Reset the typing state when the lesson changes or manually reset
  const resetTutor = () => {
    setInputText('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsCompleted(false);
    setErrors(0);
    setCharCount(0);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    resetTutor();
  }, [selectedLessonId]);

  // Handle key change and update metrics
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    // Start the timer on the first character pressed
    if (!startTime && value.length > 0) {
      setStartTime(Date.now());
    }

    setInputText(value);

    // Calculate accuracy and errors
    let errorCounter = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentLesson.text[i]) {
        errorCounter++;
      }
    }
    
    setErrors(errorCounter);
    setCharCount(value.length);

    // Calculate accuracy percentage
    if (value.length > 0) {
      const accuracyPct = Math.round(((value.length - errorCounter) / value.length) * 100);
      setAccuracy(accuracyPct < 0 ? 0 : accuracyPct);
    } else {
      setAccuracy(100);
    }

    // Check if the typing is finished
    if (value.length >= currentLesson.text.length) {
      setIsCompleted(true);
      calculateWpm(value.length, errorCounter, true);
    }
  };

  // Dynamically calculate WPM
  const calculateWpm = (length: number, errs: number, final: boolean = false) => {
    if (!startTime) return;
    const elapsedMinutes = (Date.now() - startTime) / 60000;
    if (elapsedMinutes <= 0) return;

    // Standard formula: WPM = (Total Typed Characters / 5) / Elapsed Time in Minutes
    const grossWpm = (length / 5) / elapsedMinutes;
    const netWpm = Math.max(0, grossWpm - (errs / elapsedMinutes));
    setWpm(Math.round(netWpm));
  };

  // Background timer to update WPM while typing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTime && !isCompleted) {
      interval = setInterval(() => {
        calculateWpm(inputText.length, errors);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, inputText, errors, isCompleted]);

  // Helper to colorize correct and incorrect letters in preview
  const renderTextPreview = () => {
    return currentLesson.text.split('').map((char, index) => {
      let colorClass = 'text-slate-400';
      let borderClass = '';

      if (index < inputText.length) {
        if (inputText[index] === char) {
          colorClass = 'text-emerald-600 font-bold bg-emerald-50';
        } else {
          colorClass = 'text-red-500 font-bold bg-red-50 line-through';
        }
      } else if (index === inputText.length) {
        borderClass = 'border-b-2 border-emerald-500 animate-pulse bg-slate-100 text-slate-800';
      }

      return (
        <span key={index} className={`transition-all duration-75 px-0.5 rounded text-lg ${colorClass} ${borderClass}`}>
          {char}
        </span>
      );
    });
  };

  return (
    <div id="typing-tutor-container" className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6 max-w-4xl mx-auto">
      {/* Title & Lessons Selection header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold font-sans text-slate-900 flex items-center gap-2">
            <Keyboard className="w-6 h-6 text-emerald-600" />
            {lang === 'bn' ? 'বাংলা ও ইংরেজি টাইপিং পরীক্ষা' : 'Bangla & English Typing Tutor'}
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-1">
            {lang === 'bn' 
              ? 'নিচের লেসন সিলেক্ট করুন এবং টাইপ শুরু করুন। আপনার গতি ও নির্ভুলতা সরাসরি পরিমাপ করা হবে।' 
              : 'Select a lesson below and start typing to analyze your speed and character accuracy in real-time.'}
          </p>
        </div>
        
        {/* Lesson Selector buttons */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {TYPING_LESSONS.map(lesson => (
            <button
              key={lesson.id}
              onClick={() => setSelectedLessonId(lesson.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedLessonId === lesson.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {lang === 'bn' ? lesson.titleBn : lesson.titleEn}
              <span className={`ml-1 text-[10px] px-1 py-0.2 rounded uppercase ${
                lesson.difficulty === 'Beginner' ? 'bg-emerald-800/20 text-emerald-800' :
                lesson.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-800' :
                'bg-red-500/20 text-red-800'
              }`}>
                {lesson.difficulty}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-4 rounded-xl border border-emerald-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-emerald-800 font-semibold uppercase tracking-wider">{lang === 'bn' ? 'টাইপিং গতি' : 'Typing Speed'}</div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              {wpm} <span className="text-xs font-normal text-slate-500">WPM</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-blue-800 font-semibold uppercase tracking-wider">{lang === 'bn' ? 'নির্ভুলতা' : 'Accuracy'}</div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              {accuracy}%
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100/50 p-4 rounded-xl border border-red-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center text-white shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-red-800 font-semibold uppercase tracking-wider">{lang === 'bn' ? 'ভুল সংখ্যা' : 'Errors'}</div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              {errors}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-600 flex items-center justify-center text-white shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{lang === 'bn' ? 'টাইপ করা বর্ণ' : 'Characters'}</div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              {charCount} <span className="text-xs font-normal text-slate-500">/{currentLesson.text.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Target Text Box */}
      <div className="border-2 border-dashed border-emerald-100 bg-emerald-50/20 rounded-xl p-5 mb-6 text-left relative overflow-hidden">
        <div className="absolute top-2 right-2 text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
          {currentLesson.language === 'bn' ? 'Phonetic (ইংরেজি হরফে বাংলা)' : 'English Touch Type'}
        </div>
        <div className="leading-relaxed select-none tracking-wide text-justify select-none font-mono font-medium whitespace-pre-wrap max-h-48 overflow-y-auto">
          {renderTextPreview()}
        </div>
      </div>

      {/* Interactive Typing Input Area */}
      <div className="relative">
        <textarea
          ref={inputRef}
          value={inputText}
          onChange={handleChange}
          disabled={isCompleted}
          placeholder={
            lang === 'bn' 
              ? 'উপরের টেক্সটটি দেখে দেখে এখানে নিখুঁতভাবে টাইপ করুন... (টাইপিং শুরু করার সাথে সাথে টাইম কাউন্ট শুরু হবে)' 
              : 'Focus here and start touch-typing above letters... (timer auto starts with first stroke)'
          }
          className="w-full h-32 p-4 border border-slate-300 rounded-xl font-mono focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 outline-none text-slate-800 text-lg leading-relaxed resize-none bg-slate-50 shadow-inner"
        />

        {/* Completion Modal/Overlay */}
        {isCompleted && (
          <div className="absolute inset-0 bg-slate-900/90 rounded-xl flex flex-col items-center justify-center text-white p-6 animate-fade-in z-20">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-2 animate-bounce" />
            <h3 className="text-lg font-bold">
              {lang === 'bn' ? 'অভিনন্দন! আপনি সফলভাবে লেসনটি শেষ করেছেন।' : 'Awesome! You completed this lesson successfully.'}
            </h3>
            
            {/* Show dynamic encouragement based on speed */}
            <p className="text-sm text-slate-300 mt-1 max-w-md text-center">
              {lang === 'bn' ? (
                wpm >= 40 
                  ? `আপনার টাইপিং স্পিড ${wpm} WPM যা সুপার-ফাস্ট! আপনি অফিসে কাজের জন্য একদম রেডি।` 
                  : `আপনার টাইপিং স্পিড ${wpm} WPM। দেবীগঞ্জ আইটি কোর্সে ভর্তি হয়ে আপনার গতি দ্বিগুণ করুন!`
              ) : (
                wpm >= 40
                  ? `Superb! Speed of ${wpm} WPM is professional grade. You are highly employable!`
                  : `Good effort! Your speed is ${wpm} WPM. Let's work hard to double it with professional tricks!`
              )}
            </p>

            <button
              onClick={resetTutor}
              className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
              {lang === 'bn' ? 'আবার চেষ্টা করুন' : 'Try Again'}
            </button>
          </div>
        )}
      </div>

      {/* Quick Action Hints / Instructions */}
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-sans border-t border-slate-100 pt-4">
        <div className="flex items-center gap-1.5 text-left">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>
            {lang === 'bn' 
              ? 'পরামর্শ: কীবোর্ডের দিকে না তাকিয়ে মনিটরে লেটার দেখে দেখে আঙুল সেট করার অভ্যাস করুন।' 
              : 'Pro Tip: Place your hands on the Home Row (ASDF - JKL;) and avoid looking at the keycaps.'}
          </span>
        </div>
        <button
          onClick={resetTutor}
          className="flex items-center gap-1 text-slate-600 hover:text-emerald-700 font-medium transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          {lang === 'bn' ? 'রিসেট করুন' : 'Reset Progress'}
        </button>
      </div>
    </div>
  );
}

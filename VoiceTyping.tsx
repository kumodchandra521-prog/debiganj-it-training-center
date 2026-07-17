import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Sparkles, Volume2, HelpCircle, FileText, Check, AlertCircle } from 'lucide-react';

interface VoiceTypingProps {
  lang: 'bn' | 'en';
}

export default function VoiceTyping({ lang }: VoiceTypingProps) {
  const [isListening, setIsListening] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [speechApiSupported, setSpeechApiSupported] = useState(false);
  const [showSimulatedOptions, setShowSimulatedOptions] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedStatus, setSimulatedStatus] = useState('');
  
  const recognitionRef = useRef<any>(null);

  // Simulated phrases to let users experience high-speed voice typing
  const SIMULATED_PHRASES = [
    {
      labelBn: "আমি দেবীগঞ্জে আইটি ক্লাসে ভর্তি হতে চাই",
      labelEn: "I want to enroll in the Debiganj IT Course",
      textBn: "মাননীয় পরিচালক, আমি দেবীগঞ্জ আইটি একাডেমিতে অত্যন্ত আনন্দের সাথে অ্যাডভান্সড কম্পিউটার অপারেটিং এবং ফ্রিল্যান্সিং কোর্সে ভর্তি হইতে ইচ্ছুক। অনুগ্রহ করিয়া আমার আবেদনটি মঞ্জুর করিবেন।",
      textEn: "Respected Director, I would like to join the Advanced Computer Operating and Outsourcing Course at Debiganj IT Academy. Please review and accept my admission application."
    },
    {
      labelBn: "একটি অফিশিয়াল ছুটির নোটিশ তৈরি করুন",
      labelEn: "Create an Official Holiday Notice",
      textBn: "জরুরি নোটিশ: পবিত্র ঈদ-উল-আজহা উপলক্ষে দেবীগঞ্জ আইটি ট্রেনিং সেন্টারের সকল শ্রেণী কার্যক্রম আগামী ২৫শে মে হইতে আগামী ৩০শে মে পর্যন্ত বন্ধ থাকিবে। আগামী ৩১শে মে রবিবার যথাসময়ে ক্লাস শুরু হইবে।",
      textEn: "Emergency Notice: On the auspicious occasion of Eid-ul-Adha, all active training sessions at Debiganj IT Center will remain closed from May 25 to May 30. Standard classes will resume on May 31."
    }
  ];

  // Initialize Speech Recognition API
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechApiSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = lang === 'bn' ? 'bn-BD' : 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          setTypedText(prev => prev + ' ' + finalTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [lang]);

  const toggleListening = () => {
    if (isSimulating) return;

    if (!speechApiSupported) {
      // Open simulated modal/panel if API not available
      setShowSimulatedOptions(true);
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.warn("Could not start real microphone - switching to interactive simulation", err);
        setShowSimulatedOptions(true);
      }
    }
  };

  // Run simulated voice typing (types character by character super fast to show the speed)
  const startSimulation = (phraseText: string) => {
    setShowSimulatedOptions(false);
    setIsSimulating(true);
    setTypedText('');
    setSimulatedStatus(lang === 'bn' ? '🎙️ আপনার কণ্ঠ সনাক্ত করা হচ্ছে...' : '🎙️ Calibrating voice inputs...');

    // Simulate speech detection waves first
    setTimeout(() => {
      setSimulatedStatus(lang === 'bn' ? '⚡ এআই ভয়েস টাইপিং হচ্ছে (গতি ১০০ WPM)...' : '⚡ AI Voice-typing live (100 WPM rate)...');
      let index = 0;
      const interval = setInterval(() => {
        if (index < phraseText.length) {
          // Add chunks or individual letters
          const step = phraseText.slice(0, index + 3);
          setTypedText(step);
          index += 3;
        } else {
          clearInterval(interval);
          setIsSimulating(false);
          setSimulatedStatus('');
        }
      }, 50);
    }, 1500);
  };

  return (
    <div id="voice-typing-container" className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6 max-w-4xl mx-auto">
      {/* Description header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold font-sans text-slate-900 flex items-center gap-2">
            <Mic className="w-6 h-6 text-emerald-600" />
            {lang === 'bn' ? 'স্মার্ট এআই ভয়েস টাইপিং ল্যাব' : 'Smart AI Voice Typing Lab'}
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-1">
            {lang === 'bn'
              ? 'কীবোর্ডে হাত না দিয়ে মুখে উচ্চারণ করে জাদুর মতো লিখুন! আমরা আধুনিক AI ডিকটেশন শেখাই।'
              : 'Write documents with your voice without touching a keyboard! Experience smart AI dictation training.'}
          </p>
        </div>
        <div className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
          🚀 {lang === 'bn' ? '১ ঘণ্টার টাইপিং কাজ মাত্র ৫ মিনিটে!' : 'Turn 1-hr of Typing into 5 mins!'}
        </div>
      </div>

      {/* Main Panel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Side: Voice controls and Equalizer */}
        <div className="md:col-span-5 flex flex-col justify-center items-center bg-slate-50 p-6 rounded-xl border border-slate-200 relative overflow-hidden">
          
          {/* Animated decorative glowing circles when active */}
          {(isListening || isSimulating) && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="absolute w-32 h-32 rounded-full bg-emerald-500/10 animate-ping"></span>
              <span className="absolute w-44 h-44 rounded-full bg-emerald-500/5 animate-pulse"></span>
            </div>
          )}

          {/* Microphone button */}
          <button
            onClick={toggleListening}
            className={`w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300 relative z-10 shadow-lg cursor-pointer ${
              isListening || isSimulating
                ? 'bg-red-500 text-white hover:bg-red-600 scale-105'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-200'
            }`}
          >
            {isListening || isSimulating ? (
              <>
                <Mic className="w-10 h-10 animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-wider mt-1">{lang === 'bn' ? 'রেকর্ড হচ্ছে' : 'Listening'}</span>
              </>
            ) : (
              <>
                <MicOff className="w-10 h-10" />
                <span className="text-[10px] uppercase font-bold tracking-wider mt-1">{lang === 'bn' ? 'কথা বলুন' : 'Speak Now'}</span>
              </>
            )}
          </button>

          {/* Equalizer animation bars */}
          <div className="flex items-end justify-center gap-1.5 h-10 mt-8 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(bar => {
              const animDuration = `${0.3 + bar * 0.1}s`;
              return (
                <div
                  key={bar}
                  style={{ animationDuration: (isListening || isSimulating) ? animDuration : '0s', height: (isListening || isSimulating) ? '100%' : '15%' }}
                  className={`w-1 rounded-t-full transition-all duration-300 ${isListening || isSimulating ? 'bg-emerald-500 animate-bounce' : 'bg-slate-300'}`}
                />
              );
            })}
          </div>

          <div className="text-center">
            <p className="text-xs font-semibold text-slate-700">
              {isListening 
                ? (lang === 'bn' ? 'কথা বলা শুরু করুন...' : 'Speak now...') 
                : isSimulating 
                  ? simulatedStatus 
                  : (lang === 'bn' ? 'মাইক্রোফোন অন করে কথা বলুন' : 'Click the mic & dictate words')}
            </p>
            <p className="text-[10px] text-slate-500 mt-1">
              {!speechApiSupported && (lang === 'bn' 
                ? 'আইফ্রেম সীমাবদ্ধতার কারণে ইমারসিভ ডেমো চালু হবে।' 
                : 'Interactive voice typing engine loaded.')}
            </p>
          </div>

          {/* Quick interactive mock options button */}
          <button
            onClick={() => setShowSimulatedOptions(true)}
            className="mt-6 text-xs text-emerald-700 hover:text-emerald-800 font-semibold underline flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {lang === 'bn' ? 'এআই দিয়ে জাদুর ডেমো দেখুন!' : 'Experience Instant Smart Demo!'}
          </button>
        </div>

        {/* Right Side: Recognized/Simulated output text block */}
        <div className="md:col-span-7 flex flex-col justify-between border border-slate-200 rounded-xl p-5 bg-slate-900 text-slate-100 min-h-[250px]">
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-widest font-sans">
                <FileText className="w-3.5 h-3.5" />
                {lang === 'bn' ? 'তাত্ক্ষণিক টাইপকৃত রিপোর্ট' : 'Live Transcript Output'}
              </span>
              <button
                onClick={() => setTypedText('')}
                className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white px-2 py-1 rounded transition-colors cursor-pointer"
              >
                {lang === 'bn' ? 'পরিষ্কার করুন' : 'Clear Output'}
              </button>
            </div>
            
            <p className="font-mono text-base leading-relaxed text-slate-300 min-h-[140px] whitespace-pre-wrap text-left">
              {typedText || (lang === 'bn' 
                ? 'মাইক্রোফোনে কথা বললে অথবা নিচের এআই ডেমো বাটনে ক্লিক করলে আপনার কথাগুলো এখানে সরাসরি কোনো ভুল ছাড়া টাইপ হতে থাকবে...' 
                : 'Speak through your microphone or choose the AI Magic Demo button to watch your words typed automatically with near zero lag...')}
            </p>
          </div>

          {/* Metrics comparison banner */}
          {typedText && (
            <div className="bg-emerald-950/80 border border-emerald-900 p-2.5 rounded-lg flex justify-between items-center text-xs text-emerald-300 font-sans mt-4">
              <span>⚡ {lang === 'bn' ? 'টাইপিং গতি:' : 'Typed speed:'} <strong>১১০ WPM (রকেট স্পিড)</strong></span>
              <span className="bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider">
                {lang === 'bn' ? 'এআই ম্যাজিক' : 'AI Enhanced'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive simulation phrases options panel */}
      {showSimulatedOptions && (
        <div className="mt-6 p-4 rounded-xl border border-amber-200 bg-amber-50/50 text-slate-800 animate-fade-in text-left">
          <div className="flex gap-2.5 items-start mb-3">
            <Volume2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                {lang === 'bn' ? 'ভয়েস ডিকটেশন ডেমো সিলেক্ট করুন' : 'Select a Voice Dictation Demo'}
              </h4>
              <p className="text-xs text-amber-700">
                {lang === 'bn' 
                  ? 'নিচের যেকোনো একটি বাক্যে ক্লিক করুন। এআই স্বয়ংক্রিয়ভাবে ভয়েস ইনপুট গ্রহণ করে টাইপ করে দেখাবে।' 
                  : 'Click any phrase below. The AI simulator will capture speech inputs and output document lines instantly.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {SIMULATED_PHRASES.map((phrase, i) => (
              <button
                key={i}
                onClick={() => startSimulation(lang === 'bn' ? phrase.textBn : phrase.textEn)}
                className="p-3 bg-white border border-slate-200 hover:border-emerald-500 rounded-lg hover:shadow-xs text-left text-xs font-sans transition-all group flex items-center justify-between cursor-pointer"
              >
                <span className="font-semibold text-slate-800 group-hover:text-emerald-800">
                  🗣️ "{lang === 'bn' ? phrase.labelBn : phrase.labelEn}"
                </span>
                <span className="bg-slate-100 group-hover:bg-emerald-100 text-slate-500 group-hover:text-emerald-800 p-1 rounded-full">
                  <Check className="w-3 h-3" />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Educational block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100 text-left font-sans text-xs">
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
            ১
          </div>
          <h5 className="font-bold text-slate-900">{lang === 'bn' ? 'মুখের আওয়াজে নিখুঁত লেখা' : 'Voice-to-Text Precision'}</h5>
          <p className="text-slate-500 leading-relaxed">
            {lang === 'bn' 
              ? 'বাংলা যুক্তবর্ণ বা জটিল ইংরেজি কোনো ঝামেলা ছাড়াই নিখুঁতভাবে টাইপ করা সম্ভব কোনো টাইপিং নলেজ ছাড়াই।'
              : 'Dictate complex Bengali letters and conjuncts flawlessly without memorizing complex physical layouts.'}
          </p>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
            ২
          </div>
          <h5 className="font-bold text-slate-900">{lang === 'bn' ? 'এআই প্রম্পট ব্যবহারের সুবিধা' : 'AI-Enhanced Auto Formatting'}</h5>
          <p className="text-slate-500 leading-relaxed">
            {lang === 'bn' 
              ? 'ভয়েস টাইপকৃত খসড়া লেখাকে এআই (যেমন চ্যাটজিপিটি বা জেমিনি) দিয়ে মুহূর্তে ফরমাল চিঠির রূপ দেওয়া যায়।'
              : 'Pass the draft voice transcript to AI engines (Gemini) to format, correct spelling, and style as official documents.'}
          </p>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
            ৩
          </div>
          <h5 className="font-bold text-slate-900">{lang === 'bn' ? 'টাইপিংয়ের সময় ১০ গুণ বাঁচবে' : 'Save 90% of Office Worktime'}</h5>
          <p className="text-slate-500 leading-relaxed">
            {lang === 'bn' 
              ? 'অফিসিয়াল অ্যাপ্লিকেশন, ইমেইল বা চুক্তিনামা রেডি করতে আগে ঘণ্টার পর ঘণ্টা লাগত, এখন লাগবে মাত্র কয়েক মিনিট।'
              : 'Save hours when compiling multi-page reports, books, or legal drafts. Simply speak and review.'}
          </p>
        </div>
      </div>
    </div>
  );
}

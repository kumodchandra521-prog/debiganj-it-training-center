import React, { useState } from 'react';
import { ShieldCheck, HelpCircle, AlertCircle, Clock, Zap, BookOpen, GraduationCap, Laptop, Sparkles } from 'lucide-react';

interface WhyUsProps {
  lang: 'bn' | 'en';
}

export default function WhyUs({ lang }: WhyUsProps) {
  const [typedMinutes, setTypedMinutes] = useState(60);

  // Calculate AI speed comparison
  const aiMinutes = Math.max(1, Math.round(typedMinutes / 12));

  return (
    <div id="why-us-section" className="space-y-8 max-w-4xl mx-auto">
      
      {/* Visual Title Header */}
      <div className="text-center space-y-2">
        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
          {lang === 'bn' ? 'ডিফারেন্ট মেথডোলজি' : 'WHY WE ARE DIFFERENT'}
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
          {lang === 'bn' ? 'কেন দেবীগঞ্জ আইটি সেরা প্রশিক্ষণ কেন্দ্র?' : 'Why is Debiganj IT Academy Different?'}
        </h2>
        <p className="text-sm text-slate-500 max-w-xl mx-auto font-sans">
          {lang === 'bn'
            ? 'আমরা শুধু সার্টিফিকেট বিক্রির জন্য নয়, বরং অফিসে বাস্তব কাজের উপযোগী দক্ষ জনবল তৈরি করতে ল্যাবে প্রতিটি ক্লাস ডিজাইন করেছি।'
            : 'We focus strictly on job preparedness and international freelance skill sets rather than selling dry paper certificates.'}
        </p>
      </div>

      {/* Speed Slider comparison: "1 Hour vs 5 Minutes" */}
      <div className="bg-gradient-to-tr from-slate-900 to-slate-800 rounded-2xl p-6 text-white text-left relative overflow-hidden shadow-lg border border-slate-700">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
          <h3 className="text-base font-bold text-emerald-400 uppercase tracking-widest font-sans">
            {lang === 'bn' ? 'এআই ও ভয়েস টাইপিংয়ের বৈপ্লবিক গতি' : 'The AI & Voice-Typing Revolution'}
          </h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-sans max-w-2xl mb-6">
          {lang === 'bn'
            ? 'আগে যে দীর্ঘ ডকুমেন্ট বা নোটিশ টাইপ করতে এক ঘণ্টা বা তারও বেশি সময় লাগত, এখন আমাদের একাডেমিতে শেখানো ভয়েস ডিকটেশন ও এআই প্রম্পটিং টুলের সাহায্যে সেই কাজ সেকেন্ডেই করা যায়!'
            : 'Tasks that used to require over an hour of continuous keyboard grinding can now be completed in minutes using voice typing and automated prompt scaffolding.'}
        </p>

        {/* Dynamic Interactive comparison tool */}
        <div className="space-y-4 bg-slate-800/80 p-5 rounded-xl border border-slate-700/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-300 font-sans">
              {lang === 'bn' ? 'প্রচলিত টাইপিং সময় নির্ধারণ করুন:' : 'Adjust traditional typing duration:'}
            </span>
            <span className="text-sm font-bold text-white font-mono bg-slate-700 px-2 py-0.5 rounded">
              {typedMinutes} {lang === 'bn' ? 'মিনিট (১ ঘণ্টা)' : 'Minutes'}
            </span>
          </div>

          <input
            type="range"
            min="10"
            max="120"
            step="10"
            value={typedMinutes}
            onChange={(e) => setTypedMinutes(parseInt(e.target.value))}
            className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-700/50">
            {/* Traditional way */}
            <div className="flex items-start gap-3 bg-red-950/20 p-3 rounded-lg border border-red-900/30">
              <Clock className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-red-400 font-sans">{lang === 'bn' ? 'সাধারণ পুরাতন পদ্ধতিতে:' : 'Old Manual Method:'}</h4>
                <p className="text-xl font-black text-slate-100 font-mono mt-1">{typedMinutes} <span className="text-xs font-normal text-slate-400">Min</span></p>
                <p className="text-[10px] text-slate-400 font-sans mt-1">{lang === 'bn' ? 'কীবোর্ড চেপে চেপে ক্লান্তিকর কাজ' : 'Manual key tapping fatigue'}</p>
              </div>
            </div>

            {/* AI Voice Method */}
            <div className="flex items-start gap-3 bg-emerald-950/40 p-3 rounded-lg border border-emerald-900/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[8px] font-bold px-2 py-0.5 uppercase rounded-bl font-sans">
                {lang === 'bn' ? '১২গুণ দ্রুত!' : '12x Faster'}
              </div>
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 animate-bounce" />
              <div>
                <h4 className="text-xs font-bold text-emerald-400 font-sans">{lang === 'bn' ? 'আমাদের ভয়েস ও এআই পদ্ধতিতে:' : 'Debiganj IT Smart AI Method:'}</h4>
                <p className="text-xl font-black text-white font-mono mt-1">{aiMinutes} <span className="text-xs font-normal text-slate-400">Min</span></p>
                <p className="text-[10px] text-emerald-300 font-sans mt-1">
                  {lang === 'bn' ? 'মুখে বলবেন, নির্ভুলভাবে লিখে দেবে এআই!' : 'Just dictate naturally, AI types instantly!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
        
        {/* Box 1: Other standard institutes */}
        <div className="border border-slate-200 bg-white p-5 rounded-2xl text-left space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">
              {lang === 'bn' ? 'অন্যান্য সাধারণ আইটি সেন্টার' : 'Other Conventional Institutes'}
            </h4>
          </div>

          <ul className="space-y-3 text-xs text-slate-600">
            <li className="flex gap-2.5 items-start">
              <span className="text-red-500 font-bold shrink-0">❌</span>
              <span>{lang === 'bn' ? 'শুধু পরীক্ষার জন্য মুখস্থ থিওরি শিক্ষা দেওয়া হয়।' : 'Dry board-lectures aimed strictly at writing multiple choice tests.'}</span>
            </li>
            <li className="flex gap-2.5 items-start">
              <span className="text-red-500 font-bold shrink-0">❌</span>
              <span>{lang === 'bn' ? 'অফিসের বাস্তব আবেদন, বিল বা রিপোর্ট তৈরির কোনো আইডিয়া দেওয়া হয় না।' : 'Students get zero exposure to standard templates, scanning, or filing procedures.'}</span>
            </li>
            <li className="flex gap-2.5 items-start">
              <span className="text-red-500 font-bold shrink-0">❌</span>
              <span>{lang === 'bn' ? 'টাইপিংয়ের গতি বাড়ানোর কোনো আধুনিক টেকনিক বা ভয়েস টাইপিং শেখানো হয় না।' : 'No speed touch-typing lessons, resulting in slow typing speeds of under 15 WPM.'}</span>
            </li>
            <li className="flex gap-2.5 items-start">
              <span className="text-red-500 font-bold shrink-0">❌</span>
              <span>{lang === 'bn' ? 'কোর্স শেষে মার্কেটপ্লেসে কীভাবে ডলার উপার্জন করবেন তার গাইডলাইন থাকে না।' : 'Zero active coaching on bidding, client call handling, or Upwork navigation.'}</span>
            </li>
          </ul>
        </div>

        {/* Box 2: DebiGanj IT Academy */}
        <div className="border border-emerald-200 bg-emerald-50/20 p-5 rounded-2xl text-left space-y-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] font-sans font-bold px-3 py-1 uppercase rounded-bl tracking-wider animate-pulse">
            {lang === 'bn' ? 'আমাদের বৈশিষ্ট্য' : 'RECOMMENDED'}
          </div>
          <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-100">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-emerald-900 text-sm">
              {lang === 'bn' ? 'দেবীগঞ্জ আইটি একাডেমি' : 'Debiganj IT Academy'}
            </h4>
          </div>

          <ul className="space-y-3 text-xs text-slate-700">
            <li className="flex gap-2.5 items-start">
              <span className="text-emerald-600 font-bold shrink-0">✅</span>
              <span><strong>{lang === 'bn' ? '১০০% হাতে-কলমে প্রশিক্ষণ:' : '100% Practical:'}</strong> {lang === 'bn' ? 'প্রতিটি ক্লাসে বাস্তব কম্পিউটার দিয়ে প্র্যাক্টিক্যাল কাজ।' : 'Every concept is taught live on high-end desktop nodes.'}</span>
            </li>
            <li className="flex gap-2.5 items-start">
              <span className="text-emerald-600 font-bold shrink-0">✅</span>
              <span><strong>{lang === 'bn' ? 'অফিস প্রজেক্ট ভিত্তিক শিক্ষা:' : 'Office Simulation:'}</strong> {lang === 'bn' ? 'বাস্তব রিপোর্টিং, স্যালারি হিসাব এবং ফাইল প্রিন্টিং হাতে কলমে।' : 'Design letters, compute ledgers, scan certificates, and setup routers.'}</span>
            </li>
            <li className="flex gap-2.5 items-start">
              <span className="text-emerald-600 font-bold shrink-0">✅</span>
              <span><strong>{lang === 'bn' ? 'স্মার্ট ভয়েস ও এআই টাইপিং:' : 'Voice Typing & AI Tools:'}</strong> {lang === 'bn' ? 'টাইপিং মুখস্থ করার ঝামেলা ছাড়াই মুখে বলেই রকেটের গতিতে ডকুমেন্ট রেডি।' : 'Voice dictate Bangla and use ChatGPT/Gemini to clean transcripts.'}</span>
            </li>
            <li className="flex gap-2.5 items-start">
              <span className="text-emerald-600 font-bold shrink-0">✅</span>
              <span><strong>{lang === 'bn' ? 'লাইফটাইম সাপোর্ট ও পোর্টফোলিও:' : 'Lifetime Mentoring:'}</strong> {lang === 'bn' ? 'কোর্স শেষে ফ্রিল্যান্সিং করতে যত সাহায্য লাগবে সব আজীবন পাবেন।' : 'Lifetime membership to our freelance groups and agency hiring networks.'}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Trust credentials metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-center font-sans">
        <div className="p-3">
          <div className="text-2xl font-black text-emerald-700">৩৫০+</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">{lang === 'bn' ? 'সফল ছাত্রছাত্রী' : 'Graduated Students'}</div>
        </div>
        <div className="p-3">
          <div className="text-2xl font-black text-emerald-700">৯+</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">{lang === 'bn' ? 'আধুনিক কোর্স' : 'Modern Courses'}</div>
        </div>
        <div className="p-3">
          <div className="text-2xl font-black text-emerald-700">১০০%</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">{lang === 'bn' ? 'ব্যবহারিক কাজ' : 'Practical Classes'}</div>
        </div>
        <div className="p-3">
          <div className="text-2xl font-black text-emerald-700">২৪/৭</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">{lang === 'bn' ? 'হেল্প গ্রুপ সাপোর্ট' : 'Online Mentorship'}</div>
        </div>
      </div>
    </div>
  );
}

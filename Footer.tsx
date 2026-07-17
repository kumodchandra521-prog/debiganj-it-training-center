import React from 'react';
import { GraduationCap, MapPin, Phone, Mail, Clock, ShieldCheck, Heart, Award, Facebook, Youtube } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  lang: 'bn' | 'en';
}

export default function Footer({ setCurrentTab, lang }: FooterProps) {
  return (
    <footer id="app-footer" className="bg-slate-900 text-slate-300 mt-16 border-t-4 border-emerald-600 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Info Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white tracking-tight">
                {lang === 'bn' ? 'দেবীগঞ্জ আইটি' : 'Debiganj IT Academy'}
              </h4>
              <p className="text-xs text-slate-400">
                {lang === 'bn' ? 'কম্পিউটার ও ফ্রিল্যান্সিং ইনস্টিটিউট' : 'Computer & Freelancing Training'}
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            {lang === 'bn' 
              ? 'দেবীগঞ্জ পঞ্চগড়ের প্রথম ও একমাত্র সর্বাধুনিক প্রযুক্তিসমৃদ্ধ আইটি ল্যাব যেখানে অভিজ্ঞ মেন্টরের অধীনে সরাসরি হাতে-কলমে এবং আধুনিক এআই টুলের মাধ্যমে প্রফেশনাল কাজ শেখানো হয়।'
              : 'The first and finest modern IT training laboratory in Debiganj, Panchagarh, providing hands-on project training guided by experienced mentors and AI automation.'}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              referrerPolicy="no-referrer" 
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-emerald-600 flex items-center justify-center transition-all"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              referrerPolicy="no-referrer" 
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-red-600 flex items-center justify-center transition-all"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
            {lang === 'bn' ? 'কুইক লিংকস' : 'Quick Links'}
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button onClick={() => setCurrentTab('home')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                {lang === 'bn' ? 'আমাদের হোমপেজ' : 'Homepage'}
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('courses')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                {lang === 'bn' ? 'সকল কোর্সের তালিকা' : 'Offered Courses'}
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('lab')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                {lang === 'bn' ? 'লাইভ প্র্যাকটিস ল্যাব' : 'Live Practice Lab'}
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('whyus')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                {lang === 'bn' ? 'কেন দেবীগঞ্জ আইটি সেরা?' : 'Why Choose Us'}
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('admission')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left font-semibold text-emerald-400">
                {lang === 'bn' ? 'অনলাইন এডমিশন ডেক্স' : 'Online Registration'}
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
            {lang === 'bn' ? 'যোগাযোগ ও ঠিকানা' : 'Contact Us'}
          </h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex gap-2">
              <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>
                {lang === 'bn' 
                  ? 'ইউসিবি ব্যাংক সংলগ্ন (২য় তলা), সোনালী ব্যাংক রোড, দেবীগঞ্জ পৌরসভা, পঞ্চগড়, বাংলাদেশ।'
                  : 'Adjacent to UCB Bank (2nd Floor), Sonali Bank Road, Debiganj Municipality, Panchagarh, Bangladesh.'}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-500" />
              <span>+৮৮০ ১৭৫৩-XXXXXX, +৮৮০ ১৯১২-XXXXXX</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-500" />
              <span>info@debiganjit.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'bn' ? 'প্রতিদিন সকাল ৯:০০ - রাত ৮:০০ (শুক্রবার বন্ধ)' : 'Daily 9:00 AM - 8:00 PM (Friday Closed)'}</span>
            </li>
          </ul>
        </div>

        {/* Features Card / Trust elements */}
        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 space-y-4">
          <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
            {lang === 'bn' ? 'আমাদের প্রতিশ্রুতি' : 'OUR GUARANTEE'}
          </h4>
          <div className="flex gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            <p className="text-xs text-slate-300">
              {lang === 'bn'
                ? 'আমরা শুধু থিওরি নয়, শতভাগ প্র্যাক্টিক্যাল ক্লাসের মাধ্যমে বাস্তব কাজের দক্ষ করে গড়ে তুলি।'
                : 'We guarantee 100% real hands-on task management instead of dry chalkboard memorization.'}
            </p>
          </div>
          <div className="flex gap-2">
            <Award className="w-5 h-5 text-emerald-500 shrink-0" />
            <p className="text-xs text-slate-300">
              {lang === 'bn'
                ? 'সফলভাবে কোর্স সমাপ্তির পর প্রফেশনাল সার্টিফিকেট এবং ফ্রিল্যান্সিং লাইফটাইম সাপোর্ট।'
                : 'Professional certificate on completion, and lifetime freelancing mentorship group access.'}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Legal micro line */}
      <div className="bg-slate-950 text-slate-500 text-xs py-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            &copy; {new Date().getFullYear()} {lang === 'bn' ? 'দেবীগঞ্জ আইটি একাডেমি' : 'Debiganj IT Academy'}. {lang === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All Rights Reserved.'}
          </div>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span>{lang === 'bn' ? 'কারিগরি শিক্ষার বিশ্বস্ত প্রতিষ্ঠান' : 'Empowering Local Youth with Skills'}</span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1 text-emerald-500">
              Made with <Heart className="w-3 h-3 fill-emerald-500" /> in Debiganj
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

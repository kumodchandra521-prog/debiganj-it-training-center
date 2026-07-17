import React, { useState, useEffect } from 'react';
import { StudentRegistration } from '../types';
import { COURSES_DATA } from '../data/courses';
import { BookOpen, User, Phone, MapPin, CheckCircle2, Download, Printer, Users, Key, Search, Trash2, Check, RefreshCw } from 'lucide-react';

interface AdmissionFormProps {
  lang: 'bn' | 'en';
  onAdmissionAdded: () => void;
}

export default function AdmissionForm({ lang, onAdmissionAdded }: AdmissionFormProps) {
  // Main state
  const [admissions, setAdmissions] = useState<StudentRegistration[]>([]);
  const [activeReceipt, setActiveReceipt] = useState<StudentRegistration | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('Male');
  const [selectedCourseId, setSelectedCourseId] = useState(COURSES_DATA[0].id);

  // Admin/Director Panel states
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Load existing registrations from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('debiganj_it_admissions');
    if (saved) {
      setAdmissions(JSON.parse(saved));
    }
  }, []);

  // Save/Synchronize to localStorage
  const saveAdmissions = (updated: StudentRegistration[]) => {
    setAdmissions(updated);
    localStorage.setItem('debiganj_it_admissions', JSON.stringify(updated));
    onAdmissionAdded();
  };

  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;

    const course = COURSES_DATA.find(c => c.id === selectedCourseId) || COURSES_DATA[0];
    const generatedRoll = `DG-${100 + admissions.length + 1}`;

    const newReg: StudentRegistration = {
      id: `reg-${Date.now()}`,
      name,
      fatherName,
      phone,
      email,
      address,
      gender,
      courseId: selectedCourseId,
      courseNameBn: course.titleBn,
      regDate: new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US'),
      rollNumber: generatedRoll,
      status: 'Pending',
      paymentStatus: 'Pending'
    };

    const updated = [newReg, ...admissions];
    saveAdmissions(updated);

    // Show the receipt
    setActiveReceipt(newReg);

    // Reset Form fields
    setName('');
    setFatherName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setGender('Male');
  };

  // Admin Auth Handler
  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123') {
      setIsAuthorized(true);
      setErrorMsg('');
    } else {
      setErrorMsg(lang === 'bn' ? 'ভুল পাসকোড! অনুগ্রহ করে "admin123" ব্যবহার করুন।' : 'Invalid Passcode! Please use "admin123".');
    }
  };

  // Status changers
  const toggleStatus = (id: string) => {
    const updated = admissions.map(adm => {
      if (adm.id === id) {
        const nextStatus = adm.status === 'Pending' ? 'Approved' : 'Pending';
        return { ...adm, status: nextStatus };
      }
      return adm;
    });
    saveAdmissions(updated);
  };

  const togglePayment = (id: string) => {
    const updated = admissions.map(adm => {
      if (adm.id === id) {
        const nextPay = adm.paymentStatus === 'Pending' ? 'Paid' : 'Pending';
        return { ...adm, paymentStatus: nextPay };
      }
      return adm;
    });
    saveAdmissions(updated);
  };

  const handleDeleteRegistration = (id: string) => {
    if (window.confirm(lang === 'bn' ? 'আপনি কি নিশ্চিতভাবে এই ডাটাটি ডিলিট করতে চান?' : 'Are you sure you want to delete this applicant record?')) {
      const updated = admissions.filter(adm => adm.id !== id);
      saveAdmissions(updated);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Filtered registrations based on query
  const filteredAdmissions = admissions.filter(adm => 
    adm.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    adm.phone.includes(searchQuery) ||
    adm.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="admission-portal-container" className="max-w-4xl mx-auto space-y-8 font-sans">
      
      {/* Title block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
        <div className="text-left">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-emerald-600" />
            {lang === 'bn' ? 'অনলাইন ভর্তি ফরম ও ডেক্স' : 'Online Admission Desk'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {lang === 'bn' 
              ? 'নিচের ফরমটি পূরণ করে আপনার আসন বুক করুন। সফলভাবে সাবমিটের পর প্রিন্ট কপি সংগ্রহ করুন।' 
              : 'Complete your booking now. A formal admission receipt card will be generated for download.'}
          </p>
        </div>

        {/* Administrator portal switch */}
        <button
          onClick={() => {
            setIsAdminMode(!isAdminMode);
            setIsAuthorized(false);
            setPasscode('');
            setErrorMsg('');
          }}
          className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition-all cursor-pointer"
        >
          <Key className="w-3.5 h-3.5" />
          {isAdminMode 
            ? (lang === 'bn' ? 'ভর্তি ফরমে ফিরুন' : 'Back to Form') 
            : (lang === 'bn' ? 'পরিচালক প্যানেল (Admin)' : 'Director Panel')}
        </button>
      </div>

      {/* RENDER ACTIVE PRINTABLE RECEIPT CARD OVERLAY */}
      {activeReceipt && (
        <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-6 text-left relative animate-fade-in shadow-lg">
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handlePrint}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              {lang === 'bn' ? 'প্রিন্ট করুন' : 'Print Slip'}
            </button>
            <button
              onClick={() => setActiveReceipt(null)}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer"
            >
              {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
            </button>
          </div>

          <div id="printable-receipt" className="bg-white border border-emerald-100 rounded-xl p-6 shadow-sm space-y-6">
            {/* Stamp & Branding */}
            <div className="flex justify-between items-start border-b border-dashed border-emerald-200 pb-4">
              <div className="space-y-1">
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest font-mono">
                  Official Admission Slip
                </span>
                <h3 className="text-lg font-black text-slate-900 leading-none">
                  {lang === 'bn' ? 'দেবীগঞ্জ আইটি একাডেমি' : 'Debiganj IT Academy'}
                </h3>
                <p className="text-[10px] text-slate-500">ইউসিবি ব্যাংক সংলগ্ন (২য় তলা), সোনালী ব্যাংক রোড, দেবীগঞ্জ</p>
              </div>
              <div className="border-4 border-double border-emerald-600/30 text-emerald-600/60 font-black text-xs px-2 py-1 rounded rotate-12 tracking-widest uppercase select-none">
                {lang === 'bn' ? 'বুকড্' : 'BOOKED'}
              </div>
            </div>

            {/* Receipt details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="space-y-1.5">
                <div className="text-slate-400 font-medium">{lang === 'bn' ? 'ছাত্র/ছাত্রীর নাম:' : 'Student Name:'}</div>
                <div className="text-slate-900 font-bold text-sm bg-slate-50 p-2 rounded border border-slate-100">{activeReceipt.name}</div>
              </div>
              <div className="space-y-1.5">
                <div className="text-slate-400 font-medium">{lang === 'bn' ? 'পিতার নাম:' : 'Father Name:'}</div>
                <div className="text-slate-900 font-semibold bg-slate-50 p-2 rounded border border-slate-100">{activeReceipt.fatherName}</div>
              </div>
              <div className="space-y-1.5">
                <div className="text-slate-400 font-medium">{lang === 'bn' ? 'মোবাইল নাম্বার:' : 'Phone Number:'}</div>
                <div className="text-slate-900 font-bold bg-slate-50 p-2 rounded border border-slate-100">{activeReceipt.phone}</div>
              </div>
              <div className="space-y-1.5">
                <div className="text-slate-400 font-medium">{lang === 'bn' ? 'নির্বাচিত কোর্স:' : 'Selected Course:'}</div>
                <div className="text-emerald-800 font-bold bg-emerald-50 p-2 rounded border border-emerald-100">{activeReceipt.courseNameBn}</div>
              </div>
            </div>

            {/* Official Registration details bar */}
            <div className="grid grid-cols-3 gap-2 text-center bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono text-[11px]">
              <div>
                <span className="block text-slate-400 text-[9px] uppercase font-bold tracking-wider">{lang === 'bn' ? 'রোল নাম্বার' : 'Roll Number'}</span>
                <span className="font-extrabold text-slate-900">{activeReceipt.rollNumber}</span>
              </div>
              <div>
                <span className="block text-slate-400 text-[9px] uppercase font-bold tracking-wider">{lang === 'bn' ? 'ভর্তির তারিখ' : 'Registration Date'}</span>
                <span className="font-semibold text-slate-800">{activeReceipt.regDate}</span>
              </div>
              <div>
                <span className="block text-slate-400 text-[9px] uppercase font-bold tracking-wider">{lang === 'bn' ? 'ভর্তি স্ট্যাটাস' : 'Status'}</span>
                <span className="bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded-full text-[9px]">
                  {activeReceipt.status}
                </span>
              </div>
            </div>

            {/* Fees and conditions */}
            <div className="bg-slate-50 p-3.5 rounded-lg space-y-2 border border-slate-100">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-600">{lang === 'bn' ? 'কোর্সের মোট ফিস:' : 'Course Fee Balance:'}</span>
                <span className="text-slate-900 font-mono">
                  ৳{COURSES_DATA.find(c => c.id === activeReceipt.courseId)?.fee || 0}/-
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-red-600 font-bold border-t border-slate-200 pt-2">
                <span>{lang === 'bn' ? 'অফিস নিশ্চিতকরণ বাকি:' : 'Due to Confirm:'}</span>
                <span className="font-mono">{lang === 'bn' ? 'ভর্তি কনফার্ম করতে অফিসে যোগাযোগ করুন' : 'Visit Center to pay'}</span>
              </div>
            </div>

            {/* Disclaimer & signatures */}
            <div className="pt-6 border-t border-dashed border-slate-200 text-[10px] text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-left leading-normal max-w-sm">
                * {lang === 'bn' 
                  ? 'এই কপিটি প্রিন্ট করুন অথবা স্ক্রিনশট দিয়ে অফিসে নিয়ে আসুন। আপনার সিট সাময়িকভাবে বরাদ্দ করা হয়েছে।' 
                  : 'Bring a printed copy or screenshot of this slip to the office to confirm registration classes.'}
              </p>
              <div className="border-t border-slate-300 pt-2 px-6 font-semibold uppercase text-slate-600 tracking-wider">
                {lang === 'bn' ? 'পরিচালকের স্বাক্ষর' : 'Authorized Sign'}
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ADMIN CONTROL PANEL VIEW */}
      {isAdminMode ? (
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 text-left border border-slate-800 space-y-6">
          {!isAuthorized ? (
            /* Authorization passcode blocker */
            <form onSubmit={handleAdminAuth} className="max-w-md mx-auto space-y-4 py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-600/10 text-emerald-500 flex items-center justify-center mx-auto mb-2">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">
                {lang === 'bn' ? 'পরিচালক সিকিউরিটি ভেরিফিকেশন' : 'Director Verification Required'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'bn' 
                  ? 'আবেদনকারীদের তালিকা দেখতে অনুগ্রহ করে পরিচালক পাসকোড লিখুন।' 
                  : 'Enter the center passkey to review student admissions.'}
              </p>
              <div className="space-y-1 text-left">
                <input
                  type="password"
                  required
                  placeholder={lang === 'bn' ? 'এখানে পাসকোড লিখুন (যেমন: admin123)' : 'Enter password (admin123)'}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-slate-800 text-slate-100 border border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-center text-sm"
                />
                {errorMsg && <p className="text-xs text-red-400 text-center font-semibold mt-1">{errorMsg}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-sm transition-all shadow-md cursor-pointer"
              >
                {lang === 'bn' ? 'লগইন করুন' : 'Unlock Portal'}
              </button>
            </form>
          ) : (
            /* Authorized Admin Workspace Dashboard */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                    <Users className="w-5 h-5 text-emerald-400" />
                    {lang === 'bn' ? 'শিক্ষার্থী তালিকা ও আবেদনপত্র' : 'Registrations Ledger'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {lang === 'bn' ? `মোট আবেদন সংখ্যা: ${admissions.length} টি` : `Total registrations: ${admissions.length} items`}
                  </p>
                </div>

                {/* Search query box */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder={lang === 'bn' ? 'নাম, ফোন বা রোল নাম্বার...' : 'Search by name, phone...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-800 text-xs border border-slate-700 rounded-lg pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 text-slate-100 font-sans"
                  />
                </div>
              </div>

              {/* Table ledger */}
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
                <div className="overflow-x-auto">
                  {filteredAdmissions.length === 0 ? (
                    <div className="p-12 text-center text-slate-500 text-xs">
                      {lang === 'bn' ? 'কোনো আবেদনপত্র খুঁজে পাওয়া যায়নি।' : 'No records match search criterion.'}
                    </div>
                  ) : (
                    <table className="w-full text-xs text-left text-slate-300">
                      <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold">
                        <tr>
                          <th className="py-3 px-4">{lang === 'bn' ? 'রোল' : 'Roll'}</th>
                          <th className="py-3 px-4">{lang === 'bn' ? 'শিক্ষার্থীর নাম ও ফোন' : 'Name & Contact'}</th>
                          <th className="py-3 px-4">{lang === 'bn' ? 'কোর্স' : 'Course'}</th>
                          <th className="py-3 px-4 text-center">{lang === 'bn' ? 'ভর্তি স্ট্যাটাস' : 'Admission Status'}</th>
                          <th className="py-3 px-4 text-center">{lang === 'bn' ? 'পেমেন্ট' : 'Payment'}</th>
                          <th className="py-3 px-4 text-center"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-sans">
                        {filteredAdmissions.map((adm) => (
                          <tr key={adm.id} className="hover:bg-slate-900/50 transition-colors">
                            <td className="py-3 px-4 font-mono font-bold text-emerald-400">{adm.rollNumber}</td>
                            <td className="py-3 px-4">
                              <div className="font-semibold text-white">{adm.name}</div>
                              <div className="text-[10px] text-slate-400 font-mono mt-0.5">{adm.phone}</div>
                              <div className="text-[10px] text-slate-500">{adm.address}</div>
                            </td>
                            <td className="py-3 px-4 text-slate-300 text-[11px]">{adm.courseNameBn}</td>
                            
                            {/* Toggleable Admission Status */}
                            <td className="py-3 px-4 text-center">
                              <button
                                onClick={() => toggleStatus(adm.id)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                                  adm.status === 'Approved'
                                    ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-800'
                                    : 'bg-amber-900/60 text-amber-300 border border-amber-800 animate-pulse'
                                }`}
                              >
                                {adm.status === 'Approved' ? (lang === 'bn' ? 'অ্যাপ্রুভড্' : 'Approved') : (lang === 'bn' ? 'পেন্ডিং' : 'Pending')}
                              </button>
                            </td>

                            {/* Toggleable Payment Status */}
                            <td className="py-3 px-4 text-center">
                              <button
                                onClick={() => togglePayment(adm.id)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                                  adm.paymentStatus === 'Paid'
                                    ? 'bg-blue-900/80 text-blue-300 border border-blue-800'
                                    : 'bg-red-900/60 text-red-300 border border-red-800'
                                }`}
                              >
                                {adm.paymentStatus === 'Paid' ? (lang === 'bn' ? 'পরিশোধিত' : 'Paid') : (lang === 'bn' ? 'বকেয়া' : 'Pending')}
                              </button>
                            </td>

                            {/* Actions column */}
                            <td className="py-3 px-4 text-center space-x-2">
                              <button
                                onClick={() => setActiveReceipt(adm)}
                                className="p-1 hover:text-emerald-400 text-slate-500 transition-colors cursor-pointer"
                                title={lang === 'bn' ? 'রসিদ দেখুন' : 'View receipt'}
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteRegistration(adm.id)}
                                className="p-1 hover:text-red-500 text-slate-500 transition-colors cursor-pointer"
                                title={lang === 'bn' ? 'মুছে ফেলুন' : 'Delete record'}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* STANDARD PUBLIC ADMISSION FORM */
        <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6 text-left">
          <form onSubmit={handleAdmissionSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div className="space-y-1 text-left">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                {lang === 'bn' ? 'শিক্ষার্থীর পূর্ণ নাম (বাংলা অথবা ইংরেজি) *' : 'Student Full Name *'}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder={lang === 'bn' ? 'যেমন: হাসিবুল হাসান সুজন' : 'e.g. Hasibul Hasan'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 text-slate-800 font-sans"
                />
              </div>
            </div>

            {/* Father's Name */}
            <div className="space-y-1 text-left">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                {lang === 'bn' ? 'পিতা অথবা অভিভাবকের নাম *' : 'Father / Guardian Name *'}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder={lang === 'bn' ? 'যেমন: মৃত আব্দুল মজিদ' : 'e.g. Late Abdul Majid'}
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 text-slate-800 font-sans"
                />
              </div>
            </div>

            {/* Mobile Phone Number */}
            <div className="space-y-1 text-left">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                {lang === 'bn' ? 'সচল মোবাইল নাম্বার *' : 'Active Mobile Phone Number *'}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  required
                  pattern="[0-9+]{11,14}"
                  placeholder={lang === 'bn' ? 'যেমন: ০১৭৫৩-xxxxxx' : 'e.g. 01753xxxxxx'}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 text-slate-800 font-mono"
                />
              </div>
            </div>

            {/* Email Address (Optional) */}
            <div className="space-y-1 text-left">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                {lang === 'bn' ? 'ইমেইল এড্রেস (ঐচ্ছিক)' : 'Email Address (Optional)'}
              </label>
              <input
                type="email"
                placeholder="e.g. student@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 text-slate-800 font-sans"
              />
            </div>

            {/* Present Address */}
            <div className="space-y-1 text-left md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                {lang === 'bn' ? 'বর্তমান ঠিকানা (গ্রাম, থানা, জেলা) *' : 'Present Address *'}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder={lang === 'bn' ? 'যেমন: দেবদারুতলা, দেবীগঞ্জ, পঞ্চগড়।' : 'e.g. Debiganj, Panchagarh.'}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 text-slate-800 font-sans"
                />
              </div>
            </div>

            {/* Course Selector Dropdown */}
            <div className="space-y-1 text-left">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                {lang === 'bn' ? 'ভর্তি হতে ইচ্ছুক কোর্সটি সিলেক্ট করুন *' : 'Choose Course to Enroll *'}
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 text-slate-800 font-sans cursor-pointer"
              >
                {COURSES_DATA.map(course => (
                  <option key={course.id} value={course.id}>
                    {lang === 'bn' ? `${course.titleBn} (৳${course.fee}/-)` : `${course.titleEn} (৳${course.fee}/-)`}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender Switch */}
            <div className="space-y-1 text-left">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                {lang === 'bn' ? 'লিঙ্গ *' : 'Gender *'}
              </label>
              <div className="flex gap-4">
                {['Male', 'Female'].map(g => (
                  <label key={g} className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={gender === g}
                      onChange={() => setGender(g)}
                      className="accent-emerald-600 w-4 h-4"
                    />
                    {lang === 'bn' ? (g === 'Male' ? 'পুরুষ' : 'মহিলা') : g}
                  </label>
                ))}
              </div>
            </div>

            {/* Submit button */}
            <div className="md:col-span-2 pt-4">
              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-md hover:bg-emerald-700 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <CheckCircle2 className="w-5 h-5" />
                {lang === 'bn' ? 'ভর্তি ফরম সাবমিট করুন' : 'Confirm & Request Registration'}
              </button>
            </div>

          </form>
        </div>
      )}
    </div>
  );
}

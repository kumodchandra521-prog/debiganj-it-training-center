import React, { useState, useEffect } from 'react';
import { ExcelRow } from '../types';
import { FileSpreadsheet, Plus, Trash2, Calculator, Sparkles, HelpCircle, Check, AlertCircle } from 'lucide-react';

interface ExcelLabProps {
  lang: 'bn' | 'en';
}

export default function ExcelLab({ lang }: ExcelLabProps) {
  // Initial rows representing a standard school/office reporting spreadsheet
  const [rows, setRows] = useState<ExcelRow[]>([
    { id: 1, name: 'আরিফ হোসেন (Arif)', bangla: 85, english: 78, math: 92 },
    { id: 2, name: 'তাসলিমা বেগম (Taslima)', bangla: 72, english: 88, math: 65 },
    { id: 3, name: 'কামরুল হাসান (Kamrul)', bangla: 55, english: 42, math: 50 },
    { id: 4, name: 'নাজমুল হুদা (Nazmul)', bangla: 90, english: 95, math: 98 }
  ]);

  const [newName, setNewName] = useState('');
  const [newBangla, setNewBangla] = useState('');
  const [newEnglish, setNewEnglish] = useState('');
  const [newMath, setNewMath] = useState('');
  
  const [showFormulaHelper, setShowFormulaHelper] = useState(false);
  const [activeCellFormula, setActiveCellFormula] = useState('');

  // Calculate total, average, and letter grade for each row dynamically
  const calculateRowMetrics = (row: ExcelRow) => {
    const total = row.bangla + row.english + row.math;
    const average = Math.round((total / 3) * 10) / 10;
    
    // Calculate Letter Grade based on Bangladeshi Grading Scale
    let grade = 'F';
    if (average >= 80) grade = 'A+';
    else if (average >= 70) grade = 'A';
    else if (average >= 60) grade = 'A-';
    else if (average >= 50) grade = 'B';
    else if (average >= 40) grade = 'C';
    else if (average >= 33) grade = 'D';
    else grade = 'F';

    return { ...row, total, average, grade };
  };

  const calculatedRows = rows.map(row => calculateRowMetrics(row));

  // Handlers
  const handleAddRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const bnMark = parseInt(newBangla) || 0;
    const enMark = parseInt(newEnglish) || 0;
    const mathMark = parseInt(newMath) || 0;

    const newRow: ExcelRow = {
      id: Date.now(),
      name: newName,
      bangla: Math.min(100, Math.max(0, bnMark)),
      english: Math.min(100, Math.max(0, enMark)),
      math: Math.min(100, Math.max(0, mathMark))
    };

    setRows([...rows, newRow]);
    
    // Reset form fields
    setNewName('');
    setNewBangla('');
    setNewEnglish('');
    setNewMath('');
  };

  const handleDeleteRow = (id: number) => {
    setRows(rows.filter(r => r.id !== id));
  };

  const handleCellChange = (id: number, subject: 'bangla' | 'english' | 'math', value: string) => {
    const numericValue = parseInt(value) || 0;
    const boundedValue = Math.min(100, Math.max(0, numericValue));
    
    setRows(rows.map(row => {
      if (row.id === id) {
        return { ...row, [subject]: boundedValue };
      }
      return row;
    }));
  };

  // Statistics
  const totalStudents = calculatedRows.length;
  const passStudents = calculatedRows.filter(r => r.grade !== 'F').length;
  const passRate = totalStudents > 0 ? Math.round((passStudents / totalStudents) * 100) : 0;
  
  const classAverageTotal = totalStudents > 0 
    ? Math.round((calculatedRows.reduce((acc, curr) => acc + (curr.total || 0), 0) / totalStudents) * 10) / 10
    : 0;

  return (
    <div id="excel-lab-container" className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6 max-w-4xl mx-auto">
      {/* Header and description */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold font-sans text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
            {lang === 'bn' ? 'অ্যাডভান্সড এমএস এক্সেল (MS Excel) সিমুলেশন ল্যাব' : 'Advanced MS Excel Simulation Lab'}
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-1">
            {lang === 'bn' 
              ? 'বাস্তব পরীক্ষার রেজাল্ট শিট বা স্যালারি রিপোর্টের হিসাব-নিকাশের অটোমেটেড ফর্মুলা প্র্যাকটিস করুন।' 
              : 'Practice automating payroll sheets or student report cards using real mathematical Excel formulas.'}
          </p>
        </div>
        <button
          onClick={() => setShowFormulaHelper(!showFormulaHelper)}
          className="flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold px-3 py-1.5 rounded-lg border border-amber-200 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          {lang === 'bn' ? 'এআই ফর্মুলা হেল্পার' : 'AI Formula Inspector'}
        </button>
      </div>

      {/* Grid Dashboard Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">{lang === 'bn' ? 'মোট ছাত্রছাত্রী' : 'Total Records'}</div>
          <div className="text-xl font-black text-slate-900 mt-1">{totalStudents}</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center">
          <div className="text-[10px] text-emerald-800 font-bold uppercase tracking-wide">{lang === 'bn' ? 'পাশ করার হার' : 'Pass Rate'}</div>
          <div className="text-xl font-black text-emerald-700 mt-1">{passRate}%</div>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-center">
          <div className="text-[10px] text-blue-800 font-bold uppercase tracking-wide">{lang === 'bn' ? 'গড় স্কোর (মোট)' : 'Average Score'}</div>
          <div className="text-xl font-black text-blue-700 mt-1">{classAverageTotal}</div>
        </div>
      </div>

      {/* Formula helper bar overlay */}
      {showFormulaHelper && (
        <div className="mb-6 p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 text-slate-800 text-xs font-sans text-left space-y-2 animate-fade-in">
          <div className="flex items-center gap-1.5 font-bold text-emerald-900">
            <Sparkles className="w-4 h-4 text-amber-500" />
            {lang === 'bn' ? 'এক্সেল বাস্তব ফর্মুলা গাইড' : 'Live Excel Formula Secrets'}
          </div>
          <p className="text-slate-600 leading-relaxed">
            {lang === 'bn'
              ? 'অফিসে হিসাব-নিকাশ সহজ করতে আমরা নিচের ৩টি জাদুকরী সূত্র (Formula) ব্যবহারের বাস্তব প্রয়োগ শিখিয়ে থাকি:'
              : 'We train students to apply the following standard industrial formulas in administrative roles:'}
          </p>
          <ul className="space-y-1.5 font-mono text-[11px] text-emerald-950 bg-white/70 p-3 rounded-lg border border-emerald-100">
            <li><strong>১. যোগফল (Total Sum):</strong> <code className="bg-emerald-100 px-1 rounded">=SUM(Bangla, English, Math)</code></li>
            <li><strong>২. গড় (Average Percent):</strong> <code className="bg-emerald-100 px-1 rounded">=AVERAGE(Bangla, English, Math)</code></li>
            <li><strong>৩. লেটার গ্রেড (Logical Grade):</strong> <code className="bg-emerald-100 px-1 rounded">=IF(Average&gt;=80, "A+", IF(Average&gt;=70, "A", IF(Average&gt;=60, "A-", "F")))</code></li>
          </ul>
        </div>
      )}

      {/* Spreadsheet Simulator Table */}
      <div className="border border-slate-300 rounded-xl overflow-hidden bg-slate-100 p-1 mb-6 shadow-inner">
        {/* Mock Excel Address bar */}
        <div className="bg-white border-b border-slate-300 py-1.5 px-3 flex items-center gap-2 text-xs font-mono">
          <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-bold text-slate-700">FX</span>
          <input
            type="text"
            readOnly
            value={activeCellFormula || (lang === 'bn' ? '=অটো_হিসাব_ফর্মুলা(বাংলা+ইংরেজি+গণিত)' : '=AUTO_CALCULATE(Total, Average, Grades)')}
            className="w-full bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-600 italic outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-sans text-left bg-white">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-slate-600 font-semibold select-none">
                <th className="py-2.5 px-3 border-r border-slate-200 text-center w-10">#</th>
                <th className="py-2.5 px-4 border-r border-slate-200">{lang === 'bn' ? 'ছাত্র/ছাত্রীর নাম ও রোল' : 'Student Name & Roll'}</th>
                <th className="py-2.5 px-3 border-r border-slate-200 text-center w-20">{lang === 'bn' ? 'বাংলা' : 'Bangla'}</th>
                <th className="py-2.5 px-3 border-r border-slate-200 text-center w-20">{lang === 'bn' ? 'ইংরেজি' : 'English'}</th>
                <th className="py-2.5 px-3 border-r border-slate-200 text-center w-20">{lang === 'bn' ? 'গণিত' : 'Math'}</th>
                <th className="py-2.5 px-3 border-r border-slate-200 text-center bg-emerald-50 text-emerald-800 w-24">{lang === 'bn' ? 'মোট (SUM)' : 'Total (SUM)'}</th>
                <th className="py-2.5 px-3 border-r border-slate-200 text-center bg-blue-50 text-blue-800 w-24">{lang === 'bn' ? 'গড় (AVG)' : 'Average'}</th>
                <th className="py-2.5 px-3 text-center bg-amber-50 text-amber-800 w-24">{lang === 'bn' ? 'গ্রেড (Grade)' : 'Grade'}</th>
                <th className="py-2.5 px-3 text-center w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono">
              {calculatedRows.map((row, idx) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2 px-3 border-r border-slate-200 text-center bg-slate-50 font-bold text-slate-500 select-none">
                    {idx + 1}
                  </td>
                  <td className="py-2 px-4 border-r border-slate-200 text-slate-800 font-sans font-medium text-left">
                    {row.name}
                  </td>
                  
                  {/* Bangla Editable Cell */}
                  <td className="py-1 px-1 border-r border-slate-200 text-center">
                    <input
                      type="number"
                      value={row.bangla}
                      onChange={(e) => handleCellChange(row.id, 'bangla', e.target.value)}
                      onFocus={() => setActiveCellFormula(`=ROW[${idx + 1}].C (Bangla Mark)`)}
                      className="w-full text-center py-1 bg-transparent hover:bg-slate-100 rounded focus:bg-emerald-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </td>

                  {/* English Editable Cell */}
                  <td className="py-1 px-1 border-r border-slate-200 text-center">
                    <input
                      type="number"
                      value={row.english}
                      onChange={(e) => handleCellChange(row.id, 'english', e.target.value)}
                      onFocus={() => setActiveCellFormula(`=ROW[${idx + 1}].D (English Mark)`)}
                      className="w-full text-center py-1 bg-transparent hover:bg-slate-100 rounded focus:bg-emerald-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </td>

                  {/* Math Editable Cell */}
                  <td className="py-1 px-1 border-r border-slate-200 text-center">
                    <input
                      type="number"
                      value={row.math}
                      onChange={(e) => handleCellChange(row.id, 'math', e.target.value)}
                      onFocus={() => setActiveCellFormula(`=ROW[${idx + 1}].E (Math Mark)`)}
                      className="w-full text-center py-1 bg-transparent hover:bg-slate-100 rounded focus:bg-emerald-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </td>

                  {/* Automated SUM cell */}
                  <td 
                    className="py-2 px-3 border-r border-slate-200 text-center font-bold text-emerald-800 bg-emerald-50/40 select-none cursor-pointer"
                    onClick={() => setActiveCellFormula(`=SUM(C${idx + 2}:E${idx + 2})`)}
                  >
                    {row.total}
                  </td>

                  {/* Automated AVERAGE cell */}
                  <td 
                    className="py-2 px-3 border-r border-slate-200 text-center font-bold text-blue-800 bg-blue-50/40 select-none cursor-pointer"
                    onClick={() => setActiveCellFormula(`=AVERAGE(C${idx + 2}:E${idx + 2})`)}
                  >
                    {row.average}
                  </td>

                  {/* Automated GRADE cell with color styles */}
                  <td 
                    className={`py-2 px-3 text-center font-black select-none cursor-pointer ${
                      row.grade === 'A+' ? 'bg-emerald-100 text-emerald-800 font-bold' :
                      row.grade === 'A' || row.grade === 'A-' ? 'bg-blue-100 text-blue-800' :
                      row.grade === 'F' ? 'bg-red-100 text-red-800 animate-pulse' : 'bg-amber-100 text-amber-800'
                    }`}
                    onClick={() => setActiveCellFormula(`=IF(G${idx + 2}>=80, "A+", IF(G${idx + 2}>=70, "A", ...))`)}
                  >
                    {row.grade}
                  </td>

                  {/* Delete row */}
                  <td className="py-1 px-2 text-center">
                    <button
                      onClick={() => handleDeleteRow(row.id)}
                      className="p-1 text-slate-400 hover:text-red-500 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row insertion form */}
      <form onSubmit={handleAddRow} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col md:flex-row gap-3 items-end">
        <div className="flex-1 w-full text-left">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">{lang === 'bn' ? 'নতুন শিক্ষার্থীর নাম' : 'New Record Name'}</label>
          <input
            type="text"
            required
            placeholder="e.g. সুজন ইসলাম (Sujon)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-sans"
          />
        </div>
        <div className="w-full md:w-24 text-left">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">{lang === 'bn' ? 'বাংলা' : 'Bangla'}</label>
          <input
            type="number"
            min="0"
            max="100"
            placeholder="80"
            value={newBangla}
            onChange={(e) => setNewBangla(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-center focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        <div className="w-full md:w-24 text-left">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">{lang === 'bn' ? 'ইংরেজি' : 'English'}</label>
          <input
            type="number"
            min="0"
            max="100"
            placeholder="75"
            value={newEnglish}
            onChange={(e) => setNewEnglish(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-center focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        <div className="w-full md:w-24 text-left">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">{lang === 'bn' ? 'গণিত' : 'Math'}</label>
          <input
            type="number"
            min="0"
            max="100"
            placeholder="90"
            value={newMath}
            onChange={(e) => setNewMath(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-center focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-auto px-5 py-2 bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold rounded-lg shadow-md hover:shadow-emerald-100 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          {lang === 'bn' ? 'যুক্ত করুন' : 'Insert Row'}
        </button>
      </form>

      {/* Pro tip / note */}
      <div className="mt-4 text-left text-[11px] text-slate-500 leading-relaxed font-sans border-l-2 border-emerald-500 pl-2.5">
        <strong>* {lang === 'bn' ? 'বাস্তব মুখী ট্রেইনিং নোট:' : 'Practical Note:'}</strong> {lang === 'bn' 
          ? 'উপরের টেবিলে যেকোনো শিক্ষার্থীর বাংলা, ইংরেজি বা গণিতের মার্কসের ঘরে মাউস ক্লিক করে নাম্বার পরিবর্তন করুন। পরিবর্তন করার সাথে সাথে মোট নাম্বার, এভারেজ মার্কস এবং চূড়ান্ত জিপিএ গ্রেড সম্পূর্ণ স্বয়ংক্রিয়ভাবে পরিবর্তিত হবে!'
          : 'Modify any cell value directly in the spreadsheet grid. Total SUM, average values, and final GPA letter grade calculations are triggered instantly without manually clicking refresh.'}
      </div>
    </div>
  );
}

import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

export default function Navbar({ currentPage, onPageChange }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'classical', label: 'Classical Ciphers' },
    { id: 'transposition', label: 'Transposition' },
    { id: 'rsa', label: 'RSA Cryptography' },
    { id: 'quiz', label: 'Quiz' }
  ];

  // បង្កើត Function សម្រាប់ដោះស្រាយពេលរូបភាពរកមិនឃើញ (Fallback)
  const handleImageError = (e) => {
    e.target.style.display = 'none'; // លាក់រូបភាពដែលខូច
    e.target.nextSibling.style.display = 'block'; // បង្ហាញ Icon ជំនួសវិញ
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100 px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LEFT SECTION: TWO LOGOS & TITLE */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 pr-6 border-r border-slate-200">
            
            {/* Logo 1: Organization/University Logo */}
            <div className="relative w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg overflow-hidden group cursor-pointer border border-slate-800">
               {/* ប្តូរ src="/logo1.png" ទៅតាមឈ្មោះរូបភាពក្នុង Folder public របស់អ្នក */}
               <img 
                 src="/image/rupp.jpg" 
                 alt="Logo 1" 
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                 onError={handleImageError}
               />
               <ShieldCheck className="hidden w-7 h-7 group-hover:scale-110 transition-transform text-blue-400" />
            </div>

            {/* Logo 2: Department/Lab Logo */}
            <div className="relative w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg overflow-hidden group cursor-pointer border border-blue-500">
               {/* ប្តូរ src="/logo2.png" ទៅតាមឈ្មោះរូបភាពក្នុង Folder public របស់អ្នក */}
               <img 
                 src="/image/rupp1.png" 
                 alt="Logo 2" 
                 className="w-full h-full object-cover group-hover:rotate-12 transition-transform"
                 onError={handleImageError}
               />
               <Lock className="hidden w-7 h-7 group-hover:rotate-12 transition-transform" />
            </div>
          </div>

          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Cryptography Lab</h1>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mt-1">Advanced Learning System</p>
          </div>
        </div>

        {/* MIDDLE SECTION: NAVIGATION LINKS */}
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`relative text-xs font-black uppercase tracking-widest transition-all py-2 group ${
                currentPage === item.id ? 'text-blue-600' : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full opacity-50'
              }`}></span>
            </button>
          ))}
        </div>

        {/* RIGHT SECTION */}
        {/* <div className="flex items-center gap-4">
           <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
           </div>
        </div> */}

      </div>
    </nav>
  );
}
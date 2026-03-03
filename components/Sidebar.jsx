import React from 'react';
import { ChevronRight, BookOpen, Lock } from 'lucide-react';

/**
 * Sidebar component សម្រាប់បង្ហាញបញ្ជីមេរៀនតាមប្រភេទនីមួយៗ
 * បានកែសម្រួលឲ្យមានទំហំធំជាងមុន និងមាន Design ស្អាតបែប Modern
 */
export default function Sidebar({ currentPage, currentLesson, onLessonChange }) {
  // កំណត់បញ្ជីមេរៀនតាម Page នីមួយៗ
  const getMenuItems = () => {
    const menus = {
      dashboard: [],
      classical: [
        { id: 'caesar', label: 'Caesar Cipher' },
        { id: 'shift', label: 'General Shift' },
        { id: 'affine', label: 'Affine Cipher' }
      ],
      transposition: [
        { id: 'transposition', label: 'Transposition Cipher' }
      ],
      rsa: [
        { id: 'rsakeygen', label: 'Key Generation' },
        { id: 'rsaencrypt', label: 'Encryption' },
        { id: 'rsadecrypt', label: 'Decryption' }
      ],
      quiz: []
    };
    return menus[currentPage] || [];
  };

  const menuItems = getMenuItems();

  // បើគ្មានមេរៀនត្រូវបង្ហាញទេ វានឹងមិនបង្ហាញ Sidebar ឡើយ
  if (menuItems.length === 0) {
    return null;
  }

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col shadow-sm">
      {/* Header ផ្នែកខាងលើនៃ Sidebar */}
      <div className="p-6 border-b border-slate-50">
        <div className="flex items-center gap-2 text-blue-600 mb-1">
          <BookOpen className="w-5 h-5" />
          <span className="font-bold tracking-wide uppercase text-xs">Curriculum</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800 capitalize">
          {currentPage === 'rsa' ? 'RSA Crypto' : currentPage}
        </h2>
      </div>

      {/* បញ្ជីប៊ូតុងមេរៀន */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = currentLesson === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onLessonChange(item.id)}
              className={`
                w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200 translate-x-1' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-blue-500' : 'bg-slate-100'}`}>
                  <Lock className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                </div>
                {item.label}
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90' : 'opacity-40'}`} />
            </button>
          );
        })}
      </nav>

      {/* ផ្នែកខាងក្រោម (Footer នៃ Sidebar) */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="text-[10px] text-slate-400 font-medium uppercase text-center tracking-widest">
          Cryptography Course v1.0
        </div>
      </div>
    </aside>
  );
}

// របៀបប្រើប្រាស់ក្នុង App Component
export function App() {
  const [currentPage, setCurrentPage] = React.useState('classical');
  const [currentLesson, setCurrentLesson] = React.useState('caesar');

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        currentPage={currentPage} 
        currentLesson={currentLesson} 
        onLessonChange={setCurrentLesson} 
      />
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold text-slate-800">មាតិកាមេរៀន</h1>
        <p className="text-slate-500 mt-2">សូមជ្រើសរើសមេរៀននៅផ្នែកខាងឆ្វេង</p>
      </main>
    </div>
  );
}
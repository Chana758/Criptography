import { ChevronRight } from 'lucide-react';

export default function Sidebar({ currentPage, currentLesson, onLessonChange }) {
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

  if (menuItems.length === 0) {
    return null;
  }

  return (
    <aside className="w-48 bg-slate-50 border-r border-slate-200 py-6 px-4 flex flex-col gap-2">
      <h2 className="text-sm font-semibold text-slate-700 uppercase px-4 mb-2">Lessons</h2>
      {menuItems.map(item => (
        <button
          key={item.id}
          onClick={() => onLessonChange(item.id)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            currentLesson === item.id
              ? 'bg-blue-100 text-blue-700'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
          {item.label}
        </button>
      ))}
    </aside>
  );
}

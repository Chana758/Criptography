import React, { useState } from 'react';
import { ChevronRight, BookOpen, Lock, Menu, X } from 'lucide-react';

/**
 * Responsive Sidebar for Cryptography Lessons
 */
export default function Sidebar({ currentPage, currentLesson, onLessonChange }) {

  const [open, setOpen] = useState(false);

  // Lesson menu list
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
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b">
        <h2 className="font-bold text-slate-700">Lessons</h2>

        <button onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static z-30 top-0 left-0 h-full w-64 bg-white border-r border-slate-200 shadow-sm
        transform transition-transform duration-300 
        ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
      >

        {/* Header */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <BookOpen className="w-5 h-5" />
            <span className="font-bold tracking-wide uppercase text-xs">
              Curriculum
            </span>
          </div>

          <h2 className="text-xl font-bold text-slate-800 capitalize">
            {currentPage === 'rsa' ? 'RSA Cryptography' : currentPage}
          </h2>
        </div>

        {/* Lesson Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {

            const isActive = currentLesson === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onLessonChange(item.id);
                  setOpen(false);
                }}
                className={`
                w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all
                ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                }
              `}
              >
                <div className="flex items-center gap-3">

                  <div
                    className={`p-1.5 rounded-lg ${
                      isActive ? 'bg-blue-500' : 'bg-slate-100'
                    }`}
                  >
                    <Lock
                      className={`w-3.5 h-3.5 ${
                        isActive ? 'text-white' : 'text-slate-500'
                      }`}
                    />
                  </div>

                  {item.label}

                </div>

                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    isActive ? 'rotate-90' : 'opacity-40'
                  }`}
                />

              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <div className="text-[10px] text-slate-400 font-medium uppercase text-center tracking-widest">
            Cryptography Course 1
          </div>
        </div>

      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}


/**
 * Example App Usage
 */
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

      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-2xl font-bold text-slate-800">
          Lesson Content
        </h1>

        <p className="text-slate-500 mt-2">
          Please select a lesson from the sidebar.
        </p>
      </main>

    </div>
  );
}
import { Lock } from 'lucide-react';

export default function Navbar({ currentPage, onPageChange }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'classical', label: 'Classical Ciphers' },
    { id: 'transposition', label: 'Transposition' },
    { id: 'rsa', label: 'RSA Cryptography' },
    { id: 'quiz', label: 'Quiz' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-8">
          {/* Logo placeholders */}
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-slate-900">Cryptography Lab</h1>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`text-sm font-medium transition-colors ${
                currentPage === item.id
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-2'
                  : 'text-slate-600 hover:text-slate-900 pb-2'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

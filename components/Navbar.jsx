import React, { useState } from "react";
import {
  Lock,
  ShieldCheck,
  Menu,
  X,
  Home,
  Shield,
  Shuffle,
  KeyRound,
  ClipboardCheck,
} from "lucide-react";

export default function Navbar({ currentPage, onPageChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "classical", label: "Classical Ciphers", icon: Shield },
    { id: "transposition", label: "Transposition", icon: Shuffle },
    { id: "rsa", label: "RSA Cryptography", icon: KeyRound },
    { id: "quiz", label: "Quiz", icon: ClipboardCheck },
  ];

  const handleImageError = (e) => {
    e.target.style.display = "none";
    if (e.target.nextSibling) {
      e.target.nextSibling.style.display = "block";
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* LEFT SECTION */}
          <div className="flex items-center gap-4">

            <div className="flex items-center gap-3 pr-4">

              {/* Logo 1 */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-md flex items-center justify-center text-white overflow-hidden group cursor-pointer">
                <img
                  src="/image/r1.png"
                  alt="Logo 1"
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
                <ShieldCheck className="hidden w-6 h-6 text-blue-400" />
              </div>

              {/* Logo 2 */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-md flex items-center justify-center text-white overflow-hidden group cursor-pointer">
                <img
                  src="/image/r3.png"
                  alt="Logo 2"
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
                <Lock className="hidden w-6 h-6" />
              </div>

            </div>

            {/* TITLE */}
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                Cryptography Lab
              </h1>
              <p className="text-[9px] sm:text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mt-1">
                Advanced Learning System
              </p>
            </div>

          </div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`relative flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all py-2 group ${
                    currentPage === item.id
                      ? "text-blue-600"
                      : "text-slate-400 hover:text-slate-900"
                  }`}
                >
                  <Icon size={16} />

                  {item.label}

                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                      currentPage === item.id
                        ? "w-full"
                        : "w-0 group-hover:w-full opacity-50"
                    }`}
                  ></span>
                </button>
              );
            })}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden text-slate-700"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={26} />
          </button>

        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition ${
          mobileOpen ? "visible" : "invisible"
        }`}
      >

        {/* OVERLAY */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* SIDEBAR */}
        <div
          className={`absolute top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >

          {/* SIDEBAR HEADER */}
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="font-bold text-slate-800">Menu</h2>
            <button onClick={() => setMobileOpen(false)}>
              <X size={22} />
            </button>
          </div>

          {/* MENU ITEMS */}
          <div className="flex flex-col p-4 gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setMobileOpen(false);
                  }}
                  className={`flex items-center gap-3 text-sm font-bold py-3 px-3 rounded-lg text-left transition ${
                    currentPage === item.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={18} />

                  {item.label}
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}
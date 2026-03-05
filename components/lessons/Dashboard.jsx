import { BookOpen, Users, Award } from 'lucide-react';

export default function Dashboard() {
  return (
    <main className="flex-1 bg-slate-50 p-8 flex justify-center">
      <div className="max-w-4xl w-full flex flex-col items-center text-center">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center w-full">
          <h1 className="text-5xl font-bold text-slate-900 mb-2 font-serif uppercase tracking-tight">
            ENCRYPTION AND DECRYPTION DEMO
          </h1>
          <div className="flex justify-center gap-12 text-sm text-slate-600 mt-8 border-y border-slate-200 py-4 w-full max-w-2xl">
            <div className="text-center">
              <p className="font-black text-slate-900 uppercase tracking-widest text-[10px] mb-1">Submitted by</p>
              <p className="font-medium">Mr. LIM Seyha</p>
            </div>
            <div className="text-center">
              <p className="font-black text-slate-900 uppercase tracking-widest text-[10px] mb-1">Created by</p>
              <p className="font-medium">Mr. Sam Channa</p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-3xl shadow-sm p-10 mb-8 border-t-4 border-blue-500 w-full">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif italic">Welcome to Cryptography Lab</h2>
          <p className="text-slate-700 leading-relaxed mb-4 text-lg">
            Cryptography is the science of writing and reading secret messages. This interactive platform will guide you through fundamental cryptographic concepts, from classical ciphers to modern RSA encryption.
          </p>
          <p className="text-slate-700 leading-relaxed text-lg">
            You will learn how to encrypt and decrypt messages using various techniques, understand the mathematics behind RSA, and test your knowledge with interactive quizzes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="bg-white rounded-2xl shadow-sm p-8 border-b-4 border-blue-500 flex flex-col items-center transition-transform hover:-translate-y-1">
            <div className="p-3 bg-blue-50 rounded-xl mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Learn</h3>
            <p className="text-sm text-slate-600">
              Explore classical and modern encryption techniques with step-by-step explanations.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 border-b-4 border-green-500 flex flex-col items-center transition-transform hover:-translate-y-1">
            <div className="p-3 bg-green-50 rounded-xl mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Practice</h3>
            <p className="text-sm text-slate-600">
              Interact with cipher demonstrations and encrypt/decrypt your own messages.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 border-b-4 border-yellow-500 flex flex-col items-center transition-transform hover:-translate-y-1">
            <div className="p-3 bg-yellow-50 rounded-xl mb-4">
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Test</h3>
            <p className="text-sm text-slate-600">
              Challenge yourself with quizzes to reinforce your understanding.
            </p>
          </div>
        </div>

        {/* Curriculum */}
        <div className="bg-white rounded-3xl shadow-sm p-10 mt-8 w-full">
          <h3 className="text-xl font-bold text-slate-900 mb-8 font-serif italic">Course Curriculum</h3>
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-6 pb-6 border-b border-slate-100 text-left">
              <span className="text-3xl font-black text-blue-100 italic">01</span>
              <div>
                <h4 className="font-bold text-slate-900 uppercase text-sm tracking-wide">Classical Ciphers</h4>
                <p className="text-sm text-slate-500">Learn Caesar, General Shift, and Affine ciphers used throughout history.</p>
              </div>
            </div>
            <div className="flex items-center gap-6 pb-6 border-b border-slate-100 text-left">
              <span className="text-3xl font-black text-blue-100 italic">02</span>
              <div>
                <h4 className="font-bold text-slate-900 uppercase text-sm tracking-wide">Transposition Ciphers</h4>
                <p className="text-sm text-slate-500">Discover how rearranging letters can hide messages.</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-left">
              <span className="text-3xl font-black text-blue-100 italic">03</span>
              <div>
                <h4 className="font-bold text-slate-900 uppercase text-sm tracking-wide">RSA Cryptography</h4>
                <p className="text-sm text-slate-500">Understand modern public-key cryptography and key generation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
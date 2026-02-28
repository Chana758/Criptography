import { BookOpen, Users, Award } from 'lucide-react';

export default function Dashboard() {
  return (
    <main className="flex-1 bg-slate-50 p-8">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-2 font-serif">
            ENCRYPTION AND DECRYPTION DEMO
          </h1>
          <div className="flex gap-8 text-sm text-slate-600 mt-6">
            <div>
              <p className="font-semibold text-slate-900">Submitted by</p>
              <p>Mr. LIM Seyha</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Created by</p>
              <p>Mr. UNG Sereysopea</p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 font-serif">Welcome to Cryptography Lab</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Cryptography is the science of writing and reading secret messages. This interactive platform will guide you through fundamental cryptographic concepts, from classical ciphers to modern RSA encryption.
          </p>
          <p className="text-slate-700 leading-relaxed">
            You will learn how to encrypt and decrypt messages using various techniques, understand the mathematics behind RSA, and test your knowledge with interactive quizzes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-blue-500">
            <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Learn</h3>
            <p className="text-sm text-slate-600">
              Explore classical and modern encryption techniques with step-by-step explanations.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-green-500">
            <Users className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Practice</h3>
            <p className="text-sm text-slate-600">
              Interact with cipher demonstrations and encrypt/decrypt your own messages.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-yellow-500">
            <Award className="w-8 h-8 text-yellow-600 mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Test</h3>
            <p className="text-sm text-slate-600">
              Challenge yourself with quizzes to reinforce your understanding.
            </p>
          </div>
        </div>

        {/* Curriculum */}
        <div className="bg-white rounded-lg shadow-sm p-8 mt-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6 font-serif">Course Curriculum</h3>
          <div className="space-y-4">
            <div className="flex gap-4 pb-4 border-b border-slate-200">
              <span className="text-2xl font-bold text-blue-600">1</span>
              <div>
                <h4 className="font-semibold text-slate-900">Classical Ciphers</h4>
                <p className="text-sm text-slate-600">Learn Caesar, General Shift, and Affine ciphers used throughout history.</p>
              </div>
            </div>
            <div className="flex gap-4 pb-4 border-b border-slate-200">
              <span className="text-2xl font-bold text-blue-600">2</span>
              <div>
                <h4 className="font-semibold text-slate-900">Transposition Ciphers</h4>
                <p className="text-sm text-slate-600">Discover how rearranging letters can hide messages.</p>
              </div>
            </div>
            <div className="flex gap-4 pb-4">
              <span className="text-2xl font-bold text-blue-600">3</span>
              <div>
                <h4 className="font-semibold text-slate-900">RSA Cryptography</h4>
                <p className="text-sm text-slate-600">Understand modern public-key cryptography and key generation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

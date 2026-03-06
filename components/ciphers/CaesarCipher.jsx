import { useState } from 'react';
import { caesarEncrypt, caesarDecrypt } from '@/utils/cryptoUtils';

export default function CaesarCipher() {
  const [plaintext, setPlaintext] = useState('HELLO');
  const [ciphertext, setCiphertext] = useState('KHOOR');

  const handleEncrypt = () => {
    const result = caesarEncrypt(plaintext, 3);
    setCiphertext(result);
  };

  const handleDecrypt = () => {
    const result = caesarDecrypt(plaintext, 3);
    setCiphertext(result);
  };

  return (
    <main className="flex-1 bg-slate-50 p-4 sm:p-6 lg:p-10">
      <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 font-serif">
          Caesar Cipher
        </h1>

        <p className="text-slate-600 mb-6 sm:mb-8 text-sm sm:text-base">
          A substitution cipher where each letter is shifted by 3 positions in the alphabet.
        </p>

        {/* Formula Box */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 border-l-4 border-blue-500">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
            How It Works
          </h2>

          <p className="text-slate-700 font-mono text-center bg-slate-50 p-3 sm:p-4 rounded text-sm sm:text-base">
            E(x) = (x + 3) mod 26
          </p>

          <p className="text-xs sm:text-sm text-slate-600 mt-3">
            Each letter is replaced with the letter 3 positions ahead in the alphabet.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">

          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Plaintext
            </label>

            <input
              type="text"
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value.toUpperCase())}
              className="w-full px-3 sm:px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter text to encrypt"
            />
          </div>

          {/* Buttons responsive */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">

            <button
              onClick={handleEncrypt}
              className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Encrypt
            </button>

            <button
              onClick={handleDecrypt}
              className="w-full sm:w-auto px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              Decrypt
            </button>

          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Result
            </label>

            <div className="w-full px-4 py-3 bg-yellow-100 border-2 border-yellow-300 rounded-lg font-mono text-yellow-900 font-semibold break-words">
              {ciphertext}
            </div>
          </div>

        </div>

        {/* Example */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
            Example
          </h2>

          <div className="space-y-3 text-xs sm:text-sm">

            <div className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-slate-600">Plaintext:</span>
              <span className="font-mono font-semibold break-words">
                A B C D E F G H I
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-slate-600">Ciphertext:</span>
              <span className="font-mono font-semibold break-words">
                D E F G H I J K L
              </span>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
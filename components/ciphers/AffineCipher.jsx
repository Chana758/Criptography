import { useState } from 'react';
import { affineEncrypt, affineDecrypt } from '@/utils/cryptoUtils';

export default function AffineCipher() {
  const [plaintext, setPlaintext] = useState('HELLO');
  const [a, setA] = useState(5);
  const [b, setB] = useState(8);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleEncrypt = () => {
    try {
      setError('');
      const encrypted = affineEncrypt(plaintext, parseInt(a), parseInt(b));
      setResult(encrypted);
    } catch (err) {
      setError(err.message);
      setResult('');
    }
  };

  const handleDecrypt = () => {
    try {
      setError('');
      const decrypted = affineDecrypt(plaintext, parseInt(a), parseInt(b));
      setResult(decrypted);
    } catch (err) {
      setError(err.message);
      setResult('');
    }
  };

  const validAValues = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];

  return (
    <main className="flex-1 bg-slate-50 p-4 sm:p-6 lg:p-10">
      <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 font-serif">
          Affine Cipher
        </h1>

        <p className="text-slate-600 mb-6 sm:mb-8 text-sm sm:text-base">
          A cipher combining multiplication and addition: E(x) = (ax + b) mod 26
        </p>

        {/* Formula Box */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 border-l-4 border-blue-500">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
            How It Works
          </h2>

          <p className="text-slate-700 font-mono text-center bg-slate-50 p-3 sm:p-4 rounded mb-3 text-sm sm:text-base">
            E(x) = (ax + b) mod 26
          </p>

          <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
            <li>• a must be coprime with 26 (gcd(a,26) = 1)</li>
            <li>• b can be any value from 0-25</li>
            <li>• x is the position of the letter (A=0, B=1, ..., Z=25)</li>
            <li>• Valid values for a: 1,3,5,7,9,11,15,17,19,21,23,25</li>
          </ul>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Parameter a (coprime with 26)
              </label>

              <select
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {validAValues.map(val => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Parameter b (0-25)
              </label>

              <input
                type="number"
                min="0"
                max="25"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

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

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              Error: {error}
            </div>
          )}

          {result && (
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Result
              </label>

              <div className="w-full px-4 py-3 bg-yellow-100 border-2 border-yellow-300 rounded-lg font-mono text-yellow-900 font-semibold break-words">
                {result}
              </div>
            </div>
          )}

        </div>

        {/* Examples */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
            Examples
          </h2>

          <div className="space-y-3 text-xs sm:text-sm">

            <div>
              <p className="text-slate-600 mb-2">With a=5, b=8:</p>

              <div className="bg-slate-50 p-3 rounded overflow-x-auto">
                <p className="font-mono">
                  <span className="font-semibold">H</span> → position 7 → (5×7+8) mod 26 = 15 → <span className="font-semibold">P</span>
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
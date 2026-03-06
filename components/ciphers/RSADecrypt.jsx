import { useState } from 'react';
import { modPow } from '@/utils/cryptoUtils';
import { Unlock } from 'lucide-react';

export default function RSADecrypt() {
  const [ciphertext, setCiphertext] = useState('2790');
  const [d, setD] = useState('2753');
  const [n, setN] = useState('3233');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [steps, setSteps] = useState(null);

  const handleDecrypt = () => {
    try {
      setError('');
      const dBig = BigInt(d);
      const nBig = BigInt(n);
      const ciphertextBig = BigInt(ciphertext);

      if (ciphertextBig >= nBig) {
        setError(`Ciphertext must be less than n (${n})`);
        return;
      }

      const M = modPow(ciphertextBig, dBig, nBig);
      setMessage(M.toString());

      setSteps({
        C: ciphertext,
        d,
        n,
        M: M.toString(),
        formula: `M = ${ciphertext}^${d} mod ${n} = ${M.toString()}`
      });
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  const exampleKeys = [
    {
      name: 'Example 1 (p=61, q=53)',
      d: '2753',
      n: '3233',
      cipher: '2790'
    },
    {
      name: 'Example 2 (p=23, q=29)',
      d: '269',
      n: '667',
      cipher: '123'
    }
  ];

  return (
    <main className="flex-1 bg-slate-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">

        <div className="flex items-start gap-3 mb-6 md:mb-8">
          <Unlock className="w-7 h-7 md:w-8 md:h-8 text-red-600 mt-1" />
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-slate-900 font-serif">
              RSA Decryption
            </h1>
            <p className="text-sm md:text-base text-slate-600 mt-1">
              Decrypt messages using RSA private key
            </p>
          </div>
        </div>

        {/* Formula */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6 border-l-4 border-red-500">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Formula</h2>
          <p className="text-slate-700 font-mono text-center bg-slate-50 p-3 md:p-4 rounded mb-3">
            M = C^d mod n
          </p>
        </div>

        {/* Input */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Ciphertext (C)
              </label>
              <input
                type="number"
                value={ciphertext}
                onChange={(e) => setCiphertext(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Private Exponent (d)
              </label>
              <input
                type="number"
                value={d}
                onChange={(e) => setD(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>

          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Modulus (n)
            </label>
            <input
              type="number"
              value={n}
              onChange={(e) => setN(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            onClick={handleDecrypt}
            className="w-full px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600"
          >
            Decrypt
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-4">
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Plaintext (M)
              </label>
              <div className="w-full px-4 py-3 bg-green-100 border-2 border-green-300 rounded-lg font-mono text-green-900 font-bold break-all">
                {message}
              </div>
            </div>
          )}
        </div>

        {/* Steps */}
        {steps && (
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
            <h2 className="text-lg font-bold mb-3">Calculation</h2>
            <div className="bg-slate-50 p-3 rounded">
              <p className="font-mono text-sm">{steps.formula}</p>
            </div>
          </div>
        )}

        {/* Examples */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <h2 className="text-lg font-bold mb-4">Examples</h2>

          <div className="space-y-2">
            {exampleKeys.map((example, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setD(example.d);
                  setN(example.n);
                  setCiphertext(example.cipher);
                  setMessage('');
                }}
                className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-left text-sm font-semibold"
              >
                {example.name}
              </button>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
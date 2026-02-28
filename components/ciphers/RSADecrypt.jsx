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

      // Store calculation steps
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
    <main className="flex-1 bg-slate-50 p-8">
      <div className="max-w-2xl">
        <div className="flex items-start gap-3 mb-8">
          <Unlock className="w-8 h-8 text-red-600 mt-1" />
          <div>
            <h1 className="text-4xl font-bold text-slate-900 font-serif">RSA Decryption</h1>
            <p className="text-slate-600 mt-1">
              Decrypt messages using RSA private key
            </p>
          </div>
        </div>

        {/* Formula Box */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border-l-4 border-red-500">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Formula</h2>
          <p className="text-slate-700 font-mono text-center bg-slate-50 p-4 rounded mb-3">
            M = C^d mod n
          </p>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>• C = ciphertext (encrypted message)</li>
            <li>• d = private exponent (secret!)</li>
            <li>• n = modulus</li>
            <li>• M = plaintext message</li>
          </ul>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Ciphertext (C)
              </label>
              <input
                type="number"
                value={ciphertext}
                onChange={(e) => setCiphertext(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Encrypted message"
              />
              <p className="text-xs text-slate-500 mt-1">Must be {'<'} n</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Private Exponent (d)
              </label>
              <input
                type="number"
                value={d}
                onChange={(e) => setD(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            onClick={handleDecrypt}
            className="w-full px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors mb-4"
          >
            Decrypt
          </button>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              Error: {error}
            </div>
          )}

          {message && (
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Plaintext (M)
              </label>
              <div className="w-full px-4 py-3 bg-green-100 border-2 border-green-300 rounded-lg font-mono text-green-900 font-bold break-all">
                {message}
              </div>
            </div>
          )}
        </div>

        {/* Calculation Steps */}
        {steps && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Calculation</h2>
            <div className="bg-slate-50 p-4 rounded border border-slate-200">
              <p className="font-mono text-sm text-slate-900">
                {steps.formula}
              </p>
            </div>
          </div>
        )}

        {/* Examples */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Try These Examples</h2>
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
                className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-lg text-left text-sm font-semibold transition-colors"
              >
                {example.name} (d={example.d}, n={example.n})
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> The private exponent (d) must be kept secret. Only the message owner should have access to it.
          </p>
        </div>
      </div>
    </main>
  );
}

import { useState } from 'react';
import { transpositionEncrypt, transpositionDecrypt } from '@/utils/cryptoUtils';
import { Grid3x3 } from 'lucide-react';

export default function TranspositionCipher() {
  const [plaintext, setPlaintext] = useState('HELLO WORLD');
  const [keyword, setKeyword] = useState('KEY');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [showGrid, setShowGrid] = useState(false);

  const handleEncrypt = () => {
    try {
      setError('');
      if (!keyword) {
        setError('Keyword cannot be empty');
        return;
      }
      const encrypted = transpositionEncrypt(plaintext, keyword);
      setResult(encrypted);
      setShowGrid(true);
    } catch (err) {
      setError(err.message);
      setResult('');
    }
  };

  const handleDecrypt = () => {
    try {
      setError('');
      if (!keyword) {
        setError('Keyword cannot be empty');
        return;
      }
      const decrypted = transpositionDecrypt(plaintext, keyword);
      setResult(decrypted);
      setShowGrid(false);
    } catch (err) {
      setError(err.message);
      setResult('');
    }
  };

  // Create grid visualization
  const getGridVisualization = () => {
    const plainNoSpace = plaintext.replace(/\s/g, '').toUpperCase();
    const keywordUpper = keyword.toUpperCase();
    const keyLength = keywordUpper.length;
    const numRows = Math.ceil(plainNoSpace.length / keyLength);
    const paddedText = plainNoSpace.padEnd(numRows * keyLength, 'X');

    // Get column order
    const columnOrder = Array.from(keywordUpper)
      .map((char, index) => ({ char, index }))
      .sort((a, b) => a.char.localeCompare(b.char))
      .map(item => item.index);

    const grid = [];
    for (let i = 0; i < numRows; i++) {
      grid.push(paddedText.slice(i * keyLength, (i + 1) * keyLength).split(''));
    }

    return { grid, columnOrder, keywordUpper };
  };

  const { grid, columnOrder, keywordUpper } = getGridVisualization();

  return (
    <main className="flex-1 bg-slate-50 p-8">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-2 font-serif">Transposition Cipher</h1>
        <p className="text-slate-600 mb-8">
          Rearranges letters without substitution. Uses a keyword to determine column order.
        </p>

        {/* Info Box */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border-l-4 border-blue-500">
          <h2 className="text-lg font-bold text-slate-900 mb-3">How It Works</h2>
          <ol className="text-sm text-slate-600 space-y-2">
            <li>1. Write plaintext in rows, with columns equal to keyword length</li>
            <li>2. Number columns by alphabetical order of keyword letters</li>
            <li>3. Read columns in numeric order to get ciphertext</li>
          </ol>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Keyword
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value.toUpperCase())}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter keyword (e.g., KEY, SECRET)"
            />
            <p className="text-xs text-slate-500 mt-1">Keyword length: {keyword.length}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Plaintext
            </label>
            <textarea
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Enter text to encrypt"
            />
          </div>

          <div className="flex gap-3 mb-6">
            <button
              onClick={handleEncrypt}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Encrypt
            </button>
            <button
              onClick={handleDecrypt}
              className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
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
              <div className="w-full px-4 py-3 bg-yellow-100 border-2 border-yellow-300 rounded-lg font-mono text-yellow-900 font-semibold break-all">
                {result}
              </div>
            </div>
          )}
        </div>

        {/* Grid Visualization */}
        {showGrid && result && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Grid3x3 className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">Grid Visualization</h2>
            </div>

            <div className="mb-6">
              <p className="text-sm text-slate-600 mb-3">
                <strong>Keyword:</strong> {keywordUpper} (Column order: {columnOrder.join(', ')})
              </p>

              {/* Grid display */}
              <div className="inline-block border-2 border-slate-300 rounded-lg overflow-hidden">
                <table className="border-collapse">
                  <thead>
                    <tr>
                      {Array.from(keywordUpper).map((char, idx) => (
                        <th
                          key={idx}
                          className="bg-blue-100 border border-slate-300 px-4 py-2 text-center font-bold text-slate-900 w-12"
                        >
                          {char}
                          <div className="text-xs text-blue-600">({columnOrder.indexOf(idx) + 1})</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {grid.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {row.map((cell, colIdx) => (
                          <td
                            key={colIdx}
                            className="border border-slate-300 px-4 py-2 text-center font-mono font-bold text-slate-900 bg-slate-50 w-12"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-slate-600 mt-4">
                <strong>Reading order:</strong> Read columns in order {columnOrder.map(idx => columnOrder.indexOf(idx) + 1).join(', ')}
              </p>
            </div>
          </div>
        )}

        {/* Example */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Example</h2>
          <p className="text-sm text-slate-600 mb-3">
            With keyword "KEY" and plaintext "HELLO WORLD":
          </p>
          <div className="bg-slate-50 p-4 rounded border border-slate-200 text-sm space-y-2 font-mono">
            <div>Step 1: Remove spaces: HELLOWORLD</div>
            <div>Step 2: Create grid with keyword length (3):</div>
            <div className="ml-4 bg-white p-2 rounded border border-slate-300">
              K E Y<br/>
              H E L<br/>
              L O W<br/>
              O R L<br/>
              D
            </div>
            <div>Step 3: Keyword order (E=1, K=2, Y=3) → Read columns: E→K→Y</div>
            <div className="bg-yellow-50 p-2 rounded border border-yellow-300">
              Result: LLOWEDHRELW
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

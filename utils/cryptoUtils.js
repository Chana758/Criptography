// Caesar Cipher
export function caesarEncrypt(text, shift = 3) {
  return text
    .toUpperCase()
    .split('')
    .map(char => {
      if (!/[A-Z]/.test(char)) return char;
      const code = char.charCodeAt(0) - 65;
      return String.fromCharCode(((code + shift) % 26) + 65);
    })
    .join('');
}

export function caesarDecrypt(text, shift = 3) {
  return caesarEncrypt(text, 26 - shift);
}

// General Shift Cipher
export function shiftEncrypt(text, key) {
  return text
    .toUpperCase()
    .split('')
    .map(char => {
      if (!/[A-Z]/.test(char)) return char;
      const code = char.charCodeAt(0) - 65;
      return String.fromCharCode(((code + key) % 26) + 65);
    })
    .join('');
}

export function shiftDecrypt(text, key) {
  return shiftEncrypt(text, 26 - key);
}

export function bruteForceShift(text) {
  const results = [];
  for (let i = 0; i < 26; i++) {
    results.push({
      shift: i,
      decrypted: shiftDecrypt(text, i)
    });
  }
  return results;
}

// GCD for Affine Cipher
function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Modular Inverse for Affine Cipher
function modInverse(a, m) {
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return null;
}

// Affine Cipher
export function affineEncrypt(text, a, b) {
  if (gcd(a, 26) !== 1) {
    throw new Error('a must be coprime with 26');
  }
  return text
    .toUpperCase()
    .split('')
    .map(char => {
      if (!/[A-Z]/.test(char)) return char;
      const x = char.charCodeAt(0) - 65;
      const encrypted = (a * x + b) % 26;
      return String.fromCharCode(encrypted + 65);
    })
    .join('');
}

export function affineDecrypt(text, a, b) {
  if (gcd(a, 26) !== 1) {
    throw new Error('a must be coprime with 26');
  }
  const aInv = modInverse(a, 26);
  if (aInv === null) {
    throw new Error('Modular inverse does not exist');
  }
  return text
    .toUpperCase()
    .split('')
    .map(char => {
      if (!/[A-Z]/.test(char)) return char;
      const y = char.charCodeAt(0) - 65;
      const decrypted = (aInv * (y - b + 26)) % 26;
      return String.fromCharCode(decrypted + 65);
    })
    .join('');
}

// Transposition Cipher
export function transpositionEncrypt(plaintext, keyword) {
  plaintext = plaintext.replace(/\s/g, '').toUpperCase();
  keyword = keyword.toUpperCase();

  // Create column order based on keyword alphabetical position
  const keyLength = keyword.length;
  const numRows = Math.ceil(plaintext.length / keyLength);

  // Pad plaintext if necessary
  while (plaintext.length < numRows * keyLength) {
    plaintext += 'X';
  }

  // Create grid
  const grid = [];
  for (let i = 0; i < numRows; i++) {
    grid.push(plaintext.slice(i * keyLength, (i + 1) * keyLength).split(''));
  }

  // Get column order
  const columnOrder = Array.from(keyword)
    .map((char, index) => ({ char, index }))
    .sort((a, b) => a.char.localeCompare(b.char))
    .map(item => item.index);

  // Read columns in order
  let ciphertext = '';
  for (const colIndex of columnOrder) {
    for (let row = 0; row < numRows; row++) {
      ciphertext += grid[row][colIndex];
    }
  }

  return ciphertext;
}

export function transpositionDecrypt(ciphertext, keyword) {
  const keyLength = keyword.length;
  const numRows = Math.ceil(ciphertext.length / keyLength);

  const keyword_upper = keyword.toUpperCase();
  const columnOrder = Array.from(keyword_upper)
    .map((char, index) => ({ char, index }))
    .sort((a, b) => a.char.localeCompare(b.char))
    .map(item => item.index);

  // Create grid
  const grid = Array(numRows)
    .fill(null)
    .map(() => Array(keyLength).fill(''));

  // Fill grid by columns in the order they appear in ciphertext
  let charIndex = 0;
  for (const colIndex of columnOrder) {
    for (let row = 0; row < numRows; row++) {
      grid[row][colIndex] = ciphertext[charIndex++];
    }
  }

  // Read row by row
  let plaintext = '';
  for (let row = 0; row < numRows; row++) {
    plaintext += grid[row].join('');
  }

  return plaintext;
}

// RSA Utilities
export function extendedGcd(a, b) {
  if (b === 0n) {
    return { gcd: a, x: 1n, y: 0n };
  }
  const { gcd, x: x1, y: y1 } = extendedGcd(b, a % b);
  const x = y1;
  const y = x1 - (a / b) * y1;
  return { gcd, x, y };
}

export function modPow(base, exp, mod) {
  let result = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) {
      result = (result * base) % mod;
    }
    exp = exp >> 1n;
    base = (base * base) % mod;
  }
  return result;
}

export function modInverseBigInt(a, m) {
  const { gcd, x } = extendedGcd(a, m);
  if (gcd !== 1n) {
    throw new Error('Modular inverse does not exist');
  }
  return ((x % m) + m) % m;
}

export function isPrime(n) {
  if (n < 2n) return false;
  if (n === 2n) return true;
  if (n % 2n === 0n) return false;
  for (let i = 3n; i * i <= n; i += 2n) {
    if (n % i === 0n) return false;
  }
  return true;
}

export function rsaKeyGen(p, q, e) {
  const n = p * q;
  const phi = (p - 1n) * (q - 1n);

  // Validate e
  if (e <= 1n || e >= phi) {
    throw new Error('e must be between 2 and phi(n)-1');
  }

  // Calculate d (private exponent)
  const d = modInverseBigInt(e, phi);

  return {
    publicKey: { e, n },
    privateKey: { d, n }
  };
}

export function rsaEncrypt(message, e, n) {
  const M = BigInt(message);
  if (M >= n) {
    throw new Error('Message must be less than n');
  }
  return modPow(M, e, n);
}

export function rsaDecrypt(ciphertext, d, n) {
  const C = BigInt(ciphertext);
  return modPow(C, d, n);
}

// Helper to convert text to number for RSA
export function textToNumber(text) {
  let num = '';
  for (let char of text.toUpperCase()) {
    const code = char.charCodeAt(0) - 65;
    num += String(code).padStart(2, '0');
  }
  return num;
}

// Helper to convert number back to text for RSA
export function numberToText(num) {
  num = num.toString().padStart(num.toString().length % 2 ? num.toString().length + 1 : num.toString().length, '0');
  let text = '';
  for (let i = 0; i < num.length; i += 2) {
    const code = parseInt(num.slice(i, i + 2));
    if (code >= 0 && code < 26) {
      text += String.fromCharCode(code + 65);
    }
  }
  return text;
}

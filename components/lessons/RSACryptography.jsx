import RSAKeyGen from '../ciphers/RSAKeyGen';
import RSAEncrypt from '../ciphers/RSAEncrypt';
import RSADecrypt from '../ciphers/RSADecrypt';

export default function RSACryptography({ currentLesson }) {
  switch (currentLesson) {
    case 'rsaencrypt':
      return <RSAEncrypt />;
    case 'rsadecrypt':
      return <RSADecrypt />;
    case 'rsakeygen':
    default:
      return <RSAKeyGen />;
  }
}

import CaesarCipher from '../ciphers/CaesarCipher';
import GeneralShift from '../ciphers/GeneralShift';
import AffineCipher from '../ciphers/AffineCipher';

export default function ClassicalCiphers({ currentLesson }) {
  switch (currentLesson) {
    case 'shift':
      return <GeneralShift />;
    case 'affine':
      return <AffineCipher />;
    case 'caesar':
    default:
      return <CaesarCipher />;
  }
}

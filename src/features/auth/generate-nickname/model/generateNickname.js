import { getRandomInt, getRandomItem } from '@shared/lib/random';
import { storage } from '@shared/lib/local-storage';

const STORAGE_KEY = 'incherin.randomNickname.v1';

const MASCOT_PREFIXES = ['인덕', '안뇽'];
const ADJECTIVES = [
  '든든한',
  '꼼꼼한',
  '배고픈',
  '후끈한',
  '상냥한',
  '꿀조합',
  '새내기',
  '캠퍼스',
  '열정만땅',
  '야식단골',
];
const ROLES = ['맛집러', '탐험가', '리뷰왕', '길잡이', '단짝', '소식통'];
const EMOJIS = ['🍜', '🍙', '🧋', '🥟', '🍛', '🧭', '💫'];

const composeNickname = () => {
  const adjective = getRandomItem(ADJECTIVES) || '든든한';
  const mascot = getRandomItem(MASCOT_PREFIXES) || '인덕';
  const role = getRandomItem(ROLES) || '맛집러';
  const serial = getRandomInt(1, 99).toString().padStart(2, '0');
  const emoji = getRandomItem(EMOJIS) || '🍜';

  return `${adjective} ${mascot}${role}${serial} ${emoji}`;
};

const readStoredNickname = () => {
  const stored = storage.get(STORAGE_KEY);
  return stored?.nickname || '';
};

const persistNickname = nickname => {
  storage.set(STORAGE_KEY, {
    nickname,
    updatedAt: Date.now(),
  });
};

export const generateNickname = ({ forceNew = false } = {}) => {
  if (!forceNew) {
    const cached = readStoredNickname();
    if (cached) {
      return cached;
    }
  }

  const nickname = composeNickname();
  persistNickname(nickname);
  return nickname;
};

export const resetNickname = () => {
  storage.remove(STORAGE_KEY);
};

const adjectives = [
  '반짝이는',
  '산뜻한',
  '웃음가득',
  '설레는',
  '포근한',
  '따스한',
  '싱그러운',
  '재미있는',
  '감미로운',
  '용감한',
  '빛나는',
  '정다움 가득한',
  '폭신폭신',
  '달콤한',
  '차분한',
  '활기찬',
  '상냥한',
  '귀여운',
];

const nouns = [
  '경영학과',
  '경제학과',
  '국제통상학과',
  '정치외교학과',
  '사회복지학과',
  '기계공학과',
  '항공우주공학과',
  '조선해양공학과',
  '전기공학과',
  '전자공학과',
  '정보통신공학과',
  '컴퓨터공학과',
  '산업경영공학과',
  '신소재공학과',
  '화학공학과',
  '생명공학과',
  '환경공학과',
  '수학과',
  '통계학과',
  '물리학과',
  '화학과',
  '해양과학과',
  '생물과학과',
  '식품영양학과',
  '체육학과',
];

let lastNickname = '';

const pickRandom = list => list[Math.floor(Math.random() * list.length)];

export const generateNickname = (options = {}) => {
  const { forceNew = false } = options;

  if (!forceNew && lastNickname) {
    return lastNickname;
  }

  let nextNickname = '';

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const candidate = `${pickRandom(adjectives)} ${pickRandom(nouns)}`;
    if (!forceNew || candidate !== lastNickname) {
      nextNickname = candidate;
      break;
    }
  }

  if (!nextNickname) {
    nextNickname = `${pickRandom(adjectives)} ${pickRandom(nouns)}`;
  }

  lastNickname = nextNickname;
  return nextNickname;
};

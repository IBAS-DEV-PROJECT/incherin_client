import { useState, useRef, useCallback, useEffect } from 'react';
import { getRandomItem } from '@features/roulette/lib/random';

const ANIMATION_DURATION = 2000;
const SPIN_INTERVAL_START = 50;
const SPIN_INTERVAL_END = 200;

export function useRoulette(shops, onCategoryChange) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentShop, setCurrentShop] = useState(null); // 애니메이션용
  const [result, setResult] = useState(null); // 최종 결과
  const [error, setError] = useState('');

  const intervalRef = useRef();

  const start = useCallback(() => {
    // 1. 중복 클릭 방지
    if (isSpinning) return;

    // 2. 가게 목록 비어있음 예외 처리
    if (!shops || shops.length === 0) {
      setError('다시 돌려주세요');
      if (onCategoryChange) {
        setTimeout(() => {
          onCategoryChange('전체');
          setError('');
        }, 1500);
      }
      return;
    }

    // 초기화 및 시작
    setError('');
    setResult(null);
    setIsSpinning(true);

    let elapsed = 0;
    let currentInterval = SPIN_INTERVAL_START;
    const finalShop = getRandomItem(shops);

    if (!finalShop) {
      setError('다시 돌려주세요');
      setIsSpinning(false);
      return;
    }

    // 애니메이션 루프 함수
    const spin = () => {
      elapsed += currentInterval;

      // 랜덤 보여주기
      setCurrentShop(getRandomItem(shops));

      // 속도 조절 (점점 느리게)
      if (elapsed < ANIMATION_DURATION * 0.7) {
        currentInterval =
          SPIN_INTERVAL_START + (elapsed / ANIMATION_DURATION) * 50;
      } else {
        currentInterval =
          SPIN_INTERVAL_START +
          ((ANIMATION_DURATION * 0.7) / ANIMATION_DURATION) * 50 +
          ((elapsed - ANIMATION_DURATION * 0.7) / (ANIMATION_DURATION * 0.3)) *
            (SPIN_INTERVAL_END - SPIN_INTERVAL_START - 50);
      }

      if (elapsed < ANIMATION_DURATION) {
        intervalRef.current = setTimeout(spin, currentInterval);
      } else {
        // 종료
        setCurrentShop(finalShop);
        setResult(finalShop);
        setIsSpinning(false);
      }
    };

    spin();
  }, [shops, isSpinning, onCategoryChange]);

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, []);

  return {
    isSpinning,
    currentShop,
    result,
    error,
    start, // 룰렛 시작 함수
  };
}

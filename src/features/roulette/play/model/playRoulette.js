/**
 * 룰렛 로직/상태 추상화 모듈 (컴포넌트에 import하여 상태/동작 위임 가능)
 */
import { useState, useRef, useCallback } from 'react';
import { getRandomItem } from '@/shared/lib/random';

const ANIMATION_DURATION = 2000;

export function useRoulette(shops) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const timeoutRef = useRef();

  const play = useCallback(() => {
    if (loading) return; // 중복 방지
    setError('');
    setResult(null);
    setLoading(true);
    timeoutRef.current = setTimeout(() => {
      const shop = getRandomItem(shops);
      if (!shop) {
        setError('추천할 가게가 없어요!');
        setResult(null);
      } else {
        setResult(shop);
      }
      setLoading(false);
    }, ANIMATION_DURATION);
  }, [shops, loading]);

  const clear = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return {
    result,
    loading,
    error,
    play,
    clear
  };
}

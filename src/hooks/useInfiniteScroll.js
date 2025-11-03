import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 무한 스크롤 훅
 * @param {function} fetchMore - 다음 페이지를 가져오는 함수
 * @param {boolean} hasMore - 더 가져올 데이터가 있는지
 * @param {number} threshold - 트리거 임계값
 * @returns {{ targetRef: RefObject, isLoadingMore: boolean }}
 */

export function useInfiniteScroll(fetchMore, hasMore, threshold = 200) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const targetRef = useRef(null);
  const observerRef = useRef(null);

  const handleIntersect = useCallback(
    async entries => {
      const [entry] = entries;

      if (entry.isIntersecting && hasMore && !isLoadingMore) {
        setIsLoadingMore(true);
        try {
          await fetchMore();
        } catch (error) {
          console.error('[INFINITE_SCROLL] 데이터 로드 실패 : ', error);
        } finally {
          setIsLoadingMore(false);
        }
      }
    },
    [fetchMore, hasMore, isLoadingMore]
  );

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    // Intersection Observer 생성
    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: `${threshold}px`,
      threshold: 0.1,
    });

    observerRef.current.observe(target);

    // 클린업
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersect, threshold]);

  return {
    targetRef,
    isLoadingMore,
  };
}

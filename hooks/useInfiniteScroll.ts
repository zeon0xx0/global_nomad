import { useCallback } from 'react';

interface UseInfiniteScrollParams {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export function useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage }: UseInfiniteScrollParams) {
  return useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !hasNextPage || isFetchingNextPage) return;

      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      });

      observer.observe(node);
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );
}

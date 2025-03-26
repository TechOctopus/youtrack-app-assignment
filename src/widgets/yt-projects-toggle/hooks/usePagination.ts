import { useCallback, useEffect, useState } from "react";

const DEFAULT_PAGE_SIZE = 10;

interface PaginationParams {
  pageSize?: number;
  initialPage?: number;
}

interface PaginationState<T> {
  data: T[];
  isLoading: boolean;
  isFetchingMore: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  retry: () => Promise<void>;
  reset: () => Promise<void>;
}

/**
 * A custom hook for handling paginated data fetching
 * @param fetchFn - Function that fetches data for a specific page
 * @param params - Optional pagination parameters
 * @returns Pagination state and control functions
 */
export function usePagination<T>(
  fetchFn: (top: number, skip: number) => Promise<T[]>,
  {pageSize = DEFAULT_PAGE_SIZE, initialPage = 0}: PaginationParams = {}
): PaginationState<T> {
  const [data, setData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPage = useCallback(
    async (page: number, isInitial: boolean = false): Promise<void> => {
      try {
        if (isInitial) {
          setIsLoading(true);
        } else {
          setIsFetchingMore(true);
        }

        setError(null);

        const newItems = await fetchFn(pageSize, page * pageSize);

        setData((prevData) =>
          isInitial ? newItems : [...prevData, ...newItems]
        );
        setHasMore(newItems.length === pageSize);
        setCurrentPage(page);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Unknown error occurred")
        );
      } finally {
        setIsLoading(false);
        setIsFetchingMore(false);
      }
    },
    [fetchFn, pageSize]
  );

  useEffect(() => {
    fetchPage(initialPage, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = useCallback(async (): Promise<void> => {
    if (isFetchingMore || !hasMore) {
      return;
    }
    await fetchPage(currentPage + 1);
  }, [fetchPage, currentPage, isFetchingMore, hasMore]);

  const retry = useCallback(async (): Promise<void> => {
    if (data.length === 0) {
      await fetchPage(initialPage, true);
    } else {
      await fetchPage(currentPage);
    }
  }, [fetchPage, initialPage, currentPage, data.length]);

  const reset = useCallback(async (): Promise<void> => {
    setData([]);
    await fetchPage(initialPage, true);
  }, [fetchPage, initialPage]);

  return {
    data,
    isLoading,
    isFetchingMore,
    error,
    hasMore,
    loadMore,
    retry,
    reset,
  };
}

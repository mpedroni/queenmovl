import { debounce } from 'lodash';
import { useCallback, useEffect } from 'react';

const defaultWaitTime = 500; // in milliseconds

export function useDebounce(
  callback: (...args: any) => any,
  wait: number = defaultWaitTime
) {
  const debouncedFun = useCallback(debounce(callback, wait), [wait]);

  useEffect(() => {
    return () => debouncedFun.cancel();
  }, [wait]);

  return debouncedFun;
}

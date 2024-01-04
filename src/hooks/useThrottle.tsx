import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, limit: number) {
  const [throttleValue, setThrottleValue] = useState(value);
  const lastRun = useRef(Date.now());

  useEffect(() => {
    const passTime = Date.now() - lastRun.current;
    const setValue = () => {
      lastRun.current = Date.now();
      setThrottleValue(value);
    };

    if (passTime > limit) {
      setValue();
      return;
    }

    const delay = setTimeout(setValue, passTime);
    return () => {
      clearTimeout(delay);
    };
  }, [limit, value]);

  return throttleValue;
}

export default useThrottle;

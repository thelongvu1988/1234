import { useEffect, useRef, useState } from "react";

export function useCountdown(initialSeconds: number) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    timerRef.current = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          // hết giờ → stop luôn
          stop();
          return 0;
        }

        return value - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const stop = () => {
    setIsRunning(false);

    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }
  };

  const reset = () => {
    setTimeLeft(initialSeconds);
    setIsRunning(true);
  };

  return {
    timeLeft,
    isTimeUp: timeLeft === 0,
    stop,
    reset,
  };
}
import { useState, useEffect } from 'react';

interface UseCountdownOptions {
  expiresAt: string;
  onExpire?: () => void;
}

export function useCountdown({ expiresAt, onExpire }: UseCountdownOptions) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expirationTime = new Date(expiresAt).getTime();
      const difference = expirationTime - now;

      if (difference <= 0) {
        setTimeLeft(0);
        setIsExpired(true);
        onExpire?.();
        return;
      }

      setTimeLeft(difference);
      setIsExpired(false);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isExpired,
  };
}
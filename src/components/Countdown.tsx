import { useCountdown } from '../hooks/useCountdown';

interface CountdownProps {
  expiresAt: string;
  onExpire?: () => void;
}

export function Countdown({ expiresAt, onExpire }: CountdownProps) {
  const { formattedTime, isExpired } = useCountdown({ expiresAt, onExpire });

  if (isExpired) {
    return (
      <div className="text-center">
        <p className="text-red-600 font-semibold">Reservation Expired</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-sm text-gray-600 mb-1">Time Remaining</p>
      <p className="text-3xl font-mono font-bold text-gray-900">{formattedTime}</p>
    </div>
  );
}
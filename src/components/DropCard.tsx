import { useAuth } from '../hooks/useAuth';
import { useReservation } from '../hooks/useReservation';
import type { Drop } from '../types';

interface DropCardProps {
  drop: Drop;
}

export function DropCard({ drop }: DropCardProps) {
  const { user } = useAuth();
  const { createReservation } = useReservation(user?.id);
  const isReserving = createReservation.isPending;

  const hasStarted = new Date(drop.startsAt) <= new Date();
  const isOutOfStock = drop.availableStock === 0;

  const handleReserve = () => {
    if (!user) return;
    createReservation.mutate({ userId: user.id, dropId: drop.id });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{drop.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{drop.category}</p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {drop.availableStock} left
        </span>
      </div>

      <div className="mb-4">
      <p className="text-sm text-gray-600">
          <span className="font-medium">Starts:</span>{' '}
          {new Date(drop.startsAt).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          })}
        </p>
      </div>

      <button
        onClick={handleReserve}
        disabled={!hasStarted || isOutOfStock || isReserving}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {isReserving
          ? 'Reserving...'
          : !hasStarted
          ? 'Not Started'
          : isOutOfStock
          ? 'Out of Stock'
          : 'Reserve'}
      </button>
    </div>
  );
}
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useReservation } from '../hooks/useReservation';
import { Countdown } from '../components/Countdown';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';
import { useQueryClient } from '@tanstack/react-query';

export function ReservationPage() {
  const { user } = useAuth();
  const { activeReservation, isLoading, createPurchase, createPurchase: purchase } = useReservation(user?.id);
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  // Refetch reservations when page loads to get latest data
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['reservations', user?.id] });
  }, [queryClient, user?.id]);

  const handlePurchase = () => {
    if (!activeReservation || !user) return;
    createPurchase.mutate(
      {
        userId: user.id,
        dropId: activeReservation.dropId,
        reservationId: activeReservation.id,
      },
      {
        onError: (err: Error) => {
          toast.showToast(err.message, 'error');
        },
        onSuccess: () => {
          toast.showToast('Purchase completed successfully!', 'success');
          // Redirect to dashboard after short delay to show success message
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading reservation...</p>
        </div>
      </div>
    );
  }

  if (!activeReservation) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Active Reservation</h1>
          <p className="text-gray-600 mb-6">You don't have any active reservations.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
          >
            Browse Drops
          </button>
        </div>
      </div>
    );
  }

  const isPurchased = activeReservation.status === 'PURCHASED';
  const isExpired = activeReservation.status === 'EXPIRED';

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Reservation</h1>
        <p className="mt-2 text-gray-600">Complete your purchase before time runs out</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Drop #{activeReservation.dropId}</h2>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            isPurchased
              ? 'bg-green-100 text-green-800'
              : isExpired
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {activeReservation.status}
          </span>
        </div>

        {!isPurchased && !isExpired && (
          <div className="mb-6">
            <Countdown expiresAt={activeReservation.expiresAt} />
          </div>
        )}

        {isPurchased && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 font-medium">Purchase successful!</p>
            <p className="text-sm text-green-600 mt-1">Thank you for your purchase.</p>
          </div>
        )}

        {isExpired && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 font-medium">Reservation expired</p>
            <p className="text-sm text-red-600 mt-1">This reservation is no longer valid.</p>
          </div>
        )}


        {!isPurchased && !isExpired && (
          <button
            onClick={handlePurchase}
            disabled={purchase.isPending}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {purchase.isPending ? 'Processing...' : 'Complete Purchase'}
          </button>
        )}

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
import { useQuery } from '@tanstack/react-query';
import { activityApi } from '../api/activity.api';

export function ActivityFeed() {
  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['activity'],
    queryFn: activityApi.getLatest,
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      {activities.length === 0 ? (
        <p className="text-gray-500">No recent activity</p>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.purchaseId}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity.username} purchased {activity.dropName}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(activity.purchasedAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
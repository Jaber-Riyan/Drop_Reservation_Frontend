import { useQuery } from '@tanstack/react-query';
import { dropApi } from '../api/drop.api';
import { DropCard } from '../components/DropCard';
import { ActivityFeed } from '../components/ActivityFeed';

export function DashboardPage() {
  const { data: drops = [], isLoading } = useQuery({
    queryKey: ['drops'],
    queryFn: dropApi.getAll,
    refetchInterval: 30000,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Browse and reserve sneaker drops</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading drops...</p>
            </div>
          ) : drops.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No drops available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {drops.map((drop) => (
                <DropCard key={drop.id} drop={drop} />
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
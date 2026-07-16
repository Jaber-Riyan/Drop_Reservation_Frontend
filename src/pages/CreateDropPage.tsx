import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export function CreateDropPage() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [initialStock, setInitialStock] = useState('');
  const [startsAt, setStartsAt] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !category.trim() || !initialStock || !startsAt) {
      setError('Please fill in all fields');
      return;
    }

    const stock = parseInt(initialStock, 10);
    if (isNaN(stock) || stock <= 0) {
      setError('Stock must be a positive number');
      return;
    }

    // Note: The backend doesn't have a create drop endpoint in the requirements
    // This is a placeholder for the UI
    alert('Create drop functionality would be implemented here with a POST /drops endpoint');
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Drop</h1>
        <p className="mt-2 text-gray-600">Set up a new sneaker drop</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Drop Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., Air Jordan 1 Retro High"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              id="category"
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., Shoes"
            />
          </div>

          <div>
            <label htmlFor="initialStock" className="block text-sm font-medium text-gray-700">
              Initial Stock
            </label>
            <input
              id="initialStock"
              type="number"
              required
              min="1"
              value={initialStock}
              onChange={(e) => setInitialStock(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., 50"
            />
          </div>

          <div>
            <label htmlFor="startsAt" className="block text-sm font-medium text-gray-700">
              Start Time
            </label>
            <input
              id="startsAt"
              type="datetime-local"
              required
              value={startsAt}
              onChange={(e) => setStartsAt(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Create Drop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
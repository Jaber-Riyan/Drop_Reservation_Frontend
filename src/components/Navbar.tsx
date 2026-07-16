import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="text-xl font-bold text-gray-900">
              Sneaker Drop
            </Link>
            <div className="flex space-x-4">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/drop/create"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Create Drop
              </Link>
              <Link
                to="/reservation"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Reservation
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Logged in as: <span className="font-medium">{user.username}</span>
            </span>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
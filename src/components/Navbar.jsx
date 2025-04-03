import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { loggedInUser, logout, cart } = useApp();
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <div className="text-2xl font-bold">🛍️ Lappiy</div>

      {loggedInUser && (
        <div className="flex gap-4 items-center">
          <Link to="/" className="flex items-center gap-1">
            🏠 Home
          </Link>
          <Link to="/about" className="flex items-center gap-1">
            ℹ️ About
          </Link>
          <Link to="/cart" className="flex items-center gap-1 relative">
            🛒 Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 rounded-full text-xs px-2">
                {itemCount}
              </span>
            )}
          </Link>
          <Link to="/orders" className="flex items-center gap-1">
            📦 Orders
          </Link>
        </div>
      )}

      {loggedInUser ? (
        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      ) : (
        <Link to="/login">Login / Register</Link>
      )}
    </nav>
  );
}

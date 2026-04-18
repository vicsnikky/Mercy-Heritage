import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/useStore";
import { LogOut, Home, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

export function AdminLayout() {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const logout = useAppStore((state) => state.logout);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-navy text-white flex flex-col p-4 shrink-0 shadow-xl z-20 shrink-0">
        <div className="flex items-center gap-3 mb-10 px-2 pt-4">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-navy font-bold">
            MH
          </div>
          <span className="font-bold text-lg">Admin Panel</span>
        </div>
        
        <nav className="flex-grow flex flex-col gap-2">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-lg text-white font-medium">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link to="/" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg text-gray-300 hover:text-white transition-colors">
            <Home className="w-5 h-5" />
            View Website
          </Link>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 hover:bg-red-500/20 text-red-300 hover:text-red-100 rounded-lg transition-colors mt-auto"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 overflow-auto h-screen">
        <Outlet />
      </main>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAppStore } from "../../store/useStore";
import { ShieldCheck } from "lucide-react";

export function AdminAuth() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = useAppStore(state => state.login);
  const isAuthenticated = useAppStore(state => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin/dashboard');
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-navy/10 rounded-2xl flex items-center justify-center text-navy mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-navy">Admin Access</h2>
          <p className="text-gray-500 text-sm mt-1">Enter your password to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (Default: Admin123)"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent text-center text-lg"
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
          <button 
            type="submit"
            className="w-full bg-navy text-white font-bold py-3 rounded-lg hover:bg-navy-dark transition-colors"
          >
            Access Dashboard
          </button>
        </form>
        
        <p className="text-center text-xs text-gray-400 mt-8">
          &copy; Mercy Heritage Nursery and Primary School
        </p>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { api } from "./api/axios";
import { useToast } from "./context/ToastContext";
import { useUser } from "./context/UserContext";
import { handleApiError } from "./utils/errorHandler";

const Navbar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout, setUser } = useUser();
  const { addToast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleLogout = () => {
    logout();
    addToast("Logged out safely.", "info");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("profileImg", file);

    try {
      const response = await api.patch("/users/profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(response.data.response.data);
      addToast("Profile image updated!", "success");
    } catch (err: unknown) {
      addToast(handleApiError(err, "Failed to update image"), "error");
    } finally {
      setIsUploading(false);
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Availability", path: "/train-availability" },
    { name: "About Us", path: "/about" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
    { name: "Bookings", path: "/booking-confirmation" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background-dark/80 backdrop-blur-md print:hidden">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-icons text-white">train</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Rail<span className="text-primary">Express</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={
                  isActive
                    ? "text-primary font-medium"
                    : "text-slate-400 hover:text-white transition-colors"
                }
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <label className="relative w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden cursor-pointer group flex-shrink-0">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />

                  {isUploading ? (
                    <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  ) : user?.profileImg ? (
                    <img
                      src={user.profileImg}
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="material-icons text-primary text-sm">
                      person
                    </span>
                  )}

                  {/* Hover Overlay */}
                  {!isUploading && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="material-icons text-white text-[12px]">
                        camera_alt
                      </span>
                    </div>
                  )}
                </label>
                <span className="text-sm font-medium text-slate-300">
                  {user?.username}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium hover:bg-white/5 rounded-lg transition-colors text-red-400 hover:text-red-300 flex items-center gap-1"
              >
                <span className="material-icons text-sm">logout</span>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium hover:bg-white/5 rounded-lg transition-colors text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-primary hover:bg-primary/90 rounded-lg text-sm font-semibold transition-all text-white"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

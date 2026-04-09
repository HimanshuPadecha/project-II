import React, { createContext, useContext, useState, useEffect } from "react";

interface Admin {
  _id: string;
  username: string;
  email: string;
}

interface AdminContextType {
  isAdminAuth: boolean;
  admin: Admin | null;
  setAdminAuth: (auth: boolean, adminData: Admin | null) => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuth, setIsAdminAuth] = useState(() => {
    return !!localStorage.getItem("adminData");
  });
  
  const [admin, setAdmin] = useState<Admin | null>(() => {
    const storedAdmin = localStorage.getItem("adminData");
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });

  useEffect(() => {
    // State is already hydrated synchronously.
  }, []);

  const setAdminAuth = (auth: boolean, adminData: Admin | null) => {
    setIsAdminAuth(auth);
    setAdmin(adminData);
    if (adminData) {
      localStorage.setItem("adminData", JSON.stringify(adminData));
    } else {
      localStorage.removeItem("adminData");
    }
  };

  const logout = () => {
    setAdminAuth(false, null);
  };

  return (
    <AdminContext.Provider value={{ isAdminAuth, admin, setAdminAuth, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

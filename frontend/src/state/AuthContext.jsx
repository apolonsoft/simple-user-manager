import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth-user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const value = useMemo(() => {
    return {
      user,
      isAuthenticated: Boolean(user),
      login: (authUser) => {
        setUser(authUser);
        localStorage.setItem("auth-user", JSON.stringify(authUser));
      },
      logout: () => {
        setUser(null);
        localStorage.removeItem("auth-user");
      }
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}

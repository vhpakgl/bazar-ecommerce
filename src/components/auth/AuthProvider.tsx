"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AUTH_STORAGE_KEY = "bazar-commerce-user";

export type AuthUser = {
  name: string;
  email: string;
  role: "admin" | "customer";
};

type AuthContextValue = {
  user: AuthUser | null;
  loaded: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (name: string, email: string, password: string) => Promise<AuthUser>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const saved = window.localStorage.getItem(AUTH_STORAGE_KEY);
        setUser(saved ? (JSON.parse(saved) as AuthUser) : null);
      } catch {
        setUser(null);
      } finally {
        setLoaded(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (user) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [loaded, user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loaded,
      async login(email, password) {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (!response.ok) throw new Error("E-posta veya şifre hatalı.");
        const nextUser = (await response.json()) as AuthUser;
        setUser(nextUser);
        return nextUser;
      },
      async register(name, email, password) {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        if (!response.ok) throw new Error("Üyelik oluşturulamadı.");
        const nextUser = (await response.json()) as AuthUser;
        setUser(nextUser);
        return nextUser;
      },
      logout() {
        setUser(null);
      },
    }),
    [loaded, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}

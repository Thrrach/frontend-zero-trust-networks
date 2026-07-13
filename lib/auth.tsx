'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AuthTokens, LoginValues, login, logout } from './api';

type AuthContextValue = { session: AuthTokens | null; signIn: (values: LoginValues) => Promise<void>; signOut: () => Promise<void> };
const storageKey = 'ztna.session';
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthTokens | null>(null);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(storageKey);
    if (stored) {
      try { setSession(JSON.parse(stored) as AuthTokens); } catch { window.sessionStorage.removeItem(storageKey); }
    }
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    session,
    async signIn(values) {
      const tokens = await login(values);
      window.sessionStorage.setItem(storageKey, JSON.stringify(tokens));
      setSession(tokens);
    },
    async signOut() {
      try { if (session) await logout(session.refreshToken); } finally { window.sessionStorage.removeItem(storageKey); setSession(null); }
    },
  }), [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

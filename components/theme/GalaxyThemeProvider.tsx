'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  GALAXY_THEMES,
  DEFAULT_THEME_ID,
  THEME_STORAGE_KEY,
  getTheme,
  type GalaxyTheme,
} from './galaxy-theme';

type GalaxyThemeContextValue = {
  themeId: string;
  theme: GalaxyTheme;
  themes: GalaxyTheme[];
  setThemeId: (id: string) => void;
};

const GalaxyThemeContext = createContext<GalaxyThemeContextValue | null>(null);

function applyVars(theme: GalaxyTheme) {
  if (typeof document === 'undefined') return;
  const s = document.documentElement.style;
  s.setProperty('--galaxy-accent', theme.accent);
  s.setProperty('--galaxy-glow', theme.glow);
  s.setProperty('--galaxy-filter', theme.filter);
  s.setProperty('--galaxy-on-accent', theme.onAccent);
}

export function GalaxyThemeProvider({ children }: { children: React.ReactNode }) {
  // Arranca en el default para que el render del servidor y la primera pasada del
  // cliente coincidan (sin hydration mismatch). El script de pre-pintado ya dejó
  // las variables CSS correctas; acá sincronizamos el estado de React tras montar.
  const [themeId, setId] = useState(DEFAULT_THEME_ID);

  useEffect(() => {
    let stored = DEFAULT_THEME_ID;
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved && GALAXY_THEMES.some(t => t.id === saved)) stored = saved;
    } catch {
      /* localStorage no disponible */
    }
    setId(stored);
    applyVars(getTheme(stored));
  }, []);

  const setThemeId = useCallback((id: string) => {
    setId(id);
    applyVars(getTheme(id));
    try {
      localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {
      /* no-op */
    }
  }, []);

  const theme = getTheme(themeId);

  return (
    <GalaxyThemeContext.Provider value={{ themeId, theme, themes: GALAXY_THEMES, setThemeId }}>
      {children}
    </GalaxyThemeContext.Provider>
  );
}

export function useGalaxyTheme(): GalaxyThemeContextValue {
  const ctx = useContext(GalaxyThemeContext);
  if (!ctx) {
    throw new Error('useGalaxyTheme debe usarse dentro de <GalaxyThemeProvider>');
  }
  return ctx;
}

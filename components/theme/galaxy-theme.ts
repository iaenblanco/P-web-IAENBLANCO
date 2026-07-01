// Definición única de los temas de la galaxia + acentos de marca.
// Es un módulo framework-agnóstico (sin React) para poder usarlo tanto en el
// provider cliente como en el script de pre-pintado del layout (servidor).

export type GalaxyTheme = {
  id: string;
  name: string;
  dot: string;        // swatch del selector
  filter: string;     // hue-rotate CSS aplicado a la animación Spline
  accent: string;     // color de acento para CTAs/bordes/textos destacados
  glow: string;       // rgba para sombras/glow del acento
  onAccent: string;   // color de texto legible SOBRE el acento
};

export const GALAXY_THEMES: GalaxyTheme[] = [
  { id: 'violeta',   name: 'Violeta',   dot: '#a78bfa', filter: 'none',                                              accent: '#a78bfa', glow: 'rgba(139,92,246,0.5)',  onAccent: '#0a0a0f' },
  { id: 'cian',      name: 'Cian',      dot: '#22d3ee', filter: 'hue-rotate(245deg) saturate(1.2)',                  accent: '#22d3ee', glow: 'rgba(6,182,212,0.5)',   onAccent: '#0a0a0f' },
  { id: 'esmeralda', name: 'Esmeralda', dot: '#34d399', filter: 'hue-rotate(175deg) saturate(1.1) brightness(1.03)', accent: '#34d399', glow: 'rgba(16,185,129,0.5)',  onAccent: '#0a0a0f' },
  { id: 'magenta',   name: 'Magenta',   dot: '#f472b6', filter: 'hue-rotate(40deg) saturate(1.25)',                  accent: '#f472b6', glow: 'rgba(236,72,153,0.5)',  onAccent: '#0a0a0f' },
];

export const DEFAULT_THEME_ID = 'violeta';
export const THEME_STORAGE_KEY = 'galaxy-theme';

export function getTheme(id: string | null | undefined): GalaxyTheme {
  return GALAXY_THEMES.find(t => t.id === id) ?? GALAXY_THEMES[0];
}

// Script inline que corre ANTES del primer pintado en cada página, para setear
// las variables CSS del acento/animación desde localStorage y evitar el FOUC
// (flash of unstyled content). Se inyecta en el <head> del layout compartido, así
// el tema se aplica en TODO el sitio y persiste al navegar.
export function themeInitScript(): string {
  const map = Object.fromEntries(
    GALAXY_THEMES.map(t => [t.id, { accent: t.accent, glow: t.glow, filter: t.filter, onAccent: t.onAccent }])
  );
  return `(function(){try{var m=${JSON.stringify(map)};var id=localStorage.getItem(${JSON.stringify(
    THEME_STORAGE_KEY
  )})||${JSON.stringify(DEFAULT_THEME_ID)};var t=m[id]||m[${JSON.stringify(
    DEFAULT_THEME_ID
  )}];var s=document.documentElement.style;s.setProperty('--galaxy-accent',t.accent);s.setProperty('--galaxy-glow',t.glow);s.setProperty('--galaxy-filter',t.filter);s.setProperty('--galaxy-on-accent',t.onAccent);}catch(e){}})();`;
}

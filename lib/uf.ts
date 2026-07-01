'use client';

import { useEffect, useState } from 'react';

// Valor de respaldo (CLP por 1 UF) por si la API falla o tarda. Aprox. jun-2026.
// Solo se usa como fallback; el valor real se pide en vivo a mindicador.cl.
const UF_FALLBACK_CLP = 39200;
const UF_ENDPOINT = 'https://mindicador.cl/api/uf';

export type UFState = {
  uf: number;          // CLP por 1 UF (real o fallback)
  loading: boolean;
  isFallback: boolean; // true si se está usando el valor de respaldo
  fecha: string | null;
};

/**
 * Obtiene el valor de la UF de hoy desde la API pública de mindicador.cl.
 * Como el sitio es de export estático, la consulta se hace en el cliente.
 */
export function useUF(): UFState {
  const [state, setState] = useState<UFState>({
    uf: UF_FALLBACK_CLP,
    loading: true,
    isFallback: true,
    fecha: null,
  });

  useEffect(() => {
    let alive = true;
    fetch(UF_ENDPOINT)
      .then(r => (r.ok ? r.json() : Promise.reject(new Error('respuesta no ok'))))
      .then(data => {
        if (!alive) return;
        const serie = data && data.serie;
        const latest = Array.isArray(serie) && serie.length ? serie[0] : null;
        const valor = latest && typeof latest.valor === 'number' ? latest.valor : null;
        if (valor) {
          setState({ uf: valor, loading: false, isFallback: false, fecha: latest.fecha ?? null });
        } else {
          setState(s => ({ ...s, loading: false }));
        }
      })
      .catch(() => {
        if (alive) setState(s => ({ ...s, loading: false }));
      });
    return () => {
      alive = false;
    };
  }, []);

  return state;
}

const clpFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

const ufFormatter = new Intl.NumberFormat('es-CL', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

/** Formatea un monto CLP: 1234567 -> "$1.234.567". */
export function formatCLP(clp: number): string {
  return clpFormatter.format(Math.round(clp));
}

/** Formatea un valor en UF: 25 -> "25 UF". */
export function formatUF(uf: number): string {
  return `${ufFormatter.format(uf)} UF`;
}

/** Convierte un precio en UF a CLP usando el valor de la UF de hoy. */
export function ufToCLP(priceUF: number, ufValue: number): number {
  return priceUF * ufValue;
}

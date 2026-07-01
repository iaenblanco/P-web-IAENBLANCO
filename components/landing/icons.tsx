import type { SVGProps } from 'react';

/**
 * Set de íconos propio de IAenBlanco (no son Lucide/Heroicons).
 * Sistema común: viewBox 24, trazo 1.75 redondeado, y un "spark" (punto sólido
 * en currentColor) como firma. En el badge oscuro el trazo es blanco y, al hacer
 * hover del `group`, todo pasa al color del tema (currentColor sigue al texto).
 */

type IconProps = { className?: string } & SVGProps<SVGSVGElement>;

function Svg({ className, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

const DOT = { fill: 'currentColor', stroke: 'none' } as const;

/** Automatización: dos nodos que confluyen en un nodo de salida (spark). */
export function AutomationFlow(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="6" cy="7" r="2.1" />
      <circle cx="6" cy="17" r="2.1" />
      <circle cx="18" cy="12" r="2.3" {...DOT} />
      <path d="M8.1 7 H12 Q15.6 7 15.9 10" />
      <path d="M8.1 17 H12 Q15.6 17 15.9 14" />
    </Svg>
  );
}

/** Asistente/Chat: burbuja con forma de onda (voz/IA) y colita. */
export function AssistantWave(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4.5" y="5" width="15" height="11" rx="3.5" />
      <path d="M8 16 V18.8 L11.2 16" />
      <path d="M8.6 9.6 V11.6" />
      <path d="M11 8.2 V12.9" />
      <path d="M13.4 9.2 V11.9" />
      <path d="M15.8 8.6 V12.4" />
    </Svg>
  );
}

/** Web que convierte: ventana con línea ascendente. */
export function WebGrowth(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <path d="M3.5 9 H20.5" />
      <circle cx="6.3" cy="7" r="0.55" {...DOT} />
      <circle cx="8.3" cy="7" r="0.55" {...DOT} />
      <polyline points="7 15.5 10.5 12.5 13 14.5 17 10.5" />
      <path d="M17 10.5 H14.6 M17 10.5 V12.9" />
    </Svg>
  );
}

/** Auditoría: marco de foco (motivo "en blanco") con spark central. */
export function AuditFrame(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.5 8.5 V6 A1.5 1.5 0 0 1 6 4.5 H8.5" />
      <path d="M15.5 4.5 H18 A1.5 1.5 0 0 1 19.5 6 V8.5" />
      <path d="M19.5 15.5 V18 A1.5 1.5 0 0 1 18 19.5 H15.5" />
      <path d="M8.5 19.5 H6 A1.5 1.5 0 0 1 4.5 18 V15.5" />
      <circle cx="12" cy="12" r="1.5" {...DOT} />
    </Svg>
  );
}

/** Tienda (Shopify): fachada con toldo y puerta. */
export function Storefront(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 9 L5.8 5.5 H18.2 L20 9" />
      <path d="M5.6 9 V18.5 A1 1 0 0 0 6.6 19.5 H17.4 A1 1 0 0 0 18.4 18.5 V9" />
      <path d="M10 19.5 V14 H14 V19.5" />
      <path d="M9.4 5.5 L8.7 9 M14.6 5.5 L15.3 9" />
    </Svg>
  );
}

/** A medida / IA: constelación de nodos con núcleo (spark). */
export function NodeNetwork(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7.2 7.8 L10.4 10.6 M16.8 7.8 L13.6 10.6 M7.2 16.2 L10.4 13.4 M16.8 16.2 L13.6 13.4" />
      <circle cx="12" cy="12" r="2" {...DOT} />
      <circle cx="6" cy="7" r="1.5" />
      <circle cx="18" cy="7" r="1.5" />
      <circle cx="6" cy="17" r="1.5" />
      <circle cx="18" cy="17" r="1.5" />
    </Svg>
  );
}

/** Check con spark en la punta (confianza / verificado). */
export function SparkCheck(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.5 12.5 L9 17 L19.5 6" />
      <circle cx="19.5" cy="6" r="1.25" {...DOT} />
    </Svg>
  );
}

/** Empresa formal: edificio con ventanas y puerta. */
export function Building(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.5 20 V6.5 A1 1 0 0 1 7.5 5.5 H16.5 A1 1 0 0 1 17.5 6.5 V20" />
      <path d="M4.5 20 H19.5" />
      <path d="M10.5 20 V16.5 H13.5 V20" />
      <circle cx="10" cy="9.5" r="0.7" {...DOT} />
      <circle cx="14" cy="9.5" r="0.7" {...DOT} />
      <circle cx="10" cy="13" r="0.7" {...DOT} />
      <circle cx="14" cy="13" r="0.7" {...DOT} />
    </Svg>
  );
}

/** Resultados: barras ascendentes con línea de tendencia y spark. */
export function GrowthBars(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.5 19.5 H19.5" />
      <path d="M7.5 19.5 V15" />
      <path d="M12 19.5 V11.5" />
      <path d="M16.5 19.5 V7.5" />
      <path d="M7.5 15 L12 11.5 L16.5 7.5" />
      <circle cx="16.5" cy="7.5" r="1.25" {...DOT} />
    </Svg>
  );
}

/** Tiempo de respuesta: cronómetro. */
export function Stopwatch(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="13.5" r="6.5" />
      <path d="M9.5 4 H14.5" />
      <path d="M12 4 V6.9" />
      <path d="M18.4 8 L20 6.4" />
      <path d="M12 13.5 V9.8" />
      <path d="M12 13.5 L14.7 15.2" />
      <circle cx="12" cy="13.5" r="0.9" {...DOT} />
    </Svg>
  );
}

/** Comillas (testimonios). */
export function QuoteMark(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.2 7.5 H10.2 V11.6 Q10.2 14.6 7.2 15.4 V13.5 Q8.6 13.1 8.7 11.9 H6.2 Z" {...DOT} />
      <path d="M13.6 7.5 H17.6 V11.6 Q17.6 14.6 14.6 15.4 V13.5 Q16 13.1 16.1 11.9 H13.6 Z" {...DOT} />
    </Svg>
  );
}

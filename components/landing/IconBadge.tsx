import type { ComponentType } from 'react';

/**
 * Badge circular oscuro para íconos. Dentro de un contenedor con la clase `group`,
 * al hacer hover se enciende con el color del tema (var(--galaxy-accent)) y sube
 * apenas. Unifica el lenguaje visual con los badges numerados del Proceso.
 */
export function IconBadge({
  Icon,
  className = '',
}: {
  Icon: ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <span
      className={
        'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white ' +
        'transition-all duration-300 ease-out ' +
        'group-hover:bg-[var(--galaxy-accent)] group-hover:text-[color:var(--galaxy-on-accent)] group-hover:-translate-y-0.5 ' +
        className
      }
    >
      <Icon className="h-5 w-5" />
    </span>
  );
}

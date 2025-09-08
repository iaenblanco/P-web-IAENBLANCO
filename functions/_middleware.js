export function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  
  // Si es una ruta de API, continuar normalmente
  if (url.pathname.startsWith('/api/')) {
    return next();
  }
  
  // Para todas las demás rutas, servir index.html
  // Esto permite que el router de Next.js maneje las rutas del lado del cliente
  if (!url.pathname.includes('.') && !url.pathname.startsWith('/_next/')) {
    url.pathname = '/index.html';
    return fetch(new Request(url, request));
  }
  
  return next();
}

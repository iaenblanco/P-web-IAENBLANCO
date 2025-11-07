'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    Cal?: any;
  }
}

interface CalButtonProps {
  calLink: string;
  children: React.ReactNode;
  className?: string;
}

export const CalButton: React.FC<CalButtonProps> = ({ calLink, children, className }) => {
  useEffect(() => {
    // Cargar el script de Cal.com inline
    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.q) { cal.q = []; }
          cal.q.push(ar);
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            typeof namespace === "string" ? (C[namespace] = api) && p(api, ar) : p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, document, "init");
      Cal("init", {origin:"https://cal.com"});
      Cal("ui", {"styles":{"branding":{"brandColor":"#06b6d4"}},"hideEventTypeDetails":false});
    `;
    
    // Solo agregar si no existe
    if (!document.querySelector('script[data-cal-inline]')) {
      inlineScript.setAttribute('data-cal-inline', 'true');
      document.head.appendChild(inlineScript);
      console.log('✅ Script inline de Cal.com agregado');
    }

    // Cargar el script externo
    const externalScript = document.createElement('script');
    externalScript.src = 'https://app.cal.com/embed/embed.js';
    externalScript.async = true;
    
    externalScript.onload = () => {
      console.log('✅ Cal.com embed.js cargado y listo');
    };
    
    externalScript.onerror = () => {
      console.error('❌ Error cargando Cal.com embed.js');
    };
    
    // Solo agregar si no existe
    if (!document.querySelector('script[src="https://app.cal.com/embed/embed.js"]')) {
      document.head.appendChild(externalScript);
    }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log('🔵 Click detectado, intentando abrir modal');
    console.log('🔗 Link:', calLink);
    
    // Crear un iframe modal manualmente si Cal.com no funciona automáticamente
    if (window.Cal && window.Cal.ns && window.Cal.ns['']) {
      try {
        console.log('📞 Llamando a Cal.com API');
        // Intentar crear el modal programáticamente
        const calNamespace = window.Cal.ns[''];
        
        // Crear un elemento temporal con los atributos necesarios
        const tempElement = document.createElement('div');
        tempElement.setAttribute('data-cal-link', calLink);
        tempElement.setAttribute('data-cal-namespace', '');
        
        // Simular un click en ese elemento
        tempElement.click();
        
        console.log('✅ Modal iniciado');
      } catch (error) {
        console.error('❌ Error con Cal API:', error);
        console.log('🔄 Abriendo en iframe modal manualmente...');
        
        // Crear modal iframe manualmente como último recurso
        const modal = document.createElement('div');
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;';
        modal.onclick = () => modal.remove();
        
        const iframe = document.createElement('iframe');
        iframe.src = `https://cal.com/${calLink}`;
        iframe.style.cssText = 'width:90%;max-width:1000px;height:90%;max-height:800px;border:none;border-radius:8px;';
        iframe.onclick = (e) => e.stopPropagation();
        
        modal.appendChild(iframe);
        document.body.appendChild(modal);
        
        console.log('✅ Iframe modal creado manualmente');
      }
    } else {
      console.warn('⚠️ Cal.com no disponible, usando iframe manual');
      
      // Crear modal iframe manualmente
      const modal = document.createElement('div');
      modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;';
      modal.onclick = () => modal.remove();
      
      const closeButton = document.createElement('button');
      closeButton.innerHTML = '✕';
      closeButton.style.cssText = 'position:absolute;top:20px;right:20px;background:white;color:black;border:none;border-radius:50%;width:40px;height:40px;font-size:24px;cursor:pointer;z-index:10000;';
      closeButton.onclick = () => modal.remove();
      
      const iframe = document.createElement('iframe');
      iframe.src = `https://cal.com/${calLink}`;
      iframe.style.cssText = 'width:90%;max-width:1000px;height:90%;max-height:800px;border:none;border-radius:8px;background:white;';
      iframe.onclick = (e) => e.stopPropagation();
      
      modal.appendChild(closeButton);
      modal.appendChild(iframe);
      document.body.appendChild(modal);
      
      console.log('✅ Iframe modal creado (fallback)');
    }
  };

  return (
    <a 
      href={`https://cal.com/${calLink}`}
      className={className}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </a>
  );
};


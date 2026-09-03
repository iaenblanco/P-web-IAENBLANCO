
    (function(w,d){
      if (w.__iaenblancoTracking) return;
      w.__iaenblancoTracking = true;
      var serviceCatalog = __IAENBLANCO_SERVICE_CATALOG__;
      var productCatalog = __IAENBLANCO_PRODUCT_CATALOG__;
      function clean(text){ return (text || '').replace(/\s+/g,' ').trim().slice(0,120); }
      function sectionFor(element){
        var section = element.closest ? element.closest('section') : null;
        if (!section) return '';
        return section.id || section.getAttribute('aria-label') || section.className || '';
      }
      function deviceType(){
        var width = w.innerWidth || d.documentElement.clientWidth || 0;
        if (width < 768) return 'mobile';
        if (width < 1100) return 'tablet';
        return 'desktop';
      }
      function trafficSourceRaw(){
        var params = new URLSearchParams(w.location.search);
        return params.get('utm_source') || params.get('source') || d.referrer || 'direct';
      }
      function pathFor(anchor){
        try { return new URL(anchor.href || anchor.getAttribute('href') || '', w.location.href).pathname; }
        catch (error) { return anchor.getAttribute('href') || ''; }
      }
      function serviceNameFrom(anchor){
        var explicit = anchor.getAttribute('data-service-name');
        if (explicit) return clean(explicit);
        return serviceMetaFromPath(pathFor(anchor)).name;
      }
      function serviceIdFrom(anchor){
        var explicit = anchor.getAttribute('data-service-id');
        if (explicit) return clean(explicit);
        return serviceMetaFromPath(pathFor(anchor)).id;
      }
      function serviceNameFromPath(path){
        return serviceMetaFromPath(path).name;
      }
      function serviceIdFromPath(path){
        return serviceMetaFromPath(path).id;
      }
      function serviceMetaFromPath(path){
        var slug = path.split('/servicios/')[1] || '';
        slug = slug.replace(/\/$/, '');
        return serviceCatalog[slug] || { id: '', name: '' };
      }
      function productIdFrom(anchor){
        var explicit = anchor.getAttribute('data-product-id');
        if (explicit) return clean(explicit);
        return productMetaFrom(anchor).id;
      }
      function productNameFrom(anchor){
        return productMetaFrom(anchor).name;
      }
      function productMetaFrom(anchor){
        var explicitId = anchor.getAttribute('data-product-id');
        var explicitName = anchor.getAttribute('data-product-name');
        if (explicitId || explicitName) return { id: clean(explicitId), name: clean(explicitName) };
        var href = anchor.getAttribute('href') || '';
        var absolute = anchor.href || href;
        var anchorPath = pathFor(anchor);
        for (var index = 0; index < productCatalog.length; index += 1) {
          var product = productCatalog[index];
          if (product.href.charAt(0) === '/' && anchorPath.indexOf(product.href) === 0) return { id: product.id, name: product.name };
          if (product.href.charAt(0) !== '/' && absolute.indexOf(product.href) !== -1) return { id: product.id, name: product.name };
        }
        return { id: '', name: '' };
      }
      function eventNameFor(anchor){
        var explicitEvent = anchor.getAttribute('data-analytics-event');
        if (explicitEvent) return clean(explicitEvent);
        var href = anchor.getAttribute('href') || '';
        var absolute = anchor.href || href;
        if (href.indexOf('wa.me/') !== -1 || absolute.indexOf('wa.me/') !== -1) {
          return w.location.pathname.indexOf('/servicios') === 0 ? 'service_whatsapp_click' : 'cta_whatsapp_click';
        }
        if (href.indexOf('/servicios/') === 0 || absolute.indexOf('/servicios/') !== -1) return 'service_click';
        if (productMetaFrom(anchor).id) return 'product_click';
        if (href.indexOf('/contacto') === 0 || absolute.indexOf('/contacto') !== -1 || href.indexOf('mailto:') === 0) return 'contact_click';
        return '';
      }
      if (w.location.pathname.indexOf('/servicios') === 0) {
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: 'service_view',
          service_id: serviceIdFromPath(w.location.pathname),
          service_name: serviceNameFromPath(w.location.pathname),
          page_path: w.location.pathname,
          device_type: deviceType(),
          traffic_source_raw: trafficSourceRaw()
        });
      }
      d.addEventListener('click', function(event){
        var target = event.target;
        var anchor = target && target.closest ? target.closest('a[href]') : null;
        /* Aca vivia un evento 'case_click' aparte. No podia dispararse nunca,
           por dos motivos a la vez: buscaba .trust-proof-card,
           .featured-case__more article y .case-window, que ya no los pinta
           ningun componente, y ademas su rama exigia que el clic NO cayera en
           un enlace, cuando la tarjeta de trabajo es justamente un <a>.
           Sacarlo no pierde medicion: el clic en una tarjeta ya viaja por la
           via de abajo como 'service_case_click' -lo declara Trabajos.tsx en
           data-analytics-event, que eventNameFor respeta- y llega con
           case_name, que ese mismo push lee de data-case-name. */
        if (!anchor) return;
        var eventName = eventNameFor(anchor);
        if (!eventName) return;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: eventName,
          cta_text: clean(anchor.textContent),
          link_text: clean(anchor.textContent),
          link_url: anchor.href,
          destination: anchor.href,
          page_path: w.location.pathname,
          section: sectionFor(anchor),
          service_id: serviceIdFrom(anchor),
          service_name: serviceNameFrom(anchor),
          source_service_id: clean(anchor.getAttribute('data-source-service-id')),
          source_service_name: clean(anchor.getAttribute('data-source-service-name')),
          target_service_id: clean(anchor.getAttribute('data-target-service-id')) || serviceIdFrom(anchor),
          target_service_name: clean(anchor.getAttribute('data-target-service-name')) || serviceNameFrom(anchor),
          product_id: productIdFrom(anchor),
          product_name: productNameFrom(anchor),
          case_name: clean(anchor.getAttribute('data-case-name')),
          whatsapp_origin: clean(anchor.getAttribute('data-whatsapp-origin')),
          entry_problem: clean(anchor.getAttribute('data-entry-problem')),
          device_type: deviceType(),
          traffic_source_raw: trafficSourceRaw()
        });
      }, { passive: true });
      d.addEventListener('toggle', function(event){
        var target = event.target;
        var detail = target && target.closest ? target.closest('details[data-service-faq]') : null;
        if (!detail || !detail.open) return;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: 'service_faq_open',
          service_id: clean(detail.getAttribute('data-service-id')) || serviceIdFromPath(w.location.pathname),
          service_name: clean(detail.getAttribute('data-service-name')) || serviceNameFromPath(w.location.pathname),
          faq_question: clean(detail.querySelector('summary') ? detail.querySelector('summary').textContent : ''),
          page_path: w.location.pathname,
          section: sectionFor(detail),
          device_type: deviceType(),
          traffic_source_raw: trafficSourceRaw()
        });
      }, true);
      d.addEventListener('focusin', function(event){
        var target = event.target;
        var field = target && target.closest ? target.closest('input, textarea, select, [contenteditable="true"]') : null;
        if (!field) return;
        var form = field.closest ? field.closest('form') : null;
        /* La marca va en el <form>, no en el campo. Estaba en el campo, asi que
           cada uno de los cinco campos del formulario de contacto empujaba su
           propio form_start: quien recorria los cinco quedaba contado como
           cinco inicios y el embudo arrancaba con hasta cinco veces la gente
           que de verdad habia. */
        if (!form || form.__iaenblancoFormStarted) return;
        form.__iaenblancoFormStarted = true;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: 'form_start',
          form_name: form.getAttribute('name') || form.id || sectionFor(form) || 'form',
          page_path: w.location.pathname,
          section: sectionFor(form),
          device_type: deviceType(),
          traffic_source_raw: trafficSourceRaw()
        });
      }, { passive: true });
      /* Antes esto escuchaba 'submit' en document y en fase de captura. El
         unico <form> del sitio lleva noValidate y valida en React, o sea que el
         navegador deja pasar el submit igual cuando faltan campos: el evento
         llegaba aca antes de que nadie mirara nada y form_submit contaba
         tambien los intentos fallidos. Con eso el paso "envio" del embudo
         quedaba inflado justo por la gente que NO envio, que es lo contrario de
         lo que hay que medir. Ahora el aviso lo da el propio formulario, que es
         el unico que sabe si el envio era valido -ContactForm.tsx-, por el
         mismo puente de CustomEvent que ya usaban generate_lead y form_error. */
      d.addEventListener('iaenblanco:form_submit', function(event){
        var detail = event.detail || {};
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: 'form_submit',
          form_name: clean(detail.form_name) || 'form',
          page_path: w.location.pathname,
          section: clean(detail.section) || '',
          device_type: deviceType(),
          traffic_source_raw: trafficSourceRaw()
        });
      });
      d.addEventListener('iaenblanco:generate_lead', function(event){
        var detail = event.detail || {};
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: 'generate_lead',
          form_name: clean(detail.form_name) || clean(detail.formName) || 'form',
          page_path: w.location.pathname,
          section: clean(detail.section) || '',
          device_type: deviceType(),
          traffic_source_raw: trafficSourceRaw()
        });
      });
      d.addEventListener('iaenblanco:diagnostico_paso', function(event){
        var detail = event.detail || {};
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: 'diagnostico_step',
          step_id: clean(detail.paso_id),
          step_number: detail.paso_numero || 0,
          answer: clean(detail.respuesta),
          entry_problem: clean(detail.entry_problem),
          diagnostico_completado: clean(detail.completado),
          page_path: w.location.pathname,
          device_type: deviceType(),
          traffic_source_raw: trafficSourceRaw()
        });
      });
      d.addEventListener('iaenblanco:section_view', function(event){
        var detail = event.detail || {};
        var nombre = clean(detail.section_name);
        if (!nombre) return;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: 'section_view',
          section: nombre,
          section_name: nombre,
          page_path: w.location.pathname,
          device_type: deviceType(),
          traffic_source_raw: trafficSourceRaw()
        });
      });
      d.addEventListener('iaenblanco:form_error', function(event){
        var detail = event.detail || {};
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: 'form_error',
          form_name: clean(detail.form_name) || clean(detail.formName) || 'form',
          error_type: clean(detail.error_type) || clean(detail.errorType) || 'unknown_error',
          page_path: w.location.pathname,
          section: clean(detail.section) || '',
          device_type: deviceType(),
          traffic_source_raw: trafficSourceRaw()
        });
      });
    })(window,document);
  
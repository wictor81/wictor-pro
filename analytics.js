// Analítica de la landing (wictor.pro) — PostHog EU, privacy-first y COOKIELESS.
// Misma postura que benexo.app: sin autocapture, sin grabación de sesión, sin cookies
// (`persistence: 'memory'`), respeta Do Not Track, cero PII y sin query string.
// Comparte proyecto PostHog con benexo: los eventos llevan el prefijo `wictor_` para no mezclarse
// con los `landing_*` de benexo. La key es PÚBLICA (write-only), por eso va embebida.
// Si añades un tercero que reciba datos o una cookie, revisa el copy de nocookies.js.
(function () {
  var host = location.hostname;
  if (host === 'localhost' || host === '127.0.0.1' || host === '') return;
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return;

  var KEY = 'phc_AFjBBdAWXev4LsrhYse7HsNE236A6RQtdUFshREbkadt';
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

  window.posthog.init(KEY, {
    api_host: 'https://eu.i.posthog.com',
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    disable_session_recording: true,
    persistence: 'memory',
    person_profiles: 'never',
    advanced_disable_decide: true,
    disable_surveys: true,
    disable_web_experiments: true,
    // posthog-js añade copias de la URL (`$current_url`, `$session_entry_url`…): sin query ni hash.
    sanitize_properties: function (props) {
      for (var k in props) {
        var v = props[k];
        if (typeof v !== 'string') continue;
        if (v.indexOf(location.origin) === 0) props[k] = /referrer/i.test(k) ? location.origin : location.origin + location.pathname;
      }
      return props;
    },
  });

  function lang() {
    return location.pathname.indexOf('/en/') === 0 || location.pathname === '/en' ? 'en' : 'es';
  }

  var q = new URLSearchParams(location.search);
  var refHost = '';
  try { refHost = document.referrer ? new URL(document.referrer).hostname : ''; } catch (e) { /* ignore */ }
  window.posthog.capture('wictor_pageview', {
    site: 'wictor.pro', page: location.pathname, lang: lang(), ref_host: refHost,
    utm_source: q.get('utm_source') || undefined,
    utm_medium: q.get('utm_medium') || undefined,
    utm_campaign: q.get('utm_campaign') || undefined,
  });

  // Qué se pulsa, no solo que hubo clic.
  function ctaFor(a) {
    if (a.hasAttribute('data-ph')) return a.getAttribute('data-ph');
    var abs;
    try { abs = new URL(a.href); } catch (e) { return 'link'; }
    if (abs.protocol === 'mailto:' || abs.protocol === 'tel:') return 'contact';
    if (abs.hostname === 'wa.me' || /whatsapp/.test(abs.hostname)) return 'whatsapp';
    if (abs.hostname && abs.hostname !== location.hostname) return 'outbound';
    return 'link';
  }

  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
    if (!a) return;
    var toHost = '';
    try { toHost = new URL(a.href).hostname; } catch (e) { /* ignore */ }
    window.posthog.capture('wictor_cta', { site: 'wictor.pro', cta: ctaFor(a), to_host: toHost, page: location.pathname, lang: lang() });
  }, true);
})();

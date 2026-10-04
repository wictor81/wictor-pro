/* wictor.pro — "Aquí no hay cookies que aceptar".
   Sello permanente en el pie + tarjeta de una sola vez en la home.
   Sin dependencias, sin red, sin cookies: solo localStorage (y con try/catch) para no repetir la tarjeta.
   Si cambias qué recoge analytics.js o añades un tercero que reciba datos, revisa que este texto siga siendo verdad. */
(function () {
  'use strict';
  var en = (document.documentElement.lang || 'es').slice(0, 2) === 'en';
  var T = en
    ? {
        title: 'No cookies to accept here',
        body: 'because we use no trackers or ads. We only count visits, anonymously and without cookies.',
        close: 'Close',
        bite: 'Take a bite of the cookie',
        eaten: "Relax, it wasn't a real cookie."
      }
    : {
        title: 'Aquí no hay cookies que aceptar',
        body: 'porque no usamos rastreadores ni publicidad. Solo contamos visitas, de forma anónima y sin cookies.',
        close: 'Cerrar',
        bite: 'Dale un mordisco a la galleta',
        eaten: 'Tranquilo, no era una cookie de verdad.'
      };
  var KEY = 'wictor-nocookies-seen';

  var COOKIE =
    '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">' +
    '<path fill="#C98A5B" d="M12 2a10 10 0 1 0 10 10c0-.7-.1-1.3-.2-1.9a3.5 3.5 0 0 1-4.6-3.3A3.5 3.5 0 0 1 12 2z"/>' +
    '<circle cx="8" cy="10" r="1.3" fill="#5A3A22"/><circle cx="12.5" cy="14.5" r="1.3" fill="#5A3A22"/>' +
    '<circle cx="7.5" cy="15.5" r="1" fill="#5A3A22"/><circle cx="15.5" cy="10.5" r="1" fill="#5A3A22"/></svg>';

  var css =
    '.nck-seal{display:inline-flex;align-items:center;gap:8px;margin-top:14px;padding:6px 12px 6px 8px;border:1px solid var(--line,#DEE0E6);border-radius:999px;background:var(--paper-raise,#fff);font-size:13px;line-height:1.4;color:var(--ink-soft,#565B66)}' +
    '' +
    '.nck-btn{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;border:0;border-radius:50%;background:transparent;cursor:pointer;transition:transform .2s}' +
    '.nck-btn:hover{transform:rotate(-14deg) scale(1.1)}.nck-btn:focus-visible,.nck-x:focus-visible{outline:2px solid var(--accent,#3B49E0);outline-offset:2px}' +
    '.nck-seal.nck-eaten .nck-btn{opacity:.45}' +
    '.nck-card{position:fixed;right:16px;bottom:16px;z-index:60;max-width:340px;padding:16px 40px 16px 16px;border:1px solid var(--line,#DEE0E6);border-radius:16px;background:var(--paper,#F1F2F5);box-shadow:0 4px 16px rgba(20,22,28,.10),0 12px 32px rgba(20,22,28,.08);color:var(--ink,#14161C);font-size:14px;line-height:1.5;opacity:0;transform:translateY(12px);transition:opacity .35s,transform .35s}' +
    '.nck-card.nck-in{opacity:1;transform:none}.nck-card strong{display:block;margin-bottom:2px;font-size:15px}' +
    '.nck-card p{margin:0 0 6px;font-size:14px;color:var(--ink-soft,#565B66)}' +
    '.nck-top{display:flex;gap:10px;align-items:flex-start}.nck-top svg{flex:none;margin-top:2px;width:22px;height:22px}' +
    '.nck-x{position:absolute;top:6px;right:6px;width:32px;height:32px;border:0;border-radius:50%;background:transparent;color:var(--ink-faint,#8A8F9A);font-size:20px;line-height:1;cursor:pointer}' +
    '.nck-x:hover{background:var(--accent-tint,#EAECFB)}' +
    '.nck-crumb{position:fixed;z-index:61;width:6px;height:6px;border-radius:50%;background:#C98A5B;pointer-events:none;animation:nck-fall .9s ease-in forwards}' +
    '@keyframes nck-fall{to{transform:translate(var(--dx),90px) rotate(200deg);opacity:0}}' +
    '@media (max-width:480px){.nck-card{left:16px;max-width:none}}' +
    '@media (max-width:768px){.nck-seal{display:flex;width:fit-content;margin-left:auto;margin-right:auto}}' +
    '@media (prefers-reduced-motion:reduce){.nck-card{transition:none;transform:none}.nck-btn{transition:none}.nck-crumb{display:none}}';

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html) n.innerHTML = html;
    return n;
  }

  function seen() {
    try { return !!localStorage.getItem(KEY); } catch (e) { return false; }
  }
  function markSeen() {
    try { localStorage.setItem(KEY, '1'); } catch (e) { /* sin almacenamiento: la tarjeta puede repetirse, no pasa nada */ }
  }

  function seal(footer) {
    var box = el('div', 'nck-seal');
    var btn = el('button', 'nck-btn', COOKIE);
    btn.type = 'button';
    btn.setAttribute('aria-label', T.bite);
    var link = el('span');
    link.textContent = T.title;
    var eaten = false;
    btn.addEventListener('click', function () {
      eaten = !eaten;
      box.classList.toggle('nck-eaten', eaten);
      link.textContent = eaten ? T.eaten : T.title;
    });
    box.appendChild(btn);
    box.appendChild(link);
    var host = footer.querySelector('.container') || footer;
    host.appendChild(box);
  }

  function crumbs(from) {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var r = from.getBoundingClientRect();
    for (var i = 0; i < 8; i++) {
      var c = el('span', 'nck-crumb');
      c.style.left = r.left + 16 + Math.random() * 40 + 'px';
      c.style.top = r.top + r.height / 2 + 'px';
      c.style.setProperty('--dx', Math.round(Math.random() * 60 - 30) + 'px');
      document.body.appendChild(c);
      setTimeout(function (n) { n.remove(); }.bind(null, c), 1000);
    }
  }

  function card() {
    var c = el('div', 'nck-card');
    c.setAttribute('role', 'status');
    var top = el('div', 'nck-top', COOKIE);
    var txt = el('div');
    var h = el('strong'); h.textContent = T.title;
    var p = el('p'); p.textContent = T.body;
    txt.appendChild(h); txt.appendChild(p);
    top.appendChild(txt);
    var x = el('button', 'nck-x', '&times;');
    x.type = 'button';
    x.setAttribute('aria-label', T.close);
    var closed = false;
    function close() {
      if (closed) return;
      closed = true;
      markSeen();
      crumbs(c);
      c.classList.remove('nck-in');
      setTimeout(function () { c.remove(); }, 400);
    }
    x.addEventListener('click', close);
    c.appendChild(top);
    c.appendChild(x);
    document.body.appendChild(c);
    requestAnimationFrame(function () { requestAnimationFrame(function () { c.classList.add('nck-in'); }); });
    setTimeout(close, 14000);
  }

  function init() {
    var style = el('style');
    style.textContent = css;
    document.head.appendChild(style);
    var footer = document.querySelector('footer');
    if (footer) seal(footer);
    var home = /^\/(en\/?)?$/.test(location.pathname);
    if (home && !seen()) setTimeout(card, 2500);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

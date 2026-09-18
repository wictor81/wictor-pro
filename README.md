# wictor.pro

Web de presencia de Víctor — servicios informáticos y digitales, Madrid.
Sitio estático (HTML + CSS + JS), sin build ni dependencias: se despliega tal cual en Vercel.

Esta primera versión está pensada para **primeros contactos**: es sencilla, sin tecnicismos, sin portfolio visible y sin redes sociales. Todo eso se puede activar más adelante.

## Estructura

```
wictor-pro/
├── index.html            → toda la página (estilos y script incluidos)
├── favicon.svg           → icono del navegador
├── CLAUDE.md             → contexto del proyecto para Claude Code
├── .claude/agents/       → subagentes (marketing, copy, SEO, desarrollo, captación)
├── .gitignore
└── README.md
```

## Verlo en local

```bash
python3 -m http.server 3000   # o:  npx serve .
```
Y entra en http://localhost:3000

## Subirlo a GitHub

Con GitHub CLI (`gh auth login` la primera vez):

```bash
cd wictor-pro
git init
git add .
git commit -m "Landing inicial wictor.pro"
gh repo create wictor-pro --public --source=. --remote=origin --push
```

Sin CLI: crea el repo vacío en https://github.com/new y luego:

```bash
git init && git add . && git commit -m "Landing inicial wictor.pro"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/wictor-pro.git
git push -u origin main
```

## Desplegar en Vercel y conectar el dominio

1. Vercel → **Add New… → Project → Import** el repo `wictor-pro`.
2. Framework Preset: **Other** (estático, sin build). **Deploy**.
3. **Project → Settings → Domains** → añade `wictor.pro`. Como ya está en tu cuenta, Vercel lo enlaza automáticamente.

Cada `git push` a `main` vuelve a desplegar solo.

## Cómo personalizarla

- **Contacto**: cambia `hola@wictor.pro` por tu email real. Para activar WhatsApp, descomenta el botón en la sección de contacto y pon tu número (`https://wa.me/34XXXXXXXXX`).
- **Disponibilidad**: si no quieres el aviso "Disponible para nuevos proyectos", borra el bloque `.status` del hero.
- **Activar los proyectos (más adelante)**: en la sección `#proyectos`, quita la clase `is-hidden` y el atributo `hidden`, rellena cada tarjeta y, si tienes capturas, cambia el `.mock` por `<img src="capturas/...">`.

## Subagentes de Claude Code

En `.claude/agents/` tienes agentes especializados que Claude Code usa automáticamente según la tarea (o invocándolos, p. ej. "usa el subagente captacion-clientes"):
`estratega-marketing`, `redactor-copywriter`, `seo-local`, `desarrollo-web`, `captacion-clientes`.
Los ves y editas con el comando `/agents` dentro de Claude Code.

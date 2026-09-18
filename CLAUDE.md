# wictor.pro — Contexto del proyecto

Guía para Claude Code y sus subagentes. Léela antes de trabajar en este repo.

## Qué es
Web de presencia de **Víctor**, profesional autónomo de **servicios informáticos y digitales** en **Madrid**. Dominio `wictor.pro` (alojado en Vercel).

Objetivo actual: tener una página cuidada y clara a la que dirigir a los **primeros contactos** para que puedan escribir. **No es un portfolio.**

## Público y tono
- Público: pequeños negocios, autónomos y personas **sin conocimientos técnicos**.
- Tono: cercano, claro y honesto. En español de España, de tú.
- **Prohibido**: tecnicismos, nombres de lenguajes/frameworks, jerga y promesas infladas. Se habla de **beneficios**, no de herramientas.

## Reglas de la web
- Sitio **estático**: HTML + CSS + JS, **sin framework y sin build**. Se despliega tal cual en Vercel.
- Todo vive en `index.html` (estilos en `<style>`, script en `<script>`). Único recurso externo permitido: Google Fonts.
- Sistema de diseño en las variables `:root` de `index.html`. Tipografías: `Bricolage Grotesque` (titulares) + `Instrument Sans` (texto). Un solo color de acento.
- Calidad base: responsive, foco de teclado visible, `prefers-reduced-motion`, contraste accesible, HTML semántico.
- La sección **Proyectos está oculta** a propósito (clase `is-hidden` + atributo `hidden`). Activarla solo cuando haya casos reales presentables.

## Subagentes disponibles (`.claude/agents/`)
- **estratega-marketing** — estrategia, posicionamiento y plan para captar clientes.
- **redactor-copywriter** — todos los textos (web, emails, WhatsApp, propuestas).
- **seo-local** — visibilidad en Google con foco en Madrid.
- **desarrollo-web** — construir y mantener la web estática.
- **captacion-clientes** — mensajes, propuestas, precios y seguimientos para los primeros clientes.

## Despliegue
Repo en GitHub → importado en Vercel (Framework: Other, sin build) → dominio `wictor.pro` en Settings → Domains. Cada `push` a `main` redepliega solo.

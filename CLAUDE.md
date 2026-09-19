# wictor.pro — Contexto del proyecto

Guía para Claude Code y sus subagentes. Léela antes de trabajar en este repo.

## ⭐ Regla de oro: paridad español ↔ inglés
La web es **bilingüe**: español en `index.html` (raíz, `/`) e inglés en `en/index.html` (`/en/`).
**Cada cambio que afecte a una versión debe replicarse en la otra en el mismo commit.** Si tocas contenido, estructura, estilos, meta o scripts en una, aplícalo también en la otra (traduciendo el copy al tono equivalente, no literal). Nunca dejes una de las dos desactualizada. Ambas comparten diseño y `hreflang`; el selector de idioma (`.lang`) las enlaza.

## Qué es
Web de presencia de **Víctor**, profesional autónomo de **servicios informáticos y digitales** en **Madrid**. Dominio `wictor.pro` (alojado en Vercel).

Objetivo actual: tener una página cuidada y clara a la que dirigir a los **primeros contactos** para que puedan escribir. **No es un portfolio.**

## Público y tono
- Público: pequeños negocios, autónomos y personas **sin conocimientos técnicos**.
- Tono: cercano, claro y honesto. En español de España, de tú.
- **Prohibido**: tecnicismos, nombres de lenguajes/frameworks, jerga y promesas infladas. Se habla de **beneficios**, no de herramientas.

## Reglas de la web
- Sitio **estático**: HTML + CSS + JS, **sin framework y sin build**. Se despliega tal cual en Vercel.
- Dos páginas gemelas: `index.html` (español, `/`) y `en/index.html` (inglés, `/en/`). Cada una es autónoma: estilos en su `<style>` y script en su `<script>`. Único recurso externo permitido: Google Fonts. Mantenerlas en paridad (ver Regla de oro).
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

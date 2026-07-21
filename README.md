# Continuum

Your AI should remember you. One memory layer for every AI app you use.

Continuum is a personal memory layer that runs as an [MCP](https://modelcontextprotocol.io) server. Install once — the same memory of you follows you across Claude, Cursor, Cline, and any MCP-compatible client.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS 3
- Bilingual i18n (English / 中文) — `src/i18n.ts`

## Develop

```bash
npm install
npm run dev          # dev server with HMR
npm run build        # production build → dist/
npm run preview      # serve the production build locally
```

## Deploy

This repo is set up to serve the built site from the `/docs` folder on the `main` branch via GitHub Pages.

```bash
npm run build
cp -r dist/* docs/
git add docs && git commit -m "deploy: refresh build"
git push
```

## Project structure

```
src/
  App.tsx        # all sections, rendered top-to-bottom
  i18n.ts        # bilingual copy (Dict<Lang, ...>)
  index.css      # tailwind + custom utilities
public/
  favicon.svg, apple-touch-icon.png, manifest.json, og.svg
  404.html, robots.txt, sitemap.xml
```

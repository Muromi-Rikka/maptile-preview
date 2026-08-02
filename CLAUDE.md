# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm dev` — Start dev server (port 5555)
- `pnpm build` — Production build to `dist/`
- `pnpm preview` — Preview production build locally
- `pnpm lint` — Run ESLint with @antfu/eslint-config
- `pnpm lint:fix` — Auto-fix lint issues

## Architecture

Map tile source previewer with React 19 + shadcn/ui + MapLibre GL.

**Data flow**: `public/sources.json` → `App.tsx` fetches via `useQuery` (TanStack Query) → groups by `title` → `SourceList` renders items → `MapView` displays selected tile source as raster layer.

**Key components**:

- `MapView.tsx` — MapLibre GL map via react-map-gl, renders raster tile Source/Layer
- `SourceList.tsx` — Renders grouped source items
- `SourceItem.tsx` — Individual source selector button

**Type system**: `SourceItemData` (`src/types/source.ts`) defines `{ name, urlTemplate, title }`.

## Code Conventions

- **UI library**: shadcn/ui components (Card, Button, ScrollArea, etc.)
- **Styling**: Tailwind CSS 4 for layout/spacing
- **Locale**: Chinese UI text for user-facing strings
- **ESLint**: @antfu/eslint-config with double quotes, semicolons, React/TypeScript enabled
- **Imports**: Use `type` keyword for type-only imports (`import type { FC } from "react"`)
- **Components**: Functional components with `FC<Props>` typing, exported as named exports

## Build & Deploy

- **Bundler**: Rsbuild (Rspack-based) with @rsbuild/plugin-tailwindcss
- **Docker**: Multi-stage build (Node 24 for build → nginx:alpine for runtime)
- **CI/CD**: GitHub Actions publishes Docker image to GHCR on version tags (`v*`)

## Coordinate Systems

The app supports two coordinate systems:

- **WGS84**: Standard GPS coordinates (MapTiler, Tianditu)
- **GCJ02**: China-specific offset coordinates (Autonavi/Gaode)

Default view centers on Shanghai (121.4737, 31.2304).

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static site boilerplate built with Astro 5.11.0, React 19.1.0, and TailwindCSS 4.1.11, configured for deployment to Cloudflare Workers. The project uses TypeScript throughout and includes Prettier for code formatting.

## Architecture

### Core Framework Stack
- **Astro**: Primary framework for static site generation with React integration
- **React**: Used for interactive components (configured via @astrojs/react)
- **TailwindCSS**: Utility-first CSS framework integrated via @tailwindcss/vite plugin
- **TypeScript**: Full type safety with strict configuration

### Key Configuration Files
- `astro.config.mjs`: Astro configuration with static output, TailwindCSS integration
- `tsconfig.json`: TypeScript config extending Astro's strict preset, includes Cloudflare Workers types
- `wrangler.jsonc`: Cloudflare Workers deployment configuration
- `worker-configuration.d.ts`: TypeScript definitions for Workers environment

### Project Structure
- `src/pages/`: Astro pages (file-based routing)
- `src/layouts/`: Reusable layout components
- `src/components/`: Astro components
- `src/assets/`: Static assets (images, etc.)
- `src/global.css`: Global styles with TailwindCSS import
- `public/`: Static files served directly

## Development Commands

### Core Development
```bash
npm run dev          # Start development server on localhost:4321
npm run build        # Build for production to ./dist/
npm run preview      # Preview built site locally
```

### Cloudflare Workers
```bash
npm run cf-typegen   # Generate TypeScript types for Cloudflare Workers
wrangler deploy      # Deploy to Cloudflare Workers (after build)
```

### Code Quality
```bash
npx prettier --write .  # Format code with Prettier
```

## Key Development Notes

### Styling Approach
- TailwindCSS is configured via Vite plugin, not traditional config file
- Global styles are imported in `src/global.css` with `@import "tailwindcss"`
- Astro components can use scoped styles alongside TailwindCSS classes

### Asset Handling
- Images in `src/assets/` are processed by Astro's asset system
- Import assets in frontmatter and use `.src` property in templates
- Static files in `public/` are served directly

### TypeScript Configuration
- Strict TypeScript configuration extending Astro's preset
- Path aliases configured: `~/*` maps to `./src/*`
- JSX configured for React with `react-jsx` transform

### Deployment Target
- Configured for static site generation (`output: "static"`)
- Build output goes to `./dist/` directory
- Cloudflare Workers deployment configured via `wrangler.jsonc`

### Code Formatting
- Prettier configured with plugins for Astro and TailwindCSS
- Single quotes preferred, Astro-specific parser for `.astro` files
- TailwindCSS classes automatically sorted via prettier-plugin-tailwindcss
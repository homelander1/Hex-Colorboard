# Hex Color Manager

## Overview

A web-based hex color management tool that allows users to create and manage color palettes with 10 hex color fields. The application features a clean, minimal utility design where users can interact with colors through color pickers or direct hex code input. Built as a full-stack TypeScript application with React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Build Tool**: Vite with HMR support

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful with `/api` prefix for all routes
- **Static Serving**: Express serves built frontend in production

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` for shared type definitions
- **Migrations**: Drizzle Kit for database migrations (`drizzle-kit push`)
- **Current Storage**: In-memory storage implementation with interface for database upgrade

### Project Structure
```
├── client/           # React frontend
│   └── src/
│       ├── components/ui/  # shadcn/ui components
│       ├── hooks/          # Custom React hooks
│       ├── lib/            # Utilities and query client
│       └── pages/          # Route components
├── server/           # Express backend
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Data access layer
│   └── vite.ts       # Vite dev server integration
├── shared/           # Shared types and schemas
└── migrations/       # Database migrations
```

### Design System
- Uses Inter/System UI fonts with monospace for hex values
- Spacing primitives: Tailwind units 2, 3, 4, 6, 8
- Responsive grid: 2-column on desktop/tablet, single column on mobile
- Color items displayed in compact cards with rounded corners and borders

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via `DATABASE_URL` environment variable)
- **Drizzle ORM**: Type-safe database operations with Zod schema integration

### UI Framework
- **Radix UI**: Accessible component primitives (dialogs, dropdowns, tooltips, etc.)
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management

### Development Tools
- **Vite**: Frontend build and dev server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Production bundling for server code

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in development
- `@replit/vite-plugin-cartographer`: Development tooling
- `@replit/vite-plugin-dev-banner`: Development environment indicator
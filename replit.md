# Real Estate Agent Website

## Overview

This is a modern real estate agent website for "Sarah Mitchell Realty" built with a full-stack TypeScript architecture. The application showcases property listings, agent information, client testimonials, and includes a contact form for potential clients. The design emphasizes trust and sophistication with a navy blue, white, and gold color scheme inspired by premium real estate platforms.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing instead of React Router

**UI Component System**
- shadcn/ui component library (New York style variant) built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Component structure follows atomic design patterns with reusable UI primitives

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management and caching
- React Hook Form with Zod validation for form handling
- Custom hooks for responsive behavior and toast notifications

**Design System**
- Custom color palette defined in CSS variables (navy primary, gold accent, neutral grays)
- Consistent spacing using Tailwind's spacing scale
- Typography uses Inter/Poppins font family from Google Fonts
- Responsive breakpoints: mobile-first approach with md (768px) and lg breakpoints

### Backend Architecture

**Server Framework**
- Express.js for HTTP server with TypeScript
- Custom middleware for request logging and JSON parsing
- RESTful API design with route handlers in `server/routes.ts`

**API Endpoints**
- `/api/properties` - Get all properties
- `/api/properties/featured` - Get featured listings
- `/api/properties/:id` - Get single property by ID
- `/api/testimonials` - Get client testimonials
- `/api/contact` - Submit contact form

**Data Layer**
- In-memory storage implementation (`MemStorage` class) for development
- Implements `IStorage` interface to allow easy swapping to database-backed storage
- Seeded with sample property and testimonial data

**Data Schemas**
- Drizzle ORM schema definitions for PostgreSQL (configured but not yet connected)
- Zod schemas derived from Drizzle schemas for runtime validation
- Shared types between frontend and backend via `shared/schema.ts`

### Database Architecture

**ORM & Schema Design**
- Drizzle ORM configured for PostgreSQL dialect
- Three main tables defined:
  - `properties` - Real estate listings with details (price, bedrooms, bathrooms, etc.)
  - `contact_submissions` - Contact form entries
  - `testimonials` - Client reviews and ratings

**Migration Strategy**
- Migrations output to `./migrations` directory
- Schema changes managed through `drizzle-kit push` command
- Database URL expected via `DATABASE_URL` environment variable

**Data Validation**
- Type-safe insert schemas using `drizzle-zod`
- Shared validation between client and server
- Runtime validation with Zod on form submissions

### Build & Deployment

**Development Mode**
- Vite dev server with middleware mode integrated into Express
- HMR via WebSocket connection on `/vite-hmr` path
- Source maps enabled for debugging
- Auto-reload on file changes

**Production Build**
- Two-step build process:
  1. Vite builds client assets to `dist/public`
  2. esbuild bundles server code to `dist/index.cjs`
- Selected dependencies bundled to reduce cold start times
- Static file serving from compiled client bundle
- SPA fallback to `index.html` for client-side routing

**Module Resolution**
- Path aliases configured: `@/` for client source, `@shared/` for shared code, `@assets/` for static assets
- ESModules throughout with `.ts` extension imports allowed in development
- Bundled to CommonJS for production server

## External Dependencies

### UI Component Libraries
- **Radix UI** - Headless accessible component primitives (dialogs, dropdowns, navigation, form controls)
- **Lucide React** - Icon library for consistent iconography
- **react-icons** - Additional icon sets (social media icons)
- **class-variance-authority** - Type-safe variant styling for components
- **tailwind-merge** & **clsx** - Utility for merging Tailwind classes

### Form & Validation
- **react-hook-form** - Performant form state management
- **@hookform/resolvers** - Zod integration for react-hook-form
- **zod** - Schema validation for forms and API data
- **zod-validation-error** - Improved error messages

### Data Fetching & State
- **@tanstack/react-query** - Async state management and caching
- **date-fns** - Date formatting and manipulation

### Database & ORM
- **drizzle-orm** - Type-safe SQL ORM
- **drizzle-kit** - Schema migrations and management
- **pg** - PostgreSQL client (configured but database not yet provisioned)
- **drizzle-zod** - Generate Zod schemas from Drizzle schemas

### Build Tools
- **vite** - Fast build tool and dev server
- **@vitejs/plugin-react** - React Fast Refresh support
- **esbuild** - Fast JavaScript bundler for server code
- **tsx** - TypeScript execution for scripts
- **tailwindcss** & **autoprefixer** - CSS processing

### Development Tools
- **@replit/vite-plugin-runtime-error-modal** - Better error display in development
- **@replit/vite-plugin-cartographer** - Replit-specific tooling
- **@replit/vite-plugin-dev-banner** - Development environment indicator

### Fonts & Assets
- Google Fonts integration (Inter, Poppins, DM Sans, Architects Daughter, Fira Code, Geist Mono)
- Static images stored in `attached_assets/stock_images/` directory
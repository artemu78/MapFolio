# Project Overview

## Overview

This is a React-based interactive 3D portfolio application that visualizes technology skills as glowing 3D text labels in a mystical dark space. The application uses React Three Fiber to create an immersive full-screen 3D experience where users can explore different technologies through pan and zoom controls in a space-like environment.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React Framework**: Built with TypeScript and Vite for fast development and modern build tooling
- **3D Rendering**: Uses React Three Fiber (@react-three/fiber) for declarative 3D scene management
- **3D Components**: Leverages @react-three/drei for Text3D components and OrbitControls
- **UI System**: Implements shadcn/ui component library with Radix UI primitives for consistent design
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **State Management**: React hooks for local component state management
- **Data Fetching**: TanStack Query for server state management and API interactions

### Component Structure
- **TechMap Component**: Main 3D visualization component that renders technology labels in 3D space
- **TechLabel Components**: Individual 3D text elements with hover interactions and emissive materials
- **Interactive Controls**: Pan and zoom functionality with disabled rotation, constrained zoom limits (5-30 units)
- **Responsive Design**: Full viewport canvas with mobile-friendly interactions

### Backend Architecture
- **Express.js Server**: RESTful API server with TypeScript support
- **Database Layer**: Drizzle ORM configured for PostgreSQL with schema definitions
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **Development Setup**: Vite integration for hot module replacement and development server proxy

### Database Design
- **User Schema**: Basic user management with username/password authentication
- **PostgreSQL**: Primary database with Drizzle migrations for schema management
- **Neon Database**: Cloud PostgreSQL provider integration via @neondatabase/serverless

### Build System
- **Vite Configuration**: Custom build setup with React plugin and TypeScript support
- **Development Tools**: ESBuild for server bundling, TypeScript compilation checking
- **Path Aliases**: Configured module resolution for clean imports (@/, @shared/, @assets/)

### 3D Scene Configuration
- **Dark Space Theme**: Deep blue void background (#050217) for mystical atmosphere
- **Lighting System**: Ambient lighting (0.5 intensity) with point lights for depth
- **Font Rendering**: Orbitron font family for sci-fi aesthetic in 3D text
- **Material System**: Emissive materials for glowing effects on technology labels
- **Camera Controls**: Constrained movement with pan/zoom only, no rotation allowed

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18 with TypeScript, React DOM, and modern hooks
- **Vite**: Build tool and development server with HMR support
- **Express.js**: Node.js web framework for API server

### 3D Graphics and Visualization
- **@react-three/fiber**: React renderer for Three.js for declarative 3D scenes
- **@react-three/drei**: Helper components and utilities for React Three Fiber
- **Three.js**: Underlying 3D graphics library (peer dependency)

### Database and ORM
- **Drizzle ORM**: Type-safe SQL toolkit and ORM for database operations
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon cloud database
- **drizzle-zod**: Zod schema integration for runtime validation
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI and Styling Framework
- **shadcn/ui**: Component library built on Radix UI primitives
- **Radix UI**: Headless UI components for accessibility and functionality
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **class-variance-authority**: Runtime styling with variant support
- **Lucide React**: Icon library for consistent iconography

### State Management and Data Fetching
- **@tanstack/react-query**: Server state management and caching
- **React Hook Form**: Form state management with validation
- **@hookform/resolvers**: Validation resolvers for form integration

### Development and Build Tools
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer for vendor prefixes
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development tools

### Utility Libraries
- **zod**: Schema validation and type inference
- **clsx & tailwind-merge**: Conditional CSS class composition
- **date-fns**: Date manipulation and formatting utilities
- **nanoid**: Unique ID generation for session management
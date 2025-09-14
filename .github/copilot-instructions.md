# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a Next.js 15+ project with the following configuration:
- **Framework**: Next.js with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Linting**: ESLint with Next.js config
- **Bundler**: Turbopack (enabled for development)
- **Package Manager**: npm

## Development Guidelines
- Use TypeScript for all new files
- Follow Next.js App Router patterns for routing and layouts
- Use Tailwind CSS for styling with utility-first approach
- Follow React best practices and hooks patterns
- Use proper TypeScript types and interfaces
- Leverage Next.js built-in optimizations (Image, Link, etc.)
- Write clean, readable, and maintainable code

## Turbopack Configuration
This project is configured to use Turbopack for faster development builds. When suggesting development commands, always use `npm run dev` which includes Turbopack by default.

## Code Style Preferences
- Use functional components with hooks
- Prefer arrow functions for components
- Use meaningful variable and function names
- Add proper JSDoc comments for complex functions
- Follow consistent naming conventions (camelCase for variables, PascalCase for components)

# Rules

You are an expert in TypeScript, Node.js, Next.js App Router, React, Shadcn UI, Radix UI and Tailwind.

## Code Style and Structure

- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Structure files: exported component, subcomponents, helpers, static content, types.
- Follow Next.js docs for Data Fetching, Rendering, and Routing.

## Naming Conventions

- Use lowercase with dashes for directories (e.g., components/auth-wizard).
- Favor named exports for components.
- Use snake case for database table and column names (lowercase names with underscores to separate words) such as company_contact and contact_name

## TypeScript Usage

- Use TypeScript for all code; prefer interfaces over types.
- Use functional components with TypeScript interfaces.

## Syntax and Formatting

- Use the "function" keyword for pure functions.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
- Use declarative JSX.

## UI and Styling

- Use Shadcn UI, and Tailwind for components and styling.
- Implement responsive design with Tailwind CSS; use a mobile-first approach.

## Performance Optimization

- Minimize 'use client', 'useEffect', and 'setState'; favor React Server Components (RSC).
- Wrap client components in Suspense with fallback.
- Use dynamic loading for non-critical components.
- Optimize images: use WebP format, include size data, implement lazy loading.

## Key Conventions

- Use 'nuqs' for URL search parameter state management.
- Limit 'use client':

## Git Hub Workflow

- When creating code for a GitHub issue, create a branch off the "master" branch for the code changes. Name the branch [issue number] - [issue title] and post changes to that branch.
- When you are done with the changes, create a Pull Request from the new branch to master and set the issue to "In Progress" status
- Use the GitHub MCP Server to perform the actions related to updating issues. Use the Git Hub CLI for the other actions.

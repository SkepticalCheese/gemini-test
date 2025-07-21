# Gemini Test Project

This is a Next.js project that uses Prisma as an ORM, Auth0 for authentication, and Tailwind CSS with Shadcn UI for styling. Data is stored in a PostgreSQL database. Vitest is used for tests.

## Getting Started

1. Create an empty PostgreSQL database.  
1. install the dependencies:  
`npm install`
  
1. Set up your environment variables. Create a `.env.local` file in the root of the project and add the following:  
AUTH0_SECRET=  
AUTH0_BASE_URL=  
AUTH0_ISSUER_BASE_URL=  
AUTH0_CLIENT_ID=  
AUTH0_CLIENT_SECRET=  
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public" 
1. Run the database migrations:  
`
npx prisma migrate dev
`  

## Running the application

1. Run the development server:  
`
npm run dev
`  
1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Lints the code.
- `npm run test`: Runs the tests.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Auth0](https://auth0.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Vitest](https://vitest.dev/)
- [PostgreSQL](https://www.postgresql.org/)

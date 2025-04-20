# Crewmate Creator

A space-themed web application that allows users to create, customize, and manage their own crewmates before sending them off to space! Built with React, Vite, and Supabase.

## Features

- Create custom crewmates with unique names, colors, roles, and speeds
- View all your launched crewmates in the Crewmate Gallery
- Update existing crewmates' attributes or eject them from your crew
- View detailed information about each crewmate
- Dark space theme with stars and cosmic visuals

## Technologies Used

- React
- React Router
- Supabase (for database and API)
- Vite (for bundling and development)

## Setup Instructions

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a Supabase account and project at https://supabase.com
4. Create a table named `crewmates` with the following columns:
   - `id` (uuid, primary key)
   - `name` (text, not null)
   - `speed` (integer)
   - `color` (text)
   - `role` (text)
   - `created_at` (timestamp with time zone)

5. Copy your Supabase URL and anon key from your Supabase project settings
6. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

7. Add images to the project:
   - Place a crewmate group image at `src/assets/crewmates.png`
   - Place a UFO image at `src/assets/ufo.png`
   - Place a spaceship image at `src/assets/spaceship.png`

8. Run the development server:
   ```
   npm run dev
   ```

## Usage

- Visit the Home page to learn about the Crewmate Creator
- Click "Create a Crewmate!" to design and launch a new crewmate
- Visit the Crewmate Gallery to see all your created crewmates
- Click "View" on a crewmate to see detailed information
- Click "Edit" to modify a crewmate's attributes or eject them from space

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

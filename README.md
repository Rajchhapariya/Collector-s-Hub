# Collector's Hub

Welcome to **Collector's Hub**, a responsive web application where users can discover collectible items through a marketplace, browse community posts, and manage their personal collection. 

This project was built as a React Web Developer Internship Assignment, focusing on high-quality code, an intuitive user experience, and a stunning "premium" aesthetic.

## Setup Instructions

This project is built using React, Vite, and TypeScript. To run it locally:

1. **Clone the repository** (if applicable) and navigate to the project directory:
   ```bash
   cd collectors-hub
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production** (optional):
   ```bash
   npm run build
   ```

Open your browser and visit `http://localhost:5173/` (or the URL provided by Vite) to view the application.

## Libraries Used

- **React & Vite**: Core framework and build tool for a fast, modern development experience.
- **TypeScript**: Ensures type safety, reducing bugs and improving maintainability.
- **Chakra UI (v2) & Framer Motion**: Provides accessible, composable UI components and smooth micro-animations. Chosen to easily implement the glassmorphic aesthetic.
- **React Router DOM**: For seamless client-side routing between the Marketplace, Community Feed, and My Collection pages.
- **Zustand**: A small, fast, and scalable bearbones state-management solution used for managing global app state (Collection, Feed interactions).
- **Lucide React**: For beautiful, crisp, and consistent SVG icons.

## Assumptions Made

- **Authentication**: As per the requirements, authentication is bypassed. The user is assumed to be an authenticated user named "Demo User" by default.
- **Backend / Data Source**: A mock JSON data structure is used. An API service (`src/services/api.ts`) simulates network latency with `setTimeout` to demonstrate loading states (skeletons).
- **Data Persistence**: It was assumed that users would want to keep their collections and liked/saved posts across browser reloads. Thus, Zustand state is persisted to `localStorage`.
- **Aesthetics**: It was assumed that a "premium" feel was highly desired. A custom glassmorphic theme with a dynamic radial background was implemented to provide a "Wow" factor right out of the gate.

## Additional Features Implemented

1. **Premium Glassmorphic UI**: The entire application uses a unified frosted glass design language, complete with subtle drop shadows, fluid hover animations, and a responsive radial background gradient.
2. **Global Debounced Search**: Search bars in the Marketplace, Feed, and Collection pages utilize a custom `useDebounce` hook to prevent rapid re-rendering and simulate optimized API calls.
3. **Persistent State Management**: Adding items to the collection or liking posts persists across page reloads via `localStorage`.
4. **Grid vs. List View Toggle**: The Marketplace supports toggling between a dense Grid view and a detailed List view, giving users flexibility in how they browse.
5. **Dark Mode Integration**: The application includes a seamlessly integrated Dark Mode that respects the user's system preferences by default and automatically updates the glassmorphic styling for low-light environments.
6. **Fully Responsive Design**: The UI gracefully degrades from large desktop monitors down to mobile screens using CSS Grid/Flexbox and Chakra UI's responsive array syntax.
7. **Empty States**: Beautifully designed empty states guide the user when their collection is empty or a search yields no results.

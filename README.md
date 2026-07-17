# Collector's Hub

A modern, beautifully designed web application for discovering, sharing, and managing authentic Indian collectibles, ranging from Kanjeevaram Silks to Vintage Brass Diyas.

## 🚀 Setup Instructions

1. **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
2. **Install Dependencies**: Run the following command in the root directory:
   ```bash
   npm install
   ```
3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
4. **Build for Production**:
   ```bash
   npm run build
   ```

## 🤔 Assumptions Made
- **Mock API**: Since there is no actual backend, network latency is simulated using a simple `setTimeout` wrapper to demonstrate loading states (Skeletons).
- **Authentication**: It is assumed that the user is already authenticated. The mock data treats the user as a predefined entity for the sake of the Community Feed.
- **Data Persistence**: Because there is no database, we assumed the user would still want their data saved. Thus, all user-generated state (Collections, Wishlists, Likes, Saves) is persisted locally in the browser's `localStorage`.

## 📦 Libraries Used
- **React 18**: The core frontend library.
- **TypeScript**: For robust type-safety and developer experience.
- **Vite**: For incredibly fast development server and optimized production builds.
- **Chakra UI**: For accessible, themeable, and responsive UI components.
- **Zustand**: A small, fast, and scalable bearbones state-management solution used for our global stores (`useFeedStore`, `useCollectionStore`).
- **React Router (react-router-dom)**: For seamless SPA navigation.
- **Lucide React**: For clean, modern SVG icons.

## ✨ Additional (Bonus) Features Implemented
We went above and beyond the basic requirements to implement several of the requested bonus features:
1. **Dark Mode**: Fully supported out-of-the-box. The entire application seamlessly switches themes.
2. **Skeleton Loaders**: Beautiful pulsating skeletons display while the mock API "fetches" the data.
3. **Favorites/Wishlist**: You can save posts on the Feed and add items to your Wishlist from the Marketplace.
4. **Local Persistence**: If you refresh the page or leave and come back, your Wishlist, Owned items, and Liked posts remain saved via `localStorage`.
5. **Optimistic UI Updates**: Liking a post or adding an item to your bag reflects instantly in the UI.
6. **Lazy Loading Images**: Implemented native lazy loading on all heavy asset images for better performance.
7. **Advanced Search & Filtering**: You can dynamically filter the Marketplace and your Collection by Categories, Conditions, and Search terms.

## 📱 Responsive Design & Architecture
The application was built "Mobile-First", utilizing Chakra UI's responsive array props (e.g., `base`, `md`, `lg`) to ensure the grid layouts naturally drop into single columns on phones while expanding gracefully on desktop monitors without any horizontal scrolling. Code is strictly organized by concerns (`/components`, `/pages`, `/store`, `/services`, `/types`) to ensure scalability.

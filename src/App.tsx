import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home/Home';
import Marketplace from './pages/Marketplace/Marketplace';
import Feed from './pages/Feed/Feed';
import Collection from './pages/Collection/Collection';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="feed" element={<Feed />} />
        <Route path="collection" element={<Collection />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;

import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Marketplace from './pages/Marketplace/Marketplace';
import Feed from './pages/Feed/Feed';
import Collection from './pages/Collection/Collection';
import { Heading, Text, Button, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={
          <Center h="50vh" flexDirection="column" gap={4}>
            <Heading size="2xl" color="brand.500">Welcome to Collector's Hub</Heading>
            <Text fontSize="xl">Discover, share, and manage your collectibles.</Text>
            <Button as={Link} to="/marketplace" colorScheme="brand" size="lg" mt={4}>Explore Marketplace</Button>
          </Center>
        } />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="feed" element={<Feed />} />
        <Route path="collection" element={<Collection />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;

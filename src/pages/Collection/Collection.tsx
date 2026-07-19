import { Box, Container, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Text, Input, InputGroup, InputLeftElement, Flex, Select, HStack, VStack, IconButton } from '@chakra-ui/react';
import { Search, Inbox, LayoutGrid, List } from 'lucide-react';
import { useCollectionStore } from '../../store/useCollectionStore';
import { useDebounce } from '../../hooks/useDebounce';
import CollectionCard from '../../components/ui/CollectionCard';

const Collection = () => {
  const { items, search, setSearch, category, setCategory, sortBy, setSortBy, viewMode, setViewMode } = useCollectionStore();
  const debouncedSearch = useDebounce(search, 300);

  const getFilteredItems = (type: 'Owned' | 'Wishlist' | 'Selling' | 'Saved Posts') => {
    let filtered = items.filter(item => item.collectionType === type);

    if (debouncedSearch) {
      filtered = filtered.filter(item => item.title.toLowerCase().includes(debouncedSearch.toLowerCase()));
    }

    if (category) {
      filtered = filtered.filter(item => item.category === category);
    }

    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      // Newest first based on dateAdded
      filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    }

    return filtered;
  };

  const ownedItems = getFilteredItems('Owned');
  const wishlistItems = getFilteredItems('Wishlist');
  const sellingItems = getFilteredItems('Selling');
  const savedPosts = getFilteredItems('Saved Posts');

  const hasFilters = search !== '' || category !== '';

  const EmptyState = ({ defaultMessage }: { defaultMessage: string }) => (
    <Box textAlign="center" py={20} color="earth.500" _dark={{ color: "earth.300" }}>
      <Flex justify="center" mb={4}>
        <Inbox size={48} opacity={0.5} />
      </Flex>
      <Heading size="md" mb={2}>Nothing here yet</Heading>
      <Text>{hasFilters ? "No items match your current filters or search." : defaultMessage}</Text>
    </Box>
  );

  return (
    <Container maxW="container.xl">
      <VStack spacing={8} align="stretch">
        <Flex justify="space-between" align="end" flexWrap="wrap" gap={4}>
          <Box>
            <Heading size="xl" mb={2} color="earth.900" _dark={{ color: "earth.50" }}>My Collection</Heading>
            <Text color="earth.800" _dark={{ color: "earth.200" }}>Manage your personal treasures, wishlist, and active listings</Text>
          </Box>
        </Flex>
      
        <Flex gap={4} flexWrap="wrap" align="center">
        <InputGroup 
          w={{ base: '100%', md: '100%', lg: '300px' }} 
          maxW={{ base: '100%', md: '100%', lg: '300px' }}
          flex={{ base: '1 1 100%', md: '1 1 100%', lg: '0 0 auto' }}
        >
          <InputLeftElement pointerEvents="none">
            <Search color="gray.300" size={20} />
          </InputLeftElement>
          <Input 
            placeholder="Search in collection..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        
        <Select 
          placeholder="All Categories" 
          w={{ base: '100%', md: 'auto', lg: '200px' }}
          maxW={{ base: '100%', md: 'none', lg: '200px' }}
          flex={{ base: '1 1 100%', md: '1', lg: '0 0 auto' }}
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Textiles">Textiles</option>
          <option value="Antiques">Antiques</option>
          <option value="Art">Art</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Crafts">Crafts</option>
          <option value="Coins">Coins</option>
          <option value="Stamps">Stamps</option>
        </Select>

        <Select 
          w={{ base: '100%', md: 'auto', lg: '200px' }}
          maxW={{ base: '100%', md: 'none', lg: '200px' }}
          flex={{ base: '1 1 100%', md: '1', lg: '0 0 auto' }}
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)} 
          ml={{ base: 0, md: 0, lg: 'auto' }}
        >
          <option value="newest">Sort by: Newest</option>
          <option value="price-desc">Sort by: High to Low Value</option>
          <option value="price-asc">Sort by: Low to High Value</option>
        </Select>

        <HStack spacing={2} display={{ base: 'none', md: 'flex' }} flexShrink={0} align="center">
          <IconButton aria-label="Grid view" icon={<LayoutGrid size={20} />} variant={viewMode === 'grid' ? 'solid' : 'ghost'} colorScheme="brand" onClick={() => setViewMode('grid')} />
          <IconButton aria-label="List view" icon={<List size={20} />} variant={viewMode === 'list' ? 'solid' : 'ghost'} colorScheme="brand" onClick={() => setViewMode('list')} />
        </HStack>
      </Flex>

      <Tabs colorScheme="brand" variant="enclosed">
        <TabList>
          <Tab fontWeight="bold">Owned ({ownedItems.length})</Tab>
          <Tab fontWeight="bold">Wishlist ({wishlistItems.length})</Tab>
          <Tab fontWeight="bold">Selling ({sellingItems.length})</Tab>
          <Tab fontWeight="bold">Saved Posts ({savedPosts.length})</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0} py={6}>
            {ownedItems.length > 0 ? (
              <SimpleGrid columns={viewMode === 'grid' ? { base: 1, sm: 2, md: 3, lg: 4 } : 1} spacing={6}>
                {ownedItems.map(item => <CollectionCard key={item.id} item={item} viewMode={viewMode} />)}
              </SimpleGrid>
            ) : (
              <EmptyState defaultMessage="Start adding items to your owned collection from the marketplace." />
            )}
          </TabPanel>
          <TabPanel px={0} py={6}>
            {wishlistItems.length > 0 ? (
              <SimpleGrid columns={viewMode === 'grid' ? { base: 1, sm: 2, md: 3, lg: 4 } : 1} spacing={6}>
                {wishlistItems.map(item => <CollectionCard key={item.id} item={item} viewMode={viewMode} />)}
              </SimpleGrid>
            ) : (
              <EmptyState defaultMessage="Your wishlist is empty. Discover items you want in the marketplace." />
            )}
          </TabPanel>
          <TabPanel px={0} py={6}>
            {sellingItems.length > 0 ? (
              <SimpleGrid columns={viewMode === 'grid' ? { base: 1, sm: 2, md: 3, lg: 4 } : 1} spacing={6}>
                {sellingItems.map(item => <CollectionCard key={item.id} item={item} viewMode={viewMode} />)}
              </SimpleGrid>
            ) : (
              <EmptyState defaultMessage="You aren't selling anything right now." />
            )}
          </TabPanel>
          <TabPanel px={0} py={6}>
            {savedPosts.length > 0 ? (
              <SimpleGrid columns={viewMode === 'grid' ? { base: 1, sm: 2, md: 3, lg: 4 } : 1} spacing={6}>
                {savedPosts.map(item => <CollectionCard key={item.id} item={item} viewMode={viewMode} />)}
              </SimpleGrid>
            ) : (
              <EmptyState defaultMessage="You haven't saved any posts from the community feed yet." />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
      </VStack>
    </Container>
  );
};

export default Collection;

import { Box, Container, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Text, Input, InputGroup, InputLeftElement, Flex, Select, HStack, IconButton } from '@chakra-ui/react';
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
    <Container maxW="container.xl" py={4}>
      <Heading size="lg" mb={4} color="earth.900" _dark={{ color: "earth.50" }}>My Collection</Heading>
      
      <Flex gap={4} mb={6} flexWrap="wrap">
        <InputGroup maxW={{ base: '100%', md: '300px' }}>
          <InputLeftElement pointerEvents="none">
            <Search color="gray.300" size={20} />
          </InputLeftElement>
          <Input 
            placeholder="Search in collection..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        
        <Select placeholder="All Categories" maxW={{ base: '100%', md: '200px' }} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Textiles">Textiles</option>
          <option value="Antiques">Antiques</option>
          <option value="Art">Art</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Crafts">Crafts</option>
        </Select>

        <Select maxW={{ base: '100%', md: '200px' }} value={sortBy} onChange={(e) => setSortBy(e.target.value)} ml={{ md: 'auto' }}>
          <option value="newest">Sort by: Newest</option>
          <option value="price-desc">Sort by: High to Low Value</option>
          <option value="price-asc">Sort by: Low to High Value</option>
        </Select>

        <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
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
    </Container>
  );
};

export default Collection;

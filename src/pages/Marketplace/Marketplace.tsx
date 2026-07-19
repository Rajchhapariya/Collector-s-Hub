import { useState, useEffect, useMemo } from 'react';
import { Box, Container, Heading, SimpleGrid, Input, Select, Flex, Skeleton, Text, InputGroup, InputLeftElement, VStack, Modal, ModalOverlay, ModalContent, ModalCloseButton, useDisclosure, Image, Badge, Button, Icon, useToast, Divider, HStack, IconButton } from '@chakra-ui/react';
import { Search, ShoppingCart, Heart, LayoutGrid, List } from 'lucide-react';
import { getListings } from '../../services/api';
import { useDebounce } from '../../hooks/useDebounce';
import type { Collectible } from '../../types';
import ItemCard from '../../components/ui/ItemCard';
import { useCollectionStore } from '../../store/useCollectionStore';

const Marketplace = () => {
  const [listings, setListings] = useState<Collectible[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters and Sort State
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Modal State
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<Collectible | null>(null);

  // Store
  const { addItem, viewMode, setViewMode } = useCollectionStore();
  const toast = useToast();

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const data = await getListings();
        setListings(data);
      } catch (error) {
        console.error('Failed to fetch listings', error);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const filteredAndSortedListings = useMemo(() => {
    let result = [...listings];

    if (debouncedSearch) {
      result = result.filter(item => item.title.toLowerCase().includes(debouncedSearch.toLowerCase()));
    }

    if (category) {
      result = result.filter(item => item.category === category);
    }

    if (condition) {
      result = result.filter(item => item.condition === condition);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [listings, debouncedSearch, category, condition, sortBy]);

  const handleOpenDetails = (item: Collectible) => {
    setSelectedItem(item);
    onOpen();
  };

  const handleAdd = (item: Collectible, type: 'Owned' | 'Wishlist' | 'Selling') => {
    const result = addItem(item, type);
    toast({
      title: result.success ? 'Added successfully' : 'Notice',
      description: result.message,
      status: result.success ? 'success' : 'warning',
      duration: 3000,
      isClosable: true,
      position: 'bottom-right',
    });
    if (result.success) onClose();
  };

  return (
    <Container maxW="container.xl" py={4}>
      <VStack spacing={5} align="stretch">
        <Flex justify="space-between" align="end" flexWrap="wrap" gap={4}>
          <Box>
            <Heading size="lg" mb={1} color="earth.900" _dark={{ color: "earth.50" }}>Marketplace</Heading>
            <Text fontSize="sm" color="earth.800" _dark={{ color: "earth.200" }}>Discover rare and unique artisanal items</Text>
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
              placeholder="Search collectibles..." 
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
            placeholder="All Conditions" 
            w={{ base: '100%', md: 'auto', lg: '200px' }}
            maxW={{ base: '100%', md: 'none', lg: '200px' }}
            flex={{ base: '1 1 100%', md: '1', lg: '0 0 auto' }}
            value={condition} 
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Excellent">Excellent</option>
            <option value="Very Good">Very Good</option>
            <option value="Good">Good</option>
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
            <option value="price-desc">Sort by: High to Low</option>
            <option value="price-asc">Sort by: Low to High</option>
          </Select>

          <HStack spacing={2} flexShrink={0} align="center">
            <IconButton aria-label="Grid view" icon={<LayoutGrid size={20} />} variant={viewMode === 'grid' ? 'solid' : 'ghost'} colorScheme="brand" onClick={() => setViewMode('grid')} />
            <IconButton aria-label="List view" icon={<List size={20} />} variant={viewMode === 'list' ? 'solid' : 'ghost'} colorScheme="brand" onClick={() => setViewMode('list')} />
          </HStack>
        </Flex>

        {loading ? (
          <SimpleGrid columns={viewMode === 'grid' ? { base: 1, sm: 2, md: 3, lg: 4 } : 1} spacing={6}>
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} height="300px" rounded="md" />
            ))}
          </SimpleGrid>
        ) : filteredAndSortedListings.length > 0 ? (
          <SimpleGrid columns={viewMode === 'grid' ? { base: 1, sm: 2, md: 3, lg: 4 } : 1} spacing={6}>
            {filteredAndSortedListings.map(item => (
              <ItemCard key={item.id} item={item} onOpenDetails={handleOpenDetails} viewMode={viewMode} />
            ))}
          </SimpleGrid>
        ) : (
          <Box textAlign="center" py={20} color="earth.500" _dark={{ color: "earth.300" }}>
            <Heading size="md">No items found</Heading>
            <Text mt={2}>Try adjusting your filters or search term.</Text>
          </Box>
        )}
      </VStack>

      {/* Product Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent overflow="hidden">
          <ModalCloseButton zIndex={2} />
          {selectedItem && (
            <Flex direction={{ base: 'column', md: 'row' }}>
              <Box flex={{ base: "none", md: 1 }} bg="blackAlpha.50" _dark={{ bg: "blackAlpha.300" }} p={6} display="flex" alignItems="center" justifyContent="center">
                <Image 
                  src={selectedItem.image} 
                  alt={selectedItem.title} 
                  w="100%" 
                  maxH="500px"
                  objectFit="contain"
                  borderRadius="xl"
                  fallbackSrc="https://placehold.co/500x500/E5DFD5/873928?text=Loading..."
                />
              </Box>
              <Box flex={{ base: "none", md: 1 }} p={8} display="flex" flexDirection="column">
                <Badge colorScheme="orange" variant="subtle" alignSelf="flex-start" mb={3}>{selectedItem.category}</Badge>
                <Heading size="lg" color="earth.900" _dark={{ color: "earth.50" }} mb={2}>{selectedItem.title}</Heading>
                <Text color="brand.600" _dark={{ color: "brand.300" }} fontSize="3xl" fontWeight="bold" mb={6}>
                  ₹{selectedItem.price.toLocaleString('en-IN')}
                </Text>
                
                <VStack align="stretch" spacing={4} mb={8} color="earth.800" _dark={{ color: "earth.200" }}>
                  <Flex justify="space-between">
                    <Text fontWeight="bold">Condition:</Text>
                    <Badge colorScheme={selectedItem.condition === 'New' ? 'green' : 'yellow'} variant="outline">
                      {selectedItem.condition}
                    </Badge>
                  </Flex>
                  <Divider borderColor="earth.200" _dark={{ borderColor: "whiteAlpha.200" }} />
                  <Flex justify="space-between">
                    <Text fontWeight="bold">Seller:</Text>
                    <Text>{selectedItem.sellerName}</Text>
                  </Flex>
                  <Divider borderColor="earth.200" _dark={{ borderColor: "whiteAlpha.200" }} />
                  <Flex justify="space-between">
                    <Text fontWeight="bold">Location:</Text>
                    <Text>{selectedItem.location}</Text>
                  </Flex>
                </VStack>

                <Flex w="100%" gap={3} mt="auto">
                  <Button flex="1" size="lg" variant="solid" colorScheme="brand" leftIcon={<Icon as={ShoppingCart} boxSize={5} />} onClick={() => handleAdd(selectedItem, 'Owned')}>
                    Add to Bag
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => handleAdd(selectedItem, 'Wishlist')}>
                    <Icon as={Heart} boxSize={5} />
                  </Button>
                </Flex>
              </Box>
            </Flex>
          )}
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Marketplace;

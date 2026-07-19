import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, Button, Flex, Badge, useToast, Icon, Box } from '@chakra-ui/react';
import { ShoppingCart, Heart } from 'lucide-react';
import type { Collectible } from '../../types';
import { useCollectionStore } from '../../store/useCollectionStore';

interface ItemCardProps {
  item: Collectible;
  onOpenDetails?: (item: Collectible) => void;
  viewMode?: 'grid' | 'list';
}

const ItemCard = ({ item, onOpenDetails, viewMode = 'grid' }: ItemCardProps) => {
  const { items, addItem, removeItem } = useCollectionStore();
  const toast = useToast();

  const isWishlisted = items.some((i) => i.id === item.id && i.collectionType === 'Wishlist');

  const handleAdd = (type: 'Owned' | 'Wishlist' | 'Selling') => {
    const result = addItem(item, type);
    toast({
      title: result.success ? 'Added successfully' : 'Notice',
      description: result.message,
      status: result.success ? 'success' : 'warning',
      duration: 3000,
      isClosable: true,
      position: 'bottom-right',
    });
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeItem(item.id);
      toast({
        title: 'Removed from Wishlist',
        status: 'info',
        duration: 2000,
        isClosable: true,
        position: 'bottom-right',
      });
    } else {
      const result = addItem(item, 'Wishlist');
      toast({
        title: result.success ? 'Added to Wishlist' : 'Notice',
        description: result.message,
        status: result.success ? 'success' : 'warning',
        duration: 2000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  const isList = viewMode === 'list';

  return (
    <Card h="100%" minH={isList ? { base: 'auto', sm: '150px' } : '100%'} direction={isList ? { base: 'column', lg: 'row' } : 'column'} overflow="hidden">
      <CardBody p={0} display="flex" flexDir={isList ? 'row' : 'column'}>
        <Image
          src={item.image}
          fallbackSrc="https://placehold.co/500x500/E5DFD5/873928?text=Loading..."
          alt={item.title}
          height={isList ? { base: "140px", sm: "150px" } : { base: "150px", md: "170px" }}
          width={isList ? { base: "120px", sm: "200px", md: "230px" } : "100%"}
          objectFit="contain"
          bg="transparent"
          _dark={{ bg: "transparent" }}
          cursor={onOpenDetails ? "pointer" : "default"}
          onClick={() => onOpenDetails?.(item)}
          loading="lazy"
        />
        <Stack mt={isList ? 0 : "3"} spacing={isList ? { base: 1, sm: 2 } : 2.5} px={{ base: 3, md: 4 }} py={isList ? { base: 2, sm: 3 } : 0} flex="1" justify="space-between">
          <Stack spacing={1} cursor={onOpenDetails ? "pointer" : "default"} onClick={() => onOpenDetails?.(item)}>
            <Heading size="sm" noOfLines={2} minH="40px" color="earth.900" _dark={{ color: "earth.50" }}>{item.title}</Heading>
            <Text color="brand.600" _dark={{ color: "brand.300" }} fontSize={{ base: "md", sm: "lg" }} fontWeight="bold">
              ₹{item.price.toLocaleString('en-IN')}
            </Text>
          </Stack>
          <Box>
            <Flex gap={1.5} wrap="wrap" mb={1.5} display={isList ? { base: 'none', sm: 'flex' } : 'flex'}>
              <Badge colorScheme="orange" variant="subtle" fontSize="2xs">{item.category}</Badge>
              <Badge colorScheme={item.condition === 'New' ? 'green' : 'yellow'} variant="outline" fontSize="2xs">
                {item.condition}
              </Badge>
            </Flex>
            <Text color="earth.800" _dark={{ color: "earth.200" }} fontSize="xs" noOfLines={1}>
              Sold by {item.sellerName} • {item.location}
            </Text>
          </Box>
        </Stack>
      </CardBody>
      
      {!isList && <Divider mt="3" borderColor="whiteAlpha.500" _dark={{ borderColor: "whiteAlpha.200" }} />}
      
      <CardFooter pt={isList ? { base: 2, lg: 0 } : 3} px={{ base: 3, md: 4 }} pb={4} display="flex" alignItems="center">
        <Flex w="100%" gap={2.5} justify={isList ? { base: 'flex-start', lg: 'flex-end' } : 'flex-start'} align="center">
          <Button 
            flex={isList ? 'none' : '1'} 
            h="38px" 
            px={4} 
            variant="solid" 
            colorScheme="brand" 
            rounded="xl" 
            fontSize="sm" 
            leftIcon={isList ? undefined : <Icon as={ShoppingCart} boxSize={4} />} 
            onClick={() => handleAdd('Owned')}
          >
            Add to Bag
          </Button>
          <Button 
            h="38px" 
            w="38px" 
            minW="38px" 
            p={0} 
            variant="outline" 
            rounded="xl" 
            onClick={handleWishlistToggle} 
            borderColor={isWishlisted ? 'red.400' : 'inherit'}
            _hover={{ color: 'red.500', borderColor: 'red.500', bg: 'red.50', _dark: { bg: 'whiteAlpha.100' } }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={Heart} boxSize={4} fill={isWishlisted ? '#E53E3E' : 'none'} color={isWishlisted ? '#E53E3E' : 'currentColor'} />
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;

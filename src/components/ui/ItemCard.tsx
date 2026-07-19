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
  const addItem = useCollectionStore(state => state.addItem);
  const toast = useToast();

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

  const isList = viewMode === 'list';

  return (
    <Card h="100%" direction={isList ? { base: 'column', lg: 'row' } : 'column'} overflow="hidden">
      <CardBody p={0} display="flex" flexDir={isList ? 'row' : 'column'}>
        <Image
          src={item.image}
          fallbackSrc="https://placehold.co/500x500/E5DFD5/873928?text=Loading..."
          alt={item.title}
          height={isList ? { base: "140px", sm: "100%" } : { base: "180px", md: "220px" }}
          width={isList ? { base: "120px", sm: "200px", md: "250px" } : "100%"}
          objectFit="contain"
          bg="transparent"
          _dark={{ bg: "transparent" }}
          cursor={onOpenDetails ? "pointer" : "default"}
          onClick={() => onOpenDetails?.(item)}
          loading="lazy"
        />
        <Stack mt={isList ? 0 : "4"} spacing={isList ? { base: 1, sm: 3 } : 3} px={{ base: 3, md: 5 }} py={isList ? { base: 3, sm: 4 } : 0} flex="1" justify="space-between">
          <Stack spacing={1} cursor={onOpenDetails ? "pointer" : "default"} onClick={() => onOpenDetails?.(item)}>
            <Heading size={{ base: isList ? "sm" : "md", sm: "md" }} noOfLines={2} minH={isList ? 'auto' : '48px'} color="earth.900" _dark={{ color: "earth.50" }}>{item.title}</Heading>
            <Text color="brand.600" _dark={{ color: "brand.300" }} fontSize={{ base: isList ? "lg" : "xl", sm: "xl" }} fontWeight="bold">
              ₹{item.price.toLocaleString('en-IN')}
            </Text>
          </Stack>
          <Box>
            <Flex gap={2} wrap="wrap" mb={2} display={isList ? { base: 'none', sm: 'flex' } : 'flex'}>
              <Badge colorScheme="orange" variant="subtle">{item.category}</Badge>
              <Badge colorScheme={item.condition === 'New' ? 'green' : 'yellow'} variant="outline">
                {item.condition}
              </Badge>
            </Flex>
            <Text color="earth.800" _dark={{ color: "earth.200" }} fontSize="sm" noOfLines={1}>
              Sold by {item.sellerName} • {item.location}
            </Text>
          </Box>
        </Stack>
      </CardBody>
      
      {!isList && <Divider mt="4" borderColor="whiteAlpha.500" _dark={{ borderColor: "whiteAlpha.200" }} />}
      
      <CardFooter pt={isList ? { base: 2, lg: 0 } : 4} px={{ base: 3, md: 5 }} pb={5} display={isList ? 'flex' : 'block'}>
        <Flex w="100%" gap={3} justify={isList ? { base: 'flex-start', lg: 'flex-end' } : 'flex-start'} align={isList ? 'center' : 'stretch'}>
          {isList && (
            <Text fontWeight="bold" color="brand.600" _dark={{ color: "brand.300" }} mr={4}>
              ₹{item.price.toLocaleString('en-IN')}
            </Text>
          )}
          <Button flex={isList ? 'none' : '1'} size="md" variant="solid" colorScheme="brand" leftIcon={isList ? undefined : <Icon as={ShoppingCart} boxSize={4} />} onClick={() => handleAdd('Owned')}>
            {isList ? 'Add to Bag' : 'Add to Bag'}
          </Button>
          <Button size="md" variant="outline" onClick={() => handleAdd('Wishlist')} px={3}>
            <Icon as={Heart} boxSize={4} />
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;

import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, Button, Flex, Badge, useToast, Icon } from '@chakra-ui/react';
import { ShoppingCart, Heart } from 'lucide-react';
import type { Collectible } from '../../types';
import { useCollectionStore } from '../../store/useCollectionStore';

interface ItemCardProps {
  item: Collectible;
  onOpenDetails?: (item: Collectible) => void;
}

const ItemCard = ({ item, onOpenDetails }: ItemCardProps) => {
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

  return (
    <Card h="100%">
      <CardBody p={0}>
        <Image
          src={item.image}
          fallbackSrc="https://placehold.co/500x500/E5DFD5/873928?text=Loading..."
          alt={item.title}
          height={{ base: "180px", md: "220px" }}
          width="100%"
          objectFit="contain"
          bg="earth.50"
          _dark={{ bg: "earth.900" }}
          cursor={onOpenDetails ? "pointer" : "default"}
          onClick={() => onOpenDetails?.(item)}
          loading="lazy"
        />
        <Stack mt="4" spacing="3" px={{ base: 3, md: 5 }}>
          <Stack spacing={1} cursor={onOpenDetails ? "pointer" : "default"} onClick={() => onOpenDetails?.(item)}>
            <Heading size="md" noOfLines={2} color="earth.900" _dark={{ color: "earth.50" }}>{item.title}</Heading>
            <Text color="brand.600" _dark={{ color: "brand.300" }} fontSize="xl" fontWeight="bold">
              ₹{item.price.toLocaleString('en-IN')}
            </Text>
          </Stack>
          <Flex gap={2} wrap="wrap">
            <Badge colorScheme="orange" variant="subtle">{item.category}</Badge>
            <Badge colorScheme={item.condition === 'New' ? 'green' : 'yellow'} variant="outline">
              {item.condition}
            </Badge>
          </Flex>
          <Text color="earth.800" _dark={{ color: "earth.200" }} fontSize="sm">
            Sold by {item.sellerName} • {item.location}
          </Text>
        </Stack>
      </CardBody>
      <Divider mt="4" borderColor="earth.200" _dark={{ borderColor: "whiteAlpha.200" }} />
      <CardFooter pt={4} px={{ base: 3, md: 5 }} pb={5}>
        <Flex w="100%" gap={3}>
          <Button flex="1" size="md" variant="solid" colorScheme="brand" leftIcon={<Icon as={ShoppingCart} boxSize={4} />} onClick={() => handleAdd('Owned')}>
            Add to Bag
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

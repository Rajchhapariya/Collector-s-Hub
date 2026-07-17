import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, Flex, Badge, Menu, MenuButton, MenuList, MenuItem, IconButton, Box } from '@chakra-ui/react';
import { MoreVertical, Trash2, ArrowRightLeft } from 'lucide-react';
import type { CollectionItem } from '../../types';
import { useCollectionStore } from '../../store/useCollectionStore';

interface CollectionCardProps {
  item: CollectionItem;
}

const CollectionCard = ({ item }: CollectionCardProps) => {
  const { removeItem, moveItem } = useCollectionStore();

  const handleMove = (newType: CollectionItem['collectionType']) => {
    moveItem(item.id, newType);
  };

  return (
    <Card h="100%">
      <CardBody p={0}>
        <Image
          src={item.image}
          fallbackSrc="https://placehold.co/500x500/E5DFD5/873928?text=Loading..."
          alt={item.title}
          height="160px"
          width="100%"
          objectFit="contain"
          bg="earth.50"
          _dark={{ bg: "earth.900" }}
          loading="lazy"
        />
        <Stack mt="4" spacing="3" px={{ base: 3, md: 4 }}>
          <Flex justify="space-between" align="start">
            <Heading size="md" noOfLines={2} color="earth.900" _dark={{ color: "earth.50" }}>{item.title}</Heading>
          </Flex>
          <Flex gap={2} wrap="wrap">
            <Badge colorScheme="orange" variant="subtle">{item.category}</Badge>
            <Badge colorScheme={item.condition === 'New' ? 'green' : 'yellow'} variant="outline">
              {item.condition}
            </Badge>
          </Flex>
          <Text color="earth.800" _dark={{ color: "earth.200" }} fontSize="xs">
            Added on {new Date(item.dateAdded).toLocaleDateString()}
          </Text>
        </Stack>
      </CardBody>
      <Divider mt="4" borderColor="earth.200" _dark={{ borderColor: "whiteAlpha.200" }} />
      <CardFooter pt={2} px={{ base: 3, md: 4 }} pb={4}>
        <Flex w="100%" justify="space-between" align="center">
          <Box>
            <Text fontSize="xs" color="earth.600" _dark={{ color: "earth.400" }}>Estimated Value</Text>
            <Text fontWeight="bold" color="brand.600" _dark={{ color: "brand.300" }}>
              {(item.estimatedValue || item.price) ? `₹${(item.estimatedValue || item.price).toLocaleString('en-IN')}` : 'Not specified'}
            </Text>
          </Box>
          <Menu>
            <MenuButton as={IconButton} icon={<MoreVertical size={16} />} variant="ghost" size="sm" />
            <MenuList>
              {item.collectionType !== 'Owned' && (
                <MenuItem icon={<ArrowRightLeft size={16} />} onClick={() => handleMove('Owned')}>
                  Move to Owned
                </MenuItem>
              )}
              {item.collectionType !== 'Wishlist' && (
                <MenuItem icon={<ArrowRightLeft size={16} />} onClick={() => handleMove('Wishlist')}>
                  Move to Wishlist
                </MenuItem>
              )}
              {item.collectionType !== 'Selling' && (
                <MenuItem icon={<ArrowRightLeft size={16} />} onClick={() => handleMove('Selling')}>
                  Move to Selling
                </MenuItem>
              )}
              <MenuItem icon={<Trash2 size={16} />} color="red.500" onClick={() => removeItem(item.id)}>
                Remove
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default CollectionCard;

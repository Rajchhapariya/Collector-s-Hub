import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, Flex, Badge, Menu, MenuButton, MenuList, MenuItem, IconButton, Box } from '@chakra-ui/react';
import { MoreVertical, Trash2, ArrowRightLeft } from 'lucide-react';
import type { CollectionItem } from '../../types';
import { useCollectionStore } from '../../store/useCollectionStore';

interface CollectionCardProps {
  item: CollectionItem;
  viewMode?: 'grid' | 'list';
}

const CollectionCard = ({ item, viewMode = 'grid' }: CollectionCardProps) => {
  const { removeItem, moveItem } = useCollectionStore();

  const handleMove = (newType: CollectionItem['collectionType']) => {
    moveItem(item.id, newType);
  };

  const isList = viewMode === 'list';

  return (
    <Card h="100%" direction={isList ? { base: 'column', sm: 'row' } : 'column'} overflow="hidden">
      <CardBody p={0} display={isList ? 'flex' : 'block'} flexDir={isList ? { base: 'column', sm: 'row' } : 'column'}>
        <Image
          src={item.image}
          fallbackSrc="https://placehold.co/500x500/E5DFD5/873928?text=Loading..."
          alt={item.title}
          height={isList ? { base: "160px", sm: "100%" } : "160px"}
          width={isList ? { base: "100%", sm: "200px" } : "100%"}
          objectFit="contain"
          bg="earth.50"
          _dark={{ bg: "earth.900" }}
          loading="lazy"
        />
        <Stack mt={isList ? { base: 4, sm: 0 } : "4"} spacing="3" px={{ base: 3, md: 4 }} py={isList ? { sm: 3 } : 0} flex="1">
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
      {!isList && <Divider mt="4" borderColor="earth.200" _dark={{ borderColor: "whiteAlpha.200" }} />}
      <CardFooter pt={isList ? 0 : 2} px={{ base: 3, md: 4 }} pb={isList ? 0 : 4} display={isList ? 'flex' : 'block'} alignItems={isList ? 'center' : 'stretch'} justify={isList ? 'flex-end' : 'center'} alignSelf={isList ? 'center' : 'auto'}>
        <Flex w="100%" justify={isList ? 'flex-end' : 'space-between'} align="center" gap={isList ? 4 : 0}>
          <Box display={isList ? 'flex' : 'block'} alignItems="center" gap={2}>
            {!isList && <Text fontSize="xs" color="earth.600" _dark={{ color: "earth.400" }}>Estimated Value</Text>}
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

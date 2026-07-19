import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, Flex, Badge, Menu, MenuButton, MenuList, MenuItem, IconButton, Box, Portal } from '@chakra-ui/react';
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
    <Card h="100%" direction={isList ? { base: 'column', lg: 'row' } : 'column'} overflow="hidden">
      <CardBody p={0} display="flex" flexDir={isList ? 'row' : 'column'}>
        <Image
          src={item.image}
          fallbackSrc="https://placehold.co/500x500/E5DFD5/873928?text=Loading..."
          alt={item.title}
          height={isList ? { base: "140px", sm: "100%" } : "160px"}
          width={isList ? { base: "120px", sm: "200px" } : "100%"}
          objectFit="contain"
          bg="transparent"
          _dark={{ bg: "transparent" }}
          loading="lazy"
        />
        <Stack mt={isList ? 0 : "4"} spacing="3" px={{ base: 3, md: 4 }} py={isList ? { base: 2, sm: 3 } : 0} flex="1" justify="space-between">
          <Box>
            <Flex justify="space-between" align="start" gap={2}>
              <Heading size={{ base: isList ? "sm" : "md", sm: "md" }} noOfLines={2} minH={isList ? 'auto' : '48px'} color="earth.900" _dark={{ color: "earth.50" }}>{item.title}</Heading>
              <Menu>
                <MenuButton as={IconButton} icon={<MoreVertical size={20} />} variant="ghost" size="sm" flexShrink={0} mt="-1" mr="-2" />
                <Portal>
                  <MenuList zIndex="popover">
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
                </Portal>
              </Menu>
            </Flex>
            <Flex gap={2} wrap="wrap" mt={2}>
              <Badge colorScheme="orange" variant="subtle">{item.category}</Badge>
              <Badge colorScheme={item.condition === 'New' ? 'green' : 'yellow'} variant="outline">
                {item.condition}
              </Badge>
            </Flex>
            <Text color="earth.800" _dark={{ color: "earth.200" }} fontSize="xs" mt={2}>
              Added on {new Date(item.dateAdded).toLocaleDateString()}
            </Text>
          </Box>
          
          {isList && (
            <Box mt="auto" pt={2}>
              <Text fontSize="xs" color="earth.600" _dark={{ color: "earth.400" }} display="inline" mr={2}>Estimated Value:</Text>
              <Text fontWeight="bold" color="brand.600" _dark={{ color: "brand.300" }} display="inline">
                {(item.estimatedValue || item.price) ? `₹${(item.estimatedValue || item.price).toLocaleString('en-IN')}` : 'Not specified'}
              </Text>
            </Box>
          )}
        </Stack>
      </CardBody>
      {!isList && <Divider mt="4" borderColor="whiteAlpha.500" _dark={{ borderColor: "whiteAlpha.200" }} />}
      {!isList && (
        <CardFooter pt={2} px={{ base: 3, md: 4 }} pb={4}>
          <Box>
            <Text fontSize="xs" color="earth.600" _dark={{ color: "earth.400" }}>Estimated Value</Text>
            <Text fontWeight="bold" color="brand.600" _dark={{ color: "brand.300" }}>
              {(item.estimatedValue || item.price) ? `₹${(item.estimatedValue || item.price).toLocaleString('en-IN')}` : 'Not specified'}
            </Text>
          </Box>
        </CardFooter>
      )}
    </Card>
  );
};

export default CollectionCard;

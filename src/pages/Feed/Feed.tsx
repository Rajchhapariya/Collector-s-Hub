import { useState, useEffect } from 'react';
import { Box, Container, Heading, VStack, SkeletonCircle, SkeletonText, Skeleton, Input, Select, Flex, InputGroup, InputLeftElement, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Image, Text, Avatar, Divider } from '@chakra-ui/react';
import { Search } from 'lucide-react';
import { getFeedPosts } from '../../services/api';
import type { FeedPost } from '../../types';
import PostCard from '../../components/ui/PostCard';
import { useFeedStore } from '../../store/useFeedStore';
import { useDebounce } from '../../hooks/useDebounce';

const Feed = () => {
  const { posts, setPosts } = useFeedStore();
  const [loading, setLoading] = useState(posts.length === 0);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [category, setCategory] = useState('All');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState<FeedPost | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getFeedPosts();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [setPosts]);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.caption.toLowerCase().includes(debouncedSearch.toLowerCase()) || post.user.name.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesCategory = category === 'All' || post.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleOpenDetails = (post: FeedPost) => {
    setSelectedPost(post);
    onOpen();
  };

  return (
    <Container maxW="container.md" py={4}>
      <Heading size="xl" mb={6} textAlign="center" color="earth.900" _dark={{ color: "earth.50" }}>Community Feed</Heading>
      
      <Flex gap={4} mb={8} flexWrap="wrap">
        <InputGroup flex="1" maxW={{ base: '100%', md: '60%' }}>
          <InputLeftElement pointerEvents="none">
            <Search size={18} />
          </InputLeftElement>
          <Input 
            placeholder="Search posts or users..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <Select 
          w={{ base: '100%', md: '200px' }} 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Textiles">Textiles</option>
          <option value="Antiques">Antiques</option>
          <option value="Art">Art</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Crafts">Crafts</option>
        </Select>
      </Flex>

      {loading ? (
        <VStack spacing={6}>
          {[1, 2].map(i => (
            <Box key={i} w="100%" maxW="2xl" p={6} border="1px solid" borderColor="earth.200" borderRadius="2xl" _dark={{ borderColor: 'whiteAlpha.200' }}>
              <Box display="flex" gap={4} mb={4}>
                <SkeletonCircle size="12" />
                <Box flex="1" mt={2}>
                  <SkeletonText mt="2" noOfLines={2} spacing="4" skeletonHeight="2" />
                </Box>
              </Box>
              <Skeleton height="300px" />
            </Box>
          ))}
        </VStack>
      ) : (
        <VStack spacing={2}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <PostCard key={post.id} post={post} onOpenDetails={handleOpenDetails} />
            ))
          ) : (
            <Box textAlign="center" py={10} color="earth.500" _dark={{ color: "earth.300" }}>
              No posts found. Try adjusting your search or filters.
            </Box>
          )}
        </VStack>
      )}

      {/* Post Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pb={0}>Post Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedPost && (
              <Flex direction={{ base: 'column', md: 'row' }} gap={6} mt={4}>
                <Box flex="1">
                  <Image 
                    src={selectedPost.image} 
                    alt="Post Image" 
                    w="100%" 
                    borderRadius="md"
                    fallbackSrc="https://placehold.co/600x400/E5DFD5/873928?text=Loading..."
                  />
                </Box>
                <Box flex="1" display="flex" flexDirection="column">
                  <Flex gap={3} alignItems="center" mb={4}>
                    <Avatar name={selectedPost.user.name} src={selectedPost.user.avatar} size="sm" />
                    <Heading size="sm" color="earth.900" _dark={{ color: "earth.50" }}>{selectedPost.user.name}</Heading>
                  </Flex>
                  <Text color="earth.800" _dark={{ color: "whiteAlpha.900" }} mb={4}>
                    {selectedPost.caption}
                  </Text>
                  <Divider mb={4} borderColor="earth.200" _dark={{ borderColor: "whiteAlpha.200" }} />
                  <Box color="earth.600" _dark={{ color: "earth.300" }} fontSize="sm">
                    <Text mb={2}>Category: <strong>{selectedPost.category}</strong></Text>
                    <Text mb={2}>Likes: {selectedPost.likes}</Text>
                    <Text mb={2}>Comments: {selectedPost.comments}</Text>
                  </Box>
                </Box>
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Feed;

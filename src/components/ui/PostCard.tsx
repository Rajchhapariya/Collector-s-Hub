import { Card, CardHeader, CardBody, CardFooter, Flex, Avatar, Box, Heading, Text, Image, IconButton, Button, HStack, useToast } from '@chakra-ui/react';
import { Heart, MessageCircle, Bookmark, Share2, MoreVertical } from 'lucide-react';
import type { FeedPost } from '../../types';
import { useFeedStore } from '../../store/useFeedStore';

import { useCollectionStore } from '../../store/useCollectionStore';

interface PostCardProps {
  post: FeedPost;
  onOpenDetails?: (post: FeedPost) => void;
}

const PostCard = ({ post, onOpenDetails }: PostCardProps) => {
  const { likePost, setPostSaved } = useFeedStore();
  const { addItem, removeItem, items } = useCollectionStore();
  const likeColor = '#ed4956'; // Instagram red
  const toast = useToast();

  const isActuallySaved = items.some(item => item.id === post.id && item.collectionType === 'Saved Posts');

  const handleSave = () => {
    if (!isActuallySaved) {
      setPostSaved(post.id, true);
      // Actually add it to the Saved Posts collection
      addItem({
        id: post.id,
        title: `Post by ${post.user.name}`,
        image: post.image,
        price: 0,
        category: post.category,
        condition: 'Used',
        sellerName: post.user.name,
        location: 'Community Feed'
      }, 'Saved Posts');

      toast({
        title: "Saved to collections",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      setPostSaved(post.id, false);
      // Remove it if they unsave
      removeItem(post.id);
    }
  };

  return (
    <Card w="100%" mx="auto" mb={5} rounded="2xl" overflow="hidden">
      <CardHeader py={3} px={4}>
        <Flex justify="space-between" align="center" gap={2}>
          <Flex flex="1" gap={3} alignItems="center">
            <Avatar name={post.user.name} src={post.user.avatar} size="sm" />
            <Box>
              <Heading size="xs" color="earth.900" _dark={{ color: "earth.50" }}>{post.user.name}</Heading>
              <Text fontSize="2xs" color="earth.800" _dark={{ color: "earth.200" }}>2 hours ago</Text>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            size="sm"
            colorScheme="gray"
            aria-label="See menu"
            icon={<MoreVertical size={18} />}
          />
        </Flex>
      </CardHeader>
      
      <CardBody pt={0} px={4} pb={3} cursor={onOpenDetails ? "pointer" : "default"} onClick={() => onOpenDetails?.(post)}>
        <Text mb={2} fontSize="sm" color="earth.900" _dark={{ color: "whiteAlpha.900" }}>{post.caption}</Text>
      </CardBody>
      
      <Image
        src={post.image}
        alt="Post image"
        w="100%"
        maxH="460px"
        objectFit="cover"
        fallbackSrc="https://placehold.co/600x400/E5DFD5/873928?text=Loading..."
        cursor={onOpenDetails ? "pointer" : "default"} 
        onClick={() => onOpenDetails?.(post)}
        loading="lazy"
      />

      <CardFooter justify="space-between" flexWrap="wrap" py={2.5} px={4}>
        <HStack spacing={{ base: 1, md: 3 }}>
          <Button size="sm" variant="ghost" leftIcon={<Heart size={18} fill={post.isLiked ? likeColor : "none"} color={post.isLiked ? likeColor : "currentColor"} />} onClick={() => likePost(post.id)} _hover={{ color: likeColor }}>
            {post.likes}
          </Button>
          <Button size="sm" variant="ghost" leftIcon={<MessageCircle size={18} />}>
            {post.comments}
          </Button>
          <Button size="sm" variant="ghost" leftIcon={<Share2 size={18} />} display={{ base: "none", sm: "flex" }}>
            Share
          </Button>
        </HStack>
        <IconButton 
          variant="ghost" 
          size="sm"
          aria-label="Save post" 
          icon={<Bookmark size={18} fill={isActuallySaved ? "currentColor" : "none"} />} 
          onClick={handleSave} 
        />
      </CardFooter>
    </Card>
  );
};

export default PostCard;

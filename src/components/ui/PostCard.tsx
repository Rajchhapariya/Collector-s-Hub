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
  const { addItem, removeItem } = useCollectionStore();
  const likeColor = '#ed4956'; // Instagram red
  const toast = useToast();

  const handleSave = () => {
    if (!post.isSaved) {
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
    <Card w="100%" mx="auto" mb={6}>
      <CardHeader>
        <Flex justify="space-between" align="flex-start" gap={2}>
          <Flex flex="1" gap="3" alignItems="center">
            <Avatar name={post.user.name} src={post.user.avatar} size={{ base: "sm", md: "md" }} />
            <Box>
              <Heading size="sm" color="earth.900" _dark={{ color: "earth.50" }}>{post.user.name}</Heading>
              <Text fontSize="xs" color="earth.800" _dark={{ color: "earth.200" }}>2 hours ago</Text>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<MoreVertical size={20} />}
          />
        </Flex>
      </CardHeader>
      
      <CardBody pt={0} cursor={onOpenDetails ? "pointer" : "default"} onClick={() => onOpenDetails?.(post)}>
        <Text mb={4} color="earth.900" _dark={{ color: "whiteAlpha.900" }}>{post.caption}</Text>
      </CardBody>
      
      <Image
        src={post.image}
        alt="Post image"
        w="100%"
        fallbackSrc="https://placehold.co/600x400/E5DFD5/873928?text=Loading..."
        cursor={onOpenDetails ? "pointer" : "default"} 
        onClick={() => onOpenDetails?.(post)}
        loading="lazy"
      />

      <CardFooter justify="space-between" flexWrap="wrap" px={{ base: 2, md: 4 }}>
        <HStack spacing={{ base: 1, md: 4 }}>
          <Button size={{ base: "sm", md: "md" }} variant="ghost" leftIcon={<Heart size={20} fill={post.isLiked ? likeColor : "none"} color={post.isLiked ? likeColor : "currentColor"} />} onClick={() => likePost(post.id)} _hover={{ color: likeColor }}>
            {post.likes}
          </Button>
          <Button size={{ base: "sm", md: "md" }} variant="ghost" leftIcon={<MessageCircle size={20} />}>
            {post.comments}
          </Button>
          <Button size={{ base: "sm", md: "md" }} variant="ghost" leftIcon={<Share2 size={20} />} display={{ base: "none", sm: "flex" }}>
            Share
          </Button>
        </HStack>
        <IconButton 
          variant="ghost" 
          aria-label="Save post" 
          icon={<Bookmark size={20} fill={post.isSaved ? "currentColor" : "none"} />} 
          onClick={handleSave} 
        />
      </CardFooter>
    </Card>
  );
};

export default PostCard;

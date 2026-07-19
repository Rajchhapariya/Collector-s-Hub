import { Box, Container, Heading, Text, Button, SimpleGrid, Flex, Icon, VStack, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ShoppingBag, Users, Inbox, ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon, title, description, to }: { icon: any, title: string, description: string, to: string }) => {
  const bg = useColorModeValue('whiteAlpha.800', 'whiteAlpha.100');
  const hoverBg = useColorModeValue('white', 'whiteAlpha.200');
  const borderColor = useColorModeValue('whiteAlpha.500', 'whiteAlpha.200');

  return (
    <Box
      as={RouterLink}
      to={to}
      p={6}
      rounded="2xl"
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
      backdropFilter="blur(16px)"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        transform: 'translateY(-6px)',
        bg: hoverBg,
        boxShadow: 'xl',
        borderColor: 'brand.300',
      }}
      role="group"
    >
      <Flex w={12} h={12} rounded="xl" bg="brand.50" color="brand.500" _dark={{ bg: 'brand.900', color: 'brand.300' }} align="center" justify="center" mb={4} transition="all 0.3s" _groupHover={{ bg: 'brand.500', color: 'white' }}>
        <Icon as={icon} boxSize={5} />
      </Flex>
      <Heading size="sm" mb={2} color="earth.900" _dark={{ color: 'earth.50' }}>{title}</Heading>
      <Text color="earth.600" _dark={{ color: 'earth.300' }} fontSize="sm" mb={4}>{description}</Text>
      <Flex align="center" color="brand.500" _dark={{ color: 'brand.300' }} fontWeight="bold" fontSize="xs">
        Explore <Icon as={ArrowRight} ml={2} boxSize={3.5} transition="all 0.3s" _groupHover={{ transform: 'translateX(4px)' }} />
      </Flex>
    </Box>
  );
};

const Home = () => {
  const bgGradient = useColorModeValue(
    'radial-gradient(circle at 50% -20%, #E7C9C1 0%, transparent 50%)',
    'radial-gradient(circle at 50% -20%, #2A1713 0%, transparent 50%)'
  );

  return (
    <Box position="relative" overflow="hidden" minH="calc(100vh - 64px)">
      {/* Decorative Background Elements */}
      <Box position="absolute" inset={0} bgImage={bgGradient} zIndex={-1} opacity={0.8} />
      <Box position="absolute" top="10%" left="-10%" w="40%" h="40%" rounded="full" bg="brand.300" filter="blur(120px)" opacity={0.15} zIndex={-1} />
      <Box position="absolute" bottom="10%" right="-10%" w="40%" h="40%" rounded="full" bg="orange.300" filter="blur(120px)" opacity={0.15} zIndex={-1} />
      
      <Container maxW="container.xl" pt={{ base: 12, md: 20 }} pb={{ base: 12, md: 16 }}>
        <VStack spacing={6} textAlign="center" maxW="3xl" mx="auto" mb={16}>
          <Box display="inline-block" px={5} py={2} rounded="full" bg="brand.50" color="brand.700" border="1px solid" borderColor="brand.200" _dark={{ bg: 'brand.900', color: 'brand.200', borderColor: 'brand.700' }} fontSize={{ base: 'xs', md: 'sm' }} fontWeight="bold" letterSpacing="wide" boxShadow="sm" mb={1}>
            Welcome to the ultimate collector's platform
          </Box>
          <Heading 
            as="h1" 
            size={{ base: '2xl', md: '3xl' }} 
            letterSpacing="tight" 
            lineHeight="1.2"
            bgGradient="linear(to-r, brand.600, orange.400)"
            bgClip="text"
            pb={1}
          >
            Discover, Share, and Manage Your Collectibles.
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="earth.600" _dark={{ color: 'earth.300' }} maxW="2xl" lineHeight="1.6">
            Join a vibrant community of passionate collectors. Whether you're hunting for rare antiques, showing off your latest find, or tracking your collection's value.
          </Text>
          <Flex gap={4} mt={4} flexDir={{ base: 'column', sm: 'row' }}>
            <Button as={RouterLink} to="/marketplace" size="lg" colorScheme="brand" px={8} h="52px" fontSize="md" rounded="2xl" boxShadow="md" _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}>
              Start Exploring
            </Button>
            <Button as={RouterLink} to="/feed" size="lg" variant="outline" colorScheme="earth" px={8} h="52px" fontSize="md" rounded="2xl" borderWidth="2px" bg="whiteAlpha.500" _dark={{ bg: 'whiteAlpha.100' }} backdropFilter="blur(10px)" _hover={{ bg: 'whiteAlpha.800', _dark: { bg: 'whiteAlpha.200' } }}>
              View Community
            </Button>
          </Flex>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} px={{ base: 2, lg: 0 }}>
          <FeatureCard 
            icon={ShoppingBag}
            title="The Marketplace"
            description="Browse, filter, and discover rare collectibles from sellers all around the world."
            to="/marketplace"
          />
          <FeatureCard 
            icon={Users}
            title="Community Feed"
            description="See what other collectors are finding. Like, comment, and save your favorite posts."
            to="/feed"
          />
          <FeatureCard 
            icon={Inbox}
            title="My Collection"
            description="Organize your owned items, track your wishlists, and monitor your collection's estimated value."
            to="/collection"
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Home;

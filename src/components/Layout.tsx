import { Box, Flex, HStack, IconButton, useColorMode, Container, Heading, Link as ChakraLink, useColorModeValue, Button } from '@chakra-ui/react';
import { Moon, Sun, ShoppingBag } from 'lucide-react';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
    const isActive = location.pathname === to;
    return (
      <ChakraLink
        as={RouterLink}
        to={to}
        px={3}
        py={2}
        rounded="md"
        _hover={{ textDecoration: 'none', bg: colorMode === 'dark' ? 'gray.700' : 'gray.200' }}
        bg={isActive ? (colorMode === 'dark' ? 'gray.700' : 'gray.200') : 'transparent'}
        fontWeight={isActive ? 'bold' : 'medium'}
      >
        {children}
      </ChakraLink>
    );
  };

  const bgGradient = useColorModeValue(
    'radial-gradient(circle at 50% -20%, #E7C9C1 0%, transparent 50%)',
    'radial-gradient(circle at 50% -20%, #2A1713 0%, transparent 50%)'
  );

  return (
    <Box minH="100vh" display="flex" flexDirection="column" position="relative" overflow="hidden">
      {/* Global Background */}
      <Box position="fixed" inset={0} bgImage={bgGradient} zIndex={-1} opacity={0.6} />
      
      <Box as="nav" bg={colorMode === 'dark' ? 'rgba(44, 39, 35, 0.7)' : 'rgba(255, 255, 255, 0.7)'} backdropFilter="blur(16px)" borderBottom="1px solid" borderColor={colorMode === 'dark' ? 'whiteAlpha.200' : 'whiteAlpha.500'} position="sticky" top={0} zIndex={10}>
        <Container maxW="container.xl">
          <Flex h={16} alignItems="center" justify="space-between">
            {/* Left Side: Logo */}
            <Flex flex={{ base: 0, md: 1 }} justify="flex-start">
              <ChakraLink as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
                <Flex alignItems="center" gap={2.5} h="full">
                  <Box color="brand.500" display="flex" alignItems="center">
                    <ShoppingBag size={24} strokeWidth={2.5} />
                  </Box>
                  <Heading size="md" color="brand.500" letterSpacing="tight" lineHeight="1">
                    Collector's Hub
                  </Heading>
                </Flex>
              </ChakraLink>
            </Flex>
            
            {/* Center: Nav Links */}
            <HStack as="nav" spacing={2} display={{ base: 'none', md: 'flex' }} justify="center">
              <NavLink to="/marketplace">Marketplace</NavLink>
              <NavLink to="/feed">Community Feed</NavLink>
              <NavLink to="/collection">My Collection</NavLink>
            </HStack>

            {/* Right Side: Icons */}
            <Flex flex={{ base: 0, md: 1 }} justify="flex-end" alignItems="center" gap={4}>
              <IconButton
                aria-label="Toggle Dark Mode"
                icon={colorMode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                onClick={toggleColorMode}
                variant="ghost"
                isRound
              />
              <Button display={{ base: 'flex', md: 'none' }} variant="ghost">Menu</Button>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box as="main" flex="1" py={8}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

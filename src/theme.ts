import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Outfit', 'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  colors: {
    brand: {
      50: '#FDF7F5', // Light Sand
      100: '#F7E6E0',
      200: '#EFCDC3',
      300: '#E6B2A4',
      400: '#DE9685',
      500: '#D57965', // Terracotta
      600: '#CB5C45',
      700: '#A94A36',
      800: '#873928',
      900: '#642719',
    },
    indigo: {
      50: '#E8EAF6',
      100: '#C5CAE9',
      500: '#3F51B5', // Primary Indigo
      600: '#3949AB',
      900: '#1A237E',
    },
    earth: {
      50: '#F9F8F6', // Warm off-white
      100: '#F2EEE9',
      200: '#E5DFD5',
      800: '#3A352F', // Warm dark text
      900: '#2C2723',
    }
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'earth.900' : 'earth.50',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'earth.800',
        fontFamily: 'body',
      },
    }),
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: '600',
      }
    },
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'lg',
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.600',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'brand.400' : 'brand.700',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s',
        }),
        outline: (props: any) => ({
          borderColor: 'brand.500',
          color: props.colorMode === 'dark' ? 'brand.200' : 'brand.600',
          _hover: {
            bg: props.colorMode === 'dark' ? 'whiteAlpha.100' : 'brand.50',
          }
        })
      },
    },
    Card: {
      baseStyle: (props: any) => ({
        container: {
          borderRadius: '3xl',
          boxShadow: 'xl',
          border: '1px solid',
          borderColor: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'whiteAlpha.500',
          bg: props.colorMode === 'dark' ? 'whiteAlpha.100' : 'whiteAlpha.800',
          backdropFilter: 'blur(16px)',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          _hover: {
            transform: 'translateY(-4px)',
            boxShadow: '2xl',
            borderColor: props.colorMode === 'dark' ? 'brand.400' : 'brand.300',
          }
        },
      }),
    },
    Modal: {
      baseStyle: (props: any) => ({
        dialog: {
          borderRadius: '3xl',
          bg: props.colorMode === 'dark' ? 'rgba(44, 39, 35, 0.9)' : 'rgba(249, 248, 246, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'whiteAlpha.500',
          boxShadow: '2xl',
        }
      })
    },
    Input: {
      defaultProps: { focusBorderColor: 'brand.500' },
      variants: {
        outline: (props: any) => ({
          field: {
            borderRadius: 'xl',
            bg: props.colorMode === 'dark' ? 'whiteAlpha.100' : 'whiteAlpha.500',
            borderColor: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'whiteAlpha.500',
            _hover: { borderColor: 'brand.300' },
          }
        })
      }
    },
    Select: {
      defaultProps: { focusBorderColor: 'brand.500' },
      variants: {
        outline: (props: any) => ({
          field: {
            borderRadius: 'xl',
            bg: props.colorMode === 'dark' ? 'whiteAlpha.100' : 'whiteAlpha.500',
            borderColor: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'whiteAlpha.500',
            _hover: { borderColor: 'brand.300' },
          }
        })
      }
    },
    Badge: {
      baseStyle: {
        borderRadius: 'md',
        px: 2,
        py: 0.5,
      }
    }
  },
});

export default theme;

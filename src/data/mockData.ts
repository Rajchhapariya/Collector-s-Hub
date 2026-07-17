import type { Collectible, FeedPost } from '../types';

export const mockListings: Collectible[] = [
  {
    id: '1',
    title: 'Authentic Kanjeevaram Silk Saree',
    category: 'Textiles',
    condition: 'New',
    price: 15000,
    sellerName: 'WeaversOfIndia',
    location: 'Chennai, India',
    image: '/images/saree.png',
  },
  {
    id: '2',
    title: 'Vintage Brass Diyas (Set of 4)',
    category: 'Antiques',
    condition: 'Excellent',
    price: 4500,
    sellerName: 'HeritageFinds',
    location: 'Jaipur, India',
    image: '/images/diyas.png',
  },
  {
    id: '3',
    title: 'Handcrafted Pichwai Painting',
    category: 'Art',
    condition: 'Like New',
    price: 25000,
    sellerName: 'ArtisanCanvas',
    location: 'Udaipur, India',
    image: '/images/pichwai.png',
  },
  {
    id: '4',
    title: 'Antique Silver Anklets (Payal)',
    category: 'Jewelry',
    condition: 'Very Good',
    price: 12000,
    sellerName: 'SilverLoom',
    location: 'Varanasi, India',
    image: '/images/anklets.png',
  },
  {
    id: '5',
    title: 'Hand-carved Wooden Elephant',
    category: 'Crafts',
    condition: 'Good',
    price: 3500,
    sellerName: 'WoodWorks',
    location: 'Mysore, India',
    image: '/images/elephant.png',
  },
  {
    id: '6',
    title: 'Kashmiri Pashmina Shawl',
    category: 'Textiles',
    condition: 'New',
    price: 18500,
    sellerName: 'HimalayanThreads',
    location: 'Srinagar, India',
    image: '/images/shawl.png',
  },
];

export const mockFeedPosts: FeedPost[] = [
  {
    id: 'p1',
    user: {
      name: 'Aditi Sharma',
      avatar: '/images/avatar1.png',
    },
    image: '/images/saree.png',
    caption: 'Just picked up this beautiful Kanjeevaram Silk! The craftsmanship is absolutely breathtaking. ✨ #Handloom #IndianTextiles',
    category: 'Textiles',
    likes: 342,
    comments: 45,
    isLiked: true,
  },
  {
    id: 'p2',
    user: {
      name: 'Rahul Desai',
      avatar: '/images/avatar2.png',
    },
    image: '/images/diyas.png',
    caption: 'Nothing beats the warm glow of vintage brass diyas for Diwali prep. 🪔',
    category: 'Antiques',
    likes: 128,
    comments: 12,
  },
  {
    id: 'p3',
    user: {
      name: 'Priya Patel',
      avatar: '/images/avatar3.png',
    },
    image: '/images/pichwai.png',
    caption: 'The details on this Pichwai painting from Udaipur are incredible. Such a rich history! 🎨',
    category: 'Art',
    likes: 56,
    comments: 3,
  }
];

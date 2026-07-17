export interface Collectible {
  id: string;
  image: string;
  title: string;
  category: string;
  condition: string;
  price: number;
  sellerName: string;
  location: string;
  estimatedValue?: number;
}

export interface FeedPost {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  image: string;
  caption: string;
  category: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface CollectionItem extends Collectible {
  dateAdded: string;
  collectionType: 'Owned' | 'Wishlist' | 'Selling';
}

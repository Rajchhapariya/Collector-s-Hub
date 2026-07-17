import type { Collectible, FeedPost } from '../types';
import { mockListings, mockFeedPosts } from '../data/mockData';

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getListings = async (): Promise<Collectible[]> => {
  await delay(800);
  return mockListings;
};

export const getFeedPosts = async (): Promise<FeedPost[]> => {
  await delay(1200);
  return mockFeedPosts;
};

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FeedPost } from '../types';

interface FeedState {
  posts: FeedPost[];
  setPosts: (posts: FeedPost[]) => void;
  likePost: (id: string) => void;
  savePost: (id: string) => void;
  setPostSaved: (id: string, isSaved: boolean) => void;
}

export const useFeedStore = create<FeedState>()(
  persist(
    (set, get) => ({
      posts: [],
      setPosts: (newPosts) => {
        const { posts } = get();
        if (posts.length === 0) {
          set({ posts: newPosts });
        } else {
          // Merge to retain persistent like/save state even after fetch
          const merged = newPosts.map(newPost => {
            const existing = posts.find(p => p.id === newPost.id);
            if (existing) {
              return { 
                ...newPost, 
                likes: existing.likes, 
                isLiked: existing.isLiked, 
                isSaved: existing.isSaved 
              };
            }
            return newPost;
          });
          set({ posts: merged });
        }
      },
      likePost: (id) => {
        set((state) => ({
          posts: state.posts.map((post) => {
            if (post.id === id) {
              const isCurrentlyLiked = post.isLiked;
              return {
                ...post,
                isLiked: !isCurrentlyLiked,
                likes: isCurrentlyLiked ? post.likes - 1 : post.likes + 1,
              };
            }
            return post;
          }),
        }));
      },
      savePost: (id) => {
        set((state) => ({
          posts: state.posts.map((post) => {
            if (post.id === id) {
              return { ...post, isSaved: !post.isSaved };
            }
            return post;
          }),
        }));
      },
      setPostSaved: (id, isSaved) => {
        set((state) => ({
          posts: state.posts.map((post) => {
            if (post.id === id) {
              return { ...post, isSaved };
            }
            return post;
          }),
        }));
      },
    }),
    {
      name: 'feed-storage',
    }
  )
);

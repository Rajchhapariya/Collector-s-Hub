import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CollectionItem, Collectible } from '../types';
import { useFeedStore } from './useFeedStore';

interface CollectionState {
  items: CollectionItem[];
  search: string;
  category: string;
  sortBy: string;
  viewMode: 'grid' | 'list';
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setSortBy: (sortBy: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  addItem: (item: Collectible, collectionType: CollectionItem['collectionType']) => { success: boolean; message: string };
  removeItem: (id: string) => void;
  moveItem: (id: string, newType: CollectionItem['collectionType']) => void;
}

export const useCollectionStore = create<CollectionState>()(
  persist(
    (set, get) => ({
      items: [],
      search: '',
      category: '',
      sortBy: 'newest',
      viewMode: 'grid',
      setSearch: (search) => set({ search }),
      setCategory: (category) => set({ category }),
      setSortBy: (sortBy) => set({ sortBy }),
      setViewMode: (viewMode) => set({ viewMode }),
      addItem: (item, collectionType) => {
        const { items } = get();
        const existsInCollection = items.find((i) => i.id === item.id && i.collectionType === collectionType);
        
        if (existsInCollection) {
          return { success: false, message: `This item is already in your ${collectionType} collection.` };
        }

        const newItem: CollectionItem = {
          ...item,
          dateAdded: new Date().toISOString(),
          collectionType,
        };

        set({ items: [...items, newItem] });
        return { success: true, message: `Added to ${collectionType} successfully!` };
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
        useFeedStore.getState().setPostSaved(id, false);
      },
      moveItem: (id, newType) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id) {
              return { ...item, collectionType: newType };
            }
            return item;
          }),
        }));
      },
    }),
    {
      name: 'collectors-hub-storage',
    }
  )
);

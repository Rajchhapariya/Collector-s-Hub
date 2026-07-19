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
  removeItem: (id: string, collectionType?: CollectionItem['collectionType']) => void;
  moveItem: (id: string, newType: CollectionItem['collectionType'], oldType?: CollectionItem['collectionType']) => { success: boolean; message: string };
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
      removeItem: (id, collectionType) => {
        set((state) => ({
          items: state.items.filter((item) => {
            if (collectionType) {
              return !(item.id === id && item.collectionType === collectionType);
            }
            return item.id !== id;
          }),
        }));
        if (!collectionType || collectionType === 'Saved Posts') {
          useFeedStore.getState().setPostSaved(id, false);
        }
      },
      moveItem: (id, newType, oldType) => {
        const { items } = get();
        const targetExists = items.some((i) => i.id === id && i.collectionType === newType);
        if (targetExists) {
          set((state) => ({
            items: state.items.filter((item) => {
              if (oldType) {
                return !(item.id === id && item.collectionType === oldType);
              }
              return !(item.id === id && item.collectionType !== newType);
            }),
          }));
          return { success: true, message: `Moved to ${newType} (item already present)` };
        }

        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id && (!oldType || item.collectionType === oldType)) {
              return { ...item, collectionType: newType };
            }
            return item;
          }),
        }));
        return { success: true, message: `Moved to ${newType}` };
      },
    }),
    {
      name: 'collectors-hub-storage',
    }
  )
);

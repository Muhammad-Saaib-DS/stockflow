import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'stockflow_wishlist';

function getSavedWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveWishlist(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: getSavedWishlist(),
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((item) => item.id === product.id);

      if (exists) {
        state.items = state.items.filter((item) => item.id !== product.id);
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          category: product.category,
        });
      }
      saveWishlist(state.items);
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveWishlist(state.items);
    },
  },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
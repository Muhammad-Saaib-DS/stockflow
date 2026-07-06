import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

const STORAGE_KEY = 'stockflow_categories';

function getSavedCategories() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveCategories(categories) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
}

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const saved = getSavedCategories();
      if (saved) {
        return saved;
      }

      const response = await axiosInstance.get('/products/categories');
      const initial = response.data.map((cat, index) => ({
        id: index + 1,
        name: cat.name,
      }));
      saveCategories(initial);
      return initial;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch categories.'
      );
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addCategory: (state, action) => {
      const newCategory = {
        id: Date.now(),
        name: action.payload,
      };
      state.items.push(newCategory);
      saveCategories(state.items);
    },
    editCategory: (state, action) => {
      const { id, name } = action.payload;
      const category = state.items.find((c) => c.id === id);
      if (category) {
        category.name = name;
        saveCategories(state.items);
      }
    },
    deleteCategory: (state, action) => {
      state.items = state.items.filter((c) => c.id !== action.payload);
      saveCategories(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addCategory, editCategory, deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
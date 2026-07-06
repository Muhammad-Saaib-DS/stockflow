import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import {
  applyLocalChanges,
  saveInventoryMeta,
  saveCreatedProduct,
  updateCreatedProduct,
  removeCreatedProduct,
  markAsDeleted,
} from '../../utils/inventoryStorage';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('https://dummyjson.com/products?limit=30');

      return response.data.products;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch products.'
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/products/add', {
        title: productData.title,
        category: productData.category,
        price: productData.price,
        brand: productData.supplier,
      });
      return { ...response.data, ...productData };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create product.'
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, isLocal, ...updates }, { rejectWithValue }) => {
    try {
      if (!isLocal) {
        await axiosInstance.put(`/products/${id}`, {
          title: updates.title,
          category: updates.category,
          price: updates.price,
        });
      }
      return { id, ...updates };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update product.'
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (product, { rejectWithValue }) => {
    try {
      if (!product.isLocal) {
        await axiosInstance.delete(`/products/${product.id}`);
      }
      return product.id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete product.'
      );
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    filters: {
      search: '',
      category: 'all',
      sortBy: 'default',
    },
  },
  reducers: {
    setSearch: (state, action) => {
      state.filters.search = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = applyLocalChanges(action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        const newProduct = { ...action.payload, isLocal: true };
        state.items.unshift(newProduct);
        saveCreatedProduct(newProduct);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };

          if (state.items[index].isLocal) {
            updateCreatedProduct(action.payload.id, action.payload);
          } else {
            saveInventoryMeta(action.payload.id, {
              quantity: action.payload.quantity,
              lowStockThreshold: action.payload.lowStockThreshold,
            });
          }
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const deleted = state.items.find((p) => p.id === action.payload);
        state.items = state.items.filter((p) => p.id !== action.payload);

        if (deleted?.isLocal) {
          removeCreatedProduct(action.payload);
        } else {
          markAsDeleted(action.payload);
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setSearch, setCategoryFilter, setSortBy } = productsSlice.actions;
export default productsSlice.reducer;
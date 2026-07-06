import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'stockflow_orders';

function getSavedOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    items: getSavedOrders(),
  },
  reducers: {
    placeOrder: (state, action) => {
      const newOrder = {
        id: Date.now(),
        items: action.payload.items,
        total: action.payload.total,
        shippingInfo: action.payload.shippingInfo,
        date: new Date().toISOString(),
        status: 'Processing',
      };
      state.items.unshift(newOrder);
      saveOrders(state.items);
    },
  },
});

export const { placeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
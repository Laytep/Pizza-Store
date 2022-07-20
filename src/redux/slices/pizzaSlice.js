import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { sortBy, order, category, currentPage } = params;
  const { data } = await axios.get(
    `https://62c02a12c134cf51ceca3b76.mockapi.io/Items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}`,
  );
  return data;
});

const initialState = {
  items: [],
  isLoading: 'loading', // loading || success || error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.items = [];
      state.isLoading = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.items = [];
      state.isLoading = 'error';
      console.log('Error');
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

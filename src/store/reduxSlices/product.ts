import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiState, ProductData} from '../../model';

// Async thunk for fetching data
export const fetchData = createAsyncThunk<ProductData[]>(
  'data/fetchData',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      return response.data.products;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState: ApiState = {
  products: [],
  status: 'idle',
  error: null,
};

const apiSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchData.fulfilled,
        (state, action: PayloadAction<ProductData[]>) => {
          state.status = 'succeeded';
          state.products = action.payload;
        },
      )
      .addCase(fetchData.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default apiSlice.reducer;

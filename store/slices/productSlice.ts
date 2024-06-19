import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { IStateStore, IFetchProducts, IProduct } from "@/types/types";
import {
  calculateDiscount,
  convertDollarToBaht,
  numberWithCommas,
} from "@/lib/utils";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ limit, skip }: IFetchProducts, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      const products = mapProductsData(data.products);

      return [products, data?.total || 0];
    } catch (error: any) {
      console.error("Failed to fetch products", error);
      return rejectWithValue(error.message);
    }
  }
);

const mapProductsData = (products: IProduct[]) => {
  return products.map(
    ({
      id,
      title,
      description,
      price,
      discountPercentage,
      rating,
      thumbnail,
    }: IProduct) => ({
      id,
      title,
      description,
      price: convertDollarToBaht(price),
      discountPercentage,
      discountedPrice: convertDollarToBaht(
        calculateDiscount(price, discountPercentage || 0) || 0
      ),
      rating: rating || 0,
      thumbnail,
    })
  );
};

const initialState = {
  products: [],
  productTotal: 0,
} as IStateStore;

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products.push(...action.payload[0]);
      state.productTotal = action.payload[1];
    });
  },
});

export default productSlice.reducer;

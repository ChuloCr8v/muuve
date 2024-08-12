import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsDataTypes, SelectedProductSummaryType } from "../types";

export interface productsState {
  products: ProductsDataTypes[];
  allSelectedProducts: SelectedProductSummaryType[];
  duration: string;
  expandedProductId: string;
}

const initialState: productsState = {
  products: [],
  allSelectedProducts: [],
  duration: "monthly",
  expandedProductId: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setDuration: (state, action: PayloadAction<string>) => {
      state.duration = action.payload;
    },

    addProduct: (state, action: PayloadAction<ProductsDataTypes>) => {
      const checkIfProductExists = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (checkIfProductExists) {
        const updatedSelection = state.products.filter(
          (product) => product.id !== action.payload.id
        );
        state.products = updatedSelection;
        return;
      }
      state.products.push(action.payload);
    },

    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },

    expandProductDetatails: (state, action: PayloadAction<string>) => {
      state.expandedProductId = action.payload;
    },

    customizedProducts: (state, action) => {
      const findProduct = state.allSelectedProducts.find(
        (product) => product.productId === action.payload.productId
      );

      if (findProduct) {
        // Update the product's properties with the new payload
        Object.assign(findProduct, action.payload);
      } else {
        // If the product doesn't exist, add it to the array
        state.allSelectedProducts.push(action.payload);
      }
    },
  },
});

export const {
  addProduct,
  removeProduct,
  setDuration,
  expandProductDetatails,
  customizedProducts,
} = productsSlice.actions;

export default productsSlice.reducer;

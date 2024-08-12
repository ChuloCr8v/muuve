export interface TierTypes {
  id: number;
  label: string;
  value: number;
}

export interface PricingTiersTypes {
  monthly: Array<TierTypes>;
  yearly: Array<TierTypes>;
}

export interface ProductsDataTypes {
  id: string;
  label: string;
  description: string;
  features: Array<string>;
  pricing: PricingTiersTypes;
}

export interface Products {
  id: string;
  label: string;
  pricing: PricingTiersTypes;
}

export interface productsState {
  products: {
    products: ProductsDataTypes[];
    allSelectedProducts: SelectedProductSummaryType[];
    duration: string;
    expandedProductId: string;
  };
}

export interface SelectedProductSummaryType {
  product: string;
  id: number;
  productId: string;
  tierLabel: string;
  tierValue: number;
}

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
  pricing: PricingTiersTypes;
}

export const productsData: Array<ProductsDataTypes> = [
  {
    id: "PM",
    label: "Project Management",
    pricing: {
      monthly: [
        { id: 1, label: "basic", value: 400000 },
        { id: 2, label: "standard", value: 480000 },
        { id: 3, label: "premium", value: 550000 },
      ],
      yearly: [
        { id: 1, label: "basic", value: 350000 * 12 },
        { id: 2, label: "standard", value: 430000 * 12 },
        { id: 3, label: "premium", value: 500000 * 12 },
      ],
    },
  },
  {
    id: "BS",
    label: "Billing System",
    pricing: {
      monthly: [
        { id: 1, label: "basic", value: 300000 },
        { id: 2, label: "standard", value: 380000 },
        { id: 3, label: "premium", value: 450000 },
      ],
      yearly: [
        { id: 1, label: "basic", value: 250000 * 12 },
        { id: 2, label: "standard", value: 330000 * 12 },
        { id: 3, label: "premium", value: 400000 * 12 },
      ],
    },
  },
  {
    id: "IM",
    label: "Incident Management",
    pricing: {
      monthly: [
        { id: 1, label: "basic", value: 500000 },
        { id: 2, label: "standard", value: 580000 },
        { id: 3, label: "premium", value: 650000 },
      ],
      yearly: [
        { id: 1, label: "basic", value: 450000 * 12 },
        { id: 2, label: "standard", value: 530000 * 12 },
        { id: 3, label: "premium", value: 600000 * 12 },
      ],
    },
  },
  {
    id: "OM",
    label: "Operations Management",
    pricing: {
      monthly: [
        { id: 1, label: "basic", value: 400000 },
        { id: 2, label: "standard", value: 480000 },
        { id: 3, label: "premium", value: 550000 },
      ],
      yearly: [
        { id: 1, label: "basic", value: 350000 * 12 },
        { id: 2, label: "standard", value: 430000 * 12 },
        { id: 3, label: "premium", value: 500000 * 12 },
      ],
    },
  },
  {
    id: "IS",
    label: "Inventory System",
    pricing: {
      monthly: [
        { id: 1, label: "basic", value: 300000 },
        { id: 2, label: "standard", value: 380000 },
        { id: 3, label: "premium", value: 450000 },
      ],
      yearly: [
        { id: 1, label: "basic", value: 250000 * 12 },
        { id: 2, label: "standard", value: 330000 * 12 },
        { id: 3, label: "premium", value: 400000 * 12 },
      ],
    },
  },
  {
    id: "VM",
    label: "Vendor Management",
    pricing: {
      monthly: [
        { id: 1, label: "basic", value: 400000 },
        { id: 2, label: "standard", value: 480000 },
        { id: 3, label: "premium", value: 550000 },
      ],
      yearly: [
        { id: 1, label: "basic", value: 350000 * 12 },
        { id: 2, label: "standard", value: 430000 * 12 },
        { id: 3, label: "premium", value: 500000 * 12 },
      ],
    },
  },
];

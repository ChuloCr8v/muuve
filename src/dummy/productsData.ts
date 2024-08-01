export interface TierTypes {
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
        { label: "basic", value: 400000 },
        { label: "standard", value: 480000 },
        { label: "premium", value: 550000 },
      ],
      yearly: [
        { label: "basic", value: 350000 },
        { label: "standard", value: 430000 },
        { label: "premium", value: 500000 },
      ],
    },
  },
  {
    id: "BS",
    label: "Billing System",
    pricing: {
      monthly: [
        { label: "basic", value: 300000 },
        { label: "standard", value: 380000 },
        { label: "premium", value: 450000 },
      ],
      yearly: [
        { label: "basic", value: 250000 },
        { label: "standard", value: 330000 },
        { label: "premium", value: 400000 },
      ],
    },
  },
  {
    id: "IM",
    label: "Incident Management",
    pricing: {
      monthly: [
        { label: "basic", value: 500000 },
        { label: "standard", value: 580000 },
        { label: "premium", value: 650000 },
      ],
      yearly: [
        { label: "basic", value: 450000 },
        { label: "standard", value: 530000 },
        { label: "premium", value: 600000 },
      ],
    },
  },
  {
    id: "OM",
    label: "Operations Management",

    pricing: {
      monthly: [
        { label: "basic", value: 400000 },
        { label: "standard", value: 480000 },
        { label: "premium", value: 550000 },
      ],
      yearly: [
        { label: "basic", value: 350000 },
        { label: "standard", value: 430000 },
        { label: "premium", value: 500000 },
      ],
    },
  },
  {
    id: "IS",
    label: "Inventory System",
    pricing: {
      monthly: [
        { label: "basic", value: 300000 },
        { label: "standard", value: 380000 },
        { label: "premium", value: 450000 },
      ],
      yearly: [
        { label: "basic", value: 250000 },
        { label: "standard", value: 330000 },
        { label: "premium", value: 400000 },
      ],
    },
  },
  {
    id: "VM",
    label: "Vendor Management",
    pricing: {
      monthly: [
        { label: "basic", value: 400000 },
        { label: "standard", value: 480000 },
        { label: "premium", value: 550000 },
      ],
      yearly: [
        { label: "basic", value: 350000 },
        { label: "standard", value: 430000 },
        { label: "premium", value: 500000 },
      ],
    },
  },
];

export const ProjectManagementCostData = [
  {
    label: "Basic",
    price: 400000,
  },
  {
    label: "Standard",
    price: 400000,
  },
  {
    label: "Premium",
    price: 400000,
  },
];

export const IncidentManagementCostData = [
  {
    label: "Basic",
    price: 400000,
  },
  {
    label: "Standard",
    price: 400000,
  },
  {
    label: "Premium",
    price: 400000,
  },
];

export const productsCostData = [
  { id: "PM", label: "Project Management", data: ProjectManagementCostData },
  { id: "IM", label: "Project Management", data: IncidentManagementCostData },
];

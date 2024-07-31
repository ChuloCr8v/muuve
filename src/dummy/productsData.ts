export interface productsDataTypes {
  id: string;
  label: string;
  monthly: number;
  yearly: number;
}

export const productsData: Array<productsDataTypes> = [
  {
    id: "PM",
    label: "Project Management",
    monthly: 400000,
    yearly: 300000 * 12,
  },
  {
    id: "BS",
    label: "Billing System",
    monthly: 400000,
    yearly: 300000 * 12,
  },
  {
    id: "IM",
    label: "Incident Management",
    monthly: 580000,
    yearly: 480000 * 12,
  },
  {
    id: "OM",
    label: "Operations Management",
    monthly: 320000,
    yearly: 300000 * 12,
  },
  {
    id: "IS",
    label: "Inventory System",
    monthly: 480000,
    yearly: 450000 * 12,
  },
  {
    id: "VM",
    label: "Vendor Management",
    monthly: 400000,
    yearly: 380000 * 12,
  },
];

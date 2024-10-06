import FormItem from "antd/es/form/FormItem";

// Define the type for each item in the survey or similar arrays
export interface FormItem {
  label: string;
  type: "custom" | "input" | "select" | "cordinate" | "upload" | "textarea";
  options?: string[]
}

// Now, define the arrays with the correct type
export const Survey: FormItem[] = [
  { label: "Request Type", type: "custom", },
  { label: "Customer Name", type: "input" },
  { label: "Service Location Address", type: "input" },
  { label: "Service Type", type: "select", options: [ ' bdsb c nbdc', 'nbsnmsw']},
  { label: "Request Type", type: "select", options: [ 'nbwhjdwd', 'nbsnmsw'] },
  { label: "Manager", type: "select", options: [ 'afctiom', 'nbsnmsw'] },
  // { label: "Bandwidth", type: "select", options: [ 'afctiom', 'nbsnmsw'] },
  // { label: "State", type: "select", options: [ 'afctiom', 'nbsnmsw'] },
  // { label: "Region", type: "select", options: [ 'afctiom', 'nbsnmsw'] },
  // { label: "Longitude", type: "cordinate" },
  // { label: "Latitude", type: "cordinate" },
  // { label: "Upload", type: "upload" },
  // { label: "Comment", type: "textarea" },
];

export const JobOrder: FormItem[] = [
  { label: "Customer Name", type: "input" },
  { label: "Service Location Address", type: "input" },
  { label: "Service Type", type: "select" },
  { label: "Request Type", type: "select" },
  { label: "Manager", type: "select" },
  { label: "Bandwidth", type: "select" },
  { label: "State", type: "select" },
  { label: "Region", type: "select" },
  { label: "Longitude", type: "input" },
  { label: "Latitude", type: "input" },
];

export const Customer: FormItem[] = [
  { label: "Customer Name", type: "input" },
  { label: "Service Location Address", type: "input" },
  { label: "Service Type", type: "select" },
  { label: "Request Type", type: "select" },
  { label: "Manager", type: "select" },
  { label: "Bandwidth", type: "select" },
  { label: "State", type: "select" },
  { label: "Region", type: "select" },
  { label: "Longitude", type: "input" },
  { label: "Latitude", type: "input" },
];

export const Staff: FormItem[] = [
  { label: "Customer Name", type: "input" },
  { label: "Service Location Address", type: "input" },
  { label: "Service Type", type: "select" },
  { label: "Request Type", type: "select" },
  { label: "Manager", type: "select" },
  { label: "Bandwidth", type: "select" },
  { label: "State", type: "select" },
  { label: "Region", type: "select" },
  { label: "Longitude", type: "input" },
  { label: "Latitude", type: "input" },
];

export const projectForm = [
  {label: 'New Job Order', value: 'New Joborder'},
  {label: 'New Survey Request', value: 'Survey Request'}
]


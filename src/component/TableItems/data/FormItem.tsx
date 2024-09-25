// Define the type for each item in the survey or similar arrays
interface FormItem {
  label: string;
  type: "custom" | "input" | "select" | "cordinate" | "upload" | "textarea";
}

// Now, define the arrays with the correct type
export const Survey: FormItem[] = [
  { label: "Request Type", type: "custom" },
  { label: "Customer Name", type: "input" },
  { label: "Service Location Address", type: "input" },
  { label: "Service Type", type: "select" },
  { label: "Request Type", type: "select" },
  { label: "Manager", type: "select" },
  { label: "Bandwidth", type: "select" },
  { label: "State", type: "select" },
  { label: "Region", type: "select" },
  { label: "Longitude", type: "cordinate" },
  { label: "Latitude", type: "cordinate" },
  { label: "Upload", type: "upload" },
  { label: "Comment", type: "textarea" },
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

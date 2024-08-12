import { ProductsDataTypes } from "../types";

export const productsData: Array<ProductsDataTypes> = [
  {
    id: "BS",
    label: "Billing System",
    description:
      "Our Billing System offers a robust platform for managing your organization's invoicing and payment processes. It provides an intuitive interface for tracking payments and generating financial reports.",
    features: [
      "Automated invoicing",
      "Payment processing integration",
      "Detailed financial reporting",
      "Multi-currency support",
      "Customizable invoice templates",
    ],
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
    description:
      "Our Incident Management System helps you efficiently track and resolve incidents within your organization, ensuring compliance and reducing downtime.",
    features: [
      "Real-time incident tracking",
      "Automated incident response",
      "Customizable incident workflows",
      "Integrated reporting and analytics",
      "User access control and permissions",
    ],
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
    description:
      "Optimize your organization's operations with our comprehensive Operations Management System, designed to streamline processes and improve efficiency.",
    features: [
      "Process automation",
      "Task and resource management",
      "Real-time operations monitoring",
      "Integrated reporting and analytics",
      "Customizable workflows",
    ],
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
    description:
      "Manage your inventory effectively with our Inventory System, offering real-time tracking and detailed reporting to help you maintain optimal stock levels.",
    features: [
      "Real-time inventory tracking",
      "Automated stock alerts",
      "Multi-location support",
      "Inventory valuation methods",
      "Detailed inventory reporting",
    ],
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
    description:
      "Simplify the process of managing vendor relationships with our Vendor Management System, ensuring compliance and improving vendor performance.",
    features: [
      "Vendor contract management",
      "Performance tracking and reporting",
      "Automated vendor onboarding",
      "Compliance management",
      "Multi-vendor support",
    ],
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
    id: "PM",
    label: "Project Management",
    description:
      "Our Project Management System is designed to help teams plan, execute, and track projects with ease. It offers a suite of tools that enable efficient collaboration, task management, and progress tracking, ensuring that your projects stay on schedule and within budget.",
    features: [
      "Task and milestone tracking",
      "Gantt chart for project scheduling",
      "Team collaboration tools",
      "Resource allocation and management",
      "Progress reporting and analytics",
      "Time tracking and timesheets",
    ],
    pricing: {
      monthly: [
        {
          id: 1,
          label: "basic",
          value: 400000,
        },
        {
          id: 2,
          label: "standard",
          value: 480000,
        },
        {
          id: 3,
          label: "premium",
          value: 550000,
        },
      ],
      yearly: [
        {
          id: 1,
          label: "basic",
          value: 4200000,
        },
        {
          id: 2,
          label: "standard",
          value: 5160000,
        },
        {
          id: 3,
          label: "premium",
          value: 6000000,
        },
      ],
    },
  },
];

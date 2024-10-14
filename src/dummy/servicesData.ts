import dayjs from "dayjs";

export const servicesData = [
  {
    id: "123-456-4532",
    serviceName: "Connectivity Plus",
    status: "active",
    description:
      "lorem ipsum, dolor sit amet consecrture. Ipsum adipiscinf pulvinar in sit",
    dateCreated: dayjs.unix(1726387200),
    billingCycle: "monthly",
    plans: [
      {
        label: "Basic",
        tierName: "Bronze",
        description:
          "lorem ipsum, dolor sit amet consecrture. Ipsum adipiscinf pulvinar in si",
        features: ["Can Delete Report", "Can Edit Report"],
        price: 20000,
      },
      {
        label: "Standard",
        tierName: "Silver",
        description:
          "lorem ipsum, dolor sit amet consecrture. Ipsum adipiscinf pulvinar in si",
        features: ["Can Delete Report", "Can Edit Report", "Can View Report"],
        price: 20000,
      },
      {
        label: "Premium",
        tierName: "Gold",
        description:
          "lorem ipsum, dolor sit amet consecrture. Ipsum adipiscinf pulvinar in si",
        features: ["Can Delete Report", "Can Edit Report", "Can View Report"],
        price: 20000,
      },
    ],
  },
  {
    id: "123-456-45322",
    serviceName: "Cloud Sync",
    status: "deactivated",
    dateCreated: dayjs.unix(1726387200),
    description: "Efficient cloud syncing for your business data and files.",
    billingCycle: "yearly",
    plans: [
      {
        label: "Basic",
        tierName: "Bronze",
        description: "Basic plan for limited cloud storage and syncing.",
        features: ["1TB Cloud Storage", "Basic Syncing"],
        price: 15000,
      },
      {
        label: "Standard",
        tierName: "Silver",
        description: "Extended storage and more syncing features.",
        dateCreated: dayjs.unix(1726387200),
        features: ["5TB Cloud Storage", "Priority Syncing", "Basic Security"],
        price: 30000,
      },
      {
        label: "Premium",
        tierName: "Gold",
        description: "Advanced features with maximum security.",
        features: [
          "Unlimited Cloud Storage",
          "Enhanced Syncing",
          "Advanced Security",
        ],
        price: 50000,
      },
    ],
  },
  {
    id: "123-456-45323",
    serviceName: "Security Pro",
    status: "active",
    dateCreated: dayjs.unix(1726387200),
    description: "Comprehensive security solutions for your business.",
    billingCycle: "monthly",
    plans: [
      {
        label: "Basic",
        tierName: "Bronze",
        description: "Standard security features to safeguard your data.",
        features: ["Basic Firewall", "Data Encryption"],
        price: 12000,
      },
    ],
  },
  {
    id: "123-456-45324",
    serviceName: "Data Insights",
    dateCreated: dayjs.unix(1726387200),
    description: "Powerful analytics to derive insights from your data.",
    status: "deactivated",
    billingCycle: "yearly",
    plans: [
      {
        label: "Basic",
        tierName: "Bronze",
        description: "Basic reporting and insights for your business.",
        features: [
          "Monthly Reports",
          "Basic Dashboards",
          "Basic Dashboards",
          "Basic Dashboards",
          "Basic Dashboards",
          "Basic Dashboards",
          "Basic Dashboards",
          "Basic Dashboards",
          "Basic Dashboards",
        ],
        price: 10000,
      },
      {
        label: "Standard",
        tierName: "Silver",
        description: "Advanced insights with custom dashboards.",
        features: [
          "Weekly Reports",
          "Custom Dashboards",
          "Data Visualizations",
        ],
        price: 25000,
      },
      {
        label: "Premium",
        tierName: "Gold",
        description: "Comprehensive insights with predictive analytics.",
        features: [
          "Daily Reports",
          "Advanced Dashboards",
          "Predictive Analytics",
        ],
        price: 45000,
      },
    ],
  },
  {
    id: "123-456-45325",
    serviceName: "API Gateway",
    description: "Scalable API gateway services for your applications.",
    dateCreated: dayjs.unix(1726387200),
    status: "deactivated",
    billingCycle: "yearly",
    plans: [
      {
        label: "Basic",
        tierName: "Bronze",
        description: "Essential API management for small apps.",
        features: ["10,000 API Requests", "Basic Authentication"],
        price: 5000,
      },
    ],
  },
  {
    id: "123-456-45326",
    serviceName: "DevOps Toolkit",
    dateCreated: dayjs.unix(1726387200),
    description: "Comprehensive tools for automating your DevOps workflow.",
    status: "active",
    billingCycle: "monthly",
    plans: [
      {
        label: "Basic",
        tierName: "Bronze",
        description: "Basic tools for small teams.",
        features: ["CI/CD Pipelines", "Basic Monitoring"],
        price: 10000,
      },
      {
        label: "Premium",
        tierName: "Gold",
        description: "Complete DevOps automation for large enterprises.",
        features: [
          "CI/CD Pipelines",
          "Advanced Monitoring",
          "Custom Automations",
        ],
        price: 35000,
      },
    ],
  },
];

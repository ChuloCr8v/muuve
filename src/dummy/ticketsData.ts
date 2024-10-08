import { FileInterface } from "../types";

export const ticketsData = [
  {
    id: "1234-4560-789",
    description:
      "Donec augue ac bibendum non nunc eget non ultrices ultrices. Pharetra facilisis ullamcorper a sapien faucibus. Nulla quam quis enim senectus. Gravida maecenas scelerisque risus sed faucibus ullamcorper viverra viverra at. Egestas turpis fusce adipiscing condimentum.",
    subject: "Payment Question",
    category: "Finance",
    customer: "Stefflon Don",
    organization: "Kenny Spree",
    severity: "high",
    sla: 1725688300000,
    status: "pending",
    requestDate: 1732387200000,
    assignee: "Modesta Ekeh",
    attachments: [
      {
        name: "title.xls",
        size: 16,
        type: "xls",
      },
      {
        name: "title.pdf",
        size: 20,
        type: "pdf",
      },
    ],
    replies: [
      {
        user: { firstName: "Stephanie", lastName: "Alfred" },
        message: "Donec augue ac bibendum non nunc eget non ultrices ultrices",
        date: 1759276800,
        attachments: [
          {
            name: "title.doc",
            size: 16,
            type: "doc",
          },
        ],
      },
    ],
    history: [
      {
        id: 123,
        action: "resolved ticket",
        by: "modesta ekeh",
        description:
          "Lorem ipsum dolor sit amet consectetur. Vitae turpis scelerisque bibendum dictum. Augue massa morbi ac at arcu nunc consequat.",
        date: 1759276800,
        attachments: [
          {
            name: "title.xls",
            size: 16,
            type: "xls",
          },
          {
            name: "title.pdf",
            size: 20,
            type: "pdf",
          },
        ],
      },
      {
        id: 87,
        action: "assigned ticket",
        assigner: "leo aso",
        assignee: "Stefflon Don",
        date: 1759276800,
        attachments: [
          {
            name: "title.xls",
            size: 16,
            type: "xls",
          },
          {
            name: "title.pdf",
            size: 20,
            type: "pdf",
          },
        ],
      },
      {
        id: 45,
        action: "ticket modified",
        by: "modesta ekeh",
        description:
          "Lorem ipsum dolor sit amet consectetur. Vitae turpis scelerisque bibendum dictum. Augue massa morbi ac at arcu nunc consequat.",
        date: 1759276800,
        attachments: [
          {
            name: "title.xls",
            size: 16,
            type: "xls",
          },
          {
            name: "title.pdf",
            size: 20,
            type: "pdf",
          },
        ],
      },
      {
        id: 123,
        action: "ticket raised",
        by: "modesta ekeh",
        description:
          "Lorem ipsum dolor sit amet consectetur. Vitae turpis scelerisque bibendum dictum. Augue massa morbi ac at arcu nunc consequat.",
        date: 1759276800,
        attachments: [
          {
            name: "title.xls",
            size: 16,
            type: "xls",
          },
          {
            name: "title.pdf",
            size: 20,
            type: "pdf",
          },
        ],
      },
    ],
  },
];

export const ticketSeverity = [
  {
    label: "Critical",
    value: "critical",
  },
  {
    label: "High",
    value: "high",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Low",
    value: "low",
  },
];

export const newTicketFormFields = {
  subject: "",
  description: "",
  customer: "",
  severity: "",
  required: true,
  attachments: [],
};

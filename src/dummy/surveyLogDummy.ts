import { SurveyLogInterface } from "../types";

export const surveyLogData: SurveyLogInterface[] = [
  {
    id: 1,
    action: "requested",
    by: "Modesta Ekeh",
    to: "Modesta Ekeh",
    createdAt: "2024-09-12T10:15:00.000Z", // Random createdAt date
    comment:
      "Lorem ipsum dolor sit amet consectetur. Vitae turpis scelerisque bibendum dictum. Augue massa morbi ac at arcu nunc consequat.",
    attachments: [
      {
        name: "Document 1.xls",
        size: "5.56",
      },
      {
        name: "Document 2.xls",
        size: "5.56",
      },
    ],
  },
  {
    id: 2,
    action: "assigned",
    by: "Modesta Ekeh",
    to: "engineer",
    createdAt: "2024-09-20T14:45:00.000Z", // Random createdAt date
    comment:
      "Lorem ipsum dolor sit amet consectetur. Vitae turpis scelerisque bibendum dictum. Augue massa morbi ac at arcu nunc consequat.",
    attachments: [
      {
        name: "Document 1.xls",
        size: "5.56",
      },
      {
        name: "Document 2.xls",
        size: "5.56",
      },
    ],
  },
  {
    id: 3,
    action: "reverted",
    by: "Engineer",
    to: "Modesta Ekeh",
    createdAt: "2024-09-08T09:20:00.000Z", // Random createdAt date
    comment:
      "Lorem ipsum dolor sit amet consectetur. Vitae turpis scelerisque bibendum dictum. Augue massa morbi ac at arcu nunc consequat.",
    attachments: [
      {
        name: "Document 1.xls",
        size: "5.56",
      },
      {
        name: "Document 2.xls",
        size: "5.56",
      },
    ],
  },
  {
    id: 4,
    action: "completed",
    by: "Engineer",
    to: "Modesta Ekeh",
    createdAt: "2024-08-05T16:30:00.000Z", // Random createdAt date
    comment:
      "Lorem ipsum dolor sit amet consectetur. Vitae turpis scelerisque bibendum dictum. Augue massa morbi ac at arcu nunc consequat.",
    attachments: [
      {
        name: "Document 1.xls",
        size: "5.56",
      },
      {
        name: "Document 2.xls",
        size: "5.56",
      },
    ],
  },
];

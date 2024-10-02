export const newRoleFormFields = [
  {
    label: "Role Name",
    name: "roleName",
    value: "",
    type: "text-input",
    required: true,
  },
  {
    label: "Description",
    name: "description",
    value: "",
    type: "textarea",
    required: true,
  },
  {
    label: "Assign To",
    name: "assignTo",
    value: "",
    type: "select",
    required: true,
    options: [
      {
        label: "Modesta Ekeh",
        value: "Modesta Ekeh",
      },
      {
        label: "Kehinde Ayoola",
        value: "Kehinde Ayoola",
      },
    ],
  },
  {
    label: "Reporting To",
    name: "reportingTo",
    value: "",
    type: "select",
    required: true,
    options: [
      {
        label: "Design Manager",
        value: "Design Manager",
      },
      {
        label: "Design Engineer",
        value: "Design Engineer",
      },
    ],
  },
  {
    label: "Can create report",
    name: "canCreateReport",
    value: false,
    type: "checkbox",
  },
  {
    label: "Can view all reports",
    name: "canViewReport",
    value: false,
    type: "checkbox",
  },
  {
    label: "Can edit all reports",
    name: "canEditReport",
    value: false,
    type: "checkbox",
  },
  {
    label: "Can delete all reports",
    name: "canDeleteReport",
    value: false,
    type: "checkbox",
  },
];

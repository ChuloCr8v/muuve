export const roles = [
  {
    roleName: "Design Manager",
    description:
      "Lorem ipsum dolor sit amet consectetur. Amet blandit ut cras facilisis fermentum. Lorem sed tristique lectus sed tempus at lobortis.",
    users: [
      { firstName: "Modesta", lastName: "Ekeh" },
      { firstName: "Mistura", lastName: "Saraudeen" },
      { firstName: "Kehinde", lastName: "Ayeola" },
    ],
    permissions: [0, 1, 2, 3],
    reportingTo: "design manager",
  },
  {
    roleName: "EB Presales",
    description:
      "Lorem ipsum dolor sit amet consectetur. Amet blandit ut cras facilisis fermentum. Lorem sed tristique lectus sed tempus at lobortis.",
    users: [
      { firstName: "Modesta", lastName: "Ekeh" },
      { firstName: "Mistura", lastName: "Saraudeen" },
      { firstName: "Kehinde", lastName: "Ayeola" },
      { firstName: "Bonaventure", lastName: "Nkematu" },
      { firstName: "Stepahie", lastName: "Alfred" },
    ],

    permissions: [0, 1],
  },
  {
    roleName: "Design Engineer",
    description:
      "Lorem ipsum dolor sit amet consectetur. Amet blandit ut cras facilisis fermentum. Lorem sed tristique lectus sed tempus at lobortis.",
    users: [
      { firstName: "Modesta", lastName: "Ekeh" },
      { firstName: "Bonaventure", lastName: "Nkematu" },
    ],
    permissions: [1, 2, 3],
    reportingTo: "design manager",
  },
];

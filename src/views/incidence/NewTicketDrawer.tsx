// import { Button, Drawer, Form, Input, Select } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { FileInterface, popupInterface, TicketsDataType } from "../../types";
// import TextArea from "antd/es/input/TextArea";
// import TicketSeverityTag from "./TicketSeverityTag";
// import { newTicketFormFields, ticketSeverity } from "../../dummy/ticketsData";
// import { closeNewTicketDrawer } from "../../redux/popupSlice";
// import { twMerge } from "tailwind-merge";
// import { useEffect, useState } from "react";
// import useTicketSeverityColor from "../../hooks/incidence/useTicketSeverityColor";
// import useGetSingleTicket from "../../hooks/incidence/useGetSingleTicket";
// import { users } from "../../dummy/users";
// import MultiUpload from "../../components/global/MultipleUpload";
// import CustomLabel from "../../components/onboarding/CustomLabel";

// const NewTicketDrawer = () => {
//   const [newTicketFormData, setNewTicketFormData] = useState<
//     TicketsDataType | undefined | any
//   >(newTicketFormFields);

//   const { newTicketDrawerIsOpen } = useSelector(
//     (state: popupInterface) => state.popups
//   );

//   const { isOpen, editTicket, ticketID } = newTicketDrawerIsOpen;
//   const { ticketSeverityColor } = useTicketSeverityColor();
//   const { ticket } = useGetSingleTicket(ticketID);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     setNewTicketFormData(editTicket ? ticket : newTicketFormData);
//   }, []);

//   const handleInputChange = (name: string, value: string | FileInterface[]) => {
//     setNewTicketFormData((prev: TicketsDataType) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     console.log("submit");
//   };

//   const Footer = () => {
//     return (
//       <div className="flex items-center justify-end gap-4 py-4">
//         <Button
//           className="w-[144px]"
//           onClick={() => dispatch(closeNewTicketDrawer())}
//         >
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} className="w-[144px]" type="primary">
//           Submit
//         </Button>
//       </div>
//     );
//   };

//   console.log(ticket);

//   const activeSeverity = (label: string, value: string) => {
//     console.log(label, value);
//     if (label.toLowerCase() === value.toLowerCase()) {
//       return ticketSeverityColor(value);
//     }
//   };

//   return (
//     <Drawer
//       onClose={() => {
//         dispatch(closeNewTicketDrawer());
//         setNewTicketFormData(newTicketFormFields);
//       }}
//       width={540}
//       title={editTicket ? "Edit Ticket" : "New Ticket"}
//       footer={<Footer />}
//       open={isOpen}
//     >
//       <Form
//         layout="vertical"
//         colon={false}
//         className="grid grid-cols-2 gap-x-4 gap-y-1"
//       >
//         <Form.Item
//           className={twMerge("col-span-2")}
//           label={<CustomLabel label="Subject" required />}
//         >
//           <Input
//             name={"subject"}
//             type="text"
//             value={newTicketFormData?.subject}
//             onChange={(e) => handleInputChange("subject", e.target.value)}
//             className="!h-7"
//           />
//           <Form.Item
//             className={twMerge("col-span-2")}
//             label={<CustomLabel label="Subject" required />}
//           >
//             <TextArea
//               value={newTicketFormData?.description}
//               onChange={(e) => handleInputChange("description", e.target.value)}
//             />
//           </Form.Item>

//           <Form.Item
//             className={twMerge("col-span-2")}
//             label={<CustomLabel label="Customer" required />}
//           >
//             <Select
//               className="!h-7"
//               onChange={(value) => handleInputChange("customer", value)}
//               options={users?.map((option) => ({
//                 label: option.label,
//                 value: option.value,
//               }))}
//             />
//           </Form.Item>

//           <div className="grid grid-cols-4 items-center gap-2">
//             {ticketSeverity.map((item) => (
//               <div
//                 key={item.label}
//                 onClick={() => handleInputChange("severity", item.value)}
//                 className={twMerge(
//                   "border rounded-md py-2 px-3 cursor-pointer",
//                   activeSeverity(item.value, newTicketFormData.severity)
//                 )}
//               >
//                 <TicketSeverityTag severity={item.value} />
//               </div>
//             ))}
//           </div>
//         </Form.Item>
//         <Form.Item
//           className="col-span-2"
//           label={
//             <CustomLabel
//               label="Attach file"
//               extra="(Max: 10 files, 10mb each"
//             />
//           }
//         >
//           <MultiUpload
//             files={newTicketFormData?.attachments}
//             setFiles={(value) => handleInputChange("attachments", value)}
//           />{" "}
//         </Form.Item>
//       </Form>
//     </Drawer>
//   );
// };

// export default NewTicketDrawer;

import React from "react";

type Props = {};

const NewTicketDrawer = (props: Props) => {
  return <div>NewTicketDrawer</div>;
};

export default NewTicketDrawer;

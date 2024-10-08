// import { useDispatch, useSelector } from "react-redux";
// import { popupInterface } from "../../types";
// import { closeTicketActionModal } from "../../redux/popupSlice";
// import { Form, Select } from "antd";
// import { users } from "../../dummy/users";
// import { useState } from "react";
// import useGetSingleTicket from "../../hooks/incidence/useGetSingleTicket";
// import { UserSwitchOutlined } from "@ant-design/icons";
// import { BiUserCheck } from "react-icons/bi";
// import CustomLabel from "../../components/onboarding/CustomLabel";
// import ActionPopup from "../../components/global/ActionPopup";

// const AssignTicketModal = () => {
//   const { ticketActionModalIsOpen } = useSelector(
//     (state: popupInterface) => state.popups
//   );
//   const { isOpen, ticketID, action } = ticketActionModalIsOpen;
//   const { ticket } = useGetSingleTicket(ticketID);

//   const [assignee, setAssignee] = useState("");

//   const dispatch = useDispatch();

//   const handleChange = (value: string) => {
//     setAssignee(value);
//     console.log(assignee);
//   };

//   const handleAssignTicket = () => {
//     dispatch(closeTicketActionModal());
//   };

//   const label = action === "reassign ticket" ? "Reassign" : "Assign";
//   const icon =
//     action === "reassign ticket" ? (
//       <UserSwitchOutlined className="text-3xl" />
//     ) : (
//       <BiUserCheck className="text-4xl" />
//     );

//   return (
//     <ActionPopup
//       onOk={handleAssignTicket}
//       open={isOpen && action?.toLowerCase().includes("assign")}
//       onCancel={() => dispatch(closeTicketActionModal())}
//       title={label + " " + "Ticket"}
//       sendButtonText={label}
//       icon={icon}
//     >
//       <div className="space-y-2">
//         <p className="">
//           {label}{" "}
//           <span className="font-semibold text-primary">{ticket?.subject}</span>
//         </p>
//         <Form colon={false} layout="vertical">
//           <Form.Item label=<CustomLabel required label="Assignee" />>
//             <Select
//               onChange={(value) => handleChange(value)}
//               options={users.map((user) => ({
//                 label: user.label,
//                 value: user.id,
//               }))}
//             />
//           </Form.Item>
//         </Form>
//       </div>
//     </ActionPopup>
//   );
// };

// export default AssignTicketModal;

import React from "react";

type Props = {};

const AssignTicketModal = (props: Props) => {
  return <div>AssignTicketModal</div>;
};

export default AssignTicketModal;

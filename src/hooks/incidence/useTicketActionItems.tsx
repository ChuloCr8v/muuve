import { MenuProps } from "antd";
import { LiaLevelUpAltSolid } from "react-icons/lia";
import { PiUserCheckBold, PiUserSwitch } from "react-icons/pi";
import { useDispatch } from "react-redux";

import { MdUpdate } from "react-icons/md";
import { EditOutlined, WarningOutlined } from "@ant-design/icons";

const useTicketActionItems = (id: string) => {
  const dispatch = useDispatch();

  const ticketActionItems: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <a
          className="flex items-center gap-2"
          // onClick={() => dispatch(openEditTicketDrawer(id))}
        >
          <EditOutlined className="text-xl" />
          Edit
        </a>
      ),
    },
    {
      key: "1",
      label: (
        <a className="flex items-center gap-2">
          <PiUserCheckBold className="text-xl" /> Assign
        </a>
      ),
      //onClick: () =>
      // dispatch(openTicketActionModal({ action: "assign ticket", id: id })),
    },
    {
      key: "2",
      label: (
        <a className="flex items-center gap-2">
          <PiUserSwitch className="text-xl" /> Reassign
        </a>
      ),
      // onClick: () =>
      //  dispatch(openTicketActionModal({ action: "reassign ticket", id: id })),
    },
    {
      key: "3",
      label: (
        <a className="flex items-center gap-2">
          <LiaLevelUpAltSolid className="text-xl" />
          Escalate
        </a>
      ),
      //onClick: () =>
      // dispatch(openTicketActionModal({ action: "escalate ticket", id: id })),
    },
    {
      key: "4",
      label: (
        <a className="flex items-center gap-2">
          <MdUpdate className="text-xl" />
          Update Status
        </a>
      ),
      // onClick: () =>
      //dispatch(
      // openTicketActionModal({ action: "update ticket status", id: id })
      // ),
    },
    {
      key: "5",
      label: (
        <a className="flex items-center gap-2">
          <WarningOutlined className="text-xl" />
          Reopen Ticket
        </a>
      ),
      //   onClick: () =>
      // dispatch(openTicketActionModal({ action: "reopen ticket", id: id })),
    },
  ];
  return { ticketActionItems };
};

export default useTicketActionItems;

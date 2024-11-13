import { Button, Select } from "antd";

import { ticketStatusData } from "../../dummy/ticketStatusData";
import { users } from "../../dummy/users";
import CustomEditor from "../../components/global/CustomEditor";
import UserAvatar from "../../components/global/UserAvatar";
import TextArea from "antd/es/input/TextArea";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";

interface Props {
  setReplyContent: (arg: string) => void;
  replyContent: string;
}

const TicketReplyComponent = (props: Props) => {
  return (
    <div className="border p-4 py-6 rounded-md bg-white space-y-4">
      <div className="flex items-center gap-2">
        <UserAvatar firstName={"Modesta"} lastName={"Ekeh"} />
        <span className="text-sm">Reply to:</span>
        <Select
          dropdownStyle={{ maxWidth: "fit-content", width: "100%" }}
          placeholder={"Select user"}
          options={users.map((user) => ({
            label: user.label,
            value: user.value,
          }))}
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm">Select Status</p>
        <Select
          className="w-full"
          placeholder="Status"
          options={ticketStatusData.map((status) => ({
            label: status.label,
            value: status.value,
          }))}
        />
      </div>

      <div className="flex flex-col items-end gap-2">
        <TextArea
          placeholder="Type here..."
          onChange={(e) => props.setReplyContent(e.target.value)}
        />
        <Button type="primary" className="w-[114px] h-7">
          Reply
        </Button>
      </div>
    </div>
  );
};

export default TicketReplyComponent;

import { Select } from "antd";
import CustomEditor from "../../component/Global/CustomEditor";
import UserAvatar from "../../component/Global/UserAvatar";
import { ticketStatusData } from "../../dummy/ticketStatusData";
import { users } from "../../dummy/users";

interface Props {
  setReplyContent: (arg: string) => void;
  replyContent: string;
}

const TicketReplyComponent = (props: Props) => {
  const mentions = users.map((user) => ({
    text: user.label,
    value: user.label,
  }));

  return (
    <div className="border p-4 py-6 rounded-md bg-white space-y-4">
      <div className="flex items-center gap-2">
        <UserAvatar firstName={"Modesta"} lastName={"Ekeh"} />
        <span className="">Reply to:</span>
        <Select
          dropdownStyle={{ maxWidth: "fit-content", width: "100%" }}
          placeholder={"Select user"}
          options={users.map((user) => ({
            label: user.label,
            value: user.value,
          }))}
        />
      </div>

      <div className="">
        <p className="">Select Status</p>
        <Select
          className="w-full"
          placeholder="Status"
          options={ticketStatusData.map((status) => ({
            label: status.label,
            value: status.value,
          }))}
        />
      </div>

      <div className="">
        <CustomEditor
          mentions={mentions}
          text={props.replyContent}
          setText={props.setReplyContent}
        />
      </div>
    </div>
  );
};

export default TicketReplyComponent;

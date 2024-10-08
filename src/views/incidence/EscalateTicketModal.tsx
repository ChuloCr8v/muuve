import { useDispatch, useSelector } from "react-redux";
import ActionPopup from "../../component/Global/ActionPopup";
import { popupInterface } from "../../types";
import { closeTicketActionModal } from "../../redux/popupSlice";
import { Form, Select } from "antd";
import { users } from "../../dummy/users";
import CustomLabel from "../../component/onboarding/CustomLabel";
import { useState } from "react";
import useGetSingleTicket from "../../hooks/incidence/useGetSingleTicket";
import { LiaLevelUpAltSolid } from "react-icons/lia";
import TextArea from "antd/es/input/TextArea";
import MultiUpload from "../../component/Global/MultipleUpload";

const EscalateTicketModal = () => {
  const [files, setFiles] = useState([]);
  const { ticketActionModalIsOpen } = useSelector(
    (state: popupInterface) => state.popups
  );
  const { isOpen, ticketID, action } = ticketActionModalIsOpen;
  const { ticket } = useGetSingleTicket(ticketID);

  const [assignee, setAssignee] = useState("");

  const dispatch = useDispatch();

  const handleChange = (value: string) => {
    setAssignee(value);
    console.log(assignee);
  };

  const handleAssignTicket = () => {
    dispatch(closeTicketActionModal());
  };

  return (
    <ActionPopup
      onOk={handleAssignTicket}
      open={isOpen && action?.toLowerCase() === "escalate ticket"}
      onCancel={() => dispatch(closeTicketActionModal())}
      title={"Escalate Ticket"}
      sendButtonText={"Escalate"}
      icon={<LiaLevelUpAltSolid className="text-3xl" />}
    >
      <div className="space-y-2">
        <p className="">
          Escalate{" "}
          <span className="font-semibold text-primary">{ticket?.subject}</span>
        </p>
        <Form colon={false} layout="vertical">
          <Form.Item label=<CustomLabel required label="Escalte to" />>
            <Select
              onChange={(value) => handleChange(value)}
              options={users.map((user) => ({
                label: user.label,
                value: user.id,
              }))}
            />
          </Form.Item>

          <Form.Item label=<CustomLabel required label="Comment" />>
            <TextArea />
          </Form.Item>

          <Form.Item
            label=<CustomLabel
              label="Upload one or more files"
              extra="(Max: 10 files, 10mb each)"
            />
          >
            <MultiUpload files={files} setFiles={setFiles} />
          </Form.Item>
        </Form>
      </div>
    </ActionPopup>
  );
};

export default EscalateTicketModal;

import { useDispatch, useSelector } from "react-redux";
import ActionPopup from "../../component/Global/ActionPopup";
import { popupInterface } from "../../types";
import { closeTicketActionModal } from "../../redux/popupSlice";
import { Form, Select } from "antd";
import CustomLabel from "../../component/onboarding/CustomLabel";
import { useState } from "react";
import useGetSingleTicket from "../../hooks/incidence/useGetSingleTicket";
import TextArea from "antd/es/input/TextArea";
import { ticketStatusData } from "../../dummy/ticketStatusData";
import { MdUpdate } from "react-icons/md";

const UpdateTicketStatusModal = () => {
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
      open={isOpen && action?.toLowerCase() === "update ticket status"}
      onCancel={() => dispatch(closeTicketActionModal())}
      title={"Update Status"}
      sendButtonText={"Update"}
      icon={<MdUpdate className="text-4xl" />}
    >
      <div className="space-y-2">
        <p className="">
          {"Update status for"}{" "}
          <span className="font-semibold text-primary">{ticket?.subject}</span>
        </p>
        <Form colon={false} layout="vertical">
          <Form.Item label=<CustomLabel required label="Status" />>
            <Select
              onChange={(value) => handleChange(value)}
              options={ticketStatusData.map((ticket) => ({
                label: ticket.label,
                value: ticket.value,
              }))}
            />
          </Form.Item>
          <Form.Item label=<CustomLabel required label="Comment" />>
            <TextArea />
          </Form.Item>
        </Form>
      </div>
    </ActionPopup>
  );
};

export default UpdateTicketStatusModal;

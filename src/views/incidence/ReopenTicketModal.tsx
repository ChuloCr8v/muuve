import { useDispatch, useSelector } from "react-redux";
import ActionPopup from "../../component/Global/ActionPopup";
import { popupInterface } from "../../types";
import { closeTicketActionModal } from "../../redux/popupSlice";
import { Form } from "antd";
import CustomLabel from "../../component/onboarding/CustomLabel";
import useGetSingleTicket from "../../hooks/incidence/useGetSingleTicket";
import TextArea from "antd/es/input/TextArea";
import { MdUpdate } from "react-icons/md";
import { useState } from "react";
import { WarningOutlined } from "@ant-design/icons";

const ReopenTicketModal = () => {
  const { ticketActionModalIsOpen } = useSelector(
    (state: popupInterface) => state.popups
  );
  const { isOpen, ticketID, action } = ticketActionModalIsOpen;
  const { ticket } = useGetSingleTicket(ticketID);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const handleReopenTicket = () => {
    console.log(comment);
    dispatch(closeTicketActionModal());
  };

  return (
    <ActionPopup
      onOk={handleReopenTicket}
      open={isOpen && action?.toLowerCase() === "reopen ticket"}
      onCancel={() => dispatch(closeTicketActionModal())}
      title={"Reopen Ticket"}
      sendButtonText={"Reopen"}
      icon={<WarningOutlined className="text-3xl" />}
    >
      <div className="space-y-2">
        <p className="">
          Are you sure you want to reopen{" "}
          <span className="">{ticket?.subject}</span> by {ticket?.customer}
        </p>

        <Form colon={false} layout="vertical">
          <Form.Item label=<CustomLabel extra="(Optional)" label="Comment" />>
            <TextArea onChange={(e) => setComment(e.target.value)} />
          </Form.Item>
        </Form>
      </div>
    </ActionPopup>
  );
};

export default ReopenTicketModal;

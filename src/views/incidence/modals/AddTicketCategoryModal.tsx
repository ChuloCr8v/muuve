import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../api/data";
import ActionPopup from "../../../components/global/ActionPopup";
import { closePopup, PopupState } from "../../../redux/popupSlice";
import { Form, Input, message } from "antd";
import { useState } from "react";
import { useCreateTicketCategoryMutation } from "../../../api/ticket.api";
import CustomLabel from "../../../components/onboarding/CustomLabel";
import { TiTicket } from "react-icons/ti";

const AddTicketCategoryModal = () => {
  const [formData, setFormData] = useState("");
  const { currentPopup } = useAppSelector((state) => state.popups);

  const [createTicketCategory, { isLoading }] =
    useCreateTicketCategoryMutation();

  const { isOpen } = currentPopup;

  const dispatch = useDispatch();

  const handleCreateCategory = async () => {
    try {
      await createTicketCategory({ name: formData }).unwrap();
      message.success("Ticket category created successfully.");
      dispatch(closePopup());
    } catch (error) {
      message.error("Unable to create ticket category, please try again.");
      console.log(error);
    }
  };

  return (
    <ActionPopup
      open={isOpen === PopupState.ADD_TICKET_CATEGORY}
      onCancel={() => dispatch(closePopup())}
      title={"Add Ticket Category"}
      sendButtonText={"Add"}
      onOk={handleCreateCategory}
      loading={isLoading}
      actionBtnDisabled={isLoading || formData === ""}
      icon={
        <TiTicket className="text-3xl bg-primary bg-opacity-15 p-2 h-12 w-12 rounded-full" />
      }
    >
      <Form layout="vertical">
        <Form.Item label={<CustomLabel label="Category" required />}>
          <Input
            placeholder="Eg: payment"
            onChange={(e) => setFormData(e.target.value)}
          />
        </Form.Item>
      </Form>
    </ActionPopup>
  );
};

export default AddTicketCategoryModal;

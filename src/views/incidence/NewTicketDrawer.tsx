import { Button, Drawer, Form, Input, message, Select } from "antd";
import { useDispatch } from "react-redux";
import { FileInterface } from "../../types";
import TextArea from "antd/es/input/TextArea";
import TicketSeverityTag from "./TicketSeverityTag";
import { newTicketFormFields, ticketSeverity } from "../../dummy/ticketsData";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import useTicketSeverityColor from "../../hooks/incidence/useTicketSeverityColor";
import { users } from "../../dummy/users";
import MultiUpload from "../../components/global/MultipleUpload";
import CustomLabel from "../../components/onboarding/CustomLabel";
import {
  closeDrawer,
  DrawerState,
  openPopup,
  PopupState,
} from "../../redux/popupSlice";
import { useAppSelector } from "../../api/data";
import {
  useCreateTicketMutation,
  useListTicketCategoriesQuery,
} from "../../api/ticket.api";
import { useGetAuthUserQuery } from "../../api/auth.api";
import { FaPlus } from "react-icons/fa";
import { NewTicketDataType } from "../../api/types";
import { useListCustomersQuery } from "../../api/customer.api";

const NewTicketDrawer = () => {
  const [newTicketFormData, setNewTicketFormData] =
    useState<NewTicketDataType>(newTicketFormFields);

  const [createTicket, { isLoading }] = useCreateTicketMutation();

  const { currentDrawer } = useAppSelector((state) => state.popups);

  const { isOpen, id, isEditingData } = currentDrawer;

  const { data: user } = useGetAuthUserQuery();

  const { data: customers } = useListCustomersQuery();

  const { data: ticketsCategory } = useListTicketCategoriesQuery();

  const dispatch = useDispatch();

  const { ticketSeverityColor } = useTicketSeverityColor();

  // useEffect(() => {
  //   setNewTicketFormData(editTicket ? ticket : newTicketFormData);
  // }, []);

  const handleInputChange = (name: string, value: string | FileInterface[]) => {
    setNewTicketFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { description, customerId, severity, categoryId } = newTicketFormData;

    const formattedTicketData = {
      subject: newTicketFormData.subject,
      description: description,
      customerId: customerId,
      severity: severity,
      categoryId: categoryId,
      assigneeId: user?.id,
    };

    console.log(formattedTicketData);

    try {
      await createTicket(formattedTicketData).unwrap();
      message.success("Ticket created successfully");
      setNewTicketFormData(newTicketFormFields);
      dispatch(closeDrawer());
    } catch (error) {
      console.log(error);
      message.error("Unable to create ticket, please try again.");
    }
  };

  const Footer = () => {
    return (
      <div className="flex items-center justify-end gap-4 py-4">
        <Button
          loading={isLoading}
          className="w-[144px]"
          onClick={() => dispatch(closeDrawer())}
        >
          Cancel
        </Button>
        <Button
          loading={isLoading}
          disabled={isLoading}
          onClick={handleSubmit}
          className="w-[144px]"
          type="primary"
        >
          Submit
        </Button>
      </div>
    );
  };

  const activeSeverity = (label: string, value: string) => {
    if (label.toLowerCase() === value.toLowerCase()) {
      return ticketSeverityColor(value);
    }
  };

  return (
    <Drawer
      onClose={() => {
        dispatch(closeDrawer());
        setNewTicketFormData(newTicketFormFields);
      }}
      width={540}
      //  title={editTicket ? "Edit Ticket" : "New Ticket"}
      title={"New Ticket"}
      footer={<Footer />}
      open={isOpen === DrawerState.NEW_TICKET_DRAWER}
    >
      <Form
        layout="vertical"
        colon={false}
        className="grid grid-cols-2 gap-x-4 gap-y-1"
      >
        <Form.Item
          className={twMerge("col-span-2")}
          label={<CustomLabel label="Subject" required />}
        >
          <Input
            name={"subject"}
            type="text"
            value={newTicketFormData?.subject}
            onChange={(e) => handleInputChange("subject", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          className={twMerge("col-span-2")}
          label={<CustomLabel label="Category" required />}
        >
          <div className="flex items-center gap-2">
            <Select
              value={newTicketFormData.categoryId}
              onChange={(value) => handleInputChange("categoryId", value)}
              options={ticketsCategory?.map((option) => ({
                label: option.name,
                value: option.id,
              }))}
            />
            <Button
              type="primary"
              icon={<FaPlus />}
              iconPosition="end"
              onClick={() =>
                dispatch(openPopup({ isOpen: PopupState.ADD_TICKET_CATEGORY }))
              }
            >
              Add
            </Button>
          </div>
        </Form.Item>

        <Form.Item
          className={twMerge("col-span-2")}
          label={<CustomLabel label="Description" required />}
        >
          <TextArea
            value={newTicketFormData?.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          className={twMerge("col-span-2")}
          label={<CustomLabel label="Customer" required />}
        >
          <Select
            onChange={(value) => handleInputChange("customerId", value)}
            value={newTicketFormData.customerId}
            options={customers?.map((option) => ({
              label: option.customer.name,
              value: option.id,
            }))}
          />
        </Form.Item>

        <div className="col-span-2 grid grid-cols-4 items-center gap-2 !w-full">
          {ticketSeverity.map((item) => (
            <div
              key={item.label}
              onClick={() => handleInputChange("severity", item.value)}
              className={twMerge(
                "border rounded-md py-2 px-3 cursor-pointer",
                activeSeverity(item.value, newTicketFormData.severity)
              )}
            >
              <TicketSeverityTag severity={item.value} />
            </div>
          ))}
        </div>

        <Form.Item
          className="col-span-2 mt-3"
          label={
            <CustomLabel
              label="Attach file"
              extra="(Max: 10 files, 10mb each"
            />
          }
        >
          {/* <MultiUpload
            files={newTicketFormData?.attachments}
            setFiles={(value: FileInterface[]) =>
              handleInputChange("attachments", value)
            }
          /> */}
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default NewTicketDrawer;

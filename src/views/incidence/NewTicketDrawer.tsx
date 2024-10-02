import { Button, Drawer, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { popupInterface } from "../../types";
import CustomLabel from "../../component/onboarding/CustomLabel";
import TextArea from "antd/es/input/TextArea";
import TicketSeverityTag from "./TicketSeverityTag";
import MultiUpload from "../../component/Global/MultipleUpload";
import { newTicketFormFields } from "../../dummy/ticketsData";
import { closeNewTicketDrawer } from "../../redux/popupSlice";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import useTicketSeverityColor from "../../hooks/useTicketSeverityColor";

const NewTicketDrawer = () => {
  const [newTicketFormData, setNewTicketFormData] =
    useState(newTicketFormFields);
  const [files, setFiles] = useState([]);

  const { newTicketDrawerIsOpen } = useSelector(
    (state: popupInterface) => state.popups
  );

  const { ticketSeverityColor } = useTicketSeverityColor();

  useEffect(() => {
    setNewTicketFormData(newTicketFormFields);
  }, []);

  const dispatch = useDispatch();

  const handleInputChange = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    setNewTicketFormData((prev) =>
      prev.map((field) => (field.name === name ? { ...field, value } : field))
    );
  };

  const handleSubmit = () => {
    const formData = newTicketFormData.reduce(
      (acc: { [key: string]: string }, data) => {
        acc[data.name] = data.value;
        return acc;
      },
      {}
    );

    console.log(formData);
  };

  const Footer = () => {
    return (
      <div className="flex items-center justify-end gap-4 py-4">
        <Button
          className="w-[144px]"
          onClick={() => dispatch(closeNewTicketDrawer())}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="w-[144px]" type="primary">
          Submit
        </Button>
      </div>
    );
  };

  const activeSeverity = ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => {
    if (label.toLowerCase() === value.toLowerCase()) {
      return ticketSeverityColor(value);
    }
  };

  return (
    <Drawer
      onClose={() => dispatch(closeNewTicketDrawer())}
      width={540}
      title="New Ticket"
      footer={<Footer />}
      open={newTicketDrawerIsOpen}
    >
      <Form
        layout="vertical"
        colon={false}
        className="grid grid-cols-2 gap-x-4 gap-y-1"
      >
        {newTicketFormData.map((field) => (
          <Form.Item
            key={field.label}
            className={twMerge(
              "col-span-2",
              ["category", "assignee"].includes(field.label.toLowerCase()) &&
                "col-span-1"
            )}
            label={
              <CustomLabel label={field.label} required={field.required} />
            }
          >
            {field.type === "text-input" && (
              <Input
                name={field.name}
                type="text"
                value={field.value}
                onChange={(e) =>
                  handleInputChange({ name: field.name, value: e.target.value })
                }
                className="!h-7"
              />
            )}
            {field.type === "text-area" && (
              <TextArea
                value={field.value}
                onChange={(e) =>
                  handleInputChange({ name: field.name, value: e.target.value })
                }
              />
            )}
            {field.type === "select" && (
              <Select
                className="!h-7"
                onChange={(value) =>
                  handleInputChange({ name: field.name, value })
                }
                options={field.options?.map((option) => ({
                  label: option.label,
                  value: option.value,
                }))}
              />
            )}
            {field.type === "buttons" && (
              <div className="grid grid-cols-4 items-center gap-2">
                {field.options?.map((option) => (
                  <div
                    key={option.value}
                    onClick={() =>
                      handleInputChange({
                        name: field.name,
                        value: option.value,
                      })
                    }
                    className={twMerge(
                      "border rounded-md py-2 px-3 cursor-pointer",
                      activeSeverity({
                        label: option.label,
                        value: field.value,
                      })
                    )}
                  >
                    <TicketSeverityTag severity={option.label} />
                  </div>
                ))}
              </div>
            )}
          </Form.Item>
        ))}
        <Form.Item
          className="col-span-2"
          label={
            <CustomLabel
              label="Attach file"
              extra="(Max: 10 files, 10mb each"
            />
          }
        >
          <MultiUpload files={files} setFiles={setFiles} /> {/* Set files */}
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default NewTicketDrawer;

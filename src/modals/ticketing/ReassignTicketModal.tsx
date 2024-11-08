import { useReassignTicketMutation } from "@/api/ticket.api";
import { Ticket } from "@/api/types";
import { Form, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useListStaffQuery } from "../../api/staff.api";
import { CustomModal } from "../../components/common/CustomModal";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";

interface Props {
  ticket: Ticket;
}

export const ReassignTicketModal = ({ ticket }: Props) => {
  const [form] = Form.useForm();
  const { closeModal } = usePopup();

  const { data: staffUser } = useListStaffQuery();
  const [reassign, { isLoading }] = useReassignTicketMutation();

  const submit = async () => {
    const values = await form.validateFields();
    const data = { ...values, id: ticket.id };
    reassign(data)
      .unwrap()
      .then(() => {
        message.success("Ticket Reassigned");
        closeModal();
      })
      .catch(toastApiError);
  };

  return (
    <CustomModal
      title="Reassign Ticket"
      onSubmit={submit}
      okText="Assign"
      loading={isLoading}
    >
      <div className="w-full">
        <Form form={form} layout="vertical">
          <Form.Item
            label="Assignee"
            required
            name="assigneeId"
            rules={[{ required: true, message: "Assignee is required" }]}
          >
            <Select
              showSearch
              optionFilterProp="label"
              options={staffUser?.map((s) => ({
                label: s.staff.name,
                value: s.id,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Comment"
            name="comment"
            rules={[{ required: true }]}
          >
            <TextArea />
          </Form.Item>
        </Form>
      </div>
    </CustomModal>
  );
};

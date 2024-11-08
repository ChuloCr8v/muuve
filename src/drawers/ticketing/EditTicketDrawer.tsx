import { useListCustomersQuery } from "@/api/customer.api";
import { useListStaffQuery } from "@/api/staff.api";
import {
  useListTicketCategoriesQuery,
  useUpdateTicketMutation,
} from "@/api/ticket.api";
import { Ticket, TicketSeverity } from "@/api/types";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Form, Input, message, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CustomDrawer } from "../../components/common/CustomDrawer";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";

interface Props {
  ticket: Ticket;
}

export const EditTicketDrawer = ({ ticket }: Props) => {
  const [form] = Form.useForm();
  const { closeDrawer } = usePopup();

  const [update, { isLoading }] = useUpdateTicketMutation();

  const { data: customers } = useListCustomersQuery();
  const { data: categories } = useListTicketCategoriesQuery();
  const { data: staff } = useListStaffQuery();

  const submit = async () => {
    const values = await form.validateFields();
    const data = { id: ticket.id, ...values };
    update(data)
      .unwrap()
      .then(() => {
        message.success("Ticket Updated");
        closeDrawer();
      })
      .catch(toastApiError);
  };

  return (
    <CustomDrawer
      title="Edit Ticket"
      onSubmit={submit}
      loading={isLoading}
      okText="Update"
    >
      <Form form={form} layout="vertical" initialValues={ticket}>
        <Form.Item
          name="subject"
          label="Subject"
          required
          rules={[{ required: true }]}
        >
          <Input required />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          required
          rules={[{ required: true }]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          label="Customer"
          required
          name="customerId"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            optionFilterProp="label"
            options={customers?.map((u) => ({
              label: u.customer.name,
              value: u.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Severity"
          name="severity"
          rules={[
            { required: true, message: "Please select a severity level" },
          ]}
        >
          <Radio.Group buttonStyle="outline">
            <Radio.Button value={TicketSeverity.CRITICAL}>
              <ExclamationCircleOutlined style={{ color: "red" }} /> CRITICAL
            </Radio.Button>
            <Radio.Button value={TicketSeverity.HIGH}>
              <ExclamationCircleOutlined style={{ color: "red" }} /> HIGH
            </Radio.Button>
            <Radio.Button value={TicketSeverity.MEDIUM}>
              <ExclamationCircleOutlined style={{ color: "orange" }} /> MEDIUM
            </Radio.Button>
            <Radio.Button value={TicketSeverity.LOW}>
              <ExclamationCircleOutlined style={{ color: "gold" }} /> LOW
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <div className="flex space-x-2">
          <Form.Item
            name="categoryId"
            label="Category"
            className="w-[50%]"
            required
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              optionFilterProp="label"
              options={categories?.map((u) => ({
                label: u.name,
                value: u.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            className="w-1/2"
            label="Assignee"
            name="assigneeId"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              optionFilterProp="label"
              options={staff?.map((s) => ({
                label: s.staff.name,
                value: s.id,
              }))}
            />
          </Form.Item>
        </div>

        <Form.Item label="Upload one or more files" name="attachments">
          <MultiUpload />
        </Form.Item>
      </Form>
    </CustomDrawer>
  );
};

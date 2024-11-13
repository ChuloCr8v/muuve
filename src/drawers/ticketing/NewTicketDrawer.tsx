import { useListCustomersQuery } from "@/api/customer.api";
import { useListStaffQuery } from "@/api/staff.api";
import {
  useCreateTicketMutation,
  useListTicketCategoriesQuery,
} from "@/api/ticket.api";
import { TicketSeverity } from "@/api/types";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Form, Input, message, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CustomDrawer } from "../../components/common/CustomDrawer";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";

export const NewTicketDrawer = () => {
  const [form] = Form.useForm();
  const { closeDrawer } = usePopup();

  const [createTicket, { isLoading }] = useCreateTicketMutation();

  const { data: customers } = useListCustomersQuery();
  const { data: categories } = useListTicketCategoriesQuery();
  const { data: staff } = useListStaffQuery();

  const submit = async () => {
    const values = await form.validateFields();
    createTicket(values)
      .unwrap()
      .then(() => {
        message.success("Ticket Opened");
        closeDrawer();
      })
      .catch(toastApiError);
  };

  return (
    <CustomDrawer title="New Ticket" onSubmit={submit} loading={isLoading}>
      <Form form={form} layout="vertical" className="">
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

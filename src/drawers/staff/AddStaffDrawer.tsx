import { Form, Input, message, Select } from "antd";
import { useAddStaffMutation } from "../../api/staff.api";
import { CustomDrawer } from "../../components/common/CustomDrawer";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";

export const AddStaffDrawer = () => {
  const [form] = Form.useForm();
  const [addStaff, { isLoading }] = useAddStaffMutation();

  const { closeDrawer } = usePopup();

  const submit = async () => {
    const values = await form.validateFields();
    addStaff(values)
      .unwrap()
      .then(() => {
        message.success("Staff Created");
        closeDrawer();
      })
      .catch(toastApiError);
  };

  return (
    <CustomDrawer
      title="Add Staff"
      closable={false}
      onSubmit={submit}
      loading={isLoading}
    >
      <div className="w-full">
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            required
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Work Email"
            required
            name="email"
            validateFirst
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Invalid Email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Role">
            <Select
              options={[
                { value: "User", label: "User" },
                { value: "Admin", label: "Admin" },
              ]}
            />
          </Form.Item>
        </Form>
      </div>
    </CustomDrawer>
  );
};

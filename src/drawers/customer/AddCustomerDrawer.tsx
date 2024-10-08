import { Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useAddCustomerMutation } from "../../api/customer.api";
import { CustomDrawer } from "../../components/common/CustomDrawer";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";

export const AddCustomerDrawer = () => {
  const [form] = Form.useForm();
  const [addCustomer, { isLoading }] = useAddCustomerMutation();

  const { closeDrawer } = usePopup();

  const submit = async () => {
    const values = await form.validateFields();
    addCustomer(values)
      .unwrap()
      .then(() => {
        message.success("Customer Created");
        closeDrawer();
      })
      .catch(toastApiError);
  };

  return (
    <CustomDrawer
      title="Add Customer"
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
            label="Email"
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
          <Form.Item
            label="Phone Number"
            required
            name="phone"
            validateFirst
            rules={[
              { required: true, message: "Phone number is required" },
              {
                pattern: /^\+?[1-9]\d{1,14}$/,
                message: "Enter a valid phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            required
            name="address"
            rules={[{ required: true, message: "Address is required" }]}
          >
            <TextArea />
          </Form.Item>
        </Form>
      </div>
    </CustomDrawer>
  );
};

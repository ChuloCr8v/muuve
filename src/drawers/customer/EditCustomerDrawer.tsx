import { Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useUpdateCustomerMutation } from "../../api/customer.api";
import { CustomDrawer } from "../../components/common/CustomDrawer";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";
import { User } from "@/api/types";

interface Props {
  user: User;
}

export const EditCustomerDrawer = ({ user }: Props) => {
  const [form] = Form.useForm();
  const [update, { isLoading }] = useUpdateCustomerMutation();

  const { closeDrawer } = usePopup();

  const submit = async () => {
    const values = await form.validateFields();
    update(values)
      .unwrap()
      .then(() => {
        message.success("Customer Edited");
        closeDrawer();
      })
      .catch(toastApiError);
  };

  return (
    <CustomDrawer
      title="Edit Customer Details"
      onSubmit={submit}
      loading={isLoading}
    >
      <div className="w-full">
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            name: user.customer.name,
            email: user.email,
            phone: user.customer.phone,
            address: user.customer.address,
          }}
        >
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
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input readOnly />
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

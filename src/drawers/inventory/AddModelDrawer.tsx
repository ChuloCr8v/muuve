import { Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useAddModelMutation } from "../../api/model.api";
import { CustomDrawer } from "../../components/common/CustomDrawer";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";

export const AddModelDrawer = () => {
  const [form] = Form.useForm();
  const [addModel, { isLoading }] = useAddModelMutation();

  const { closeDrawer } = usePopup();

  const submit = async () => {
    const values = await form.validateFields();
    addModel(values)
      .unwrap()
      .then(() => {
        message.success("Model Created");
        closeDrawer();
      })
      .catch(toastApiError);
  };

  return (
    <CustomDrawer title="New Model" onSubmit={submit} loading={isLoading}>
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="manufacturer"
          label="Manufacturer"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>
        <div className="grid grid-cols-2 gap-[16px]">
          <Form.Item
            name="number"
            label="Model Number"
            rules={[{ required: true }]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="vendor" label="Vendor">
            <Input />
          </Form.Item>
        </div>
        <Form.Item name="description" label="Description">
          <TextArea rows={3} />
        </Form.Item>
      </Form>
    </CustomDrawer>
  );
};

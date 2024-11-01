import { Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useUpdateModelMutation } from "../../api/model.api";
import { CustomDrawer } from "../../components/common/CustomDrawer";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";
import { Model } from "../../api/types";

interface Props {
  model: Model;
}

export const EditModelDrawer = ({ model }: Props) => {
  const [form] = Form.useForm();
  const [update, { isLoading }] = useUpdateModelMutation();

  const { closeDrawer } = usePopup();

  const submit = async () => {
    const values = await form.validateFields();
    update({ id: model.id, ...values })
      .unwrap()
      .then(() => {
        message.success("Model Updated");
        closeDrawer();
      })
      .catch(toastApiError);
  };

  return (
    <CustomDrawer
      title="Edit Model"
      onSubmit={submit}
      loading={isLoading}
      okText="Update"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: model.name,
          manufacturer: model.manufacturer,
          category: model.category,
          number: model.number,
          vendor: model.vendor,
          description: model.description,
        }}
      >
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

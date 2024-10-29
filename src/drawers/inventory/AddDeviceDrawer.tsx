import { DatePicker, Form, Input, InputNumber, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useAddDeviceMutation } from "../../api/devices.api";
import { useListModelQuery } from "../../api/model.api";
import { CustomDrawer } from "../../components/common/CustomDrawer";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";

export const AddDeviceDrawer = () => {
  const [form] = Form.useForm();
  const { closeDrawer } = usePopup();

  const [addDevice, { isLoading }] = useAddDeviceMutation();

  const { data: models } = useListModelQuery();

  const submit = async () => {
    const values = await form.validateFields();
    addDevice(values)
      .unwrap()
      .then(() => {
        message.success("Device Created");
        closeDrawer();
      })
      .catch(toastApiError);
  };

  return (
    <CustomDrawer title="New Device" onSubmit={submit} loading={isLoading}>
      <Form form={form} layout="vertical" className="">
        <main className="">
          <Form.Item
            name="name"
            label="Device Name"
            required
            rules={[
              {
                required: true,
                message: "Input device name",
              },
            ]}
          >
            <Input required />
          </Form.Item>
          <Form.Item
            name="serialNumber"
            label="Serial Number"
            required
            rules={[
              {
                required: true,
                message: "Input serial number",
              },
            ]}
          >
            <Input required />
          </Form.Item>

          <div className="flex space-x-[16px] w-full">
            <Form.Item
              name="manufacturer"
              label="Manufacturer"
              className="w-[50%]"
              required
              rules={[
                {
                  required: true,
                  message: "Input manufacturer",
                },
              ]}
            >
              <Input required />
            </Form.Item>

            <Form.Item
              label="Model"
              required
              name="modelId"
              className="w-[50%]"
              rules={[
                {
                  required: true,
                  message: "Select model",
                },
              ]}
            >
              <Select
                className="w-[100%]"
                options={models?.map((m) => ({
                  value: m.id,
                  label: m.name,
                }))}
              />
            </Form.Item>
          </div>
          <div className="flex space-x-[16px] w-full">
            <Form.Item
              name="location"
              label="Location"
              required
              rules={[
                {
                  required: true,
                  message: "Input location",
                },
              ]}
            >
              <Input required />
            </Form.Item>

            <Form.Item
              label="Vendor"
              required
              name="vendor"
              className="w-[50%]"
              rules={[
                {
                  required: true,
                  message: "Select model",
                },
              ]}
            >
              <Input required />
            </Form.Item>
          </div>
          <div className="flex space-x-[16px] w-full">
            <Form.Item
              name="partNumber"
              label="Part Number"
              className="w-[50%]"
              required
              rules={[
                {
                  required: true,
                  message: "Input part number",
                },
              ]}
            >
              <Input required />
            </Form.Item>

            <Form.Item
              name="cost"
              label="Cost"
              className="w-[50%]"
              required
              rules={[
                {
                  required: true,
                  message: "Input cost",
                },
              ]}
            >
              <InputNumber className="w-[100%]" required />
            </Form.Item>
          </div>
          <Form.Item
            name="dateProcured"
            label="Date Procured"
            required
            rules={[
              {
                required: true,
                message: "Input cost",
              },
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            required
            rules={[
              {
                required: true,
                message: "Description",
              },
            ]}
          >
            <TextArea required />
          </Form.Item>

          <Form.Item
            label="Upload Device Image"
            name="attachments"
            required
            rules={[
              {
                required: true,
                message: "Upload",
              },
            ]}
          >
            <MultiUpload />
          </Form.Item>
        </main>
      </Form>
    </CustomDrawer>
  );
};

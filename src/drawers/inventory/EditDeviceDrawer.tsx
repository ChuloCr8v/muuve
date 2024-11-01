import { DatePicker, Form, Input, InputNumber, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useUpdateDeviceMutation } from "../../api/devices.api";
import { useListModelQuery } from "../../api/model.api";
import { Device } from "../../api/types";
import { CustomDrawer } from "../../components/common/CustomDrawer";
import MultiUpload from "../../components/global/MultiUpload";
import { usePopup } from "../../context/PopupContext";
import { toastApiError } from "../../utils/error.util";

interface Props {
  device: Device;
}

export const EditDeviceDrawer = ({ device }: Props) => {
  const [form] = Form.useForm();
  const { closeDrawer } = usePopup();

  const [addDevice, { isLoading }] = useUpdateDeviceMutation();
  const { data: models } = useListModelQuery();

  const submit = async () => {
    const values = await form.validateFields();
    addDevice({ id: device.id, ...values })
      .unwrap()
      .then(() => {
        message.success("Device Updated");
        closeDrawer();
      })
      .catch(toastApiError);
  };

  return (
    <CustomDrawer
      title="Update Device"
      onSubmit={submit}
      loading={isLoading}
      okText="Update"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: device.name,
          serialNumber: device.serialNumber,
          manufacturer: device.manufacturer,
          modelId: device.modelId,
          location: device.location,
          vendor: device.vendor,
          partNumber: device.partNumber,
          cost: device.cost,
          dateProcured: dayjs(device.dateProcured),
          description: device.description,
        }}
      >
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
          <Form.Item label="Upload Device Image" name="attachments">
            <MultiUpload />
          </Form.Item>
        </main>
      </Form>
    </CustomDrawer>
  );
};

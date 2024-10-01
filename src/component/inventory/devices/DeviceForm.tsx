import { Button, Drawer, Form, Input, InputNumber, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import MultiUpload from "../../Global/MultipleUpload";

interface Prop {
  open: any;
  setnewDevice: any;
}

export default function DeviceForm(props: Prop) {
  const { open, setnewDevice } = props;
  return (
    <Drawer
      closeIcon={null}
      footer={
        <footer className="flex items-center justify-end w-full gap-3 py-3 bg-white  shadow-lg shrink-0">
          <Button
            size="middle"
            htmlType="button"
            // onClick={() => setNewStaff(false)}
          >
            Cancel
          </Button>

          <Button
            size="middle"
            type="primary"
            htmlType="submit"
            style={{ minWidth: "6em" }}
          >
            Submit
          </Button>
        </footer>
      }
      width={400}
      title="New Device"
      open={open}
      onClose={() => setnewDevice(false)}
    >
      <Form layout="vertical" className="flex flex-col h-full overflow-hidden">
        <main className="flex flex-col overflow-y-auto grow shrink">
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
              <Select className="w-[100%]" />
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
            name="upload"
            label="Upload Device Image"
            required
            rules={[
              {
                required: true,
                message: "Input location",
              },
            ]}
          >
            <MultiUpload files={[]} setFiles={undefined} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            required
            rules={[
              {
                required: true,
                message: "Decription",
              },
            ]}
          >
            <TextArea required />
          </Form.Item>
        </main>
      </Form>
    </Drawer>
  );
}

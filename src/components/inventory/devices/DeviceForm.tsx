import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import MultiUpload from "../../global/MultipleUpload";
import { useEffect } from "react";
import { useListModelQuery } from "../../../api/model";
import { toastApiError } from "../../../utils/error.util";
import { useAddDeviceMutation, useUpdateDeviceMutation } from "../../../api/devices";
import dayjs from "dayjs";

interface Prop {
  open: any;
  setnewDevice: any;
  selectedRow: any;
}

export default function DeviceForm(props: Prop) {
  const { open, setnewDevice, selectedRow } = props;
  const [addDevice, {isLoading}] = useAddDeviceMutation()
  const [updateDevice, {isLoading: load}] = useUpdateDeviceMutation()
  const {data: modelList} = useListModelQuery()

  console.log(selectedRow?.dateProcured)

  const [form] = Form.useForm();
             
  useEffect(() => {
    if (selectedRow) {
      form.setFieldsValue({
        name: selectedRow.name,
        id: selectedRow.id,
        modelId: selectedRow.model.id,
        serialNumber: selectedRow.serialNumber,
        manufacturer: selectedRow.manufacturer,
        cost: selectedRow.cost,
        vendor: selectedRow.vendor,
        location: selectedRow.location,
        partNumber: selectedRow.partNumber,
        dateProcured: dayjs(selectedRow.dateProcured),
        description: selectedRow.description,
      });
    } else {
      form.resetFields();
    }
  }, [selectedRow, form]);

  const Submit = async () => {
    const values = await form.validateFields();
    if (values.dateProcured) {
      values.dateProcured = values.dateProcured.toISOString();
    }
    addDevice(values)
    .unwrap()
    .then(() => {
        message.success("Device Created");
        setnewDevice(false)
    })
    .catch(toastApiError)
  }

  const EditDevice = async () => {
      const values = await form.validateFields();
      if (values.dateProcured) {
        values.dateProcured = values.dateProcured.toDate();
      }
      // const { id, ...updatedValues } = values;

      const data =   {...values, id: selectedRow.id }
  
      updateDevice(data).unwrap()
      .then(() => {
        message.success("Device Updated Successfully");
        setnewDevice(false);
      })
      .catch(toastApiError)
    
  };
  
  

  return (
    <Drawer
      closeIcon={null}
      footer={
        <footer className="flex items-center justify-end w-full gap-3 py-3 bg-white  shadow-lg shrink-0">
          <Button
            size="middle"
            htmlType="button"
          >
            Cancel
          </Button>

          <Button
            size="middle"
            type="primary"
            htmlType="submit"
            loading={selectedRow ? load : isLoading}
            onClick={selectedRow ? EditDevice  : Submit}
            style={{ minWidth: "6em" }}
          >
            {selectedRow ? "Edit Device" : "New Device"}
          </Button>
        </footer>
      }
      width={450}
      title={selectedRow ? 'Edit Device' : 'New Device'}
      open={open}
      onClose={() => setnewDevice(false)}
    >
      <Form
        form={form}
        layout="vertical"
        className=""
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
              <Select className="w-[100%]" options={modelList?.map((t) => ({
                  value: t.id,
                  label:t.name,
              }))}/>
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
              <DatePicker className="w-full"/>
            </Form.Item>
          

          <Form.Item
            name="upload"
            label="Upload Device Image"
            // required
            // rules={[
            //   {
            //     required: true,
            //     message: "Uploa device image",
            //   },
            // ]}
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



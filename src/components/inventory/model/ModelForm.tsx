import { Button, Drawer, Form, Input, InputNumber, message } from "antd";
import { useEffect } from "react";
import { useAddModelMutation, useUpdateModelMutation } from "../../../api/model";
import { toastApiError } from "../../../utils/error.util";
import Vendor from "../../../views/Admin/Vendor";
import { Loading } from "../../common/Loading";

const { TextArea } = Input;

interface Prop {
  open: any;
  setNewModel: any;
  selectedRow: any;
}

export default function ModelForm(props: Prop) {
  const { open, setNewModel, selectedRow } = props;
  const [addModel, { isLoading }] = useAddModelMutation();
  const [updateModel, {isLoading: Load}] = useUpdateModelMutation()

  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedRow) {
      form.setFieldsValue({
        name: selectedRow.name,
        id: selectedRow.id,
        category: selectedRow.category,
        number: selectedRow.number,
        manufacturer: selectedRow.manufacturer,
        description: selectedRow.description,
        vendor: selectedRow.vendor
      });
    } else {
      form.resetFields();
    }
  }, [selectedRow, form]);

  const Submit = async () => {
    try {
      const values = await form.validateFields();
      await addModel(values).unwrap();
      message.success("Model Created");
      setNewModel(false);
    } catch (error) {
      toastApiError(error);
    }
  };

  const EditModel = async () => {
    const values = await form.validateFields();
    const data =   {...values, id: selectedRow.id }

    updateModel(data).unwrap()
    .then(() => {
      message.success("Device Updated Successfully");
      setNewModel(false);
    })
    .catch(toastApiError)
  
};

  return (
    <Drawer
      closeIcon={null}
      footer={
        <footer className="flex items-center justify-end w-full gap-3 py-3 bg-white shadow-lg shrink-0">
          <Button size="middle" htmlType="button" onClick={() => setNewModel(false)}>
            Cancel
          </Button>

          <Button loading={isLoading} size="middle" type="primary" htmlType="submit" onClick={Submit} style={{ minWidth: "6em" }}>
            {selectedRow ? "Edit Model" : "Submit"}
          </Button>
        </footer>
      }
      width={500}
      title="New Model"
      open={open}
      onClose={() => setNewModel(false)}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Model Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="manufacturer" label="Manufacturer" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
       

        <Form.Item name="category" label="Category" rules={[{ required: true}]}>
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <div className="grid grid-cols-2 gap-[16px]">
        <Form.Item name="number" label="Model Number" rules={[{ required: true}]}>
          <Input style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="vendor" label="Vendor" >
          <Input  />
        </Form.Item>

        </div>
    
        
        <Form.Item name="description" label="Description">
          <TextArea rows={3} />
        </Form.Item>
      </Form>
    </Drawer>
  );
}

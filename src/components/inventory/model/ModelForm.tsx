import { Button, Drawer, Form, Input } from "antd";
import { useEffect } from "react";

const {TextArea} =Input

interface Prop {
    open: any;
    setNewModel: any
    selectedRow: any
}

export default function ModelForm(props: Prop) {
    const {open, setNewModel, selectedRow} = props
    
  const [form] = Form.useForm();

    useEffect(() => {
        if (selectedRow) {
          form.setFieldsValue({
            name: selectedRow.name,
            id: selectedRow.id,
            category: selectedRow.category,
            manufacturer: selectedRow.manufacturer,
            description: selectedRow.comment
          });
        } else {
          form.resetFields(); 
        }
      }, [selectedRow, form]);
    return (
        <Drawer
        closeIcon={null}
        footer={<footer className="flex items-center justify-end w-full gap-3 py-3 bg-white  shadow-lg shrink-0">
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
              style={{ minWidth: '6em' }}
            >
             {selectedRow ? "Edit Device" : "New Device"}
            </Button>
          </footer>}
         width={400} title="New Model" open={open} onClose={() => setNewModel(false)} >
            <Form form={form} layout="vertical">
                <Form.Item name="name" label="Model Name" required>
                    <Input />
                </Form.Item>
                <Form.Item name="id" label="Model Number" required>
                    <Input />
                </Form.Item>
                <Form.Item name="category" label="Category" required>
                    <Input />
                </Form.Item>
                <Form.Item name="manufacturer" label="Manufacturer" required>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <TextArea rows={3} maxLength={6}/>
                </Form.Item>
            </Form>


        </Drawer>
    )
}
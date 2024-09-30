import { Button, Drawer, Form, Input } from "antd";

const {TextArea} =Input

interface Prop {
    open: any;
    setNewModel: any
}

export default function ModelForm(props: Prop) {
    const {open, setNewModel} = props
    return (
        <Drawer
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
              Submit
            </Button>
          </footer>}
         width={400} title="New Model" open={open} onClose={() => setNewModel(false)} closeIcon={null}>
            <Form layout="vertical">
                <Form.Item label="Model Name" required>
                    <Input />
                </Form.Item>
                <Form.Item label="Model Nunber" required>
                    <Input />
                </Form.Item>
                <Form.Item label="Category" required>
                    <Input />
                </Form.Item>
                <Form.Item label="Manufacturer" required>
                    <Input />
                </Form.Item>
                <Form.Item label="Description">
                    <TextArea rows={3} maxLength={6}/>
                </Form.Item>
            </Form>


        </Drawer>
    )
}
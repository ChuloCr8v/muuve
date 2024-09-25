import { Drawer, Form, Input } from "antd";

const {TextArea} =Input

export default function ModelForm(props: {open: boolean, close: any}) {
    return (
        <Drawer width={400} title="New Model" open={props.open} onClose={() => close(false)}>
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
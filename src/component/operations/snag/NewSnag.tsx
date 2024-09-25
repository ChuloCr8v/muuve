import { Button, Drawer, Form, Input, Select } from "antd";
import MultiUpload from "../../Global/MultipleUpload";
import { CustomerLabel } from "../../Global/Extras";

export default function NewSnag (props: {open: boolean, action: any}) {
    return(
        <Drawer 
        footer={
            <div className="space-x-4 justify-end flex">
                <Button>Cancel</Button>
                <Button type="primary">Submit</Button>
            </div>
        }
        closeIcon={null} 
        title="Report Snag" 
        open={props.open} 
        onClose={() => props.action(false)}
        >
             <Form layout="vertical">
           <Form.Item label="Customer Name" required>
                <Input />
           </Form.Item>
           <Form.Item label="Service" required>
                <Input />
           </Form.Item>
           <Form.Item label="Service Description" required>
                <Input />
           </Form.Item>
           <Form.Item label={<CustomerLabel main={"Comment "} subText={"(Suggest Remedial Action)"} />} required>
                <Input />
           </Form.Item>
           <Form.Item label={<CustomerLabel main={"Upload one or more files "} subText={"(Max: 10 files, 10mb each)"} />}>
                <MultiUpload files={[]} setFiles={undefined}/>
           </Form.Item>

            </Form>
        </Drawer>
    )
}
import { Form, Select } from "antd";
import MultiUpload from "../../Global/MultipleUpload";
import { CustomLabel } from "../../Global/Extras";

export default function ScheduleForm() {
   
    return(
        <Form layout="vertical">
           <Form.Item label={<CustomLabel main={"Upload one or more files "} subText={"(Max: 10 files, 10mb each)"} />}>
            <MultiUpload files={[]} setFiles={undefined}/>
           </Form.Item>
           <Form.Item label="Customer" required>
                <Select />
           </Form.Item>

        </Form>
    )
}
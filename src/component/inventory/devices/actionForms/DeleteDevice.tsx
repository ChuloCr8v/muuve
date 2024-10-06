import { Form, Input,} from "antd";
import { useState } from "react";
import { CustomerLabel } from "../../../Global/Extras";
import MultiUpload from "../../../Global/MultipleUpload";

interface Prop {
    selectedRow: any
}

const { TextArea } = Input

export default function DeleteDevice ( props: Prop) {
    const {selectedRow} = props

    return(
        <Form layout="vertical" className="space-y-[12px]">
            <span>Are you sure you want to delete <span className="font-semibold">{selectedRow?.name}</span> ?</span>


            <Form.Item label="Reason" required>
            <TextArea rows={3}  />
            </Form.Item>
            
        </Form>
    )
}
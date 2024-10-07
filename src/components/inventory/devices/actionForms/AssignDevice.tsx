import { Form, Input, Radio, RadioChangeEvent, Select } from "antd";
import { useState } from "react";

interface Prop {
    selectedRow: any
}

const { TextArea } = Input

export default function AssignDevice ( props: Prop) {
    const {selectedRow} = props
    console.log(selectedRow)
    const [value, setValue] = useState(1);

    console.log(value)

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const options = [
    { label: 'Job', value: 'Apple' },
    { label: 'User', value: 'Pear' },
  ]

    return(
        <Form layout="vertical" className="space-y-[12px]">
            <Form.Item label={<span>Assign <span className="font-semibold">{selectedRow?.name}</span>  to </span>}>
            <Radio.Group options={options} onChange={onChange} value={value}/>
               
            </Form.Item>

            <Form.Item label={value === 1 ? "Select Job" : "User" }>
                <Select/>
            </Form.Item>

            <Form.Item label="Comment">
                <TextArea rows={3}  />
            </Form.Item>
            
        </Form>
    )
}
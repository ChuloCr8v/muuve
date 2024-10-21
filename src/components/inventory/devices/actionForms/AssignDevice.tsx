import { Button, Form, Input, Radio, RadioChangeEvent, Select, Table } from "antd";
import { useState } from "react";
import { useAssignDeviceMutation } from "../../../../api/devices";
import { useListStaffQuery } from "../../../../api/staff.api";
import Staff from "../../../../views/Admin/Staff";

interface Prop {
    selectedRow: [],
    form: {}
}

const { TextArea } = Input

export default async function AssignDevice ( props: Prop) {
  const {selectedRow, form} = props
  const {data: Staffs, isLoading: isStaffLoading, error} = useListStaffQuery();
  const listStaff = Staffs

  if (isStaffLoading) return <div>Loading staff data...</div>;
  if (error) return <div>Error loading staff data</div>;

    console.log(selectedRow)
    const [value, setValue] = useState('User');

    console.log(value)

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const Jobs:any = []

  const options = [
    { label: 'User', value: 'User' },
    { label: 'Job', value: 'Job' },
  ]

  const device = [
      {
        title: 'Serial No',
        dataIndex: 'serialNumber'
      },
      {
        title: 'Name',
        width: 200,
        dataIndex: 'name'
      },
      {
        title: 'Part No',
        dataIndex: 'partNumber'
      },
      // {
      //   title: '',
      //   render: (record: any) => <Button danger className="bg-red-600 text-white hover:bg-red-500">Remove</Button>
      // },

  ]



    return(
        <Form form={form} layout="vertical" className="space-y-[12px]">
            <Form.Item label={<span className="pb-2">You are about to assign device to a user!</span>}>
            <Table size='small' 
            pagination={false} className="border-[1.5px] rounded-md" headerBg='#F8F8F8' 
            headerColor='#262626' columns={device} dataSource={Array?.isArray(selectedRow) ? selectedRow : [selectedRow]} />
            </Form.Item>
            
            <div className="grid grid-cols-1 gap-x-[8px]">
            {/* <Form.Item label="Select ">
            <Radio.Group className="w-[200px]"  buttonStyle="solid" optionType="button" options={options} defaultValue={1} onChange={onChange} value={value}/>
               
            </Form.Item> */}

            <Form.Item name="assigneeId" required label={value === 'Job' ? "Select Job" : " Select User" }>
                <Select
                options={value == 'User' ? (listStaff?.map((d) => ({label: d.staff.name, value: d.staff.name}))) :
                (Jobs?.map((d: String) => (<div></div>)))
              }
                />
            </Form.Item>

            </div>
            

            <Form.Item label="Comment">
                <TextArea rows={3}  />
            </Form.Item>
            
        </Form>
    )
}
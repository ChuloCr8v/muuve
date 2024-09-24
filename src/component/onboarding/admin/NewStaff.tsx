import { Button, Drawer, Form, Input, Select } from "antd";

interface Prop{
    newStaff: any
    setNewStaff: any
}

export default function NewStaff (props: Prop) {
    const newStaff = props.newStaff
    const drawerState = props.setNewStaff

   
    return (
        <Drawer width={450} closeIcon={null} title='New Staff' open={newStaff} onClose={() => drawerState(false)}
        footer={
            <div className='justify-end flex space-x-3 items-center'>
            <Button>Cancel</Button>
            <Button type='primary' className='px-8'>Submit</Button>
        </div>
        }
        >
             <div className="w-full">
       <Form layout='vertical'>
            <Form.Item label='Staff Name'>
                <Input/>
            </Form.Item>
            <Form.Item label='Email Address'>
                <Input/>
            </Form.Item>
            <Form.Item label='Role'>
               <Select
               options={[
                {value: 'User', label: 'User'},
                {value: 'Admin', label: 'Admin'},
               ]}
               />
            </Form.Item>
       </Form>
      </div>
        </Drawer>
     
    );
  };    
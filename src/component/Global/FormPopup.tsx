import { Button, Checkbox, Drawer, Form, Modal, Table } from "antd";
import DynamicForm from "./DynamicForm";
import { useState } from "react";
import Dots from '../../../public/4dots.png'
import { Survey } from "../data/FormItem";


type Props = {
    title: string, 
    open: boolean, 
    close: () => void, 
    submitText: string 
}

export default function FormPopup(props: Props) {
    const column =[
        {
            title: <Checkbox/>,
            width: 50,
            render: (_: any, record: string, index: number) => 
                <Checkbox checked={checkedItems[index]} onChange={() =>handleCheckboxChange(index)} />
        },
        {
            title: 'Item',
            dataIndex: 'label',
            render: (text: string, index: string) => <div className="flex space-x-4 items-center">
                <img src={Dots} alt="" />
                <span key={index}>{text}</span>
                </div>
        }
    ]
    const survey = Survey
    const [checkedItems, setCheckedItems] =useState(survey.map(() => true))
    const [reset, setReset] = useState(false)

    const handleCheckboxChange = (index: number) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
      };

      const filteredList = survey.filter((_, index)=> checkedItems[index])
    
    return (
        <div>
             <Drawer 
        width={500}
        footer={
            <div className='justify-end flex space-x-3 items-center'>
            <Button>Cancel</Button>
            <Button type='primary' className='px-8'>{props.submitText}</Button>
        </div>}
        title={
            <div className="between-align">
                <p className="formPopuptitle">{props.title}</p>
                <Button onClick={() => setReset(true)} type="default" className="text-[#595959]">Customize Form</Button>
            </div>
        }
        open={props.open} onClose={props.close}
        >
           <DynamicForm survey={filteredList}/>
            
        </Drawer>
        <Modal title='Reset Form Fields' closeIcon={null} open={reset} onCancel={() => setReset(false)} okText='Reset' onOk={() => setReset(false)}>
        <div className="max-w-[calc(100vw-2rem)] bg-white rounded-lg mt-5 border-t-[1.5px] border-[#E9EAEB]  shadow-sm shadow-[#E9EAEB] space-y-[24px]">
            <Table dataSource={survey} columns={column} size='small'/>
        </div>
        </Modal>
        </div>
    )
}
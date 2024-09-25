import { Button, Checkbox, Dropdown, MenuProps, Tag } from "antd";
import TableComponent from "../../Global/TableComponent";
import { ExclamationCircleOutlined, CloseCircleOutlined, CheckCircleOutlined, DownOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { twMerge } from "tailwind-merge";
import ModelData from '../data/ModelData'
import { useState } from "react";

export default function ModelTable () {
    const [selectedRowData, setSelectedRowData] = useState(null);

    const items: MenuProps['items'] =[
        {
            key: '1',
            label: 'View Details',
            icon: <EditOutlined />
  
        },
        {
          key: '2',
          label: 'Edit Model',
          icon: <EyeOutlined/>
    
      },
  
      ]

    const column =[
        {
            title: <Checkbox/>,
            render: () => <Checkbox/>

        },
        {
            title: 'Model Number',
            dataIndex: 'id',
        },
        {
            title: 'Model',
            dataIndex: 'name',
            width: 250
        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
        {
            title: 'Manufacturer',
            dataIndex: 'manufacturer',
        },
        {
            title: 'Number Available',
            dataIndex: 'available',
        },
        {
            title: 'Number Faulty',
            dataIndex: 'faulty',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text: string) =><Tag
            icon={text === 'LOW-ON-STOCK' ? <ExclamationCircleOutlined/> : text === 'OUT-OF-STOCK' ? <CloseCircleOutlined/> : <CheckCircleOutlined />}
             className={twMerge('rounded-2xl tagSize font-semibold items-center', 
             text === 'IN-STOCK' ? 'bg-[#E3FFE6] text-[#379D51] border-[#379D51]' : text === 'OUT-OF-STOCK' ? 'bg-[#FFE1E1] text-[#F05050] border-[#F05050]' : 'bg-[#FDF7DD] text-[#B9A325] border-[#B9A325]' )}> 
            {text}
           </Tag>
        },
        {
            title: '',
            render: () => <Dropdown menu={{items}}>
                <Button className="tableAction">
                <span>Action</span>
                <DownOutlined/>
            </Button>
            </Dropdown>
        },
    ]
    return(
        <TableComponent columns={column} dataSource={ModelData}/>
    )
}
import { Button, Drawer, Tag } from "antd";
import Heading from "../../Global/Header";
import { useLocation } from "react-router-dom";
import TableComponent from "../../Global/TableComponent";
import { twMerge } from "tailwind-merge";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import TableRowData from "../../Global/TableRowData";
import { useState } from "react";
import IssueDrawer from "./IssuesDrawer";

export default function ReportDetails () {
   const location = useLocation()
   const data = location.state.rowData || {}
   const [selectedIssue, setSelectedIssue] = useState(null)
   const [openIssue, setOpenIssue] = useState(false)

   const details = data?.detail || {}
   console.log(details)


   const handleOpenIssue = (record: any) => {
        setOpenIssue(true)
        setSelectedIssue(record)
   }

   const column = [
    {
        title: '#',
        dataIndex: 'index',
        key: 'index',
        render: (text: string, record: any, index: number) => index + 1,
      },
        {
            title: 'Name',
            dataIndex: ["name", "descriptions"],
            render: (_: any,record: any) => <TableRowData mainText={record?.name} tagText={record.descriptions}/>
        },
        {
            title: 'Availability',
            dataIndex: 'availability',
        },
        {
            title: 'Report Issues',
            dataIndex: ["issue", "action"],
            render: (_: any,record: any) => <p>{record.issue} <span className="cursor-pointer text-[13px] text-[#0A95CC] font-semibold">{record.action}</span></p>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text: string) => <Tag
            className={twMerge(text === 'ACCEPTED' ? 'text-[#379D51] border-[#379D51] bg-[#E3FFE6]' : text === 'REJECTED' ? 'text-[#F05050] border-[#F05050] bg-[#FFE1E1]' : 'text-[#B9A325] border-[#B9A325] bg-[#FDF7DD]', 'rounded-2xl text-[12px] font-semibold')}
            >{text}</Tag>
        },
        {
            title: 'Comment',
            dataIndex: 'commnet',
        }
   ]
    
    return(
        <div className="space-y-[16px]">
            <section>
                <Button><ArrowLeftOutlined/> Back</Button>

            </section>
            <section className="flex justify-between ">
                <div>
                    <Heading heading={data.name}/>
                    <div>
                        <Tag
                        className={twMerge(data.status === 'ACCEPTED' ? 'text-[#379D51] border-[#379D51] bg-[#E3FFE6]' : data.status === 'REJECTED' ? 'text-[#F05050] border-[#F05050] bg-[#FFE1E1]' : 'text-[#B9A325] border-[#B9A325] bg-[#FDF7DD]', 'rounded-2xl text-[12px] font-semibold')}
                        >{data.status}</Tag>
                       <span>{data.lastAction}</span>
                    </div>
                </div>
                <div className="flex space-x-[12px]">
                    <Button>Downloadas Excel</Button>
                    <Button>Import Excel File</Button>
                    <Button type="primary">Submit Response</Button>
                </div>
            </section>
            <TableComponent  onRow={(record: Array<{}>) => ({
                onClick: () => handleOpenIssue(record),})} columns={column} dataSource={details}/>

           <IssueDrawer selectedIssue={selectedIssue || {}} openIssue={openIssue} setOpenIssue={setOpenIssue}/>
        </div>
    )
}
import { Tag } from "antd";
import TableComponent from "../../Global/TableComponent";
import { maintenance } from "../../TableItems/data/MaintenanceData";
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import { twMerge } from "tailwind-merge";

export default function MaintenanceTable () {
    const Row = (props: {title: string, descriptn: string}) => {
        return(
            <div>
                <p className="text-[13px]">{props.title}</p>
                <p className="text-[12px] text-[#595959]">{props.descriptn}</p>
            </div>
        )
    }

    const column = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'Name',
            dataIndex: ["name", "location"],
            render: (_: any, record: any) => 
                <Row title={record.name} descriptn={record.location} />
        },
        {
            title: 'Proposed Date',
            dataIndex: 'proDate'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text: string) => <Tag
            icon={text === 'PENDING' ? <ExclamationCircleOutlined/> : text === 'REJECTED' ? <CloseCircleOutlined/> : <CheckCircleOutlined />}
             className={twMerge('rounded-2xl text-[12px] font-semibold items-center', 
             text === 'ACCEPTED' ? 'bg-[#E3FFE6] text-[#379D51] border-[#379D51]' : text === 'REJECTED' ? 'bg-[#FFE1E1] text-[#F05050] border-[#F05050]' : 'bg-[#FDF7DD] text-[#B9A325] border-[#B9A325]' )}> 
            {text}
           </Tag>
        },
        {
            title: 'SPOC',
            dataIndex: 'id'
        },
        {
            title: 'Reschedule Date',
            dataIndex: 'recshedule'
        },
    ]
    return(
        <TableComponent columns={column} dataSource={maintenance}/>
    )
}
import { Avatar, Checkbox, Tag } from "antd";
import TableComponent from "../../Global/TableComponent";
import Devices from "../data/DevicesData";
import DeviceAction from "../../inventory/devices/DeviceActionButton";
import { useState } from "react";
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { twMerge } from "tailwind-merge";

interface Prop {
  selectedRow: any
  setSelectedRow: any
  setnewDevice: any
}

export default function DevicesTable(props: Prop) {

  const { selectedRow, setSelectedRow, setnewDevice} = props
  
  const [deviceDetail, setDeviceDetails] = useState(false);

  const column = [
    {
      title: <Checkbox />,
      render: () => <Checkbox />,
    },
    {
      title: "Serial Number",
      dataIndex: "id",
    },
    {
      title: "Manufacturere",
      dataIndex: "manufacturer",
    },
    {
      title: "Model",
      dataIndex: "model",
    },
    {
      title: "Assigned to",
      dataIndex: "assignee",
      render: (text: string) => <div className="flex space-x-2">
        <Avatar className="bg-[#EFF7FB] font-semibold text-[#0A96CC] text-[3px]" size={24}>{text.slice(0,1)}</Avatar>
        <p>{text}</p>
      </div>
    },
    {
      title: "Date Procured",
      dataIndex: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => <Tag
      icon={
        text === "AVIALABLE" ? (
          <ExclamationCircleOutlined />
        ) : text === "FAULTY" ? (
          <CloseCircleOutlined />
        ) : (
          <CheckCircleOutlined />
        )
      }
      className={twMerge(
        "rounded-2xl tagSize font-semibold items-center",
        text === "IN-STOCK"
          ? "bg-[#E3FFE6] text-[#379D51] border-[#379D51]"
          : text === "OUT-OF-STOCK"
          ? "bg-[#FFE1E1] text-[#F05050] border-[#F05050]"
          : "bg-[#FDF7DD] text-[#B9A325] border-[#B9A325]"
      )}
    >
      {text}
    </Tag>
    },
    {
      title: "",
      dataIndex: "",
      render: (record: any) => (
        <DeviceAction
          setnewDevice={setnewDevice}
          selectedRow={selectedRow}
          setDeviceDetail={setDeviceDetails}
          deviceDetail={deviceDetail}
          setSelectedRow={setSelectedRow}
          items={record}
        />
      ),
    },
  ];

  return <TableComponent columns={column} dataSource={Devices} />;
}

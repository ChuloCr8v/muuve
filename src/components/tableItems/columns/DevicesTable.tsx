import { Avatar, Tag } from "antd";
import TableComponent from "../../global/TableComponent";
import { useCallback } from "react";
import { useListDevicesQuery } from "../../../api/devices.api";
import { format } from "date-fns";
import DeviceAction from "../../inventory/devices/DeviceActionButton";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { twMerge } from "tailwind-merge";

interface Prop {
  selectedRow: any;
  setSelectedRow: any;
  setnewDevice: any;
}

export default function DevicesTable(props: Prop) {
  const { selectedRow, setSelectedRow, setnewDevice } = props;
  const { data: devices } = useListDevicesQuery();

  console.log(devices);

  const column = [
    {
      title: "Device Name",
      dataIndex: "name",
    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
    },
    {
      title: "Model",
      dataIndex: "model",
      render: (record: any) => <span>{record.name}</span>,
    },
    {
      title: "Assigned to",
      dataIndex: "assignee",
      render: (text: string) => (
        <div className="flex space-x-2">
          <Avatar
            className="bg-[#EFF7FB] font-semibold text-[#0A96CC] text-[3px]"
            size={24}
          >
            {text?.slice(0, 1)}
          </Avatar>
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: "Date Procured",
      dataIndex: "dateProcured",
      render: (text: string) => (
        <span>{format(new Date(text), "d MMM yyyy")}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <Tag
          icon={
            text === "AVAILABLE" ? (
              <ExclamationCircleOutlined />
            ) : text === "FAULTY" ? (
              <CloseCircleOutlined />
            ) : (
              <CheckCircleOutlined />
            )
          }
          className={twMerge(
            "rounded-2xl tagSize font-semibold items-center",
            text === "ASSIGNED"
              ? "bg-[#E3FFE6] text-[#379D51] border-[#379D51]"
              : text === "FAULTY"
              ? "bg-[#FFE1E1] text-[#F05050] border-[#F05050]"
              : "bg-[#FDF7DD] text-[#B9A325] border-[#B9A325]"
          )}
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "",
      dataIndex: "",
      render: (record: any) => (
        <DeviceAction
          setnewDevice={setnewDevice}
          selectedRow={record}
          setSelectedRow={setSelectedRow}
        />
      ),
    },
  ];

  return <TableComponent columns={column} dataSource={devices} />;
}

import { Button, Dropdown, MenuProps } from "antd";
import React, { ReactNode } from "react";
// import Survey from '../../views/projects/Survey';
import {
  CloseCircleOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import SLATime from "../../hooks/useGetSLA";
import DataTable from "../Global/DataTable";
import TableRowData from "../Global/TableRowData";
import { SurveyData } from "./SurveyData";
import { twMerge } from "tailwind-merge";

export interface DataType {
  id: string;
  customerName: string;
  serviceAddress: string;
  serviceType: string;
  requestType: string;
  manager: string;
  bandwidth: string;
  region: string;
  state: string;
  longitude: string;
  latitude: string;
  dueDate: number;
  status: string;
}

const Itemlabel = (props: { label: string; icon: ReactNode }) => {
  return (
    <div
      className={twMerge(
        "flex items-center space-x-2",
        (props.label.toLowerCase() === "reject survey" ||
          props.label.toLowerCase() === "delete") &&
          "text-red-600"
      )}
    >
      <div className="text-md">{props.icon}</div>
      <span className="text-xs">{props.label}</span>
    </div>
  );
};

const items: MenuProps["items"] = [
  {
    key: 1,
    label: <Itemlabel label={"Edit Details"} icon={<EyeOutlined />} />,
    // onClick: () => showModal('Edit Details', '/path/to/edit-icon.svg'),
  },
  {
    key: 2,
    label: <Itemlabel label={"Initiate Payment"} icon={<UserAddOutlined />} />,
    // onClick: (e) => {
    //   showModal('Assign Device', '/assign.svg'), e.stopPropagaton();
    // },
  },

  {
    key: 3,
    label: (
      <Itemlabel label={"Upload Receipt"} icon={<CloudUploadOutlined />} />
    ),
    // onClick: () => showModal('Report Fault', '/reportFault.svg'),
  },
  {
    key: 4,
    label: <Itemlabel label={"Assign Survey"} icon={<DeleteOutlined />} />,
    // onClick: () => showModal('Delete', '/delete.svg'),
  },

  {
    key: 5,
    label: <Itemlabel label={"Reassign"} icon={<UserSwitchOutlined />} />,
    // onClick: () => showModal('Report Fault', '/reportFault.svg'),
  },
  {
    key: 6,
    label: <Itemlabel label={"Reject Survey"} icon={<CloseCircleOutlined />} />,
    // onClick: () => showModal('Report Fault', '/reportFault.svg'),
  },
  {
    key: 5,
    label: <Itemlabel label={"Delete"} icon={<DeleteOutlined />} />,
    // onClick: () => showModal('Report Fault', '/reportFault.svg'),
  },
];

export const columns: ColumnType<DataType>[] = [
  {
    title: "ID",
    dataIndex: "id",
    width: 50,
    render: (_: "string", record) => <TableRowData mainText={record.id} />,
  },
  {
    title: "Name",
    dataIndex: "customerName",
    key: "customerName",
    render: (_: "string", record) => (
      <TableRowData
        mainText={record.customerName}
        tagText={record.serviceAddress}
      />
    ),
  },
  {
    title: "Service Type",
    dataIndex: "serviceType",
    key: "serviceType",
    render: (_: "string", record) => (
      <TableRowData
        mainText={record.serviceType}
        tagText={record.requestType}
      />
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, record) => (
      <TableRowData
        mainText={record.status}
        tagText={record.manager}
        mainTextStyle={`${
          record.status.toLowerCase() === "completed" && "text-primary"
        }`}
      />
    ),
  },
  {
    title: "SLA",
    dataIndex: ["sla", "due"],
    key: "requestType",
    render: (_, record) => (
      <TableRowData
        mainText={<SLATime sla={record.dueDate} status={record.status} />}
        tagText={`Due: ${dayjs(record.dueDate).format("DD MMM YYYY")}`}
      />
    ),
  },
  {
    title: "Action",
    dataIndex: "latitude",
    key: "latitude",
    width: 150,
    render: () => (
      <Dropdown trigger={["click"]} menu={{ items }}>
        <Button className="h-7 text-grey" onClick={(e) => e.stopPropagation()}>
          Action
        </Button>
      </Dropdown>
    ),
  },
];

const SurveyTable: React.FC = () => {
  return <DataTable data={SurveyData} columns={columns} />;
};

export default SurveyTable;

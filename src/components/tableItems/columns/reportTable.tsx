import { Button, Checkbox, Tag } from "antd";
import { useState } from "react";
import Reports from "../data/operatioData";
import TableComponent from "../../global/TableComponent";
import { useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";

export interface DataType {
  key: string;
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
  sla: string;
  due: string;
  status: string;
}

export const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: 50,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "customerName",
    width: 300,
    render: (text: string) => (
      <div>
        <p className="text-[13px]">{text}</p>
        {/* <p className="text-[11px] text-[#595959]">{text.bandwidth}</p> */}
      </div>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    width: 250,
  },
  {
    title: "Status",
    dataIndex: "status",

    width: 150,
    render: (text: string) => (
      <div>
        <Tag className="rounded-2xl text-[11px] font-semibold bg-[#FDF7DD] text-[#B9A325] border-[#B9A325]">
          {text}
        </Tag>
      </div>
    ),
  },
  {
    title: "Last Aaction",
    dataIndex: "lastAction",
    key: "requestType",
    width: 250,
    render: (text: string) => (
      <div>
        <p>{text}</p>
      </div>
    ),
  },
  {
    title: "Action",
    width: 150,
    render: () => (
      // <Dropdown trigger={["click"]} menu={{ items }}>
      <Button className="tableAction" onClick={(e) => e.stopPropagation()}>
        <span>Action</span>
        <DownOutlined />
      </Button>
      // </Dropdown>
    ),
  },
];

const ReportsTable = () => {
  const [_data, setData] = useState(null);
  const navigate = useNavigate();

  const handleRowClick = (record: any) => {
    setData(record);
    navigate(`/operations/report/details/${record.id}`, {
      state: { rowData: record },
    });
  };

  return (
    <TableComponent
      columns={columns}
      dataSource={Reports}
      scroll={800}
      onRow={(record: Array<{}>) => ({
        onClick: () => handleRowClick(record),
      })}
    />
  );
};

export default ReportsTable;

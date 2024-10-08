import { Button, Tag } from "antd";
import TableComponent from "../../global/TableComponent";
import snagData from "../data/SnagData";
import {
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { twMerge } from "tailwind-merge";

export default function SnagsTable() {
  const column = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Customer",
      dataIndex: "customer",
    },
    {
      title: "Snag Description",
      dataIndex: "decrip",
      width: 300,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <Tag
          icon={
            text === "PENDING" ? (
              <ExclamationCircleOutlined />
            ) : text === "REJECTED" ? (
              <CloseCircleOutlined />
            ) : (
              <CheckCircleOutlined />
            )
          }
          className={twMerge(
            "rounded-2xl tagSize font-semibold items-center",
            text === "RESOLVED"
              ? "bg-[#E3FFE6] text-[#379D51] border-[#379D51]"
              : text === "REJECTED"
              ? "bg-[#FFE1E1] text-[#F05050] border-[#F05050]"
              : "bg-[#FDF7DD] text-[#B9A325] border-[#B9A325]"
          )}
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "Action",
      render: () => (
        <Button className="tableAction">
          <span>Action</span>
          <DownOutlined />
        </Button>
      ),
    },
  ];
  return <TableComponent scroll={500} columns={column} dataSource={snagData} />;
}

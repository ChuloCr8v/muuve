import {
  ArrowDownOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Input, Select, Table, Tag } from "antd";
import { twMerge } from "tailwind-merge";
import Export from "/export.png";
import Data from "./subscription/data";
import Heading from "../../components/global/Header";

export default function Invoices() {
  //   const [filter, setFilter] = useState("All");

  //   const FilterState = [
  //     { label: "All", count: 20 },
  //     { label: "Active", count: 20 },
  //     { label: "Deactivated", count: 20 },
  //     { label: "Expiring soon", count: 20 },
  //   ];

  const column = [
    {
      title: <Checkbox />,
      width: 20,
      render: () => <Checkbox />,
    },
    {
      title: "ID",
      width: 20,
      render: () => <Checkbox />,
    },
    {
      title: "Customer",
      dataIndex: "serviceName, ServiceID",
      render: (_text: string, record: any) => (
        <div>
          <p className="table-text w-[150px] truncate">{record.serviceName}</p>
          <span className="text-[#0A95CCB2] text-[11px]">
            {record.ServiceID}
          </span>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "customerNameCustomerComapny",
      render: (_text: string, record: any) => (
        <div>
          <p className="table-text w-[150px] truncate">{record.customerName}</p>
          <span className="text-[#0A95CCB2] text-[11px]">
            {record.CustomerComapny}
          </span>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "startDate,endDate",
      render: (_text: string, record: any) => (
        <div>
          <p className="table-text w-[150px] text-wrap">{`${record.startDate} to ${record.endDate}`}</p>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "statusStatusDescription",
      render: (_text: boolean, record: any) => (
        <div className="block w-[110px] text-wrap ">
          <Tag
            icon={
              record.status === "Active" ? (
                <CheckCircleOutlined />
              ) : record.status === "Deactivated" ? (
                <CloseCircleOutlined />
              ) : (
                <ExclamationCircleOutlined />
              )
            }
            className={twMerge(
              record.status === "Active"
                ? "text-[#379D51] border-[#379D51]"
                : record.status === "Deactivated"
                ? "text-red-600 border-red-600"
                : "border-[#B9A325] text-[#B9A325]",
              "rounded-2xl flex w-fit items-center font-semibold"
            )}
          >
            {record.status}
          </Tag>
          <p className="text-[#0A95CCB2] text-[11px]">
            {record.statusDescription}
          </p>
        </div>
      ),
    },
    {
      title: "",
      render: () => <ArrowDownOutlined />,
    },
  ];

  return (
    <div className="space-y-[24px] ">
      <section className="flex justify-between">
        <Heading heading="Invoices" />
        <div className="justify-end space-x-[16px] flex">
          <Input
            prefix={<SearchOutlined className="text-[#777777]" />}
            placeholder="Search"
          />
          <Select placeholder="Customer" />
          <Button type="default" className="flex items-center space-x-1">
            <span className="btn-span">Refresh</span>
            <SyncOutlined />
          </Button>
          <Button type="default" className="flex items-center space-x-1">
            <span className="btn-span">Generate Report</span>
            <img src={Export} />
          </Button>
          <Button type="primary">
            <span className="btn-span">Generate Invoice</span>
            <PlusOutlined className="text-white" />
          </Button>
        </div>
      </section>

      <section className="rounded-lg border-[1.5px]  border-[#5656561A] shadow-sm shadow-[#5656561A]">
        <Table
          scroll={{ x: 800 }}
          size="small"
          columns={column as any}
          dataSource={Data}
        />
      </section>
    </div>
  );
}

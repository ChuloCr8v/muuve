import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  OrderedListOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Input, Select, Table, Tag } from "antd";
import { twMerge } from "tailwind-merge";
import SummaryCards from "../../global/SummaryCards";
import TableComponent from "../../global/TableComponent";

interface Props {
  data: any;
}

export default function ModelStock({ data }: Props) {
  // const Filters = [
  //   {
  //     label: 'Total',
  //     Count: data.total,
  //     icon: <OrderedListOutlined />,
  //   },
  //   {
  //     label: 'Assigned',
  //     Count: data.assigned,
  //     icon: <OrderedListOutlined />,
  //   },
  //   {
  //     label: 'Available',
  //     Count: data.available,
  //     icon: <OrderedListOutlined />,
  //   },
  //   {
  //     label: 'Faulty',
  //     Count: data.faulty,
  //     icon: <OrderedListOutlined />,
  //   },
  // ];

  const columnData = data.devices;

  const column = [
    {
      title: "Serial Number",
      dataIndex: "id",
      width: 100,
      render: (text: string) => (
        <span className="text-[12px] text-[#171717] w-full truncate">
          {text}
        </span>
      ),
    },
    {
      title: "Name",
      width: 150,
      dataIndex: "name",
      render: (text: string) => (
        <div className="truncate w-fit">
          <p className="text-[12px]  text-[#171717] max-w-full truncate">
            {text}
          </p>
        </div>
      ),
    },
    {
      title: "Location",
      dataIndex: "Location",
      render: (text: string) => (
        <div>
          <p className="text-[12px] text-[#171717]">{text}</p>
        </div>
      ),
    },
    {
      title: "Status",
      key: 4,
      dataIndex: "Status",
      render: (text: string) => (
        <div className="">
          <Tag
            icon={
              text === "ASSIGNED" ? (
                <CheckCircleOutlined className="text-[#379D51]" />
              ) : text === "FAULTY" ? (
                <CloseCircleOutlined className="text-[#F05050]" />
              ) : (
                <WarningOutlined className="text-[#B9A325]" />
              )
            }
            className={twMerge(
              "text-[10px] rounded-2xl",
              text === 'AVAILABLE'
                ? "text-[#B9A325] border-[#B9A325] bg-[#FDF7DD]"
                : text === 'FAULTY'
                ? "text-[#F05050] border-[#F05050] bg-[#FFE1E1]"
                : "text-[#379D51] border-[#379D51] bg-[#E3FFE6]"
            )}
          >
            {text}
          </Tag>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "data",
    },
    {
      title: "",
      dataIndex: "",
      render: () => <ArrowRightOutlined/>
    },
  ];

  const summaryCard = [
    {
      label: "Total",
      value: 22,
      icon: <OrderedListOutlined />,
    },
    {
      label: "Assigned",
      value: 19,
      icon: <CheckOutlined />,
    },
    {
      label: "Available",
      value: 2,
      icon: <ExclamationCircleOutlined />,
    },
    {
      label: "Faulty",
      value: 1,
      icon: <CloseCircleOutlined />,
    },
  ];
  return (
    <div className="space-y-[16px]">
      <p className="text-[16px] font-semibold">Stock</p>
      {/* <div className="grid grid-cols-4 gap-6">
          {Filters.map((items) => (
            <div className="flex px-4 py-2 justify-between rounded-md border-[1px] items-center border-[#E9EAEB] bg-white">
              <div className="space-y-[4px]">
                <p className="font-bold text-[16px]">{items.Count}</p>
                <p className="text-xs text-[#595959]">{items.label}</p>
              </div>
              <div className="items-center block h-full">
                <img src={items.icon} alt="" className="mt-2" />
              </div>
            </div>
          ))}
        </div> */}
      <SummaryCards summaryData={summaryCard} />

      <section className="flex w-full space-x-[16px]">
        <Input placeholder="Search name, serial no, part no" />
        <Select
          placeholder={
            <p className="text-[12px ] text-[#595959] mr-2">Status</p>
          }
        />
        <Select
          placeholder={
            <p className="text-[12px ] text-[#595959] mr-2">Location</p>
          }
        />
      </section>

      <TableComponent columns={column} dataSource={data.devices} />
    </div>
  );
}

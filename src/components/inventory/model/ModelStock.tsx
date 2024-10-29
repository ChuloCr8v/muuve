import {
  ArrowRightOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { Input, Select } from "antd";
import { format } from "date-fns";
import { Device, DeviceStatus } from "../../../api/types";
import StatusTag from "../../global/StatusTag";
import SummaryCards, { SummaryDataType } from "../../global/SummaryCards";
import TableComponent from "../../global/TableComponent";

interface Props {
  devices: Device[];
}

export default function ModelStock({ devices }: Props) {
  const availableDevices = devices.filter(
    (d) => d.status === DeviceStatus.AVAILABLE
  );

  const assignedDevices = devices.filter(
    (d) => d.status === DeviceStatus.ASSIGNED
  );

  const faultyDevices = devices.filter((d) => d.status === DeviceStatus.FAULTY);

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

  const columns = [
    {
      title: "Serial No",
      dataIndex: "serialNumber",
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
      dataIndex: "location",
      render: (text: string) => (
        <div>
          <p className="text-[12px] text-[#171717]">{text}</p>
        </div>
      ),
    },
    {
      title: "Status",
      key: 4,
      dataIndex: "status",
      render: (status: DeviceStatus) => {
        if (status === DeviceStatus.ASSIGNED) {
          return (
            <StatusTag status={status} bgColor="#FDF7DD" textColor="#B9A325" />
          );
        } else if (status === DeviceStatus.FAULTY) {
          return (
            <StatusTag status={status} bgColor="#FFE1E1" textColor="#F05050" />
          );
        } else
          return (
            <StatusTag status={status} bgColor="#E3FFE6" textColor="#379D51" />
          );
      },
    },
    {
      title: "Date Procured",
      dataIndex: "dateProcured",
      render: (date: string) => format(date, "dd-MM-yyyy"),
    },
    {
      title: "",
      dataIndex: "",
      render: () => <ArrowRightOutlined />,
    },
  ];

  const summaryCard: SummaryDataType[] = [
    {
      label: "Total",
      value: devices.length,
      icon: <OrderedListOutlined />,
      background: "#F2F9FC",
      iconBg: "#0A95CC1A",
      iconColor: "#0A95CC",
    },
    {
      label: "Assigned",
      value: assignedDevices.length,
      icon: <CheckOutlined />,
      background: "#F0F9F2",
      iconBg: "#379D511A",
      iconColor: "#379D51",
    },
    {
      label: "Available",
      value: availableDevices.length,
      icon: <ExclamationCircleOutlined />,
      background: "#FAF8EE",
      iconBg: "#B9A3251A",
      iconColor: "#B9A325",
    },
    {
      label: "Faulty",
      value: faultyDevices.length,
      icon: <CloseCircleOutlined />,
      background: "#FBEEEE",
      iconBg: "#C42A2A1A",
      iconColor: "#C42A2A",
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

      <TableComponent<Device>
        columns={columns}
        dataSource={devices}
        scroll={800}
      />
    </div>
  );
}

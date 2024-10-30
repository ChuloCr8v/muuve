import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  OrderedListOutlined,
  PlusOutlined,
  SearchOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Input, MenuProps, Tag } from "antd";
import { ColumnType } from "antd/es/table";
import { format } from "date-fns";
import { useState } from "react";
import { CiEdit, CiWarning } from "react-icons/ci";
import { FaBan } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { LuUserPlus2 } from "react-icons/lu";
import { VscVmActive } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import { useListDevicesQuery } from "../../api/devices.api";
import { Device, User } from "../../api/types";
import DropdownCustomItem from "../../components/global/DropdownCustomItem";
import Header from "../../components/global/Header";
import TableComponent from "../../components/global/TableComponent";
import { usePopup } from "../../context/PopupContext";
import { AddDeviceDrawer } from "../../drawers/inventory/AddDeviceDrawer";
import { EditDeviceDrawer } from "../../drawers/inventory/EditDeviceDrawer";
import { AssignDeviceModal } from "../../modals/inventory/AssignDeviceModal";
import { ReportFaultModal } from "../../modals/inventory/ReportFaultModal";
import { getInitials } from "../../utils/getInitials";
import { DeviceDetailDrawer } from "../../drawers/inventory/DeviceDetailDrawer";

export default function Devices() {
  const { openDrawer, openModal } = usePopup();

  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

  const listDevices = useListDevicesQuery();
  const devices = listDevices.data ?? [];

  const summaryCard = [
    {
      label: "Total",
      value: 22,
      icon: <OrderedListOutlined />,
    },
    {
      label: "Available",
      value: 19,
      icon: <VscVmActive />,
    },
    {
      label: "Faulty",
      value: 2,
      icon: <FaBan />,
    },
    {
      label: "Assigned",
      value: 1,
      icon: <WarningOutlined />,
    },
  ];

  const columns: ColumnType<Device>[] = [
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
      render: (assignee?: User) =>
        assignee ? (
          <div className="flex space-x-2">
            <Avatar
              className="bg-[#EFF7FB] font-semibold text-[#0A96CC] text-[3px]"
              size={24}
            >
              {getInitials(assignee.staff.name)}
            </Avatar>
            <p>{assignee.staff.name}</p>
          </div>
        ) : (
          "-"
        ),
    },
    {
      title: "Date Procured",
      dataIndex: "dateProcured",
      render: (text: string) => (
        <span>{format(new Date(text), "MMM dd, yyyy")}</span>
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
      render: (_, record: any) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Dropdown
            trigger={["click"]}
            menu={{
              items: actions(record),
            }}
          >
            <Button size="small" className="px-4 text-grey">
              Action
              <IoMdArrowDropdown />
            </Button>
          </Dropdown>
        </div>
      ),
    },
  ];

  const actions = (device: Device): MenuProps["items"] => [
    {
      key: "1",
      label: "Edit Details",
      icon: <CiEdit size={20} />,
      onClick: () => openDrawer(<EditDeviceDrawer device={device} />),
    },
    {
      key: "2",
      label: "Assign Device",
      icon: <LuUserPlus2 size={20} />,
      onClick: () => openModal(<AssignDeviceModal devices={[device]} />),
    },
    {
      key: "3",
      label: (
        <DropdownCustomItem
          className="text-red-600"
          label={"Report Fault"}
          icon={<CiWarning size={20} />}
        />
      ),
      onClick: () => openModal(<ReportFaultModal device={device} />),
    },
    // {
    //   key: "4",
    //   label: "Delete",
    //   icon: <MdDeleteOutline size={20} />,
    // },
  ];

  return (
    <div className="space-y-[16px] p-8">
      <div className="flex items-center justify-between">
        <Header heading={"Devices"} />

        {selectedDevices.length > 0 ? (
          <Button
            className="flex items-center spacex-2"
            onClick={() =>
              openModal(<AssignDeviceModal devices={selectedDevices} />)
            }
          >
            <span>Assign Devices</span>
          </Button>
        ) : (
          <section className="flex items-center gap-[16px]">
            <Input className="w-[400px]" prefix={<SearchOutlined />} />
            <Button>Generate Report</Button>
            <Button>Refresh</Button>

            <Button
              className="flex items-center spacex-2"
              type="primary"
              onClick={() => openDrawer(<AddDeviceDrawer />)}
            >
              <span>New Device</span>
              <PlusOutlined />
            </Button>
          </section>
        )}
      </div>

      {/* <SummaryCards summaryData={summaryCard} /> */}

      <TableComponent<Device>
        columns={columns}
        dataSource={devices}
        scroll={800}
        loading={listDevices.isFetching}
        isRowSelection
        onSelectionChange={(d) => setSelectedDevices(d)}
        onRow={(device) => {
          openDrawer(<DeviceDetailDrawer device={device} />);
        }}
      />
    </div>
  );
}

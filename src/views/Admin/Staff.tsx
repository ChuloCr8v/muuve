import { Button, Dropdown, Input, MenuProps, Table, Tag } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownOutlined,
  EditOutlined,
  OrderedListOutlined,
  PlusOutlined,
  SearchOutlined,
  StopOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import Heading from "../../component/Global/Header";
import NewStaff from "../../component/onboarding/admin/NewStaff";
import SummaryCards from "../../component/Global/SummaryCards";
import { FaBan } from "react-icons/fa";
import { VscVmActive } from "react-icons/vsc";

export default function Staff() {
  const [newStaff, setNewStaff] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: "Edit",
      icon: <EditOutlined />,
    },
    {
      key: 2,
      label: "Deactivate",
      icon: <StopOutlined />,
    },
  ];

  const summaryCard = [
    {
      label: "Total",
      value: 22,
      icon: <OrderedListOutlined />,
    },
    {
      label: "Active",
      value: 19,
      icon: <VscVmActive />,
    },
    {
      label: "Deactivated",
      value: 2,
      icon: <FaBan />,
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email Address",
      dataIndex: "email",
    },
    {
      title: "Phone No",
      dataIndex: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <Tag
          icon={
            text === "Active" ? (
              <CheckCircleOutlined />
            ) : (
              <CloseCircleOutlined />
            )
          }
          className={twMerge(
            text === "Active"
              ? "border-[#379D51] text-[#379D51] bg-[#E3FFE6]"
              : "border-[#777777] text-[#777777] bg-[#F0F1F3]",
            "rounded-2xl space-x-2 font-semibold"
          )}
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "Action",
      render: () => (
        <Dropdown menu={{ items }}>
          <Button className="flex space-x-2 items-center">
            <span>Action</span>
            <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const data = [
    {
      id: "CUS1200",
      name: "Modesta Ekeh",
      email: "modesta@xyz.com",
      phone: "08165785436",
      status: "Active",
    },
    {
      id: "CUS1200",
      name: "Modesta Ekeh",
      email: "modesta@xyz.com",
      phone: "08165785436",
      status: "Active",
    },
    {
      id: "CUS1200",
      name: "Modesta Ekeh",
      email: "modesta@xyz.com",
      phone: "08165785436",
      status: "Inactive",
    },
    {
      id: "CUS1200",
      name: "Modesta Ekeh",
      email: "modesta@xyz.com",
      phone: "08165785436",
      status: "Inactive",
    },
    {
      id: "CUS1200",
      name: "Modesta Ekeh",
      email: "modesta@xyz.com",
      phone: "08165785436",
      status: "Active",
    },
  ];
  return (
    <div className="space-y-[16px] body-pad p-8">
      <section className="flex items-center justify-between">
        <Heading heading={"Staff"} />
        <div className="flex space-x-[16px] ">
          <Input className="w-[400px]" prefix={<SearchOutlined />} />
          <Button className="flex items-center">
            <span className="mt-1">Refresh</span>
            <SyncOutlined />
          </Button>
          <Button
            className="flex items-center"
            onClick={() => setNewStaff(true)}
            type="primary"
          >
            <span className="mt-1">New Staff</span>
            <PlusOutlined />
          </Button>
        </div>
      </section>

      <SummaryCards summaryData={summaryCard} />

      <section className="rounded-lg border-[1.5px]  border-[#5656561A] shadow-sm shadow-[#5656561A]">
        <Table
          scroll={{ x: 800 }}
          size="small"
          columns={columns as any}
          dataSource={data}
        />
      </section>

      <NewStaff newStaff={newStaff} setNewStaff={setNewStaff} />
    </div>
  );
}

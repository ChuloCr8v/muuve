import {
  DownOutlined,
  PlusOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input } from "antd";
import React, { useState } from "react";
import { useListStaffQuery } from "../../api/staff.api";
import { User } from "../../api/types";
import Heading from "../../components/global/Header";
import SummaryCards from "../../components/global/SummaryCards";
import { usePopup } from "../../context/PopupContext";
import { AddStaffDrawer } from "../../drawers/staff/AddStaffDrawer";
import TableComponent from "../../components/global/TableComponent";
import StatusTag from "../../components/global/StatusTag";
import StaffActionItems from "./adminUtils/StaffActionItems";

export default function Staff() {
  const [currentStaff, setCurrentStaff] = useState<any>();
  const { openDrawer } = usePopup();
  const { items } = StaffActionItems({ staff: currentStaff });

  const listStaff = useListStaffQuery();

  const staffUsers = listStaff.data ?? [];

  const staff = staffUsers.map((u) => ({
    id: u.id,
    name: u.staff.name,
    email: u.email,
    roles: u.isAdmin ? "Admin" : "User",
    status: u.isActive ? "Active" : "Deactivated",
  }));

  const [filteredData, setFilteredData] = useState(staff); // For filtered search results
  const [searchText, setSearchText] = useState(""); // To track search input

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = staff?.filter(
      (staff) =>
        staff.name.toLowerCase().includes(searchValue) ||
        staff.email.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Roles",
      dataIndex: "roles",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_: string, record: { status: string }) => (
        <StatusTag status={record.status} />
      ),
    },
    {
      title: "Action",
      render: (record: User) => (
        <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]}>
          <Button
            icon={<DownOutlined />}
            iconPosition="end"
            className="h-7"
            onClick={() => setCurrentStaff(record)}
          >
            <span>Action</span>
          </Button>
        </Dropdown>
      ),
    },
  ];

  const activeStaff = listStaff.data?.filter(
    (staff) => staff.isActive === true
  );
  const deacticatedStaff = listStaff.data?.filter(
    (staff) => staff.isActive === false
  );

  const summaryData = [
    { label: "Total", value: listStaff.data?.length ?? 0 },
    { label: "Active", value: activeStaff?.length ?? 0 },
    { label: "Deactivated", value: deacticatedStaff?.length ?? 0 },
  ];

  return (
    <div className="space-y-[16px] body-pad p-8">
      <section className="flex items-center justify-between">
        <Heading heading="Staff" />
        <div className="flex space-x-[16px]">
          <Input
            className="w-[400px]"
            prefix={<SearchOutlined />}
            placeholder="Search by name, email or phone"
            value={searchText}
            onChange={handleSearch}
          />
          <Button
            className="flex items-center"
            onClick={() => setFilteredData(staff)}
          >
            <span>Refresh</span>
            <SyncOutlined />
          </Button>
          <Button
            className="flex items-center"
            onClick={() => openDrawer(<AddStaffDrawer />)}
            type="primary"
          >
            <span>Add Staff</span>
            <PlusOutlined />
          </Button>
        </div>
      </section>

      <SummaryCards summaryData={summaryData} />

      <TableComponent
        scroll={{ x: 800 }}
        columns={columns as any}
        dataSource={filteredData.length > 0 ? filteredData : staff}
        loading={listStaff.isFetching}
      />
    </div>
  );
}

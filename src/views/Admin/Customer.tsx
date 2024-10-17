import { useState } from "react";
import { Button, Dropdown, Input, Table, Form, Drawer } from "antd";
import { DownOutlined, SearchOutlined, SyncOutlined } from "@ant-design/icons";
import Heading from "../../components/global/Header";
import SummaryCards from "../../components/global/SummaryCards";
import CustomerDropButton from "../../components/customer/CustomerDropDown";
import { useListCustomersQuery } from "../../api/customer.api";
import StatusTag from "../../components/global/StatusTag";
import CustomerActionItems from "./adminUtils/CustomerActionItems";
import UpdateCustomerDrawer from "./modals/UpdateCustomerDrawer";

interface CustomerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
}

export interface ActionProps {
  customer: CustomerData;
  onEdit: (customer: CustomerData) => void;
  onDeactivate: (customer: CustomerData) => void;
}

export default function Customer() {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData>();

  const listCustomers = useListCustomersQuery();

  const customerUsers = listCustomers.data ?? [];

  const customers = customerUsers.map((u) => ({
    id: u.id,
    email: u.email,
    name: u.customer.name,
    phone: u.customer.phone,
    address: u.customer.address,
    status: u.isActive ? "Active" : "Deactivated",
    customerId: u.customer.customerId,
  }));

  const [searchText, setSearchText] = useState<string>(""); // Added state for search input
  const [filteredData, setFilteredData] = useState(customers); // State for filtered data

  const { items } = CustomerActionItems({ customer: selectedCustomer });

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = customers?.filter(
      (c) =>
        c.name.toLowerCase().includes(value.toLowerCase()) ||
        c.email.toLowerCase().includes(value.toLowerCase()) ||
        c.phone.includes(value)
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "customerId",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone No",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: string, record: CustomerData) => (
        <StatusTag status={record.status} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: CustomerData) => (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Button
            onClick={() => setSelectedCustomer(record)}
            className="flex items-center h-7"
            icon={<DownOutlined />}
            iconPosition="end"
          >
            Action
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="space-y-[16px] body-pad p-8">
      <section className="flex items-center justify-between">
        <Heading heading={"Customer "} />
        <div className="flex space-x-[16px]">
          <Input
            className="w-[400px]"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)} // Search handler added
            placeholder="Search by name, email, or phone"
          />
          <Button
            className="flex items-center"
            onClick={() => setFilteredData(customers)}
          >
            <span>Refresh</span>
            <SyncOutlined />
          </Button>
          <CustomerDropButton />
        </div>
      </section>

      <SummaryCards
        summaryData={[
          { label: "Total", value: 22 },
          { label: "Active", value: 19 },
          { label: "Deactivated", value: 2 },
        ]}
      />

      <section className="rounded-lg border-[1.5px] border-[#5656561A] shadow-sm shadow-[#5656561A]">
        <Table
          scroll={{ x: 800 }}
          size="small"
          columns={columns as any}
          dataSource={filteredData?.length > 0 ? filteredData : customers}
          loading={listCustomers.isFetching}
        />
      </section>

      <UpdateCustomerDrawer />
    </div>
  );
}

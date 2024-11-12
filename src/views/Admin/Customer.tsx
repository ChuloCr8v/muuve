import { User } from "@/api/types";
import DropdownCustomItem from "@/components/global/DropdownCustomItem";
import TableComponent from "@/components/global/TableComponent";
import { usePopup } from "@/context/PopupContext";
import { AddCustomerDrawer } from "@/drawers/customer/AddCustomerDrawer";
import { EditCustomerDrawer } from "@/drawers/customer/EditCustomerDrawer";
import { getInitials } from "@/utils/getInitials";
import {
  DownOutlined,
  EditOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Input, MenuProps } from "antd";
import { ColumnType } from "antd/es/table";
import { useState } from "react";
import { useListCustomersQuery } from "../../api/customer.api";
import Heading from "../../components/global/Header";
import StatusTag from "../../components/global/StatusTag";

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
  const { openDrawer } = usePopup();

  const listCustomers = useListCustomersQuery();
  const users = listCustomers.data ?? [];

  const [searchText, setSearchText] = useState<string>(""); // Added state for search input
  // const [filteredData, setFilteredData] = useState(customers); // State for filtered data

  const actions = (user: User): MenuProps["items"] => [
    {
      key: "1",
      label: <DropdownCustomItem label={"Edit"} icon={<EditOutlined />} />,
      onClick: () => openDrawer(<EditCustomerDrawer user={user} />),
    },
    // {
    //   key: "2",
    //   label: (
    //     <DropdownCustomItem
    //       className={twMerge("!text-green-600", isActive() && "!text-red-600")}
    //       label={isActive() ? "Deactivate" : "Activate"}
    //       icon={
    //         isActive() ? (
    //           <CloseCircleOutlined className="!text-base" />
    //         ) : (
    //           <CheckCircleOutlined className="!text-base" />
    //         )
    //       }
    //     />
    //   ),
    //   onClick: () => {
    //     dispatch(
    //       openPopup({
    //         isOpen: isActive()
    //           ? PopupState.DEACTIVATE_CUSTOMER
    //           : PopupState.ACTIVATE_CUSTOMER,
    //         id: props.customer?.id,
    //         isEditingData: true,
    //         action: isActive() ? "deactivate" : "activate",
    //       })
    //     );
    //   },
    // },
  ];

  // const handleSearch = (value: string) => {
  //   setSearchText(value);
  //   const filtered = customers?.filter(
  //     (c) =>
  //       c.name.toLowerCase().includes(value.toLowerCase()) ||
  //       c.email.toLowerCase().includes(value.toLowerCase()) ||
  //       c.phone.includes(value)
  //   );
  //   setFilteredData(filtered);
  // };

  const columns: ColumnType<User>[] = [
    {
      title: "ID",
      dataIndex: "customerId",
      key: "id",
      render: (_, { customer }) => (
        <span className="font-semibold">{customer.customerId}</span>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, { customer }) => (
        <div className="flex space-x-2">
          <Avatar
            className="bg-[#EFF7FB] font-semibold text-[#0A96CC] text-[3px]"
            size={24}
          >
            {getInitials(customer.name)}
          </Avatar>
          <p>{customer.name}</p>
        </div>
      ),
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
      render: (_, { customer }) => <span>{customer.phone}</span>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (_, { customer }) => <span>{customer.address}</span>,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <StatusTag status={isActive ? "Active" : "Inactive"} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, user) => (
        <Dropdown
          menu={{
            items: actions(user),
          }}
          trigger={["click"]}
        >
          <Button icon={<DownOutlined />} iconPosition="end" size="small">
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
            // onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name, email, or phone"
          />
          <Button
            className="flex items-center"
            // onClick={() => setFilteredData(customers)}
          >
            <span>Refresh</span>
            <SyncOutlined />
          </Button>
          <Button
            type="primary"
            className="flex items-center"
            onClick={() => openDrawer(<AddCustomerDrawer />)}
          >
            Add Customer
          </Button>
        </div>
      </section>

      {/* <SummaryCards
        summaryData={[
          { label: "Total", value: 22 },
          { label: "Active", value: 19 },
          { label: "Deactivated", value: 2 },
        ]}
      /> */}

      <TableComponent<User>
        columns={columns}
        dataSource={users}
        loading={listCustomers.isFetching}
      />
    </div>
  );
}

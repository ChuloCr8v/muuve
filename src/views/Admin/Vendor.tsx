import { useState } from "react";
import { Button, Dropdown, Input, Form, Drawer } from "antd";

import { DownOutlined, SearchOutlined, SyncOutlined } from "@ant-design/icons";
import SummaryCards from "../../components/global/SummaryCards";
import VendorDrop from "../../components/customer/VendorDrop";
import Heading from "../../components/global/Header";
import { useListVendorQuery } from "../../api/vendor";
import VendorActionItems from "./adminUtils/VendorActionItems";
import StatusTag from "../../components/global/StatusTag";
import TableComponent from "../../components/global/TableComponent";
import { User } from "../../api/types";
import UpdateVendorDrawer from "./modals/VendorUpdateDrawer";

interface VendorData {
  id: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
}

export interface ActionProps {
  vendor: VendorData;
  onEdit: (vendor: VendorData) => void;
  onDeactivate: (vendor: VendorData) => void;
}

export default function Vendor() {
  const [selectedVendor, setSelectedVendor] = useState<VendorData>();

  const { data: listVendor } = useListVendorQuery();

  console.log(listVendor);

  const [searchText, _setSearchText] = useState<string>("");
  const [_filteredData, setFilteredData] = useState<Array<User>>();

  const { items } = VendorActionItems({ vendor: selectedVendor });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: ["vendor", "companyName"],
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
      render: () => <p>+234 5475 5505</p>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: () => <p>Victoria Island, Lagos</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: string, record: VendorData) => (
        <StatusTag status={record.isActive ? "Active" : "Deactivated"} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: VendorData) => (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Button
            className="flex space-x-2 items-center"
            onClick={() => setSelectedVendor(record)}
          >
            <span>Action</span>
            <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="space-y-[16px] body-pad p-8">
      <section className="flex items-center justify-between">
        <Heading heading={"Vendor"} />
        <div className="flex space-x-[16px]">
          <Input
            className="w-[400px]"
            prefix={<SearchOutlined />}
            value={searchText}
            // onChange={(e) => handleSearch(e.target.value)} // Search handler added
            placeholder="Search by name, email, or phone"
          />
          <Button
            className="flex items-center"
            onClick={() => setFilteredData(listVendor)}
          >
            {/* Reset search to full data */}
            <span className="mt-1">Refresh</span>
            <SyncOutlined />
          </Button>
          <VendorDrop />
        </div>
      </section>

      <SummaryCards
        summaryData={[
          { label: "Total", value: 22 },
          { label: "Active", value: 19 },
          { label: "Deactivated", value: 2 },
        ]}
      />

      <TableComponent
        scroll={{ x: 800 }}
        columns={columns as any}
        dataSource={listVendor ?? []}
      />

      <UpdateVendorDrawer />
    </div>
  );
}

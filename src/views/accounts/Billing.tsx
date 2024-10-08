import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { FiDownloadCloud } from "react-icons/fi";
import Heading from "../../components/global/Header";
import TableComponent from "../../components/global/TableComponent";
import TableRowData from "../../components/global/TableRowData";
import AccountLayout from "./AccountLayout";
import BillingModuleCards from "../../components/accounts/BillingModuleCards";
import DeactivateServiceModal from "../../components/accounts/DeactivateServiceModal";
import dayjs from "dayjs";

interface InvoiceDataInterface {
  id: number;
  date: number;
  description: string;
  noOfServices: number;
  status: string;
}

const invoiceData: InvoiceDataInterface[] = [
  {
    id: 1,
    date: 1727455128,
    description:
      "Vendor Management, Project management, Billing System & Inventory System (Yearly payment)",
    noOfServices: 4,
    status: "active",
  },
  {
    id: 2,
    date: 1727455128,
    description:
      "Vendor Management, Project management, Billing System & Inventory System (Yearly payment)",
    noOfServices: 2,
    status: "disabled",
  },
  {
    id: 3,
    date: 1727455128,
    description:
      "Vendor Management, Project management, Billing System & Inventory System (Yearly payment)",
    noOfServices: 1,
    status: "disabled",
  },
  {
    id: 4,
    date: 1727455128,
    description:
      "Vendor Management, Project management, Billing System & Inventory System (Yearly payment)",
    noOfServices: 4,
    status: "active",
  },
];

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (_: string, record: { date: string }) => {
      return dayjs(record.date).format("MMM DD, YYYY");
    },
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 300,
  },
  {
    title: "No of Services",
    dataIndex: "noOfServices",
    key: "noOfServices",
    align: "center",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Action",
    dataIndex: "",
    key: "action",
    render: () => {
      return (
        <Button icon={<FiDownloadCloud />} iconPosition="end">
          Download
        </Button>
      );
    },
  },
];

const Billing = () => {
  return (
    <AccountLayout>
      <div className="py-6 px-4 mr-4 space-y-4 border rounded-md bg-white">
        <Heading heading="Billing" />
        <BillingModuleCards />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <TableRowData
              mainText="invoice history"
              mainTextStyle="font-semibold"
            />
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Search"
                prefix={<SearchOutlined className="text-grey px-1" />}
              />
              <Button className="text-grey" icon={<DownloadOutlined />}>
                Generate Report
              </Button>
            </div>
          </div>

          <TableComponent
            className="bg-white !rounded-xl"
            scroll={500}
            columns={columns}
            dataSource={invoiceData}
          />
        </div>
      </div>

      <DeactivateServiceModal />
    </AccountLayout>
  );
};

export default Billing;

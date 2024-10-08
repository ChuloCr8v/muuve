import { DownOutlined, SwitcherOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";

import { ColumnProps } from "antd/es/table";
import dayjs from "dayjs";
import { FaBan } from "react-icons/fa";
import { LiaUserCheckSolid } from "react-icons/lia";
import { TbSwitch2 } from "react-icons/tb";
import MenuList from "../../components/global/DropDownMenuList";
import StatusTag from "../../components/global/StatusTag";
import TableRowData from "../../components/global/TableRowData";
import { SubscriptionDataType } from "../../types";

const useSubscriptionTableColumns = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <MenuList
          icon={<TbSwitch2 className="rotate-[-90deg]" />}
          title={"Upgrade/Downgrade"}
        />
      ),
    },
    {
      key: "2",
      label: (
        <MenuList icon={<SwitcherOutlined />} title={"Activate/Deactivate"} />
      ),
    },
    {
      key: "3",
      label: <MenuList icon={<FaBan />} title={"Cancel"} />,
    },
    {
      key: "4",
      label: <MenuList icon={<LiaUserCheckSolid />} title={"Renew"} />,
    },
  ];

  const subscriptionColumns: ColumnProps<SubscriptionDataType>[] = [
    {
      title: "ID",
      dataIndex: "serviceName, ServiceID",
      key: "id",
      render: (_: string, record) => <TableRowData mainText={record.id} />,
    },
    {
      title: "Service",
      dataIndex: "serviceName, ServiceID",
      key: "service",
      render: (_: string, record) => (
        <div>
          <p className="table-text truncate">{record.serviceName}</p>
          <span className="text-[#0A95CCB2] text-[11px]">
            {record.ServiceID}
          </span>
        </div>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customerNameCustomerComapny",
      key: "customer",
      render: (_: string, record) => (
        <div>
          <p className="table-text  truncate">{record.customerName}</p>
          <span className="text-[#0A95CCB2] text-[11px]">
            {record.CustomerComapny}
          </span>
        </div>
      ),
    },
    {
      title: "Period",
      dataIndex: "startDate,endDate",
      key: "period",
      render: (_: string, record) => (
        <div>
          {dayjs(record.startDate).format("MMM DD, YYYY")} to <br></br>
          {dayjs(record.endDate).format("MMM DD, YYYY")}
        </div>
      ),
    },
    {
      title: "Billing Cycle",
      dataIndex: "cycle",
      key: "cycle",
      render: (_: string, record) => (
        <div>
          <p className="table-text  truncate">{record.cycle}</p>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amunt",

      render: (_: string, record) => (
        <p className="table-text  truncate">{record.amount.toLocaleString()}</p>
      ),
    },
    {
      title: "Status",
      dataIndex: "statusStatusDescription",
      key: "status",
      render: (_: any, record) => (
        <div className="">
          <TableRowData
            mainText={<StatusTag status={record?.status} />}
            tagText={
              <p className="text-xs text-primary">
                Renews: {dayjs(record.endDate).format("MMM DD, YYYY")}
              </p>
            }
          />
        </div>
      ),
    },
    {
      title: "",
      key: "action",
      render: () => (
        <Dropdown menu={{ items }}>
          <Button
            type="default"
            className="flex items-center space-x-1 font-semibold btnColor"
          >
            <span>Action</span>
            <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return { subscriptionColumns };
};

export default useSubscriptionTableColumns;

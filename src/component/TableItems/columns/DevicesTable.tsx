import { Checkbox } from "antd";
import TableComponent from "../../Global/TableComponent";
import Devices from "../data/DevicesData";
import DeviceAction from "../../inventory/devices/DeviceActionButton";
import { useState } from "react";

export default function DevicesTable() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [deviceDetail, setDeviceDetails] = useState(false);

  const column = [
    {
      title: <Checkbox />,
      render: () => <Checkbox />,
    },
    {
      title: "Serial Number",
      dataIndex: "id",
    },
    {
      title: "Manufacturere",
      dataIndex: "manufacturer",
    },
    {
      title: "Model",
      dataIndex: "model",
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
    },
    {
      title: "Date Procured",
      dataIndex: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "",
      dataIndex: "",
      render: (record: any) => (
        <DeviceAction
          selectedRow={selectedRow}
          setDeviceDetail={setDeviceDetails}
          deviceDetail={deviceDetail}
          setSelectedRow={setSelectedRow}
          items={record}
        />
      ),
    },
  ];

  return <TableComponent columns={column} dataSource={Devices} />;
}

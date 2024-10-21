import { Button, Input } from "antd";
import { useState } from "react";
import ActionPopup from "../../components/global/ActionPopup";
import Danger from "/dangerSvg.svg";
import {
  OrderedListOutlined,
  PlusOutlined,
  SearchOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import Header from "../../components/global/Header";
//import { columns } from "../../components/data/SurveyTable";
import SummaryCards from "../../components/global/SummaryCards";
import { FaBan } from "react-icons/fa";
import { VscVmActive } from "react-icons/vsc";
import DevicesTable from "../../components/tableItems/columns/DevicesTable";
import DeviceForm from "../../components/inventory/devices/DeviceForm";
// import { SurveyData } from "../../components/data/SurveyData";

export default function Devices() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newdevice, setNewevice] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [devicesPicked, setDevicespicked] = useState(false)



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

  return (
    <div className="space-y-[16px] p-8">
      <div className="flex items-center justify-between">
        <Header heading={"Devices"} />

        <section className="flex items-center gap-[16px]">
          <Input className="w-[400px]" prefix={<SearchOutlined />} />
          <Button>Generate Report</Button>
          <Button>Refresh</Button>

          <Button
            onClick={() => setNewevice(true)}
            className="flex items-center spacex-2"
            type="primary"
          >
            <span>New Device</span>
            <PlusOutlined />
          </Button>
        </section>
      </div>

      <SummaryCards summaryData={summaryCard} />
      <DevicesTable
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        setnewDevice={setNewevice}
      />

      <DeviceForm
        selectedRow={selectedRow}
        open={newdevice}
        setnewDevice={setNewevice}
      />

    </div>
  );
}

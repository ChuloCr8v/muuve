import { Button, Input } from "antd";
import { useState } from "react";
import ActionPopup from "../../component/Global/ActionPopup";
import Danger from "/public/dangerSvg.svg";
import {
  OrderedListOutlined,
  PlusOutlined,
  SearchOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import Header from "../../component/Global/Header";
//import { columns } from "../../component/data/SurveyTable";
import SummaryCards from "../../component/Global/SummaryCards";
import { FaBan } from "react-icons/fa";
import { VscVmActive } from "react-icons/vsc";
import DevicesTable from "../../component/TableItems/columns/DevicesTable";
import DeviceForm from "../../component/inventory/devices/DeviceForm";
// import { SurveyData } from "../../component/data/SurveyData";

export default function Devices() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newdevice, setNewevice] = useState(false);

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
    {
      label: "Expiring",
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
      <DevicesTable />

      <DeviceForm open={newdevice} setnewDevice={setNewevice} />

      <ActionPopup
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        title="Action Required"
        sendButtonText="Send"
        icon={Danger}
        sendButtonStyle="bg-red-600"
      >
        <p>Are you sure you want to proceed with this action?</p>
      </ActionPopup>
    </div>
  );
}

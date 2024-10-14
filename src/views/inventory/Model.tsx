import { Button, Input, Select } from "antd";
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
import SummaryCards from "../../components/global/SummaryCards";
import { FaBan } from "react-icons/fa";
import { VscVmActive } from "react-icons/vsc";
import ModelTable from "../../components/tableItems/columns/ModelTable";
import ModelForm from "../../components/inventory/model/ModelForm";

export default function Model() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newModel, setNewModel] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const summaryCard = [
    {
      label: "Total",
      value: 22,
      icon: <OrderedListOutlined />,
    },
    {
      label: "Low on Stock",
      value: 19,
      icon: <VscVmActive />,
    },
    {
      label: "Out of Stock",
      value: 2,
      icon: <FaBan />,
    },
  ];
  return (
    <div className="space-y-[16px] p-8">
      <div className="flex items-center justify-between">
        <Header heading={"Device Model"} />

        <section className="flex items-center gap-[16px]">
          <Input className="w-[400px]" prefix={<SearchOutlined />} />
          <Select placeholder="Category" />

          <Button>Refresh</Button>

          <Button
            onClick={() => setNewModel(true)}
            className="flex items-center spacex-2"
            type="primary"
          >
            <span>New Model</span>
            <PlusOutlined />
          </Button>
        </section>
      </div>

      <SummaryCards summaryData={summaryCard} />

      <ModelTable
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        setNewModel={setNewModel}
      />

      <ModelForm
        open={newModel}
        setNewModel={setNewModel}
        selectedRow={selectedRow}
      />

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

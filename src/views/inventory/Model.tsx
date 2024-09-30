import {
  Button,
  Input,
  Select,
} from "antd";
import { useState } from "react";
import ActionPopup from "../../component/Global/ActionPopup";
import Danger from "/public/dangerSvg.svg";
import { OrderedListOutlined, PlusOutlined, SearchOutlined, WarningOutlined } from "@ant-design/icons";
import Header from "../../component/Global/Header";
import FormPopup, { Props } from "../../component/Global/FormPopup";
import SummaryCards from "../../component/Global/SummaryCards";
import { FaBan } from "react-icons/fa";
import { VscVmActive } from "react-icons/vsc";
import ModelTable from "../../component/TableItems/columns/ModelTable";
import ModelForm from "../../component/inventory/model/ModelForm";

export default function Model(props: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newModel, setNewModel] = useState(false);


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
    <div className="space-y-[16px]">
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

      <ModelTable setNewModel={setNewModel}/>

      <ModelForm open={newModel} setNewModel={setNewModel}/>



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

import { Button, Input } from "antd";
import { useRef, useState } from "react";
import ActionPopup from "../../components/global/ActionPopup";
import Danger from "/dangerSvg.svg";
import {
  OrderedListOutlined,
  PlusOutlined,
  SearchOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import Header from "../../components/global/Header";
import ReportsTable from "../../components/tableItems/columns/reportTable";
import SummaryCards from "../../components/global/SummaryCards";
import { FaBan } from "react-icons/fa";
import { VscVmActive } from "react-icons/vsc";
import FormPopup from "../../components/global/FormPopup";

export default function Operations() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newSurvey, setNewSurvey] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log("Selected file:", files[0]); // Do something with the selected file
    }
  };

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
        <Header heading={"Performance Report"} />

        <section className="flex items-center gap-[16px]">
          <Input className="w-[400px]" prefix={<SearchOutlined />} />

          <Button>Refresh</Button>

          <Button
            onClick={handleUploadClick}
            // onClick={() => setNewSurvey(true)}
            className="flex items-center spacex-2"
            type="primary"
          >
            <span>Upload Report</span>
            <PlusOutlined />
          </Button>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange} // Handle file selection
          />
        </section>
      </div>

      <SummaryCards summaryData={summaryCard} />

      <ReportsTable />

      <FormPopup
        title={"New Survey Request"}
        open={newSurvey}
        close={() => setNewSurvey(false)}
        submitText={"Submit"}
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

import { OrderedListOutlined, WarningOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { useState } from "react";
import { FaBan } from "react-icons/fa";
import { VscVmActive } from "react-icons/vsc";
import ActionPopup from "../../component/Global/ActionPopup";
import FormPopup from "../../component/Global/FormPopup";
import PageHeader from "../../component/Global/PageHeader";
import SummaryCards from "../../component/Global/SummaryCards";
import TableComponent from "../../component/Global/TableComponent";
import { SurveyData } from "../../component/data/SurveyData";
import { columns } from "../../component/data/SurveyTable";
import Danger from "/public/dangerSvg.svg";

export default function Survey() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newSurvey, setNewSurvey] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (record: any) => {
    setSelectedRowData(record); // Set the selected row data
    setDrawerVisible(true); // Open the drawer
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedRowData(null);
  };

  const summaryData = [
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
    <div className="space-y-3">
      <PageHeader
        heading={"Surveys"}
        onclick={() => console.log("first")}
        handleRefresh={() => console.log("first")}
        handleGenerateReport={() => console.log("first")}
      />

      <SummaryCards summaryData={summaryData} />

      <TableComponent
        columns={columns}
        dataSource={SurveyData}
        scroll={600}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />

      <Drawer
        title="Survey Details"
        placement="right"
        closable={true}
        onClose={closeDrawer}
        open={drawerVisible}
      >
        <p>{selectedRowData?.name}</p>
        <p>{selectedRowData?.age}</p>
        <p>{selectedRowData?.address}</p>
        {/* Add more fields as needed */}
      </Drawer>

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

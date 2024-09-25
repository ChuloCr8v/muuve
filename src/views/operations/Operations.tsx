import { Button, Input, MenuProps, } from "antd";
import { useState } from "react";
import ActionPopup from "../../component/Global/ActionPopup";
import Danger from '/public/dangerSvg.svg'
import { EditOutlined, EyeOutlined, OrderedListOutlined, PlusOutlined, SearchOutlined, WarningOutlined } from "@ant-design/icons";
import Header from "../../component/Global/Header";
import FormPopup, { Props } from "../../component/Global/FormPopup";
import ReportsTable, { columns } from "../../component/TableItems/columns/reportTable";
import SummaryCards from "../../component/Global/SummaryCards";
import { FaBan } from "react-icons/fa";
import { VscVmActive } from "react-icons/vsc";



export default function Operations (props: Props ) {
  
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentTab, setCurrentTab] = useState("1");
    const [newSurvey, setNewSurvey] = useState(false)
    const [drawerVisible, setDrawerVisible] = useState(false);

   




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

  
    return(
        <div className="space-y-[16px]">
          <div className="flex items-center justify-between">
          <Header heading={"Performance Report"} />

          <section className="flex items-center gap-[16px]">
                <Input className="w-[400px]" prefix={<SearchOutlined/>}/>
                
                <Button>Refresh</Button>


                <Button
                // onClick={() => setNewSurvey(true)}
                className="flex items-center spacex-2"
                  type="primary">
                  <span>Upload Report</span>
                  <PlusOutlined />
                </Button>
            </section>

          </div>

         <SummaryCards  summaryData={summaryCard}/>


          
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
        sendButtonStyle="bg-red-600">
        <p>Are you sure you want to proceed with this action?</p>
      </ActionPopup>


        </div>
    )
}
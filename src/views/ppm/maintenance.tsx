import { Button, Drawer, Form, Input, Select, Table, Tabs, TabsProps } from "antd";
import { useState } from "react";
import ActionPopup from "../../component/Global/ActionPopup";
import Danger from '/public/dangerSvg.svg'
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { twMerge } from "tailwind-merge";
import Header from "../../component/Global/Header";
import FormPopup, { Props } from "../../component/Global/FormPopup";
import { columns } from "../../component/data/SurveyTable";
import { SurveyData } from "../../component/data/SurveyData";
// import { SurveyData } from "../../component/data/SurveyData";



export default function Maintenance (props: Props ) {
  
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentTab, setCurrentTab] = useState("1");
    const [newSurvey, setNewSurvey] = useState(false)
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    // const initialItems = ['Customer Survey'];

    const handleRowClick = (record: any) => {
      setSelectedRowData(record);  // Set the selected row data
      setDrawerVisible(true);      // Open the drawer
    };

    const closeDrawer = () => {
      setDrawerVisible(false);
      setSelectedRowData(null);
    };

    

    const Count = (props: { title: string; count: number; id: string }) => {
      return (
        <div className="flex items-center gap-2 font-semibold">
          <p className={twMerge("", currentTab === props.id && "")}>
            {props.title}{" "}
          </p>
          <div
            className={twMerge(
              "bg-off_white text-light_gray flex items-center justify-center rounded-[2px] h-5 w-5 text-[10px] font-semibold",
              currentTab === props.id && "bg-[#0A95CC] text-white "
            )}
          >
            {props.count}
          </div>
        </div>
      );
    };

    const tabItems: TabsProps["items"] = [
      {
        key: "1",
        label: <Count title={"All"} count={22} id={"1"} />,
      },
      {
        key: "2",
        label: <Count title={"Pending"} count={33} id={"2"} />,
      },
      {
        key: "3",
        label: <Count title={"Rejected"} count={48} id={"3"} />,
      },
      {
        key: "4",
        label: <Count title={"Completed"} count={7} id={"4"} />,
      },
    ];

    // const columns = [
    //   {
    //     title: 'ID',
    //     dataIndex: 'name',
    //     key: 'name',
    //   },
    //   {
    //     title: 'Name',
    //     dataIndex: 'age',
    //     key: 'age',
    //   },
    //   {
    //     title: 'Service Type',
    //     dataIndex: 'address',
    //     key: 'address',
    //   },
    //   {
    //     title: 'Status',
    //     dataIndex: 'address',
    //     key: 'address',
    //   },
    //   {
    //     title: 'SLA',
    //     dataIndex: 'address',
    //     key: 'address',
    //   },
    //   {
    //     title: 'Action',
    //     dataIndex: 'address',
    //     key: 'address',
    //   },
    // ];

  

    const handleTabChange = (key: string) => {
      setCurrentTab(key);
    };
    return(
        <div className="space-y-[16px]">
          <div className="flex items-center justify-between">
          <Header heading={"Maintenance"} />

          <section className="flex items-center gap-[16px]">
                <Input className="w-[300px]" prefix={<SearchOutlined/>}/>
                <Button>Generate Report</Button>
                <Button>Refresh</Button>


                <Button
                // onClick={() => setNewSurvey(true)}
                className="flex items-center spacex-2"
                  type="primary">
                  <span>New Maintenance</span>
                  <PlusOutlined />
                </Button>
            </section>

          </div>

          <Tabs
            defaultActiveKey="1"
            items={tabItems}
            onChange={handleTabChange}
          />
          <div className="max-w-[calc(100vw-2rem)] bg-white rounded-lg border-t-[1.5px] border-[#E9EAEB]  shadow-sm shadow-[#E9EAEB] space-y-[24px]">
            {/* <Table columns={columns}/> */}
            
          </div>

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
      <Table 
        
        // dataSource={}
        columns={columns} dataSource={SurveyData}
        onRow={(record) => ({
          onClick: () => handleRowClick(record), // Handle row click
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

        </div>
    )
}
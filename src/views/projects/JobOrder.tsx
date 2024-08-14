import { Button, Input, Table, Tabs, TabsProps } from "antd";
import { useState } from "react";
import ActionPopup from "../../component/Global/ActionPopup";
import Danger from '/public/dangerSvg.svg'
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { twMerge } from "tailwind-merge";
import Header from "../../component/Global/Header";
import SurveyTable from "../../component/data/SurveyTable";

export default function JobOrder () {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentTab, setCurrentTab] = useState("1");

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
        label: <Count title={"Active"} count={33} id={"2"} />,
      },
      {
        key: "3",
        label: <Count title={"Deactivated"} count={48} id={"3"} />,
      },
      {
        key: "4",
        label: <Count title={"Expiring"} count={7} id={"4"} />,
      },
    ];

    const columns = [
      {
        title: 'ID',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Name',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Service Type',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Status',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'SLA',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Action',
        dataIndex: 'address',
        key: 'address',
      },
    ];

    const handleTabChange = (key: string) => {
      setCurrentTab(key);
    };
    return(
        <div className="space-y-[16px]">
          <div className="flex items-center justify-between">
          <Header heading={"Job Order"}/>

          <section className="flex items-center gap-[16px]">
                <Input className="w-[400px]" prefix={<SearchOutlined/>}/>
                <Button>Refresh</Button>


                <Button
                className="flex items-center spacex-2"
                  type="primary">
                  <span>New Job Order</span>
                  <PlusOutlined />
                </Button>
            </section>

          </div>

          <Tabs
            defaultActiveKey="1"
            items={tabItems}
            onChange={handleTabChange}
          />
          <div className="max-w-[calc(100vw-2rem)] bg-white rounded-lg border-t-[1.5px] border-[#5656561A]  shadow-sm shadow-[#5656561A] space-y-[24px]">
            {/* <Table columns={columns}/> */}
            <SurveyTable />
          </div>
          
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
import { Tabs, TabsProps } from "antd";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import CustomerView from "./CustomerView";

// import { useListOrgCusQuery } from "../../api/collections/org.api";
// import Loading from "../../common/Loading";


const CustomerTab = () => {
  // const { data: customers, isLoading: loadingCustomers } = useListOrgCusQuery();

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
            currentTab === props.id && "bg-primary_color text-white"
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
      label: <Count title={"All"} count={20} id="1" />,
      children: (
        <CustomerView />
      ),
    },
    {
      key: "2",
      label: <Count title={"Active"} count={20} id="2" />,
      children: (
        <CustomerView />
      ),
    },
    {
      key: "3",
      label: <Count title={"Deactivated"} count={0} id="3" />,
      children: (
        <CustomerView  />
      ),
    },
  ];

  const handleTabChange = (key: string) => {
    setCurrentTab(key);
  };

  return (
    <div className="grid ">
      <div className="">
        {/* {loadingCustomers ? (
          <Loading />
        ) : ( */}
          <Tabs
            defaultActiveKey="1"
            items={tabItems}
            onChange={handleTabChange}
          />
        {/* )} */}
      </div>
    </div>
  );
};

export default CustomerTab;

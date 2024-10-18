import { Breadcrumb, Tabs, TabsProps } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import Heading from "../../../../components/global/Header";
import ProjectManagementSLAConfig from "../../../../components/SLAConfig/ProjectManagementSLAConfig";
import BillingSLAConfig from "../../../../components/SLAConfig/BillingSLAConfig";
import { twMerge } from "tailwind-merge";

const SLAConfig = () => {
  const [currentModule, setCurrentModule] = useState("Project Management");
  const [currentItem, setCurrentItem] = useState<string>("Survey Request");

  const options: TabsProps["items"] = [
    {
      key: "1",
      label: "Project Management",
      children: (
        <ProjectManagementSLAConfig
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
        />
      ),
    },
    {
      key: "2",
      label: "Billing",
      children: (
        <BillingSLAConfig
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
        />
      ),
    },
  ];

  const onChange = (tabID: string) => {
    setCurrentModule(tabID === "1" ? "Project Management" : "Billing");

    console.log(typeof tabID);
  };

  return (
    <div className="bg-white min-h-[calc(100vh-200px)] p-8 space-y-2">
      <Breadcrumb
        items={[
          {
            title: <Link to={"/admin/config"}>Configuration</Link>,
          },
          {
            title: "SLA",
          },
          {
            title: currentModule,
          },
          {
            title: <span className="text-primary">{currentItem}</span>,
          },
        ]}
      />

      <div className="h-full">
        <Heading heading="SLAs" />

        <div className="grid grid-cols-8 items-start gap-4 h-full">
          <Tabs
            defaultActiveKey="1"
            className="col-span-6"
            items={options.map((option, index) => ({
              ...option,
              key: String(index + 1),
            }))}
            onChange={onChange}
          />
          {/* right side nav */}
          <div className="col-span-2 h-full border rounded-md space-y-2 p-4">
            <p className="text-base font-semibold capitalize">Flow Options</p>

            <ol className="text-[13px] space-y-1">
              <li
                className={twMerge(
                  "text-grey cursor-pointer hover:text-primary",
                  currentItem.toLowerCase() === "survey request" &&
                    "text-primary font-semibold"
                )}
                onClick={() => setCurrentItem("Survey Request")}
              >
                Survey Request
              </li>
              <li
                className={twMerge(
                  "text-grey cursor-pointer hover:text-primary",
                  currentItem.toLowerCase() === "job orders" &&
                    "text-primary font-semibold"
                )}
                onClick={() => setCurrentItem("Job Orders")}
              >
                Job Order
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SLAConfig;

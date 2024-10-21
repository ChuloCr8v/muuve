import { Breadcrumb, Tabs, TabsProps } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import Heading from "../../../../components/global/Header";
import ProjectManagementSLAConfig from "../../../../components/SLAConfig/ProjectManagementSLAConfig";
import BillingSLAConfig from "../../../../components/SLAConfig/BillingSLAConfig";
import SLASubMenu from "../../../../components/SLAConfig/SLASubMenu";

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
            title: (
              <span className="text-primary capitalize">{currentItem}</span>
            ),
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
          <SLASubMenu
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
          />
        </div>
      </div>
    </div>
  );
};

export default SLAConfig;

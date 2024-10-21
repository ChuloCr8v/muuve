import { Drawer } from "antd";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import DeviceOverview from "./DeviceOverview";
import DeviceHistory from "./DeviceHistory";
import Notes from "../model/ModelNotes";
import DeviceNotes from "./DeviceNotes";

interface Prop {
  selectedRow: any;
  deviceDetail: any;
  setDeviceDetail: any;
}

export default function DeviceDetails(props: Prop) {
  const { selectedRow, deviceDetail, setDeviceDetail } = props;
  const [activeTab, setActiveTab] = useState("Overview");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };
  return (
    <Drawer
      closeIcon={null}
      footer={null}
      title={
        <div className="">
          <div className="flex justify-between py-1">
            <p className="text-[20px] text-[#262626] ">{selectedRow?.model?.name}</p>
            {/* <Dropdown trigger={['click']} menu={{ items }}>
                <Button
                  style={{ fontWeight: 600 }}
                  className="flex items-center space-x-[4px] border-[#0A96CC] text-[#0A96CC]"
                >
                  <span>Action</span>
                  <DownOutlined />
                </Button>
              </Dropdown> */}
          </div>

          <div className="text-[14px] flex  space-x-[32px] relative bottom-[-18px]">
            <p
              onClick={() => handleTabClick("Overview")}
              className={twMerge(
                "pb-2 px-[16px] cursor-pointer text-[#595959] hover:text-[#0A96CC]",
                activeTab === "Overview" &&
                  "border-b-[3px] border-[#0A96CC] text-[#0A96CC]"
              )}
            >
              Overview
            </p>
            <p
              onClick={() => handleTabClick("History")}
              className={twMerge(
                "pb-2 px-[16px] cursor-pointer  text-[#595959] hover:text-[#0A96CC]",
                activeTab === "History" &&
                  "border-b-[3px] border-[#0A96CC] text-[#0A96CC]"
              )}
            >
              History
            </p>
            <p
              onClick={() => handleTabClick("Notes")}
              className={twMerge(
                "pb-2 px-[16px] cursor-pointer  text-[#595959] hover:text-[#0A96CC]",
                activeTab === "Notes" &&
                  "border-b-[3px] border-[#0A96CC] text-[#0A96CC]"
              )}
            >
              Notes
            </p>
          </div>
        </div>
      }
      width={activeTab === "Details" ? 500 : 700}
      open={deviceDetail}
      onClose={() => setDeviceDetail(false)}
    >
      {activeTab === "Overview" ? (
        <DeviceOverview data={selectedRow} />
      ) : activeTab === "History" ? (
        <DeviceHistory data={selectedRow} />
      ) : (
        <DeviceNotes data={selectedRow} />
      )}
    </Drawer>
  );
}

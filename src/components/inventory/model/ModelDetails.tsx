import { Drawer } from "antd";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import ModelOverview from "./ModelOverview";
import ModelStock from "./ModelStock";
import ModelHistory from "./ModelHistory";
import Notes from "./ModelNotes";

interface Prop {
  modelDetails: boolean;
  setModelDetails: any;
  selectedRow: any;
}

export default function ModelDetails(props: Prop) {
  const modelDetails = props.modelDetails;
  const setModelDetails = props.setModelDetails;
  const selectedRow = props.selectedRow;
  const [activeTab, setActiveTab] = useState("Overview");

  console.log(selectedRow);

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
            <p className="text-[20px] text-[#262626] ">{selectedRow?.name}</p>
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
              onClick={() => handleTabClick("Stock")}
              className={twMerge(
                "pb-2 px-[16px] cursor-pointer  text-[#595959] hover:text-[#0A96CC]",
                activeTab === "Stock" &&
                  "border-b-[3px] border-[#0A96CC] text-[#0A96CC]"
              )}
            >
              Stock
            </p>
            {/* <p
                onClick={() => handleTabClick('History')}
                className={twMerge(
                  'pb-2 px-[16px] cursor-pointer  text-[#595959] hover:text-[#0A96CC]',
                  activeTab === 'History' &&
                    'border-b-[3px] border-[#0A96CC] text-[#0A96CC]',
                )}
              >
                History
              </p> */}
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
      open={modelDetails}
      onClose={() => setModelDetails(false)}
    >
      {activeTab === "Overview" ? (
        <ModelOverview data={selectedRow} />
      ) : activeTab === "Stock" ? (
        <ModelStock data={selectedRow} />
      ) : activeTab === "History" ? (
        <ModelHistory data={selectedRow} />
      ) : (
        <Notes data={selectedRow} />
      )}
    </Drawer>
  );
}

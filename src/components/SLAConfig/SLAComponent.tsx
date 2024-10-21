import { Button, Dropdown, Select } from "antd";
import TableRowData from "../global/TableRowData";
import { CalendarOutlined } from "@ant-design/icons";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import {
  surveyRequestsSLAData,
  jobOrderSLAData,
  durationOptions,
} from "./SLAListData";

export type SLAComponentProps = {
  currentItem: string;
  setCurrentItem: (arg: string) => void;
};

const SLAComponent = (props: SLAComponentProps) => {
  const [currentSLAData, setCurrentSLAData] = useState<
    Array<{ title: string; subtitle: string }>
  >([]);

  useEffect(() => {
    setCurrentSLAData(
      props.currentItem.toLowerCase() === "survey request"
        ? surveyRequestsSLAData
        : jobOrderSLAData
    );
  }, [props.currentItem]);

  const SLAConfigItems = [
    {
      key: "1",
      label: (
        <div
          className=""
          onClick={() => props.setCurrentItem("Survey Request")}
        >
          <span className="">Survey Request</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="" onClick={() => props.setCurrentItem("Job Order")}>
          <span className="">Job Order</span>
        </div>
      ),
    },
  ];

  const calendarTypeOptions = [
    {
      label: (
        <div className="">
          <CalendarOutlined className="mr-2" /> Sample 9-5 Calendar (Working
          Hours)
        </div>
      ),
      value: "workingHours",
    },
    {
      label: (
        <div className="">
          <CalendarOutlined className="mr-2" /> 24/7 Calendar (Round Clock)
        </div>
      ),
      value: "roundClock",
    },
  ];

  return (
    <div className="rounded-md border p-4 w-full">
      <div className="flex items-center justify-between border-b pb-4">
        <Dropdown menu={{ items: SLAConfigItems }}>
          <div className="cursor-pointer flex items-center gap-2 hover:!text-primary group">
            <span className="font-semibold capitalize text-customBlack text-lg group-hover:text-primary duration-200">
              {props.currentItem}
            </span>
            <IoChevronDownCircleOutline className="text-lg duration-200" />
          </div>
        </Dropdown>

        <Button type="primary" className="w-[100px] h-7">
          Save
        </Button>
      </div>

      <div className="">
        {currentSLAData.map((data) => (
          <div
            className="grid grid-cols-5 gap-4 py-4 border-b"
            key={data.title}
          >
            <TableRowData
              wrapperClassName="col-span-2"
              mainText={data.title}
              tagText={data.subtitle}
              mainTextStyle="font-semibold text-customBlack"
              tagTextStyle="!text-[#777777] !normal-case mt-2"
            />
            <div className="flex gap-4 w-full col-span-3">
              <div className="flex flex-col items-start gap-1 w-full">
                <p className="font-medium">Calendar Type</p>
                <Select
                  className="w-full h-7"
                  options={calendarTypeOptions}
                  placeholder={"Choose Calendar Type"}
                />
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="font-medium">
                  Duration <span className="text-gray-500">(in hours)</span>
                </p>
                <Select
                  className="w-full h-7"
                  options={durationOptions}
                  placeholder={"Choose Duration"}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SLAComponent;

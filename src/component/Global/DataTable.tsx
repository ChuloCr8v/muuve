import React, { useState } from "react";
import { Button, Checkbox, Table, Tooltip } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import Dots from "../../../public/4dots.png";
import { twMerge } from "tailwind-merge";
// import { columns } from '../data/SurveyTable';

interface DataTableProps {
  columns: any[];
  data: any[];
  loading?: boolean;
  className?: string;
  rowKey?: (arg0: any) => {};
  pagination?: object;
  // CheckboxOptionType?: any[];
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  loading = false,
  className,
  rowKey,
  pagination = { pageSize: 10 }, // Default pagination configuration
}) => {
  const defaultCheckedList = columns.map((item) => item.key as string);
  const [checkedList, _setCheckedList] = useState(defaultCheckedList);
  const newColumns = columns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key as string),
  }));
  const [showCheckList, setShowCheckList] = useState(false);
  const [columnss, setColumnss] = useState(newColumns);

  const handleCheckboxChange = (e: CheckboxChangeEvent, columnKey: string) => {
    if (e.target.checked) {
      // Add the column back if checked
      const columnToAdd = newColumns.find((col) => col.key === columnKey);
      setColumnss((prevColumns) => [...prevColumns, columnToAdd!]);
    } else {
      // Remove the column if unchecked
      setColumnss((prevColumns) =>
        prevColumns.filter((col) => col.key !== columnKey)
      );
    }
  };

  const checkData = newColumns.map((col) => ({
    key: col.key,
    title: col.title,
    checkbox: (
      <Checkbox
        defaultChecked
        onChange={(e) => handleCheckboxChange(e, col.key)}
      />
    ),
  }));

  const checkColumns = [
    { title: "", dataIndex: "checkbox", key: "checkbox" },
    { title: "Column", dataIndex: "title", key: "title" },
  ];

  return (
    <div className="h-fit flex space-x-[8px]">
      <div
        className={twMerge("w-[98%] ", showCheckList ? "w-[90%]  " : "w-[98%]")}
      >
        <Table
          columns={columnss}
          dataSource={data}
          loading={loading}
          onRow={rowKey}
          className={twMerge(className, "border rounded-md")}
          scroll={{ x: 700 }}
          pagination={pagination}
          size="small"
        />
      </div>

      <div
        className={twMerge(
          "w-[2%] border-[1.5px]  rounded-md  items-center justify-center flex",
          showCheckList
            ? " border rounded-md w-[10%]  "
            : "w-[2%] pl-2 ml-4 flex items-center justify-center "
        )}
      >
        {showCheckList ? (
          <div className="items-center justify-between h-full ">
            <Table
              columns={checkColumns}
              dataSource={checkData}
              pagination={false}
              size="small"

              // showHeader={false}
              // bordered={false}
            />

            <Button
              type="default"
              className="mt-[20px]"
              onClick={() => setShowCheckList(false)}
            >
              Reset
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Tooltip title="Reset Columns">
              <img
                onClick={() => setShowCheckList(true)}
                className="items-center "
                src={Dots}
              />
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;

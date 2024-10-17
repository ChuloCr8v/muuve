import { Table } from "antd";
import { Key } from "react";
import { twMerge } from "tailwind-merge";
import type { ColumnsType, TableProps } from "antd/es/table";

type DataType = {
  key: string | number;
  [key: string]: any;
};

type Props = {
  columns: ColumnsType<DataType>;
  dataSource: any;
  onRow?: TableProps["onRow"];
  scroll?: number | { x?: number | true; y?: number };
  className?: string;
  loading?: boolean;
};

const TableComponent = ({
  columns,
  dataSource,
  onRow,
  scroll,
  className,
  loading,
}: Props) => {
  const rowSelection = {
    onChange: (selectedRowKeys: Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  // add key to data for selection purpose
  const data = dataSource.map((item) => ({ ...item, key: item.id }));

  return (
    <Table
      rowSelection={rowSelection}
      pagination={{ pageSize: 10 }}
      loading={loading}
      columns={columns}
      dataSource={data}
      onRow={onRow}
      scroll={typeof scroll === "number" ? { x: scroll } : scroll}
      size="small"
      className={twMerge(className, "bg-white border rounded-md")}
    />
  );
};

export default TableComponent;

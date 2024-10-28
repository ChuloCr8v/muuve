import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Key } from "react";
import { twMerge } from "tailwind-merge";

type Props<T> = {
  columns: ColumnsType<T>;
  dataSource: T[];
  // onRow?: TableProps<T>["onRow"];
  scroll?: number | { x?: number | true; y?: number };
  className?: string;
  loading?: boolean;
  onRow?: (record: T) => void;
};

const TableComponent = <T extends { id: Key }>({
  columns,
  dataSource,
  scroll,
  className,
  loading,
  onRow,
}: Props<T>) => {
  // add key to data for selection purpose
  const data = dataSource?.map((item: T) => ({ ...item, key: item.id }));

  return (
    <Table
      pagination={{ pageSize: 10 }}
      loading={loading}
      columns={columns}
      dataSource={data}
      onRow={(record) => ({
        onClick: () => onRow?.(record),
      })}
      scroll={typeof scroll === "number" ? { x: scroll } : scroll}
      size="small"
      className={twMerge(
        className,
        "bg-white border rounded-md cursor-pointer"
      )}
    />
  );
};

export default TableComponent;

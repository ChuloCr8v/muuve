import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Key, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props<T> = {
  columns: ColumnsType<T>;
  dataSource: T[];
  scroll?: number | { x?: number | true; y?: number };
  className?: string;
  loading?: boolean;
  onRow?: (record: T) => void;
  isRowSelection?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
};

const TableComponent = <T extends { id: Key }>({
  columns,
  dataSource,
  scroll,
  className,
  loading,
  onRow,
  isRowSelection = false,
  onSelectionChange,
}: Props<T>) => {
  const data = dataSource?.map((item: T) => ({ ...item, key: item.id }));

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    const selectedRows =
      data?.filter((item) => newSelectedRowKeys.includes(item.key)) || [];

    onSelectionChange?.(selectedRows);
  };

  const rowSelection = isRowSelection
    ? {
        selectedRowKeys,
        onChange: onSelectChange,
      }
    : undefined;

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
      rowSelection={rowSelection}
    />
  );
};

export default TableComponent;

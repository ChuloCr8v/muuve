import { Table } from "antd";
import { twMerge } from "tailwind-merge";

type Props = {
  columns: Array<object>;
  dataSource: Array<object>;
  onRow?: () => {};
  scroll?: number;
  className: string;
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
  return (
    <Table
      pagination={{ pageSize: 10 }}
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      onRow={onRow}
      scroll={{ x: scroll ?? 1000 }}
      size="small"
      className={twMerge(className, "border rounded-md")}
    />
  );
};

export default TableComponent;

import React from 'react';
import { Table } from 'antd';

interface DataTableProps {
  columns: any[];
  data: any[];
  loading?: boolean;
  rowKey?: string | ((record: any) => string);
  pagination?: object;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  loading = false,
  rowKey = 'id', // Default rowKey is 'id'. 
  pagination = { pageSize: 10 }, // Default pagination configuration
}) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey={rowKey}
      pagination={pagination}
    />
  );
};

export default DataTable;

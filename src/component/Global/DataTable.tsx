import React, { useState } from 'react';
import { Button, Checkbox, Table, Tooltip } from 'antd';
import { CheckboxChangeEvent, CheckboxOptionType } from 'antd/es/checkbox';
import Dots from '../../../public/4dots.png'
import { twMerge } from 'tailwind-merge';
// import { columns } from '../data/SurveyTable';

interface DataTableProps {
  columns: any[];
  data: any[];
  loading?: boolean;
  rowKey?: string | ((record: any) => string);
  pagination?: object;
  // CheckboxOptionType?: any[];
}



const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  loading = false,
  rowKey = 'id', // Default rowKey is 'id'. 
  pagination = { pageSize: 10 }, // Default pagination configuration
}) => {
  
  const defaultCheckedList = columns.map((item) => item.key as string);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const newColumns = columns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key as string),
  }));
  const [showCheckList, setShowCheckList] = useState(false)
    const [columnss, setColumnss] = useState(newColumns);

  const handleCheckboxChange = (e: CheckboxChangeEvent, columnKey: string) => {
    if (e.target.checked) {
      // Add the column back if checked
      const columnToAdd = newColumns.find((col) => col.key === columnKey);
      setColumnss((prevColumns) => [...prevColumns, columnToAdd!]);
    } else {
      // Remove the column if unchecked
      setColumnss((prevColumns) => prevColumns.filter((col) => col.key !== columnKey));
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
    { title: 'Check', dataIndex: 'checkbox', key: 'checkbox' },
    { title: 'Column', dataIndex: 'title', key: 'title' },
  ];


  return (
    <div className='h-fit flex'>
      <div className={twMerge('w-[98%] ', showCheckList ? 'w-[90%]  ': 'w-[98%]')}>
      <Table
      columns={columnss}
      dataSource={data}
      loading={loading}
      rowKey={rowKey}
      pagination={pagination}
      size='small'
    />
      </div>
      
    <div className={twMerge('w-[2%] ', showCheckList ? 'ml-2 border w-[10%]  ':  'w-[2%] pl-2 ml-4 flex items-center justify-center ')} >
      
        {showCheckList ? <div className='flex flex-col items-center justify-center h-full space-y-2 pb-2'>
          <Table
            columns={checkColumns}
            dataSource={checkData}
            pagination={false}
            size='small'
          
            // showHeader={false}
            // bordered={false}
          />

           <Button className='w-[50%] mx-auto h-6 'type='primary' onClick={() => setShowCheckList(false)}>Reset</Button>
           </div>
            :(
            <div className=''>
              <Tooltip title="Reset Columns">
                <img onClick={() => setShowCheckList(true)} className='m-auto items-center' src={Dots}/>
              </Tooltip>
            </div>
            )
      }
    </div>


    
  
    </div>
  );
};

export default DataTable;

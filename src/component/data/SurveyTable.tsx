import React from 'react';
import { Table } from 'antd';
// import Survey from '../../views/projects/Survey';
import { SurveyData } from './SurveyData';
import DataTable from '../Global/DataTable';

export interface DataType {
  key: string;
  customerName: string;
  serviceAddress: string;
  serviceType: string;
  requestType: string;
  manager: string;
  bandwidth: string;
  region: string;
  state: string;
  longitude: string;
  latitude: string;
  
}


export const columns = [
  {
    title: 'Customer Name',
    dataIndex: 'customerName',
    key: 'customerName',
  },
  {
    title: 'Service Address',
    dataIndex: 'serviceAddress',
    key: 'serviceAddress',
  },
  {
    title: 'Service Type',
    dataIndex: 'serviceType',
    key: 'serviceType',
  },
  {
    title: 'Request Type',
    dataIndex: 'requestType',
    key: 'requestType',
  },
  {
    title: 'Manager',
    dataIndex: 'manager',
    key: 'manager',
  },
  {
    title: 'Bandwidth',
    dataIndex: 'bandwidth',
    key: 'bandwidth',
  },
  {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: 'Longitude',
    dataIndex: 'longitude',
    key: 'longitude',
  },
  {
    title: 'Latitude',
    dataIndex: 'latitude',
    key: 'latitude',
  },
];

const SurveyTable: React.FC = () => {
  return <DataTable data={SurveyData} columns={columns} />;
};

export default SurveyTable;

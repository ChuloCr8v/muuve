import { Select } from "antd";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Heading from "../../../components/global/Header";
import StatusTag from "../../../components/global/StatusTag";
import TableComponent from "../../../components/global/TableComponent";
import Filters from "./Filters";
import SummaryCards from "../../../components/global/SummaryCards";
import { servicesData } from "../../../dummy/servicesData";
import useFormatDate from "../../../hooks/useFormatDate";
import { ColumnsType } from "antd/es/table";
import { ServiceType } from "../../../types";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const Services = () => {
  const { formatDate } = useFormatDate();

  const columns: ColumnsType<ServiceType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Service",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Plans",
      dataIndex: "plans",
      key: "id",
      render: (_: string, records) => {
        return <p className="">{records.plans.length}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "id",
      render: (_: any, records: ServiceType) => {
        return <StatusTag status={records?.status} />;
      },
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "id",
      render: (_: any, records: ServiceType) => {
        return <p className="">{formatDate(records?.dateCreated)}</p>;
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "id",
      render: () => {
        return (
          <ArrowRightOutlined className="cursor-pointer hover:text-primary duration-200" />
        );
      },
    },
  ];

  const summaryData = [
    {
      label: "total",
      value: 20,
    },
    {
      label: "active",
      value: 10,
    },
    {
      label: "deactivated",
      value: 10,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-3 p-8 body-pad">
      <div className="grid w-full gap-4 ">
        <div className="flex items-center justify-between w-full">
          <Heading heading={"Services"} />
          <Filters showNewServiceButton />
        </div>

        <SummaryCards summaryData={summaryData} />
        <TableComponent
          columns={columns}
          dataSource={servicesData}
          onRow={(record) => {
            return {
              onClick: () => {
                navigate(`/billing/services/plan/${record.id}`);
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default Services;

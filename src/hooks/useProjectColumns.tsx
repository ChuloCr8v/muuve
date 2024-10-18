import { Button, Dropdown } from "antd";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import { SurveyDataType } from "../types";
import SLATime from "./useGetSLA";
import useJobOrderActionItems from "./useJobOrderActionItems";
import useSurveyActionItems from "./useSurveyActionItems";
import TableRowData from "../components/global/TableRowData";
import { useState } from "react";

const useProjectColumns = (currentProject?: string) => {
  const [currentProjectId, setCurrentProjectId] = useState("");
  const { jobOrderActionItems } = useJobOrderActionItems(
    currentProjectId ?? ""
  );
  const { surveyActionItems } = useSurveyActionItems();

  const projectColumns: ColumnType<SurveyDataType>[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (_: "string", record) => <TableRowData mainText={record.id} />,
    },
    {
      title: "Name",
      dataIndex: "customerName",
      key: "customerName",
      render: (_: "string", record) => (
        <TableRowData
          mainText={record.customerName}
          tagText={record.serviceAddress}
        />
      ),
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
      key: "serviceType",
      render: (_: "string", record) => (
        <TableRowData
          mainText={record.serviceType}
          tagText={record.requestType}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <TableRowData
          mainText={record.status}
          tagText={record.manager}
          mainTextStyle={`${
            record.status.toLowerCase() === "completed" && "text-primary"
          }`}
        />
      ),
    },
    {
      title: "SLA",
      dataIndex: ["sla", "due"],
      key: "requestType",
      render: (_, record) => (
        <TableRowData
          mainText={<SLATime sla={record.dueDate} status={record.status} />}
          tagText={`Due: ${dayjs(record.dueDate).format("DD MMM YYYY")}`}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "latitude",
      key: "latitude",
      width: 150,
      render: (_: string, records) => (
        <Dropdown
          trigger={["click"]}
          onOpenChange={() => setCurrentProjectId(records.id)}
          menu={{
            items:
              currentProject?.toLowerCase() === "survey"
                ? surveyActionItems
                : jobOrderActionItems,
          }}
        >
          <Button
            size="small"
            className="px-4 text-grey"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Action
          </Button>
        </Dropdown>
      ),
    },
  ];

  return { projectColumns };
};

export default useProjectColumns;

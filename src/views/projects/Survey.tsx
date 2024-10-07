import { CloudUploadOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import { BiTrash } from "react-icons/bi";
import { CgCloseO } from "react-icons/cg";
import { GrAtm } from "react-icons/gr";
import { LuUserCheck } from "react-icons/lu";
import { PiUserSwitch } from "react-icons/pi";
import DropdownCustomItem from "../../components/global/DropdownCustomItem";
import PageHeader from "../../components/global/PageHeader";
import SummaryCards from "../../components/global/SummaryCards";
import TableComponent from "../../components/global/TableComponent";
import TableRowData from "../../components/global/TableRowData";
import SurveyDetailsDrawer from "../../components/projects/survey/SurveyDetailsDrawer";
import { SurveyData } from "../../components/tableItems/data/SurveyData";
import { usePopup } from "../../context/PopupContext";
import { NewSurveyDrawer } from "../../drawers/projects/NewSurveyDrawer";
import SLATime from "../../hooks/useGetSLA";
import { SurveyDataType } from "../../types";
import { useListSurveysQuery } from "../../api/project.api";

const Survey = () => {
  const { openDrawer } = usePopup();

  const { data } = useListSurveysQuery();
  console.log(data);

  const surveyData = data?.map((sd) => ({}));

  const summaryData = [
    {
      label: "Total",
      value: 22,
    },
    {
      label: "Active",
      value: 19,
    },
    {
      label: "Deactivated",
      value: 2,
    },
    {
      label: "Expiring",
      value: 1,
    },
  ];

  const surveyActionItems: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <DropdownCustomItem
          label={"Edit Details"}
          icon={<EyeOutlined className="" />}
        />
      ),
      // onClick: () => showModal('Edit Details', '/path/to/edit-icon.svg'),
    },
    {
      key: 2,
      label: (
        <div
          className=""
          // onClick={(e) => handleShowPopup(e, "initiate payment")}
        >
          <DropdownCustomItem
            label={"Initiate Payment"}
            icon={<GrAtm className="" />}
          />
        </div>
      ),
    },

    {
      key: 3,
      label: (
        <div className="" onClick={() => {}}>
          <DropdownCustomItem
            label={"Upload Receipt"}
            icon={<CloudUploadOutlined className="" />}
          />
        </div>
      ),
    },
    {
      key: 4,
      label: (
        <div className="">
          <DropdownCustomItem
            label={"Assign Survey"}
            icon={<LuUserCheck className="" />}
          />
        </div>
      ),
    },

    {
      key: 5,
      label: (
        <div className="">
          <DropdownCustomItem
            label={"Reassign"}
            icon={<PiUserSwitch className="" />}
          />
        </div>
      ),
    },
    {
      key: 6,
      label: (
        <div>
          <DropdownCustomItem
            label={"Reject Survey"}
            icon={<CgCloseO className="" />}
          />
        </div>
      ),
    },
    {
      key: 7,
      label: (
        <div>
          <DropdownCustomItem
            label={"Delete"}
            icon={<BiTrash className="" />}
          />
        </div>
      ),
    },
  ];

  const columns: ColumnType<SurveyDataType>[] = [
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
      render: (_: string, _records) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: surveyActionItems,
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

  return (
    <div className="p-8 space-y-3">
      <PageHeader
        heading={"Surveys"}
        onclick={() => openDrawer(<NewSurveyDrawer />)}
        handleRefresh={() => console.log("first")}
        handleGenerateReport={() => console.log("first")}
      />

      <SummaryCards summaryData={summaryData} />
      <TableComponent
        columns={columns}
        dataSource={SurveyData}
        scroll={800}
        // onRow={(record: Array<{}>) => ({
        //   onClick: () => handleRowClick(record),
        // })}
      />

      {/* New survey form */}
      {/* <FormPopup
        title={"New Survey Request"}
        open={newSurvey}
        close={() => setNewSurvey(false)}
        submitText={"Submit"}
      /> */}

      {/* survey details drawer */}
      <SurveyDetailsDrawer />
    </div>
  );
};

export default Survey;

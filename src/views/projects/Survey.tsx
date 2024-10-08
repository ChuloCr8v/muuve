import { Button, Dropdown, MenuProps } from "antd";
import { ColumnType } from "antd/es/table";
import { AiOutlineRollback } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { CgCloseO } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { LuUserCheck } from "react-icons/lu";
import { PiUserSwitch } from "react-icons/pi";
import { useListSurveysQuery } from "../../api/surveys.api";
import { Customer, Survey } from "../../api/types";
import DropdownCustomItem from "../../components/global/DropdownCustomItem";
import PageHeader from "../../components/global/PageHeader";
import SummaryCards from "../../components/global/SummaryCards";
import TableComponent from "../../components/global/TableComponent";
import TableRowData from "../../components/global/TableRowData";
import SurveyDetailsDrawer from "../../components/projects/survey/SurveyDetailsDrawer";
import { usePopup } from "../../context/PopupContext";
import { NewSurveyDrawer } from "../../drawers/projects/NewSurveyDrawer";
import { UpdateSurveyDrawer } from "../../drawers/projects/UpdateSurveyDrawer";
import { AssignSurveyModal } from "../../modals/projects/AssignSurveyModal";
import { RejectSurveyModal } from "../../modals/projects/RejectSurveyModal";
import { RevertSurveyModal } from "../../modals/projects/RevertSurveyModal";
import { capitalizeFirstLetter } from "../../utils/capitalize.util";
import { ReassignSurveyModal } from "../../modals/projects/ReassignSurveyModal";

const ProjectSurvey = () => {
  const { openDrawer, openModal } = usePopup();

  const listSurvey = useListSurveysQuery();

  const surveys = listSurvey.data ?? [];

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

  const surveyActionItems = (survey: Survey): MenuProps["items"] => [
    {
      key: 0,
      label: (
        <DropdownCustomItem
          label={"Complete"}
          icon={<IoCheckmark />}
          className="text-green-600"
        />
      ),
      // onClick: () => openDrawer(<UpdateSurveyDrawer survey={survey} />),
    },
    { type: "divider" },
    {
      key: 2,
      label: (
        <div className="">
          <DropdownCustomItem
            label={"Assign Survey"}
            icon={<LuUserCheck className="" />}
          />
        </div>
      ),
      onClick: () => openModal(<AssignSurveyModal survey={survey} />),
    },
    {
      key: 3,
      label: (
        <div className="">
          <DropdownCustomItem
            label={"Reassign"}
            icon={<PiUserSwitch className="" />}
          />
        </div>
      ),
      onClick: () => openModal(<ReassignSurveyModal survey={survey} />),
    },
    {
      key: 1,
      label: <DropdownCustomItem label={"Edit Survey"} icon={<CiEdit />} />,
      onClick: () => openDrawer(<UpdateSurveyDrawer survey={survey} />),
    },
    { type: "divider" },
    {
      key: 4,
      label: (
        <div>
          <DropdownCustomItem
            className="text-red-600"
            label={"Revert"}
            icon={<AiOutlineRollback className="" />}
          />
        </div>
      ),
      onClick: () => openModal(<RevertSurveyModal survey={survey} />),
    },
    {
      key: 5,
      label: (
        <div>
          <DropdownCustomItem
            className="text-red-600"
            label={"Reject Survey"}
            icon={<CgCloseO className="" />}
          />
        </div>
      ),
      onClick: () => openModal(<RejectSurveyModal survey={survey} />),
    },
    {
      key: 6,
      label: (
        <div>
          <DropdownCustomItem
            className="text-red-600"
            label={"Delete"}
            icon={<BiTrash className="" />}
          />
        </div>
      ),
    },
  ];

  const columns: ColumnType<Survey>[] = [
    {
      title: "ID",
      dataIndex: "surveyId",
      key: "surveyId",
    },
    {
      title: "Name",
      dataIndex: "customer",
      key: "customer",
      render: (customer: Customer, record) => (
        <TableRowData mainText={customer.name} tagText={record.address} />
      ),
    },
    {
      title: "Service | Request Type",
      dataIndex: "serviceType",
      key: "serviceType",
      render: (_, record) => (
        <TableRowData
          mainText={record.serviceType.name}
          tagText={record.requestType.name}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <TableRowData
          mainText={capitalizeFirstLetter(record.status)}
          tagText={record.assignee.name}
        />
      ),
    },
    {
      title: "SLA",
      dataIndex: ["sla", "due"],
      key: "requestType",
      // render: (_, record) => (
      // <TableRowData
      //   mainText={<SLATime sla={record.dueDate} status={record.status} />}
      //   tagText={`Due: ${dayjs(record.dueDate).format("DD MMM YYYY")}`}
      // />
      // )
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: surveyActionItems(record),
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
            <IoMdArrowDropdown />
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
        dataSource={surveys}
        scroll={800}
        loading={listSurvey.isFetching}
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

export default ProjectSurvey;
